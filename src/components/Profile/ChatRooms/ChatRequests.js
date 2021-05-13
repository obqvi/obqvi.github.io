import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom';
import UserContext from '../../../Context/UserContext';
import { createChatRoom } from '../../../models/Chat';
import { addRelationTo, delRelationTo } from '../../../models/Common';
import { getAllChatRequests, getPersonByUserId } from '../../../models/Person';
import { Sidebar } from '../Sidebar';

export const ChatRequests = () => {

    const [person, setPerson] = useState([]);
    const { user } = useContext(UserContext);
    const history = useHistory();

    useEffect(() => {
        let isSubscribed = true;

        async function get() {
            const data = await getAllChatRequests(user.objectId);
            console.log(data);
            if (isSubscribed) {
                setPerson(data);
            }
        }

        get();

        return () => isSubscribed = false;
    }, [user.objectId]);

    async function handleConfirm(otherUserId) {
        await delRelationTo(person.objectId, otherUserId, 'friendRequests', 'Person');
        await addRelationTo(person.objectId, otherUserId, 'friends', 'Person');
        const otherPerson = await getPersonByUserId(otherUserId);
        await addRelationTo(otherPerson.objectId, user.objectId, 'friends', 'Person');

        await createChatRoom(user.objectId, otherUserId);
        
        history.push('/profile/' + otherUserId);
    }

    async function handleCancel(otherUserId) {
        let arr = [...person.friendRequests];
        const i = arr.findIndex(x => x.objectId === otherUserId);
        arr.splice(i, 1);
        setPerson({ ...person, friendRequests: arr });
        await delRelationTo(person.objectId, otherUserId, 'friendRequests', 'Person');
    }

    return (
        <div className="flex p-0">
            <title>Покани за чат</title>
            <Sidebar />
            <div className="mx-auto" style={{ maxWidth: '500px', flex: 'auto' }}>
                <h4 className="box p-2 text-center">{person?.friendRequests?.length > 0 ? 'Покани за чат' : 'Няма покани за чат'}</h4>
                {
                    person.friendRequests?.map(r =>
                        <div className="box p-2" key={r.objectId}>
                            <NavLink to={`/profile/${r.objectId}`}>
                                <h6>
                                    <img className="rounded-circle" style={{ width: '40px', height: '40px' }} src={r.url} alt="" />
                                    <span className="px-2">{r.username}</span>
                                </h6>
                            </NavLink>
                            <div className="flex">
                                <button onClick={() => handleConfirm(r.objectId)} style={{ flex: 'auto' }} className="box m-0 p-2 border-0">Потвърди</button>
                                <button onClick={() => handleCancel(r.objectId)} style={{ flex: 'auto' }} className="box m-0 p-2 border-0">Отхвърли</button>
                            </div>
                        </div>)
                }
            </div>
        </div>
    )
}

import React, { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import UserContext from '../../Context/UserContext';
import { addRelationTo, delRelationTo } from '../../models/Common';
import { getPersonByUserId } from '../../models/Person';

export const Profile = () => {

    const { id } = useParams();
    const { user } = useContext(UserContext);
    const [otherUser, setOtherUser] = useState({});
    const [isFriends, setIsFriends] = useState(false);
    const [isRequest, setIsRequest] = useState(false);

    useEffect(() => {
        let isSubscribed = true;

        async function get() {
            const data = await getPersonByUserId(id);
            if (isSubscribed) {
                setOtherUser(data);
                setIsFriends(data?.friends?.some(x => x.ownerId === user.objectId));
                setIsRequest(data?.friendRequests?.some(x => x.objectId === user.objectId));
            }
        }

        get();

        return () => isSubscribed = false;
    }, [id, user?.objectId, otherUser?.user?.objectId]);

    async function handleFriendsRequest() {
        if (!isRequest) {
            setIsRequest(true);
            await addRelationTo(otherUser.objectId, user.objectId, 'friendRequests', 'Person');
        } else {
            setIsRequest(false);
            await delRelationTo(otherUser.objectId, user.objectId, 'friendRequests', 'Person');
        }
    }

    return (
        <div className="mx-auto box" style={{ maxWidth: '1000px' }}>
            {
                otherUser ?
                    <div>
                        <title>{otherUser.user?.username}</title>
                        <div className="flex p-4">
                            <img className="border shadow rounded-circle" style={{ width: '200px', height: '200px' }} src={otherUser?.user?.url} alt="" />
                            <h4>{otherUser.user?.username}</h4>
                        </div>
                        <div className="flex p-4">
                            <ul>
                                <li>
                                    <span>Регистриран на: </span>
                                    <span>{new Date(otherUser.user?.created).toLocaleDateString()}</span>
                                </li>
                                <li>
                                    <NavLink to={`/products/${otherUser.user?.objectId}`}>Артикули за продажба</NavLink>
                                </li>
                                <li>
                                    <span>Последно влизане преди </span>
                                    <span>{((new Date(new Date().getTime() - new Date(otherUser.user?.lastLogin).getTime())).getTime() / 1000 / 60).toFixed(0)} минути</span>
                                </li>
                            </ul>
                            {isFriends ?
                                <div className="mx-auto">
                                    <NavLink className="btn primary m-0" to={`/chat/${otherUser.user?.objectId}`}>
                                        <span>Съобщение</span>
                                    </NavLink>
                                </div> : ''} {isRequest ?
                                    <div className="mx-auto">
                                        <button onClick={handleFriendsRequest} className="btn primary m-0">
                                            <span>Отмяна на поканата</span>
                                        </button>
                                    </div> : ''}
                                {!isFriends && !isRequest ?
                                <div className="mx-auto">
                                    <button onClick={handleFriendsRequest} className="btn primary m-0">
                                        <span>Покана за чат</span>
                                    </button>
                                </div> : ''}
                        </div>
                    </div>
                    : ''
            }
        </div>
    )
}

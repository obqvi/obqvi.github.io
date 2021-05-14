import React, { useContext, useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import UserContext from '../../Context/UserContext';
import { addRelationTo, delRelationTo } from '../../models/Common';
import { getPersonByUserId } from '../../models/Person';
import { calcTimes } from '../../utils/utils';

export const Profile = () => {

    const { id } = useParams();
    const { user } = useContext(UserContext);
    const [otherUser, setOtherUser] = useState({});
    const [isFriends, setIsFriends] = useState(false);
    const [isRequest, setIsRequest] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [hasRequestOtherUser, setHasRequestOtherUser] = useState(false);

    useEffect(() => {
        let isSubscribed = true;

        async function get() {
            const data = await getPersonByUserId(id);
            const currentUserData = await getPersonByUserId(user.objectId);

            setHasRequestOtherUser(currentUserData.friendRequests.some(x => x.ownerId === id));
            setIsLoading(false);

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
            setIsLoading(true);
            await addRelationTo(otherUser.objectId, user.objectId, 'friendRequests', 'Person');
            setIsLoading(false);
        } else {
            setIsRequest(false);
            setIsLoading(false);
            await delRelationTo(otherUser.objectId, user.objectId, 'friendRequests', 'Person');
            setIsLoading(false);
        }
    }

    return (
        <div className="mx-auto box" style={{ maxWidth: '1000px' }}>
            {isLoading ? <Spinner animation="border" className="spinner" /> : ''}
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
                                    <span>{calcTimes(otherUser.user?.lastLogin)}</span>
                                </li>
                            </ul>
                            {isFriends ?
                                <div className="mx-auto">
                                    <NavLink className="btn primary m-0" to={`/chat/${otherUser.user?.objectId}`}>
                                        <span>Съобщение</span>
                                    </NavLink>
                                </div> : ''} {isRequest ?
                                    <div className="mx-auto">
                                        <button disabled={isLoading} onClick={handleFriendsRequest} className="btn primary m-0">
                                            <span>Отмяна на поканата</span>
                                        </button>
                                    </div> : ''}
                            {!isFriends && !isRequest && !hasRequestOtherUser ?
                                <div className="mx-auto">
                                    <button disabled={isLoading} onClick={handleFriendsRequest} className="btn primary m-0">
                                        <span>Покана за чат</span>
                                    </button>
                                </div> : ''} {hasRequestOtherUser ?
                                    <div className="mx-auto">
                                        <NavLink disabled={isLoading} to="/profile/chat-requests" className="btn primary m-0">
                                            <span>{otherUser.username} ви изпрати покана</span>
                                        </NavLink>
                                    </div> : ''}
                        </div>
                    </div>
                    : ''
            }
        </div>
    )
}

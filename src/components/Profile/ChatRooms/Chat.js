import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router';
import UserContext from '../../../Context/UserContext';
import { getAllMessagesByUsersId, getChatRoom } from '../../../models/Chat';
import { getPersonByUserId } from '../../../models/Person';
import { Messages } from './Messages';

export const Chat = () => {

    const [messages, setMessages] = useState([]);
    const [otherUser, setOtherUser] = useState({ });
    const { user } = useContext(UserContext);
    const { id } = useParams();
    const [chatRoom, setChatRoom] = useState();
    
    useEffect(() => {
        let isSubscribed = true;

        async function get() {
            if(isSubscribed) {
                const userDb = await getPersonByUserId(id);
                const data = await getAllMessagesByUsersId(userDb.user.objectId, user);
                const room = await getChatRoom(id, userDb.user.objectId);
                setChatRoom(room);
                setOtherUser(userDb);
                setMessages(data);
            }
        }

        get();

        return () => isSubscribed = false;
    }, [id, user]);

    return (
        <div>
            {
                messages ?
                    <Messages oldMessages={messages} otherUserId={otherUser?.user?.objectId} room={chatRoom} />
                    : ''
            }
        </div>
    )
}

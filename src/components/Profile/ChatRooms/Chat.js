import React, { useContext, useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap';
import { useParams } from 'react-router';
import UserContext from '../../../Context/UserContext';
import { getAllMessagesByChatRoom, getChatRoom } from '../../../models/Chat';
import { getPersonByUserId } from '../../../models/Person';
import { Messages } from './Messages';

export const Chat = () => {

    const [messages, setMessages] = useState([]);
    const [otherUser, setOtherUser] = useState({ });
    const { user } = useContext(UserContext);
    const { id } = useParams();
    const [chatRoom, setChatRoom] = useState();
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        let isSubscribed = true;

        async function get() {
            if(isSubscribed) {
                const userDb = await getPersonByUserId(id);
                const room = await getChatRoom(id, userDb.user.objectId);
                const data = await getAllMessagesByChatRoom(room.objectId);
                setChatRoom(room);
                setOtherUser(userDb);
                setMessages(data);
                setIsLoading(false);
            }
        }

        get();

        return () => isSubscribed = false;
    }, [id, user]);

    return (
        <>
            {isLoading ? <Spinner animation="border" className="spinner" /> : ''}
            {
                messages && !isLoading ?
                    <Messages oldMessages={messages} otherUserId={otherUser?.user?.objectId} room={chatRoom?.objectId} />
                    : ''
            }
        </>
    )
}

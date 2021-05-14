import React, { useContext, useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap';
import { useParams } from 'react-router';
import UserContext from '../../../Context/UserContext';
import { getAllMessagesByChatRoom, getChatRoom } from '../../../models/Chat';
import { getPersonByUserId } from '../../../models/Person';
import { calcTimes } from '../../../utils/utils';
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
        let interval;

        async function get() {
            if(isSubscribed) {
                const userDb = await getPersonByUserId(id);
                const room = await getChatRoom(id, user.objectId);
                const data = await getAllMessagesByChatRoom(room.objectId);
                setChatRoom(room);
                setOtherUser(userDb);
                interval = setInterval(() => {
                    let arr = [...data];
                    arr.forEach(m => {
                        m.stamp = calcTimes(m.created);
                    });
                    setMessages(arr);
                }, 1000);
                setIsLoading(false);
            }
        }

        get();

        return () => {
            isSubscribed = false;
            clearInterval(interval);
        }
    }, [id, user]);

    return (
        <>
            {isLoading ? <Spinner animation="border" className="spinner" /> : ''}
            {
                messages && !isLoading ?
                    <Messages oldMessages={messages} otherUser={otherUser?.user} room={chatRoom?.objectId} />
                    : ''
            }
        </>
    )
}

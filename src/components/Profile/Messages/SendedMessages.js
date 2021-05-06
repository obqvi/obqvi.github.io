import React, { useContext, useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap';
import UserContext from '../../../Context/UserContext';
import { getSendedMessagesByUserId } from '../../../models/Message';
import { SortOptions } from '../../Common/SortOptions';
import { Sidebar } from '../Sidebar'

export const SendedMessages = () => {

    const { user } = useContext(UserContext);
    const [messages, setMessages] = useState([]);
    const [displayMessages, setDisplayMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isSubscribed = true;
        async function get() {
            setIsLoading(true);
            const data = await getSendedMessagesByUserId(user?.objectId);

            setIsLoading(false);
            if (isSubscribed) {
                setMessages(data);
                setDisplayMessages(data);
            }
        }

        get();

        return () => isSubscribed = false;
    }, [user?.objectId]);

    return (
        <>
            <title>Изпратени съообщения - {user.username}</title>
            <div className="flex">
                <Sidebar />
                {isLoading ? <Spinner animation="border" className="spinner" /> : ''}
                <div className="mx-auto" style={{ maxWidth: '600px', flex: 'auto' }}>
                    {messages.length > 0 ? <SortOptions arr={displayMessages} setArr={(arr) => setMessages(arr)} /> : ''}
                    <ul className="list-group">
                        {
                            messages.map((msg) =>
                                <li className="list-group-item box my-2" key={msg.objectId}>
                                    <span>{msg.senderId.username} - {msg.postId.title}</span>
                                    <p>{msg.content}</p>
                                </li>)
                        }
                        {
                            messages.length === 0 && !isLoading ?
                                <div className="box text-center"><p>Няма изпратени съообщения</p></div> : ''
                        }
                    </ul>
                </div>
            </div>
        </>
    )
}

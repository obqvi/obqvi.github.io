import React, { useContext, useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import UserContext from '../../../Context/UserContext';
import { getReceivedMessagesByUserId } from '../../../models/Message';
import { SortOptions } from '../../Common/SortOptions';
import { Sidebar } from '../Sidebar';

export const ReceivedMessages = () => {

    const { user } = useContext(UserContext);
    const [messages, setMessages] = useState([]);
    const [displayMessages, setDisplayMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isSubscribed = true;
        async function get() {
            setIsLoading(true);
            const data = await getReceivedMessagesByUserId(user?.objectId);

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
        <div className="flex">
            <title>Получени съообщения - {user.username}</title>
            <Sidebar />
            <div className="mx-auto" style={{ maxWidth: '600px', flex: 'auto' }}>
                {isLoading ? <Spinner animation="border" className="spinner" /> : ''}
                {messages.length > 0 ? <SortOptions arr={displayMessages} setArr={(arr) => setMessages(arr)} /> : ''}
                <ul className="list-group">
                    {
                        messages.map((msg) =>
                            <li className="list-group-item box my-2" key={msg.objectId}>
                                <span>
                                    <NavLink className="box text-primary" to={`/chat?` + msg.senderId?.objectId}>{msg.senderId.username}</NavLink> - <span>{msg.postId.title}</span>
                                </span>
                                <p>{msg.content}</p>
                            </li>)
                    }
                    {
                        messages.length === 0 && !isLoading ?
                            <div className="box text-center"><p>Няма получени съообщения</p></div> : ''
                    }
                </ul>
            </div>
        </div>
    )
}

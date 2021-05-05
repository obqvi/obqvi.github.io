import React, { useContext, useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap';
import UserContext from '../../../Context/UserContext';
import { getReceivedMessagesByUserId } from '../../../models/Message';
import { Sidebar } from '../Sidebar';

export const ReceivedMessages = () => {

    const { user } = useContext(UserContext);
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isSubscribed = true;
        async function get() {
            setIsLoading(true);
            const data = await getReceivedMessagesByUserId(user?.objectId);

            setIsLoading(false);
            if (isSubscribed) {
                setMessages(data);
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
                <ul className="list-group">
                    {
                        messages.map((msg) =>
                            <li className="list-group-item box my-2" key={msg.objectId}>
                                <span>{msg.senderId.username}</span>
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

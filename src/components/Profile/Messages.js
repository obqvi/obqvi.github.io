import React, { useContext, useEffect, useState } from 'react';
import { Sidebar } from './Sidebar';
import { getAllMessagesByUserId } from '../../models/Message';
import UserContext from '../../Context/UserContext';
import { Spinner } from 'react-bootstrap';

export const Messages = () => {

    const [messages, setMessages] = useState([]);
    const { user } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isSubscribed = true;

        async function get() {
            const data = await getAllMessagesByUserId(user?.objectId);
            if (isSubscribed) {
                setMessages(data);
                setIsLoading(false);
            }
        }

        get();

        return () => isSubscribed = false;
    }, [user?.objectId]);

    return (
        <div className="box flex p-0">
            <title>Съобщения</title>
            <Sidebar />
            {isLoading ? <Spinner animation="border" className="spinner" /> : ''}
            <div className="p-2 col-md-8 row mx-auto">
                <ul className="list-group">
                    {
                        messages.map((m) =>
                            <li className="list-group-item" key={m.objectId}>
                                <div className="text-primary">
                                    <i className="fas fa-user"></i>
                                    <span className="px-2">{m.senderId.username}</span>
                                </div>
                                {m.content}
                            </li>
                        )
                    }
                </ul>
            </div>
        </div>
    )
}

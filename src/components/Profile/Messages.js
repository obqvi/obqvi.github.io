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
        <div className="row">
            <title>Съобщения</title>
            <div className="col-md-2 bg-light p-0">
                <Sidebar />
            </div>
            <div className="col-md-10">
            {isLoading ? <Spinner animation="border" className="spinner" /> : ''}
                <div className="mx-2 my-2 bg-light p-4" style={{ height: '70vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <ul className="list-group">
                        <h4>Съобщения</h4>
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
        </div>
    )
}

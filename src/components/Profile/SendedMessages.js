import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../../Context/UserContext';
import { getSendedMessagesByUserId } from '../../models/Message';
import { Sidebar } from './Sidebar'

export const SendedMessages = () => {

    const { user } = useContext(UserContext);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        let isSubscribed = true;
        async function get() {
            const data = await getSendedMessagesByUserId(user?.objectId);
            
            console.log(data);
            if (isSubscribed) {
                setMessages(data);
            }
        }

        get();

        return () => isSubscribed = false;
    }, [user?.objectId]);

    return (
        <>
            <title>Изпратени съообщения</title>
            <div className="f-flex row">
                <Sidebar />
                <div className="mx-auto" style={{ maxWidth: '600px' }}>
                    <ul className="list-group">
                        {
                            messages.map((msg) =>
                                <li className="list-group-item box my-2" key={msg.objectId}>
                                    <span>{msg.receiverId.username}</span>
                                    <p>{msg.content}</p>
                                </li>)
                        }
                    </ul>
                </div>
            </div>
        </>
    )
}

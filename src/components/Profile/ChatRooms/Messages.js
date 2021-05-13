import Backendless from 'backendless';
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { saveMessage, sendMessage } from '../../../models/Chat';
import UserContext from '../../../Context/UserContext';
import { setRelationTo } from '../../../models/Common';

export const Messages = ({ oldMessages, otherUserId, room }) => {
    const { user } = useContext(UserContext);
    const [msgs, setMsgs] = useState([]);

    const onMessage = useCallback(async (data) => {
        setMsgs([...msgs, { content: data.message, objectId: data.headers.msgObjectId, senderId: { objectId: data.headers.objectId, url: data.headers.url, username: data.headers.username } }]);
    }, [msgs]);

    useEffect(() => {
        const channel = Backendless.Messaging.subscribe('chat');
        channel.addMessageListener(onMessage);
        return () => {
            channel.removeMessageListener(onMessage);
        }
    }, [onMessage]);

    async function handleSubmit(event) {
        event.preventDefault();
        const savedMsg = await saveMessage({ content: event.target.content.value, room });
        await setRelationTo(savedMsg.objectId, user.objectId, 'senderId', 'Chat');
        await setRelationTo(savedMsg.objectId, otherUserId, 'receiverId', 'Chat');
        sendMessage(savedMsg.content, { msgObjectId: savedMsg.objectId, url: user.url, objectId: user.objectId, username: user.username });
    }

    return (
        <div>
            <div className="box p-4 mx-auto" style={{ maxWidth: '70vw', minHeight: '70vh', flexDirection: 'column' }}>
                {
                    [...oldMessages, ...msgs].map((msg) =>
                        <div key={msg.objectId}>
                            {
                                user?.objectId === msg.senderId?.objectId ?
                                    <div>
                                        <img className="rounded-circle" style={{ width: '40px', height: '40px' }} src={msg.senderId?.url} alt="" />
                                        <span className="mx-2">{msg.content}</span>
                                    </div>
                                    : <div style={{ textAlign: 'right' }}>
                                        <img className="rounded-circle" style={{ width: '40px', height: '40px' }} src={msg.senderId?.url} alt="" />
                                        <span className="mx-2">{msg.content}</span>
                                    </div>
                            }
                        </div>)
                }
                <form className="flex border" style={{ borderRadius: '25px', overflow: 'hidden' }} onSubmit={handleSubmit}>
                    <input style={{ flex: 'auto', outline: 'none' }} type="text" className="box p-2 px-4 border-0" name="content" />
                    <button type="submit" value="submit" className="text-light border-0 bg-primary px-4">
                        <i className="fas fa-paper-plane"></i>
                        <span className="px-2">Изпрати</span>
                    </button>
                </form>
            </div>
        </div>
    )
}

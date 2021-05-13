import Backendless from 'backendless';
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { saveMessage, sendMessage } from '../../../models/Chat';
import UserContext from '../../../Context/UserContext';
import { setRelationTo } from '../../../models/Common';

export const Messages = ({ oldMessages, otherUserId, room }) => {
    const { user } = useContext(UserContext);
    const [msgs, setMsgs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

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
        setIsLoading(true);
        const savedMsg = await saveMessage({ content: event.target.content.value, room });
        sendMessage(savedMsg.content, { msgObjectId: savedMsg.objectId, url: user.url, objectId: user.objectId, username: user.username });
        await setRelationTo(savedMsg.objectId, user.objectId, 'senderId', 'Chat');
        await setRelationTo(savedMsg.objectId, otherUserId, 'receiverId', 'Chat');
        event.target.content.value = '';
        event.target.content.focus();
        setIsLoading(false);
        const element = event.target.parentElement.querySelector('div.chat-window');
        event.target.parentElement.querySelector('div.chat-window').scroll({ top: element.scrollHeight, behavior: 'smooth' });
    }

    return (
        <>
            <div className="p-4 mx-auto chat-window shadow" style={{ minHeight: '70vh', maxHeight: '70vh', overflowY: 'scroll', flexDirection: 'column' }}>
                {
                    [...oldMessages, ...msgs].map((msg) =>
                        <div className="fade-in" key={msg.objectId}>
                            {
                                user?.objectId === msg.senderId?.objectId ?
                                    <div className="box p-2 my-2">
                                        <div>
                                            <img className="rounded-circle" style={{ width: '40px', height: '40px' }} src={msg.senderId?.url} alt="" />
                                            <span className="mx-2">{msg.senderId?.username}</span>
                                        </div>
                                        <span className="mx-2" style={{ maxWidth: '400px' }}>{msg.content}</span>
                                    </div>
                                    : <div className="box my-2 p-2" style={{ textAlign: 'right' }}>
                                        <div>
                                            <img className="rounded-circle" style={{ width: '40px', height: '40px' }} src={msg.senderId?.url} alt="" />
                                            <span className="mx-2">{msg.senderId?.username}</span>
                                        </div>
                                        <span className="mx-2" style={{ maxWidth: '400px' }}>{msg.content}</span>
                                    </div>
                            }
                        </div>)
                }
            </div>
            <form className="my-4 mx-auto chat-window d-flex border" style={{ borderRadius: '25px', overflow: 'hidden' }} onSubmit={handleSubmit}>
                <input autoComplete="off" autoFocus style={{ flex: 'auto', outline: 'none' }} type="text" className="box p-2 px-4 border-0" name="content" />
                <button disabled={isLoading} type="submit" value="submit" className="text-light border-0 bg-primary px-4">
                    <i className="fas fa-paper-plane"></i>
                    <span className="px-2">Изпрати</span>
                </button>
            </form>
        </>
    )
}

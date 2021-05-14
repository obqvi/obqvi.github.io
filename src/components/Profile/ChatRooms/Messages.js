import Backendless from 'backendless';
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { saveMessage, sendMessage } from '../../../models/Chat';
import UserContext from '../../../Context/UserContext';
import { setRelationTo } from '../../../models/Common';
import { calcTimes } from '../../../utils/utils';
import { NavLink } from 'react-router-dom';

export const Messages = ({ oldMessages, otherUser, room }) => {
    const { user } = useContext(UserContext);
    const [msgs, setMsgs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isValid, setIsValid] = useState(false);

    const onMessage = useCallback(async (data) => {
        let msg = {
            content: data.message,
            objectId: data.headers.msgObjectId,
            created: Date.now(),
            senderId: {
                objectId: data.headers.objectId,
                url: data.headers.url,
                username: data.headers.username
            }
        }
        const interval = setInterval(() => {
            msg.stamp = calcTimes(msg.created)
        }, 1000);

        setMsgs([...msgs, msg]);
        return () => clearInterval(interval);
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
        await setRelationTo(savedMsg.objectId, otherUser.objectId, 'receiverId', 'Chat');

        event.target.content.value = '';
        event.target.content.focus();

        setIsLoading(false);
        setIsValid(false);

        const element = event.target.parentElement.querySelector('div.chat-window');
        event.target.parentElement.querySelector('div.chat-window').scroll({ top: element.scrollHeight, behavior: 'smooth' });
    }

    function onInput(event) {
        if (event.target.value === '') {
            return setIsValid(false);
        }

        setIsValid(true);
    }

    return (
        <>
            <div className="mx-auto chat-window shadow" style={{ minHeight: '70vh', maxHeight: '70vh', overflowY: 'scroll', flexDirection: 'column' }}>
                <div className="box p-2">
                    <img style={{ width: '40px' }} src={otherUser.url} alt="" />
                    <span className="px-2">{otherUser.username}</span>
                </div>
                <div className="p-4">
                    {
                        [...oldMessages, ...msgs].map((msg) =>
                            <div className="fade-in" key={msg.objectId}>
                                {
                                    user?.objectId === msg.senderId?.objectId ?
                                        <div className="box p-2 my-2 shadow">
                                            <div className="flex">
                                                <img className="rounded-circle" style={{ width: '40px', height: '40px' }} src={msg.senderId?.url} alt="" />
                                                <div>
                                                    <NavLink to={`/profile/${msg.senderId?.objectId}`} className="p-2">{msg.senderId?.username}</NavLink>
                                                    <div className="mx-2 text-muted">{new Date(msg.created).toLocaleDateString()} преди {msg.stamp}</div>
                                                </div>
                                            </div>
                                            <span className="mx-5" style={{ maxWidth: '400px' }}>{msg.content}</span>
                                        </div>
                                        : <div className="box my-2 p-2 shadow" style={{ textAlign: 'right' }}>
                                            <div className="flex" style={{ justifyContent: 'flex-end' }}>
                                                <div>
                                                    <NavLink to={`/profile/${msg.senderId?.objectId}`} className="p-2">{msg.senderId?.username}</NavLink>
                                                    <div className="mx-2 text-muted">{new Date(msg.created).toLocaleDateString()} преди {msg.stamp}</div>
                                                </div>
                                                <img className="rounded-circle" style={{ width: '40px', height: '40px' }} src={msg.senderId?.url} alt="" />
                                            </div>
                                            <span className="mx-5" style={{ maxWidth: '400px' }}>{msg.content}</span>
                                        </div>
                                }
                            </div>)
                    }
                </div>
            </div>
            <form className="my-4 mx-auto chat-window d-flex border" style={{ borderRadius: '25px', overflow: 'hidden' }} onSubmit={handleSubmit}>
                <input onChange={onInput} autoComplete="off" autoFocus style={{ flex: 'auto', outline: 'none' }} type="text" className="box p-2 px-4 border-0" name="content" />
                <button disabled={isLoading || !isValid} type="submit" value="submit" className="text-light border-0 bg-primary px-4">
                    <i className="fas fa-paper-plane"></i>
                    <span className="px-2">Изпрати</span>
                </button>
            </form>
        </>
    )
}
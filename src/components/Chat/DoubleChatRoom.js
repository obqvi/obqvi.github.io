
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import UserContext from '../../Context/UserContext';
import { saveMessage, sendMessage, subscribeDoubleGroup } from '../../models/Chat';
import { addRelationTo } from '../../models/Common';
import { getPersonByUserId } from '../../models/Person';

export const DoubleChatRoom = () => {

    const { user } = useContext(UserContext);
    const [otherUser, setOtherUser] = useState();
    const [messages, setMessages] = useState([]);
    const { id } = useParams();
    const [isValid, setIsValid] = useState(false);

    const onMessage = useCallback((data) => {
        setMessages([
            ...messages,
            {
                messageId: data.messageId,
                data: data.message,
                user: {
                    username: data.headers.username,
                    url: data.headers.url,
                    objectId: data.headers.objectId
                }
            }
        ]);
        console.log(data);
    }, [messages]);

    const onConnect = useCallback((data) => {

    }, []);

    useEffect(() => {
        let isSubscribed = true;
        let channel;

        async function initialRoom() {
            if (isSubscribed) {
                const data = await getPersonByUserId(id);
                setOtherUser(data);

                channel = subscribeDoubleGroup();
                channel.addMessageListener(onMessage);
            }
        }

        initialRoom();

        return () => {
            isSubscribed = false;
            channel.removeAllListeners();
            return;
        };
    }, [messages, onConnect, onMessage, id]);

    async function send(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const message = formData.get('message');

        await sendMessage(message, { objectId: user.objectId, username: user.username, url: user.url });
        event.target.message.value = '';
        event.target.message.focus();
        setIsValid(false);
        const data = await saveMessage({ senderId: user.objectId, receiverId: otherUser.user.objectId, content: message });
        await addRelationTo(data.objectId, user.objectId, 'senderId', 'Messages');
        await addRelationTo(data.objectId, otherUser.user.objectId, 'receiverId', 'Messages');
    }

    function handleChangeInput(content) {
        if (String(content).trim() === '') {
            return setIsValid(false);
        }

        setIsValid(true);
    }

    return (
        <div className="mx-auto box p-2" style={{ maxWidth: '80vw' }}>
            {
                otherUser ?
                    <>
                        <title>Чат на живо</title>
                        <div className="bg-primary text-light p-2">
                            <img className="rounded-circle" style={{ width: '40px', height: '40px' }} alt="" src={otherUser.user.url} />
                            <span className="mx-2">{otherUser.user.username}</span>
                        </div>
                        <hr />
                        <div>
                            <ul id="messages-info" style={{ minHeight: '60vh', maxHeight: '60vh', overflowY: 'scroll' }}>
                                {
                                    messages.map((message) =>
                                        <li className="p-2 box my-2" key={message.messageId}>
                                            <h6>
                                                <img className="rounded-circle" style={{ width: '40px', height: '40px' }} src={message.user.url} alt="" />
                                                <span className="mx-2">{message.user.username}</span>
                                            </h6>
                                            <div>{message.data}</div>
                                        </li>)
                                }
                            </ul>
                            <form className="d-flex" onSubmit={send}>
                                <input
                                    onChange={(event) => handleChangeInput(event.target.value)}
                                    autoComplete="off"
                                    autoFocus
                                    placeholder={`Напишете нещо на ${otherUser.user.username}`}
                                    type="text" name="message"
                                    className="border p-2" style={{ flex: 'auto' }} />
                                <button disabled={!isValid} className="btn m-0 box primary border-0 " type="submit">
                                    <i className="fas fa-paper-plane"></i>
                                </button>
                            </form>
                        </div>
                    </>
                    : <Spinner animation="border" className="spinner" />
            }
        </div>
    )
}
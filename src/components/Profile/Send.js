import React, { useContext, useState } from 'react'
import { Spinner } from 'react-bootstrap';
import UserContext from '../../Context/UserContext';
import { setRelationTo, send } from '../../models/Message';

export const Send = ({ postId, setMessages }) => {
    
    const { user } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);
    const [isValid, setIsValid] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const content = formData.get('content');

        setIsLoading(true);
        
        setMessages({ content, senderId: { username: user.username }});
        
        const data = await send({ content });

        await setRelationTo('Message', 'postId', data.objectId, postId);
        await setRelationTo('Message', 'senderId', data.objectId, user.objectId);

        event.target.content.focus();
        event.target.content.value = '';
        setIsLoading(false);
    }

    function handleChangeInput(content) {
        if(String(content).trim().length === 0) {
            return setIsValid(false);
        }

        setIsValid(true);
    }

    return (
        <form onSubmit={handleSubmit}>
            <input className="form-control box p-2 mt-4" type="text" onChange={(event) => handleChangeInput(event.target.value)} name="content" />
            <button disabled={!isValid || isLoading} className="box mt-2 p-2 border-0">
                <i className="fas fa-send"></i>
                {isLoading ? <Spinner animation="border" /> : 'Изпрати'}
            </button>
        </form>
    )
}

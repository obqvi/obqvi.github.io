import React, { useState } from 'react'
import { Spinner } from 'react-bootstrap';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { setRelationTo, send } from '../../../models/Message';

export const Send = ({ postId, receiverId, senderId }) => {
    
    const [isLoading, setIsLoading] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const history = useHistory();

    async function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const content = formData.get('content');

        setIsLoading(true);
        const data = await send({ content });

        await setRelationTo('Message', 'postId', data.objectId, postId);
        await setRelationTo('Message', 'senderId', data.objectId, senderId);
        await setRelationTo('Message', 'receiverId', data.objectId, receiverId);

        history.push('/profile/messages-sended');

        setIsLoading(false);
    }

    function handleChangeInput(content) {
        if (String(content).trim().length === 0) {
            return setIsValid(false);
        }

        setIsValid(true);
    }

    return (
        <form onSubmit={handleSubmit}>
            <textarea
                className="form-control box p-2 mt-4"
                type="text"
                onChange={(event) => handleChangeInput(event.target.value)}
                name="content"></textarea>
            <button disabled={!isValid || isLoading} className="box mt-2 p-2 border-0">
                <i className="fas fa-send"></i>
                {isLoading ? <Spinner animation="border" /> : 'Изпрати'}
            </button>
        </form>
    )
}
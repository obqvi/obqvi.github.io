import React, { useContext, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import EventPostDetailsCommentsContext from '../../Context/EventPostDetailsCommentsContext';
import UserContext from '../../Context/UserContext';
import { createComment } from '../../models/Comment';
import { setRelationTo } from '../../models/Common';

export const CreateComment = ({ postId, eventId }) => {

    const { user } = useContext(UserContext);
    const { commentsContext, setCommentContext } = useContext(EventPostDetailsCommentsContext);
    const [isValid, setIsValid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const content = formData.get('content');

        if (!isValid) {
            return;
        }

        setIsLoading(true);
        const data = await createComment({ content });
        
        if(postId) {
            await setRelationTo(data.objectId, postId, 'postId', 'Comment');
        }
        if(eventId) {
            await setRelationTo(data.objectId, eventId, 'eventId', 'Comment');
        }
        
        await setRelationTo(data.objectId, user.objectId, 'userId', 'Comment');
        setIsLoading(false);
        
        setCommentContext([
            {
                objectId: data.objectId,
                content,
                created: Date.now(),
                userId: {
                    objectId: user.objectId,
                    username: user.username
                }
            },
            ...commentsContext
        ]);

        event.target.content.focus();
        event.target.content.value = '';
    }

    function onChangeInput(content) {
        if (String(content).trim().length === 0) {
            return setIsValid(false);
        }

        setIsValid(true);
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="d-flex">
                <input
                    onChange={(event) => onChangeInput(event.target.value)}
                    type="text" className="p-2 border-0 box" style={{ flex: 'auto' }}
                    placeholder="Напишете коментар..."
                    name="content" />
                <button disabled={!isValid || isLoading} type="submit" className="px-4 border bg-primary text-light">
                    {
                        isLoading ?
                            <Spinner animation="border" size="sm" /> :
                            <i className="fa fa-paper-plane" aria-hidden="true"></i>
                    }
                </button>
            </form>
        </div>
    )
}

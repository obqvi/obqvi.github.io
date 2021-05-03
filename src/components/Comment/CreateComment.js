import React, { useContext, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import PostDetailsCommentsContext from '../../Context/PostDetailsCommentsContext';
import UserContext from '../../Context/UserContext';
import { createComment, setCommentRelationToUser, setCommentRelationToPost } from '../../models/Comment';

export const CreateComment = ({ postId }) => {

    const { user } = useContext(UserContext);
    const { commentsContext, setCommentContext } = useContext(PostDetailsCommentsContext);
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
        
        await setCommentRelationToUser(data.objectId, user.objectId);
        await setCommentRelationToPost(data.objectId, postId);

        setIsLoading(false);

        window.scrollTo(0, document.body.scrollHeight);
        
        setCommentContext([
            {
                content,
                created: Date.now(),
                userId: {
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
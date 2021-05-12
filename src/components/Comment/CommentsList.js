import React, { useContext, useEffect, useState } from 'react';

import EventPostDetailsCommentsContext from '../../Context/EventPostDetailsCommentsContext';
import { getAllCommentsByEventId, getAllCommentsByPostId, removeComment } from '../../models/Comment';
import UserContext from '../../Context/UserContext';

export const CommentsList = ({ postId, eventId }) => {

    const { commentsContext, setCommentContext } = useContext(EventPostDetailsCommentsContext);
    const { user } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        let isSubscribed = true;

        async function get() {
            if (postId) {
                const data = await getAllCommentsByPostId(postId);
                if (isSubscribed) {
                    setCommentContext(data);
                }
            }
            if (eventId) {
                const data = await getAllCommentsByEventId(eventId);
                if (isSubscribed) {
                    setCommentContext(data);
                }
            }
        }

        get();

        return () => isSubscribed = false;
    }, [postId, eventId, setCommentContext]);

    async function handleDeleteComment(id) {
        setIsLoading(true);
        await removeComment(id);
        setIsLoading(false);
        const arr = commentsContext.filter(c => c.objectId !== id);
        setCommentContext(arr);
    }

    return (
        <div className="pb-5">
            <ul style={{ textAlign: 'left' }}>
                {commentsContext ? commentsContext.map((comment, i) =>
                    <li key={i} className="mt-2 p-2 box border">
                        <h6>
                            <i className="fas fa-user"></i>
                            <span className="mx-2">{comment.userId?.username}</span>
                            <span>{new Date(comment.created).toDateString()}</span>
                        </h6>
                        <p>{comment.content}</p>
                        {comment.userId?.objectId === user.objectId ?
                            <button
                                disabled={isLoading}
                                onClick={() => handleDeleteComment(comment?.objectId)}
                                className="btn box p-1 m-0 text-danger">Изтрии</button> : ''}
                    </li>
                ) : ''}
                {commentsContext.length === 0 ? <h6>Няма коментари</h6> : ''}
            </ul>
        </div>
    )
}

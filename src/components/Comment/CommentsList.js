import React, { useContext, useEffect } from 'react'
import PostDetailsCommentsContext from '../../Context/PostDetailsCommentsContext';
import { getAllCommentsByPostId } from '../../models/Comment';

export const CommentsList = ({ postId }) => {

    const { commentsContext, setCommentContext } = useContext(PostDetailsCommentsContext);

    useEffect(() => {
        let isSubscribed = true;

        async function get() {
            const data = await getAllCommentsByPostId(postId);
            if(isSubscribed) {
                setCommentContext(data);
            }
        }

        get();

        return () => isSubscribed = false;
    }, [postId, setCommentContext]);

    return (
        <div className="pb-5">
            <ul>
                {commentsContext.map((comment, i) =>
                    <li key={i} className="mt-2 p-2 box border">
                        <h6>
                            <i className="fas fa-user"></i>
                            <span className="mx-2">{comment.userId.username}</span>
                            <span>{new Date(comment.created).toDateString()}</span>
                        </h6>
                        <p>{comment.content}</p>
                    </li>
                )}
            </ul>
        </div>
    )
}

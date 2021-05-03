import React, { useContext, useEffect } from 'react'
import PostDetailsCommentsContext from '../../Context/PostDetailsCommentsContext';

export const CommentsList = () => {

    const { commentsContext } = useContext(PostDetailsCommentsContext);

    useEffect(() => {
        
    }, []);

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

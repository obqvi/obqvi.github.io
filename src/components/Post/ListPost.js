import React, { useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import PostDetailsCommentsContext from '../../Context/PostDetailsCommentsContext';
import { CommentsList } from '../Comment/CommentsList';
import { CreateComment } from '../Comment/CreateComment';

export const ListPost = ({ post }) => {

    const history = useHistory();

    const [commentsContext, setCommentContext] = useState([]);
    const [isShowComments, setIsShowComments] = useState(false);

    return (
        <div className="box single-post">
            <div>
                <img className="w-100" src={post.imagePaths.split(', ')[0]} alt="" />
            </div>
            <div className="p-4 pb-0">
                <h5>{post.title}</h5>
                <hr />
                <h6>{post.city}</h6>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Публикувано</span>
                    <span>{new Date(post.created).toLocaleDateString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Състояние </span>
                    <span>{post.condition}</span>
                </div>
                <div className="text-center py-4" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 className="">{post.price} {post.currency}</h4>
                    <button className="m-0 btn primary" onClick={() => history.push(`/details/${post.objectId}`)}>Виж</button>
                </div>
            </div>
            <PostDetailsCommentsContext.Provider value={{ commentsContext, setCommentContext }}>
                <CreateComment postId={post.objectId} />
                {commentsContext.length > 0 ?
                    <div
                        onClick={() => setIsShowComments(!isShowComments)}
                        className="px-2">
                        {commentsContext.length}
                        {commentsContext.length === 1 ?
                        ' коментар' : ' коментара'}</div>
                    : ''}
                {
                    isShowComments ?
                        <div className="px-2">
                            <CommentsList />
                        </div>
                        : ''
                }
            </PostDetailsCommentsContext.Provider>
        </div>
    )
}

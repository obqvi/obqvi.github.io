import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import PostDetailsCommentsContext from '../../Context/PostDetailsCommentsContext';
import { CommentsList } from '../Comment/CommentsList';
import { CreateComment } from '../Comment/CreateComment';

export const ListPost = ({ post, user }) => {

    const history = useHistory();

    const [commentsContext, setCommentContext] = useState([]);

    return (
        <div className="box single-post">
            <NavLink to={`/details/${post.objectId}`}>

                <div onClick={() => history.push(`/details/${post.objectId}`)}>
                    <img className="w-100" src={post.imagePaths.split(', ')[0]} alt="" />
                </div>
            </NavLink>
            <div className="p-4 pb-0">
                <NavLink to={`/details/${post.objectId}`}>
                    <h5>{post.title}</h5>
                </NavLink>
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
                <div className="d-flex py-4">
                    <button data-toggle="modal" data-target="#commentsModal" className="box border-0 py-2" style={{ flex: 'auto' }}>Коментари</button>
                    <button className="border-0 box" onClick={() => history.push(`/details/${post.objectId}`)} style={{ flex: 'auto' }}>Виж</button>
                </div>
            </div>

            <div className="modal fade" id="commentsModal" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content pb-0 box">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Коментари</h5>
                            <button type="button" className="px-2 border text-danger" data-dismiss="modal" aria-label="Close">
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                        <div className="modal-body">
                            <PostDetailsCommentsContext.Provider value={{ commentsContext, setCommentContext }}>
                                <CreateComment postId={post.objectId} />
                                {commentsContext.length > 0 ?
                                    <div
                                        className="px-2">
                                        {commentsContext.length}
                                        {commentsContext.length === 1 ?
                                            ' коментар' : ' коментара'}</div>
                                    : ''}
                                {
                                    <div className="px-2">
                                        <CommentsList postId={post.objectId} />
                                    </div>
                                }
                            </PostDetailsCommentsContext.Provider>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

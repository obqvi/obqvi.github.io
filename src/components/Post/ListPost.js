import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import EventPostDetailsCommentsContext from '../../Context/EventPostDetailsCommentsContext';
import UserContext from '../../Context/UserContext';
import { likePost } from '../../models/Post';
import { CommentsList } from '../Comment/CommentsList';
import { CreateComment } from '../Comment/CreateComment';
import { PostTools } from './PostTools';

export const ListPost = ({ post }) => {

    const history = useHistory();

    const [commentsContext, setCommentContext] = useState([]);
    const { user } = useContext(UserContext);

    const [isLoading, setIsLoading] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [likes, setLikes] = useState(post?.likes || []);
    const [isDisableComments, setIsDisableComments] = useState(false);
    const [currentPost, setCurrentPost] = useState(post);

    useEffect(() => {
        setIsLiked(likes.some(x => x === user?.objectId));
        setIsDisableComments(post?.disableComments);
        setCurrentPost(post);
    }, [isLiked, likes, user?.objectId, post?.isDisableComments, post]);

    async function handleLikePost() {
        let arr;

        if (isLoading) return;

        if (!likes.some(x => x === user.objectId)) {
            arr = [...likes, user.objectId];
            setLikes(arr);
        } else {
            arr = likes.filter(x => x !== user.objectId);
            setLikes(arr);
        }

        setIsLoading(true);
        await likePost({ ...currentPost, likes: arr });
        setIsLoading(false);
    }

    return (
        <>
            {
                currentPost && currentPost.userId && user ?
                    <div className="box single-post">
                        <div className="justify-content-between align-items-center" style={{ display: 'flex' }}>
                            <div className="box align-items-center py-2" style={{ display: 'flex' }}>
                                <img className="mx-2" style={{ width: '40px', height: '40px', borderRadius: '25px' }} src={currentPost.userId?.url} alt="" />
                                <h6>{currentPost.userId?.username}</h6>
                            </div>
                            {user?.objectId === post?.userId.objectId ? <PostTools isDisableComments={isDisableComments} setIsDisableComments={(c) => setIsDisableComments(c)} post={currentPost} /> : ''}
                        </div>
                        <NavLink to={`/details/${currentPost.objectId}`}>
                            <div onClick={() => history.push(`/details/${currentPost.objectId}`)}>
                                <img className="w-100" src={currentPost.imagePaths.split(', ')[0]} alt="" />
                            </div>
                        </NavLink>
                        <div className="p-4 pb-0">
                            <NavLink to={`/details/${post.objectId}`}>
                                <h5>{currentPost.title}</h5>
                            </NavLink>
                            <hr />
                            <h6>{currentPost.city}</h6>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>??????????????????????</span>
                                <span>{new Date(currentPost.created).toLocaleDateString()}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>?????????????????? </span>
                                <span>{currentPost.condition}</span>
                            </div>
                            <div className="d-flex py-4">
                                {
                                    !isDisableComments ?
                                        <button data-toggle="modal" data-target="#commentsModal" className="box border-0 py-2" style={{ flex: 'auto' }}>??????????????????</button> : ''
                                }
                                <button className="border-0 box py-2" onClick={() => history.push(`/details/${currentPost.objectId}`)} style={{ flex: 'auto' }}>??????</button>
                                <button className={`border-0 box py-2 ${isLiked ? 'liked' : ''}`} onClick={handleLikePost} style={{ flex: 'auto' }}>?????????????????? {likes.length}</button>
                            </div>
                        </div>
                        <div className="modal fade" id="commentsModal" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered" role="document">
                                <div className="modal-content pb-0 box">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLongTitle">??????????????????</h5>
                                        <button type="button" className="px-2 border text-danger" data-dismiss="modal" aria-label="Close">
                                            <i className="fas fa-times"></i>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <EventPostDetailsCommentsContext.Provider value={{ commentsContext, setCommentContext }}>
                                            <CreateComment postId={currentPost.objectId} />
                                            {commentsContext.length > 0 ?
                                                <div
                                                    className="px-2">
                                                    {commentsContext.length}
                                                    {commentsContext.length === 1 ?
                                                        ' ????????????????' : ' ??????????????????'}</div>
                                                : ''}
                                            {
                                                <div className="px-2">
                                                    <CommentsList postId={post.objectId} />
                                                </div>
                                            }
                                        </EventPostDetailsCommentsContext.Provider>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    : ''
            }
        </>
    )
}

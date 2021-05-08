import React, { useContext, useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';

import UserContext from '../../Context/UserContext';
import EventPostDetailsCommentsContext from '../../Context/EventPostDetailsCommentsContext';

import {
    checkIsFavoritePostById,
    getPostById,
    removeFromFavoritePost,
    removePostById,
    setAsFavoritePost,
    setAsLastShowingPost,
    setRelationToPost,
    setRelationToLastShowingPost,
    removeRelationPostFromLastShowing
} from '../../models/Post';

import { CreateComment } from '../Comment/CreateComment';
import { CommentsList } from '../Comment/CommentsList';
import { NavLink } from 'react-router-dom';
import { PostTools } from './PostTools';

export const PostDetails = () => {

    const { id } = useParams();
    const [post, setPost] = useState({});
    const [commentsContext, setCommentContext] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isOwner, setIsOwner] = useState(false);
    const [selectedImagePath, setSelectedImagePath] = useState('');
    const [isFavoritePost, setIsFavoritePost] = useState(null);
    const [isDisableComments, setIsDisableComments] = useState(false);

    const { user } = useContext(UserContext);

    const history = useHistory();

    useEffect(() => {
        let isSubscribed = true;

        setIsDisableComments(post.disableComments);

        async function get() {
            const data = await getPostById(id);
            console.log(data);
            const favoritePost = await checkIsFavoritePostById(id);
            const lastShowingPost = await setAsLastShowingPost(data.objectId, user?.objectId);
            await setRelationToLastShowingPost(lastShowingPost.objectId, data.objectId);

            if (favoritePost) {
                setIsFavoritePost(favoritePost);
            }

            if (isSubscribed) {
                setPost(data);
                setIsLoading(false);
                setIsOwner(data.userId?.objectId === user?.objectId);
                setSelectedImagePath(data.imagePaths.split(', ')[0]);
            }
        }

        get();

        return () => isSubscribed = false;
    }, [id, user, post.disableComments]);

    function handleChangeImagePath(path) {
        setSelectedImagePath(path);
    }

    async function handleRemovePost() {
        if (window.confirm('Сгурен ли си, че искаш да изтриеш тази публикация?')) {
            setIsLoading(true);
            await removeRelationPostFromLastShowing(post.objectId);
            if (isFavoritePost) {
                await removeFromFavoritePost(isFavoritePost.objectId);
            }
            await removePostById(post.objectId);

            setIsLoading(false);
            history.push('/');
        }
    }

    async function handleSetAsFavoritePost() {
        setIsLoading(true);

        if (!isFavoritePost) {
            const data = await setAsFavoritePost(user.objectId);
            setIsFavoritePost({});
            await setRelationToPost(data.objectId, post.objectId);
            setIsFavoritePost(data);
        } else {
            setIsFavoritePost(null);
            await removeFromFavoritePost(isFavoritePost.objectId);
        }

        setIsLoading(false);
    }

    return (
        <>
        <title>{post?.title}</title>
            <div className="row m-5 mx-auto mb-0 p-2 shadow box rounded" style={{ maxWidth: '1400px' }}>
                {isLoading ? <Spinner className="spinner" animation="border" /> : ''}
                <div className="col-md-3 p-0">
                    <img className="w-100" style={{ minWidth: '200px', height: '345px' }} src={selectedImagePath} alt="" />
                </div>
                <div className="col-md-5">
                    <h4>{post.title}</h4>
                    <hr />
                    <div className="d-flex justify-content-between">
                        <span>Град: </span>
                        <span>{post.city}</span>
                    </div>
                    <div className="d-flex justify-content-between">
                        <span>Категория: </span>
                        <span>{post.categoryId?.title}</span>
                    </div>
                    <div className="d-flex justify-content-between">
                        <span>Състояние: </span>
                        <span>{post.condition}</span>
                    </div>
                    {post.warning ?
                        <div className="d-flex justify-content-between">
                            <span>Забележка: </span>
                            <span>{post.warning}</span>
                        </div> : ''}
                    <div className="d-flex justify-content-between">
                        <span>Телефонен номер: </span>
                        <span>{post.phoneNumber}</span>
                    </div>
                    <div className="d-flex justify-content-between">
                        <span>Цена: </span>
                        <span>{post.price} {post.currency}</span>
                    </div>
                    <div className="btn-group">
                        {
                            !isOwner ?
                                <NavLink to={`/profile/messages/${post.objectId}`} className="btn box p-1">
                                    <i className="fas fa-pen px-2"></i>
                        Съобщение
                        </NavLink> : ''
                        }
                        <button disabled={isLoading} className="btn box p-1" onClick={handleSetAsFavoritePost}>
                            {isFavoritePost ? <div>
                                <i className="fas fa-star px-2"></i>
                                Изтрии от любими
                            </div> :
                                <div>
                                    <i className="fas fa-star px-2"></i>
                                Добави в любими
                                </div>}
                        </button>
                        {
                            isOwner ?
                                <button disabled={isLoading} onClick={handleRemovePost} className="m-0 btn box p-1">
                                    <i className="fas fa-times px-2"></i>
                                    Изтрии
                                </button> : ''
                        }
                        {isOwner ?
                            <PostTools isDisableComments={isDisableComments} setIsDisableComments={(c) => setIsDisableComments(c)} post={post} /> : ''}
                    </div>
                </div>
                <div className="text-center col-md-4">
                    <div>
                        {post.imagePaths?.split(', ').map((path) =>
                            <img
                                onClick={() => handleChangeImagePath(path)}
                                className={`my-2 mx-1 border ${selectedImagePath === path ? 'p-2' : ''}`}
                                key={path} style={{ width: '100px', height: '70px', cursor: 'pointer' }}
                                src={path}
                                alt=""
                            />
                        )}
                    </div>
                    {
                        !isDisableComments ?
                            <div className="px-5" style={{ overflowY: 'scroll', maxHeight: '345px' }}>
                                <EventPostDetailsCommentsContext.Provider value={{ commentsContext, setCommentContext }}>
                                    <CreateComment postId={post.objectId} />
                                    <div className="px-2">
                                        <CommentsList postId={post.objectId} />
                                    </div>
                                </EventPostDetailsCommentsContext.Provider>
                            </div> : ''
                    }
                </div>
                {post.description ?
                    <div>
                        <h2>Описание</h2>
                        <div dangerouslySetInnerHTML={{ __html: post.description }}></div>
                    </div> : ''}
                <hr />
            </div>
        </>
    )
}

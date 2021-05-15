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
    setRelationToPost,
    removeRelationPostFromLastShowing,
    setAsLastShowingPost,
    updateHistoryPosts,
    updateReadCountPost
} from '../../models/Post';

import { CreateComment } from '../Comment/CreateComment';
import { CommentsList } from '../Comment/CommentsList';
import { NavLink } from 'react-router-dom';
import { PostTools } from './PostTools';
import { addRelationTo, setRelationTo } from '../../models/Common';
import { calcTimes } from '../../utils/utils';

export const PostDetails = () => {

    const { id } = useParams();
    const [post, setPost] = useState({});
    const [commentsContext, setCommentContext] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isOwner, setIsOwner] = useState(false);
    const [selectedImagePath, setSelectedImagePath] = useState('');
    const [isFavoritePost, setIsFavoritePost] = useState(null);
    const [isDisableComments, setIsDisableComments] = useState(false);
    const [isShowPhoneNumber, setIsShowPhoneNumber] = useState(false);

    const { user } = useContext(UserContext);

    const history = useHistory();

    useEffect(() => {
        let isSubscribed = true;
        async function get() {
            if (isSubscribed) {
                const data = await getPostById(id);
                await updateReadCountPost(id, data.readCount + 1);
                setIsDisableComments(data.disableComments);
                setPost(data);
                setIsLoading(false);
                setIsOwner(data.userId?.objectId === user?.objectId);
                setSelectedImagePath(data.imagePaths.split(', ')[0]);

                const favoritePost = await checkIsFavoritePostById(id);

                if (!data.previousPosts.some(x => x.postId.objectId === data.objectId)) {
                    const lastShowingPost = await setAsLastShowingPost(data.objectId, user.objectId);
                    await setRelationTo(lastShowingPost.objectId, data.objectId, 'postId', 'historyPosts');
                    await setRelationTo(lastShowingPost.objectId, user.objectId, 'userId', 'historyPosts');
                    await addRelationTo(data.objectId, lastShowingPost.objectId, 'previousPosts', 'Post');
                } else {
                    const object = data.previousPosts.find(x => x.postId.objectId === data.objectId);
                    await updateHistoryPosts(object.objectId, user.objectId);
                }

                if (favoritePost) {
                    setIsFavoritePost(favoritePost);
                }
            }
        }

        get();
        return () => isSubscribed = false;
    }, [id, user.objectId]);

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
            <div className="fade-in row m-5 mx-auto mb-0 p-2 shadow box rounded" style={{ maxWidth: '1400px' }}>
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
                        <NavLink className="text-primary" to={`/category/${post.categoryId?.objectId}`}>{post.categoryId?.title}</NavLink>
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
                        <span>Цена: </span>
                        <span>{post.price} {post.currency}</span>
                    </div>
                    <div className="d-flex justify-content-between">
                        <span>Публикувано на: </span>
                        <span>{new Date(post.created).toLocaleString()}</span>
                    </div>
                    <div className="d-flex justify-content-between">
                        <span>Преди: </span>
                        <span>{calcTimes(post.created)}</span>
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
                <h6>Показвания {post.readCount}</h6>
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
                            <div className="px-5 fade-in" style={{ overflowY: 'scroll', maxHeight: '345px' }}>
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
                        <h4>Описание</h4>
                        <div dangerouslySetInnerHTML={{ __html: post.description }}></div>
                    </div> : ''}
                <hr />
                <ul>
                    <h4>Потребител</h4>
                    <li className="my-4 flex align-items-center">
                        <span>Телефонен номер: </span>
                        {!isShowPhoneNumber ? <button onClick={() => setIsShowPhoneNumber(true)} className="btn primary m-0 mx-4 px-4 py-2">Покажи</button> :
                            <h4 className="mx-4">{post.phoneNumber}</h4>}
                            <button onClick={() => window.open(`tel:${post.phoneNumber}`)} className="btn primary m-0 mx-4 px-4 py-2">Обаждане по телефона</button>
                    </li>
                    <li>
                        <img style={{ width: '40px' }} src={post.userId?.url} alt="" />
                        <span className="px-2">{post.userId?.username}</span>
                    </li>
                    <li>
                        <span>Регистриран на: </span>
                        <span className="px-2">
                            {new Date(user.created).toLocaleString()}
                            <div>Преди: {calcTimes(user.created)}</div>
                        </span>
                    </li>
                    <li>
                        Други продукти на <NavLink className="mx-2 text-primary" to={`/products/${post.userId?.objectId}`}>{post.userId?.username}</NavLink>
                    </li>
                </ul>
            </div>
        </>
    )
}

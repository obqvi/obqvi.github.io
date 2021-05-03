import React, { useContext, useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';

import UserContext from '../../Context/UserContext';
import PostDetailsCommentsContext from '../../Context/PostDetailsCommentsContext';

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

export const PostDetails = () => {

    const { id } = useParams();
    const [post, setPost] = useState({});
    const [commentsContext, setCommentContext] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isOwner, setIsOwner] = useState(false);
    const [selectedImagePath, setSelectedImagePath] = useState('');
    const [isFavoritePost, setIsFavoritePost] = useState(null);
    const [isShowComments, setIsShowComments] = useState(true);

    const { user } = useContext(UserContext);

    const history = useHistory();

    useEffect(() => {
        let isSubscribed = true;

        async function get() {
            const data = await getPostById(id);
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
    }, [id, user?.objectId]);

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
            <div className="row m-5 mb-0 p-2 shadow box rounded">
                {isLoading ? <Spinner className="spinner" animation="border" /> : ''}
                <div className="col-md-3 p-0">
                    <img className="w-100" style={{ width: '345px', height: '345px' }} src={selectedImagePath} alt="" />
                </div>
                <div className="col-md-6">
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
                        <button className="btn btn-primary p-1">Съобщение</button>
                        <button disabled={isLoading} className="btn primary p-1" onClick={handleSetAsFavoritePost}>
                            {isFavoritePost ? 'Изтрии от любими' : 'Добави в любими'}
                        </button>
                        {
                            isOwner ?
                                <button disabled={isLoading} onClick={handleRemovePost} className="m-0 btn btn-danger p-1">Изтрии</button> : ''
                        }
                    </div>
                </div>
                <div className="text-center col-md-3">
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
                {post.description ?
                    <div>
                        <h2>Описание</h2>
                        <div dangerouslySetInnerHTML={{ __html: post.description }}></div>
                    </div> : ''}
                <hr />
                {commentsContext.length > 0 ?
                    <button
                    onClick={() => setIsShowComments(!isShowComments)}
                    className="px-2 border" style={{ width: 'fit-content' }}>
                        {commentsContext.length}
                        {commentsContext.length === 1 ?
                        ' коментар' : ' коментара'}</button>
                        : ''}
            </div>
            <div className="px-5">
            <PostDetailsCommentsContext.Provider value={{ commentsContext, setCommentContext }}>
                <CreateComment postId={post.objectId} />
                {
                    isShowComments ?
                    <div className="px-2">
                            <CommentsList postId={post.objectId} />
                        </div>
                        : ''
                    }
            </PostDetailsCommentsContext.Provider>
                    </div>
        </>
    )
}

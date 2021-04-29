import React, { useContext, useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import UserContext from '../../Context/UserContext';
import { getPostById } from '../../models/Post';

export const PostDetails = () => {

    const { id } = useParams();
    const [post, setPost] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isOwner, setIsOwner] = useState(false);

    const { user } = useContext(UserContext);

    useEffect(() => {
        let isSubscribed = true;

        getPostById(id)
            .then((data) => {
                if (isSubscribed) {
                    setPost(data);
                    setIsLoading(false);
                    setIsOwner(data.userId?.objectId === user.objectId);
                    console.log(data);
                }
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false);
            });

        return () => isSubscribed = false;
    }, [id, user?.objectId]);

    return (
        <div className="row m-5 p-2 shadow bg-light">
            {isLoading ? <Spinner className="spinner" animation="border" /> : ''}
            <div className="col-md-4 p-0">
                <img className="w-100" src={post.imageUrl} alt="" />
            </div>
            <div className="col-md-8">
                <h2>{post.title}</h2>
                <hr />
                <div className="col-md-6 d-flex justify-content-between">
                    <span>Град: </span>
                    <span>{post.city}</span>
                </div>
                <div className="col-md-6 d-flex justify-content-between">
                    <span>Категория: </span>
                    <span>{post.category}</span>
                </div>
                <div className="col-md-6 d-flex justify-content-between">
                    <span>Забележка: </span>
                    <span>{post.condition}</span>
                </div>
                <div className="col-md-6 d-flex justify-content-between">
                    <span>Телефонен номер: </span>
                    <span>{post.phoneNumber}</span>
                </div>
                <div className="col-md-6 d-flex justify-content-between">
                    <span>Цена: </span>
                    <span>{post.price} {post.currency}</span>
                </div>
            </div>
            <div>
                <h2>Описание</h2>
                <p>{post.description}</p>
            </div>
            <div className="btn-group">
                <button className="mx-0 btn primary">Съобщение</button>
                {
                    isOwner ?
                        <button className="m-0 btn btn-danger">Изтрии</button> : ''
                }
            </div>
        </div>
    )
}

import React, { useContext, useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap';
import PostContext from '../../../Context/PostContext';

export const PreviewPost = ({ publish }) => {

    const { post } = useContext(PostContext);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        console.log(post);
    }, [post]);

    function handlePublish() {
        setIsLoading(true);
        publish();
    }

    return (
        <div>
            <h4 className="text-center">Вашата пабликация ще изглежда по следния начин:</h4>
            <div className="row m-5 p-2 pt-0 shadow bg-light">
                <div className="text-center">
                    {post.files.map((f, i) =>
                        <img className="my-2 mx-1" key={i} style={{ width: '100px', height: '70px' }} src={f.filePath} alt="" />
                    )}
                </div>
                <div className="col-md-4 p-0">
                    <img className="w-100" src={post?.files[0].filePath} alt="" />
                </div>
                <div className="col-md-8">
                    <h2>{post.title}</h2>
                    <hr />
                    <div className="col-md-6 d-flex justify-content-between">
                        <span>Град: </span>
                        <span>{post.city}</span>
                    </div>
                    <div className="col-md-6 d-flex justify-content-between">
                        <span>Състояние: </span>
                        <span>{post.condition}</span>
                    </div>
                    {post.warning ? <div className="col-md-6 d-flex justify-content-between">
                        <span>Забележка: </span>
                        <span>{post.warning}</span>
                    </div> : ''}
                    <div className="col-md-6 d-flex justify-content-between">
                        <span>Телефонен номер: </span>
                        <span>{post.phoneNumber}</span>
                    </div>
                    <div className="col-md-6 d-flex justify-content-between">
                        <span>Цена: </span>
                        <span>{post.price} {post.currency}</span>
                    </div>
                </div>
                {
                    post.description ?
                        <div>
                            <h2>Описание</h2>
                            <div dangerouslySetInnerHTML={{ __html: post.description }}></div>
                        </div> : ''
                }
                <button disabled={isLoading} className="btn primary m-0" onClick={handlePublish}>
                    {isLoading ?
                        <Spinner animation="border" /> :
                        <span>Публикувай обявата</span>}
                </button>
            </div>
        </div>
    )
}

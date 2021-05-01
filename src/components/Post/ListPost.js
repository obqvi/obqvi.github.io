import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export const ListPost = ({ post }) => {

    const history = useHistory();

    return (
        <div className="single-post box">
            <div>
                <img className="w-100" style={{ height: '200px' }} src={post.imagePaths.split(', ')[0]} alt="" />
                <h5 className="px-4 pt-4">{post.title}</h5>
                <div className="d-flex justify-content-between">
                    <h6 className="px-4">{post.city}</h6>
                </div>
            </div>
            <div className="p-4">
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Публикувано</span>
                    <span>{new Date(post.created).toLocaleDateString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Състояние </span>
                    <span>{post.condition}</span>
                </div>
                <div className="text-center mt-4 row">
                    <h4 className="px-4">{post.price} {post.currency}</h4>
                    <button className="m-0 btn primary" onClick={() => history.push(`/details/${post.objectId}`)}>Виж</button>
                </div>
            </div>
        </div>
    )
}

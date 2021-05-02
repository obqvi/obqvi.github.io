import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export const ListPost = ({ post }) => {

    const history = useHistory();

    return (
        <div className="box single-post">
            <div>
                <img className="w-100" src={post.imagePaths.split(', ')[0]} alt="" />
            </div>
            <div className="p-4">
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
        </div>
    )
}

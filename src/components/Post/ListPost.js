import React from 'react';
import { NavLink } from 'react-router-dom';

export const ListPost = ({ post }) => {
    return (
        <div className="single-post box">
            <div>
                <img className="w-100" style={{ height: '200px' }} src={post.imagePaths.split(', ')[0]} alt="" />
                <h5 className="px-4 pt-4">{post.title}</h5>
                <div className="d-flex justify-content-between">
                    <h6 className="px-4">{post.city}</h6>
                    <h4 className="px-4">{post.price} {post.currency}</h4>
                </div>
            </div>
            <div className="p-4" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>{new Date(post.created).toLocaleDateString()}</div>
                <div className="">{post.condition}</div>
                <NavLink to={`/details/${post.objectId}`}>
                    <button className="m-0 btn primary">Виж</button>
                </NavLink>
            </div>
        </div>
    )
}

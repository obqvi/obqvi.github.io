import React from 'react'

export const ListPost = ({ post }) => {
    return (
        <div className="single-post box">
            <div>
                <img className="w-100" style={{ height: '200px' }} src={post.imageUrl} alt="" />
                <h5 className="px-4 pt-4">{post.title}</h5>
                <div className="d-flex justify-content-between">
                    <h6 className="px-4">{post.city}</h6>
                    <h4 className="px-4">{post.price} {post.currency}</h4>
                </div>
            </div>
            <div>
                <button className="m-4 btn primary">Виж</button>
            </div>
        </div>
    )
}

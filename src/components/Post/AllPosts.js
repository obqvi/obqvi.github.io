import React, { useEffect, useState } from 'react'
import { getAllPosts } from '../../models/Post';
import { ListPost } from './ListPost';

export const AllPosts = () => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getAllPosts()
            .then((data) => {
                setPosts(data);
            });
    });
    
    return (
        <div className="posts">
            {posts.map((post) => 
                <ListPost key={post.objectId} post={post} />)}
        </div>
    )
}

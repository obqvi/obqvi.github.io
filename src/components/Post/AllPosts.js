import React, { useEffect, useState } from 'react'
import { getAllPosts } from '../../models/Post';
import { ListPost } from './ListPost';

export const AllPosts = () => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        let isSubscribed = true;
        getAllPosts()
            .then(data => {
                if (isSubscribed) {
                    setPosts(data);
                }
            })

        return () => isSubscribed = false;
    }, []);

    return (
        <div className="posts">
            {posts.map((post) =>
                <ListPost key={post.objectId} post={post} />)}
        </div>
    )
}

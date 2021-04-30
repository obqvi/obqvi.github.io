import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap';
import { getAllPosts } from '../../models/Post';
import { ListPost } from './ListPost';

export const AllPosts = () => {

    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        let isSubscribed = true;
        setIsLoading(true);
        getAllPosts()
            .then(data => {
                if (isSubscribed) {
                    setPosts(data);
                    setIsLoading(false);
                }
            })

        return () => isSubscribed = false;
    }, []);

    return (
        <div className="posts">
            {
                isLoading ?
                    <Spinner animation="border" className="spinner" /> : ''
            }
            {posts.map((post) =>
                <ListPost key={post.objectId} post={post} />)}
        </div>
    )
}

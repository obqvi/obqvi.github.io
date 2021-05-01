import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { getAllPosts } from '../../models/Post';
import { ListPost } from '../Post/ListPost';
import { Sidebar } from './Sidebar';

export const FavoritePosts = () => {

    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isSubscribed = true;

        getAllPosts()
            .then((data) => {
                if (isSubscribed) {
                    setPosts(data);
                    setIsLoading(false);
                }
            })
            .catch(err => {
                console.log(err);
                setIsLoading(false);
            });

        return () => isSubscribed = false;
    }, [posts]);

    return (
        <>
            <title>Любими</title>
            <div className="row">
                <div className="col-md-2 bg-light p-0">
                    <Sidebar />
                </div>
                <div className="col-md-10 posts">
                    {isLoading ? <Spinner animation="border" className="spinner" /> : ''}
                    {
                        posts.map(post =>
                            <ListPost key={post.objectId} post={post} />
                        )
                    }
                </div>
            </div>
        </>
    )
}

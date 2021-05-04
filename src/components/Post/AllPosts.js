import React, { useContext, useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap';
import UserContext from '../../Context/UserContext';
import { getAllPosts } from '../../models/Post';
import { ListPost } from './ListPost';

export const AllPosts = () => {

    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useContext(UserContext);

    useEffect(() => {
        let isSubscribed = true;
        console.log(user);
        setIsLoading(true);
        getAllPosts()
            .then(data => {
                if (isSubscribed) {
                    setPosts(data);
                    setIsLoading(false);
                }
            })

        return () => isSubscribed = false;
    }, [user]);

    return (
        <div className="posts">
            {
                isLoading ?
                    <Spinner animation="border" className="spinner" /> : ''
            }
            <div>
                {
                    !isLoading && posts.length === 0 ?
                        <div className="box py-2">
                            <h6 className="text-center">Няма продукти</h6>
                        </div> : ''
                }
                {posts.map((post) =>
                    <ListPost key={post.objectId} post={post} user={user} />
                )}
            </div>
        </div>
    )
}

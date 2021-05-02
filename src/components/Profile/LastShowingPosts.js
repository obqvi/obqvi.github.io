import React, { useContext, useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap';
import UserContext from '../../Context/UserContext';
import { getLastShowingPosts } from '../../models/Post';
import { ListPost } from '../Post/ListPost';
import { Sidebar } from './Sidebar';

export const LastShowingPosts = () => {

    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useContext(UserContext);

    useEffect(() => {
        let isSubscribed = true;

        async function get() {
            const data = await getLastShowingPosts(user?.objectId);

            console.log(data);

            if (isSubscribed) {
                setPosts(data);
                setIsLoading(false);
            }
        }

        get();

        return () => isSubscribed = false;
    }, [user?.objectId]);

    return (
        <div className="d-flex">
            <title>Последно прегледани</title>
            <Sidebar />
            {isLoading ? <Spinner animation="border" className="spinner" /> : ''}
            <div className="posts col-md-10">
                {
                    posts.map(post =>
                        <ListPost key={post.postId.objectId} post={post.postId} />
                    )
                }
            </div>
        </div>
    )
}

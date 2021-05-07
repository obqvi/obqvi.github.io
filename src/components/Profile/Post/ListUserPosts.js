import React, { useContext, useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap';
import UserContext from '../../../Context/UserContext';
import { getAllPostsByUserId } from '../../../models/Post';
import { ListPost } from '../../Post/ListPost';
import { Sidebar } from '../Sidebar';

export const ListUserPosts = () => {

    const { user } = useContext(UserContext);
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        let isSubscribed = true;
        async function get() {
            if (isSubscribed) {
                setIsLoading(true);
                const data = await getAllPostsByUserId(user.objectId);
                setPosts(data);
                setIsLoading(false);
            }
        }

        get();

        return () => isSubscribed = false;
    }, [user]);

    return (
        <div className="flex">
            <title>Продукти - {user.username}</title>
            <Sidebar />
            <div className="posts col-md-10">
                {
                    posts.length > 0 && !isLoading ?
                        posts.map((post) =>
                            <ListPost post={post} key={post.objectId} />
                        ) : posts.length === 0 && !isLoading ?
                            <div className="mt-2 py-2 text-center box">Няма продукти</div> :
                            <Spinner animation="border" className="spinner" />
                }
            </div>
        </div>
    )
}

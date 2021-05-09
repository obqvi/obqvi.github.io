import React, { useContext, useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap';
import UserContext from '../../../Context/UserContext';
import { getLastShowingPosts, removeListLastShowingPosts } from '../../../models/Post';
import { ListPost } from '../../Post/ListPost';

export const LastShowingPosts = () => {

    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useContext(UserContext);

    useEffect(() => {
        let isSubscribed = true;

        async function get() {
            const data = await getLastShowingPosts(user?.objectId);

            if (isSubscribed) {
                setPosts(data);
                setIsLoading(false);
            }
        }

        get();

        return () => isSubscribed = false;
    }, [user?.objectId]);

    async function handleRemoveListLastShowingPosts() {
        if (window.confirm('Сигурен ли си, че искаш да изтриеш списъка?')) {
            setIsLoading(true);
            await removeListLastShowingPosts(user.objectId);
            setPosts([]);
            setIsLoading(false);
        }
    }

    return (
        <>
            <title>Последно прегледани - {user.username}</title>
            {isLoading ? <Spinner animation="border" className="spinner" /> : ''}
            <div className="posts" style={{ flex: 'auto' }}>
                {
                    posts.length > 0 ?
                        <div className="text-center">
                            <button onClick={handleRemoveListLastShowingPosts} className="btn btn-danger mb-0">Изчисти списъка</button>
                        </div> : ''
                }
                {
                    posts.map(post =>
                        <ListPost key={post.objectId} post={post.postId} />
                    )
                }
            </div>
        </>
    )
}

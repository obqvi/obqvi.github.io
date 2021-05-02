import React, { useContext, useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import UserContext from '../../Context/UserContext';
import { getFavoritePostsByUserId } from '../../models/Post';
import { ListPost } from '../Post/ListPost';
import { Sidebar } from './Sidebar';

export const FavoritePosts = () => {

    const [favoritePosts, setFavoritePosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useContext(UserContext);

    useEffect(() => {
        let isSubscribed = true;

        async function get() {
            const data = await getFavoritePostsByUserId(user?.objectId);

            if (isSubscribed) {
                setFavoritePosts(data);
                setIsLoading(false);
            }
        }

        get();

        return () => isSubscribed = false;
    }, [user?.objectId]);

    return (
        <>
            <title>Любими</title>
            <div className="d-flex">
                <Sidebar />
                <div className="posts col-md-10">
                    {favoritePosts.length === 0 && !isLoading ? <h6 className="text-center mt-4">Няма любили продукти</h6> : ''}
                    {isLoading ? <Spinner animation="border" className="spinner" /> : ''}
                    {
                        favoritePosts.map(favoritePost =>
                            <ListPost key={favoritePost.postId?.objectId} post={favoritePost?.postId} />
                        )
                    }
                </div>
            </div>
        </>
    )
}

import React, { useContext, useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import UserContext from '../../Context/UserContext';
import { getAllPosts } from '../../models/Post';
import { SortOptions } from '../Common/SortOptions';
import { ListPost } from './ListPost';

export const AllPosts = () => {

    const [posts, setPosts] = useState([]);
    const [displayPosts, setDisplayPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useContext(UserContext);

    useEffect(() => {
        let isSubscribed = true;
        setIsLoading(true);
        getAllPosts()
            .then(data => {
                if (isSubscribed) {
                    setPosts(data);
                    setDisplayPosts(data);
                    setIsLoading(false);
                }
            })

        return () => isSubscribed = false;
    }, [user]);

    return (
        <div className="posts">
            <h4 className="text-center box">Продукти, които хората продават</h4>
            <hr />
            {
                isLoading ?
                    <Spinner animation="border" className="spinner" /> : ''
            }
            {
                user ?
                    <div>
                        {displayPosts.length > 0 ? <SortOptions arr={displayPosts} setArr={(arr) => setPosts(arr)} /> : ''}
                        {
                            !isLoading && posts.length === 0 ?
                                <div className="box py-2">
                                    <h6 className="text-center">Няма продукти</h6>
                                </div> : ''
                        }
                        {posts.map((post) =>
                            <ListPost key={post.objectId} post={post} user={user} />
                        )}
                    </div> : <div className="text-center">
                        <h4>Влизане в сайта</h4>
                        <h6>Трябва да влезете за да използвате сайта</h6>
                        <NavLink className="btn primary" to="/login">Вход</NavLink>
                        <NavLink className="btn primary" to="/register">Регистранция</NavLink>
                    </div>
            }
        </div>
    )
}

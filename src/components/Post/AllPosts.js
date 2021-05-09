import React, { useContext, useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import UserContext from '../../Context/UserContext';
import { getAllPosts, getPostsByCategoryId } from '../../models/Post';
import { SortOptions } from '../Common/SortOptions';
import { ListPost } from './ListPost';

export const AllPosts = ({ categoryId }) => {

    const [posts, setPosts] = useState([]);
    const [displayPosts, setDisplayPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useContext(UserContext);

    useEffect(() => {
        let isSubscribed = true;
        async function get() {
            setIsLoading(true);
            let data;

            if(!categoryId) {
                data = await getAllPosts();
            } else {
                data = await getPostsByCategoryId(categoryId);
                console.log(data, categoryId);
            }
            if (isSubscribed) {
                setPosts(data);
                setDisplayPosts(data);
                setIsLoading(false);
            }
        }

        get();

        return () => isSubscribed = false;
    }, [user, categoryId]);

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

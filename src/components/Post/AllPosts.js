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
    const [pageNumber, setPageNumber] = useState(0);

    useEffect(() => {
        let isSubscribed = true;
        async function get() {
            setIsLoading(true);
            let data;

            
            if (!categoryId) {
                data = await getAllPosts(pageNumber);
                console.log(data);
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
    }, [categoryId, pageNumber]);

    function handleNext() {
        setPageNumber(() => pageNumber + 1);
        window.scroll(0, 100);
    }

    function handlePrev() {
        setPageNumber(() => pageNumber - 1);
        window.scroll(0, 100);
    }

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
            <div className="text-center">
                <button onClick={handlePrev} disabled={pageNumber === 0} className="btn m-2 py-2 px-4 border">
                    <i className="fas fa-arrow-left"></i>
                </button>
                <label>{pageNumber + 1}</label>
                <button onClick={handleNext} disabled={posts.length < 1} className="btn m-2 py-2 px-4 border">
                    <i className="fas fa-arrow-right"></i>
                </button>
            </div>
        </div>
    )
}

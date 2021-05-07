import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { searchPostsByQuery } from '../../models/Post';

export const SearchPosts = ({ clear, data }) => {

    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        let isSubscribed = true;

        async function get() {
            setIsLoading(true);
            const results = await searchPostsByQuery(data);
            if (isSubscribed) {
                console.log(results);
                setPosts(results);
                setIsLoading(false);
            }
        }

        get();

        return () => isSubscribed = false;
    }, [data]);

    return (
        <div className="list-group">
            <h6>Продукти</h6>
            {
                posts.length > 0 && !isLoading ?
                    posts.map((post) =>
                    <NavLink onClick={() => clear()} key={post.objectId} className="list-group-item" to={`/details/${post.objectId}`}>
                        <div>{post.title}</div>
                    </NavLink>
                    )
                    : <div>Няма намерени резултати за: {data}</div>
            }
        </div>
    )
}

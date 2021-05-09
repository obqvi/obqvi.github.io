import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { getAllCategories } from '../../models/Category';

export const ListCategories = () => {

    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        let isSubscribed = true;

        async function get() {
            if (isSubscribed) {
                const data = await getAllCategories();
                setCategories(data);
                setIsLoading(false);
            }
        }

        get();

        return () => isSubscribed = false;
    }, []);

    return (
        <div className="mx-2 box">
            <ul>
                {isLoading ? <Spinner animation="border" /> : ''}
                {
                    categories.map(category =>
                        <NavLink style={{ flex: 'auto', flexBasis: '200px', maxWidth: '200px' }} to={`/category/${category.objectId}`} key={category.objectId}>
                            <li className={`flex align-items-center my-2 shadow-sm ${id === category.objectId ? 'active' : ''}`}>
                                <div style={{ width: '70px', height: '70px' }}>
                                    {category.url ? <img className="rounded-circle" style={{ width: '70px', height: '70px' }} src={category.url} alt="" /> : ''}
                                </div>
                                <span className="mx-2">{category.title}</span>
                            </li>
                        </NavLink>
                    )
                }
            </ul>
        </div>
    )
}

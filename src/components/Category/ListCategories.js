import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { getAllCategories } from '../../models/Category';

export const ListCategories = () => {

    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isSubscribed = true;

        async function get() {
            if(isSubscribed) {
                const data = await getAllCategories();
                setCategories(data);
                setIsLoading(false);
            }
        }

        get();

        return () => isSubscribed = false;
    }, []);

    return (
        <div>
            <ul>
                {isLoading ? <Spinner animation="border" /> : ''}
                {
                    categories.map(category =>
                        <NavLink to={`/${category.objectId}`} className="flex align-items-center box my-2 shadow" style={{ flex: 'auto', flexBasis: '400px', maxWidth: '400px' }} key={category.objectId}>
                            <div style={{ width: '70px', height: '70px' }}>
                                {category.url ? <img className="rounded-circle" style={{ width: '70px', height: '70px' }} src={category.url} alt="" /> : ''}
                            </div>
                                <span className="mx-2">{category.title}</span>
                        </NavLink>
                    )
                }
            </ul>
        </div>
    )
}

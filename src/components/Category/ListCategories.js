import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { getAllCategories, getAllSubCategoriesById } from '../../models/Category';

export const ListCategories = ({ id }) => {

    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isSubscribed = true;
        let data;
        
        async function get() {
            if (id) {
                data = await getAllSubCategoriesById(id);
            } else {
                data = await getAllCategories();
            }
            
            if (isSubscribed) {
                setIsLoading(false);
                setCategories(data);
            }
        }

        get();

        return () => isSubscribed = false;
    }, [id]);

    return (
        <>
            {isLoading ? <Spinner animation="border" className="spinner" /> : ''}
            <div className="admin">
                <ul>
                    {
                        categories.length > 0 ?
                            categories.map((category) =>
                                <li style={{
                                    textAlign: 'left',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }} key={category.objectId}>
                                    <NavLink to={`/admin/${category.objectId}`}>
                                        {category.title}
                                    </NavLink>
                                    <NavLink to={`/admin/category/new/${category.objectId}`}>
                                        <i className="fas fa-plus"></i>
                                    </NavLink>
                                </li>
                            ) : <div>Тази категория е празна</div>
                    }
                </ul>
            </div>
        </>
    )
}

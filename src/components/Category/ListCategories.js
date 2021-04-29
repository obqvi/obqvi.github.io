import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { deleteCategoryById, getAllCategories, getAllSubCategoriesById } from '../../models/Category';

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

    function handleDeleteCategory(id) {
        setIsLoading(true);

        const filteredCategories = categories.filter(x => x.objectId !== id);
        
        setCategories(filteredCategories);
        
        deleteCategoryById(id)
            .then(() => {
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }

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
                                    <div>
                                        <NavLink to={`/admin/category/new/${category.objectId}`}>
                                            <i className="fas fa-plus mx-4"></i>
                                        </NavLink>
                                        <i onClick={() => handleDeleteCategory(category.objectId)} className="fas fa-plus text-danger"></i>
                                    </div>
                                </li>
                            ) : <div>Тази категория е празна</div>
                    }
                </ul>
            </div>
        </>
    )
}

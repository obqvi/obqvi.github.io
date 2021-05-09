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
            <div className="col-md-10 mx-auto p-5 my-5 box">
                <ul>
                    {
                        categories.length > 0 ?
                            categories.map((category) =>
                                <li className="my-2" style={{
                                    textAlign: 'left',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }} key={category.objectId}>
                                    <NavLink className="flex align-items-center" to={`/admin/${category.objectId}`}>
                                        <div style={{ width: '40px', height: '40px' }}>
                                            {category.url ? <img className="rounded-circle w-100 h-100" src={category?.url} alt="" /> : ''}
                                        </div>
                                        <span className="mx-2">{category.title}</span>
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

import React, { useContext, useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import PostContext from '../../../Context/PostContext';
import { getAllHatCategories, getAllSubCategoriesById } from '../../../models/Category';

export const CreatePostCategoriesWindow = ({ nextStep }) => {

    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { post, setPost } = useContext(PostContext);

    useEffect(() => {
        let isSubscribed = true;

        async function get() {
            setIsLoading(true);
            const data = await getAllHatCategories();
            setIsLoading(false);
            if (isSubscribed) {
                setCategories(data);
            }
        }

        get();

        return () => isSubscribed = false;
    }, [setIsLoading]);

    function handleSubCategories(id) {
        setIsLoading(true);
        getAllSubCategoriesById(id)
            .then((data) => {
                setIsLoading(false);
                if (data.length === 0) {
                    return handleSelectCategory(id);
                }

                setCategories(data);
            }).catch(err => console.log(err));
    }

    function handleSelectCategory(categoryId) {
        setPost({ ...post, categoryId });
        nextStep(5);
    }

    return (
        <div>
            <h4 className="text-center">Изберете категория</h4>
            <ul className="px-5">
                {
                    !isLoading ?
                        categories.map((category) =>
                            <li key={category.objectId} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <NavLink to="#" className="py-2" key={category.objectId} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div className="mx-2" style={{ width: '40px', height: '40px' }}>
                                        {category.url ? <img className="rounded-circle w-100 h-100" src={category?.url} alt="" /> : ''}
                                    </div>
                                    <span onClick={() => handleSelectCategory(category.objectId)}>{category.title}</span>
                                </NavLink>
                                <NavLink className="" to="#">
                                    <i onClick={() => handleSubCategories(category.objectId)} className="fas fa-plus"></i>
                                </NavLink>
                            </li>
                        ) : <Spinner animation="border" className="spinner" />
                }
            </ul>
        </div>
    )
}

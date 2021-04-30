import React, { useContext, useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import PostContext from '../../../Context/PostContext';
import { getAllCategories, getAllSubCategoriesById } from '../../../models/Category';

export const CreatePostCategoriesWindow = ({ nextStep }) => {

    const [categories, setCategories] = useState([]);
    const [ isLoading, setIsLoading ] = useState(false);
    const { post, setPost } = useContext(PostContext);

    useEffect(() => {
        let isSubscribed = true;

        function get() {
            setIsLoading(true);
            getAllCategories()
                .then(data => {
                    setIsLoading(false);
                    if (isSubscribed) {
                        setCategories(data);
                    }
                });
        }

        get();

        return () => isSubscribed = false;
    }, [setIsLoading]);

    function handleSubCategories(id) {
        setIsLoading(true);
        getAllSubCategoriesById(id)
            .then((data) => {
                setIsLoading(false);
                if(data.length === 0) {
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
                        <li key={category.objectId}>
                            <NavLink to="#" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} className="py-2" key={category.objectId}>
                                <span onClick={() => handleSelectCategory(category.objectId)}>{category.title}</span>
                                <i onClick={() => handleSubCategories(category.objectId)} className="fas fa-plus"></i>
                            </NavLink>
                        </li>
                    ) : <Spinner animation="border" className="spinner" />
                }
            </ul>
        </div>
    )
}

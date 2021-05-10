import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { getAllHatCategories, getAllSubCategoriesById } from '../../models/Category';

export const ListCategories = () => {

    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        let isSubscribed = true;

        async function get() {
            if (isSubscribed) {
                const data = await getAllHatCategories();
                setCategories(data);
                setIsLoading(false);
            }
        }

        get();

        return () => isSubscribed = false;
    }, []);

    async function handleSubCategory(categoryId) {
        const data = await getAllSubCategoriesById(categoryId);
        if (data.length > 0) {
            setCategories(data);
        }

        history.push(`/category/${categoryId}`);
    }

    return (
        <div className="mx-2 box">
            <ul>
                {isLoading ? <Spinner animation="border" /> : ''}
                {
                    categories.map(category =>
                        <li style={{ cursor: 'pointer' }} key={category.objectId} onClick={() => handleSubCategory(category.objectId)} className={`flex align-items-center my-2 shadow-sm ${id === category.objectId ? 'active' : ''}`}>
                            <div style={{ width: '40px', height: '40px' }}>
                                {category.url ? <img className="rounded-circle p-2" style={{ width: '40px', height: '40px' }} src={category.url} alt="" /> : ''}
                            </div>
                            <span className="mx-2">{category.title}</span>
                        </li>
                    )
                }
                <button disabled={history.length === 0} onClick={() => history.goBack()} className="btn primary p-2 m-0 w-100">
                    <i className="fas fa-arrow-left"></i>
                </button>
            </ul>
        </div>
    )
}

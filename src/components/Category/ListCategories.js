import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { getAllHatCategories, getAllSubCategoriesById } from '../../models/Category';

export const ListCategories = () => {

    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [subCategoriesWindow, setSubCategoriesWindow] = useState(false);
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
        setIsLoading(true);
        const data = await getAllSubCategoriesById(categoryId);
        setIsLoading(false);
        if (data.length > 0) {
            setSubCategoriesWindow(true);
            return setSubCategories(data);
        }

        history.push('/category/' + categoryId);
    }

    return (
        <>
            {subCategoriesWindow ?
                <div className="box fade-in p-2 shadow mx-auto rounded" style={{
                    minWidth: '600px',
                    maxWidth: '400px',
                    position: 'fixed',
                    left: '25%',
                    top: '25%',
                }}>
                    <div className="p-4 fade-in">
                        <ul>
                            {
                                subCategories.map(category =>

                                    <NavLink to={`/category/${category.objectId}`} onClick={() => setSubCategoriesWindow(false)} style={{ cursor: 'pointer' }} key={category.objectId} className={`flex align-items-center my-2 shadow-sm ${id === category.objectId ? 'active' : ''}`}>
                                        <div style={{ width: '40px', height: '40px' }}>
                                            {category.url ? <img className="rounded-circle p-2" style={{ width: '40px', height: '40px' }} src={category.url} alt="" /> : ''}
                                        </div>
                                        <span className="mx-2">{category.title}</span>
                                    </NavLink>
                                )
                            }
                        </ul>
                    </div>
                    <button onClick={() => setSubCategoriesWindow(false)} className="btn btn-danger m-0 p-1 px-4">Отказ</button>
                </div> : ''}
            <div className="mx-2 box">
                <ul>
                    {isLoading ? <Spinner animation="border" className="spinner" /> : ''}
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
        </>
    )
}

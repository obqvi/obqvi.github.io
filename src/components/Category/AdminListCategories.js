import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { deleteCategoryById, getAllHatCategories, getAllSubCategoriesById } from '../../models/Category';
import { setRelationTo } from '../../models/Common';
import { EditCategory } from './EditCategory';

export const AdminListCategories = ({ id }) => {

    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isMoveCategory, setIsMoveCategory] = useState('');
    const [editingWindow, setEditingWindow] = useState('');

    useEffect(() => {
        let isSubscribed = true;
        let data;

        async function get() {
            if (id) {
                data = await getAllSubCategoriesById(id);
            } else {
                data = await getAllHatCategories();
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

    async function handleIsMoveCategory(id) {
        if (id === isMoveCategory) {
            setIsMoveCategory('');
        } else {
            setIsMoveCategory(id);
        }
    }

    async function handleMoveCategory(toId) {
        if (isMoveCategory) {
            await setRelationTo(isMoveCategory, toId, 'categoryId', 'Category');
            let arr = [...categories];
            const index = arr.findIndex(x => x.objectId === isMoveCategory);
            arr.splice(index, 1);
            setCategories(arr);
            setIsMoveCategory('');
        }
    }

    function updateCategoryAfterEdit(category) {
        let arr = [...categories];
        const index = arr.findIndex(x => x.objectId === category.objectId);
        arr[index] = category;
        setCategories(arr);
    }

    return (
        <>
            {isLoading ? <Spinner animation="border" className="spinner" /> : ''}
            <div className="col-md-10 mx-auto p-5 my-5 box">
                <ul>
                    {
                        categories.length > 0 ?
                            categories.map((category) =>
                                <li onClick={() => handleMoveCategory(category.objectId)} onDoubleClick={() => handleIsMoveCategory(category.objectId)}
                                    className={`my-2 ${isMoveCategory !== '' && isMoveCategory !== category.objectId ? 'bg-success text-light' : ''} ${isMoveCategory === category.objectId ? 'bg-warning box' : ''}`} style={{
                                        textAlign: 'left',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }} key={category.objectId}>
                                    <NavLink style={{ display: 'flex' }} className="flex align-items-center" to={`/admin/${category.objectId}`}>
                                        <div style={{ width: '40px', height: '40px' }}>
                                            {category.url ? <img className="rounded-circle w-100 h-100" src={category?.url} alt="" /> : ''}
                                        </div>
                                        <span className="mx-2">{category.title}</span>
                                    </NavLink>
                                    <div>
                                        <NavLink to={`/admin/category/new/${category.objectId}`}>
                                            <i className="fas fa-plus mx-2"></i>
                                        </NavLink>
                                        <span onClick={() => setEditingWindow(category)}>
                                            <i className="fas fa-pen mx-2"></i>
                                        </span>
                                        <i onClick={() => handleDeleteCategory(category.objectId)} className="mx-2 fas fa-plus text-danger"></i>
                                    </div>
                                </li>
                            ) : <div>Тази категория е празна</div>
                    }
                </ul>
            </div>
            {editingWindow ? <EditCategory setCategory={(category) => updateCategoryAfterEdit(category)} closeWindow={() => setEditingWindow(false)} category={editingWindow} /> : ''}
        </>
    )
}

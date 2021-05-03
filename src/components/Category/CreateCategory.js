import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { createCategory, setRelationCategoryToSelf } from '../../models/Category';
import { AdminNavigation } from '../Admin/AdminNavigation';

export const CreateCategory = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        console.log(id);
    });

    function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const title = formData.get('title');

        setIsLoading(true);
        setIsValid(false);

        createCategory({ title })
            .then((category) => {
                if (id) {
                    setRelationCategoryToSelf(category.objectId, id)
                        .then(() => {
                            return setIsLoading(false);
                        });
                }

                setIsLoading(false);
                event.target.title.focus();
                event.target.title.value = '';
            });
    }

    return (
        <div className="flex">
            <title>Създаване на категория</title>
            <AdminNavigation />
            <div className="text-center col-md-10" style={{ minHeight: '100vh' }}>
                <form onSubmit={handleSubmit} className="box w-50 mx-auto p-5">
                <h2>Създаване на категория</h2>
                    <input className="form-control box p-2 border" onChange={(event) => setIsValid(event.target.value !== '')} placeholder="Згалавие на категорята" autoFocus type="text" name="title" />
                    <button disabled={!isValid} className="btn primary">
                        {isLoading ?
                            <Spinner animation="border" size="sm" className="ml-2" /> : 'Добави'}
                    </button>
                </form>
            </div>
        </div>
    )
}

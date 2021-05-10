import React, { useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { createCategory } from '../../models/Category';
import { AdminNavigation } from '../Admin/AdminNavigation';
import { setRelationTo } from '../../models/Common';
import { API_KEY, UPLOAD_PRESEND } from '../../configuration.cloudinary';
import axios from 'axios';

export const CreateCategory = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const { id } = useParams();
    const [file, setFile] = useState('');
    const [fileToShow, setFileToShow] = useState('');

    function handleUpload(event) {
        const file = event.target.files[0];
        setFile(file);
        setFileToShow(URL.createObjectURL(file));
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const title = formData.get('title');

        setIsLoading(true);
        setIsValid(false);

        const formDataUpload = new FormData();
        formDataUpload.append("file", file);
        formDataUpload.append("upload_preset", UPLOAD_PRESEND);
        formDataUpload.append("api_key", API_KEY);
        let path = '';
        if (file) {
            const res = await axios.post(`https://api.cloudinary.com/v1_1/damosyaq8/image/upload`, formDataUpload, {
                headers: { "X-Requested-With": "XMLHttpRequest" },
            });
            path = res.data.secure_url;
        }
        const category = await createCategory({ title, url: path });
        if (id) {
            await setRelationTo(category.objectId, id, 'categoryId', 'Category');
        }
        setIsLoading(false);
        event.target.title.focus();
        event.target.title.value = '';
        event.target.url.value = '';
        setFileToShow('');
        setFile('');
    }

    return (
        <div className="flex">
            <title>Създаване на категория</title>
            <AdminNavigation />
            <div className="text-center col-md-10" style={{ minHeight: '100vh' }}>
                <form onSubmit={handleSubmit} className="box w-50 mx-auto p-5">
                    <h2>Създаване на категория</h2>
                    <input className="form-control box p-2 border" onChange={(event) => setIsValid(event.target.value !== '')} placeholder="Згалавие на категорята" autoFocus type="text" name="title" />
                    <input className="form-control box p-2 border my-2" type="file" onChange={handleUpload} name="url" />
                    <div>
                        {
                            fileToShow ?
                                <img style={{ width: '70px', height: '70px' }} className="rounded-circle" src={fileToShow} alt="" />
                                : ''
                        }
                    </div>
                    <button disabled={!isValid} className="btn primary">
                        {isLoading ?
                            <Spinner animation="border" size="sm" className="ml-2" /> : 'Добави'}
                    </button>
                </form>
            </div>
        </div>
    )
}

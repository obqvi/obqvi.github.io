import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap';
import { API_KEY, UPLOAD_PRESEND } from '../../configuration.cloudinary';
import { updateCategory } from '../../models/Category';

export const EditCategory = ({ category, setCategory, closeWindow }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [isValid, setIsValid] = useState(category ? true : false);
    const [file, setFile] = useState('');
    const [fileToShow, setFileToShow] = useState('');
    const [fileIsEditted, setFileIsEditted] = useState(false);

    useEffect(() => {
        setFileToShow(category?.url);
    }, [category]);

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
        if (file && fileIsEditted) {
            const res = await axios.post(`https://api.cloudinary.com/v1_1/damosyaq8/image/upload`, formDataUpload, {
                headers: { "X-Requested-With": "XMLHttpRequest" },
            });
            path = res.data.secure_url;
        }

        await updateCategory({ objectId: category.objectId, title, url: fileIsEditted ? path : fileToShow });
        setCategory({ objectId: category.objectId, title, url: path });
        setIsLoading(false);
        event.target.title.focus();
        event.target.title.value = '';
        event.target.url.value = '';
        setFileToShow('');
        setFile('');
        closeWindow();
    }

    function handleUpload(event) {
        setFileIsEditted(true);
        const file = event.target.files[0];
        setFile(file);
        setFileToShow(URL.createObjectURL(file));
    }

    return (
        <div className="window-alert box shadow p-4" style={{ position: 'fixed' }}>
            <h4 className="text-center">Редактиране на категория</h4>
            <form onSubmit={handleSubmit} className="box mx-auto p-5">
                <input defaultValue={category.title} className="form-control box p-2 border" onChange={(event) => setIsValid(event.target.value !== '')} placeholder="Згалавие на категорята" autoFocus type="text" name="title" />
                <input defaultValue={fileToShow} className="form-control box p-2 border my-2" type="file" onChange={handleUpload} name="url" />
                <div>
                    {
                        fileToShow ?
                            <img style={{ width: '70px', height: '70px' }} className="rounded-circle" src={fileToShow} alt="" />
                            : ''
                    }
                </div>
                <button disabled={!isValid} className="btn primary">
                    {isLoading ?
                        <Spinner animation="border" size="sm" className="ml-2" /> : 'Редактиране'}
                </button>
                <button onClick={closeWindow} className="btn btn-danger">Отказ</button>
            </form>
        </div>
    )
}

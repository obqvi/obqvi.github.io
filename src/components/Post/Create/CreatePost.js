import React, { useState } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';

import PostContext from '../../../Context/PostContext';

import { API_KEY, UPLOAD_PRESEND } from '../../../Cloudinary/config';

import './CreatePost.css';

import { CreatePostBasicData } from './CreatePostBasicData';
import { CreatePostDescription } from './CreatePostDescription';
import { CreatePostFilesUpload } from './CreatePostFilesUpload';
import { createPost } from '../../../models/Post';
import { CreatePostCategoriesWindow } from './CreatePostCategoriesWindow';
import { PreviewPost } from './PreviewPost';

export const CreatePost = () => {
    const history = useHistory();
    const [step, setStep] = useState(1);
    const [post, setPost] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isPreview, setIsPreview] = useState(false);

    function handleSubmit() {
        let paths = [];
        setIsLoading(true);

        const uploaders = post.files.map(file => {
            const formData = new FormData();
            formData.append("file", file.plain);
            formData.append("upload_preset", UPLOAD_PRESEND);
            formData.append("api_key", API_KEY);

            return axios.post(`https://api.cloudinary.com/v1_1/damosyaq8/image/upload`, formData, {
                headers: { "X-Requested-With": "XMLHttpRequest" },
            }).then(res => {
                const data = res.data;
                const fileUrl = data.secure_url;
                paths.push(fileUrl);
            });
        });

        axios.all(uploaders)
            .then(() => {
                createPost({ ...post, imagePaths: paths.join(', ').toString() })
                    .then((data) => {
                        setIsLoading(false);
                        history.push('/details/' + data.objectId);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            })

    }

    function loadPreview() {
        setIsPreview(true);
    }

    return (
        <>
            <PostContext.Provider value={{ post, setPost }}>
                {isPreview ? <PreviewPost isLoading={isLoading} publish={handleSubmit} /> : ''}
            </PostContext.Provider>
            <div className="form">
                <div className="row">
                    <div className="col-md-3">
                        {
                            step > 1 && step < 6 ?
                                <button onClick={() => setStep(step - 1)} className="btn-primary px-1">
                                    <i className="fas fa-arrow-left px-2"></i>
                                </button> : ''
                        }
                    </div>
                    <h2 className="col-md-6" onClick={() => console.log(post)}>Добави продукт</h2>
                    <h2 className="col-md-3">{step}/5</h2>
                </div>
                <PostContext.Provider value={{ post, setPost }}>
                    {
                        step === 1 ?
                            <CreatePostBasicData nextStep={(step) => setStep(step)} />
                            :
                            step === 2 ?
                                <CreatePostFilesUpload nextStep={(step) => setStep(step)} />
                                :
                                step === 3 ?
                                    <CreatePostDescription nextStep={(step) => setStep(step)} />
                                    : step === 4 ?
                                        <CreatePostCategoriesWindow nextStep={(step) => setStep(step)} />
                                        : step === 5 && isPreview === false ?
                                            <div className="text-center">
                                                <h2>Край</h2>
                                                <button className="btn primary" onClick={loadPreview}>
                                                    {!isLoading ? 'Напред' : ''}
                                                </button>
                                            </div> : ''
                    }
                </PostContext.Provider>
                <button className="btn-primary px-4" onClick={() => history.goBack()}>
                    <i className="fas fa-arrow-left px-2"></i>
                Отказ
                </button>
            </div>
        </>
    )
}
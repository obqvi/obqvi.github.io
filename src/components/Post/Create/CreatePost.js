import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';

import PostContext from '../../../Context/PostContext';

import { API_KEY, UPLOAD_PRESEND } from '../../../configuration.cloudinary';

import './CreatePost.css';

import { CreatePostBasicData } from './CreatePostBasicData';
import { CreatePostDescription } from './CreatePostDescription';
import { CreatePostFilesUpload } from './CreatePostFilesUpload';
import { createPost, setRelationToCategory, setRelationToUser } from '../../../models/Post';
import { CreatePostCategoriesWindow } from './CreatePostCategoriesWindow';
import { PreviewPost } from './PreviewPost';
import UserContext from '../../../Context/UserContext';

export const CreatePost = () => {
    const history = useHistory();
    const [step, setStep] = useState(1);
    const [post, setPost] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isPreview, setIsPreview] = useState(false);
    const { user } = useContext(UserContext);

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
            .then(async () => {
                try {
                    const data = await createPost({ ...post, imagePaths: paths.join(', ').toString() });
                    await setRelationToCategory(data.objectId, post.categoryId);
                    await setRelationToUser(data.objectId, user.objectId);
                    setIsLoading(false);
                    history.push('/details/' + data.objectId);
                } catch (err) {
                    console.log(err);
                }
            })

    }

    function loadPreview() {
        setIsPreview(true);
    }

    return (
        <>
            <div style={{ minHeight: '100vh' }}>
                <PostContext.Provider value={{ post, setPost }}>
                    {isPreview ? <PreviewPost isLoading={isLoading} publish={handleSubmit} /> : ''}
                </PostContext.Provider>
                <div className="form box">
                    <div className="flex justify-content-between">
                        <div>
                            {
                                step > 1 && step < 6 ?
                                    <button onClick={() => setStep(step - 1)} className="btn-primary px-1">
                                        <i className="fas fa-arrow-left px-2"></i>
                                    </button> : ''
                            }
                        </div>
                        <h4>Добави продукт</h4>
                        <h4>{step}/5</h4>
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
            </div>
        </>
    )
}
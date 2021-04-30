import React, { useContext, useEffect, useState } from 'react'
import PostContext from '../../../Context/PostContext';

export const CreatePostFilesUpload = ({ nextStep }) => {

    const [file, setFile] = useState('');
    const [files, setFiles] = useState([]);
    const [error, setError] = useState('');
    const { post, setPost } = useContext(PostContext);

    useEffect(() => {
        if(post.files) setFiles(post?.files);
    }, [post.files]);

    function handleUpload(event) {
        const file = event.target.files[0];

        if (files.length === 12) {
            setError('Можете да качите до 12 снимки!');
            return;
        }

        if(files.some(x => x.name === file.name)) {
            setError('Тази снимка вече съществува!');
            return;
        }

        try {
            setFiles([...files, { filePath: URL.createObjectURL(file), name: file.name, plain: file }]);
            setFile(file);
            setError('');
        } catch (err) {
            setError(err);
            console.log(err);
        }
    }

    function handleDel(name) {
        const filteredFiles = files.filter(x => x.name !== name);
        setFiles(filteredFiles);
        setError('');
    }

    function handleNextStep() {
        if(files.length === 0) {
            return setError('Трябша да качите поне една снимка.');
        }
        
        setPost({...post, files: files });
        nextStep(3);
    }

    return (
        <div className="text-center">
            <div className="error">{error}</div>
            <h6>Качи снимки ({files?.length}/12)</h6>
            <button className="btn primary">
                <label>
                    Качи снимки
                <input onChange={handleUpload} hidden type="file" id="file" />
                </label>
            </button>
            <span>{file.name}</span>
            <div className="p-4 row">
                {
                    files?.map((f) =>
                        <div key={f.name} className="col-md-4 mt-2 border p-0">
                            <img className="w-100" src={f.filePath} alt={f.name} />
                            <span>{f.name}</span>
                            <div>
                                <button onClick={() => handleDel(f.name)} className="w-100 btn-danger">Изтрии</button>
                            </div>
                        </div>
                    )
                }
            </div>
            <button onClick={handleNextStep} className="btn primary">Напред</button>
        </div>
    )
}

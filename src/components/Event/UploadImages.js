import React, { useContext, useEffect, useState } from 'react'
import EventContext from '../../Context/EventContext';

export const UploadImages = ({ handleInput }) => {

    const [filesToShow, setFilesToShow] = useState([]);
    const [fileToShow, setFileToShow] = useState([]);

    const { eventContext, setEventContext } = useContext(EventContext);
    
    useEffect(() => {
        if(!eventContext) return;

        setFilesToShow(eventContext.fileUrls?.map(x => URL.createObjectURL(x)));
        setFileToShow(URL.createObjectURL(eventContext?.cover));
    }, [eventContext]);

    function handleUploadMultipleImages(event) {
        const files = event.target.files;
        let arr = [];

        [...files].forEach((f) => {
            arr.push(URL.createObjectURL(f));
        });

        setFilesToShow(arr);
        setEventContext({ ...eventContext, fileUrls: [...files] });
    }

    function handleUpload(event) {
        const file = event.target.files[0];
        handleInput(file?.name);
        setFileToShow(URL.createObjectURL(file));
        setEventContext({ ...eventContext, cover: file });
    }

    return (
        <>
            <div className="mt-2" style={{ flex: 'auto' }}>
                <label>Снимка на корицата</label>
                <input disabled={eventContext?.onPublish} className="form-control box p-2 border" onChange={handleUpload} type="file" name="files" />
                <div className="p-2">
                    <img style={{ width: '100%' }} src={fileToShow} alt="" />
                </div>
            </div>
            <div className="mt-2" style={{ flex: 'auto' }}>
                <label>Снимкаи на събитието</label>
                <input disabled={eventContext?.onPublish} className="form-control box p-2 border" onChange={handleUploadMultipleImages} type="file" name="files" multiple />
                <div className="flex p-2 gap-2">
                    {
                        filesToShow?.map((f) =>
                            <div key={f} style={{ flex: 'auto' }}>
                                <img style={{ width: '100%', height: '100%' }} src={f} alt="" />
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    )
}

import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router';
import { API_KEY, UPLOAD_PRESEND } from '../../configuration.cloudinary';
import EventContext from '../../Context/EventContext';
import UserContext from '../../Context/UserContext';
import { createEvent } from '../../models/Event';
import { setRelationTo } from '../../models/Message';
import { CreateForm } from './CreateForm';
import { Preview } from './Preview';

export const Create = () => {

    const [eventContext, setEventContext] = useState();
    const [isLoadPreview, setIsLoadPreview] = useState(false);
    const history = useHistory();
    const { user } = useContext(UserContext);

    function loadPreview() {
        setIsLoadPreview(true);
    }

    async function publish() {
        setEventContext({ ...eventContext, onPublish: true });

        let paths = [];

        const images = [...eventContext.fileUrls || [], eventContext?.cover];

        const uploaders = images.map(file => {
            const formData = new FormData();
            formData.append("file", file);
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
                const lastPath = paths[paths.length - 1];
                paths.splice(paths.length - 1, 1);
                console.log(paths);
                const data = await createEvent({
                    title: eventContext.title,
                    start: eventContext.start,
                    startHour: eventContext.startHour,
                    end: eventContext.end,
                    endHour: eventContext.endHour,
                    confidentiality: eventContext.confidentiality,
                    description: eventContext.description,
                    location: eventContext.location,
                    priceOfTicket: eventContext.priceOfTicket,
                    cover: lastPath,
                    fileUrls: paths
                });

                await setRelationTo('Event', 'userId', data.objectId, user.objectId);

                history.push('/event/details/' + data.objectId);
            })
            .catch(err => {
                console.log(err);
            });
    }

    function cancel() {
        setIsLoadPreview(false);
        setEventContext({ ...eventContext, onPublish: false });
    }

    return (
        <>
            <EventContext.Provider value={{ eventContext, setEventContext }}>
                {isLoadPreview ? <Preview publish={publish} cancel={cancel} /> :
                    <CreateForm loadPreview={loadPreview} />}
            </EventContext.Provider>
        </>
    )
}
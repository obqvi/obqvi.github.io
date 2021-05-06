import React, { useContext, useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap';
import { useParams } from 'react-router';
import UserContext from '../../Context/UserContext';
import { getEventById } from '../../models/Event';

export const Details = () => {

    const [event, setEvent] = useState();
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useContext(UserContext);

    useEffect(() => {
        let isSubscribed = true;

        async function get() {
            if (isSubscribed) {
                setIsLoading(true);
                const data = await getEventById(id);
                setIsLoading(false);
                setEvent(data);
            }
        }

        get();

        return () => isSubscribed = false;
    }, [id]);

    return (
        <div>
            <title>{event?.title}</title>
            {
                event || isLoading ?
                    <div className="box m-2 p-2 mx-auto" style={{ maxWidth: '600px' }}>
                        {event.cover ? <img style={{ width: '100%', flex: 'auto' }} src={URL.createObjectURL(event.cover)} alt="" /> : ''}
                        <h4 className="mt-2">{event.title}</h4>
                        <h6 className="row">
                            <div className="col-md-6">
                                <span>Начало на: </span>
                                <p className="text-primary">{new Date(event.start).toLocaleDateString()}{event.startHour}</p>
                            </div>
                            <div className="col-md-6">
                                <span>Край на: </span>
                                <p className="text-primary">{new Date(event.end).toLocaleDateString()}{event.endHour}</p>
                            </div>
                        </h6>
                        <div>
                            <h4>Описание</h4>
                            <p>{event.description}</p>
                        </div>
                        <div>
                            <h4>Подробности</h4>
                            <h6>
                                <i className="fas fa-lock"></i>
                                <span className="mx-2">{event.confidentiality}</span>
                            </h6>
                            <h6>
                                <img style={{ width: '50px', height: '50px', borderRadius: '25px' }} src={user.url} alt="" />
                            </h6>
                        </div>
                        <div>
                            <h4>Снимки</h4>
                            {
                                event?.fileUrls?.map((f) =>
                                    <img key={f.name} className="w-50" src={URL.createObjectURL(f)} alt="" />)
                            }
                        </div>
                        <div>
                            <button className="btn btn-danger">Изтрии</button>
                        </div>
                    </div>
                    : <Spinner animation="border" className="spinner" />
            }
        </div>
    )
}

import React, { useContext, useState } from 'react'
import { Spinner } from 'react-bootstrap';
import EventContext from '../../Context/EventContext';
import UserContext from '../../Context/UserContext';

export const Preview = ({ publish, cancel }) => {

    const { eventContext } = useContext(EventContext);
    const { user } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);

    function handlePublish() {
        setIsLoading(true);
        publish();
    }

    return (
        <>
            <div className="text-center box" style={{ backgroundColor: 'transparent' }}>
                <button disabled={isLoading} className="box btn primary" onClick={handlePublish}>
                    {isLoading ? <Spinner animation="border" /> : 'Публикувай'}
                </button>
                <button className="btn btn-danger" onClick={cancel}>Назад</button>
                <h4>Събитието ще изглежда по този начин</h4>
            </div>
            <title>Ново събитие</title>
            <div className="box m-2 p-2 mx-auto" style={{ maxWidth: '600px' }}>
                {eventContext.cover ? <img style={{ width: '100%', flex: 'auto' }} src={URL.createObjectURL(eventContext.cover)} alt="" /> : ''}
                <h4 className="mt-2">{eventContext.title}</h4>
                <h6 className="row">
                    <div className="col-md-6">
                        <span>Начало на: </span>
                        <p className="text-primary">{new Date(eventContext.start).toLocaleDateString()}{eventContext.startHour}</p>
                    </div>
                    <div className="col-md-6">
                        <span>Край на: </span>
                        <p className="text-primary">{new Date(eventContext.end).toLocaleDateString()}{eventContext.endHour}</p>
                    </div>
                </h6>
                <div>
                    <h4>Описание</h4>
                    <p>{eventContext.description}</p>
                </div>
                <div>
                    <h4>Подробности</h4>
                    <h6>
                        <i className="fas fa-lock"></i>
                        <span className="mx-2">{eventContext.confidentiality}</span>
                    </h6>
                    <h6>
                        <img style={{ width: '50px', height: '50px', borderRadius: '25px' }} src={user.url} alt="" />
                    </h6>
                </div>
                <div>
                    <h4>Снимки</h4>
                    {
                        eventContext?.fileUrls?.map((f) =>
                            <img key={f.name} className="w-50" src={URL.createObjectURL(f)} alt="" />)
                    }
                </div>
            </div>
        </>
    )
}

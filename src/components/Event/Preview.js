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
            <div className="fade-in text-center box" style={{ backgroundColor: 'transparent' }}>
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
                        <p>{eventContext.start}, {eventContext.startHour}</p>
                    </div>
                    <div className="col-md-6">
                        <span>Край на: </span>
                        <p>{eventContext.end}, {eventContext.endHour}</p>
                    </div>
                </h6>
                <div>
                    <h4>Описание</h4>
                    <div dangerouslySetInnerHTML={{ __html: eventContext.description }}></div>
                </div>
                <div>
                    <h4>Подробности</h4>
                    <ul>
                        <li>
                            <i className="fas fa-lock"></i>
                            <span className="mx-2">{eventContext.confidentiality}</span>
                        </li>
                        <li>
                            <i className="fas fa-user"></i>
                            <span className="mx-2">Създадено от:</span>
                            <img style={{ width: '40px', height: '40px', borderRadius: '25px' }} src={user.url} alt="" />
                            <span className="mx-2">{user.username}</span>
                        </li>
                        <li>
                            <i className="fas fa-users"></i>
                            <span className="mx-2">Имат интерес: </span>
                            <span className="mx-2">1</span>
                            <button className="btn border-0 box p-1 m-0">Покажи</button>
                        </li>
                        <li>
                            <div>
                                <i className="fas fa-map"></i>
                                <span className="mx-2">{eventContext.location}</span>
                            </div>
                        </li>
                        <li>
                            <div>
                                <i className="fas fa-dollar-sign"></i>
                                <span className="mx-2">{eventContext.priceOfTicket}</span>
                            </div>
                        </li>
                    </ul>
                </div>
                {
                    eventContext?.fileUrls?.lenght > 0 ?
                        <div>
                            <h4>Снимки</h4>
                            {
                                eventContext?.fileUrls?.map((f) =>
                                    <img key={f.name} className="fade-in w-50" src={URL.createObjectURL(f)} alt="" />)
                            }
                        </div>
                        : ''
                }
            </div>
        </>
    )
}

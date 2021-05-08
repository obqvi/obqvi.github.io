import React, { useContext, useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router';
import EventPostDetailsCommentsContext from '../../Context/EventPostDetailsCommentsContext';
import UserContext from '../../Context/UserContext';
import { getEventById, interestedEvent, removeEventById } from '../../models/Event';
import { CommentsList } from '../Comment/CommentsList';
import { CreateComment } from '../Comment/CreateComment';

export const Details = () => {

    const [event, setEvent] = useState();
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [isInterested, setIsInterested] = useState(false);
    const [isFullContent, setIsFullContent] = useState(false);
    const { user } = useContext(UserContext);
    const history = useHistory();
    const [interestedUsers, setInterestedUsers] = useState([]);
    const [commentsContext, setCommentContext] = useState([]);

    useEffect(() => {
        let isSubscribed = true;

        async function get() {
            setIsLoading(true);
            const data = await getEventById(id);
            if (isSubscribed) {
                setInterestedUsers(data.interestedUsers || []);
                setIsInterested(data.interestedUsers?.some(x => x === user.objectId));
                setEvent(data);
                setIsLoading(false);
            }
        }

        get();

        return () => isSubscribed = false;
    }, [id, user]);

    async function handleRemoveEvent() {
        if (window.confirm('Сигурен ли си, че искаш да изтриеш събитието?')) {
            setIsLoading(true);
            await removeEventById(event.objectId);
            setIsLoading(false);
            history.push('/events');
        }
    }

    async function handleInterested() {
        let arr = [...interestedUsers];

        if (!isInterested) {
            arr = [...interestedUsers, user.objectId];
            setIsInterested(true);
        } else {
            const i = arr.indexOf(user.objectId);
            arr.splice(i, 1);
            setIsInterested(false);
        }

        await interestedEvent({ ...event, interestedUsers: arr });
        setInterestedUsers(arr);
        setIsLoading(false);
    }

    return (
        <div className="flex justify-content-center">
            <title>{event?.title}</title>
            {
                !isLoading && event && user && interestedUsers ?
                    <div className="box m-2 p-2" style={{ maxWidth: '600px' }}>
                        {event.cover ? <img style={{ width: '100%', flex: 'auto' }} src={event.cover} alt="" /> : ''}
                        <div className="flex mt-2 gap-2">
                            <button onClick={handleInterested} className={`btn border-0 box p-1 m-0 ${isInterested ? 'primary' : ''}`}>
                                <i className="fas fa-star"></i>
                                <span className="mx-2">
                                    {!isInterested ? 'Имам интерес' : 'Нямам интерес'}
                                </span>
                            </button>
                            {user.objectId === event.userId?.objectId ? <button onClick={handleRemoveEvent} className="btn box p-1 m-0 text-danger">Изтрии</button> : ''}
                        </div>
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
                            {
                                isFullContent ?
                                    <div>
                                        <div className="box" dangerouslySetInnerHTML={{ __html: event.description }} id="description"></div>
                                        <a onClick={() => setIsFullContent(false)} href="#description">Покажи по-малко</a>
                                    </div>
                                    : <div>
                                        <div dangerouslySetInnerHTML={{ __html: String(event.description).substring(0, 1000) + '...' }} id="description"></div>
                                        <a onClick={() => setIsFullContent(true)} href="#description">Покажи цялото</a>
                                    </div>
                            }
                        </div>
                        <ul>
                            <h4>Подробности</h4>
                            <li>
                                <i className="fas fa-lock"></i>
                                <span className="mx-2">{event.confidentiality}</span>
                            </li>
                            <li>
                                <i className="fas fa-user"></i>
                                <span className="mx-2">Създадено от:</span>
                                <img style={{ width: '40px', height: '40px', borderRadius: '25px' }} src={event.userId?.url} alt="" />
                                <span className="mx-2">{event.userId?.username}</span>
                            </li>
                            <li>
                                <i className="fas fa-users"></i>
                                <span className="mx-2">Имат интерес: </span>
                                <span className="mx-2">{interestedUsers.length}</span>
                                <button className="btn border-0 box p-1 m-0">Покажи</button>
                            </li>
                            <li>
                                <div>
                                    <i className="fas fa-map"></i>
                                    <span className="mx-2">{event.location}</span>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <i className="fas fa-dollar-sign"></i>
                                    <span className="mx-2">{event.priceOfTicket}</span>
                                </div>
                            </li>
                        </ul>
                        <div>
                            {event.fileUrls?.length > 0 ? <h4>Снимки</h4> : ''}
                            {
                                event.fileUrls?.map((f) =>
                                    <img key={f} className="w-50" src={f} alt="" />)
                            }
                        </div>
                    </div>
                    : <Spinner animation="border" className="spinner" />
            }
            <div className="box text-center m-2" style={{ flex: 'auto', maxWidth: '600px' }}>
                <EventPostDetailsCommentsContext.Provider value={{ commentsContext, setCommentContext }}>
                    <div>
                        <CreateComment eventId={event?.objectId} />
                        <CommentsList eventId={event?.objectId} />
                    </div>
                </EventPostDetailsCommentsContext.Provider>
            </div>
        </div>
    )
}

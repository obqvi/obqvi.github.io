import React, { useContext, useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router';
import EventPostDetailsCommentsContext from '../../Context/EventPostDetailsCommentsContext';
import UserContext from '../../Context/UserContext';
import { addRelationTo, setRelationTo, delRelationTo } from '../../models/Common';
import { getEventById, removeEventById, updateHistoryEvent } from '../../models/Event';
import { setAsLastShowingEvent } from '../../models/Event';
import { CommentsList } from '../Comment/CommentsList';
import { CreateComment } from '../Comment/CreateComment';
import { InterestedUsers } from './InterestedUsers';

export const Details = () => {

    const [event, setEvent] = useState();
    const [interestedUsers, setInterestedUsers] = useState([]);
    const [commentsContext, setCommentContext] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isInterested, setIsInterested] = useState(false);
    const [isFullContent, setIsFullContent] = useState(false);
    const [isShowInterestedUsers, setIsShowInterestedUsers] = useState(false);
    const [isShowLikes, setIsShowLikes] = useState(false);
    const [isShowUsersGo, setIsShowUsersGo] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [isWillGo, setIsWillGo] = useState(false);
    const { id } = useParams();
    const { user } = useContext(UserContext);
    const history = useHistory();

    useEffect(() => {
        let isSubscribed = true;

        async function get() {
            if (isSubscribed) {
                setIsLoading(true);
                const data = await getEventById(id);
                setInterestedUsers(data.interestedUsers || []);
                setIsInterested(data.interestedUsers?.some(x => x.objectId === user.objectId));
                setIsLiked(data.likes?.some(x => x.objectId === user.objectId));
                setIsWillGo(data.willGoUsers?.some(x => x.objectId === user.objectId));
                setEvent(data);
                setIsLoading(false);
                if (!data.previousEvents.some(x => x.eventId.objectId === data.objectId)) {
                    const lastShowingPost = await setAsLastShowingEvent(data.objectId, user.objectId);
                    await setRelationTo(lastShowingPost.objectId, data.objectId, 'eventId', 'historyEvents');
                    await setRelationTo(lastShowingPost.objectId, user.objectId, 'userId', 'historyEvents');
                    await addRelationTo(data.objectId, lastShowingPost.objectId, 'previousEvents', 'Events');
                } else {
                    const object = data.previousEvents.find(x => x.eventId.objectId === data.objectId);
                    await updateHistoryEvent(object.objectId, user.objectId);
                }
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
            arr = [...interestedUsers, { objectId: user.objectId, url: user.url, username: user.username }];
            setIsInterested(true);
            await addRelationTo(event.objectId, user.objectId, 'interestedUsers', 'Events');
        } else {
            const i = arr.indexOf(user.objectId);
            arr.splice(i, 1);
            setIsInterested(false);
            await delRelationTo(event.objectId, user.objectId, 'interestedUsers', 'Events');
        }

        setInterestedUsers(arr);
        setIsLoading(false);
    }

    async function likeEvent() {
        if (!event.likes?.some(x => x.objectId === user.objectId)) {
            setEvent({ ...event, likes: [user, ...event.likes] });
            setIsLiked(true);
            await addRelationTo(event.objectId, user.objectId, 'likes', 'Events');
        } else {
            let arr = [...event.likes];
            const i = arr.findIndex(x => x.objectId === user.objectId);
            arr.splice(i, 1);
            setEvent({ ...event, likes: arr });
            setIsLiked(false);
            await delRelationTo(event.objectId, user.objectId, 'likes', 'Events');
        }
    }

    async function handleWillGo() {
        if (!event.willGoUsers?.some(x => x.objectId === user.objectId)) {
            setEvent({ ...event, willGoUsers: [user, ...event.willGoUsers] });
            setIsWillGo(true);
            await addRelationTo(event.objectId, user.objectId, 'willGoUsers', 'Events');
        }
    }

    return (
        <div className="flex justify-content-center">
            {isShowInterestedUsers ? <InterestedUsers msg="Хора, които се интересуват от събитието" users={interestedUsers} closeWindow={() => setIsShowInterestedUsers(false)} /> : ''}
            {isShowLikes ? <InterestedUsers msg="Харесвания" users={event.likes} closeWindow={() => setIsShowLikes(false)} /> : ''}
            {isShowUsersGo ? <InterestedUsers msg="Хора, които ще отидат" users={event.willGoUsers} closeWindow={() => setIsShowUsersGo(false)} /> : ''}
            <title>{event?.title}</title>
            {
                !isLoading && event && user && interestedUsers ?
                    <div className="fade-in box m-2 p-2" style={{ maxWidth: '600px' }}>
                        {event.cover ? <img style={{ width: '100%', flex: 'auto' }} src={event.cover} alt="" /> : ''}
                        <div className="flex mt-2 gap-2">
                            <button style={{ flex: 'auto' }} onClick={handleInterested} className={`btn border-0 box p-1 m-0 ${isInterested ? 'primary' : ''}`}>
                                <i className="fas fa-star"></i>
                                <span className="mx-2">
                                    {!isInterested ? 'Имам интерес' : 'Нямам интерес'}
                                </span>
                            </button>
                            <button style={{ flex: 'auto' }} onClick={likeEvent} className={`btn border-0 box p-1 m-0 ${isLiked ? 'primary' : ''}`}>
                                <i className="fas fa-thumbs-up"></i>
                                <span className="mx-2">
                                    {isLiked ? 'Харесано' : 'Харесва ми'} {event.likes.length > 0 ? event.likes.length : ''}
                                </span>
                            </button>
                            <button style={{ flex: 'auto' }} disabled={isWillGo} onClick={handleWillGo} className={`btn border-0 box p-1 m-0 ${isWillGo ? 'primary' : ''}`}>
                                <i className="fas fa-check"></i>
                                <span className="mx-2">
                                    {isWillGo ? 'Записан' : 'Ще отида'} {event.willGoUsers.length > 0 ? event.willGoUsers.length : ''}
                                </span>
                            </button>
                            {user.objectId === event.userId?.objectId ? <button onClick={handleRemoveEvent} className="btn box p-1 m-0 text-danger">Изтрии</button> : ''}
                        </div>
                        <div>
                            <div>
                                {event.likes.map(likedUser =>
                                    <span key={likedUser.objectId} className="mx-2">{likedUser.objectId === user.objectId ? 'Вие' : likedUser.username}</span>)}
                                {event.likes.length > 0 ? <button onClick={() => setIsShowLikes(true)} className="btn border-0 box p-1 m-0">Покажи</button> : ''}
                            </div>
                            <div className="flex justify-content-between">
                                <div>
                                    <i className="fas fa-users"></i>
                                    <span className="px-2">Имат интерес: </span>
                                    <span>{interestedUsers.length}</span>
                                    {interestedUsers.length > 0 ? <button onClick={() => setIsShowInterestedUsers(true)} className="btn border-0 box p-1 m-0">Покажи</button> : ''}
                                </div>
                                <div>
                                    <i className="fas fa-users"></i>
                                    <span className="px-2">Записани: </span>
                                    <span>{event.willGoUsers.length}</span>
                                    {event.willGoUsers.length > 0 ? <button onClick={() => setIsShowUsersGo(true)} className="btn border-0 box p-1 m-0">Покажи</button> : ''}
                                </div>
                            </div>
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
            <div className="fade-in box text-center m-2" style={{ flex: 'auto', maxWidth: '600px' }}>
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

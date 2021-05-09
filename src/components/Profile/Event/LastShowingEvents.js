import React, { useContext, useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap';
import UserContext from '../../../Context/UserContext';
import { getLastShowingEvents, removeHistory } from '../../../models/Event';
import { SingleEventList } from '../../Event/SingleEventList';

export const LastShowingEvents = () => {

    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useContext(UserContext);

    useEffect(() => {
        let isSubscribed = true;

        async function get() {
            try {
                const data = await getLastShowingEvents(user?.objectId);
                if (isSubscribed) {
                    setEvents(data);
                    setIsLoading(false);
                    console.log(data);
                }
            } catch (err) {
                console.log(err.message);
            }
        }

        get();

        return () => isSubscribed = false;
    }, [user?.objectId]);

    async function handleRemoveHistory() {
        if (window.confirm('Сигурен ли си, че искаш да изтриеш списъка?')) {
            setIsLoading(true);
            await removeHistory(user.objectId);
            setEvents([]);
            setIsLoading(false);
        }
    }

    return (
        <>
        {isLoading ? <Spinner animation="border" className="spinner" /> : ''}
        {
            events.length > 0 && !isLoading ?
            <div onClick={handleRemoveHistory} className="text-center">
                <button className="btn btn-danger ">Изчисти списъка</button>
            </div> : ''
        }
            <div className="flex gap-2 justify-content-center">
                {
                    events.map(event =>
                        <div className="box" style={{ flex: 'auto',  maxWidth: '300px' }}>
                            <SingleEventList event={event.eventId} />
                        </div>
                    )
                }
            </div>
        </>
    )
}

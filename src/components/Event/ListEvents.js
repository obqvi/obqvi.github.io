import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap';
import { getEvents } from '../../models/Event';
import { SingleEventList } from './SingleEventList';

export const ListEvents = () => {

    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isSubscribed = true;

        async function get() {
            const data = await getEvents();
            if(isSubscribed) {
                setEvents(data);
                setIsLoading(false);
            }
        }

        get();

        return () => isSubscribed = false;
    }, []);

    return (
        <div className="container mx-auto">
            {isLoading ? <Spinner animation="border" className="spinner" /> : ''}
            <title>Събития</title>
            <h6 className="text-center box py-2">Събития</h6>
            {
                events.length > 0 ?
                    <div className="flex gap-2">
                        {events.map((event) =>
                            <div key={event.objectId} className="box" style={{ flexBasis: '320px', maxWidth: '320px', borderRadius: '7px', overflow: 'hidden' }}>
                                <SingleEventList event={event} />
                            </div>
                        )}
                    </div>
                    : ''
            }
        </div>
    )
}

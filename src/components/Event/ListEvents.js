import React, { useEffect, useState } from 'react'
import { getEvents } from '../../models/Event';
import { SingleEventList } from './SingleEventList';

export const ListEvents = () => {

    const [events, setEvents] = useState([]);

    useEffect(() => {
        let isSubscribed = true;

        async function get() {
            const data = await getEvents();
            if(isSubscribed) {
                setEvents(data);
            }
        }

        get();

        return () => isSubscribed = false;
    }, []);

    return (
        <div className="container mx-auto">
            <h4 className="text-center box">Събития</h4>
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

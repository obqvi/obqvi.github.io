import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import { getEvents } from '../../models/Event';

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
    });

    return (
        <div className="container mx-auto" style={{ maxWidth: '920px' }}>
            <h4 className="text-center box">Събития</h4>
            {
                events.length > 0 ?
                    <div className="flex gap-2">
                        {events.map((event) =>
                            <div key={event.objectId} className="box" style={{ flexBasis: '300px', maxWidth: '300px', borderRadius: '7px', overflow: 'hidden' }}>
                                <NavLink to={`/event/details/${event.objectId}`}>
                                    <img style={{ width: '100%', height: '200px' }} src={event.cover} alt="" />
                                </NavLink>
                                <div className="p-2">
                                    <div style={{ fontSize: '14px' }} className="flex justify-content-between">
                                        <span>
                                            <i className="fas fa-calendar"></i>
                                            <span>{event.start}, {event.startHour}</span>
                                        </span>
                                        {event.end ? <span>{event.end}, {event.endHour}</span> : ''}
                                    </div>
                                    <NavLink to={`/event/details/${event.objectId}`}>
                                        <h6 className="my-2">{event.title}</h6>
                                    </NavLink>
                                    <div>
                                        <i className="fas fa-globe-asia"></i>
                                        <span className="mx-2">{event.confidentiality}</span>
                                    </div>
                                    <div>
                                        <i className="fas fa-map"></i>
                                        <span className="mx-2">{event.location}</span>
                                    </div>
                                    <div>
                                        <i className="fas fa-dollar-sign"></i>
                                        <span className="mx-2">{event.priceOfTicket}</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    : ''
            }
        </div>
    )
}

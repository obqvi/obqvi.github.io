import React from 'react'
import { NavLink } from 'react-router-dom'

export const SingleEventList = ({ event }) => {
    return (
        <>
            {
                event ?
                    <>
                        <NavLink to={`/event/details/${event.objectId}`}>
                            <img style={{ width: '100%', height: '200px' }} src={event.cover} alt="" />
                        </NavLink>
                        <div className="p-2">
                            <div style={{ fontSize: '14px' }} className="flex justify-content-between">
                                <span>
                                    <i className="fas fa-calendar"></i>
                                    <span className="mx-2">{event.start}, {event.startHour}</span>
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
                    </>
                    : ''
            }
        </>
    )
}

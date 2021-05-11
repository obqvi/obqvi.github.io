import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import { getAllPersons } from '../../../models/Person';
import { Sidebar } from '../Sidebar'

export const AllUsers = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        let isSubscribed = true;

        async function get() {
            setIsLoading(true);
            const data = await getAllPersons();
            setIsLoading(false);
            console.log(data);
            if (isSubscribed) {
                setUsers(data);
            }
        }

        get();

        return () => isSubscribed = false;
    }, []);

    return (
        <div className="flex p-0">
            <title>Хора</title>
            <Sidebar />
            {isLoading ? <Spinner animation="border" className="spinner" /> : ''}
            <div className="mx-2 mx-auto" style={{ flex: 'auto', maxWidth: '400px' }}>
                <ul>
                    {
                        users.map(person =>
                            <NavLink to={`/profile/${person.user.objectId}`} key={person.objectId}>
                                <li className="border mb-2 box shadow-sm">
                                    <img className="rounded-circle p-2" style={{ width: '70px', height: '70px' }} src={person.user.url} alt="" />
                                    <span>{person.user.username}</span>
                                </li>
                            </NavLink>
                        )
                    }
                </ul>
            </div>
        </div>
    )
}

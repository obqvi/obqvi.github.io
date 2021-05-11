import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { getPersonByUserId } from '../../models/Person';

export const Profile = () => {

    const { id } = useParams();
    const [user, setUser] = useState({});

    useEffect(() => {
        let isSubscribed = true;

        async function get() {
            const data = await getPersonByUserId(id);
            if (isSubscribed) {
                setUser(data);
            }
        }

        get();

        return () => isSubscribed = false;
    }, [id]);

    return (
        <div className="mx-auto box" style={{ maxWidth: '1000px' }}>
            {
                user ?
                    <div>
                        <title>{user.user?.username}</title>
                        <div className="flex p-4">
                            <img className="border shadow rounded-circle" style={{ width: '200px', height: '200px' }} src={user?.user?.url} alt="" />
                            <h4>{user.user?.username}</h4>
                        </div>
                        <div className="p-4">
                            <ul>
                                <li>
                                    <span>Регистриран на: </span>
                                    <span>{new Date(user.user?.created).toLocaleDateString()}</span>
                                </li>
                                <li>
                                    <NavLink to={`/products/${user.user?.objectId}`}>Артикули за продажба</NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                    : ''
            }
        </div>
    )
}

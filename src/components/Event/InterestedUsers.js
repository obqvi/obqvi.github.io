import React, { useEffect } from 'react'

export const InterestedUsers = ({ msg, users, closeWindow }) => {

    useEffect(() => {
        console.log(users);
    });

    return (
        <div className="window-alert box shadow" style={{ minWidth: '400px', flex: 'auto', position: 'fixed' }}>
            <h4 className="px-5 pt-4">{msg}</h4>
            <ul>
                {
                    users.map(user =>
                        <li className="shadow p-2 m-4" key={user.objectId}>
                            <h6>
                            <img className="rounded-circle shadow-sm" style={{ width: '40px', height: '40px' }} src={user.url} alt="" />
                                <span className="px-2">{user.username}</span>
                            </h6>
                        </li>
                    )
                }
            </ul>
            <button onClick={closeWindow} className="btn box border">Затвори</button>
        </div>
    )
}

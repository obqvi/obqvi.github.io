import React from 'react'
import { NavLink } from 'react-router-dom'
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min'

export const Sidebar = () => {

    const location = useLocation();

    return (
        <div>
            <h4 className="text-center">Дневник</h4>
            <hr />
            <ul style={{ height: '70vh' }} className="list-group">
                <NavLink to="/profile">
                    <li className={`px-4 py-2 list-group-item border-0 ${location.pathname === '/profile' ? 'active' : ''}`}>
                        <span>Профил</span>
                    </li>
                </NavLink>
                <NavLink to="/profile/favorites">
                    <li className={`px-4 py-2 list-group-item border-0 ${location.pathname === '/profile/favorites' ? 'active' : ''}`}>
                        <span>Любими</span>
                    </li>
                </NavLink>
                <NavLink to="/profile/messages">
                    <li className={`px-4 py-2 list-group-item border-0 ${location.pathname === '/profile/messages' ? 'active' : ''}`}>
                        <span>Съобщения</span>
                    </li>
                </NavLink>
            </ul>
        </div>
    )
}

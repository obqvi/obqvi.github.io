import React from 'react'
import { NavLink } from 'react-router-dom'
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min'

export const Sidebar = () => {

    const location = useLocation();

    return (
        <div className="col-md-2 box" style={{ minHeight: '100vh' }}>
            <h4 className="text-center">Дневник</h4>
            <hr />
            <ul style={{ width: '100%' }} className="list-group">
                <NavLink to="/profile">
                    <li className={`px-4 py-2 list-group-item box border-0 ${location.pathname === '/profile' ? 'active' : ''}`}>
                        <span>Профил</span>
                    </li>
                </NavLink>
                <NavLink to="/profile/favorites">
                    <li className={`px-4 py-2 list-group-item box border-0 ${location.pathname === '/profile/favorites' ? 'active' : ''}`}>
                        <span>Любими</span>
                    </li>
                </NavLink>
                <NavLink to="/profile/messages-sended">
                    <li className={`px-4 py-2 list-group-item box border-0 ${location.pathname === '/profile/messages-sended' ? 'active' : ''}`}>
                        <span>Изпратени съобщения</span>
                    </li>
                </NavLink>
                <NavLink to="/profile/messages-received">
                    <li className={`px-4 py-2 list-group-item box border-0 ${location.pathname === '/profile/messages-received' ? 'active' : ''}`}>
                        <span>Получени съобщения</span>
                    </li>
                </NavLink>
                <NavLink to="/profile/last-showing">
                    <li className={`px-4 py-2 list-group-item box border-0 ${location.pathname === '/profile/last-showing' ? 'active' : ''}`}>
                        <span>История</span>
                    </li>
                </NavLink>
                <NavLink to="/profile/products">
                    <li className={`px-4 py-2 list-group-item box border-0 ${location.pathname === '/profile/products' ? 'active' : ''}`}>
                        <span>Мои продукти</span>
                    </li>
                </NavLink>
                <NavLink to="/profile/users">
                    <li className={`px-4 py-2 list-group-item box border-0 ${location.pathname === '/profile/users' ? 'active' : ''}`}>
                        <span>Хора</span>
                    </li>
                </NavLink>
                <NavLink to="/profile/chat-requests">
                    <li className={`px-4 py-2 list-group-item box border-0 ${location.pathname === '/profile/chat-requests' ? 'active' : ''}`}>
                        <span>Покани за чат</span>
                    </li>
                </NavLink>
            </ul>
        </div>
    )
}

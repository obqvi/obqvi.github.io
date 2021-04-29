import React, { useContext } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import UserContext from '../../Context/UserContext';

export const Navigation = () => {

    const location = useLocation();

    const { user, setUser } = useContext(UserContext);

    function handleLogout() {
        setUser(null);
    }

    return (
        <div className="navbar">
            <ul>
                <li>
                    <NavLink to="/" className={location.pathname === '/' ? 'selected' : ''}>
                        <i className="fas fa-home"></i>
                        <span>Начало</span>
                    </NavLink>
                </li>
            </ul>
            {user ?
                <ul className="column-menu">
                    <li>
                        <NavLink to="/create" className={location.pathname === '/create' ? 'selected' : ''}>
                            <i className="fas fa-user-plus"></i>
                            <span>Създаване</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/profile" className={location.pathname === '/profile' ? 'selected' : ''}>
                            <i className="fas fa-grin"></i>
                            <span>Здравейте, {user.username}</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink onClick={handleLogout} to="/login" className={location.pathname === '/login' ? 'selected' : ''}>
                            <i className="fas fa-sign-out-alt"></i>
                            <span>Изход</span>
                        </NavLink>
                    </li>
                </ul>
                :
                <ul className="column-menu">
                    <li>
                        <NavLink to="/login" className={location.pathname === '/login' ? 'selected' : ''}>
                            <i className="fas fa-sign-in-alt"></i>
                            <span>Вход</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/register" className={location.pathname === '/register' ? 'selected' : ''}>
                            <i className="fas fa-user-plus"></i>
                            <span>Регистрация</span>
                        </NavLink>
                    </li>
                </ul>
            }
        </div>
    )
}

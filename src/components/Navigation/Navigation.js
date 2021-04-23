import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Navigation.css';

export const Navigation = () => {

    const location = useLocation();

    console.log(location.pathname);

    return (
        <div className="navbar container">
            <ul>
                <li>
                    <NavLink to="/" className={location.pathname === '/' ? 'selected' : ''}>
                        <i className="fas fa-home"></i>
                        <span>Начало</span>
                    </NavLink>
                </li>
            </ul>
            <ul className="column-menu">
                <li>
                    <NavLink to="/create" className={location.pathname === '/create' ? 'selected' : ''}>
                        <i className="fas fa-user-plus"></i>
                        <span>Създаване</span>
                    </NavLink>
                </li>
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
        </div>
    )
}

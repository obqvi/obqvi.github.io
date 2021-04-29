import React from 'react'
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min'

export const AdminNavigation = () => {

    const location = useLocation();

    return (
        <>
            <title>Администрация</title>
            <div className="admin w-25 bg-light">
                <div className="text-center">
                    <h4>Администрация</h4>
                    <hr className="mb-0" />
                </div>
                <div>
                    <ul>
                        <li className={location.pathname === '/admin' ? 'selected' : ''}>
                            <NavLink to="/admin">Категории</NavLink>
                        </li>
                        <li className={location.pathname === '/admin/category/new' ? 'selected' : ''}>
                            <NavLink to="/admin/category/new">Нова категория</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

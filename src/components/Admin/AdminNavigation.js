import React from 'react'
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min'

export const AdminNavigation = () => {

    const location = useLocation();

    return (
        <>
            <title>Администрация</title>
            <div className="box col-md-2">
                <div className="text-center">
                    <h4>Администрация</h4>
                    <hr className="mb-0" />
                </div>
                <ul>
                    <li className={`p-2 ${location.pathname === '/admin/category/new' ? 'active' : ''}`}>
                        <NavLink to="/admin/category/new">Нова категория</NavLink>
                    </li>
                    <li className={`p-2 ${location.pathname === '/admin' ? 'active' : ''}`}>
                        <NavLink to="/admin">Категории</NavLink>
                    </li>
                </ul>
            </div>
        </>
    )
}

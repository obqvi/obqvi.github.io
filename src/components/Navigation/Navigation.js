import React, { useContext, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import UserContext from '../../Context/UserContext';
import { logout } from '../../models/User';
import { Search } from '../Search/Search';

export const Navigation = () => {

    const location = useLocation();

    const { user, setUser } = useContext(UserContext);
    const [ isSerach, setIsSearch ] = useState(false);
    const [ searchData, setSearchData ] = useState('');

    async function handleLogout() {
        setUser(null);
        await logout();
    }

    async function handleSearch(event) {
        setSearchData(event.target.value);
        if(String(event.target.value).length === 0) {
            setIsSearch(false);
        } else {
            setIsSearch(true);
        }
    }

    function clear() {
        setSearchData('');
        setIsSearch(false);
    }

    return (
        <>
            <div className="navbar box mx-auto" style={{ maxWidth: '1400px' }}>
                <ul>
                    <li>
                        <NavLink to="/" className={location.pathname === '/' ? 'selected' : ''}>
                            <i className="fas fa-home"></i>
                            <span>Начало</span>
                        </NavLink>
                    </li>
                    <li className="flex align-items-center">
                        <input onChange={handleSearch} className="box form-control m-0 border" placeholder="Търсене... продукти, събития..." type="text" name="data" />
                    </li>
                </ul>
                {user ?
                    <ul className="column-menu">
                        {
                            user.role === 'admin' ?
                                <li>
                                    <NavLink to="/admin" className={location.pathname === '/admin' ? 'selected' : ''}>
                                        <i className="fas fa-users"></i>
                                        <span>Администрация</span>
                                    </NavLink>
                                </li>
                                : ''
                        }
                        <li>
                            <NavLink to="/events" className={location.pathname === '/events' ? 'selected' : ''}>
                                <i className="fas fa-user"></i>
                                <span>Събития</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/products" className={location.pathname === '/products' ? 'selected' : ''}>
                                <i className="fas fa-user"></i>
                                <span>Продукти</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/profile" className={location.pathname === '/profile' ? 'selected' : ''}>
                                {
                                    !user.url ?
                                        <i className="fas fa-grin"></i> :
                                        <img className="p-2 m-0" style={{ width: '50px', height: '50px', borderRadius: '25px' }} src={user.url} alt="" />
                                }
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
            
        {isSerach ? <Search clear={clear} data={searchData} /> : ''}
        </>
    )
}

import React, { useContext, useState } from 'react';
import { Spinner } from 'react-bootstrap';

import UserContext from '../../Context/UserContext';

import './Login.css';

import { isEmail } from 'validator';
import { login } from '../../models/User';
import { useHistory } from 'react-router-dom';
import ThemeContext from '../../Context/ThemeContext';

export const Login = () => {

    const { setUser } = useContext(UserContext);
    const { setThemeContext } = useContext(ThemeContext);

    const [error, setError] = useState('');
    const [submit, setSubmit] = useState(false);

    const history = useHistory();

    function handleLogin(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const email = formData.get('email');
        const password = formData.get('password');

        if (!isEmail(email) || password === '') {
            return setError('Мола, попълнете всички полета!');
        }

        setError('');
        setSubmit(true);

        login(email, password)
            .then((loggedInUser) => {
                setThemeContext(loggedInUser.theme);
                setUser({ ...loggedInUser });
                history.push('/');
            })
            .catch((err) => {
                console.log(err);
                setError(err.message);
                setSubmit(false);
            });
    }

    return (
        <div style={{ minHeight: '100vh' }}>

            <div className="form box">
                <title>Вход</title>
                <h2>Вход</h2>
                <p className="error">{error}</p>
                <form className="p-4" onSubmit={handleLogin}>
                    <div>
                        <label>Имейл</label>
                        <input disabled={submit} className="form-control box p-2 border" type="email" name="email" />
                    </div>
                    <div className="mt-2">
                        <label>Парола</label>
                        <input disabled={submit} className="form-control box p-2 border" type="password" name="password" />
                    </div>
                    <div className="btn-group">
                        <button disabled={submit} type="submit" className="btn primary">
                            {submit ?
                                <Spinner animation="border" size="sm" /> :
                                <span>Вход</span>}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

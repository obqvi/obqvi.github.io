import React, { useContext, useState } from 'react';
import { Spinner } from 'react-bootstrap';

import UserContext from '../../Context/UserContext';

import './Login.css';

import { isEmail } from 'validator';
import { login } from '../../models/User';
import { useHistory } from 'react-router';

export const Login = () => {

    const { setUser } = useContext(UserContext);

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
                console.log(loggedInUser);
                setUser(loggedInUser);
                history.push('/');
            })
            .catch((err) => {
                console.log(err);
                setError(err.message);
                setSubmit(false);
            });
    }
    
    return (
        <div className="form">
            <title>Вход</title>
            <h2>Вход</h2>
            <p className="error">{error}</p>
            <form onSubmit={handleLogin}>
                <div className="form-control">
                    <label>Имейл</label>
                    <input disabled={submit} type="email" name="email" />
                </div>
                <div className="form-control">
                    <label>Парола</label>
                    <input disabled={submit} type="password" name="password" />
                </div>
                <div className="btn-group">
                    <button disabled={submit} type="submit" className="btn primary">
                            {submit ?
                            <Spinner animation="grow" size="sm" /> :
                            ''}
                        Вход
                    </button>
                </div>
            </form>
        </div>
    )
}

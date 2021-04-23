import React, { useState } from 'react';
import { Spinner } from 'react-bootstrap';
import './Login.css';
import { isEmail } from 'validator';

export const Login = () => {

    const [error, setError] = useState('');
    const [submit, setSubmit] = useState(false);

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

import React, { useState } from 'react';
import './Register.css';
import { isEmail } from 'validator';
import { Spinner } from 'react-bootstrap';

export const Register = () => {

    const [error, setError] = useState('');
    const [submit, setSubmit] = useState(false);

    function handleRegister(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const firstName = formData.get('firstName');
        const lastName = formData.get('lastName');
        const email = formData.get('email');
        const password = formData.get('password');
        const confirmPassword = formData.get('confirmPassword');

        if (!isEmail(email) || firstName === '' || lastName === '' || password === '') {
            return setError('Мола, попълнете всички полета!');
        } else if (password !== confirmPassword) {
            return setError('Паролите не съвпадат!');
        }

        setError('');
        setSubmit(true);
    }

    return (
        <div className="form">
            <title>Регистрация</title>
            <h2>Регистрация</h2>
            <p className="error">{error}</p>
            <form onSubmit={handleRegister}>
                <div className="form-control">
                    <label>Име</label>
                    <input autoFocus disabled={submit} type="text" name="firstName" />
                </div>
                <div className="form-control">
                    <label>Фамилия</label>
                    <input disabled={submit} type="text" name="lastName" />
                </div>
                <div className="form-control">
                    <label>Имейл</label>
                    <input disabled={submit} type="email" name="email" />
                </div>
                <div className="form-control">
                    <label>Парола</label>
                    <input disabled={submit} type="password" name="password" />
                </div>
                <div className="form-control">
                    <label>Потвърди паролата</label>
                    <input disabled={submit} type="password" name="confirmPassword" />
                </div>
                <div className="btn-group">
                    <button disabled={submit} type="submit" className="btn primary">
                        {submit ?
                            <Spinner animation="grow" size="sm" /> :
                            ''}
                        Регистрация
                    </button>
                </div>
            </form>
        </div>
    )
}

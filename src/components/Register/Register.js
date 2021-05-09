import React, { useContext, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { isEmail } from 'validator';

import UserContext from '../../Context/UserContext';

import './Register.css';

import { register } from '../../models/User';
import { useHistory } from 'react-router';

export const Register = () => {

    const { setUser } = useContext(UserContext);

    const [error, setError] = useState('');
    const [submit, setSubmit] = useState(false);

    const history = useHistory();

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

        register(email, password, firstName + ' ' + lastName)
            .then(async (registeredUser) => {
                setUser(registeredUser);
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
                <title>Регистрация</title>
                <h2>Регистрация</h2>
                <p className="error">{error}</p>
                <form className="p-4" onSubmit={handleRegister}>
                    <div className="box">
                        <label>Име</label>
                        <input autoFocus disabled={submit} className="form-control box p-2 border" type="text" name="firstName" />
                    </div>
                    <div className="box mt-2">
                        <label>Фамилия</label>
                        <input disabled={submit} className="form-control box p-2 border" type="text" name="lastName" />
                    </div>
                    <div className="box mt-2">
                        <label>Имейл</label>
                        <input disabled={submit} className="form-control box p-2 border" type="email" name="email" />
                    </div>
                    <div className="box mt-2">
                        <label>Парола</label>
                        <input disabled={submit} className="form-control box p-2 border" type="password" name="password" />
                    </div>
                    <div className="box mt-2">
                        <label>Потвърди паролата</label>
                        <input disabled={submit} className="form-control box p-2 border" type="password" name="confirmPassword" />
                    </div>
                    <div className="btn-group">
                        <button disabled={submit} type="submit" className="btn primary">
                            {submit ?
                                <Spinner animation="border" /> :
                                <span>Регистрация</span>}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

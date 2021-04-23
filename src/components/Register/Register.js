import React from 'react';
import './Register.css';

export const Register = () => {
    return (
        <div className="form">
            <title>Регистрация</title>
            <h2>Регистрация</h2>
            <form>
                <div className="form-control">
                    <label>Име</label>
                    <input type="text" name="firstName" />
                </div>
                <div className="form-control">
                    <label>Фамилия</label>
                    <input type="text" name="lastName" />
                </div>
                <div className="form-control">
                    <label>Имейл</label>
                    <input type="email" name="email" />
                </div>
                <div className="form-control">
                    <label>Парола</label>
                    <input type="password" name="password" />
                </div>
                <div className="form-control">
                    <label>Потвърди паролата</label>
                    <input type="password" name="confirmPassword" />
                </div>
                <div className="btn-group">
                    <button type="submit" className="btn primary">Регистрация</button>
                </div>
            </form>
        </div>
    )
}

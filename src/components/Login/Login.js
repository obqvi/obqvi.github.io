import React from 'react';
import './Login.css';

export const Login = () => {
    return (
        <div className="form">
            <title>Вход</title>
            <h2>Вход</h2>
            <form>
                <div className="form-control">
                    <label>Имейл</label>
                    <input type="email" name="email" />
                </div>
                <div className="form-control">
                    <label>Парола</label>
                    <input type="password" name="password" />
                </div>
                <div className="btn-group">
                    <button type="submit" className="btn primary">Вход</button>
                </div>
            </form>
        </div>
    )
}

import React, { useContext, useState } from 'react'
import { Spinner } from 'react-bootstrap';
import UserContext from '../../Context/UserContext';
import { updatePassword } from '../../models/User';

export const PasswordEdit = () => {

    const [isLoading, setIsLoading] = useState(false);
    const { user, setUser } = useContext(UserContext);
    const [error, setError] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const password = formData.get('password');
        const confirmPassword = formData.get('confirmPassword');

        if (password === '') {
            setError('Паролата не може да бъде празна!');
            return;
        }

        if (password !== confirmPassword) {
            setError('Парилите не съвпадат.');
            return;
        }

        setIsLoading(true);
        const data = await updatePassword(user.objectId, password)
            .catch(err => console.log(err));
        setUser(data);
        setIsLoading(false);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Нова парола: </label>
                {error ? <div className="text-danger">{error}</div> : ''}
                <input className="form-control border" name="password" type="password" />
            </div>
            <div>
                <label>Повтори паролата: </label>
                {error ? <div className="text-danger">{error}</div> : ''}
                <input className="form-control border" name="confirmPassword" type="password" />
            </div>
            <button className="btn primary">
                {isLoading ? <Spinner animation="border" /> : 'Запази'}
            </button>
        </form>
    )
}

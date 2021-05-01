import React, { useContext, useState } from 'react'
import { Spinner } from 'react-bootstrap';
import UserContext from '../../Context/UserContext';
import { updateUsername } from '../../models/User';

export const UsernameEdit = () => {

    const [isLoading, setIsLoading] = useState(false);
    const { user, setUser } = useContext(UserContext);
    const [error, setError] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const username = formData.get('username');
        if (username === '') {
            setError('Потребителското име не може да бъде празно!');
            return;
        }

        setIsLoading(true);
        const data = await updateUsername(user.objectId, username);
        setUser(data);
        setIsLoading(false);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>Потребителско име: </label>
            {error ? <div className="text-danger">{error}</div> : ''}
            <input className="form-control border" name="username" type="text" />
            <button className="btn primary">
                {isLoading ? <Spinner animation="border" /> : 'Запази'}
            </button>
        </form>
    )
}

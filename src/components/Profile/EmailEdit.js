import React, { useContext, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { isEmail } from 'validator';
import UserContext from '../../Context/UserContext';
import { updateEmail } from '../../models/User';

export const EmailEdit = () => {

    const [isLoading, setIsLoading] = useState(false);
    const { user, setUser } = useContext(UserContext);
    const [error, setError] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const email = formData.get('email');
        if(!isEmail(email)) {
            setError('Мола, въведете валиден имейл адрес!');
            return;
        }

        setIsLoading(true);
        const data = await updateEmail(user.objectId, email);
        setUser(data);
        setIsLoading(false);
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <label>Имейл: </label>
            {error ? <div className="text-danger">{error}</div> : ''}
            <input className="form-control border p-2 box" name="email" type="email" />
            <button className="btn primary">
                {isLoading ? <Spinner animation="border" /> : 'Запази'}
            </button>
        </form>
    )
}

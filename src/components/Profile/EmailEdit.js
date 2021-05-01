import React, { useContext, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { isEmail } from 'validator';
import UserContext from '../../Context/UserContext';
import { updateEmail } from '../../models/User';

export const EmailEdit = () => {

    const [isLoading, setIsLoading] = useState(false);
    const { user } = useContext(UserContext);

    async function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const email = formData.get('email');
        if(!isEmail(email)) {
            return;
        }

        setIsLoading(true);
        const data = await updateEmail(user.objectId, email);
        console.log(data);
        setIsLoading(false);
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <label>Имейл: </label>
            <input className="form-control border" name="email" type="email" />
            <button className="btn primary">
                {isLoading ? <Spinner animation="border" /> : 'Запази'}
            </button>
        </form>
    )
}

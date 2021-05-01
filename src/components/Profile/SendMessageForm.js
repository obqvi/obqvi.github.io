import React, { useContext, useEffect } from 'react'
import UserContext from '../../Context/UserContext';
import { subscribeForChannel } from '../../models/Message';

export const SendMessageForm = ({ receiverId }) => {

    const{ user } = useContext(UserContext);

    useEffect(() => {
        subscribeForChannel()
            .then((data) => {
                console.log(data);
            });
    }, []);

    function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const content = formData.get('content');

        const msg = { content, receiverId, senderId: user.objectId };
        console.log(msg);
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="col-md-6 row m-0 mt-4">
                <input autoFocus className="col-md-10 p-2 border" type="text" name="content"></input>
                <button className="col-md-2 m-0 border">Изпрати</button>
            </form>
        </>
    )
}

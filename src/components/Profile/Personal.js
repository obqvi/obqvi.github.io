import React, { useContext, useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap';
import UserContext from '../../Context/UserContext';
import { updatePersonalInfo, uploadImageUser } from '../../models/User';

export const Personal = () => {

    const { user, setUser } = useContext(UserContext);
    const [error, setError] = useState('');
    const [fileToShow, setFileToShow] = useState(null);
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setFileToShow(user.url);
    }, [setFileToShow, user.url]);

    function handleUpload(event) {
        event.preventDefault();

        const file = event.target.files[0];
        setFileToShow(URL.createObjectURL(file));
        setFile(file);
    }

    async function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const phoneNumber = formData.get('phoneNumber');
        const city = formData.get('city');

        try {
            setIsLoading(true);

            if(file) {
                const uploaded = await uploadImageUser(file, fileToShow);
                await updatePersonalInfo({
                    id: user.objectId,
                    phoneNumber,
                    city,
                    url: uploaded?.fileURL
                });

                setUser({ ...user, city, phoneNumber, url: uploaded?.fileURL });
            } else {
                await updatePersonalInfo({
                    id: user.objectId,
                    phoneNumber,
                    city
                });

                setUser({ ...user, city, phoneNumber });
            }
            setIsLoading(false);
        } catch (err) {
            console.log(err);
            setError(err.code);
            setIsLoading(false);
        }

        event.target.reset();
    }

    return (
        <form onSubmit={handleSubmit}>
            {error ? <div className="text-danger">{error}</div> : ''}
            <div>
                <label>Телефонен номер: </label>
                <input disabled={isLoading} className="form-control border p-2 box" name="phoneNumber" type="text" />
            </div>
            <div>
                <label>Град: </label>
                <input disabled={isLoading} className="form-control border p-2 box" name="city" type="text" />
            </div>
            <div>
                <label>Снимка: </label>
                <input disabled={isLoading} onChange={handleUpload} className="form-control border p-2 box" name="file" type="file" />
                {fileToShow ?
                    <div className="mt-2" style={{ width: '100px', height: '100px' }}>
                        <img className="w-100" src={fileToShow} alt="" />
                    </div> : ''}
            </div>
            <button disabled={isLoading} className="btn primary">
                {isLoading ? <Spinner animation="border" /> : 'Запази'}
            </button>
        </form>
    )
}

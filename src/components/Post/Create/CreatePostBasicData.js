import React, { useContext, useState } from 'react'
import PostContext from '../../../Context/PostContext';

export const CreatePostBasicData = ({ nextStep }) => {

    const { post, setPost } = useContext(PostContext);
    const { error, setError } = useState('');

    function handleNext(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const title = formData.get('title');
        const warning = formData.get('warning');
        const city = formData.get('city');
        const phoneNumber = formData.get('phoneNumber');
        const price = formData.get('price');
        const currency = formData.get('currency');
        const condition = formData.get('condition');

        if (title === '' || city === '' || phoneNumber === '' || price === '') {
            window.scrollTo(0, 0);
            return setError('Мола, попълнете всички полета!');
        }

        setPost({ ...post, title, warning, city, phoneNumber, price, currency, condition });
        nextStep(2);
    }

    return (
        <form onSubmit={handleNext}>
            <h6 className="error">{error}</h6>
            <div className="flex">
                <div className="form-control">
                    <label>* Згалавие</label>
                    <input type="text" name="title" defaultValue={post?.title} autoFocus />
                </div>
                <div className="form-control">
                    <label>* Състояние</label>
                    <select name="condition" defaultValue={post?.condition}>
                        <option value="Ново">Ново</option>
                        <option value="Втора употреба">Втора употреба</option>
                    </select>
                </div>
            </div>
            <div className="form-control">
                <label>* Град</label>
                <input type="text" name="city" defaultValue={post?.city} />
            </div>
            <div className="form-control">
                <label>Забележка/уточнение</label>
                <input type="text" name="warning" defaultValue={post?.warning} />
            </div>
            <div className="flex">
                <div className="form-control">
                    <label>* Телефонен номер</label>
                    <input type="tel" name="phoneNumber" defaultValue={post?.phoneNumber} />
                </div>
                <div className="form-control">
                    <label>* Цена</label>
                    <input type="text" name="price" defaultValue={post?.price} />
                </div>
                <div className="form-control">
                    <label>* Валута</label>
                    <select name="currency">
                        <option value="лв">лв</option>
                    </select>
                </div>
            </div>
            <div className="btn-group">
                <button type="submit" className="btn primary">Напред</button>
            </div>
        </form>
    )
}

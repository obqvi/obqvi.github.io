import React, { useState } from 'react';
import { Spinner } from 'react-bootstrap';
import './CreatePost.css';

export const CreatePost = () => {

    const [category, setCategory] = useState('');
    const [currency, setCurrency] = useState('');
    const [condition, setCondition] = useState('');
    const [currencies] = useState([{ title: 'лв', id: 1 }]);
    const [conditions] = useState([{ title: 'Ново', id: 1 }, { title: 'Втора употреба', id: 2 }]);
    const [categories] = useState([
        {
            title: 'Коли',
            id: 1
        },
        {
            title: 'Мода',
            id: 2
        }
    ]);

    const [file, setFile] = useState('');

    const [submit, setSubmit] = useState(false);
    const [error, setError] = useState('');

    function handleCategory(category) {
        setCategory(category);
    }

    function handleCondition(condition) {
        setCondition(condition);
    }

    function handleCurrency(currency) {
        setCurrency(currency);
    }

    function handleUpload(event) {
        const file = event.target.files[0];

        try {
            setFile(URL.createObjectURL(file));
        } catch (err) {
            setFile('');
        }
    }

    function handleClear() {
        setFile('');
    }

    function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const title = formData.get('title');
        const warning = formData.get('warning');
        const city = formData.get('city');
        const description = formData.get('description');
        const phoneNumber = formData.get('phoneNumber');
        const price = formData.get('price');

        if (title === '' || city === '' || file === '' || description === '' || phoneNumber === '' || price === '') {
            window.scrollTo(0, 0);
            return setError('Мола, попълнете всички полета!');
        }

        setSubmit(true);
    }

    return (
        <div className="form">
            <h2>Добави продукт</h2>
            <p className="error">{error}</p>
            <form onSubmit={handleSubmit}>
                <div className="form-control">
                    <label>* Згалавие</label>
                    <input disabled={submit} type="text" name="title" autoFocus />
                </div>
                <div className="form-control">
                    <label>* Категория</label>
                    <CategoriesWindow category={category} setCategory={handleCategory} categories={categories} titleMsg="Изберете категория" disabled={submit} />
                </div>
                <div className="form-control">
                    <label>Забележка/уточнение</label>
                    <input disabled={submit} type="text" name="warning" />
                </div>
                <div className="form-control">
                    <label>* Състояние</label>
                    <CategoriesWindow category={condition} setCategory={handleCondition} categories={conditions} titleMsg="В какво състояние е продукта?" disabled={submit} />
                </div>
                <div className="form-control">
                    <label>* Град</label>
                    <input disabled={submit} type="text" name="city" />
                </div>
                <div className="form-control">
                    <label>* Снимка</label>
                    <input disabled={submit} type="file" name="image" onChange={handleUpload} />
                    <div style={{ display: file ? 'block' : 'none' }}>
                        <i onClick={handleClear} class="fas fa-times clear"></i>
                        <img src={file} alt={file} />
                    </div>
                </div>
                <div className="form-control">
                    <label>* Описание</label>
                    <textarea disabled={submit} type="text" name="description"></textarea>
                </div>
                <div className="form-control">
                    <label>* Телефонен номер</label>
                    <input disabled={submit} type="tel" name="phoneNumber" />
                </div>
                <div className="form-control">
                    <label>* Цена</label>
                    <input disabled={submit} type="text" name="price" />
                </div>
                <div className="form-control">
                    <label>* Валута</label>
                    <CategoriesWindow category={currency} setCategory={handleCurrency} categories={currencies} titleMsg="Изберете валута" disabled={submit} />
                </div>
                <div className="btn-group">
                    <button disabled={submit} type="submit" className="btn primary">
                        {submit ?
                            <Spinner animation="grow" size="sm" /> :
                            ''}
                        Публикувай
                    </button>
                </div>
            </form>
        </div>
    )
}

const CategoriesWindow = ({ category, setCategory, categories, titleMsg, disabled }) => {
    const [isOpen, setIsOpen] = useState(false);

    function handleClick() {
        setIsOpen(!isOpen);
    }

    function handleSelectCategory(event) {
        setCategory(event.target.textContent);
        setIsOpen(false);
    }

    return (
        <div className="modal-div">
            <input onClick={handleClick} type="text" defaultValue={category} disabled={disabled} />
            <div style={{ display: isOpen ? 'block' : 'none' }} className="modal-window">
                <h2>{titleMsg}</h2>
                <ul>
                    {categories.map((category) =>
                        <li key={category.id} onClick={handleSelectCategory}>{category.title}</li>
                    )}
                </ul>
            </div>
        </div>
    )
}

export const Condition = () => {
    return (
        <div>
            <ul>
                <li>Ново</li>
                <li>Втора употреба</li>
            </ul>
        </div>
    )
}

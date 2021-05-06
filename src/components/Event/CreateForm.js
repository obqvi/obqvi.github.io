import React, { useContext, useEffect, useState } from 'react'
import EventContext from '../../Context/EventContext';
import { UploadImages } from './UploadImages';

export const CreateForm = ({ loadPreview }) => {

    const { eventContext, setEventContext } = useContext(EventContext);
    const [form, setForm] = useState();
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        setForm({ ...eventContext });
        if(!eventContext?.cover) {
            return setIsValid(false);
        }

        setIsValid(true);
    }, [setForm, eventContext]);

    async function handleSubmit(event) {
        event.preventDefault()
        const formData = new FormData(event.target);
        const title = formData.get('title');
        const start = formData.get('start');
        const startHour = formData.get('startHour');
        const end = formData.get('end');
        const endHour = formData.get('endHour');
        const description = formData.get('description');
        const confidentiality = formData.get('confidentiality');

        setEventContext({ ...eventContext, title, start, startHour, end, endHour, confidentiality, description });
        loadPreview();
    }

    function handleInput(input) {
        console.log(input);
        if(String(input).length === 0 || !eventContext?.cover) {
            return setIsValid(false);
        }

        setIsValid(true);
    }

    return (
        <div className="form box">
            <title>Ново събитие</title>
            <h4 className="text-center">Ново събитие</h4>
            {
                form ?
                    <form onSubmit={handleSubmit} className="p-2">
                        <div>
                            <label>Име на събитието</label>
                            <input onChange={(event) => handleInput(event.target.value)} disabled={eventContext?.onPublish} defaultValue={form.title} autoFocus className="form-control box p-2 border" type="text" name="title" />
                        </div>
                        <div className="flex gap-2">
                            <div className="mt-2" style={{ flex: 'auto' }}>
                                <label>Начлна дата</label>
                                <input disabled={eventContext?.onPublish} defaultValue={form.start} className="form-control box p-2 border" type="date" name="start" />
                            </div>
                            <div className="mt-2" style={{ flex: 'auto' }}>
                                <label>Начален час</label>
                                <input disabled={eventContext?.onPublish} defaultValue={form.startHour} className="form-control box p-2 border" type="time" name="startHour" />
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <div className="mt-2" style={{ flex: 'auto' }}>
                                <label>Крайна дата</label>
                                <input disabled={eventContext?.onPublish} defaultValue={form.end} className="form-control box p-2 border" type="date" name="end" />
                            </div>
                            <div className="mt-2" style={{ flex: 'auto' }}>
                                <label>Краен час</label>
                                <input disabled={eventContext?.onPublish} defaultValue={form.endHour} className="form-control box p-2 border" type="time" name="endHour" />
                            </div>
                        </div>
                        <div className="mt-2" style={{ flex: 'auto' }}>
                            <label>Поверителност</label>
                            <select disabled={eventContext?.onPublish} defaultValue={form.confidentiality} className="form-control box p-2 border" name="confidentiality">
                                <option value="Публично">Плблично</option>
                                <option value="Само поканени">Само поканени</option>
                            </select>
                        </div>
                        <div className="mt-2" style={{ flex: 'auto' }}>
                            <label>Описание</label>
                            <textarea disabled={eventContext?.onPublish} defaultValue={form.description} rows="10" className="form-control box p-2 border" type="text" name="description"></textarea>
                        </div>
                        <UploadImages handleInput={(input) => handleInput(input)} />
                        <div className="text-center">
                            <button disabled={!isValid} className="box btn primary">Напред</button>
                        </div>
                    </form> : ''
            }
        </div>
    )
}

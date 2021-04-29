import React from 'react';
import { AdminNavigation } from '../Admin/AdminNavigation';

export const CreateCategory = () => {
    return (
        <div style={{ display: 'flex' }}>
            <title>Създаване на категория</title>
            <AdminNavigation />
            <div className="m-2 text-center w-100 bg-light">
                <h2>Създаване на категория</h2>
                <form className="w-50 mx-auto">
                    <input className="form-control" placeholder="Згалавие на категорята" autoFocus type="text" name="title" />
                    <button className="btn primary">Добави</button>
                </form>
            </div>
        </div>
    )
}

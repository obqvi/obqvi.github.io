import React from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { ListCategories } from '../Category/ListCategories';
import { AdminNavigation } from './AdminNavigation';

export const AdminDashboard = () => {

    const { id } = useParams();

    return (
        <div className="admin">
            <title>Администрация</title>
            <div className="flex">
                <AdminNavigation />
                <div className="m-2 text-center w-100 bg-light">
                    <ListCategories id={id} />
                </div>
            </div>
        </div>
    )
}

import React from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { AdminListCategories } from '../Category/AdminListCategories';
import { AdminNavigation } from './AdminNavigation';

export const AdminDashboard = () => {

    const { id } = useParams();

    console.log(id);

    return (
        <div className="flex">
            <title>Администрация</title>
            <AdminNavigation />
            <div className="col-md-10">
                <AdminListCategories id={id} />
            </div>
        </div>
    )
}

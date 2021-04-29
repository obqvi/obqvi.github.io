import React from 'react';
import { AdminNavigation } from './AdminNavigation';

export const AdminDashboard = () => {
    return (
        <>
            <title>Администрация</title>
            <div style={{ display: 'flex' }}>
                <AdminNavigation className="col-md-4" />
                <div className="m-2 text-center w-100 bg-light">
                    //todo
                </div>
            </div>
        </>
    )
}

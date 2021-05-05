import React from 'react';

import { AdminDashboard } from '../components/Admin/AdminDashboard';
import { CreateCategory } from '../components/Category/CreateCategory';
import { Administrator } from '../Guards/Administrator';

export const AdministratorRoutes = ({ user }) => {
    return (
        <>
            <Administrator exact path="/admin" user={user} component={AdminDashboard} />
            <Administrator exact path="/admin/category/new" user={user} component={CreateCategory} />
            <Administrator exact path="/admin/category/new/:id" user={user} component={CreateCategory} />
            <Administrator exact path="/admin/:id" user={user} component={AdminDashboard} />
        </>
    )
}

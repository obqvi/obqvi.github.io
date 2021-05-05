import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export const Administrator = ({ component: Component, user, ...rest }) => {
    return (
        <Route {...rest} render={(props) => (
            user?.role === 'admin' ? <Component {...props} /> :
                <Redirect to="/" />
        )} />
    )
}

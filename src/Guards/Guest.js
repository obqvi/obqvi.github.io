import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export const Guest = ({ component: Component, auth, ...rest }) => {
    return (
        <Route {...rest} render={(props) => (
            auth === false ? <Component {...props} /> :
                <Redirect to="/" />
        )} />
    )
}

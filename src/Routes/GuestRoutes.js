import React from 'react';
import { Route } from "react-router-dom";
import { Home } from '../components/Home/Home';
import { Login } from '../components/Login/Login';
import { PostDetails } from '../components/Post/PostDetails';
import { Register } from '../components/Register/Register';

import { Guest } from "../Guards/Guest";

export const GuestRoutes = ({ user }) => {
    return (
        <>
            <Guest exact path="/register" auth={Boolean(user)} component={Register} />
            <Guest exact path="/login" auth={Boolean(user)} component={Login} />
            <Route exact path="/" component={Home} />
            <Route exact path="/details/:id" component={PostDetails} />
        </>
    )
}

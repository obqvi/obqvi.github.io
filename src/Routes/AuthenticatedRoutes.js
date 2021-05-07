import React from 'react';

import { CreatePost } from '../components/Post/Create/CreatePost';
import { Account } from '../components/Profile/Account';
import { FavoritePosts } from '../components/Profile/Post/FavoritePosts';
import { LastShowingPosts } from '../components/Profile//Post/LastShowingPosts';
import { PostMessages } from '../components/Profile/Messages/PostMessages';
import { ReceivedMessages } from '../components/Profile/Messages/ReceivedMessages';
import { SendedMessages } from '../components/Profile/Messages/SendedMessages';
import { Authenticated } from '../Guards/Authenticated';
import { Create } from '../components/Event/Create';
import { Details } from '../components/Event/Details';
import { PostDetails } from '../components/Post/PostDetails';
import { ListEvents } from '../components/Event/ListEvents';
import { ListUserPosts } from '../components/Profile/Post/ListUserPosts';
import { AllPosts } from '../components/Post/AllPosts';

export const AuthenticatedRoutes = ({ user }) => {
    return (
        <>
            <Authenticated exact path="/profile" auth={Boolean(user)} component={Account} />
            <Authenticated exact path="/profile/favorites" auth={Boolean(user)} component={FavoritePosts} />
            <Authenticated exact path="/profile/messages/:postId" auth={Boolean(user)} component={PostMessages} />
            <Authenticated exact path="/profile/last-showing" auth={Boolean(user)} component={LastShowingPosts} />
            <Authenticated exact path="/profile/messages-sended" auth={Boolean(user)} component={SendedMessages} />
            <Authenticated exact path="/profile/messages-received" auth={Boolean(user)} component={ReceivedMessages} />
            <Authenticated exact path="/profile/products" auth={Boolean(user)} component={ListUserPosts} />
            <Authenticated exact path="/create" auth={Boolean(user)} component={CreatePost} />
            <Authenticated exact path="/event/create" auth={Boolean(user)} component={Create} />
            <Authenticated exact path="/event/details/:id" auth={Boolean(user)} component={Details} />
            <Authenticated exact path="/details/:id" auth={Boolean(user)} component={PostDetails} />
            <Authenticated exact path="/events" auth={Boolean(user)} component={ListEvents} />
            <Authenticated exact path="/products" auth={Boolean(user)} component={AllPosts} />
        </>
    )
}

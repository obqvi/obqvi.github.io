import React from 'react';

import { CreatePost } from '../components/Post/Create/CreatePost';
import { Account } from '../components/Profile/Account';
import { FavoritePosts } from '../components/Profile/Post/FavoritePosts';
import { LastShowingPosts } from '../components/Profile//Post/LastShowingPosts';
import { PostMessages } from '../components/Profile/Messages/PostMessages';
import { ReceivedMessages } from '../components/Profile/Messages/ReceivedMessages';
import { SendedMessages } from '../components/Profile/Messages/SendedMessages';
import { Authenticated } from '../Guards/Authenticated';

export const AuthenticatedRoutes = ({ user }) => {
    return (
        <>
            <Authenticated exact path="/profile" auth={Boolean(user)} component={Account} />
            <Authenticated exact path="/profile/favorites" auth={Boolean(user)} component={FavoritePosts} />
            <Authenticated exact path="/profile/messages/:postId" auth={Boolean(user)} component={PostMessages} />
            <Authenticated exact path="/profile/last-showing" auth={Boolean(user)} component={LastShowingPosts} />
            <Authenticated exact path="/profile/messages-sended" auth={Boolean(user)} component={SendedMessages} />
            <Authenticated exact path="/profile/messages-received" auth={Boolean(user)} component={ReceivedMessages} />
            <Authenticated exact path="/create" auth={Boolean(user)} component={CreatePost} />
        </>
    )
}
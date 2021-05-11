import React from 'react';

import { CreatePost } from '../components/Post/Create/CreatePost';
import { Account } from '../components/Profile/Account';
import { FavoritePosts } from '../components/Profile/Post/FavoritePosts';
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
import { History } from '../components/Profile/History';
import { DoubleChatRoom } from '../components/Chat/DoubleChatRoom';
import { AllUsers } from '../components/Profile/ChatRooms/AllUsers';
import { Profile } from '../components/Profile/Profile';

export const AuthenticatedRoutes = ({ user }) => {
    return (
        <>
            <Authenticated exact path="/profile" auth={Boolean(user)} component={Account} />
            <Authenticated exact path="/profile/favorites" auth={Boolean(user)} component={FavoritePosts} />
            <Authenticated exact path="/profile/messages/:postId" auth={Boolean(user)} component={PostMessages} />
            <Authenticated exact path="/profile/last-showing" auth={Boolean(user)} component={History} />
            <Authenticated exact path="/profile/messages-sended" auth={Boolean(user)} component={SendedMessages} />
            <Authenticated exact path="/profile/messages-received" auth={Boolean(user)} component={ReceivedMessages} />
            <Authenticated exact path="/profile/products" auth={Boolean(user)} component={ListUserPosts} />
            <Authenticated exact path="/create" auth={Boolean(user)} component={CreatePost} />
            <Authenticated exact path="/event/create" auth={Boolean(user)} component={Create} />
            <Authenticated exact path="/event/details/:id" auth={Boolean(user)} component={Details} />
            <Authenticated exact path="/details/:id" auth={Boolean(user)} component={PostDetails} />
            <Authenticated exact path="/events" auth={Boolean(user)} component={ListEvents} />
            <Authenticated exact path="/products" auth={Boolean(user)} component={AllPosts} />
            <Authenticated exact path="/products/:id" auth={Boolean(user)} component={AllPosts} />
            <Authenticated exact path="/profile/users" auth={Boolean(user)} component={AllUsers} />
            <Authenticated exact path="/profile/:id" auth={Boolean(user)} component={Profile} />
            <Authenticated exact path="/chat/:id" auth={Boolean(user)} component={DoubleChatRoom} />
        </>
    )
}

import React, { useContext, useEffect, useState } from 'react';
import { Sidebar } from '../Sidebar';
import UserContext from '../../../Context/UserContext';
import { Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { Send } from './Send';
import { getPostById } from '../../../models/Post';

export const PostMessages = () => {

    const [post, setPost] = useState(null);
    const { user } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);
    const { postId } = useParams();

    useEffect(() => {
        let isSubscribed = true;

        async function get() {
            const data = await getPostById(postId);
            if (isSubscribed) {
                setPost(data);
                setIsLoading(false);
            }
        }

        get();

        return () => isSubscribed = false;
    }, [user?.objectId, postId]);

    return (
        <div className="flex p-0">
            <title>Ново съобщение - {post?.title}</title>
            <Sidebar />
            {isLoading ? <Spinner animation="border" className="spinner" /> : ''}
            <div className="mx-auto" style={{ display: 'flex', flexDirection: 'column' }}>

                {
                    post ?
                        <>
                            <div className="box single-post p-2 flex gap-2">
                                <div style={{ maxWidth: '200px', display: 'flex', flexDirection: 'column' }}>
                                    <img className="w-100" style={{ flex: 'auto' }} src={post.imagePaths?.split(', ')[0]} alt="" />
                                </div>
                                <div>
                                    <h4>{post.title}</h4>
                                    <hr />
                                    <h6>{post.categoryId.title}</h6>
                                    <h6>{post.city}</h6>
                                </div>
                            </div>
                            <Send postId={postId} receiverId={post.userId?.objectId} senderId={user?.objectId} />
                        </> : ''
                }
            </div>
        </div>
    )
}

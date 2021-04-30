import React, { useContext, useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import PostContext from '../../../Context/PostContext';

export const CreatePostDescription = ({ nextStep }) => {

    const { post, setPost } = useContext(PostContext);

    const editorRef = useRef(null);
    const handleNextStep = () => {
        if (editorRef.current) {
            setPost({ ...post, description: editorRef.current.getContent()});
            nextStep(4);
        }
    };

    return (
        <>
            <div className="text-center">
                <Editor
                    onInit={(evt, editor) => editorRef.current = editor}
                    initialValue={post?.description}
                    init={{
                        plugins: [
                            'advlist autolink lists link preview anchor',
                            'searchreplace visualblocks fullscreen',
                            'insertdatetime table paste code wordcount'
                        ]
                    }}
                />
                <button className="btn primary" onClick={handleNextStep}>Напред</button>
            </div>
        </>
    )
}

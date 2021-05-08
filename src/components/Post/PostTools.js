import React, { useState } from 'react'
import { disableComments } from '../../models/Post';

export const PostTools = ({ post, isDisableComments, setIsDisableComments }) => {

    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    async function handleDisableComments() {
        setIsLoading(true);
        await disableComments({ ...post, disableComments: !isDisableComments });
        setIsLoading(false);
        setIsOpen(false);
        setIsDisableComments(!isDisableComments);
    }

    return (
        <div className="btn box m-0">
            <button className="box p-1 border-0" onClick={() => setIsOpen(!isOpen)} type="button">
                ...
            </button>
            {isOpen ?
                <ul className="box shadow" style={{ position: 'absolute', minWidth: '200px' }}>
                    <li>
                        <button disabled={isLoading} onClick={handleDisableComments} className="box border-0 m-0 px-0 p-2">
                            {
                                isDisableComments ?
                                'Включване на коментари'
                                : 'Изключване на коментари'
                            }
                        </button>
                    </li>
                </ul>
                : ''}
        </div>
    )
}

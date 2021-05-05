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
        <div className="btn box p-1" style={{ position: 'relative', flex: 'auto' }}>
            <button className="box p-1 border-0" onClick={() => setIsOpen(!isOpen)} type="button">
                ...
            </button>
            {isOpen ?
                <ul className="box" style={{ position: 'absolute', right: '0', minWidth: '200px' }}>
                    <li>
                        <button disabled={isLoading} onClick={handleDisableComments} className="box btn m-0 px-0 py-1">
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

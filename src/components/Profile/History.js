import React from 'react'
import { LastShowingEvents } from './Event/LastShowingEvents'
import { LastShowingPosts } from './Post/LastShowingPosts'
import { Sidebar } from './Sidebar'

export const History = () => {
    return (
        <>
        <div className="flex">
            <Sidebar />
            <div style={{ flex: 'auto', maxWidth: '660px' }}>
                <LastShowingEvents />
            </div>
            <div>
                <LastShowingPosts />
            </div>
        </div>
        </>
    )
}

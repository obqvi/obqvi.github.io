import React from 'react'
import { SearchPosts } from './SearchPosts'

export const Search = ({ clear, data }) => {
    return (
        <div className="single-post box p-2" style={{ position: 'fixed', minWidth: '600px' }}>
            <h4 className="text-center">Резултати от търсенето</h4>
            <SearchPosts clear={clear} data={data} />
        </div>
    )
}

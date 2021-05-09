import React from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { ListCategories } from '../Category/ListCategories'
import { ListEvents } from '../Event/ListEvents'
import { AllPosts } from '../Post/AllPosts'

export const Home = () => {

    const { id } = useParams();

    return (
        <div>
            <title>Начало</title>
            <div className="flex">
                <div style={{ flex: 'auto' }}>
                    <ListCategories />
                </div>
                <div style={{ flex: 'auto' }}>
                    <AllPosts categoryId={id} />
                </div>
            </div>
            <div>
                <hr />
                <ListEvents />
            </div>
        </div>
    )
}

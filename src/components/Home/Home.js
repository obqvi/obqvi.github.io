import React from 'react'
import { ListEvents } from '../Event/ListEvents'
import { AllPosts } from '../Post/AllPosts'

export const Home = () => {
    return (
        <div className="row">
            <title>Начало</title>
            <div>
                <h4 className="text-center">Продукти, които хората продават</h4>
                <hr />
                <AllPosts />
            </div>
            <div>
                <hr />
                <ListEvents />
            </div>
        </div>
    )
}

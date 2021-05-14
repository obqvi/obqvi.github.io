import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import UserContext from '../../Context/UserContext'
import { ListCategories } from '../Category/ListCategories'
import { ListEvents } from '../Event/ListEvents'
import { AllPosts } from '../Post/AllPosts'

export const Home = () => {

    const { id } = useParams();
    const { user } = useContext(UserContext);

    return (
        <div>
            <title>Начало</title>
            {
                !user ?
                    <div className="text-center">
                        <h4>Влизане в сайта</h4>
                        <h6>Трябва да влезете за да използвате сайта</h6>
                        <NavLink className="btn primary" to="/login">Вход</NavLink>
                        <NavLink className="btn primary" to="/register">Регистранция</NavLink>
                    </div>
                    : <>
                        <div className="flex mx-auto text-center justify-content-center">
                            <div style={{ flex: 'auto', maxWidth: '400px' }}>
                                <ListCategories />
                            </div>
                            <div style={{ flex: 'auto', maxWidth: '600px' }}>
                                <AllPosts categoryId={id} />
                            </div>
                        </div>
                        <div>
                            <hr />
                            <ListEvents />
                        </div>
                    </>
            }
        </div>
    )
}

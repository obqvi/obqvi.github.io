import React from 'react'
import { NavLink, Route, Switch } from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom/cjs/react-router-dom.min'
import { EmailEdit } from './EmailEdit'
import { Sidebar } from './Sidebar'
import { UsernameEdit } from './UsernameEdit'

export const Account = () => {
    return (
        <>
            <div>
                <div className="row">
                    <div className="col-md-2 bg-light p-0">
                        <Sidebar />
                    </div>
                    <div className="p-5 col-md-10 row bg-light">
                        <h4>Лична информация</h4>
                        <Router>
                            <ul className="col-md-4 px-2 list-group">
                                <li className="list-group-item border">Потребителско име:
                            <NavLink className="px-5" to="/profile/username/edit">
                                        <div>Промяна</div>
                                    </NavLink>
                                </li>
                                <li className="list-group-item border">Име, фамилия, снимка, град, телефонен номер, пол.
                            <NavLink className="px-5" to="/profile/personal/edit">
                                        <div>Промяна</div>
                                    </NavLink>
                                </li>
                                <li className="list-group-item border">Имейл
                            <NavLink className="px-5" to="/profile/email/edit">
                                        <div>Промяна</div>
                                    </NavLink>
                                </li>
                                <li className="list-group-item border">Парола
                            <NavLink className="px-5" to="/profile/password/edit">
                                        <div>Промяна</div>
                                    </NavLink>
                                </li>
                            </ul>
                            <div className="col-md-8">
                                <Switch>
                                    <Route path="/profile/username/edit" component={UsernameEdit} />
                                    <Route path="/profile/email/edit" component={EmailEdit} />
                                </Switch>
                            </div>
                        </Router>
                    </div>
                </div>
            </div>
        </>
    )
}

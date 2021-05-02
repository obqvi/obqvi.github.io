import React, { useContext } from 'react'
import { NavLink, Route, Switch } from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom/cjs/react-router-dom.min'
import ThemeContext from '../../Context/ThemeContext'
import { EmailEdit } from './EmailEdit'
import { PasswordEdit } from './PasswordEdit'
import { Sidebar } from './Sidebar'
import { UsernameEdit } from './UsernameEdit'

export const Account = () => {

    const { themeContext, setThemeContext } = useContext(ThemeContext);

    return (
        <div className="flex">
            <Sidebar />
            <div className="p-2 col-md-8 row mx-auto box">
                <div style={{ height: '100vh' }}>
                    <h4>Лична информация</h4>
                    <Router>
                        <ul className="col-md-6">
                            <li className="box">Потребителско име:
                            <NavLink className="px-5" to="/profile/username/edit">
                                    <div>Промяна</div>
                                </NavLink>
                            </li>
                            <li className="box">Име, фамилия, снимка, град, телефонен номер, пол.
                            <NavLink className="px-5" to="/profile/personal/edit">
                                    <div>Промяна</div>
                                </NavLink>
                            </li>
                            <li className="box">Имейл
                            <NavLink className="px-5" to="/profile/email/edit">
                                    <div>Промяна</div>
                                </NavLink>
                            </li>
                            <li className="box">Парола
                            <NavLink className="px-5" to="/profile/password/edit">
                                    <div>Промяна</div>
                                </NavLink>
                            </li>
                            <li className="d-flex align-items-center">
                                <label>Тъмна тема</label>
                                <input onClick={(event) => setThemeContext(event.target.checked)} defaultChecked={themeContext} type="checkbox" style={{
                                    width: '20px',
                                    height: '20px',
                                    marginLeft: '10px'
                                }} />
                            </li>
                        </ul>
                        <div className="col-md-6">
                            <Switch>
                                <Route path="/profile/username/edit" component={UsernameEdit} />
                                <Route path="/profile/email/edit" component={EmailEdit} />
                                <Route path="/profile/password/edit" component={PasswordEdit} />
                            </Switch>
                        </div>
                    </Router>
                </div>
            </div>
        </div>
    )
}

import { BrowserRouter as Router, Switch } from "react-router-dom";

import './configuration.backendless';

import UserContext from './Context/UserContext';

import './App.css';
import { Navigation } from "./components/Navigation/Navigation";
import { useEffect, useState } from "react";
import Backendless from "backendless";
import ThemeContext from "./Context/ThemeContext";
import { GuestRoutes } from "./Routes/GuestRoutes";
import { AuthenticatedRoutes } from "./Routes/AuthenticatedRoutes";
import { AdministratorRoutes } from "./Routes/AdministratorRoutes";

function App() {

  const [user, setUser] = useState(null);
  const [themeContext, setThemeContext] = useState(false);

  useEffect(() => {
    let isSubscribed = true;
    Backendless.UserService.getCurrentUser()
      .then((user) => {
        if (isSubscribed) {
          setUser(user);
        }
      });

    return () => isSubscribed = false;
  }, []);

  return (
    <div className={`app ${themeContext ? 'dark' : ''}`} style={{ minHeight: '100vh' }}>
      <Router basename="/">
        <UserContext.Provider value={{ user, setUser }}>
          <ThemeContext.Provider value={{ themeContext, setThemeContext }}>
            <Navigation />
            <Switch>
              <GuestRoutes user={user} />
            </Switch>
            <Switch>
              <AuthenticatedRoutes user={user} />
            </Switch>
            <Switch>
              <AdministratorRoutes user={user} />
            </Switch>
          </ThemeContext.Provider>
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;

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
import { CreateButtonFixed } from "./components/Common/CreateButtonFixed";
import toast, { Toaster } from 'react-hot-toast';

function App() {

  const [user, setUser] = useState(null);
  const [themeContext, setThemeContext] = useState(false);
  const [onLineUserConnection, setOnLineUserConnection] = useState(true);

  useEffect(() => {
    let isSubscribed = true;
    let channel;

    try {
      Backendless.UserService.getCurrentUser()
        .then((user) => {
          if (isSubscribed) {
            if (user) {
              toast(`Здравейте, ${user?.username}`);
            }
            channel = Backendless.Messaging.subscribe('default');
            channel.addMessageListener((data) => {
              if (data.headers.userId === user.objectId) {
                toast.success(data.message, { duration: '2000', icon: <img style={{ width: '40px' }} src={data.headers.url} alt="" /> });
              }
            });
            setUser(user);
          }

          return () => {
            isSubscribed = false;
            channel.removeMessageListener();
          }
        });
    } catch (err) {
      toast.error(err.message);
    }

    function connected() {
      setOnLineUserConnection(true);
      toast.success('Връзката ви е възстановена');
    }

    function disconnected() {
      setOnLineUserConnection(false);
      toast.error('Няма връзка');
    }

    window.addEventListener('online', connected);
    window.addEventListener('offline', disconnected);

    return () => {
      isSubscribed = false;
      window.removeEventListener('online', connected);
      window.removeEventListener('offline', disconnected);
    }
  }, []);

  return (
    <>
      <Toaster position="right-top" />
      {
        !onLineUserConnection ?
          <div className="app box" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', width: '1400px', height: '100vh', zIndex: '1000' }}>
            <title>Няма интернет</title>
            <h2 className="p-5 bg-danger text-center text-light">
              <i className="fas fa-wifi mx-2"></i>
            Няма интернет
            </h2>
            <div className="alert alert-danger text-center">
              Моля, проверете интернет връзката си и опитайте отново!
                <p>Когато интернет връзката ви дойде, сайта ще се презареди автоматично.</p>
            </div>
          </div> : ''
      }
      <div className={`app mx-auto ${themeContext ? 'dark' : ''}`} style={{ minHeight: '100vh', maxWidth: '1400px' }}>
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
            {user ?
              <CreateButtonFixed />
              : ''}
          </UserContext.Provider>
        </Router>

      </div>
    </>
  );
}

export default App;

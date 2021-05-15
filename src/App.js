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
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const [user, setUser] = useState(null);
  const [themeContext, setThemeContext] = useState(false);
  const [onLineUserConnection, setOnLineUserConnection] = useState(true);

  useEffect(() => {
    let isSubscribed = true;
    let channel;

    Backendless.UserService.getCurrentUser()
      .then((user) => {
        if (isSubscribed) {
          channel = Backendless.Messaging.subscribe('default');
          channel.addMessageListener((data) => {
            if (data.headers.userId === user.objectId) {
              toast.success(data.message, { pauseOnHover: true, closeButton: true });
            }
          });
          setUser(user);
        }

        return () => {
          isSubscribed = false;
          channel.removeMessageListener();
        }
      });

    function isConnected() {
      setOnLineUserConnection(true);
      toast.success('Връзката ви е възстановена');
    }

    window.addEventListener('online', isConnected);
    window.addEventListener('offline', () => setOnLineUserConnection(false));

    return () => {
      isSubscribed = false;
      window.removeEventListener('online', () => setOnLineUserConnection(true));
      window.removeEventListener('offline', () => isConnected);
    }
  }, []);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* Same as */}
      <ToastContainer />
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

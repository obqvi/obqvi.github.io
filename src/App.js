import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import './configuration.backendless';

import UserContext from './Context/UserContext';

import './App.css';
import { Navigation } from "./components/Navigation/Navigation";
import { Register } from "./components/Register/Register";
import { Login } from "./components/Login/Login";
import { Home } from './components/Home/Home';
import { CreatePost } from "./components/Post/Create/CreatePost";
import { useEffect, useState } from "react";
import { PostDetails } from "./components/Post/PostDetails";
import { AdminDashboard } from "./components/Admin/AdminDashboard";
import Backendless from "backendless";
import { CreateCategory } from "./components/Category/CreateCategory";
import { FavoritePosts } from "./components/Profile/FavoritePosts";
import { Messages } from "./components/Profile/Messages";
import { Account } from "./components/Profile/Account";
import { LastShowingPosts } from "./components/Profile/LastShowingPosts";
import ThemeContext from "./Context/ThemeContext";

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
    <div className={`app ${themeContext ? 'dark' : ''}`} style={{ minminHeight: '100vh' }}>
      <Router basename="/">
        <UserContext.Provider value={{ user, setUser }}>
          <ThemeContext.Provider value={{ themeContext, setThemeContext }}>
            <Navigation />
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/" component={Home} />
              <Route exact path="/admin" component={AdminDashboard} />
              <Route exact path="/profile" component={Account} />
              <Route exact path="/profile/favorites" component={FavoritePosts} />
              <Route exact path="/profile/messages" component={Messages} />
              <Route exact path="/profile/messages/:id" component={Messages} />
              <Route exact path="/profile/last-showing" component={LastShowingPosts} />
              <Route exact path="/create" component={CreatePost} />
              <Route exact path="/details/:id" component={PostDetails} />
              <Route exact path="/admin/category/new" component={CreateCategory} />
              <Route exact path="/admin/category/new/:id" component={CreateCategory} />
              <Route exact path="/admin/:id" component={AdminDashboard} />
            </Switch>
          </ThemeContext.Provider>
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;

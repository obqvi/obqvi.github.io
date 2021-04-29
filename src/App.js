import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import './Backendless/configuration';

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

function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    let isSubscribed = true;
    Backendless.UserService.getCurrentUser()
      .then((user) => {
        if(isSubscribed) {
          setUser(user);
        }
      });

      return () => isSubscribed = false;
  }, []);

  return (
    <div className="App">
      <Router basename="/">
        <UserContext.Provider value={{user, setUser}}>
          <Navigation />
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/" component={Home} />
            <Route exact path="/create" component={CreatePost} />
            <Route exact path="/profile" component={CreatePost} />
            <Route exact path="/details/:id" component={PostDetails} />
            <Route exact path="/admin" component={AdminDashboard} />
            <Route exact path="/admin/category/new" component={CreateCategory} />
          </Switch>
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;

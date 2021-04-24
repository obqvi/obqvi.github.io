import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import './Backendless/configuration';

import UserContext from './Context/UserContext';

import './App.css';
import { Navigation } from "./components/Navigation/Navigation";
import { Register } from "./components/Register/Register";
import { Login } from "./components/Login/Login";
import { Home } from './components/Home/Home';
import { CreatePost } from "./components/Create/CreatePost";
import { useState } from "react";

function App() {

  const [user, setUser] = useState(null);

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
          </Switch>
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;

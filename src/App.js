import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import './App.css';
import { Navigation } from "./components/Navigation/Navigation";
import { Register } from "./components/Register/Register";
import { Login } from "./components/Login/Login";
import { Home } from './components/Home/Home';

function App() {
  return (
    <div className="App">
      <Router basename="/">
        <Navigation />
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import Users from "./user/pages/Users";
import NewPlace from "./places/pages/NewPlace";
const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Users} exact />
        <Route path="/places/new" component={NewPlace} exact />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default App;

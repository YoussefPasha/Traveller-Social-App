import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import Users from "./user/pages/Users";
import NewPlaces from "./places/pages/NewPlace";
const App = () => {
  return (
    <Router>
      <Switch>
        <Route to="/" component={Users} />{" "}
        <Route to="/new/places" component={NewPlaces} /> <Redirect to="/" />
      </Switch>{" "}
    </Router>
  );
};

export default App;

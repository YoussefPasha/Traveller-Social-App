import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import Users from "./user/pages/Users";
import UserPlaces from "./places/pages/UserPlaces";
import NewPlace from "./places/pages/NewPlace";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import UpdatePlaces from "./places/pages/UpdatePlaces";
const App = () => {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Switch>
          <Route path="/" component={Users} exact />
          <Route path="/places/new" component={NewPlace} exact />
          <Route path="/:userId/places" component={UserPlaces} exact />
          <Route path="/places/:placeId" component={UpdatePlaces} exact />
          <Redirect to="/" />
        </Switch>
      </main>
    </Router>
  );
};

export default App;

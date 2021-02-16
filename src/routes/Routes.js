import React from "react";
import { Route, Switch } from "react-router-dom";

// Containers
import Home from "../containers/Home/Home";
import NotFound from "../containers/NotFound/NotFound";
import Login from "../containers/Login/Login";
import Signup from "../containers/Signup/Signup";
import NewAgenda from "../containers/Agenda_New/Agenda_New";
import Agenda from "../containers/Agenda/Agenda";

// Auth
import AuthenticatedRoute from "./AuthenticatedRoute";
import UnauthenticatedRoute from "./UnauthenticatedRoute";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <UnauthenticatedRoute exact path="/login">
        <Login />
      </UnauthenticatedRoute>
      <UnauthenticatedRoute exact path="/signup">
        <Signup />
      </UnauthenticatedRoute>
      <AuthenticatedRoute exact path="/agendas/new/:date">
        <NewAgenda />
      </AuthenticatedRoute>
      <AuthenticatedRoute exact path="/agendas/:id">
        <Agenda />
      </AuthenticatedRoute>
      {/* Finally, catch all unmatched routes */}
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
};

export default Routes;

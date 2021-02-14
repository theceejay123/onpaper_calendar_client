import React from "react";
import { Route, Switch } from "react-router-dom";

// Containers
import Home from "../containers/Home/Home";
import NotFound from "../containers/NotFound/NotFound";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      {/* Finally, catch all unmatched routes */}
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
};

export default Routes;

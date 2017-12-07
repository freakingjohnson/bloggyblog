import React from "react";
import { Switch, Route } from "react-router-dom";

import App from './App';
import CreateBlog from './components/CreateBlog'

export default (
  <Switch>
    <Route component={ App } path="/" exact />
    <Route component={ CreateBlog } path="/auth/admin" />

  </Switch>
)
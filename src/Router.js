import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from './components/Home';
import CreateBlog from './components/CreateBlog'
import About from './components/About'
import Gallery from './components/Gallery'
import Discussion from './components/Discussion'
import Blog from './components/Blog'


export default (
  <Switch>
    <Route component={Home} path="/" exact />
    <Route component={CreateBlog} path="/auth/admin" />
    <Route component={Gallery} path="/gallery" />
    <Route component={Discussion} path="/discussion" />
    <Route component={About} path="/about" />
    <Route component={Blog} path="/blog" />
  </Switch>
)
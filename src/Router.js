import React from "react";
import { Switch, Route } from "react-router-dom";

import App from './App';
import CreateBlog from './components/CreateBlog'
import About from './components/About'
import Gallery from './components/Gallery'
import Contact from './components/Contact'
import Blog from './components/Blog'


export default (
  <Switch>
    <Route component={App} path="/" exact />
    <Route component={CreateBlog} path="/auth/admin" />
    <Route component={About} path="/about" />
    <Route component={Gallery} path="/gallery" />
    <Route component={Contact} path="/contact" />
    <Route component={Blog} path="/blog" />
  </Switch>
)
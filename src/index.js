import React from 'react';
import ReactDOM from 'react-dom';
import App from "./containers/App.js"
import Login from "./containers/Login.js"
import Title from "./containers/Title.js"
import Event from "./containers/Event.js"

import "./styles/base.css"

import { Route, BrowserRouter as Router } from "react-router-dom"
import { createBrowserHistory } from 'history'

const history = createBrowserHistory()

ReactDOM.render(
  <Router history={history}>
    <Title />
    <Route exact path = { "/" } component = { App } />
    <Route exact path = { "/login" } component = { Login }/>
    <Route path="/event/:eventName" render={(props) => <Event {...props} />}/>
  </Router>
  , document.getElementById('root'));

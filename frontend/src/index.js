import React from 'react';
import ReactDOM from 'react-dom';
import App from "./containers/App.js"
import Login from "./containers/Login.js"
import Signup from "./containers/Signup.js"
import Title from "./containers/Title.js"
import Event from "./containers/Event.js"
import NewEvent from "./containers/NewEvent"

import "./styles/base.css"

import { Route, BrowserRouter as Router } from "react-router-dom"
import { createBrowserHistory } from 'history'

const history = createBrowserHistory()

ReactDOM.render(
  <Router history={history}>
    <Title />
    <Route exact path = { "/" } component = { App }/>
    <Route exact path="/login" component={ Login } />
    <Route exact path="/signup" component={ Signup } />
    <Route path="/events/:event" render={(props) => <Event {...props} />}/>
    <Route exact path="/new-event" render={ props => <NewEvent {...props} />}/>
  </Router>
  , document.getElementById('root'));

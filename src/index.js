import React from 'react';
import ReactDOM from 'react-dom';
import App from "./containers/App"
import Title from "./containers/Title"
import Event from "./containers/Event"
import NewEvent from "./containers/NewEvent"

import "./styles/base.min.css"

import { Route, BrowserRouter as Router } from "react-router-dom"
import { createBrowserHistory } from 'history'

const history = createBrowserHistory()

ReactDOM.render(
  <Router history={history}>
    <Title />
    <Route exact path="/" component={ App } />
    <Route path="/event/:eventName" render={(props) => <Event {...props} />}/>
    <Route exact path="/new-event" render={ props => <NewEvent />}/>
  </Router>
  , document.getElementById('root'));

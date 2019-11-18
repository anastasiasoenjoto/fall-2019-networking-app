import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'
import SignUpPage from './SignUpPage';
import HomePageCompany from './components/HomePageCompany';
import HomePage from './components/HomePage';


const routing = (
    <Router>
      <div>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/SignUpPage" component={SignUpPage}/>
        <Route path="/HomePageCompany" component={HomePageCompany}/>
        <Route exact path="/HomePage" component={HomePage}/>
        <Route path="/displayUsers" component={displayUsers}/>
      </Switch>
      </div>
    </Router>
  )

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

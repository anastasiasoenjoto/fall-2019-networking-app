import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'
import SignUpPage from './SignUpPage';
import HomePageCompany from './components/HomePageCompany';
import HomePage from './components/HomePage';
import displayUsers from './components/displayUsers';
import displayJobs from './components/displayJobs';
import JobQuestionnaire from './components/JobQuestionnaire';
import JobApplicationForm from './components/JobApplicationForm';
import UserProfile from "./components/UserProfile.js"
import CompanyProfile from "./components/CompanyProfile.js"
import ChatRoom from "./components/chatRoom.js";
import ViewCompany from './components/ViewCompany';
import AddFriend from "./components/AddFriend.js";

const routing = (
    <Router>
      <div>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/SignUpPage" component={SignUpPage}/>
        <Route path="/HomePageCompany" component={HomePageCompany}/>
        <Route exact path="/HomePage" component={HomePage}/>
        <Route path="/displayUsers" component={displayUsers}/>
        <Route path="/displayJobs" component={displayJobs}/>
        <Route path="/chatRoom" component={ChatRoom}/>
        <Route path="/jobPost" component={JobQuestionnaire}/>
        <Route path = '/jobApplication' component = {JobApplicationForm}/>
        <Route path="/userProfile" component={UserProfile}/>
        <Route path="/companyProfile" component={CompanyProfile}/>
        <Route path="/ViewCompany" component={ViewCompany}/>
      </Switch>
      </div>
    </Router>
  )

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';

import Navbar from "./components/Navbar.js"
import UsersList from "./components/SignUp.js"

import CreateUser from "./components/CreateUser.js"
import CreateCompany from "./components/CreateCompany"
import LoginUser from "./components/Login.js"
import HomePage from "./components/HomePage.js"
import CompanyList from "./components/displayCompany.js"
import JobPostingQuestionnaire from "./components/JobPostingQuestionnaire.js"
import HomePageCompany from "./components/HomePageCompany.js"
import displayUsers from  "./components/displayUsers"

function App() {
  return (
      <Router>
        <Navbar />
        <br/>
        <Route path="/user" component={CreateUser} />
        <Route path="/company" component={CreateCompany} />
        <Route path="/loginUser" component={LoginUser}/>
        <Route path="/home" component={HomePage}/>
        <Route path="/activeCompanies" component={CompanyList} />
        <Route path="/jobQuestionnaire" component = {JobPostingQuestionnaire}/>
        <Route path="/homeCompany" component={HomePageCompany}/>
        <Route path="/displayUsers" component={displayUsers}/>
        
      </Router>
  );
}

export default App;

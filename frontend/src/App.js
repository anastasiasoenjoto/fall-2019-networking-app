import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';

import Navbar from "./components/Navbar.js"
import UsersList from "./components/SignUp.js"

import CreateUser from "./components/CreateUser.js"
import CreateCompany from "./components/CreateCompany"
import LoginUser from "./components/LoginUser.js"
import HomePage from "./components/HomePage.js"
import CompanyList from "./components/displayCompany"

function App() {
  return (
      <Router>
        <Navbar />
        <br/>
        <Route path="/user" component={CreateUser} />
        <Route path="/company" component={CreateCompany} />
        <Route path="/activeUsers" component={UsersList} />
        <Route path="/loginUser" component={LoginUser}/>
        <Route path="/home" component={HomePage}/>
        <Route path="/activeCompanies" component={CompanyList} />
      </Router>
  );
}

export default App;

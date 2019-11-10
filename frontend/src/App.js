import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';

import Navbar from "./components/Navbar.js"
import UsersList from "./components/SignUp.js"
import HomeScreenBar from "./components/HomeScreenNavBar.js"

import CreateUser from "./components/CreateUser.js"
import CreateCompany from "./components/CreateCompany"
import LoginUser from "./components/LoginUser.js"
import HomePage from "./components/HomePage.js"

import HomeScreenGrid from './components/HomeScreenGrid';

function App() {
  return (
      <Router>
        <HomeScreenBar />
        <HomeScreenGrid />
      </Router>
  );
}

export default App;

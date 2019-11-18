import React from 'react';
import { BrowserRouter as Router, Route , Switch} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';

import Navbar from "./components/Navbar.js"
import UsersList from "./components/SignUp.js"
import HomeScreenBar from "./components/HomeScreenNavBar.js"

import CreateUser from "./components/CreateUser.js"
import CreateCompany from "./components/CreateCompany"
import LoginUser from "./components/Login.js"
import HomePage from "./components/HomePage.js"

import HomeScreenGrid from './components/HomeScreenGrid';
import SignUp from'./SignUpPage.js';

function App() {
  return (
      <div>
        <HomeScreenBar />
        <HomeScreenGrid />
        <Route path="/displayUsers" component={displayUsers}/>

      </div>
  );
}

export default App;

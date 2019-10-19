import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';

import Navbar from "./components/Navbar.js"
import CreateUser from "./components/CreateUser.js"
import CreateCompany from "./components/CreateCompany"

function App() {
  return (
      <Router>
        <Navbar />
        <br/>
        <Route path="/user" component={CreateUser} />
        <Route path="/company" component={CreateCompany} />
      </Router>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';

import Navbar from "./components/Navbar.js"
<<<<<<< HEAD
import UsersList from "./components/Signup.js"
=======
import CreateUser from "./components/CreateUser.js"
import CreateCompany from "./components/CreateCompany"
>>>>>>> 09f7ee41ab150fe5f9dcc8449cba3e02728b16dc

function App() {
  return (
      <Router>
        <Navbar />
        <br/>
        <Route path="/user" component={CreateUser} />
<<<<<<< HEAD

=======
        <Route path="/company" component={CreateCompany} />
>>>>>>> 09f7ee41ab150fe5f9dcc8449cba3e02728b16dc
      </Router>
  );
}

export default App;

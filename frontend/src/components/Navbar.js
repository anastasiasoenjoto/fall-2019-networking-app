import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">Network</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/user" className="nav-link">Create User</Link>
          </li>
<<<<<<< HEAD
          <li className="navbar-item"> 
          <Link to="/activeUsers" className="nav-link">Display Users</Link>
=======
          <li className="navbar-item">
          <Link to="/company" className="nav-link">Create Company User</Link>
>>>>>>> 09f7ee41ab150fe5f9dcc8449cba3e02728b16dc
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}
import React, { Component } from 'react';
import axios from 'axios';

export default class displayUsers extends Component {
  constructor(props) {
    super(props);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeMajor = this.onChangeMajor.bind(this);
    this.onChangeGPA = this.onChangeGPA.bind(this);
    this.onChangeCity = this.onChangeCity.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      major: '', 
      GPA: '', 
      city: '',
      users: []
    }
  }

  // componentDidMount() {
  //   const fetch = require("node-fetch");
  //   fetch('http://localhost:3001/users/')
  //     .then(results => {
  //         return results.json();})
  //       .then(data=> {
  //           let users = data.map((u) => {
  //               return(
  //                   <div key={u.username}>
  //                       <h2>Name: {u.firstName, u.lastName}</h2>
  //                       <p><i>Email: {u.email}</i></p>
  //                       <p><i>City: {u.city}</i></p>
  //                       <p><i>Major: {u.major}</i></p>
  //                       <p><i>GPA: {u.GPA}</i></p>
                        

  //                   </div>
  //               )
  //           })
  //           this.setState({users: users});
  //       })
  // }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }
  onChangeMajor(e) {
    this.setState({
      major: e.target.value
    })
  }

  onChangeGPA(e) {
    this.setState({
      GPA: e.target.value
    })
  }

  onChangeCity(e) {
    this.setState({
      city: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const displayUsers = {
      username: this.state.username,
      city: this.state.city, 
      major: this.state.major,
      GPA: this.state.GPA,
    }
    axios.post('http://localhost:3001/users/queryUsers', displayUsers)
    .then(res => {
      console.log(res.data.message)
      console.log(res.data.users);
      return res.data.users
    })
    .then(data=> {
            let users = data.map((u) => {
                return(
                    <div key={u.username}>
                        <h4>Name: {u.firstName} {u.lastName}</h4>
                        <p><i>Email: {u.email}</i></p>

                    </div>
                )
            })
            this.setState({users: users});
        })

    this.state = {
      username: displayUsers.username,
      major: displayUsers.major, 
      GPA: displayUsers.GPA, 
      city: displayUsers.city,
      users: []
    }

  }

  render() {
    return (
      <div>
           {this.state.users}
          <form onSubmit={this.onSubmit}>
        <h1> Filter Users </h1>
        <label>
            Username: 
            <input id="Username" type="text" value={this.state.username} onChange= {this.onChangeUsername} placeholder="Enter Username"/>
          </label>
        <fieldset>
          <label style={{color: "white"}}>
            City: 
            <select id="city" value={this.state.city} onChange= {this.onChangeCity}>
              <option>----Select a city-----</option>
              <optgroup label="California">
                <option value="losAngeles">Los Angeles</option>
                <option value="sanFrancisico">San Francisco</option>
              </optgroup>
              <optgroup label="New York">
              <option value="albany">Albany</option>
                <option value="newYork">New York </option>
              </optgroup>
              <optgroup label="Texas">
              <option value="austin">Austin</option>
                <option value="dallas">Dallas</option>
              </optgroup>

            </select>
          </label>
          </fieldset>
          <br></br>
          <fieldset>
            <label style={{color: "white"}}>
            
            Major: 
            <select id="major" value={this.state.major} onChange= {this.onChangeMajor}>
              <option>----Select your major-----</option>
              
              <option value="anthropology">Anthropology</option>
              <option value="businessManagement">Business Management</option>
              <option value="computerScience">Computer Science</option>
              <option value="dataScience">Data Science</option>
            </select>
          </label>
          <br></br><br></br>
          </fieldset>
          <label style={{color: "white"}}>
            GPA: 
            <input id="GPA" type="text" value={this.state.GPA} onChange= {this.onChangeGPA} placeholder="Enter GPA"/>
          </label>
          <br></br>
          <input type="submit"></input>
        </form>

      </div> 
    )
  }
}
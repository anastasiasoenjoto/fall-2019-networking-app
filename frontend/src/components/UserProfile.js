import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom'


export default class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.onChangefirstName = this.onChangefirstName.bind(this);
    this.onChangelastName = this.onChangelastName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeCity = this.onChangeCity.bind(this);
    this.onChangeMajor = this.onChangeMajor.bind(this);
    this.onChangeGPA = this.onChangeGPA.bind(this);
    this.onSubmit = this.onSubmit.bind(this);



    this.state = {
      firstName: 'anastasia', 
      lastName: 'soenjoto', 
      email: 'adfsfd@gmail.com',
      password: 'anastasia', 
      city: 'newYork', 
      major: 'computerScience', 
      GPA: '3.8'

    }

  }

  onChangefirstName(e) {
    this.setState({
      firstName: e.target.value
    })
  }

  onChangelastName(e) {
    this.setState({
      lastName: e.target.value
    })
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    })
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    })
  }
  onChangeCity(e) {
    this.setState({
      city: e.target.value
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

  onSubmit(e) {
    e.preventDefault();


    const user = {
      // username: this.props.location.state.username,
      username: 'anastasia',
      firstName: this.state.firstName, 
      lastName: this.state.lastName, 
      email: this.state.email,
      password: this.state.password,
      city: this.state.city, 
      major: this.state.major,
      GPA: this.state.GPA
    }
    // console.log(this.state.username)
    console.log(user)
    axios.post('http://localhost:3001/users/editProfile', user)
      .then(res => console.log(res.data));

    this.setState({
      firstName: '', 
      lastName: '', 
      email: '', 
      password: '',
      city: '', 
      major: '', 
      GPA: ''

    })


  }



  render() {

    return (
      <div>
        <h1> Edit Profile </h1>
        <form id="editProfile" onSubmit={this.onSubmit} >
          <label>
            First Name: 
            <input id="firstName" type="text" value={this.state.firstName} onChange= {this.onChangefirstName} placeholder= 'anastasia'/>
          </label>
          <br></br>
            <label>
            Last Name: 
            <input id="lastName" type="text" value={this.state.lastName} onChange= {this.onChangelastName} placeholder='soenjoto'/>
          </label>

          <br></br>
          <label>
            E-mail: 
            <input id="email" type="email" value={this.state.email} onChange= {this.onChangeEmail} placeholder='adfsfd@gmail.com'/>
          </label>
          <br></br>
          <label>
            Password: 
            <input id="password" type="password" value={this.state.password} onChange= {this.onChangePassword} />
          </label>
          <br></br>
          <label>
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

          <br></br>


            <label>
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
          <label>
            GPA: 
            <input id="GPA" type="text" value={this.state.GPA} onChange= {this.onChangeGPA} placeholder='3.8'/>
          </label>
          <br></br>
          <input type="submit"></input>
        </form>
      </div> 
    )
  }
}
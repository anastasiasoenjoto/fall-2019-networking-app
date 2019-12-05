import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom'


export default class CompanyProfile extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeCity = this.onChangeCity.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      companyName: this.props.location.state.companyName, 
      email: this.props.location.state.email,
      password: this.props.location.state.password, 
      city: this.props.location.state.city  
    }

  }

  onChangeName(e) {
    this.setState({
      companyName: e.target.value
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
  onSubmit(e) {
    e.preventDefault();
   

    const company = {
      username: this.props.location.state.username,
      companyName: this.state.companyName, 
      email: this.state.email,
      password: this.state.password,
      city: this.state.city
    }
    console.log(company)
    axios.post('http://localhost:3001/company/editProfile', company)
      .then(res => console.log(res.data));

    this.setState({
        companyName: '', 
        email: '',
        password: '', 
        city: '' 
    })
  }
  
  render() {
   
    return (
      <div>
        <h1> Edit Profile </h1>
        <form id="editProfile" onSubmit={this.onSubmit} >
          <label>
            Company Name: 
            <input id="firstName" type="text" value={this.state.companyName} onChange= {this.onChangeName} placeholder= {this.props.location.state.companyName}/>
          </label>
          <br></br>
          <label>
            E-mail: 
            <input id="email" type="email" value={this.state.email} onChange= {this.onChangeEmail} placeholder={this.props.location.state.email}/>
          </label>
          <br></br>
          <label>
            Password: 
            <input id="password" type="password" value={this.state.password} onChange= {this.onChangePassword} />
          </label>
          <br></br>
          <label>
            City: 
            <select id="city" value={this.state.city} onChange= {this.onChangeCity}>
              <option>----Select a city-----</option>
              <optgroup label="California">
                <option value="losAngeles">Los Angeles</option>
                <option value="sanFrancisico">San Francisco</option>
              </optgroup>
              <optgroup label="New York">
              <option value="albany">Albany</option>
                <option value="newYork">New York </option>
              </optgroup>
              <optgroup label="Texas">
              <option value="austin">Austin</option>
                <option value="dallas">Dallas</option>
              </optgroup>

            </select>
          </label>

          <br></br>
          <input type="submit"></input>
        </form>
      </div> 
    )
  }
}


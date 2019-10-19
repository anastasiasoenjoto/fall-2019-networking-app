import React, { Component } from 'react';
import axios from 'axios';

export default class CreateCompany extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeCompanyName = this.onChangefirstName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeCity = this.onChangeCity.bind(this);
    this.onChangeField = this.onChangeMajor.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      companyName: '', 
      email: '',
      password: '', 
      city: '', 
      major: '',
      field: ''
    }
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  onChangeCompanyName(e) {
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

  onChangeField(e) {
    this.setState({
      field: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const company = {
      username: this.state.username,
      companyName: this.state.companyName, 
      email: this.state.email,
      password: this.state.password,
      city: this.state.city, 
      field: this.state.field
    }

    console.log(company);

    axios.post('http://localhost:3001/company/add', company)
      .then(res => console.log(res.data));

    this.setState({
      username: '',
      companyName: '', 
      email: '', 
      password: '',
      city: '', 
      field: ''
    })
  }

  render() {
    return (
      <div>
        <h1> Sign Up </h1>
        <form onSubmit={this.onSubmit} >
          <fieldset>
          <legend class="formHeader"> Sign up Information</legend>
          <label>
            Company Name: 
            <input type="text" value={this.state.companyName} onChange= {this.onChangeCompanyName} placeholder="Enter company name"/>
          </label>
          <br></br>
          <label>
            UserName: 
            <input type="text" value={this.state.username} onChange= {this.onChangeUsername} placeholder="Enter last name"/>
          </label>
          <br></br>
          <label>
            E-mail: 
            <input type="email" value={this.state.email} onChange= {this.onChangeEmail} placeholder="Enter e-mail"/>
          </label>
          <br></br>
          <label>
            Password: 
            <input type="password" value={this.state.password} onChange= {this.onChangePassword} placeholder="Enter password"/>
          </label>
          <br></br>
          <label>
            City: 
            <select value={this.state.city} onChange= {this.onChangeCity}>
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
          </fieldset>
          <br></br>
          <fieldset>
            <legend class="formHeader"> Interest </legend>
            <label>
            Field: 
            <select value={this.state.major} onChange= {this.onChangeMajor}>
              <option>----Select your major-----</option>
              <option value="anthropology">Anthropology</option>
              <option value="businessManagement">Business Management</option>
              <option value="computerScience">Computer Science</option>
              <option value="dataScience">Data Science</option>
            </select>
          </label>
          <br></br><br></br>
          </fieldset>
          <input type="submit"></input>
        </form>
      </div> 
    )
  }
}
import React, { Component } from 'react';
import axios from 'axios';

export default class displayUsers extends Component {
  constructor(props) {
    super(props);
    this.onChangeMajor = this.onChangeMajor.bind(this);
    this.onChangeGPA = this.onChangeGPA.bind(this);
    this.onChangeCity = this.onChangeCity.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      major: '', 
      GPA: '', 
      city: ''
    }
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
      city: this.state.city, 
      major: this.state.major,
      GPA: this.state.GPA
    }

    this.setState({
        major: '', 
        GPA: '', 
        city: '' 
    })
  }

  render() {
    return (
      <div>
          <form>
        <h1> Filter Users </h1>
        <fieldset>
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
          </fieldset>
          <br></br>
          <fieldset>
            <legend className="formHeader"> Interest </legend>
            <label>
            Major: 
            <select id="major" value={this.state.major} onChange= {this.onChangeMajor}>
              <option>----Select your major-----</option>
              
              <option value="anthropology">Anthropology</option>
              <option value="businessManagement">Business Management</option>
              <option value="computerScience">Computer Science</option>
              <option value="dataScience">Data Science</option>
            </select>
          </label>
          <br></br><br></br>
          </fieldset>
          <label>
            GPA: 
            <input id="GPA" type="text" value={this.state.GPA} onChange= {this.onChangeGPA} placeholder="Enter GPA"/>
          </label>
          <br></br>
          <input type="submit"></input>
        </form>

      </div> 
    )
  }
}

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  firstName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  }, 
  lastName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  password: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  major: {
    type: String,
    required: true,
    trim: true,

  },
  city: {
    type: String,
    required: true,
    trim: true,

  },

  GPA: {
    type: String,
    required: true,
    trim: true,

  },
}, {
  timestamps: true,
});

const Users = mongoose.model('Users', userSchema)

Users.find({'GPA': this.state.GPA, 'city': this.state.city, 'major': this.city.major})
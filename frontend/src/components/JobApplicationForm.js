import React, { Component } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


export default class JobApplicationForm extends Component {
    constructor(props) {
      super(props);
  
      this.onUpdateNameOfApplicant = this.onUpdateNameOfApplicant.bind(this);
      this.onUpdateEmail = this.onUpdateEmail.bind(this);
      this.onUpdateMajor = this.onUpdateMajor.bind(this);
      this.onUpdateGPA = this.onUpdateGPA.bind(this);
      this.onUpdatePhoneNumber = this.onUpdatePhoneNumber.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
  
      this.state = {
          nameOfApplicant: '',
          email: '',
          major: '', 
          GPA: '',
          PhoneNumber:''
      }  
    }

    onUpdateNameOfApplicant(e){
        this.setState(
            {nameOfApplicant: e.target.value}
        )
    }

    onUpdateEmail(e){
        this.setState(
            {email: e.target.value}
        )
    }

    onUpdateMajor(e){
        this.setState(
            {email: e.target.value}
        )
    }

    onUpdateGPA(e){
        this.setState(
            {GPA: e.target.value}
        )
    }

    onUpdatePhoneNumber(e){
        this.setState(
            {PhoneNumber: e.target.value}
        )
    }

    onSubmit(e){
        e.preventDefault();

        const newJob = {
            nameOfApplicant: this.state.nameOfApplicant,
            email: this.state.email,
            major: this.state.major,
            GPA: this.state.GPA
        }

        this.setState({
            nameOfApplicant: '',
            email: '',
            major: '',
            GPA: '',
        })
    }

    render() {
        return (
          <div>
            <h1> Job Title: </h1>
            <form id="JobApplicationForm" onSubmit={this.onSubmit} >
              <fieldset>
              <legend className="formHeader"> Job Requirement </legend>
              <label>
                Name: 
                <input id = "nameOfApplicant" type = "text" value = {this.state.nameOfApplicant} onChange = {this.onUpdateNameOfApplicant} placeholder="Enter your name"/>
              </label>
              <br></br>
              <label>
                Phone Number: 
                <input id = "phone number" type = "text" value = {this.state.PhoneNumber} onChange = {this.state.PhoneNumber} placeholder="Enter phone number"/>
              </label>
              <br></br>
              <label>
                Email: 
                <input id = "email" type = "text" value = {this.state.email} onChange = {this.state.email} placeholder="Enter your email"/>
              </label>
              <br></br>
              <label>
                major: 
                <input id = "major" type = "text" value = {this.state.major} onChange= {this.onUpdateMajor} placeholder="Enter your major"/>
              </label>
              <br></br>
              <label>
                GPA: 
                <input id = "GPA" type = "text" value={this.state.GPA} onChange = {this.onUpdateGPA} placeholder="Enter your GPA"/>
              </label>
              <br></br>
              </fieldset>
              <br></br>
              <input type="submit"></input>
            </form>
          </div> 
        )
      }
}
import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';


export default class JobApplicationForm extends Component {
    constructor(props) {
      super(props);
  
      this.onUpdateNameOfApplicant = this.onUpdateNameOfApplicant.bind(this);
      this.onUpdateEmail = this.onUpdateEmail.bind(this);
      this.onUpdateMajor = this.onUpdateMajor.bind(this);
      this.onUpdateGPA = this.onUpdateGPA.bind(this);
      this.onUpdatePhoneNumber = this.onUpdatePhoneNumber.bind(this);
      this.onUpdateSkills = this.onUpdateSkills.bind(this);
      this.onUpdateResume = this.onUpdateResume.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
  
      this.state = {
          jobId: '',
          nameOfApplicant: '',
          email: '',
          major: '', 
          GPA: '',
          PhoneNumber:'', 
          skill: '', 
          resume: ''
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
            {major: e.target.value}
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

    onUpdateSkills(e){
        this.setState(
            {skill: e.target.value}
        )
    }

    onUpdateResume(e){
        this.setState(
            {resume: e.target.value}
        )
    }

    onSubmit(e){
        e.preventDefault();

        const newJob = {
            username: this.props.location.state.username,
            jobId: this.props.location.state.jobId,
            nameOfApplicant: this.state.nameOfApplicant,
            email: this.state.email,
            major: this.state.major,
            GPA: this.state.GPA, 
            skill: this.state.skill, 
            resume: this.state.resume, 
            date: new Date()
        }

        axios.post('http://localhost:3001/jobs/addApplicants', newJob)
        .then(res => {
            return res.data.message
        })

        this.setState({
            nameOfApplicant: '',
            email: '',
            major: '',
            GPA: '', 
            skill: ''
        })
    }

    

    render() {
        // console.log(this.props.location.state.jobId)
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
               <input id = "phone" type = "text" value = {this.state.PhoneNumber} onChange = {this.onUpdatePhoneNumber} placeholder="Enter phone number"/>
              </label>
              <br></br>
              <label>
                Email: 
                <input id = "email" type = "text" value = {this.state.email} onChange = {this.onUpdateEmail} placeholder="Enter your email"/>
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
              <label>
                Skills (seperated by comma):
                <input id = "skill" type = "text" value={this.state.skill} onChange = {this.onUpdateSkills} placeholder="Enter skills"/>
              </label>
              <br></br>
                <label>
                Link to resume:
                <input id = "resume" type = "url" value={this.state.resume} onChange = {this.onUpdateResume} placeholder="Enter link to resume"/>
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
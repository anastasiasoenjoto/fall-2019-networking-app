import React, { Component } from 'react';
import axios from 'axios';

export default class JobPostingQuestionnaire extends Component {
  constructor(props) {
    super(props);

    this.onUpdateNameOfOpenPosition = this.onUpdateNameOfOpenPosition.bind(this);
    this.onUpdatenumOfOpenPositions = this.onUpdatenumOfOpenPositions.bind(this);
    this.onUpdateJobDescription = this.onUpdateJobDescription.bind(this);
    this.onUpdategpaRequirement = this.onUpdategpaRequirement.bind(this);
    this.onUpdateWorkExperienceRequirement = this.onUpdateWorkExperienceRequirement.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
        nameOfOpenPosition: '',
        numOfOpenPositions: '',
        jobDescription: '', 
        gpaRequirement: '', 
        workExperienceRequirement: '',
        workLocation: '',
        estimatedSalaryPerHour: '',
        applicationDeadline: ''

    }  
}



  onUpdateNameOfOpenPosition(e) {
    this.setState(
        {nameOfOpenPosition: e.target.value}
    )
  }

  onUpdatenumOfOpenPositions(e) {
    this.setState(
        {numOfOpenPositions: e.target.value}
    )
  }

  onUpdateJobDescription(e) {
    this.setState(
        {jobDescription: e.target.value}
    )
  }

  onUpdategpaRequirement(e) {
    this.setState(
        {gpaRequirement: e.target.value}
    )
  }

  onUpdateWorkExperienceRequirement(e) {
    this.setState(
        {workExperienceRequirement: e.target.value}
    )
  }

  onUpdateWorkLocation(e){
      this.setState(
          {workLocation: e.target.value}
      )
  }

  onUpdateEstimatedSalaryPerHour(e){
      this.setState(
          {estimatedSalaryPerHour: e.target.value}
      )
  }
  
  onUpdateApplicationDeadline(e){
      this.setState(
          {applicationDeadline: e.target.value}
      )
  }

  onSubmit(e) {
    e.preventDefault();

    const newJob = {
        nameOfOpenPosition: this.state.nameOfOpenPosition,
        numOfOpenPositions: this.state.numOfOpenPositions,
        jobDescription: this.state.jobDescription,
        gpaRequirement: this.state.gpaRequirement,
        workExperienceRequirement: this.state.workExperienceRequirement,
        workLocation: this.state.workLocation,
        estimatedSalaryPerHour: this.state.estimatedSalaryPerHour,
        applicationDeadline: this.state.applicationDeadline
    }

    axios.post('http://localhost:3001/jobs/add', newJob)
      .then(res => console.log(res.data));

    this.setState({
        nameOfOpenPosition: '',
        numOfOpenPositions: '', 
        jobDescription: '', 
        gpaRequirement: '',
        workExperienceRequirement: '',
        workLocation: '',
        estimatedSalaryPerHour: '',
        applicationDeadline: ''
    })
  }

  render() {
    return (
      <div>
        <h1> Job Post Qeuestionnaire </h1>
        <form id="CompanySignUpForm" onSubmit={this.onSubmit} >
          <fieldset>
          <legend className="formHeader"> Start A New Job Post Here</legend>
          <label>
            Job Title: 
            <input id = "nameOfOpenPosition" type = "text" value = {this.state.nameOfOpenPosition} onChange = {this.onUpdateNameOfOpenPosition} placeholder="Enter job title"/>
          </label>
          <br></br>
          <label>
            Number Of Total Open Positions: 
            <input id = "numOfOpenPositions" type = "text" value = {this.state.numOfOpenPositions} onChange = {this.onUpdatenumOfOpenPositions} placeholder="Enter total number positions offered"/>
          </label>
          <br></br>
          <label>
            Job Description: 
            <input id = "jobDescription" rows = "10" cols = "30" value = {this.state.jobDescription} onChange= {this.onUpdateJobDescription} placeholder="Enter the job description"/>
          </label>
          <br></br>
          <label>
            GPA Requirement: 
            <input id = "gpaRequirement" type = "text" value={this.state.gpaRequirement} onChange = {this.onUpdategpaRequirement} placeholder="Enter GPA requirement"/>
          </label>
          <br></br>
          <label>
            Work Experience Requirement:
            <select id = "workExperienceRequirement" value = {this.state.workExperienceRequirement} onChange = {this.onUpdateWorkExperienceRequirement}>
              <option value = "yes">Yes</option>
              <option value = "no">No</option>
            </select>
          </label>
          <br></br>
          <label>
            Work Location:
            <input id = "workLocation" value = {this.state.workLocation} onChange = {this.onUpdateWorkLocation} placeholder = "Country, City"/>
          </label>
          <br></br>
          <label>
            Eestimated Salary Per Hour:
            <input id = "estimatedSalaryPerHour" value = {this.state.estimatedSalaryPerHour} onChange = {this.onUpdateEstimatedSalaryPerHour} placeholder = "Enter Estimated Hourly Salary"/>
          </label>
          <br></br>
          <label>
            Application Deadline:
            <input id = "applicationDeadline" value = {this.state.applicationDeadline} onChange = {this.onUpdateApplicationDeadline} placeholder = "Month/Day/Year"/>
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
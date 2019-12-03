import React, { Component } from 'react';
import axios from 'axios';

export default class JobQuestionnaire extends Component {
    constructor(props) {
        super(props);
        this.onChangeCompanyUsername = this.onChangeCompanyUsername.bind(this);
        this.onChangeJobTitle = this.onChangeJobTitle.bind(this);
        this.onChangeNumOfPositions = this.onChangeNumOfPositions.bind(this);
        this.onChangeJobDescription = this.onChangeJobDescription.bind(this);
        this.onChangeJobLocation = this.onChangeJobLocation.bind(this);
        this.onChangeJobSalary = this.onChangeJobSalary.bind(this);
        this.onChangeGpaReq = this.onChangeGpaReq.bind(this);
        this.onChangeMajorReq = this.onChangeMajorReq.bind(this);
        this.onChangeApplicationDeadline = this.onChangeApplicationDeadline.bind(this);
        this.onSumbit = this.onSumbit.bind(this);

        this.state = {
            companyUsername: '',
            jobTitle: '',
            numOfPositions: '',
            jobDescription: '',
            jobLocation: '',
            jobSalary: '',
            gpaReq: '',
            majorReq: '',
            applicationDeadline: ''
        }
    }

    onChangeCompanyUsername(e){
        this.setState({
            companyUsername: e.target.value
        })
    }

    onChangeJobTitle(e){
        this.setState({
            jobTitle: e.target.value
        })
    }

    onChangeNumOfPositions(e){
        this.setState({
            numOfPositions: e.target.value
        })
    }

    onChangeJobDescription(e){
        this.setState({
            jobDescription: e.target.value
        })
    }

    onChangeJobLocation(e){
        this.setState({
            jobLocation: e.target.value
        })
    }

    onChangeJobSalary(e){
        this.setState({
            jobSalary: e.target.value
        })
    }

    onChangeGpaReq(e){
        this.setState({
            gpaReq: e.target.value
        })
    }

    onChangeMajorReq(e){
        this.setState({
            majorReq: e.target.value
        })
    }

    onChangeApplicationDeadline(e){
        this.setState({
            applicationDeadline: e.target.value
        })
    }

    onSumbit(e){
        e.preventDefault();

        const job = {
            companyUsername: this.state.companyUsername,
            jobTitle: this.state.jobTitle,
            numOfPositions: this.state.numOfPositions,
            jobDescription: this.state.jobDescription,
            jobLocation: this.state.jobLocation,
            jobSalary: this.state.jobSalary,
            gpaReq: this.state.gpaReq,
            majorReq: this.state.majorReq,
            applicationDeadline: this.state.applicationDeadline
        }

        axios.post('http://localhost:3001/jobs/add', job)
            .then(res => console.log(res.data));
    }

    render(){
        return(
            <div>
                <h1> Welcome! </h1>
                <h3> post a new job here</h3>
                <form id = "postJobForm" onSubmit = {this.onSumbit}>
                    <fieldset>
                        <legend className = "formHeader"> </legend>
                        <label>
                             Company Username: 
                             <input id = "companyUsername" type = "text" value = {this.state.companyUsername} onChange = {this.onChangeCompanyUsername} placeholder = "Enter Your Username" />
                        </label>
                        <br></br>
                        <label>
                            Job Title: 
                            <input id = "jobTitle" type = "text" value = {this.state.jobTitle} onChange = {this.onChangeJobTitle} placeholder = "Enter job title" />
                        </label>
                        <br></br>
                        <label>
                            Number of Employees Recruiting: 
                            <input id = "numOfPositions" type = "text" value = {this.state.numOfPositions} onChange = {this.onChangeNumOfPositions} placeholder = "Enter number of employees needed" />
                        </label>
                        <br></br>
                        <label>
                            Job Description:
                            <input id = "jobDescription" type = "text" value = {this.state.jobDescription} onChange = {this.onChangeJobDescription} placeholder = "Enter job description" />
                        </label>
                        <br></br>
                        <label>
                            Job Location:
                            <input id = "jobLocation" type = "text" value = {this.state.jobLocation} onChange = {this.onChangeJobLocation} placeholder = "Enter job location" />
                        </label>
                        <br></br>
                        <label>
                            Salary Per Hour:
                            <input id = "jobSalary" type = "text" value = {this.state.jobSalary} onChange = {this.onChangeJobSalary} placeholder = "Enter salary per hour" />
                        </label>
                        <br></br>
                        <label>
                            GPA Requirement:
                            <input id = "gpaReq" type = "text" value = {this.state.gpaReq} onChange = {this.onChangeGpaReq} placeholder = "Enter GPA Requirement" />
                        </label>
                        <br></br>
                        <label>
                            Major Requirement:
                            <input id = "majorReq" type = "text" value = {this.state.majorReq} onChange = {this.onChangeMajorReq} placeholder = "Enter major Requirement" />
                        </label>
                        <br></br>
                        <label>
                            application Deadline:
                            <input id = "applicationDeadline" type = "text" value = {this.state.applicationDeadline} onChange = {this.onChangeApplicationDeadline} placeholder = "Enter application deadline" />
                        </label>
                        <br></br>
                    </fieldset>
                    <input type="submit"></input>
                </form>
            </div>
        )
    }
}

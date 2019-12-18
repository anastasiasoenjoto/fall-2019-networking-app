import React, { Component } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Redirect } from 'react-router-dom';
import { ListItemText, ListItem, List, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const styles = theme => ({
    root: {
        border: '2px solid black',
        width: '40%', 
        margin: 'auto'
    },
    
  });

class JobApplicationForm extends Component {
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
            date: new Date(),
            _id: this.props.location.state.userID,
        }

        const newApplication = {
            username: this.props.location.state.username,
            jobId: this.props.location.state.jobId,
        }

        axios.post('http://localhost:3001/jobs/addApplicants', newJob)
        .then(res => {
            return res.data.message
        })
        
        axios.post('http://localhost:3001/users/addApplication', newApplication)
        .then(res => {
            console.log(res.data.message)
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
     
        const { classes } = this.props;
        return (
          <div className={classes.root}>
              <List>
                <ListItemText primary={<Typography component="span" variant='h3' color="textPrimary">{this.props.location.state.jobTitle}</Typography>}></ListItemText>
                <Link to={{
                    pathname: '/ViewCompany', 
                    state: {
                        companyUsername: this.props.location.state.companyUsername
                    }
                }}
                ><ListItemText primary={this.props.location.state.companyUsername}></ListItemText></Link>
                <ListItemText primary={this.props.location.state.jobDescription}></ListItemText>
                <ListItem>
                    <input style={{width: "40%"}} id = "nameOfApplicant" type = "text" value = {this.state.nameOfApplicant} onChange = {this.onUpdateNameOfApplicant} placeholder="Enter your name"/>
                </ListItem>
                <ListItem>
                    <input style={{width: "40%"}} id = "phone number" type = "text" value = {this.state.PhoneNumber} onChange = {this.onUpdatePhoneNumber} placeholder="Enter phone number"/>
                </ListItem>
                <ListItem>
                    <input style={{width: "40%"}} id = "email" type = "text" value = {this.state.email} onChange = {this.onUpdateEmail} placeholder="Enter your email"/>
                </ListItem>
                <ListItem>
                    <input style={{width: "40%"}} id = "major" type = "text" value = {this.state.major} onChange= {this.onUpdateMajor} placeholder="Enter your major"/>
                </ListItem>
                <ListItem>
                    <input style={{width: "40%"}} id = "GPA" type = "text" value={this.state.GPA} onChange = {this.onUpdateGPA} placeholder="Enter your GPA"/>
                </ListItem>
                <ListItem>
                    <input style={{width: "40%"}} id = "skill" type = "text" value={this.state.skill} onChange = {this.onUpdateSkills} placeholder="Enter skills"/>
                </ListItem>
                <ListItem>
                    <input style={{width: "40%"}} id = "resume" type = "url" value={this.state.resume} onChange = {this.onUpdateResume} placeholder="Enter link to resume"/>
                </ListItem>
                <ListItem>
                    <Button variant="contained" onClick={this.onSubmit}>Submit</Button>
                </ListItem>
              </List>
          </div> 
        )
      }
}
export default withStyles(styles)(JobApplicationForm);;

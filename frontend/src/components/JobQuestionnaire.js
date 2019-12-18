import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { ListItemText, ListItem, List, Typography,Button  } from '@material-ui/core';
const styles = theme => ({
    root: {
        border: '2px solid black',
        width: '40%', 
        margin: 'auto'
    },
    
  });

class JobQuestionnaire extends Component {
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
        this.onChangeSkills = this.onChangeSkills.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onSubmitNext = this.onSubmitNext.bind(this);

        this.state = {
            companyUsername: '',
            jobTitle: '',
            numOfPositions: '',
            jobDescription: '',
            jobLocation: '',
            jobSalary: '',
            gpaReq: '',
            majorReq: '',
            skills: '',
            applicationDeadline: '', 
            redirectToHome: false
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

    onChangeSkills(e){
        this.setState({
            skills: e.target.value
        })
    }

    onSubmit(e){
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
        this.setState({redirectToHome: true});
    }

    onSubmitNext(e){
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

        this.setState({
            companyUsername: '',
            jobTitle: '',
            numOfPositions: '',
            jobDescription: '',
            jobLocation: '',
            jobSalary: '',
            gpaReq: '',
            majorReq: '',
            applicationDeadline: '', 
            redirectToHome: false
        })
    }
    render(){

        if (this.state.redirectToHome == true) {
            return <Redirect to={{
                pathname: "/HomePageCompany",
                state: { username: this.state.username }
            }}
            />
        }

        const { classes } = this.props;
        return(
            <div className={classes.root}>
                <List>
                    <ListItemText primary={<Typography component="span" variant='h3' color="textPrimary">Post a new job</Typography>}></ListItemText>
                    <ListItem>
                        <input style={{width: "60%"}} id = "companyUsername" type = "text" value = {this.state.companyUsername} onChange = {this.onChangeCompanyUsername} placeholder = "Enter Your Username" />
                    </ListItem>
                    <ListItem>
                        <input style={{width: "60%"}} id = "jobTitle" type = "text" value = {this.state.jobTitle} onChange = {this.onChangeJobTitle} placeholder = "Enter job title" />
                    </ListItem>
                    <ListItem>
                        <input style={{width: "60%"}} id = "numOfPositions" type = "number" value = {this.state.numOfPositions} onChange = {this.onChangeNumOfPositions} placeholder = "Enter number of employees needed" />
                    </ListItem>
                    <ListItem>
                        <textarea style={{width: "60%"}} id = "jobDescription" value = {this.state.jobDescription} onChange = {this.onChangeJobDescription} placeholder = "Enter job description"></textarea>
                    </ListItem>
                    <ListItem>
                        <input style={{width: "60%"}} id = "jobLocation" type = "text" value = {this.state.jobLocation} onChange = {this.onChangeJobLocation} placeholder = "Enter job location" />
                    </ListItem>
                    <ListItem>
                        <input style={{width: "60%"}} id = "jobSalary" type = "text" value = {this.state.jobSalary} onChange = {this.onChangeJobSalary} placeholder = "Enter salary per hour" />
                    </ListItem>
                    <ListItem>
                        <input style={{width: "60%"}} id = "gpaReq" type = "text" value = {this.state.gpaReq} onChange = {this.onChangeGpaReq} placeholder = "Enter GPA Requirement" />
                    </ListItem>
                    <ListItem>
                        <input style={{width: "60%"}} id = "majorReq" type = "text" value = {this.state.majorReq} onChange = {this.onChangeMajorReq} placeholder = "Enter major Requirement" />
                    </ListItem>
                    <ListItem>
                        <input style={{width: "60%"}} id = "applicationDeadline" type = "date" value = {this.state.applicationDeadline} onChange = {this.onChangeApplicationDeadline} placeholder = "Enter application deadline" />
                    </ListItem>
                    <ListItem>
                        <input style={{width: "60%"}} id = "skills" type = "text" value = {this.state.skills} onChange = {this.onChangeSkills} placeholder = "Enter your skills seperated by comma" />
                    </ListItem>
                    <ListItem>
                        <Button variant='contained' onClick={this.onSubmit}>Save and Exit</Button>
                        <Button variant='contained' onClick={this.onSubmitNext}>Save and Add Another</Button>
                    
                    </ListItem>
                </List>
                
            </div>
        )
    }
}
export default withStyles(styles)(JobQuestionnaire);;


import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import LoggedInNavBar from './LoggedInNavBar'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Popup from "reactjs-popup";

const styles = theme => ({
    grid: {
        margin: 0,
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
    },
    item: {
        flex: 1
    }
});



class HomePageCompany extends Component {


    constructor(props) {
        super(props);
        this.state = {
            // companies: [],
            companyName: '',
            password: '',
            email: '',
            city: '',
            userName: '',
            job: []
        };
        this.onClickAccept = this.onClickAccept.bind(this);
        this.onClickReject = this.onClickReject.bind(this);
    }

    componentDidMount() {
        console.log(this.props.location.state.username)
        const company = {
            username: this.props.location.state.username
        }
        axios.post('http://localhost:3001/company/getCurrentCompany', company)
        .then(res => {
            return res.data.user
        })
        .then(data => {
            let companies = data.map((u) => {
                this.setState({companyName: u.companyName, userName: u.userName, password: u.password, email: u.email, city: u.city})
                u.jobs.map((x) => {
                    const job = {
                        jobs: x
                    }
                    axios.post('http://localhost:3001/jobs/findAllApplicants', job)
                    .then(res => {
                        // console.log("Applicants:", res.data.applicants.jobTitle)
                        this.setState({job: this.state.job.concat(res.data.applicants)})
                    })
                })
                
            })
        })
    }
    onClickAccept(e) {
        e.preventDefault();

        //console.log("on click accept user", e.currentTarget.id);

        const job = {
            status: true,
            company: this.props.location.state.username, 
            details: e.currentTarget.id
        }
        axios.post('http://localhost:3001/users/closeApplication', job)
        .then(res => {
            console.log(res.data.message)
        })
    }

    onClickReject(e) {
        e.preventDefault();

        const job = {
            status: false,
            company: this.props.location.state.username, 
            details: e.currentTarget.id
        }
        axios.post('http://localhost:3001/users/closeApplication', job)
        .then(res => {
            console.log(res.data.message)
        })
    }

    render() {
        console.log(this.state.companyName)
        const { classes } = this.props;

        return (
            <div>
                <LoggedInNavBar typeuser={1} username={this.props.location.state.username}/>
                <Grid container className={classes.grid}>
                    <Grid item xs={3}></Grid>
                    <Grid item xs={6}>
                        <Typography variant='h3'>Top Applicants</Typography>
                        
                            {this.state.job.map((u) => (
                            <ExpansionPanel>
                                <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="this week"
                                id="this week header"
                            >
                                <Typography variant='h4'>{u.jobTitle}</Typography>
                            </ExpansionPanelSummary>
                            {u.applicants.map((a) => (
                                 <ExpansionPanelDetails>
                                 <ListItem className={classes.item}>
                                     <Typography variant='h5'>{a.name}</Typography>
                                     <Grid container alignItems="flex-start" justify="flex-end" direction="row">
                                     <Popup
                                                    trigger={<Button variant="contained">View Profile</Button>}
                                                    modal
                                                    closeOnDocumentClick
                                                >
                                                    <span> 
                                                        <div>
                                                            <Typography
                                                                component="span"
                                                                variant="h3"
                                                                className={classes.inline}
                                                                color="textPrimary"
                                                            >
                                                            {a.name}
                                                            </Typography>
                                                        </div>
                                                        <br></br>
                                                        <div>
                                                            <Typography
                                                                component="span"
                                                                variant="body1"
                                                                className={classes.inline}
                                                                color="textPrimary"
                                                                
                                                            >
                                                               Email: {a.email} <br></br>
                                                               Major: {a.major} <br></br>
                                                               GPA: {a.GPA} <br></br>
                                                               Skills: 
                                                               {a.skills.join()}
                                                               <br></br>
                                                               Link to Resume: {a.resume}
                                                            </Typography>
                                                        </div>
                                                        <br></br>
                                                        <Button variant="contained" id={u._id + ":" + u.jobTitle + ":" + a._id} onClick={this.onClickAccept}>Accept</Button>
                                                        <Button variant="contained" id={u._id + ":" + u.jobTitle + ":" + a._id} onClick={this.onClickReject}>Reject</Button>
                                                    </span>
                                                </Popup>  
                                     </Grid>
                                 </ListItem>
                             </ExpansionPanelDetails>
                            ))}
                            </ExpansionPanel>
                           
                        

                            ))}
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(HomePageCompany);;
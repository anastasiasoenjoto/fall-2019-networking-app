import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { withStyles, useTheme } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import LoggedInNavBar from './LoggedInNavBar';
import './HomePage.css';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import anon from '../frontend images/anon.png';
import ListItemText from '@material-ui/core/ListItemText';
import Popup from "reactjs-popup";
import { Redirect } from 'react-router-dom';
import { stat } from 'fs';


const styles = theme => ({
    title: {
        fontSize: 14,
    },
    enclosing: {
        flexGrow: 1,
    },
    cardButtons: {
        float: 'bottom'
    },
    card: {
        position: 'absolute',
        top: '20%',
        transform: 'translateY(-50 %)',
        width: '100%',

    },
    rowBreak: {
        minWidth: '240',
    }
});

class ViewCompany extends Component {


    constructor(props) {
        super(props);
        this.state = {
            jobs: [],
            redirectToApply: false , 
            jobId: '',
            username: 'test',
        };
    }

    /* componentDidMount() {
        console.log(this.props.location.state)
        
        const user = {
            username: this.props.location.state.username
        }
        axios.post('http://localhost:3001/users/getCurrentUser', user)
        .then(res => {
            console.log("CURRENT USER DETAILS", res.data.user)
            return res.data.user
        })
        .then(data => {
            let users = data.map((u) => {
                const userDetails = {
                    major: u.major, 
                    city: u.city
                }
                axios.post('http://localhost:3001/users/getRecommendedUser', userDetails)
                .then(res => {
                    console.log("Recommended users: ", res.data.users)
                    return res.data.users
                })
                .then(data => {
                    this.setState({recUsers: data})
                })
                console.log("USER DETAIL", userDetails)
                axios.post('http://localhost:3001/jobs/getRecommendedJobs', userDetails)
                .then(res => {
                    console.log("Recommended jobs: ", res.data.jobs)
                    return res.data.jobs
                })
                .then(data => {
                    this.setState({recJobs: data})
                })
                return(
                    <div key={u.username}>
                        <h2><b><i>Welcome, {u.firstName} {u.lastName}</i></b></h2>
                    </div>
                )
            })
            this.setState({users: users})
        })

      } */ 
      

    render() {
        const { classes } = this.props;
        console.log(this.state.jobId)
        return (
            

            <div className={classes.enclosing}>

                <LoggedInNavBar username={this.state.username} />

                <Card className={classes.card} style={{height:'70%', outline: '1px solid gray'}}>
                    <Grid container height='100%'>
                        <Grid container item xs={12}>
                            <Grid item xs={3}><Typography variant='h4'>Google</Typography></Grid>
                        </Grid>
                        <Grid item height="50%" style={{outline: '1px solid gray'}} xs={12}></Grid>
                        <Grid container item xs={12}>
                            <Grid item xs={2}><Typography variant='h5'>About:</Typography></Grid>
                            <Grid item xs={10}><Typography variant='h6'>Lorem Ipsum</Typography></Grid>
                        </Grid>
                        <Grid container item xs={12}>
                            <Grid item xs={2}><Typography variant='h5'>Employee Count:</Typography></Grid>
                            <Grid item xs={10}><Typography variant='h6'>1</Typography></Grid>
                        </Grid>
                        <Grid item xs={12}>

                        </Grid>
                    </Grid>
                </Card>

            </div>

        );
    }
}

export default withStyles(styles)(ViewCompany);
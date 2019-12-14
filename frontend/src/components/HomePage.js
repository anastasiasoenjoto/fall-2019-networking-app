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
    card: {
        minHeight: 200,
        maxHeight: 200,
        outline: '1px solid gray',
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    grid: {
        position: 'absolute',
        top: '20%',
        transform: 'translateY(-50 %)',
    },
    enclosing: {
        flexGrow: 1,
    },
    cardButtons: {
        float: 'bottom'
    },
    listCard: {
        maxHeight: 200,
        overflow: 'auto'
    }
});

class HomePage extends Component {


    constructor(props) {
        super(props);
        this.state = {
            users: [],
            recUsers: [[]],
            recJobs:[[]],
            pending:[],
            redirectToApply: false , 
            jobId: '', 
            currentPending: [], 
            currentFriends: []
            jobsApplied: 0
        };

        this.onAddFriend = this.onAddFriend.bind(this);
    }

    onAddFriend(e){
        e.preventDefault();

        const friend = {
            username: this.props.location.state.username,
            friendname: e.target.id
        }
        axios.post('http://localhost:3001/users/requestFriend', friend)
        .then(res => {
          return res.data;
        })
        .then(data=> {
          return data.message;
        })
        .then(validity => {
          if (validity == "Request has been submitted") {
            console.log('Request has been submitted')
            {this.setDirectToHomeUser()}
          }
          else {
            console.log('Sorry, no such user exists')
          }
        })
    }


    componentDidMount() {
        console.log(this.props.location.state)
        const analyticDetails = {
            username: this.props.location.state.username
        }
        axios.post('http://localhost:3001/jobs/analytics', analyticDetails)
        .then(res => {
            console.log(res.data.count)
            this.setState({jobsApplied: res.data.count})

        })
        
        const user = {
            username: this.props.location.state.username
        }
        axios.post('http://localhost:3001/users/getCurrentUser', user)
        .then(res => {
            console.log("CURRENT USER DETAILS", res.data.user)
            this.setState({pending: res.data.user[0].pending})
            console.log("Current Pending", this.state.pending)
            return res.data.user
        })
        .then(data => {
            let users = data.map((u) => {
                this.setState({
                    currentPending: u.pending, 
                    currentFriends: u.friends
                })
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

      } 
      

    render() {
        const { classes } = this.props;
        console.log(this.state.jobId)
        
        return (
            

            <div className={classes.enclosing}>

                <LoggedInNavBar typeuser={0} username={this.props.location.state.username} pending={this.state.pending}/>

                <Grid container spacing={1} className={classes.grid}>
                    <Grid container item xs={12} spacing={2}>
                        <Grid item xs={3}>
                            <Card className={classes.card}>
                                <CardContent>
                                    <Typography variant="h5" component="h2">
                                        You have applied to {this.state.jobsApplied} jobs in the past week!
                                        </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small">See active job applications</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                        <Grid item xs={3}>
                            <Card className={classes.card}>
                                <CardContent>
                                    <Typography variant="h5" component="h2">
                                        Your profile was looked at 2 times by companies in the last month!
                                        </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={6}>
                        <Typography variant="h5">Recommended Users</Typography>
                            <Card className={classes.listCard}>
                                <CardContent>
                                    <List className={classes.enclosing}>
                                             {this.state.recUsers[0].map((u) => (
                                                <ListItem button alignItems="flex-start">
                                                <ListItemAvatar>
                                                    <Avatar src={anon} />
                                                </ListItemAvatar>
                                                
                                                <ListItemText
                                                primary= {u.firstName}
                                                secondary={
                                                    <React.Fragment>
                                                        <Typography
                                                            component="span"
                                                            variant="body2"
                                                            className={classes.inline}
                                                            color="textPrimary"
                                                        >
                                                            {u.major}
                                                        </Typography>
                                                        <br></br>
                                                        {u.city}
                                                    </React.Fragment>
                                                }
                                            /> 
                                            {((u.username == this.props.location.state.username) || (this.currentFriends.includes(u.username)) || this.currentPending.includes(u.username)) ? <Button variant="contained" disabled>Add</Button> : <Button variant="contained" color="primary" id={u.username}>Add</Button>}
                                                
                                            </ListItem>
    
                                            ))
                                        }
                                    </List>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                    <Grid container item xs={12} spacing={2}>
                        <Grid item xs={3}>
                            <Card className={classes.card}>
                                <CardContent>
                                    <Typography variant="h5" component="h2">
                                        You have made 3 new friends in the past month!
                                        </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small">See friends</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                        <Grid item xs={3}>
                            <Card className={classes.card}>
                                <CardContent>
                                    <Typography variant="h5" component="h2">
                                        Your profile was looked at 8 times by other users in the last month!
                                        </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={6}>
                        <Typography variant="h5">Recommended Jobs</Typography>
                            <Card className={classes.listCard}>
                                <CardContent>
                                    <List className={classes.enclosing}>
                                    {this.state.recJobs[0].map((u) => (
                                                <ListItem button alignItems="flex-start">
                                                <ListItemAvatar>
                                                    <Avatar src={anon} />
                                                </ListItemAvatar>
                                                <Popup
                                                    trigger={<ListItemText
                                                        primary= {u.jobTitle}
                                                        secondary={
                                                            <React.Fragment>
                                                                <Typography
                                                                    component="span"
                                                                    variant="body2"
                                                                    className={classes.inline}
                                                                    color="textPrimary"
                                                                >
                                                                    {u.companyUsername}
                                                                </Typography>
                                                                <br></br>
                                                            {u.jobLocation}
                                                            </React.Fragment>
                                                        }
                                                    />
                                                }
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
                                                                {u.jobTitle}
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
                                                               Job Description: {u.jobDescription}
                                                            </Typography>
                                                        </div>
                                                        <br></br>
                                                        
                                                        <Link to={{
                                                            pathname: '/jobApplication',
                                                            state: {
                                                                jobId: u._id, 
                                                                username: this.props.location.state.username
                                                            }
                                                            }}><Button variant="contained" id={u._id}>Apply</Button></Link>
                                                        
                                                    </span>
                                                </Popup>
                                            </ListItem>
    
                                            ))
                                        }
                                    </List>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>

            </div>

        );
    }
}

export default withStyles(styles)(HomePage);
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
    },
    listCard: {
        maxHeight: 200,
        overflow: 'auto',
    }
});

class ViewCompany extends Component {


    constructor(props) {
        super(props);
        this.state = {
            jobs: [],
            redirectToApply: false,
            jobId: '',
            username: 'test'
        };
    }

     componentDidMount() {
        const company = {
            username: this.props.location.state.username
        }
        axios.post('http://localhost:3001/company/getCurrentCompany', company)
        .then(res => {
            console.log("CURRENT COMPANY DETAILS", res.data.user)
            return res.data.user
        })
      } 


    render() {
        const { classes } = this.props;
        console.log(this.state.jobId)
        return (


            <div className={classes.enclosing}>

                <LoggedInNavBar username={this.state.username} />

                <Card className={classes.card} style={{ height: '70%', outline: '1px solid gray' }} elevation={0}>
                    <Grid container style={{ height: '100%' }}>
                        <Grid container item xs={12}>
                            <Grid item xs={3} ><Typography variant='h4'>Google</Typography></Grid>
                        </Grid>
                        <Grid container item xs={12}>
                            <Grid item xs={2}><Typography variant='h5'>About:</Typography></Grid>
                            <Grid item xs={10}><Typography variant='h6'>Lorem Ipsum</Typography></Grid>
                        </Grid>
                        <Grid container item xs={12}>
                            <Grid item xs={2}><Typography variant='h5'>Employee Count:</Typography></Grid>
                            <Grid item xs={10}><Typography variant='h6'>1</Typography></Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant='h5'>Open Jobs: </Typography>
                            <Card className={classes.listCard} elevation={0}>
                                <CardContent>
                                    <List className={classes.enclosing}>

                                    <ListItem button alignItems="flex-start">
                                                <Popup
                                                    trigger={<ListItemText
                                                        primary= 'Software Engineer'
                                                        secondary={
                                                            <React.Fragment>
                                                                <Typography
                                                                    component="span"
                                                                    variant="body2"
                                                                    className={classes.inline}
                                                                    color="textPrimary"
                                                                >
                                                                    NYC, NY
                                                                </Typography>
                                                                <br></br>
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
                                                                Software Engineer
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
                                                               Job Description: Lorem Ipsum
                                                            </Typography>
                                                        </div>
                                                        <br></br>
                                                        
                                                        <Button variant="contained" id='N/A'>Apply</Button>
                                                        
                                                    </span>
                                                </Popup>
                                            </ListItem>

                                        {/* {this.state.recJobs[0].map((u) => (
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
                                                                jobId: u._id
                                                            }
                                                            }}><Button variant="contained" id={u._id}>Apply</Button></Link>
                                                        
                                                    </span>
                                                </Popup>
                                            </ListItem>
    
                                            ))
                                        } */}
                                    </List>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Card>

            </div>

        );
    }
}

export default withStyles(styles)(ViewCompany);
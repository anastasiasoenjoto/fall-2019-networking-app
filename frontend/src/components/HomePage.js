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


const styles = theme => ({
    card: {
        minWidth: 275,
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
        };
    }

    /* componentDidMount() {
        console.log(this.props.location.state)
        const user = {
            username: this.props.location.state
        }
        axios.post('http://localhost:3001/users/getCurrentUser', user)
        .then(res => {
            return res.data.user
        })
        .then(data => {
            let users = data.map((u) => {
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


        return (

            <div className={classes.enclosing}>

                <LoggedInNavBar />

                <Grid container spacing={1} className={classes.grid}>
                    <Grid container item xs={12} spacing={2}>
                        <Grid item xs={3}>
                            <Card className={classes.card}>
                                <CardContent>
                                    <Typography variant="h5" component="h2">
                                        You have applied to 5 jobs in the past week!
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
                                        <ListItem button alignItems="flex-start">
                                            <ListItemAvatar>
                                                <Avatar src={anon} />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary="Bruce Wayne"
                                                secondary={
                                                    <React.Fragment>
                                                        <Typography
                                                            component="span"
                                                            variant="body2"
                                                            className={classes.inline}
                                                            color="textPrimary"
                                                        >
                                                            Computer Science
                                                        </Typography>
                                                        {" - Average millionaire from Gotham"}
                                                    </React.Fragment>
                                                }
                                            />
                                        </ListItem>
                                        <Divider variant="inset" component="li" />
                                        <ListItem button alignItems="flex-start">
                                            <ListItemAvatar>
                                                <Avatar src={anon} />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary="Tony Stark"
                                                secondary={
                                                    <React.Fragment>
                                                        <Typography
                                                            component="span"
                                                            variant="body2"
                                                            className={classes.inline}
                                                            color="textPrimary"
                                                        >
                                                            Mechanical Engineering
                                                        </Typography>
                                                      {" - Iron Man from New York"}
                                                    </React.Fragment>
                                                }
                                            />
                                        </ListItem>
                                        <Divider variant="inset" component="li" />
                                        <ListItem button alignItems="flex-start">
                                            <ListItemAvatar>
                                                <Avatar src={anon} />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary="Clark Kent"
                                                secondary={
                                                    <React.Fragment>
                                                        <Typography
                                                            component="span"
                                                            variant="body2"
                                                            className={classes.inline}
                                                            color="textPrimary"
                                                        >
                                                            Journalism
                                                        </Typography>
                                                        {' - Journalist from Los Angeles'}
                                                    </React.Fragment>
                                                }
                                            />
                                        </ListItem>
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
                                        <ListItem button alignItems="flex-start">
                                            <ListItemText
                                                primary="Software Programmer"
                                                secondary={
                                                    <React.Fragment>
                                                        <Typography
                                                            component="span"
                                                            variant="body2"
                                                            className={classes.inline}
                                                            color="textPrimary"
                                                        >
                                                            Microsoft
                                                        </Typography>
                                                        {" - New York, New York"}
                                                    </React.Fragment>
                                                }
                                            />
                                        </ListItem>
                                        <Divider variant="inset" component="li" />
                                        <ListItem button alignItems="flex-start">
                                            <ListItemText
                                                primary="Frontend Developer"
                                                secondary={
                                                    <React.Fragment>
                                                        <Typography
                                                            component="span"
                                                            variant="body2"
                                                            className={classes.inline}
                                                            color="textPrimary"
                                                        >
                                                            Startup
                                                        </Typography>
                                                      {" - Los Angeles, California"}
                                                    </React.Fragment>
                                                }
                                            />
                                        </ListItem>
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
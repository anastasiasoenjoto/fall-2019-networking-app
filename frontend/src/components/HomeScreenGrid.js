import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import BkgdIm from '../frontend images/network.jpg';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';


const useStyles = makeStyles(theme => ({
    /* Container holding the image and the text */
    container: {
        position: 'relative',
        color: 'black',
        textAlign: 'center',
    },

    /* Centered text */
    centered: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    },

    company: {
        left: 0,
        bottom: 0,
        border: '1px solid red',
        width: '50%',
        float: 'left',
    },

    user: {
        right: 0,
        left: '100%',
        width: '50%',
        border: '1px solid red',
        float: 'left',
    },

    list: {
        width: '100%',
        maxWidth: 720,
        backgroundColor: theme.palette.background.paper,
      },

}));

export default function HomeScreenGrid() {

    const classes = useStyles();

    return (
        <div>
        <div className={classes.container}>
            <img src={BkgdIm} alt="Network" style={{width: '100%'}} />
            <div className={classes.centered}>
            <Typography variant="h6" color="black">
            The app allows users to be able to connect with other people in the same location with similar interest. It also allows users to search for open jobs around their city that matches their field. In addition to that it acts as a filter for companies to look for candidates that match their requirements.
            </Typography></div>
        </div>

        <div className = {classes.company} align='center'>
            <List className={classes.list}>
                <ListItem>
                    If you're a company, sign up here!
                </ListItem>
                <ListItem>
                    <Link to="../SignUpPage">
                        <Button color='primary'>Sign Up as Company</Button>
                    </Link>
                </ListItem>
            </List>

        </div>

        <div className = {classes.user} align='center'>
            <List className={classes.list}>
                <ListItem>
                    If you're a user (not representing a company), sign up here!
                </ListItem>
                <ListItem>
                    <Link to="../SignUpPage">
                    <Button color='primary'>Sign Up as User</Button>
                    </Link>
                </ListItem>
            </List>

        </div>
        </div>

    )
        
}
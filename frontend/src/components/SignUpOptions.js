import React, { Component } from 'react';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import { classes } from 'istanbul-lib-coverage';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow : 1,
        alignSelf: 'center',
        border: '2px solid black',
        height: '50%',
        width: '50%',
    },
}));

export default function HomeScreenBar() {

    const classes = useStyles();

    return (
        <div className = {classes.root} align = 'center'>
            <List>
                <ListItem button>
                    <ListItemText primary="Sign Up as User" secondary="Using own email or google account login">
                    </ListItemText>
                </ListItem>
                <ListItem button>
                    <ListItemText primary="Sign Up as User" secondary="Using own email or google account login">
                    </ListItemText>
                </ListItem>
            </List>
        </div>
    )










}
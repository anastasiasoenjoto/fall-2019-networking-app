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

var optionState = 0;

const useStyles = makeStyles(theme => ({
    root: {
        border: '2px solid black',
        height: '40%',
    },
}));

export default function SignUpBox() {

    const classes = useStyles();

    if(true) {
        return (
            <div className = {classes.root}>
                <List>
                    <ListItem>
                        <ListItemText primary = "Networking App Sign Up"></ListItemText>
                    </ListItem>

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



}
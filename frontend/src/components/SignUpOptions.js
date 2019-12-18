import React, { Component } from 'react';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router-dom';
import UserSignUp from './UserSignUp';
import CompanySignUp from './CompanySignUp';


const styles = theme => ({
    root: {
        border: '2px solid black',
        width: '40%',
    },
});


class SignUpBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            optionState: 0
        }

    }

    SignUpFactory(optionState) {

        if (optionState == 0) {
            const { classes } = this.props;
            return (
                <div className={classes.root}>
                    <List>
                        <ListItem>
                            <ListItemText primary="Networking App Sign Up"></ListItemText>
                        </ListItem>

                        <ListItem button onClick={() => this.setState({ optionState: 1 })}>
                            <ListItemText primary="Sign Up as User" secondary="Using own email or google account login">
                            </ListItemText>
                        </ListItem>
                        <ListItem button onClick={() => this.setState({ optionState: 2 })}>
                            <ListItemText primary="Sign Up as Company" secondary="Using own email or google account login">
                            </ListItemText>
                        </ListItem>
                    </List>
                </div>
            )
        }
        else if (optionState == 1) {
            return (
                <UserSignUp />
            )
        }
        else if(optionState == 2) {
            return (
                <CompanySignUp/>
            )
        }
    }

    render() {
        return(
            this.SignUpFactory(this.state.optionState)
        )
        

        

    }

}

export default withStyles(styles)(SignUpBox);;
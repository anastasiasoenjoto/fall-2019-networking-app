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
            username: '',
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            city: '',
            major: '',
            GPA: '',
            companyName: '',
            optionState: 0,
            redirectToHome: false
        }

    }

    handleChange(e) {
        this.setState({ [e.target.id] : e.target.value });
    }

    onSubmitUser(e) {
        e.preventDefault();


        const user = {
            username: this.state.username,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
            city: this.state.city,
            major: this.state.major,
            GPA: this.state.GPA
        }


        axios.post('http://localhost:3001/users/add', user)
            .then(res => console.log(res.data));

        { this.setRedirectToHome() }

    }

    onSubmitCompany(e) {
        e.preventDefault();
    
        const company = {
          username: this.state.username,
          companyName: this.state.companyName, 
          email: this.state.email,
          password: this.state.password,
          city: this.state.city, 
        }
    
        axios.post('http://localhost:3001/company/add', company)
          .then(res => console.log(res.data));
    
        { this.setRedirectToHome() }
      }

      setRedirectToHome() {
        this.setState({
          redirectToHome: true
        })
      }


    render() {

        if (this.state.redirectToHome == true) {
            return <Redirect to={{
                pathname: "/homepage",
                state: { username: this.state.username }
            }}
            />
        }

        const { classes } = this.props;

        if (this.state.optionState == 0) {
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
        else if (this.state.optionState == 1) {
            return (
                <div className={classes.root}>
                    <List>
                        <ListItem>
                            <ListItemText primary="User Sign Up"></ListItemText>
                        </ListItem>

                        <ListItem>
                            <input style={{width: "40%"}} id="firstName" type="text" value={this.state.firstName} onChange={this.handleChange.bind(this)} placeholder="Enter first name" />
                        </ListItem>
                        <ListItem>
                            <input style={{width: "40%"}} id="lastName" type="text" value={this.state.lastName} onChange={this.handleChange.bind(this)} placeholder="Enter last name" />
                        </ListItem>
                        <ListItem>
                            <input style={{width: "40%"}} id="username" type="text" value={this.state.username} onChange={this.handleChange.bind(this)} placeholder="Enter username" />
                        </ListItem>
                        <ListItem>
                            <input style={{width: "40%"}} id="password" type="password" value={this.state.password} onChange={this.handleChange.bind(this)} placeholder="Enter password" />
                        </ListItem>
                        <ListItem>
                            <input style={{width: "40%"}} id="email" type="text" value={this.state.email} onChange={this.handleChange.bind(this)} placeholder="Enter email" />
                        </ListItem>
                        <ListItem>
                            <input style={{width: "40%"}} id="city" type="text" value={this.state.city} onChange={this.handleChange.bind(this)} placeholder="Enter city" />
                        </ListItem>
                        <ListItem>
                            <input style={{width: "40%"}} id="major" type="text" value={this.state.major} onChange={this.handleChange.bind(this)} placeholder="Enter your major" />
                        </ListItem>
                        <ListItem>
                            <input style={{width: "40%"}} id="GPA" type="text" value={this.state.GPA} onChange={this.handleChange.bind(this)} placeholder="Enter your current GPA" />
                        </ListItem>
                        <ListItem>
                            <Button onClick={this.onSubmitUser.bind(this)}>Sign Up</Button>
                        </ListItem>
                    </List>
                </div>
            )
        }
        else if(this.state.optionState == 2) {
            return (
                <div className={classes.root}>
                    <List>
                        <ListItem>
                            <ListItemText primary="Company Sign Up"></ListItemText>
                        </ListItem>

                        <ListItem>
                            <input style={{width: "40%"}} id="companyName" type="text" value={this.state.companyName} onChange={this.handleChange.bind(this)} placeholder="Enter company name" />
                        </ListItem>
                        <ListItem>
                            <input style={{width: "40%"}} id="username" type="text" value={this.state.username} onChange={this.handleChange.bind(this)} placeholder="Enter username" />
                        </ListItem>
                        <ListItem>
                            <input style={{width: "40%"}} id="password" type="password" value={this.state.password} onChange={this.handleChange.bind(this)} placeholder="Enter password" />
                        </ListItem>
                        <ListItem>
                            <input style={{width: "40%"}} id="email" type="text" value={this.state.email} onChange={this.handleChange.bind(this)} placeholder="Enter email" />
                        </ListItem>
                        <ListItem>
                            <input style={{width: "40%"}} id="city" type="text" value={this.state.city} onChange={this.handleChange.bind(this)} placeholder="Enter city" />
                        </ListItem>
                        <ListItem>
                            <Button onClick={this.onSubmitCompany.bind(this)}>Sign Up</Button>
                        </ListItem>
                    </List>
                </div>
            )
        }

    }

}

export default withStyles(styles)(SignUpBox);;
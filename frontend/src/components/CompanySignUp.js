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

class CompanySignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            city: '',
            companyName: '',
            redirectToQuestions: false
        }

    }

    handleChange(e) {
        this.setState({ [e.target.id] : e.target.value });
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
    
          this.setState({
            redirectToQuestions: true
        })
       
      }

    render() {
        if (this.state.redirectToQuestions == true) {
            return <Redirect to={{
                pathname: "/jobPost",
                state: {username: this.state.username}
            }}
            />
        }

        const { classes } = this.props;

        return (
            <div className={classes.root}>
            <List>
                <ListItem>
                    <ListItemText primary="Sign Up"></ListItemText>
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

export default withStyles(styles)(CompanySignUp);;
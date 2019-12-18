import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import { classes } from 'istanbul-lib-coverage';
import { ListItem, ListItemText,List } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
      border: '2px solid black',
      width: '40%', 
      margin: 'auto'
  },
});


class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.onChangefirstName = this.onChangefirstName.bind(this);
    this.onChangelastName = this.onChangelastName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeCity = this.onChangeCity.bind(this);
    this.onChangeMajor = this.onChangeMajor.bind(this);
    this.onChangeGPA = this.onChangeGPA.bind(this);
    this.onSubmit = this.onSubmit.bind(this);



    this.state = {
      firstName: '', 
      lastName: '', 
      email: '',
      password: '', 
      city: '', 
      major: '', 
      GPA: ''

    }

  }

  componentDidMount() {
    const user = {
      username: this.props.location.state.username
    }
    axios.post('http://localhost:3001/users/getCurrentUser', user)
        .then(res => {
            console.log("CURRENT USER DETAILS", res.data.user)
            this.setState({firstName: res.data.user[0].firstName, lastName: res.data.user[0].lastName, email: res.data.user[0].email, password:res.data.user[0].password, city: res.data.user[0].city, major: res.data.user[0].major, GPA: res.data.user[0].GPA})
            console.log("Current Pending", this.state.pending)
            return res.data.user
        })
  }

  onChangefirstName(e) {
    this.setState({
      firstName: e.target.value
    })
  }

  onChangelastName(e) {
    this.setState({
      lastName: e.target.value
    })
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    })
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    })
  }
  onChangeCity(e) {
    this.setState({
      city: e.target.value
    })
  }

  onChangeMajor(e) {
    this.setState({
      major: e.target.value
    })
  }

  onChangeGPA(e) {
    this.setState({
      GPA: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();


    const user = {
      username: this.props.location.state.username,
      firstName: this.state.firstName, 
      lastName: this.state.lastName, 
      email: this.state.email,
      password: this.state.password,
      city: this.state.city, 
      major: this.state.major,
      GPA: this.state.GPA
    }
    // console.log(this.state.username)
    console.log(user)
    axios.post('http://localhost:3001/users/editProfile', user)
      .then(res => console.log(res.data));

    this.setState({
      firstName: '', 
      lastName: '', 
      email: '', 
      password: '',
      city: '', 
      major: '', 
      GPA: ''

    })


  }



  render() {

    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <List>
          <ListItem>
            <ListItemText primary="Edit Profile"></ListItemText>
          </ListItem>
            
          <ListItem>
            <input style={{width: "40%"}} id="firstName" type="text" value={this.state.firstName} onChange= {this.onChangefirstName} placeholder= {this.state.firstName}/>
          </ListItem>

          <ListItem>
            <input style={{width: "40%"}} id="lastName" type="text" value={this.state.lastName} onChange= {this.onChangelastName} placeholder={this.state.lastName}/>
          </ListItem>

          <ListItem>
            <input style={{width: "40%"}} id="email" type="email" value={this.state.email} onChange= {this.onChangeEmail} placeholder={this.state.email}/>
          </ListItem>

          <ListItem>
            <input style={{width: "40%"}} id="password" type="password" value={this.state.password} onChange= {this.onChangePassword} />
          </ListItem>

          <ListItem>
            <input style={{width: "40%"}} id="city" type="text" value={this.state.city} onChange= {this.onChangeCity} />
          </ListItem>

          <ListItem>
            <input style={{width: "40%"}} id="major" type="text" value={this.state.major} onChange= {this.onChangeMajor} />
          </ListItem>

          <ListItem>
            <input style={{width: "40%"}} id="GPA" type="text" value={this.state.GPA} onChange= {this.onChangeGPA} placeholder={this.state.GPA}/>
          </ListItem>
          <ListItem>
          <Button variant="contained" onClick={this.onSubmit}>Submit</Button>
          </ListItem>
        </List>
        
      </div> 
    )
  }
}

export default withStyles(styles)(UserProfile);;
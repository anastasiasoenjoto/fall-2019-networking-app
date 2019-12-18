import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import { ListItemText, ListItem, List } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
      border: '2px solid black',
      width: '40%'
  },
});

class CompanyProfile extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeCity = this.onChangeCity.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      companyName: this.props.location.state.companyName, 
      email: this.props.location.state.email,
      password: this.props.location.state.password, 
      city: this.props.location.state.city  
    }

  }

  componentDidMount(){
    const company = {
      username: this.props.location.state.username
    }
    axios.post('http://localhost:3001/company/getCurrentCompany', company)
    .then(res => {
        this.setState({companyName: res.data.user[0].companyName, email: res.data.user[0].email, password: res.data.user[0].password, city: res.data.user[0].city})
        return res.data.user
    })
  }

  onChangeName(e) {
    this.setState({
      companyName: e.target.value
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
  onSubmit(e) {
    e.preventDefault();
   

    const company = {
      username: this.props.location.state.username,
      companyName: this.state.companyName, 
      email: this.state.email,
      password: this.state.password,
      city: this.state.city
    }
    console.log(company)
    axios.post('http://localhost:3001/company/editProfile', company)
      .then(res => console.log(res.data));

    this.setState({
        companyName: '', 
        email: '',
        password: '', 
        city: '' 
    })
  }
  
  render() {

    const { classes } = this.props;
   
    return (
      <div className={classes.root}>
        <List>
          <ListItemText primary="Edit Profile"></ListItemText>
        
        <ListItem>
        <input style={{width: "40%"}} id="firstName" type="text" value={this.state.companyName} onChange= {this.onChangeName} placeholder= {this.props.location.state.companyName}/>
        </ListItem>
        <ListItem>
         <input style={{width: "40%"}} id="email" type="email" value={this.state.email} onChange= {this.onChangeEmail} placeholder={this.props.location.state.email}/>
        </ListItem>
        <ListItem>
        <input style={{width: "40%"}} id="password" type="password" value={this.state.password} onChange= {this.onChangePassword} />
        </ListItem>
        <ListItem>
        <input style={{width: "40%"}} id="city" type="text" value={this.state.city} onChange= {this.onChangeCity} />
        </ListItem>
        <ListItem>
          <Button variant="contained" onClick={this.onSubmit}>Submit</Button>
        </ListItem>
        </List>
      </div> 
    )
  }
}
export default withStyles(styles)(CompanyProfile);;


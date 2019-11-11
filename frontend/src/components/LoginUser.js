import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import Button from '@material-ui/core/Button'


export default class LoginUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);


    this.state = {
      username: '',
      password: ''
    }
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    })
  }
  

  onSubmit(e) {
    e.preventDefault();

    const user = {
      username: this.state.username,
      password: this.state.password
    }

    try {
      axios.get('http://localhost:3001/users/validateUser', user)
      .then(res => console.log(res.data));

    } catch (error) {
      console.log(error)
    }
    

    this.setState({
      username: '',
      password: ''
    })

  }

 

  render() {
    const lableStyle = {
      margin: '10px', 
      textAlign: 'center'
    };

    return (
      <div>
        <form id="signUpForm" onSubmit={this.onSubmit} >
          <fieldset>
          <legend className="formHeader"> Login</legend>
          <label style={lableStyle}>
            Username:  
            <input id="userName" type="text" value={this.state.username} onChange= {this.onChangeUsername} placeholder="Enter username"/>
          </label>
          <br></br>
            <label style={lableStyle}>
            Password: 
            <input id="password" type="password" value={this.state.password} onChange= {this.onChangePassword} placeholder="Enter password"/>
          </label>
          </fieldset>
          <br></br>
          <input type="submit"></input>
        {/* <Button variant="contained" color="primary"> Reset</Button> */}
        </form>
        Dont have an account? Click <a href="/user">here </a> to signup!

      </div> 
    )
  }
}
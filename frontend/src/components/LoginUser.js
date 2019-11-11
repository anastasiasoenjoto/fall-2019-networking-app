import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom'



export default class LoginUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);


    this.state = {
      username: '',
      password: '',
      redirectToHome: false
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

  setRedirectToHome() {
    this.setState({
      redirectToHome: true
    })
  }
  

  onSubmit(e) {
    e.preventDefault();

    const user = {
      username: this.state.username,
      password: this.state.password
    }

    
    axios.post('http://localhost:3001/users/validateUser', user)
      .then(res => {
        return res.data;
      })
      .then(data=> {
        return data.message;
      })
      .then(validity => {
        if (validity == "valid") {
          console.log('valid user!')
          {this.setRedirectToHome()}
        }
        else {
          console.log('invalid user')
        }
      })
      
      

   

    this.setState({
      username: '',
      password: ''
    })

  }

 

  render() {

    if (this.state.redirectToHome === true) {
      return <Redirect to="/home" />
    }

    return (
      <div>
        <form id="signUpForm" onSubmit={this.onSubmit} >
          <fieldset>
          <legend className="formHeader"> Login</legend>
          <label >
            Username:  
            <input id="userName" type="text" value={this.state.username} onChange= {this.onChangeUsername} placeholder="Enter username"/>
          </label>
          <br></br>
            <label >
            Password: 
            <input id="password" type="password" value={this.state.password} onChange= {this.onChangePassword} placeholder="Enter password"/>
          </label>
          </fieldset>
          <br></br>
          <input type="submit"></input>
        </form>
        Dont have an account? Click <a href="/user">here </a> to signup!

      </div> 
    )
  }
}
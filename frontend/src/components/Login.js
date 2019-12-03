import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom'


export default class LoginUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmitUser = this.onSubmitUser.bind(this);
    this.onSubmitCompany = this.onSubmitCompany.bind(this);


    this.state = {
      username: '',
      password: '',
      redirectToHomeUser: false,
      redirectToHomeCompany: false
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

  setRedirectToHomeUser() {
    this.setState({
      redirectToHomeUser: true
    })
  }

  setRedirectToHomeCompany() {
    this.setState({
      redirectToHomeCompany: true
    })
  }
  

  onSubmitUser(e) {
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
        {this.setRedirectToHomeUser()}
      }
      else {
        console.log('invalid user')
      }
    })

    }
  
    onSubmitCompany(e) {
      e.preventDefault();

      const company = {
        username: this.state.username,
        password: this.state.password
      }
  
  
      axios.post('http://localhost:3001/company/validateCompany', company)
        .then(res => {
          return res.data;
        })
        .then(data=> {
          return data.message;
        })
        .then(validity => {
          if (validity == "valid") {
            console.log('valid user!')
            {this.setRedirectToHomeCompany()}
          }
          else {
            console.log('invalid user')
          }
        })

  }

  render() {

    if (this.state.redirectToHomeCompany == true) {
      return <Redirect to= {{
        pathname: "/homeCompany", 
        state: {username: this.state.username}
      }}

        />
    }

    else if (this.state.redirectToHomeUser == true) {
      return <Redirect to= {{
        pathname: "/home", 
        state: {username: this.state.username}
      }}

        />
    }


    return (
      <div>
        <h1> Login </h1>
        <form id="signUpForm">
          <fieldset>
          <legend className="formHeader"> Login</legend>
          <label>
            Username:  
            <input id="userName" type="text" value={this.state.username} onChange= {this.onChangeUsername} placeholder="Enter username"/>
          </label>
          <br></br>
            <label>
            Password: 
            <input id="password" type="password" value={this.state.password} onChange= {this.onChangePassword} placeholder="Enter password"/>
          </label>
          </fieldset>
          <br></br>
          <input type="submit" value="Login User" name="userSubmit" onClick= {this.onSubmitUser}></input>
          <input type="submit" value="Login Company" name="companySubmit" onClick= {this.onSubmitCompany}></input>
        </form>
        Dont have an account? <br></br>
        Click <a href="/user">here </a> to signup as a user! <br></br>
        Click <a href="/company">here </a> to signup as a company!
      </div> 
    )
  }
}
import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom'

export default class AddFriend extends Component {
    constructor(props) {
      super(props);
  
      this.onChangeSearchUsername = this.onChangeSearchUsername.bind(this);
      this.onSubmit = this.onSubmit.bind(this);

      this.state = {
        searchUsername: '',
        directToHomeUser: false,
      }
    }

    onChangeSearchUsername(e){
        this.setState({
            searchUsername: e.target.value
        })
    }


    onSubmit(e){
        e.preventDefault();

        const friend = {
            friendName: this.state.searchUsername,
            //username: this.props.location.state.username
      
        }
        console.log("Friend:", friend)
        axios.post('http://localhost:3001/users/requestFriend', friend)
        .then(res => {
          return res.data;
        })
        .then(data=> {
          return data.message;
        })
        .then(validity => {
          if (validity == "Request has been submitted") {
            console.log('Request has been submitted')
            {this.setDirectToHomeUser()}
          }
          else {
            console.log('Sorry, no such user exists')
          }
        })
    }

    render(){
        return(
          <div>
            <h1> Add Friends Here</h1>
            <form id = "requestFriend" onSubmit = {this.onSubmit}>
              <label>
                Enter the username of the person you want to add as friend:
                <input id = "searchUsername" type = "text" value = {this.state.searchUsername} onChange = {this.onChangeSearchUsername}>
                  </input> 
              </label>
              <br></br>
              <input type='submit'></input>
            </form>

          </div>
        )
    }
}
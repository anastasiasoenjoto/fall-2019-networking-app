import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom'

export default class AddFriends extends Component {
    constructor(props) {
      super(props);
  
      this.onChangeSearchUsername = this.onChangeSearchUsername.bind(this);
      this.onSubmitRequest = this.onSubmitRequest.bind(this);

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

    setDirectToHomeUser(){
        tihs.setState({
            directToHomeUser: true
        })
    }

    onSubmitRequest(e){
        e.preventDefault();

        const friend = {
            friendName: this.state.searchUsername
        }

        axios.post('http://localhost:3001/users/validateFriend', friend)
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
        if(this.state.directToHomeUser == true){
        }
    }
}
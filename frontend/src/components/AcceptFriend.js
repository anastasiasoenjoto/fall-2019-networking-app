import React, { Component } from 'react';
import axios from 'axios';

export default class AcceptFriend extends Component {

  constructor(props){
    super(props);

    this.friendName = "ABC";
    this.onSubmit = this.onSubmit.bind(this);

  }

   onSubmit(e){
     e.preventDefault();
     const friend = e.id;

      axios.post('http://localhost:3001/acceptFriend', friend)
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
  }
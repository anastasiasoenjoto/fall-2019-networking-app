import React, { Component } from 'react';
import axios from 'axios';
import MessageList from "./MessageList.js"
import SendMessageForm from "./SendMessageForm.js"
import {withStyles} from '@material-ui/styles';
import styles from './ChatRoom.css'


const DUMMY_DATA = [
  {
    senderId: "perborgen",
    text: "who'll win?"
  },
  {
    senderId: "janedoe",
    text: "who'll win?"
  }
]

class ChatRoom extends Component {
      
  constructor() {
    super()
    this.state = {
       messages: DUMMY_DATA
    }
  }
  
  render() {
    return (
      <div className="app">
        <MessageList messages={this.state.messages}/>
        <SendMessageForm />
     </div>
    )
  }
}

export default withStyles(styles)(ChatRoom);
import React, { Component } from 'react';
import ListComments from './ListComment';
import AddComment from './AddComment';

export default class Home extends Component {

  constructor(props){
    super(props);
    const sock = new WebSocket('ws://localhost:3001/chats');
    sock.onopen = function() {
        console.log('open');
    };

    const self = this;
    sock.onmessage = function(e) {
          const message = JSON.parse(e.data);
          const dataToSend = JSON.stringify(message);
          self.setState({ comment: dataToSend });
    };

    this.state = {
      username: "anastasia",
      actions : sock,
      comment : {},
    }
  }

  render() {
    return (
      <div className="container">
        <br/>
        < AddComment { ... this.state  }/>
        < ListComments { ... this.state }/>
      </div>
    );
  }
}
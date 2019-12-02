import React, { Component } from 'react';
import axios from 'axios';

export default class AddComment extends Component {

  constructor(props){
    super(props);
   
    this.onChangeContent = this.onChangeContent.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
        content: ''
    }
  }
  
  onChangeContent(e){
      this.setState({
          content : e.target.value
      });
  }

   onSubmit(e){
     e.preventDefault();
     const comment = {
         content : this.state.content
     }

      axios.post('http://localhost:3001/chats/add', comment)
        .then(res => { 
          const json = { type: 'comment' };
          json.data = res.data;
          console.log(json);
          this.props.actions.send(JSON.stringify(json));
          this.setState({content : ''})
          
        })
        .catch(err => console.error('Failed adding comment, please try again!', { hideAfter : 5 })
        .then(() => this.setState({content : ''})));
      }

   
  render() {
    return (
      <div>
      <h3>Add a Comment</h3>
      <form onSubmit={this.onSubmit} >
          <div className="form-group">
            <textarea rows="5"
                required
                className="form-control"
                value={this.state.content}
                placeholder="Type a comment"
                onChange={this.onChangeContent}>
            </textarea>
          </div>
          <div className="form-group" align="right">
            <input type="submit"
                className="btn btn-dark"
                value="Post Comment">
            </input>
          </div>
      </form>
      </div>
    );
  }
}
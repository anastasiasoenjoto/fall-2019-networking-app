import React, { Component } from 'react';
import axios from 'axios';

class Comment extends Component {

    constructor(props){
      super(props);
      this.state = {
        publisher : ''
      }

    }
    render() {
      
      return (
        <div className="card">
          <div className="row">
            <div className="col-md-10 px-3">
              <div className="card-block px-3">
                <h5 className="card-title text-dark" style={{marginTop: '10px', 'fontWeight':'bolder'}}>{this.props.comment.user.firstName} {this.props.comment.user.lastName}</h5>
                <p className="card-text" style={{fontSize: '16px'}}>{this.props.comment.content }</p>
                <p className="text-muted" style={{fontSize: '13px'}}><img src={process.env.PUBLIC_URL + '/logos/clock.png'} style={{width: '13px', height: '13px'}} />&nbsp;&nbsp;</p>
              </div>
            </div>
          </div>
        </div>
    )

    }
   
}

export default class ListComments extends Component {

  constructor(props){
    super(props);
    this.state = { comments: [] }
  }

  componentDidMount(){
    axios.get('http://localhost:5000/api/comments/')
      .then(resp => this.setState({ comments : resp.data }))
      .catch(err => console.log(err));
  }

  componentWillReceiveProps(nextProps){
    
    const data = JSON.parse(nextProps.comment);
    console.log(data.data);
    if(data.type === "comment"){
      this.setState({ comments : [data.data, ...this.state.comments] })
    }
  } 

  commentList() {  
    return this.state.comments.map(currentcomment => {
      return <Comment comment={currentcomment} socket={this.props.actions} key={currentcomment._id}/>;
    })
  }
  render() {
    return (
      <div className="d-flex flex-column">
      <h3>Comments</h3>
        { this.commentList() }
     </div>
    );
  }
}
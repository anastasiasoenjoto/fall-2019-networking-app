import React, { Component } from 'react';


export default class UserList extends Component {


    constructor(props) {
        super(props);
        this.state = {
            users: [],
        };
    }
    
    componentDidMount() {
        fetch('http://localhost:3001/users/')
          .then(results => {
              return results.json();})
            .then(data=> {
                this.setState({users: data});
                console.log(this.state.users);
            })
        //   console.log(this.state.users);
      }
    

  render() {
    return (
        <div> 
            <h1> User List</h1>
            
        </div>
   
    );
  }
}

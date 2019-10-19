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
                let users = data.map((u) => {
                    return(
                        <div key={u.username}>
                            <h2>Name: {u.firstName} {u.lastName}</h2>
                            <p><i>{u.email}</i></p>
                            <p><i>City: {u.city}</i></p>
                            <p><b><i>Major: {u.major}</i></b></p>
                            <p><b>GPA: {u.GPA}</b></p>


                        </div>
                    )
                })
                this.setState({users: users});
            })
      }
    

  render() {
    return (
        <div> 
            <h1> User List</h1>
            {this.state.users}
            
        </div>
   
    );
  }
}

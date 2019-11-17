import React, { Component } from 'react';


export default class CompanyList extends Component {


    constructor(props) {
        super(props);
        this.state = {
            users: [],
        };
    }
    
    componentDidMount() {
        const fetch = require("node-fetch");
        fetch('http://localhost:3001/company/')
          .then(results => {
              return results.json();})
            .then(data=> {
                let users = data.map((u) => {
                    return(
                        <div key={u.username}>
                            <h2>Name: {u.companyName}</h2>
                            <p><i>{u.email}</i></p>
                            <p><i>City: {u.city}</i></p>
                            

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

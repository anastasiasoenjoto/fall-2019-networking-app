import React, { Component } from 'react';


export default class HomePage extends Component {


    constructor(props) {
        super(props);
        this.state = {
            users: [],
        };
    }
    
    componentDidMount() {
        fetch('http://localhost:3001/users/')
          .then(results => {
            const mockJSON = [{"_id":"5dab6eed9770f2600de73610","username":"testUserName5","firstName":"Lola","lastName":"Barren","email":"testUser5@gmail.com","password":"testPassword5","city":"sanFrancisco","major":"anthropology","GPA":"3.54","createdAt":"2019-10-19T20:15:41.628Z","updatedAt":"2019-10-19T20:15:41.628Z","__v":0}];
            return mockJSON;})
            .then(data=> {
                let users = data.map((u) => {
                    return(
                        <div key={u.username}>
                            <h2><b><i>Welcome, {u.firstName} {u.lastName}</i></b></h2>


                        </div>
                    )
                })
                this.setState({users: users});
            })
      }
    

  render() {
    return (
        <div> 
            <h1> HomePage</h1>
            {this.state.users}
            <h3>What do you want to do today? </h3>
            
        </div>
   
    );
  }
}

import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


import './HomePage.css';


export default class HomePage extends Component {


    constructor(props) {
        super(props);
        this.state = {
            firstName: '', 
            lastName: '', 
            userName: '',
            password:'',
            GPA: '', 
            email: '', 
            city: '', 
            major: ''

            
        };
    }
    
    componentDidMount() {
        console.log(this.props.location.state.username)
        const user = {
            username: this.props.location.state.username
        }
        axios.post('http://localhost:3001/users/getCurrentUser', user)
        .then(res => {
            console.log(res.data)
            return res.data.user
        })
        .then(data => {
            let users = data.map((u) => {
                this.setState({firstName: u.firstName, lastName: u.lastName, username: u.userName, password: u.password, GPA:u.GPA, email: u.email, city: u.city, major: u.major})
                return(
                    <div key={u.username}>
                        <h2><b><i>Welcome, {u.firstName} {u.lastName}</i></b></h2>
                    </div>
                )
                
            })
        })
        
      }
    

  render() {
    return (
        <div> 
             <h1 id="homePageTitle"> HomePage</h1>
            <aside> 
                <nav>
                    <ul> 
                        <li> <Link to={{
                            pathname: "/userProfile", 
                            state: {
                                firstName: this.state.firstName, 
                                lastName: this.state.lastName, 
                                password: this.state.password,
                                GPA: this.state.GPA, 
                                email: this.state.email, 
                                city: this.state.city, 
                                major: this.state.major, 
                                username: this.props.location.state.username
                            }
                            }}>Profile</Link></li>
                        <li> <a href=""> Message History</a></li>
                        <li> <a href=""> Messaging</a></li>
                    </ul>
                </nav>
            </aside>



            <div id="mainContent">
                {this.state.users}
                <h3>What do you want to do today? </h3>
                <nav> 
                    <ul id="optionList">
                        <li className="userModeOption"> <a  href="">Network </a> </li>
                        <li className="userModeOption"><a  href="">Job Search</a></li>

                    </ul>
                </nav>

                <div id="recommended">
                    <h2> <u>Recommended </u></h2> 

                </div>
                <div id="all"> 
                <h2> <u>All </u></h2> 


                </div>

            </div>

            
        </div>
   
    );
  }
}

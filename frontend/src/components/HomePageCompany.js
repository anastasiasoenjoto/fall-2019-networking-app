import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';



export default class HomePageCompany extends Component {


    constructor(props) {
        super(props);
        this.state = {
            // companies: [],
            companyName: '', 
            password:'',
            email: '', 
            city: '', 
            userName: '',
        };
    }

    componentDidMount() {
        console.log(this.props.location.state.username)
        const company = {
            username: this.props.location.state.username
        }
        axios.post('http://localhost:3001/company/getCurrentCompany', company)
        .then(res => {
            return res.data.user
        })
        .then(data => {
            let companies = data.map((u) => {
                this.setState({companyName: u.companyName, userName: u.userName, password: u.password, email: u.email, city: u.city})
                return(
                    <div key={u.username}>
                        <h2><b><i>Welcome, {u.companyName}</i></b></h2>
                    </div>
                )
            })
            // this.setState({companies: companies})
        })
    }


  render() {
    return (
        <div> 
            <h1> HomePage</h1>
            <aside> 
                <nav>
                    <ul> 
                        <li> <Link to={{
                            pathname: "/companyProfile", 
                            state: {
                                companyName: this.state.companyName, 
                                password: this.state.password,
                                email: this.state.email, 
                                city: this.state.city, 
                                username: this.props.location.state.username
                            }
                            }}>Profile</Link></li>
                    </ul>
                </nav>
            </aside>
            {this.state.companies}
            <h3>Here are these weeks top applicants</h3>

        </div>

    );
  }
}


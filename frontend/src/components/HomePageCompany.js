import React, { Component } from 'react';
import axios from 'axios';



export default class HomePageCompany extends Component {


    constructor(props) {
        super(props);
        this.state = {
            companies: [],
        };
    }

    componentDidMount() {
        console.log(this.props.location.state)
        const company = {
            username: this.props.location.state
        }
        axios.post('http://localhost:3001/company/getCurrentCompany', company)
        .then(res => {
            return res.data.user
        })
        .then(data => {
            let companies = data.map((u) => {
                return(
                    <div key={u.username}>
                        <h2><b><i>Welcome, {u.companyName}</i></b></h2>
                    </div>
                )
            })
            this.setState({companies: companies})
        })
    }


  render() {
    return (
        <div> 
            <h1> HomePage</h1>
            {this.state.companies}
            <h3>Here are these weeks top applicants</h3>

        </div>

    );
  }
}
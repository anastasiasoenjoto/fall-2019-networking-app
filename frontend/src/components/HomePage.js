import React, { Component } from 'react';
import axios from 'axios';
import LoggedInNavBar from './LoggedInNavBar';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Paper from '@material-ui/core/Paper';
import './HomePage.css';


export default class HomePage extends Component {


    constructor(props) {
        super(props);
        this.state = {
            users: [],
        };
    }

    /* componentDidMount() {
        console.log(this.props.location.state.username)
        const user = {
            username: this.props.location.state.username
        }
        axios.post('http://localhost:3001/users/getCurrentUser', user)
        .then(res => {
            return res.data.user
        })
        .then(data => {
            let users = data.map((u) => {
                return(
                    <div key={u.username}>
                        <h2><b><i>Welcome, {u.firstName} {u.lastName}</i></b></h2>
                    </div>
                )
            })
            this.setState({users: users})
        })
      } */


    render() {
        return (
            <div>
                <div>
                    <LoggedInNavBar />
                </div>



                <div id="mainContent">
                    <Grid container spacing={1}>
                        <Grid container item xs={12} spacing={3}>
                            <Grid item xs={4}>
                                <Paper>item</Paper>
                            </Grid>
                            <Grid item xs={4}>
                                <Paper>item</Paper>
                            </Grid>
                            <Grid item xs={4}>
                                <Paper>item</Paper>
                            </Grid>
                        </Grid>
                        <Grid container item xs={12} spacing={3}>

                        </Grid>
                    </Grid>
                </div>


            </div>

        );
    }
}

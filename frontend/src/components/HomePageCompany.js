import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import LoggedInNavBar from './LoggedInNavBar'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    grid: {
        margin: 0,
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
    },
    item: {
        flex: 1
    }
});



class HomePageCompany extends Component {


    constructor(props) {
        super(props);
        this.state = {
            // companies: [],
            companyName: '',
            password: '',
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
        // .then(data => {
        //     let companies = data.map((u) => {
        //         this.setState({companyName: u.companyName, userName: u.userName, password: u.password, email: u.email, city: u.city})
        //         return(
        //             <div key={u.username}>
        //                 <h2><b><i>Welcome, {u.companyName}</i></b></h2>
        //             </div>
        //         )
        //     })
        //     // this.setState({companies: companies})
        // })
    } 


    render() {

        const { classes } = this.props;

        return (
            <div>
                <LoggedInNavBar typeuser={1} username={this.props.location.state.username}/>
                <Grid container className={classes.grid}>
                    <Grid item xs={3}></Grid>
                    <Grid item xs={6}>
                        <Typography variant='h3'>Top Applicants</Typography>
                        <ExpansionPanel>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="this week"
                                id="this week header"
                            >
                                <Typography variant='h4'>This Week</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <ListItem className={classes.item}>
                                    <Typography variant='h5'>Anastasia</Typography>
                                    <Grid container alignItems="flex-start" justify="flex-end" direction="row">
                                        <Button variant="contained">View Profile</Button>
                                    </Grid>
                                </ListItem>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        <ExpansionPanel>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="last week"
                                id="last week header"
                            >
                                <Typography variant='h4'>Last Ago</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <ListItem className={classes.item}>
                                    <Typography variant='h5'>William</Typography>
                                    <Grid container alignItems="flex-start" justify="flex-end" direction="row">
                                        <Button variant="contained">View Profile</Button>
                                    </Grid>
                                </ListItem>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        <ExpansionPanel disabled>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="2 weeks ago"
                                id="2 weeks ago header"
                            >
                                <Typography variant='h4'>2 Weeks Ago</Typography>
                            </ExpansionPanelSummary>
                        </ExpansionPanel>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(HomePageCompany);;
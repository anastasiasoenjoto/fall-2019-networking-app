import React, { Component } from 'react';
import axios from 'axios';
import LoggedInNavBar from './LoggedInNavBar';
import { withStyles, useTheme } from '@material-ui/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper'
import { Typography } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
  formControl: {
    margin: 10,
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  paper: {
    padding: 1,
    textAlign: 'center',
  },
  root: {
    flexGrow: 1
  },
  list: {
    width: '100%',
    backgroundColor: 'white',
  },
  inline: {
    display: 'inline',
  },
});


class displayJobs extends Component {
  constructor(props) {
    super(props);
    this.onChangenameOfOpenPosition = this.onChangenameOfOpenPosition.bind(this);
    this.onChangegpaRequirement = this.onChangegpaRequirement.bind(this);
    this.onChangeworkLocation = this.onChangeworkLocation.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      nameofOpenPosition: '',
      gpaRequirement: '', 
      workLocation: '',
      jobs: [],
    }
  }

  onChangenameOfOpenPosition(e) {
    this.setState({
        nameOfOpenPosition: e.target.value
    })
  }

  onChangegpaRequirement(e) {
    this.setState({
      gpaRequirement: e.target.value
    })
  }

  onChangeworkLocation(e) {
    this.setState({
      workLocation: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const displayJobs = {
      nameOfOpenPosition: this.state.nameOfOpenPosition,
      workLocation: this.state.workLocation, 
      gpaRequirement: this.state.gpaRequirement,
    }
    axios.post('http://localhost:3001/jobs/queryJobs', displayJobs)
    .then(res => {
      console.log(res.data.jobs);
      return res.data.jobs
    })
    .then(data=> {
            let jobs = data.map((u) => {
                return(
                    <div key={u.companyUsername}>
                        <h4> {u.companyUsername} </h4>
                        <h6> City : {u.jobLocation} </h6>
                        <p><i>GPA Requirement: {u.gpaReq}</i></p>

                    </div>
                )
            })
            this.setState({jobs: jobs});
        })

    this.state = {
      nameOfOpenPosition: displayJobs.nameOfOpenPosition,
      gpaRequirement: displayJobs.gpaRequirement, 
      workLocation: displayJobs.workLocation,
      jobs: []
    }

  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
      <LoggedInNavBar  username={this.props.location.state.username} />
      <Grid container spacing={1} justify="center"></Grid>
      <Grid container item xs={12} spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.paper} elevation={0}><Typography variant='h4'>Job Search Options</Typography></Paper>
            </Grid>
          </Grid>
           {this.state.jobs}
          <form onSubmit={this.onSubmit}>
        <Grid container item xs={9} spacing={1}>
        <Grid item xs={3}>
          <br></br>
          <FormControl className={classes.formControl}>
            <input id="jobtitle" type="text" value={this.state.nameOfOpenPosition} onChange= {this.onChangenameOfOpenPosition} placeholder="Job Title"/>
            </FormControl>
        </Grid>
        <Grid container item xs={9} spacing={1}>
            <Grid item xs={3}>
            <br></br>
              <FormControl className={classes.formControl}>
              <input id="City" type="text" value={this.state.workLocation} onChange= {this.onChangeworkLocation} placeholder="Enter City"/>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <br></br>
              <FormControl className={classes.formControl}>
              <input id="GPA" type="text" value={this.state.gpaRequirement} onChange= {this.onChangegpaRequirement} placeholder="Enter GPA"/>
              </FormControl>
            </Grid>   
            <Grid item xs={3}>
              <br></br>
              <FormControl className={classes.formControl}>
              <input type="submit"></input>
              </FormControl>
            </Grid>     
        </Grid>
        </Grid>

        </form>

      </div> 
    )
  }
}

export default withStyles(styles)(displayJobs);
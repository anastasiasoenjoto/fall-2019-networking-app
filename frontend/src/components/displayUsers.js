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
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import anon from '../frontend images/anon.png';


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


class displayUsers extends Component {
  constructor(props) {
    super(props);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeMajor = this.onChangeMajor.bind(this);
    this.onChangeGPA = this.onChangeGPA.bind(this);
    this.onChangeCity = this.onChangeCity.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      major: '', 
      GPA: '', 
      city: '',
      users: [],
      cities: [],
      majors: [],
    }
  }

  cityOptions = [
    'Los Angeles',
    'San Francisco',
    'Albany',
    'New York'
  ];

  majorOptions = [
    'Anthropology',
    'Business Management',
    'Computer Science',
    'Data Science'
  ];
  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }
  onChangeMajor(e) {
    this.setState({
      majors: e.target.value
    })
  }

  onChangeGPA(e) {
    this.setState({
      GPA: e.target.value
    })
  }

  onChangeCity(e) {
    this.setState({
      cities: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const displayUsers = {
      username: this.state.username,
      city: this.state.city, 
      major: this.state.major,
      GPA: this.state.GPA,
    }
    axios.post('http://localhost:3001/users/queryUsers', displayUsers)
      .then(res => {
        console.log(res.data.users);
        return res.data.users
      })
      .then(data => {
        let users = data.map((u) => {
          return (
            <div key={u.username}>
              <h4>Name: {u.firstName} {u.lastName}</h4>
              <p><i>Email: {u.email}</i></p>

            </div>
          )
        })
        this.setState({ users: users });
      })

    this.state = {
      username: displayUsers.username,
      major: displayUsers.major, 
      GPA: displayUsers.GPA, 
      city: displayUsers.city,
      users: []
    }

  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
      <LoggedInNavBar />
      <Grid container spacing={1} justify="center"></Grid>
      <Grid container item xs={12} spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.paper}><Typography variant='h4'>User Search Options</Typography></Paper>
            </Grid>
          </Grid>
           {this.state.users}
          <form onSubmit={this.onSubmit}>
        <Grid container item xs={9} spacing={1}>
        <Grid item xs={3}>
          <br></br>
            <input id="Username" type="text" value={this.state.username} onChange= {this.onChangeUsername} placeholder="Search Username"/>
        </Grid>
        <Grid container item xs={9} spacing={1}>
            <Grid item xs={3}>
              <FormControl className={classes.formControl}>
                <InputLabel id="select-city">City</InputLabel>
                <Select
                  labelId="select-city-label"
                  id="city-box"
                  multiple
                  value={this.state.cities}
                  onChange={this.onChangeCity}
                  input={<Input />}
                  renderValue={selected => selected.join(', ')}
                // MenuProps={MenuProps}
                >
                  {this.cityOptions.map(city => (
                    <MenuItem key={city} value={city}>
                      <Checkbox checked={this.state.cities.indexOf(city) > -1} />
                      <ListItemText primary={city} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <FormControl className={classes.formControl}>
                <InputLabel id="select-major">Majors</InputLabel>
                <Select
                  labelId="select-major-label"
                  id="majors-box"
                  multiple
                  value={this.state.majors}
                  onChange={this.onChangeMajor}
                  input={<Input />}
                  renderValue={selected => selected.join(', ')}
                // MenuProps={MenuProps}
                >
                  {this.majorOptions.map(major => (
                    <MenuItem key={major} value={major}>
                      <Checkbox checked={this.state.majors.indexOf(major) > -1} />
                      <ListItemText primary={major} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <br></br>
              <FormControl className={classes.formControl}>
              <input id="GPA" type="text" value={this.state.GPA} onChange= {this.onChangeGPA} placeholder="Enter GPA"/>
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

export default withStyles(styles)(displayUsers);
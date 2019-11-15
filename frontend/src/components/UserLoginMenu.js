import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import axios from 'axios';

var usern = '';
var pw = '';

const StyledMenu = withStyles({
    paper: {
      border: '1px solid #d3d4d5',
    },
  })(props => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      {...props}
    />
  ));

  function onSubmitUser(e) {
    e.preventDefault();

    const user = {
      username: this.state.usern,
      password: this.state.pw
    }


    axios.post('http://localhost:3001/users/validateUser', user)
    .then(res => {
      return res.data;
    })
    .then(data=> {
      return data.message;
    })
    .then(validity => {
      if (validity == "valid") {
        console.log('valid user!')
        {this.setRedirectToHomeUser()}
      }
      else {
        console.log('invalid user')
      }
    })


      usern = '';
      pw = '';
  
    }
  
    function onSubmitCompany(e) {
      e.preventDefault();

      const company = {
        username: usern,
        password: pw
      }
  
  
      axios.post('http://localhost:3001/company/validateCompany', company)
        .then(res => {
          return res.data;
        })
        .then(data=> {
          return data.message;
        })
        .then(validity => {
          if (validity == "valid") {
            console.log('valid user!')
            {this.setRedirectToHomeCompany()}
          }
          else {
            console.log('invalid user')
          }
        })

      usern = '';
      pw = '';
  }

  const StyledMenuItem = withStyles(theme => ({
    root: {
      '&:focus': {
        backgroundColor: theme.palette.primary.main,
        '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
          color: theme.palette.common.white,
        },
      },
    },
  }))(MenuItem);


  export default function LoginMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);
  
    const handleClick = event => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

  
    return (
      <div>
        <Button
          aria-controls="login-menu"
          aria-haspopup="true"
          variant="contained"
          color="primary"
          onClick={handleClick}
        >
          Login
        </Button>
        <StyledMenu
          id="login-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >

        <ListItem>
            <label>
            Username:
            <input id="userName" type="text" value={usern} placeholder="Enter username"/>
            </label>
        </ListItem>

        <ListItem>
            <label>
            Password:
            <input id="password" type="password" value={pw} placeholder="Enter password"/>
            </label>
        </ListItem>

        <ListItem>
          <Button>Forgot Username or Password?</Button>
        </ListItem>

        <ListItem>
          <Button onClick="onSubmitUser()">Log In as User</Button>
          <Button onClick="onSubmitComapny()">Log In as Company</Button>
        </ListItem>
        

        </StyledMenu>
      </div>
    );
  }
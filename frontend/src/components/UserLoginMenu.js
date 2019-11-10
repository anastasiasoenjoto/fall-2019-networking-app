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

  function onSubmit(e) {
    e.preventDefault();

    const user = {
      username: usern,
      password: pw
    }


    axios.post('', user)
      .then(res => console.log(res.data));

    
    usern = '';
    pw = '';

  }


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

        <Button>Forgot Username or Password?</Button>

        <Button onClick="onSubmit()" >Log In</Button>


        </StyledMenu>
      </div>
    );
  }
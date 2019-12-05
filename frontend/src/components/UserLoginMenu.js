import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItem from '@material-ui/core/ListItem';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import SignUp from '../SignUpPage';
import { Link } from 'react-router-dom';


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




  export default function LoginMenu(props) {


    const onSubmitUser = event => {

  
      if(userName === '' || password === '') {
        return;
      }
  
      const user = {
        username: userName,
        password: password
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
          console.log('valid user!');
          setHomeUser(true);
        }
        else {
          alert('invalid login')
          console.log('invalid user')
        }
      })
  
    
      }
    
      const onSubmitCompany = event => {
        
  
        if(userName === '' || password === '') {
          return;
        }
  
        const company = {
          username: userName,
          password: password
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
              console.log('valid user!');
              setHomeCompany(true);
            }
            else {
              alert('invalid login')
              console.log('invalid user')
            }
          })


  
    }

    const [anchorEl, setAnchorEl] = React.useState(null);

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const [toHomeUser, setHomeUser] = useState(false);
    const [toHomeCompany, setHomeCompany] = useState(false);

    const handleClick = event => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    return (

      <>
      {toHomeUser ? <Redirect to={{
                pathname: "/HomePage",
                state: { username: userName, password: password }
            }}/> : null}
      {toHomeCompany ? <Redirect to={{
                pathname: "/HomePageCompany",
                state: { username: userName, password: password }
            }}/> : null}

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
            <input id="userN" type="text" value={userName} placeholder="Enter username" onChange={e => setUserName(e.target.value)}/>
            </label>
        </ListItem>

        <ListItem>
            <label>
            Password:
            <input id="pw" type="password" placeholder="Enter password" onChange={e => setPassword(e.target.value)}/>
            </label>
        </ListItem>

        <ListItem>
          <Button>Forgot Username or Password?</Button>
        </ListItem>

        <ListItem>
          <Button onClick={onSubmitUser}>Log In as User</Button>
          <Button onClick={onSubmitCompany}>Log In as Company</Button>
        </ListItem>
        <ListItem>
          &nbsp;Dont have an account yet? <Link to="../SignUpPage"> &nbsp;Sign Up</Link>
        </ListItem>
        

        </StyledMenu>
      </div>
      </>
    );
  }
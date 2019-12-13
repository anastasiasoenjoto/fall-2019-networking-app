import React from 'react';
import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import { fade, makeStyles, withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 200,
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    grow: {
        flexGrow: 1,
    },
}));

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

export default function LoggedInNavBar(props) {
    
    //@Jianyi to get username of current user, just use props.username. If this doesn't work, let me know lol
    const friend = {
        username: props.username,
        //friendname: 
    }

    const user = props.username;

    const pendingarray = props.pending;

    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);

    const [anchorEl2, setAnchorEl2] = React.useState(null);
    
    const pendingRequests = props.pending || [];

    //console.log("Pending Array Navbar", pendingRequests)

    axios.post('http://localhost:3001/users/getCurrentUser', user)
    .then(res => {
       return res.data.user[0].pending
     })


    const menuId = 'profile-menu';
    const notifID = 'notif-menu';

    const isMenuOpen = Boolean(anchorEl);

    const isNotifOpen = Boolean(anchorEl2);

    const handleProfileMenuOpen = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleNotifMenuOpen = event => {
        setAnchorEl2(event.currentTarget);
    };

    const handleNotifMenuClose = () => {
        setAnchorEl2(null);
    };

    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <Link to={{pathname: "/displayUsers", className:"nav-link", state: {username: this.props.username}}}><MenuItem>Edit Profile</MenuItem></Link>
            <MenuItem onClick={handleMenuClose}><Link to="../" style={{ textDecoration: 'none', color: 'Black' }}>Sign Out</Link></MenuItem>
            
        </Menu>
    );

    //Add your code to these 2 functions. You can access the username of the request through event.value.

    const handleAcceptRequest = event => {
        const friend = {
            username: props.username,
            friendname: event.currentTarget.value
        }
        console.log("approving: " + friend.username);
        console.log("approved: " + friend.friendname);
        axios.post('http://localhost:3001/users/approveFriend', friend)
        .then(res => {
            return res.data;
          })
          .then(data=> {
            console.log(data.message);
          })
          .then(validity => {
            if (validity == "Request has been submitted") {
              console.log('Request has been submitted')
              {this.setDirectToHomeUser()}
            }
            else {
              console.log('Sorry, no such user exists')
            }
          })
        console.log("after approving func");
    };

    const handleRejectRequest = event => {
        const rejecter = {
            username: props.username,
            friendname: event.currentTarget.value
        }
        axios.post('http://localhost:3001/users/rejectFriend', rejecter)
    };



        const notifMenu= (
            <StyledMenu
                anchorEl={anchorEl2}
                // anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                keepMounted
                // transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                id={notifID}
                open={isNotifOpen}
                onClose={handleNotifMenuClose}
            >
                <List>
    
                    {pendingRequests.map((req) => (
                        <ListItem button alignItems="flex-start">
                        <ListItemText
                            primary={
                                <React.Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        className={classes.inline}
                                        color="textPrimary"
                                    >
                                       {req} has sent you a friend request.     
                                    </Typography>
                                    <Button value={req} onClick={handleAcceptRequest}>Accept</Button>
                                    <Button value={req} onClick={handleRejectRequest}>Reject</Button>
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                    ))
                    }
                    
                    
    
                </List>
            </StyledMenu>
        );




    return (
        <div className={classes.grow}>
            <AppBar position="static">
                <Toolbar>
                    <Button>
                        <Typography className={classes.title} variant="h6" noWrap>
                            Networking App
                    </Typography>
                    </Button>

                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                            defaultValue={"Hi, " + props.username}
                        />
                    </div>
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        <Button> <Link to="/displayUsers" style={{ textDecoration: 'none', color: 'Black' }}>Search Users</Link> </Button>
                        <Button> <Link to="/displayJobs" style={{ textDecoration: 'none', color: 'Black' }}>Search Jobs </Link></Button>
                        <IconButton aria-label="show 4 new mails" color="inherit">
                            <Badge badgeContent={4} color="secondary">
                                <MailIcon />
                            </Badge>
                        </IconButton>
                        <IconButton aria-label="show new notifications"
                            color="inherit"
                            edge="end"
                            aria-haspopup="true"
                            aria-controls={notifID}
                            color="inherit"
                            onClick={handleNotifMenuOpen}>
                            <Badge badgeContent={pendingRequests.length} color="secondary">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            edge="end"
                            aria-label="edit account"
                            aria-haspopup="true"
                            aria-controls={menuId}
                            color="inherit"
                            onClick={handleProfileMenuOpen}
                        >
                            <AccountCircle />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {renderMenu}
            {notifMenu}
        </div>
    )

}
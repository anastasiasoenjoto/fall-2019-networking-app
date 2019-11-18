import React, { Component } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/Inbox';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroungColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4),
            },
        }));

export default class HomePageCompany extends Component {

    constructor(props) {
        super(props);
        this.state = {
            companies: [],
        };
    }

    NestedList(){
        const classes = useStyles();
        const [open, setOpen] = React.useState(true);

        const handleClick = () => {
            setOpen(!open);
        };

        return(
            <div>
                <List 
            component = "nav"
            aria-labelledby = "nested-list-subheader"
            subheader = {
                <ListSubheader component = "div" id = "nested-list-subheader">
                    Here are these weeks top applicants
                </ListSubheader>
            }
            className = {classes.root}>
                <ListItem button onClick = {handleClick}>
                    <ListItemIcon>
                        <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary = "Job Posting 1"/>
                    {open? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in = {open} timeout = "auto" unmountOnExit>
                    <List component = "div" disablePadding>
                        <ListItem button className =  {classes.nested}>
                            <ListItemIcon>
                                <StarBorder/>
                            </ListItemIcon>
                            <ListItemText primary = "Debbie White">
                            </ListItemText>
                            <ListItemIcon>
                                <StarBorder/>
                            </ListItemIcon>
                            <ListItemText primary = "Allen Thunder">
                            </ListItemText>
                            <ListItemIcon>
                                <StarBorder/>
                            </ListItemIcon>
                            <ListItemText primary = "Smith Goldberg">
                            </ListItemText>
                        </ListItem>
                    </List>
                </Collapse>
                </List>
            </div>
        )
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
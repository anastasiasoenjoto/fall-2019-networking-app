import React from 'react';
import AppBar from '@material-ui/core/AppBar'
import ToolBar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { classes } from 'istanbul-lib-coverage';
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { mergeClasses } from '@material-ui/styles';
import LoginMenu from './UserLoginMenu';


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    pageTitle: {
        flexGrow: 1,
    },
}));

export default function HomeScreenBar(props) {

    const classes = useStyles();


    return (
        <div className={classes.root}>
            <AppBar position="static">
                <ToolBar variant="title" color="inherit">
                    <Typography variant="h5" className={classes.pageTitle}>
                        Networking App
                    </Typography>
                    <LoginMenu props={props}></LoginMenu>
                </ToolBar>
            </AppBar>
        </div>
    )

}


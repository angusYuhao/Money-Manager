import React from 'react';
import { Typography, 
    Grid,
    Paper,
    AppBar,
    Toolbar,
    Button,
    Drawer,
    withStyles, 
    createMuiTheme,
    Tab,
    Tabs,
    Avatar,
    ThemeProvider, 
    List,
    Dialog,
    DialogTitle,
    Divider,
    ButtonGroup} from '@material-ui/core';
import { deepPurple } from '@material-ui/core/colors';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
const useStyles = theme => ({
    resourcesTitle: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(3),
    }
})

const theme = createMuiTheme({
    palette: {
        primary: {
            main: deepPurple[800],
        },
        secondary: {
            main: deepPurple[100],
        }
    },
    typography: {
        fontFamily: [
            'Poppins',
            'sans-serif',
        ].join(','),
    },
});

class Resources extends React.Component {
    render() {
        const { classes, handleLogOut, loggedIn, user, app } = this.props;
        return (
            <ThemeProvider theme={theme}>
                <div className={classes.root}>
                    <Typography variant="h6" className={classes.resourcesTitle} >
                        External resources about financing
                    </Typography>
                </div>
            </ThemeProvider>

        )
    }
}

export default withStyles(useStyles)(Resources);
import React from 'react';
import { AppBar, Tab, Tabs } from '@material-ui/core';
import { Link } from 'react-router-dom';
import {
  withStyles,
  Toolbar,
  Typography,
  Avatar,
  createMuiTheme,
  ThemeProvider
} from '@material-ui/core';
import { deepPurple } from '@material-ui/core/colors';

const useStyles = theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    cursor: 'pointer',
  },
  tabs: {
    marginLeft: theme.spacing(3),
  },
  signInButton: {
    float: 'right',
    marginRight: 10,
  },
  logInButton: {
    float: 'right',
    margin: 10,
  },
  username: {
    marginLeft: theme.spacing(80),
  },
  avatar: {
    marginLeft: theme.spacing(2),
    backgroundColor: deepPurple[800],
  },
  removeLine: {
    textDecoration: 'none',
    color: 'black'
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

class NavBar extends React.Component {

  render() {
    const { classes, username, password } = this.props;
    const firstLetter = username.charAt(0).toUpperCase();

    return (
      <ThemeProvider theme={theme}>
        <div className={classes.root}>
          <AppBar position="sticky" color="secondary">
            <Toolbar>
              <Link to={'/'} className={classes.removeLine}>
                <Typography variant="h6" className={classes.title}>
                  Money Manager
                </Typography>
              </Link>

              <Tabs inkBarStyle={{ background: 'black' }} centered>

                <Link to={'/spendings'} className={classes.tabs, classes.removeLine}>
                  <Tab label="Spendings" />
                </Link>

                <Link to={'/investments'} className={classes.tabs, classes.removeLine}>
                  <Tab label="Investments" />
                </Link>

                <Link to={'/community'} className={classes.tabs, classes.removeLine}>
                  <Tab label="Community" />
                </Link>

              </Tabs>

              <Typography variant="subtitle1" className={classes.username}>
                {username}
              </Typography>

              <Link to={'/profile'}>
                <Avatar className={classes.avatar}>{firstLetter}</Avatar>
              </Link>

            </Toolbar>
          </AppBar>
        </div>
      </ThemeProvider>

    )

  }

}

export default withStyles(useStyles)(NavBar);
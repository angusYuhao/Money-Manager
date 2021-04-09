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
import { Autocomplete } from '@material-ui/lab';

const useStyles = theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    cursor: 'pointer',
    width: '180px',
  },
  tabs: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    width: '150px',
  },
  username: {
    marginLeft: theme.spacing(60),
  },
  avatar: {
    marginLeft: theme.spacing(2),
    backgroundColor: deepPurple[800],
  },
  removeLine: {
    textDecoration: 'none',
    color: 'black'
  },
  appbar: {
    zIndex: theme.zIndex.drawer + 1,
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
          <AppBar position="sticky" color="secondary" className={ classes.appbar }>
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

                <Link to={'/resources'} className={classes.tabs, classes.removeLine}>
                  <Tab label="Resources" />
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
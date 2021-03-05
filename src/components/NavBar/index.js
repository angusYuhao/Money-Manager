import React from 'react';
import { AppBar, Tab, Tabs } from '@material-ui/core';
import { Link } from 'react-router-dom';

import { withStyles, 
         Toolbar, 
         Typography,
         Button,
         createMuiTheme,
         ThemeProvider} from '@material-ui/core';
import { deepPurple, green } from '@material-ui/core/colors';

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
    const { classes } = this.props;
  
    return (
      <ThemeProvider theme={theme}>
        <div className={classes.root}>
          <AppBar position="sticky" color="secondary">
            <Toolbar>
            <Link to={'/'} style={{ textDecoration: 'none', color: 'black' }}>
              <Typography variant="h6" className={classes.title}>
                Money Manager
              </Typography>
              </Link>

              <Tabs inkBarStyle={{background: 'black'}} centered>
                
                  <Link to={'/spendings'} style={{ textDecoration: 'none', color: 'black' }} className={classes.tabs}>
                      <Tab label="Spendings"/>
                  </Link>

                  <Link to={'/investments'} style={{ textDecoration: 'none', color: 'black' }} className={classes.tabs}>
                      <Tab label="Investments"/>
                  </Link>
                  
                  <Link to={'/community'} style={{ textDecoration: 'none', color: 'black' }} className={classes.tabs}>
                      <Tab label="Community"/>
                  </Link>

              </Tabs>
            </Toolbar>
          </AppBar>
        </div>
      </ThemeProvider>

    )

  }

}

export default withStyles(useStyles)(NavBar);
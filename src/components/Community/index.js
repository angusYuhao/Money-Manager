import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import { deepPurple, grey } from '@material-ui/core/colors';
import { withStyles } from "@material-ui/core/styles";
// import './index.css';

import ForumList from "./forumList.js"
import Login from "../Login/login.js"

const useStyles = theme => ({
  root: {
    backgroundColor: "red"
  }
});

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


class Community extends React.Component {


  render() {
    const { classes, username } = this.props
    return (
      <ThemeProvider theme={ theme }>
        <ForumList className={ classes.root }
                   username={ username }/>
      </ThemeProvider>
    )
  }
}

export default withStyles(useStyles)(Community);

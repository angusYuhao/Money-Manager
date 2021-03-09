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

  state = {
    tempFAInfo: [
      {FAName: "Angus Wang",
        FAIntro: "I am Angus Wang. I am here to guide you to treasures you'll never find yourself. Bow down to me you mere mortal",
        FAFields: ["Stocks", "Budget Planning", "Life Hacks"],
        FAPoints: 123,
      },
      {FAName: "Angela Merkel",
        FAIntro: "I am Angela Merkel, the chancellor of Germany. Bow down to me you mere mortal",
        FAFields: ["Politics", "Nation Building"],
        FAPoints: 456,
      },
      {FAName: "dragonslayer420",
        FAIntro: "I am dragonslayer420, the slayer of 420 dragons. I am here to teach you the way of dragonslaying. Bow down to me you mere mortal",
        FAFields: ["Dragon Slaying"],
        FAPoints: 789,
      }
    ],
    userInfo: {
      username: "",
      usertype: "",
      userUpvotedPosts: [],
      userDownvotedPosts: [],
      userFollows: [],
    },
  }

  constructor(props) {
    super(props)

    this.userInfoUpdater = this.userInfoUpdater.bind(this)
  }

  componentDidMount() {
    let usertype = ""
    if (this.props.usertype === "Financial Advisor") usertype = "FA"
    else usertype = "RU"

    const newUserInfo = {
      username: this.props.username,
      usertype: usertype,
      userUpvotedPosts: [],
      userDownvotedPosts: [],
      userFollows: [],
    }

    this.setState({ userInfo: newUserInfo })
  }

  userInfoUpdater(newUserInfo) {
    this.setState({ userInfo: newUserInfo })
  }


  render() {
    const { classes, username, usertype } = this.props
    return (
      <ThemeProvider theme={ theme }>
        <ForumList className={ classes.root }
                   userInfo={ this.state.userInfo }
                   userInfoUpdater={ this.userInfoUpdater }/>
      </ThemeProvider>
    )
  }
}

export default withStyles(useStyles)(Community);

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import { deepPurple, grey } from '@material-ui/core/colors';
import { withStyles } from "@material-ui/core/styles";
// import './index.css';

import ForumList from "./forumList.js"
import Sidebar from "./sidebar.js"
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
// import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Login from "../Login/login.js"
import sidebar from './sidebar.js';

import MenuOpenIcon from '@material-ui/icons/MenuOpen';

const useStyles = theme => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  sidebar: {
    flexShrink: 0,
  },
  sidebarButton: {
    position: 'absolute',
    zIndex: 1,
    top: 100,
    left: 30,
    margin: '0 auto',
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
    openSidebar: false,
    sidebarToggle: "Home",
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
    this.setState({ userInfo: newUserInfo }, () => { console.log("new userFollows:", this.state.userInfo.userFollows) })
  }

  openSidebar = () => {
    this.setState({ openSidebar: true })
  }

  closeSidebar = () => {
    this.setState({ openSidebar: false })
  }

  handleSidebarToggle = (toggle) => {
    console.log(toggle)
    this.setState({ sidebarToggle: toggle })
  }


  render() {
    const { classes, username, usertype } = this.props
    return (
      <ThemeProvider theme={ theme } className={ classes.root }>
        <Sidebar classNmae={ classes.sidebar }
                  openSidebar={ this.openSidebar }
                  closeSidebar={ this.closeSidebar }
                  handleSidebarToggle={ this.handleSidebarToggle }
                  open={ this.state.openSidebar }/>
        {/* <Grid container justify="flex-start" className={ classes.sidebarButton } > */}
          <Tooltip title="More Page Options" className={ classes.sidebarButton }>
            <Fab color="primary" size="medium" onClick={ this.openSidebar }>
              <MenuOpenIcon fontSize="default" />
            </Fab>
          </Tooltip>
        {/* </Grid> */}
        <Grid container className={ classes.content }>
          <ForumList userInfo={ this.state.userInfo }
                    FAInfo={ this.state.tempFAInfo }
                    sidebarToggle={ this.state.sidebarToggle }
                    userInfoUpdater={ this.userInfoUpdater }/>
        </Grid>
      </ThemeProvider>
    )
  }
}

export default withStyles(useStyles)(Community);

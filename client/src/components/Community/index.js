import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';
import { withStyles } from "@material-ui/core/styles";
import { Redirect } from 'react-router';

import ForumList from "./forumList.js"
import Sidebar from "./sidebar.js"
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';

import MenuOpenIcon from '@material-ui/icons/MenuOpen';

import { getFAInfodb } from './actions.js';

// styles definiton
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

// theme definition
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

// class definition
class Community extends React.Component {

  // ===state===
  // tempFAInfo: stores information about registered Financial Advisor, this will be fetched from a database
  // userInfo: stores information about the current user, this is constructed when the class is mounted
  // openSidebar: flag for opening the side bar
  // sidebarToggle: determines which side bar option is selected
  state = {
    tempFAInfo: [
      {FAName: "Angus Wang",
        FAIntro: "I am Angus Wang. I am here to guide you to treasures you'll never find yourself.",
        FAFields: ["Stocks", "Budget Planning", "Life Hacks"],
        FAPoints: 123,
      },
      {FAName: "Angela Merkel",
        FAIntro: "I am Angela Merkel, the chancellor of Germany. I post stuff about the EU on here sometimes.",
        FAFields: ["Politics", "Nation Building"],
        FAPoints: 456,
      },
      {FAName: "Bill Gates",
        FAIntro: "I am Bill Gates. I won't say much here because my name says it all",
        FAFields: ["Programming", "Company Building"],
        FAPoints: 789,
      }
    ],
    userInfo: {
      username: "",
      usertype: "",
      userUpvotedPosts: [],
      userDownvotedPosts: [],
      userSavedPosts: [],
      userFollows: [],
      FAName: "",
      FAIntro: "",
      FAFields: "",
      FAPoints: 0,
    },
    openSidebar: false,
    sidebarToggle: "Home",
  }

  // constructor
  constructor(props) {
    super(props)

    this.userInfoUpdater = this.userInfoUpdater.bind(this)
  }

  // construct the userInfo state variable (info is passed as a prop)
  componentDidMount() {
    console.log("whaidiosjfiajsjofijdsoiafjoiaji===================")

    let usertype = ""
    if (this.props.usertype === "Financial Advisor") usertype = "FA"
    else usertype = "RU"

    let newUserInfo = {
      username: this.props.username,
      usertype: usertype,
      userUpvotedPosts: this.props.userInfo.userUpvotedPosts,
      userDownvotedPosts: this.props.userInfo.userDownvotedPosts,
      userSavedPosts: this.props.userInfo.userSavedPosts,
      userFollows: this.props.userInfo.userFollows,
      FAName: "",
      FAIntro: "",
      FAFields: "",
      FAPoints: 0,
    }

    if (usertype === "FA") {
      newUserInfo.FAName = this.props.FAName
      newUserInfo.FAIntro = this.props.FAIntro
      newUserInfo.FAFields = this.props.FAFields
      newUserInfo.FAPoints = this.props.FAPoints
    }

    this.setState({ userInfo: newUserInfo })
    getFAInfodb(this)
  }

  // called in children components to update the userInfo state in this component
  userInfoUpdater(newUserInfo) {

    this.setState({ userInfo: newUserInfo })
  }

  // called to open the side bar
  openSidebar = () => {

    this.setState({ openSidebar: true })
  }

  // called to close the side bar
  closeSidebar = () => {

    this.setState({ openSidebar: false })
  }

  // called when the user makes a selection in the side bar
  handleSidebarToggle = (toggle) => {

    this.setState({ sidebarToggle: toggle })
  }

  // render function
  render() {

    // pass in relevant information as props
    const { classes, username, usertype, FAName, FAIntro, FAFields, FAPoints, loggedIn, app } = this.props

    return (

      loggedIn ? 
      <ThemeProvider theme={ theme } className={ classes.root }>

        {/* {side bar component} */}
        <Sidebar classNmae={ classes.sidebar }
                  openSidebar={ this.openSidebar }
                  closeSidebar={ this.closeSidebar }
                  handleSidebarToggle={ this.handleSidebarToggle }
                  open={ this.state.openSidebar }/>
        
        {/* {button to open side bar} */}
        <Tooltip title="More Page Options" className={ classes.sidebarButton }>
          <Fab color="primary" size="medium" onClick={ this.openSidebar }>
            <MenuOpenIcon fontSize="default" />
          </Fab>
        </Tooltip>

        {/* {main forum header and list} */}
        <Grid container className={ classes.content }>
          <ForumList userInfo={ this.state.userInfo }
                    FAInfo={ this.state.tempFAInfo }
                    sidebarToggle={ this.state.sidebarToggle }
                    userInfoUpdater={ this.userInfoUpdater }
                    app={app}/>
        </Grid>

      </ThemeProvider> : <Redirect to="/login" />
    )
  }
}

export default withStyles(useStyles)(Community);

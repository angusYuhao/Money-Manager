import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';

import { createMuiTheme } from '@material-ui/core/styles';
import { deepPurple, green } from '@material-ui/core/colors';
import { withStyles } from "@material-ui/core/styles";

import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import CloseIcon from '@material-ui/icons/Close';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';

import { deleteUserFollowdb, addUserFollowdb } from './actions.js'


// define styles
const styles =  theme => ({
  closePostButton: {
    backgroundColor: deepPurple[500],
  },
  blackText: {
    color: '#000000',
  },
  redText: {
    color: '#dd0000',
  },
  purpleText: {
    color: deepPurple[500],
    fontSize: 30
  },
  upvoteText: {
    color: '#aaaaaa',
  },
  checkCircle: {
    color: green[500]
  },
  financialAdvisorTag: {
    color: '#ffffff',
    backgroundColor: green[500]
  },
  followButtonGrid: {
    padding: 20,
  },
  timeText: {
    color: '#555555',
    fontSize: 13,
  },
  postTitle: {
    color: deepPurple[800],
    fontSize: 20,
  },
  authorText: {
    fontSize: 24,
  },
  avatar: {
    backgroundColor: green[500],
  },
  FAPoints: {
    backgroundColor: '#ddd600',
  }
});

// define theme
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

class FAListItem extends React.Component {
  
  state = {
    FA: null,
    openFA: false,
  }

  componentDidMount() {
    this.setState({FA: this.props.FA})
  }

  openFA = () => {
    this.setState({openFA: true})
  }

  closeFA = () => {
    this.setState({openFA: false})
  }

  // called when the user follows the post author (financial advisor)
  handleUserFollowFA = (callback) => {

    let newUserInfo = this.props.app.state.currentUser
    // newUserInfo.userFollows.push(this.state.authorFAInfo)
    // this.props.userInfoUpdater(newUserInfo)
    console.log(this.props.app)
    callback({username: newUserInfo.username, FAusername: this.props.FA.FAName, app: this.props.app})
  }

  // called when the user unfollows the post author (financial advisor)
  handleUserUnfollowFA = (callback) => {

    let newUserInfo = this.props.app.state.currentUser
    // const newUserFollows = newUserInfo.userFollows.filter((UF) => { return UF !== this.state.authorFAInfo })
    // newUserInfo.userFollows = newUserFollows
    // this.props.userInfoUpdater(newUserInfo)
    console.log(this.props.app)
    callback({username: newUserInfo.username, FAusername: this.props.FA.FAName, app: this.props.app})
  }

  render() {

    const { classes, FA, app } = this.props

    return(

      <div>
        {/* {post list item (not opened)} */}
        <ListItem alignItems="flex-start" button="true" onClick={ this.openFA }>

          <ListItemAvatar>
            <Avatar className={ classes.avatar }>{ FA.FAName[0].toUpperCase() }</Avatar>
          </ListItemAvatar>

          <ListItemText
            primary={
              <React.Fragment>

                {/* {post title and the author's username} */}
                <span className={ classes.postTitle }>{ FA.FAFirstname } { FA.FALastname } </span>
                <span className={ classes.timeText }> { FA.FAName } </span>
                <Chip className={ classes.FAPoints } label={ FA.FAPoints } size="small"/>

              </React.Fragment>
            }
          />

        </ListItem>

        <Dialog open={ this.state.openFA } onClose={ this.closeFA }>
          
          {/* {display avatar and name} */}
          <DialogTitle>
            <Grid container justify="center">
              <Avatar className={ classes.avatar }>{ FA.FAName[0].toUpperCase() }</Avatar>
            </Grid>
            <Grid container justify="center">
              { FA.FAFirstname } { FA.FALastname }
            </Grid>
            <Grid container justify="center" className={ classes.timeText }>
              { FA.FAName }
            </Grid>
          </DialogTitle>

          <Divider variant="middle" />

          <DialogContent>

            {/* {display financial advisor intro} */}
            <DialogContentText align="center">
              { FA.FAIntro }
            </DialogContentText>

            {/* {display financial advisor's fields of expertise} */}
            <DialogContentText align="center">
              <Chip label={ FA.FAFields } size="small" color="secondary" />
            </DialogContentText>

            {/* {display community points} */}
            <DialogContentText align="center">
              <span className={ classes.blackText }>Community Points: </span>
              <span className={ classes.purpleText }>{ FA.FAPoints }</span>
            </DialogContentText>
            
          </DialogContent>

          {/* {display follow/unfollow button} */}
          <Grid container justify="space-evenly" className={ classes.followButtonGrid }>

            { app.state.currentUser.userFollows.includes(FA.FAName) ? 
            <Button color="primary" variant="contained" onClick={ () => this.handleUserUnfollowFA(deleteUserFollowdb) }>
              Unfollow
            </Button> : 
            <Button color="primary" variant="contained" onClick={ () => this.handleUserFollowFA(addUserFollowdb) }>
              Follow
            </Button> }

          </Grid>

        </Dialog>
      </div>
    )
  }
}

export default withStyles(styles)(FAListItem);
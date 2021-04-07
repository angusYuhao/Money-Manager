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

import Comment from "./comment.js"

import { addCommentdb, deletePostdb, deleteUserPostdb, UpdatePostVotesdb } from './actions.js'

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

// class definition
class ForumListItem extends React.Component {

  // ===state===
  // postID: the post's postID
  // openPost: determines if the open post dialog is open
  // openFAInfo: determines if the FA info dialog is open
  // comment: the content of the comment to be posted
  // upvoted: whether the user has upvoted the post
  // downvoted: whether the user has downvoted the post
  // authorFAInfo: store the financial advisor info if the author of the post is a financial advisor
  //    FAName: the name of the financial advisor
  //    FAIntro: the introduction of the financial advisor
  //    FAFields: the fields of expertise of the financial advisor
  //    FAPoints: the financial advisor's community points
  state = {
    postID: null,
    openPost: false,
    openFAInfo: false,
    comment: "",
    upvoted: false,
    downvoted: false,
    authorFAInfo: {
      FAName: "",
      FAIntro: "",
      FAFields: [],
      FAPoints: 0,
    }
  }

  // update the state when the component is mounted
  componentDidMount() {

    this.setState({ postID: this.props.postID }, () => this.prepareOpenPost(), () => this.forceUpdate())
  }

  // update some states when the component updates
  componentDidUpdate() {

    if (this.state.postID !== this.props.postID) this.setState({ postID: this.props.postID }, () => this.prepareOpenPost())      
  }

  // called when a post is clicked to be opened
  openPost = () => {

    this.setState({ openPost: true }, () => this.prepareOpenPost())
  }

  // set up important states so that the page renders correctly
  prepareOpenPost = () => {

    const userInfo = this.props.userInfo

    userInfo.userUpvotedPosts.includes(this.state.postID) ? this.setState({ upvoted: true }) : this.setState({ upvoted: false })
    userInfo.userDownvotedPosts.includes(this.state.postID) ? this.setState({ downvoted: true }) : this.setState({ downvoted: false })
  }

  // called when the post dialog is closed
  closePost = () => {

    this.setState({ openPost: false })
  }

  // handles some input changes (comment entries)
  handleInputChange = (event) => {

    const value = event.target.value
    const name = event.target.name

    this.setState({
      [name]: value
    })
  }

  // called when a comment is posted
  handlePostComment = () => {

    this.props.postComment(this.state, addCommentdb)
    this.setState({ comment: "" })
  }

  // called when a financial advisor's info dialog is opened
  handleOpenFAInfo = () => {

    const targetFAInfo = this.props.FAInfo.filter((I) => { return I.FAName === this.props.postAuthor})

    this.setState({
      authorFAInfo: targetFAInfo[0],
      openFAInfo: true,
    })
  }

  // called when a financial advisor's info dialog is closed
  handleCloseFAInfo = () => {

    this.setState({ openFAInfo: false })
  }

  // called when the user follows the post author (financial advisor)
  handleUserFollowFA = () => {

    let newUserInfo = this.props.userInfo
    newUserInfo.userFollows.push(this.state.authorFAInfo)
    this.props.userInfoUpdater(newUserInfo)
  }

  // called when the user unfollows the post author (financial advisor)
  handleUserUnfollowFA = () => {

    let newUserInfo = this.props.userInfo
    const newUserFollows = newUserInfo.userFollows.filter((UF) => { return UF !== this.state.authorFAInfo })
    newUserInfo.userFollows = newUserFollows
    this.props.userInfoUpdater(newUserInfo)
  }

  // called when user saves the post
  handleSavePost = () => {

    let newUserInfo = this.props.userInfo
    newUserInfo.userSavedPosts.push(this.state.postID)
    this.props.userInfoUpdater(newUserInfo)
  }

  // called when user unsaves the post
  handleUnsavePost = () => {

    let newUserInfo = this.props.userInfo
    const newUserSavedPosts = newUserInfo.userSavedPosts.filter((US) => { return US !== this.state.postID })
    newUserInfo.userSavedPosts = newUserSavedPosts
    this.props.userInfoUpdater(newUserInfo)
  }

  // called when user upvotes the post
  toggleUpvote = () => {

    // clean up downvote
    if (this.state.downvoted === true) {
      this.setState({ downvoted: false })
      this.props.minusDownvote(this.state, UpdatePostVotesdb)
    }

    if (this.state.upvoted === false) {
      this.setState({ upvoted: true })
      this.props.addUpvote(this.state, UpdatePostVotesdb)
    }
    else {
      this.setState({ upvoted: false })
      this.props.minusUpvote(this.state, UpdatePostVotesdb)
    }
  }

  // called when user downvotes the post
  toggleDownvote = () => {

    // clean up upvote
    if (this.state.upvoted === true) {
      this.setState({ upvoted: false })
      this.props.minusUpvote(this.state, UpdatePostVotesdb)
    }

    if (this.state.downvoted === false) {
      this.setState({ downvoted: true })
      this.props.addDownvote(this.state, UpdatePostVotesdb)
    }
    else {
      this.setState({ downvoted: false })
      this.props.minusDownvote(this.state, UpdatePostVotesdb)
    }
    
  }

  // main render function
  render() {

    // save props
    const { classes, postTitle, postAuthor, postTextContent, category, comments, postComment, 
            deletePosts, openManagePost, numUpvotes, numDownvotes, postAuthorUsertype, userInfo, FAInfo, userInfoUpdater } = this.props

    return (
      <div>

        {/* {post list item (not opened)} */}
        <ListItem alignItems="flex-start" button="true" onClick={ openManagePost ? null : this.openPost }>

          {/* {the avatar of the post author (currently null)} */}
          <ListItemAvatar>
            <Avatar></Avatar>
          </ListItemAvatar>

          <ListItemText
            primary={
              <React.Fragment>

                {/* {post title and the author's username} */}
                <span>{ postTitle } :: </span>
                <span> { postAuthor } </span>

                {/* {draw the green check mark if the author is a financial advisor} */}
                { postAuthorUsertype === "FA" ? 
                  <IconButton size="small" component="span" disabled>
                    <CheckCircleIcon className={ classes.checkCircle } fontSize="small" />
                  </IconButton>
                : null }

                {/* {shows the number of upvotes and downvotes} */}
                <IconButton size="small" component="span" disabled>
                  <ThumbUpAltIcon color={ this.state.upvoted ? "primary" : '#dddddd'} fontSize="small" />
                </IconButton>
                <span className={ classes.upvoteText }>{ numUpvotes } : { numDownvotes }</span>
                <IconButton size="small" component="span" disabled>
                  <ThumbDownAltIcon color={ this.state.downvoted ? "primary" : '#dddddd'} fontSize="small" />
                </IconButton>

              </React.Fragment>
            }            
            secondary={
              <React.Fragment>

                {/* {post's contents} */}
                { postTextContent }
              </React.Fragment>
            }
          />

          {/* {the category chip of the post} */}
          <Chip label={ category }/>

          {/* {display the view button if in manage post mode} */}
          { openManagePost ? 
            <Tooltip title="View">
              <IconButton color="primary" size="medium" onClick={ this.openPost }>
                <VisibilityIcon fontSize="default" />
              </IconButton>
            </Tooltip> 
            : 
            null
          }

          {/* {display the delete button if in manage post mode} */}
          { openManagePost ? 
            <Tooltip title="Delete">
              <IconButton color="primary" size="medium" onClick={ () => deletePosts(this.state, deletePostdb, deleteUserPostdb) }>
                <DeleteIcon fontSize="default" />
              </IconButton>
            </Tooltip> 
            : 
            null
          }

        </ListItem>

        {/* {the open post dialog} */}
        <Dialog open={ this.state.openPost } onClose={ this.closePost } aria-labelledby="form-dialog-title" fullScreen>

          <DialogActions className={ classes.closePostButton }>

            {/* {display view financial advisor info button if post author is a financial advisor} */}
            { postAuthorUsertype === "FA" ? 
              <Button variant="contained" color="secondary" onClick={ this.handleOpenFAInfo }>
                View Financial Advisor Info
              </Button>
            : null }

            {/* {display the save post or unsave post button} */}
            { userInfo.userSavedPosts.includes(this.props.postID) ? 
            <Tooltip title="Unsave Post">
              <Fab color="secondary" size="small" onClick={ this.handleUnsavePost }>
                <IndeterminateCheckBoxIcon fontSize="default" />
              </Fab>
            </Tooltip>
              : 
            <Tooltip title="Save Post">
              <Fab color="secondary" size="small" onClick={ this.handleSavePost }>
                <SaveAltIcon fontSize="default" />
              </Fab>
            </Tooltip> }

            {/* {display the close dialog button} */}
            <Tooltip title="Close">
              <Fab color="secondary" size="small" onClick={ this.closePost }>
                <CloseIcon fontSize="default" />
              </Fab>
            </Tooltip>

          </DialogActions>
          
          <DialogTitle id="form-dialog-title">

            {/* {display category, post title and author} */}
            <Chip label={ category } size="small"/>
             :: { postTitle } :: 
            <span> { postAuthor } </span>

            {/* {display green chip if author is financial advisor} */}
            { postAuthorUsertype === "FA" ? 
              <Chip className={ classes.financialAdvisorTag } label={ "Financial Advisor" } size="small"/>
            : null }

            {/* {display upvote and downvote buttons} */}
            <IconButton color={ this.state.upvoted ? "primary" : "secondary" } component="span" onClick={ this.toggleUpvote }>
              <ThumbUpAltIcon />
            </IconButton>
            <span>{ numUpvotes }</span>
            <IconButton color={ this.state.downvoted ? "primary" : "secondary" } component="span" onClick={ this.toggleDownvote }>
              <ThumbDownAltIcon />
            </IconButton>
            <span>{ numDownvotes }</span>

          </DialogTitle>

          <DialogContent>

            {/* {display contents of the post} */}
            <DialogContentText className={ classes.blackText }>
              { postTextContent }
            </DialogContentText>

            <Divider variant="fullWidth" />

            <br></br>
            <DialogContentText className={ classes.blackText }>Post a Comment:</DialogContentText>
            
            {/* {comment text box} */}
            <TextField
              value={ this.state.comment }
              onChange={ this.handleInputChange }
              multiline
              rows="3"
              variant="outlined"
              margin="dense"
              name="comment"
              label="Say something..."
              fullWidth
            />
            <br></br>

            {/* {post comment button} */}
            <Button variant="outlined" color="primary" onClick={ this.handlePostComment }>
              Post
            </Button>
            <br></br>
            <br></br>

            <Divider variant="fullWidth" />

            {/* {display list of comments} */}
            <List>
              {comments.map((comment) => {
                  return (
                    <div>
                      <Comment commenter={ comment.commenter }
                                commentContent={ comment.commentContent }/>
                      <Divider variant="inset" component="li" />
                    </div>
                  )
                }
              )}
            </List>
            
          </DialogContent>

        </Dialog>

        {/* {displays the financial advisor info if the author is a financial advisor} */}
        <Dialog open={ this.state.openFAInfo } onClose={ this.handleCloseFAInfo }>
          
          {/* {display avatar and name} */}
          <DialogTitle>
            <Grid container justify="center">
              <Avatar></Avatar>
            </Grid>
            <Grid container justify="center">
              { this.state.authorFAInfo.FAName }
            </Grid>
          </DialogTitle>

          <Divider variant="middle" />

          <DialogContent>

            {/* {display financial advisor intro} */}
            <DialogContentText align="center">
              { this.state.authorFAInfo.FAIntro }
            </DialogContentText>

            {/* {display financial advisor's fields of expertise} */}
            <DialogContentText align="center">
              { this.state.authorFAInfo.FAFields.map((field) => {
                return (
                  <span>
                    <Chip label={ field } size="small" color="secondary" />
                    { this.state.authorFAInfo.FAFields[this.state.authorFAInfo.FAFields.length - 1] === field ? null : <span> : </span> }
                  </span>
                )
              }) }
            </DialogContentText>

            {/* {display community points} */}
            <DialogContentText align="center">
              <span className={ classes.blackText }>Community Points: </span>
              <span className={ classes.purpleText }>{ this.state.authorFAInfo.FAPoints }</span>
            </DialogContentText>
            
          </DialogContent>

          {/* {display follow/unfollow button} */}
          <Grid container justify="space-evenly" className={ classes.followButtonGrid }>

            { userInfo.userFollows.includes(this.state.authorFAInfo) ? 
            <Button color="primary" variant="contained" onClick={ this.handleUserUnfollowFA }>
              Unfollow
            </Button> : 
            <Button color="primary" variant="contained" onClick={ this.handleUserFollowFA }>
              Follow
            </Button> }

          </Grid>

        </Dialog>

      </div>
    )
  }
}

  export default withStyles(styles)(ForumListItem);
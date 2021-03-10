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
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import { deepPurple, grey, green } from '@material-ui/core/colors';
import { withStyles } from "@material-ui/core/styles";

import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import CloseIcon from '@material-ui/icons/Close';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import Comment from "./../Community/comment.js"

const styles =  theme => ({
  closePostButton: {
    backgroundColor: deepPurple[500],
    // borderRadius: 5,
  },
  blackText: {
    color: '#000000',
  },
  redText: {
    color: '#dd0000',
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

class ForumListItem extends React.Component {

    state = {
      postID: null,
      openPost: false,
      comment: "",
      upvoted: false,
      downvoted: false,
      spaces: "     ",
    }

    componentDidMount() {
      console.log("updating postID")
      console.log(this.props.postID)
      this.setState({ postID: this.props.postID }, () => this.prepareOpenPost(), () => this.forceUpdate())
    }

    componentWillUnmount() {
      console.log("destroyed")
    }

    componentDidUpdate() {
      console.log("componentDidUpdate")
      console.log("what is this???", this.props.postID)
      if (this.state.postID !== this.props.postID) this.setState({ postID: this.props.postID }, () => this.prepareOpenPost())      
    }
  
    openPost = () => {
      this.setState({ openPost: true }, () => this.prepareOpenPost())
    }

    prepareOpenPost = () => {
      console.log("state's postID:", this.state.postID)
      console.log("userUpvotedPosts:", this.props.userInfo.userUpvotedPosts)
      const userInfo = this.props.userInfo
      userInfo.userUpvotedPosts.includes(this.state.postID) ? this.setState({ upvoted: true }) : this.setState({ upvoted: false })
      userInfo.userDownvotedPosts.includes(this.state.postID) ? this.setState({ downvoted: true }) : this.setState({ downvoted: false })
    }
  
    closePost = () => {
      this.setState({ openPost: false })
    }
  
    handleInputChange = (event) => {
      const value = event.target.value
      const name = event.target.name
  
      this.setState({
        [name]: value
      })
    }

    handlePostComment = () => {
      this.props.postComment(this.state)
      this.setState({ comment: "" })
    }

    toggleUpvote = () => {

      // clean up downvote
      if (this.state.downvoted === true) {
        this.setState({ downvoted: false })
        this.props.minusDownvote(this.state)
      }

      if (this.state.upvoted === false) {
        this.setState({ upvoted: true })
        this.props.addUpvote(this.state)
      }
      else {
        this.setState({ upvoted: false })
        this.props.minusUpvote(this.state)
      }
    }

    toggleDownvote = () => {

      // clean up upvote
      if (this.state.upvoted === true) {
        this.setState({ upvoted: false })
        this.props.minusUpvote(this.state)
      }

      if (this.state.downvoted === false) {
        this.setState({ downvoted: true })
        this.props.addDownvote(this.state)
      }
      else {
        this.setState({ downvoted: false })
        this.props.minusDownvote(this.state)
      }
      
    }
  
    render() {
  
      const { classes, avatar, postTitle, postAuthor, postTextContent, category, comments, postComment, 
              deletePosts, openManagePost, numUpvotes, numDownvotes, postAuthorUsertype } = this.props
  
      return (
        <div>
          <ListItem alignItems="flex-start" button="true" onClick={ openManagePost ? null : this.openPost }>
            <ListItemAvatar>
              <Avatar>{ avatar }</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <React.Fragment>
                  <span>{ postTitle } :: </span>
                  <span> { postAuthor } </span>
                  { postAuthorUsertype === "FA" ? 
                    <IconButton size="small" component="span" disabled>
                      <CheckCircleIcon className={ classes.checkCircle } fontSize="small" />
                    </IconButton>
                  : null }
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
                  { postTextContent }
                </React.Fragment>
              }
            />
            <Chip label={ category }/>
            { openManagePost ? <Button variant="contained" color="primary" onClick={ this.openPost }>View</Button> : null }
            { openManagePost ? <Button variant="contained" color="primary" onClick={ () => deletePosts(this.state) }>Delete</Button> : null }
            
          </ListItem>
  
          <Dialog open={ this.state.openPost } onClose={ this.closePost } aria-labelledby="form-dialog-title" fullScreen>

            <DialogActions className={ classes.closePostButton }>
              { postAuthorUsertype === "FA" ? 
                <Button variant="contained" color="secondary" onClick={ this.handleOpenFAInfo }>
                  View Financial Advisor Info
                </Button>
              : null }
              <Tooltip title="Close">
                <Fab color="secondary" size="small" onClick={ this.closePost }>
                  <CloseIcon fontSize="default" />
                </Fab>
              </Tooltip>
            </DialogActions>
            
            <DialogTitle id="form-dialog-title">
              <Chip label={ category } size="small"/> :: { postTitle } :: 
              <span> { postAuthor } </span>
              { postAuthorUsertype === "FA" ? 
                <Chip className={ classes.financialAdvisorTag } label={ "Financial Advisor" } size="small"/>
              : null }
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
              <DialogContentText className={ classes.blackText }>
                { postTextContent }
              </DialogContentText>
              <Divider variant="fullWidth" />
              <br></br>
              <DialogContentText className={ classes.blackText }>Post a Comment:</DialogContentText>
              
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
              <Button variant="outlined" color="primary" onClick={ this.handlePostComment }>
                Post
              </Button>
              <br></br>
              <br></br>
              <Divider variant="fullWidth" />
  
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
        </div>
      )
    }
  }

  export default withStyles(styles)(ForumListItem);


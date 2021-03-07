import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
import Checkbox from '@material-ui/core/Checkbox';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import { deepPurple, grey } from '@material-ui/core/colors';
import { withStyles } from "@material-ui/core/styles";

import Comment from "./comment.js"


class ForumListItem extends React.Component {

    state = {
      postID: null,
      openPost: false,
      comment: "",
      checkedDelete: false
    }

    componentDidMount() {
      this.setState({
        postID: this.props.postID
      })
    }
  
    openPost = () => {
      this.setState({
        openPost: true
      })
    }
  
    closePost = () => {
      this.setState({
        openPost: false
      })
    }
  
    handleInputChange = (event) => {
      const value = event.target.value
      const name = event.target.name
  
      this.setState({
        [name]: value
      })
    }

    handleCheck = (event) => {
      this.setState({
        checkedDelete: event.target.checked
      }, () => this.props.markForDelete(this.state))
      // console.log(event.target.checked)
      // this.props.markForDelete()
    }
  
    render() {
  
      const { avatar, postTitle, postAuthor, postTextContent, category, comments, postComment, deletePosts, postID, openManagePost } = this.props
  
      return (
        <div>
          <ListItem alignItems="flex-start" button="true" onClick={ openManagePost ? null : this.openPost }>
            <ListItemAvatar>
              <Avatar>{ avatar }</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <React.Fragment>
                  { postTitle }
                  <span className="postAuthor"> :: { postAuthor }</span>
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
            { openManagePost ? <p>Delete:</p> : null }
            { openManagePost ? <Checkbox checked={ this.state.checkedDelete } 
                                         onChange={ this.handleCheck } 
                                         inputProps={{ 'aria-label': 'primary checkbox' }}/> : null }
            
          </ListItem>
  
          <Dialog open={ this.state.openPost } onClose={ this.closePost } aria-labelledby="form-dialog-title" fullScreen>
            
            <DialogActions>
              <Button onClick={ this.closePost } color="primary" variant="outlined">
                Close
              </Button>
            </DialogActions>
            
            <DialogTitle id="form-dialog-title">
              <Chip label={ category } size="small"/> :: { postTitle } :: 
              <span className="categoryTitle"> { postAuthor }</span>
            </DialogTitle>
            <DialogContent>
              <DialogContentText style={{color: 'black'}}>
                { postTextContent }
              </DialogContentText>
              <Divider variant="fullWidth" />
              <br></br>
              <DialogContentText style={{color: 'maroon'}}>Post a Comment:</DialogContentText>
              
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
              <Button variant="outlined" color="primary" onClick={ () => postComment(this.state) }>
                Post!
              </Button>
              <br></br>
              <br></br>
              <Divider variant="fullWidth" />
  
              <List className="commentList">
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

  export default ForumListItem;
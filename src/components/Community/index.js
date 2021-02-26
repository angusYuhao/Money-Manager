import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
// import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
// import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';


import './index.css';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: '100%',
//     maxWidth: '36ch',
//     backgroundColor: theme.palette.background.paper,
//   },
//   inline: {
//     display: 'inline',
//   },
// }));

class Community extends React.Component {
  // {const classes = useStyles}

  render() {
    return (
      <div>
        <ForumList />
      </div>
    )
  }
}

class ForumList extends React.Component {

  state = {
    openNewPost: false,
    author: "",
    title: "",
    authorAvatar: "",
    content: "",
    category: "",
    postFilter: "",
    commenter: "",
    commentContent: "",
    posts: [
      {author: 'Angus Wang', 
       title: 'welcome to communtiy', 
       content: 'this is the first community thread', 
       authorAvatar: null,
       category: "Announcement",
       comments: [
        {commenter: "Angus Wang",
         commentContent: "It is I, Angus Wang, once again! hohohohoh hohohohohooh lmao"},
        {commenter: "Angus Wang2",
         commentContent: "It is I, Angus Wang, once again! hohohohoh hohohohohooh lmao2"}
       ]
      },
      {author: 'boogy boy', 
       title: 'test thread', 
       content: 'another community thread lmao what do you think lmao what do you think lmao what do you think lmao what do you think lmao what do you think lmao what do you think lmao what do you think lmao what do you think lmao what do you think lmao what do you think lmao what do you think lmao ', 
       authorAvatar: null,
       category: "Opinion",
       comments: [
        {commenter: "Angus Wang3",
         commentContent: "It is I, Angus Wang, once again! hohohohoh hohohohohooh lmao3"},
        {commenter: "Dude with an attitude",
         commentContent: "The Communist Manifesto, originally the Manifesto of the Communist Party (German: Manifest der Kommunistischen Partei), is an 1848 political document by German philosophers Karl Marx and Friedrich Engels. Commissioned by the Communist League and originally published in London just as the Revolutions of 1848 began to erupt, the Manifesto was later recognised as one of the world's most influential political documents. It presents an analytical approach to the class struggle (historical and then-present) and the conflicts of capitalism and the capitalist mode of production, rather than a prediction of communism's potential future forms."}
       ]
      }
    ]
  }


  handleClickOpen = () => {
    this.setState({
      openNewPost: true
    })
  }

  handleClose = () => {
    this.setState({
      openNewPost: false
    })
  }

  handleInputChange = (event) => {
    const value = event.target.value
    const name = event.target.name

    this.setState({
      [name]: value
    })
  }

  handleFilterInputChange = (event) => {
    const value = event.target.value

    this.setState({
      postFilter: value
    })
  }

  addPost = () => {
    const postList = this.state.posts

    const newPost = {
      author: this.state.author,
      title: this.state.title,
      authorAvatar: null,
      content: this.state.content,
      category: this.state.category,
      comments: []
    }

    postList.push(newPost)

    this.setState({
      posts: postList,

      author: "",
      title: "",
      authorAvatar: "",
      content: "",
      category: ""
    })

    this.handleClose()
  }

  changeCategory = (_category) => {
    this.setState({
      category: _category
    })
  }

  postComment = (targetPost) => {
    
  }

  render() {
    return (
      <div>
        <Container maxWidth="xl">
          <List className="forumList">
            
            <Grid container justify="space-evenly">
              <FormControl style={{minWidth: 200}}>         {/*Warning: inline styling!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/}
                <InputLabel>Filter Posts</InputLabel>
                <Select onChange={ this.handleFilterInputChange }>
                  <MenuItem value="">None</MenuItem>
                  <MenuItem value="Announcement">Announcement</MenuItem>
                  <MenuItem value="Question">Question</MenuItem>
                  <MenuItem value="Opinion">Opinion</MenuItem>
                </Select>
              </FormControl>
              <Button className="newPostButton" color="primary" variant="contained" onClick={ this.handleClickOpen }>
                New Post
              </Button>
            </Grid>
            
          </List>

          <br></br>

          <List className="forumList">
            {this.state.posts.map((thread) => {
              if (this.state.postFilter === "") {
                return (
                  <div>
                    <ForumListItem postTitle={ thread.title }
                                  postAuthor={ thread.author }
                                  postTextContent={ thread.content }
                                  avatar={ thread.authorAvatar }
                                  category={ thread.category }
                                  comments={ thread.comments }
                                  postComment={ this.postComment }/>
                    <Divider variant="inset" component="li" />
                  </div>
                )
              }
              else if (this.state.postFilter === thread.category) {
                return (
                  <div>
                    <ForumListItem postTitle={ thread.title }
                                  postAuthor={ thread.author }
                                  postTextContent={ thread.content }
                                  avatar={ thread.authorAvatar }
                                  category={ thread.category }
                                  comments={ thread.comments }
                                  postComment={ this.postComment }/>
                    <Divider variant="inset" component="li" />
                  </div>
                )
              }
            })}
          </List>
        </Container>
        

        <Dialog open={ this.state.openNewPost } onClose={ this.handleClose } aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">New Post:</DialogTitle>
          <DialogContent>
            <TextField
              value={ this.state.author }
              onChange={ this.handleInputChange }
              autoFocus
              size="small"
              variant="outlined"
              margin="dense"
              name="author"
              label="Username"
              fullWidth
            />

            <span className="categoryTitle">Category: </span>
            <br></br>
            <br></br>
            <ButtonGroup color="primary" aria-label="outlined primary button group" fullWidth>
              <Button onClick={ () => this.changeCategory("Announcement") }>Announcement</Button>
              <Button onClick={ () => this.changeCategory("Question") }>Question</Button>
              <Button onClick={ () => this.changeCategory("Opinion") }>Opinion</Button>
            </ButtonGroup>

            <TextField
              value={ this.state.title }
              onChange={ this.handleInputChange }
              size="small"
              variant="outlined"
              margin="dense"
              name="title"
              label="Post Title"
              fullWidth
            />
            
            <TextField
              value={ this.state.content }
              onChange={ this.handleInputChange }
              multiline
              rows="5"
              variant="outlined"
              margin="dense"
              name="content"
              label="Say something here..."
              fullWidth
            />
            
          </DialogContent>
          <DialogActions>
            <Button onClick={ this.handleClose } color="primary">
              Cancel
            </Button>
            <Button onClick={ this.addPost } color="primary">
              Post
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

class ForumListItem extends React.Component {

  state = {
    openPost: false,
    commenter: "",
    comment: ""
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

  render() {

    const { avatar, postTitle, postAuthor, postTextContent, category, comments, postComment } = this.props

    return (
      <div>
        <ListItem alignItems="flex-start" button="true" onClick={ this.openPost }>
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
              value={ this.state.commenter }
              onChange={ this.handleInputChange }
              autoFocus
              size="small"
              variant="outlined"
              margin="dense"
              name="commenter"
              label="Username"
              fullWidth
            />
            <TextField
              value={ this.state.comment }
              onChange={ this.handleInputChange }
              multiline
              rows="3"
              variant="outlined"
              margin="dense"
              name="commentContent"
              label="Say something..."
              fullWidth
            />
            <br></br>
            <Button variant="outlined" color="primary" onClick={ () => postComment(this) }>
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

class Comment extends React.Component {
  render() {
    const { commenter, commentContent } = this.props

    return(
      <div>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar></Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={
              <React.Fragment>
                { commenter }
              </React.Fragment>
            }
            secondary={
              <React.Fragment>
                { commentContent }
              </React.Fragment>
            }
          />
        </ListItem>
      </div>
    )
  }
}



export default Community;

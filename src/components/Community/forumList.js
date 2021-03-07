import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import { deepPurple, grey } from '@material-ui/core/colors';
import { withStyles } from "@material-ui/core/styles";

import ForumListItem from "./forumListItem.js"

class ForumList extends React.Component {

  state = {
    openNewPost: false,
    openManagePost: false,
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
        postID: 1,
        markedForDelete: false,
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
        postID: 2,
        markedForDelete: false,
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

  handleClickManage = () => {
    this.setState({
      openManagePost: true
    })
  }

  handleClose = () => {
    this.setState({
      openNewPost: false,
      openManagePost: false,
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

  addPost = (username) => {
    const postList = this.state.posts
    const newID = (postList.length === 0) ? 1 : postList[postList.length - 1].postID + 1

    const newPost = {
      author: username,
      title: this.state.title,
      authorAvatar: null,
      content: this.state.content,
      category: this.state.category,
      postID: newID,
      markedForDelete: false,
      comments: []
    }

    postList.push(newPost)

    this.setState({
      posts: postList,

      author: "",
      title: "",
      authorAvatar: "",
      content: "",
      category: "",
      postID: null
    })

    this.handleClose()
  }

  changeCategory = (_category) => {
    this.setState({
      category: _category
    })
  }

  postComment = (target) => {
    const targetPostID = target.postID
    const targetPostIndex = this.state.posts.findIndex(post => post.postID === targetPostID)
    
    const targetPost = this.state.posts.filter((p) => {
      return p.postID === targetPostID
    })
    const targetPostComments = targetPost[0].comments

    const newComment = {
      commenter: this.props.username,
      commentContent: target.comment
    }

    targetPostComments.push(newComment)
    targetPost[0].comments = targetPostComments
    
    const otherPosts = this.state.posts.filter((p) => {
      return p.postID !== targetPostID
    })

    otherPosts.splice(targetPostIndex, 0, targetPost[0])

    this.setState({
      posts: otherPosts
    })
  }

  deletePosts = (target) => {
    const targetPostID = target.postID
    const otherPosts = this.state.posts.filter((p) => {
      return p.postID !== targetPostID
    })
    this.setState({
      posts: otherPosts
    })
  }

  markForDelete = (target) => {
    const targetPostID = target.postID
    const targetPostIndex = this.state.posts.findIndex(post => post.postID === targetPostID)

    const targetPost = this.state.posts.filter((p) => {
      return p.postID === targetPostID
    })
    const otherPosts = this.state.posts.filter((p) => {
      return p.postID !== targetPostID
    })

    targetPost[0].markedForDelete = target.checkedDelete
    console.log(targetPost[0].markedForDelete)
    otherPosts.splice(targetPostIndex, 0, targetPost[0])

    this.setState({
      posts: otherPosts
    })
  }

  handleConfirmManage = () => {
    const goodPosts = this.state.posts.filter((p) => {
      return p.markedForDelete === false
    })

    this.setState({
      posts: goodPosts
    })
    // console.log("say sth please===========================")
  }

  render() {

    const { username } = this.props

    return (
      <ThemeProvider>
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
                <Button className="newPostButton" color="secondary" variant="contained" onClick={ this.handleClickOpen }>
                  New Post
                </Button>
                <Button className="managePostButton" color="secondary" variant="contained" onClick={ this.handleClickManage }>
                  Manage Posts
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
                                    postID={ thread.postID }
                                    openManagePost={ false }
                                    deletePosts={ this.deletePosts }
                                    markForDelete={ this.markForDelete }
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
                                    postID={ thread.postID }
                                    openManagePost={ false }
                                    deletePosts={ this.deletePosts }
                                    markForDelete={ this.markForDelete }
                                    postComment={ this.postComment }/>
                      <Divider variant="inset" component="li" />
                    </div>
                  )
                }
              })}
            </List>
          </Container>
          

          <Dialog open={ this.state.openNewPost } onClose={ this.handleClose } aria-labelledby="form-dialog-title" fullScreen>
            <DialogTitle id="form-dialog-title">New Post:</DialogTitle>
            <DialogContent>

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

              <span className="categoryTitle">Category: </span>
              <br></br>
              <br></br>
              <ButtonGroup color="primary" aria-label="outlined primary button group" fullWidth>
                <Button onClick={ () => this.changeCategory("Announcement") }>Announcement</Button>
                <Button onClick={ () => this.changeCategory("Question") }>Question</Button>
                <Button onClick={ () => this.changeCategory("Opinion") }>Opinion</Button>
              </ButtonGroup>

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
                Done
              </Button>
              <Button onClick={ () => this.addPost(username) } color="primary">
                Post
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog open={ this.state.openManagePost } onClose={ this.handleClose } aria-labelledby="form-dialog-title" fullScreen>

            <DialogTitle id="form-dialog-title">Your Posts:</DialogTitle>

            <DialogContent>
              <List className="forumList">
                {this.state.posts.map((thread) => {
                  if (thread.author === username) {
                    return (
                      <div>
                        <ForumListItem postTitle={ thread.title }
                                      postAuthor={ thread.author }
                                      postTextContent={ thread.content }
                                      avatar={ thread.authorAvatar }
                                      category={ thread.category }
                                      comments={ thread.comments }
                                      postID={ thread.postID }
                                      openManagePost={ true }
                                      deletePosts={ this.deletePosts }
                                      markForDelete={ this.markForDelete }
                                      postComment={ this.postComment }/>
                        <Divider variant="inset" component="li" />
                      </div>
                    )
                  }
                })}
              </List>
            </DialogContent>

            <DialogActions>
              <Button onClick={ this.handleClose } color="primary">
                Cancel
              </Button>
              <Button onClick={ this.handleConfirmManage } color="primary">
                Confirm
              </Button>
            </DialogActions>

          </Dialog>

        </div>
      </ThemeProvider>
    )
  }
}

export default ForumList;
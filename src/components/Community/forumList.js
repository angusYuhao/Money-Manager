import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';


import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import { deepPurple, grey } from '@material-ui/core/colors';
import { withStyles } from "@material-ui/core/styles";

import ForumListItem from "./forumListItem.js"
import { ArrowRight } from '@material-ui/icons';

import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AddIcon from '@material-ui/icons/Add';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

// define styles
const styles =  theme => ({
  forumList: {
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    margin: 10,
  },
  forumTopBar: {
    backgroundColor: deepPurple[50],
    borderRadius: 5,
    spacing: '100',
  },
  forumTopChunk: {
    margin: 10,
  },
  addPostPanel: {
    backgroundColor: '#f0f0f0',
  },
  filter: {
    minWidth: 200,
  },
  forumBarButton: {
    padding: 10,
    marginLeft: 10,
    marginRight: 0,
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
    sortOrder: "",
    commenter: "",
    commentContent: "",
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
    posts: [
      {author: 'Angus Wang', 
        authorUsertype: "FA",
        title: 'welcome to communtiy', 
        content: 'this is the first community thread', 
        authorAvatar: null,
        category: "Announcement",
        postID: 1,
        numUpvotes: 5,
        numDownvotes: 1,
        comments: [
        {commenter: "Angus Wang",
          commentContent: "It is I, Angus Wang, once again! hohohohoh hohohohohooh lmao"},
        {commenter: "Angus Wang2",
          commentContent: "It is I, Angus Wang, once again! hohohohoh hohohohohooh lmao2"}
        ]
      },
      {author: 'boogy boy', 
        authorUsertype: "RU",
        title: 'test thread', 
        content: 'another community thread lmao what do you think lmao what do you think lmao what do you think lmao what do you think lmao what do you think lmao what do you think lmao what do you think lmao what do you think lmao what do you think lmao what do you think lmao what do you think lmao ', 
        authorAvatar: null,
        category: "Opinion",
        postID: 2,
        numUpvotes: 4,
        numDownvotes: 2,
        comments: [
        {commenter: "Angus Wang3",
          commentContent: "It is I, Angus Wang, once again! hohohohoh hohohohohooh lmao3"},
        {commenter: "Dude with an attitude",
          commentContent: "The Communist Manifesto, originally the Manifesto of the Communist Party (German: Manifest der Kommunistischen Partei), is an 1848 political document by German philosophers Karl Marx and Friedrich Engels. Commissioned by the Communist League and originally published in London just as the Revolutions of 1848 began to erupt, the Manifesto was later recognised as one of the world's most influential political documents. It presents an analytical approach to the class struggle (historical and then-present) and the conflicts of capitalism and the capitalist mode of production, rather than a prediction of communism's potential future forms."}
        ]
      }
    ]
  }

  componentDidMount() {
    this.setState({
      username: this.props.username,
      usertype: "RU",
      // later include the upvotes and downvotes of the user
    })
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

  handleClickManageDone = () => {
    this.setState({
      openManagePost: false
    })
  }

  handleClose = () => {
    this.setState({
      openNewPost: false,
      openManagePost: false,

      author: "",
      title: "",
      authorAvatar: "",
      content: "",
      category: "",
      postID: null
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

  handleSortInputChange = (event) => {
    const value = event.target.value
    this.setState({ sortOrder: value }, () => this.sortPosts(value))
  }

  sortPosts = (order) => {
    const posts = this.state.posts

    switch(order) {
      case "Oldest":
        posts.sort((a, b) => a.postID > b.postID ? 1 : -1)
        break;
      case "Newest":
        posts.sort((a, b) => a.postID < b.postID ? 1 : -1)
        break;
      case "MostUpvotes":
        posts.sort((a, b) => a.numUpvotes < b.numUpvotes ? 1 : -1)
        break;
      case "BestRated":
        posts.sort((a, b) => a.numUpvotes-a.numDownvotes < b.numUpvotes-b.numDownvotes ? 1 : -1)
    }

    this.setState({ posts: posts })
  }

  addPost = (username) => {
    const postList = this.state.posts
    const maxValue = Math.max.apply(Math, postList.map(function(p) { return p.postID; }))
    const newID = (postList.length === 0) ? 1 : maxValue + 1

    const newPost = {
      author: username,
      authorUsertype: this.state.userInfo.usertype,
      title: this.state.title,
      authorAvatar: null,
      content: this.state.content,
      category: this.state.category,
      postID: newID,
      numUpvotes: 0,
      numDownvotes: 0,
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
    this.sortPosts(this.state.sortOrder)
  }

  changeCategory = (_category) => {
    this.setState({
      category: _category
    })
  }

  postComment = (target) => {
    const targetPostID = target.postID
    console.log(targetPostID)
    const targetPostIndex = this.state.posts.findIndex(post => post.postID === targetPostID)
    
    const targetPost = this.state.posts.filter((p) => { return p.postID === targetPostID })
    const targetPostComments = targetPost[0].comments

    const newComment = {
      commenter: this.props.username,
      commentContent: target.comment
    }

    targetPostComments.push(newComment)
    targetPost[0].comments = targetPostComments
    
    const otherPosts = this.state.posts.filter((p) => { return p.postID !== targetPostID })

    otherPosts.splice(targetPostIndex, 0, targetPost[0])

    this.setState({ posts: otherPosts })
  }

  deletePosts = (target) => {
    console.log("deleting post")
    const targetPostID = target.postID
    const otherPosts = this.state.posts.filter((p) => { return p.postID !== targetPostID })
    console.log("posts length: ", otherPosts.length)
    this.setState({ posts: otherPosts })

    const userInfo = this.state.userInfo
    const index = userInfo.userUpvotedPosts.indexOf(targetPostID)
    if (index !== -1) {
      userInfo.userUpvotedPosts.splice(index, 1)
      this.setState({ userInfo: userInfo })
    }
  }

  addUpvote = (target) => {
    console.log("adding upvotes")
    const targetPostID = target.postID
    const targetPostIndex = this.state.posts.findIndex(post => post.postID === targetPostID)
    const targetPost = this.state.posts.filter((p) => { return p.postID === targetPostID })
    targetPost[0].numUpvotes = targetPost[0].numUpvotes + 1
    const otherPosts = this.state.posts.filter((p) => { return p.postID !== targetPostID })
    otherPosts.splice(targetPostIndex, 0, targetPost[0])
    this.setState({ posts: otherPosts })

    const userInfo = this.state.userInfo
    userInfo.userUpvotedPosts.push(targetPostID)
    this.setState({ userInfo: userInfo })
  }

  minusUpvote = (target) => {
    console.log("subtracting upvotes")
    const targetPostID = target.postID
    const targetPostIndex = this.state.posts.findIndex(post => post.postID === targetPostID)
    const targetPost = this.state.posts.filter((p) => { return p.postID === targetPostID })
    targetPost[0].numUpvotes = targetPost[0].numUpvotes - 1
    const otherPosts = this.state.posts.filter((p) => { return p.postID !== targetPostID })
    otherPosts.splice(targetPostIndex, 0, targetPost[0])
    this.setState({ posts: otherPosts })

    const userInfo = this.state.userInfo
    const index = userInfo.userUpvotedPosts.indexOf(targetPostID)
    if (index !== -1) userInfo.userUpvotedPosts.splice(index, 1)
    this.setState({ userInfo: userInfo })
  }

  addDownvote = (target) => {
    console.log("adding downvotes")
    const targetPostID = target.postID
    const targetPostIndex = this.state.posts.findIndex(post => post.postID === targetPostID)
    const targetPost = this.state.posts.filter((p) => { return p.postID === targetPostID })
    targetPost[0].numDownvotes = targetPost[0].numDownvotes + 1
    const otherPosts = this.state.posts.filter((p) => { return p.postID !== targetPostID })
    otherPosts.splice(targetPostIndex, 0, targetPost[0])
    this.setState({ posts: otherPosts })

    const userInfo = this.state.userInfo
    userInfo.userDownvotedPosts.push(targetPostID)
    this.setState({ userInfo: userInfo })
  }

  minusDownvote = (target) => {
    console.log("subtracting downvotes")
    const targetPostID = target.postID
    const targetPostIndex = this.state.posts.findIndex(post => post.postID === targetPostID)
    const targetPost = this.state.posts.filter((p) => { return p.postID === targetPostID })
    targetPost[0].numDownvotes = targetPost[0].numDownvotes - 1
    const otherPosts = this.state.posts.filter((p) => { return p.postID !== targetPostID })
    otherPosts.splice(targetPostIndex, 0, targetPost[0])
    this.setState({ posts: otherPosts })

    const userInfo = this.state.userInfo
    const index = userInfo.userDownvotedPosts.indexOf(targetPostID)
    if (index !== -1) userInfo.userDownvotedPosts.splice(index, 1)
    this.setState({ userInfo: userInfo })
  }

  render() {

    const { username } = this.props
    const { classes } = this.props

    return (
        <div>
          <Container maxWidth="xl">
            <Card className={ classes.forumTopChunk }>
              <CardActions className={ classes.forumTopBar }>
                <FormControl className={ classes.filter }> 
                  <InputLabel>Filter Posts</InputLabel>
                  <Select onChange={ this.handleFilterInputChange }>
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="Announcement">Announcement</MenuItem>
                    <MenuItem value="Question">Question</MenuItem>
                    <MenuItem value="Opinion">Opinion</MenuItem>
                  </Select>
                </FormControl>

                <FormControl className={ classes.filter }>
                  <InputLabel>Sort By</InputLabel>
                  <Select onChange={ this.handleSortInputChange }>
                    <MenuItem value="Oldest">Oldest</MenuItem>
                    <MenuItem value="Newest">Newest</MenuItem>
                    <MenuItem value="MostUpvotes">Most Upvotes</MenuItem>
                    <MenuItem value="BestRated">Best Rated</MenuItem>
                  </Select>
                </FormControl>

                <Grid Container justify="flex-end">
                  { this.state.openManagePost === true || this.state.openNewPost === true ? 
                    <Tooltip title="Add Post">
                      <Fab color="primary" size="small" onClick={ this.handleClickOpen } disabled>
                        <AddIcon fontSize="large"/>
                      </Fab>
                    </Tooltip>
                    :
                    <Tooltip title="Add Post">
                      <Fab color="primary" size="small" onClick={ this.handleClickOpen }>
                        <AddIcon fontSize="large"/>
                      </Fab>
                    </Tooltip>
                  }
                  { this.state.openManagePost ? 
                    <Button className={ classes.forumBarButton } color="primary" variant="contained" onClick={ this.handleClickManageDone }>
                    Done
                    </Button> : 
                    <Button className={ classes.forumBarButton } color="primary" variant="contained" onClick={ this.handleClickManage }>
                    Manage Posts
                    </Button> 
                  }
                </Grid>
                
              </CardActions>
              
              { this.state.openNewPost ? 
              <React.Fragment>
                <CardContent>
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
                  <br></br>
                  <br></br>
                  <Typography>Category:</Typography>
                  <br></br>
                  
                  <ButtonGroup color="primary" aria-label="outlined primary button group" fullWidth>
                    <Button variant={ this.state.category === "Announcement" ? "contained" : "outlined"} onClick={ () => this.changeCategory("Announcement") }>Announcement</Button>
                    <Button variant={ this.state.category === "Question" ? "contained" : "outlined"} onClick={ () => this.changeCategory("Question") }>Question</Button>
                    <Button variant={ this.state.category === "Opinion" ? "contained" : "outlined"} onClick={ () => this.changeCategory("Opinion") }>Opinion</Button>
                  </ButtonGroup>
                  <br></br>
                  <br></br>
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
                </CardContent>

                <CardActions>
                  <Button onClick={ this.handleClose } color="primary">
                    Cancel
                  </Button>
                  <Button onClick={ () => this.addPost(username) } color="primary" disabled={ this.state.title !== "" && this.state.content !== "" && this.state.category !== "" ? false : true}>
                    Post
                  </Button>
                </CardActions>
              </React.Fragment>
              : null }
              
            </Card>
              
            <List className={ classes.forumList }>
              { this.state.posts.map((thread) => {
                  if (this.state.openManagePost ? this.state.postFilter === "" && thread.author === username : this.state.postFilter === "") {
                    return (
                      <div>
                        <ForumListItem postTitle={ thread.title }
                                      postAuthor={ thread.author }
                                      postAuthorUsertype={ thread.authorUsertype}
                                      postTextContent={ thread.content }
                                      avatar={ thread.authorAvatar }
                                      category={ thread.category }
                                      comments={ thread.comments }
                                      postID={ thread.postID }
                                      openManagePost={ this.state.openManagePost ? true : false }
                                      numUpvotes={ thread.numUpvotes }
                                      numDownvotes={ thread.numDownvotes }
                                      userInfo={ this.state.userInfo }
                                      addUpvote={ this.addUpvote }
                                      minusUpvote={ this.minusUpvote }
                                      addDownvote={ this.addDownvote }
                                      minusDownvote={ this.minusDownvote }
                                      deletePosts={ this.deletePosts }
                                      postComment={ this.postComment }/>
                        { this.state.posts[this.state.posts.length - 1] === thread ? null : <Divider variant="inset" component="li" />}
                      </div>
                    )
                  }
                  else if (this.state.openManagePost ? this.state.postFilter === thread.category && thread.author === username : this.state.postFilter === thread.category) {
                    return (
                      <div>
                        <ForumListItem postTitle={ thread.title }
                                      postAuthor={ thread.author }
                                      postAuthorUsertype={ thread.authorUsertype}
                                      postTextContent={ thread.content }
                                      avatar={ thread.authorAvatar }
                                      category={ thread.category }
                                      comments={ thread.comments }
                                      postID={ thread.postID }
                                      openManagePost={ this.state.openManagePost ? true : false }
                                      numUpvotes={ thread.numUpvotes }
                                      numDownvotes={ thread.numDownvotes }
                                      userInfo={ this.state.userInfo }
                                      addUpvote={ this.addUpvote }
                                      minusUpvote={ this.minusUpvote }
                                      addDownvote={ this.addDownvote }
                                      minusDownvote={ this.minusDownvote }
                                      deletePosts={ this.deletePosts }
                                      postComment={ this.postComment }/>
                        { this.state.posts[this.state.posts.length - 1] === thread ? null : <Divider variant="inset" component="li" />}
                      </div>
                    )
                  }
                })
              }
            </List>
          </Container>
        </div>
    )
  }
}

export default withStyles(styles)(ForumList);
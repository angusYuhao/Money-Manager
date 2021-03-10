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
  root: {
    flexGrow: 1,
    marginLeft: 50,
  },
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
  },
  purpleText: {
    color: deepPurple[500],
    fontSize: 30
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
      },
      {author: 'Angela Merkel', 
        authorUsertype: "FA",
        title: 'Best thread ever', 
        content: 'testing again testing again testing again testing again testing again testing again testing again testing again testing again testing again testing again testing again testing again testing again testing again testing again testing again testing again testing again testing again testing again testing again testing again testing again testing again testing again testing again testing again testing again', 
        authorAvatar: null,
        category: "Question",
        postID: 3,
        numUpvotes: 30,
        numDownvotes: 5,
        comments: [
        {commenter: "Angus Wang4",
          commentContent: "It is I, Angus Wang, once again! hohohohoh hohohohohooh lmao3"},
        {commenter: "Dude with an attitude2",
          commentContent: "The Communist Manifesto, originally the Manifesto of the Communist Party (German: Manifest der Kommunistischen Partei), is an 1848 political document by German philosophers Karl Marx and Friedrich Engels. Commissioned by the Communist League and originally published in London just as the Revolutions of 1848 began to erupt, the Manifesto was later recognised as one of the world's most influential political documents. It presents an analytical approach to the class struggle (historical and then-present) and the conflicts of capitalism and the capitalist mode of production, rather than a prediction of communism's potential future forms."}
        ]
      },
      {author: 'dragonslayer420', 
        authorUsertype: "FA",
        title: 'Another awesome thread', 
        content: 'The art of dragon slaying The art of dragon slaying The art of dragon slaying The art of dragon slaying The art of dragon slaying The art of dragon slaying The art of dragon slaying The art of dragon slaying The art of dragon slaying The art of dragon slaying The art of dragon slaying The art of dragon slaying The art of dragon slaying The art of dragon slaying The art of dragon slaying The art of dragon slaying The art of dragon slaying The art of dragon slaying The art of dragon slaying ', 
        authorAvatar: null,
        category: "Question",
        postID: 4,
        numUpvotes: 40,
        numDownvotes: 20,
        comments: [
        {commenter: "Lord of the rings",
          commentContent: "This truly is the greatest post, many thanks!"},
        {commenter: "Claude Debussy",
          commentContent: "This thread is pure garbage, please don't ever post again."}
        ]
      },
      {author: 'Random dude', 
        authorUsertype: "RU",
        title: 'Unpopular Opinions are unpopular for a reason', 
        content: 'The title says it all!', 
        authorAvatar: null,
        category: "Opinion",
        postID: 5,
        numUpvotes: 1,
        numDownvotes: 50,
        comments: [
        {commenter: "Unpopular Opinion",
          commentContent: "This is an insult, I will have to report this thread"}
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
      authorUsertype: this.props.userInfo.usertype,
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

    const userInfo = this.props.userInfo
    const indexu = userInfo.userUpvotedPosts.indexOf(targetPostID)
    const indexd = userInfo.userDownvotedPosts.indexOf(targetPostID)
    const indexs = userInfo.userSavedPosts.indexOf(targetPostID)
    if (indexu !== -1) {
      userInfo.userUpvotedPosts.splice(indexu, 1)
      this.props.userInfoUpdater(userInfo)
    }
    if (indexd !== -1) {
      userInfo.userDownvotedPosts.splice(indexd, 1)
      this.props.userInfoUpdater(userInfo)
    }
    if (indexs !== -1) {
      userInfo.userSavedPosts.splice(indexs, 1)
      this.props.userInfoUpdater(userInfo)
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

    const userInfo = this.props.userInfo
    userInfo.userUpvotedPosts.push(targetPostID)
    // this.setState({ userInfo: userInfo })
    this.props.userInfoUpdater(userInfo)
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

    const userInfo = this.props.userInfo
    const index = userInfo.userUpvotedPosts.indexOf(targetPostID)
    if (index !== -1) userInfo.userUpvotedPosts.splice(index, 1)
    // this.setState({ userInfo: userInfo })
    this.props.userInfoUpdater(userInfo)
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

    const userInfo = this.props.userInfo
    userInfo.userDownvotedPosts.push(targetPostID)
    // this.setState({ userInfo: userInfo })
    this.props.userInfoUpdater(userInfo)
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

    const userInfo = this.props.userInfo
    const index = userInfo.userDownvotedPosts.indexOf(targetPostID)
    if (index !== -1) userInfo.userDownvotedPosts.splice(index, 1)
    // this.setState({ userInfo: userInfo })
    this.props.userInfoUpdater(userInfo)
  }

  render() {

    const { userInfo, FAInfo, userInfoUpdater, sidebarToggle } = this.props
    const { classes } = this.props

    let mainList;

    if (sidebarToggle === "Home") {

      mainList = <List className={ classes.forumList }>
        { this.state.posts.map((thread) => {
            if (this.state.openManagePost ? (userInfo.usertype === "FA" ? this.state.postFilter === "" : this.state.postFilter === "" && thread.author === userInfo.username) : this.state.postFilter === "") {
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
                                userInfo={ userInfo }
                                FAInfo={ FAInfo }
                                userInfoUpdater={ userInfoUpdater }
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
            else if (this.state.openManagePost ? (userInfo.usertype === "FA" ? this.state.postFilter === thread.category : this.state.postFilter === thread.category && thread.author === userInfo.username) : this.state.postFilter === thread.category) {
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
                                userInfo={ userInfo }
                                FAInfo={ FAInfo }
                                userInfoUpdater={ userInfoUpdater }
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
    }
    else if (sidebarToggle === "Followed Posts") {
      mainList = <List className={ classes.forumList }>
        { this.state.posts.map((thread) => {
            if (this.state.postFilter === "" && userInfo.userFollows.includes((FAInfo.filter((FA) => {return FA.FAName === thread.author}))[0])) {
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
                                userInfo={ userInfo }
                                FAInfo={ FAInfo }
                                userInfoUpdater={ userInfoUpdater }
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
            else if (this.state.postFilter === thread.category && userInfo.userFollows.includes((FAInfo.filter((FA) => {return FA.FAName === thread.author}))[0])) {
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
                                userInfo={ userInfo }
                                FAInfo={ FAInfo }
                                userInfoUpdater={ userInfoUpdater }
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
    }
    else if (sidebarToggle === "Liked Posts") {
      mainList = <List className={ classes.forumList }>
        { this.state.posts.map((thread) => {
            if (this.state.postFilter === "" && userInfo.userUpvotedPosts.includes(thread.postID)) {
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
                                userInfo={ userInfo }
                                FAInfo={ FAInfo }
                                userInfoUpdater={ userInfoUpdater }
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
            else if (this.state.postFilter === thread.category && userInfo.userUpvotedPosts.includes(thread.postID)) {
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
                                userInfo={ userInfo }
                                FAInfo={ FAInfo }
                                userInfoUpdater={ userInfoUpdater }
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
    }
    else if (sidebarToggle === "Saved Posts") {
      mainList = <List className={ classes.forumList }>
        { this.state.posts.map((thread) => {
            if (this.state.postFilter === "" && userInfo.userSavedPosts.includes(thread.postID)) {
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
                                userInfo={ userInfo }
                                FAInfo={ FAInfo }
                                userInfoUpdater={ userInfoUpdater }
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
            else if (this.state.postFilter === thread.category && userInfo.userSavedPosts.includes(thread.postID)) {
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
                                userInfo={ userInfo }
                                FAInfo={ FAInfo }
                                userInfoUpdater={ userInfoUpdater }
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
    }

    return (
        <div className={ classes.root }>
          <Container maxWidth="xl">
            <Card className={ classes.forumTopChunk }>
              <CardActions className={ classes.forumTopBar }>
                <CardContent>
                  <span className={ classes.purpleText } > { sidebarToggle } </span>
                </CardContent>

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
                  { this.state.openManagePost === true || this.state.openNewPost === true || sidebarToggle !== "Home" ? 
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
                    </Button> : (sidebarToggle === "Home" ? 
                    <Button className={ classes.forumBarButton } color="primary" variant="contained" onClick={ this.handleClickManage }>
                      Manage Posts
                    </Button> : 
                    <Button className={ classes.forumBarButton } color="primary" variant="contained" disabled>
                      Manage Posts
                    </Button> )
                    
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
                  <Button onClick={ () => this.addPost(userInfo.username) } color="primary" disabled={ this.state.title !== "" && this.state.content !== "" && this.state.category !== "" ? false : true}>
                    Post
                  </Button>
                </CardActions>
              </React.Fragment>
              : null }
              
            </Card>

            {mainList}
              
          </Container>
        </div>
    )
  }
}

export default withStyles(styles)(ForumList);
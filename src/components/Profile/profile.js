import React from 'react';
import { Typography, 
        Grid,
        Paper,
        AppBar,
        Toolbar,
        Button,
        Drawer,
        withStyles, 
        createMuiTheme,
        Tab,
        Tabs,
        Avatar,
        ThemeProvider, 
        List,
        Dialog,
        DialogTitle,
        Divider} from '@material-ui/core';
import { deepPurple } from '@material-ui/core/colors';
import { Link } from 'react-router-dom';
import ForumListItem from './forumListItemOld.js';
import PostAddIcon from '@material-ui/icons/PostAdd';
import Edit from './edit.js';
import Done from './done.js';
import Draggable from 'react-draggable';
import { followingData, followerData } from './data';
import Followers from './followers.js';
import Following from './following.js';
import HandleClosing from './handleClosing.js';

const drawerWidth = 400;

const useStyles = theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        background: deepPurple[50],
    },
    drawerContainer: {
        overflow: 'auto',
    },
    content: {
        marginTop: theme.spacing(3),
    },
    numberGroup: {
        paddingLeft: theme.spacing(10),
    },
    tabs: {
        marginLeft: theme.spacing(3),
    },
    avatar: {
        height: '100px',
        width: '100px',
        fontSize: '2em',
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(18.5),
        backgroundColor: deepPurple[800],
    },
    editButton: {
        float: 'right',
        marginTop: theme.spacing(10),
        marginRight: theme.spacing(10),
    },
    doneButton: {
        float: 'right',
        marginTop: theme.spacing(2),
        marginRight: theme.spacing(3),
        marginBottom: theme.spacing(3),
    },
    logoutButton: {
        float: 'right',
        marginTop: theme.spacing(10),
        marginRight: theme.spacing(3),
    },
    group: {
        float: 'right',
        marginRight: theme.spacing(20),
    },
    group1: {
        float: 'right',
        marginRight: theme.spacing(3),
    },
    name: {
        fontWeight: 'bold',
        fontSize: '1.6em',
        borderBottom: 'none',
    },
    textfield: {
        minWidth: 340,
    },
    number: {
        marginLeft: theme.spacing(3),
    },
    number1: {
        marginLeft: theme.spacing(2),
    },
    post: {
        marginTop: theme.spacing(10),
        marginLeft: theme.spacing(3),
    },
    nothing: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(30),
    },
    postIcon: {
        fontSize: '5em',
        position: 'relative',
        marginTop: theme.spacing(10),
        left: '50%',
    },
    forumList: {
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
        margin: theme.spacing(3),
    },
    removeLine: {
        textDecoration: 'none',
        color: 'black'
    },
    followersButton: {
        marginLeft: theme.spacing(3),
        fontSize: '1.2em',
        minWidth: 150,
    },
    followingButton: {
        fontSize: '1.2em',
        minWidth: 150,
    },
    postButton: {
        fontSize: '1.2em',
        minWidth: 150,
        marginRight: theme.spacing(5),
    },
    follow: {
        float: 'right',
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
        marginBottom: theme.spacing(1),
    },
    unfollow: {
        float: 'right',
    },
    followerdata: {
        float: 'left',
        marginLeft: theme.spacing(3),
        marginBottom: theme.spacing(1),
    },
    paper: {
        width: '80%',
        maxHeight: 435,
    },
    
})

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

// Code taken from the material-ui website, under draggable dialog
function PaperComponent(props) {
    return (
      <Draggable handle="#draggable" cancel={'[class*="MuiDialogContent-root"]'}>
        <Paper {...props} />
      </Draggable>
    );
}

// All the profile information should be fetched from the database
// that stores the user information
class Profile extends React.Component {

    state = {
        // if false, display edit; if true, display Done
        followerData: followerData,
        followingData: followingData,
        edit: false,
        logout: false,
        openFollowers: false,
        openFollowing: false,
        followed: false,
        userLevel: "",
        avatar: "",
        bio: "An individual that is pursuing one's passions.",
        username: "user",
        name: "User X",
        email: "user@123.com",
        occupation: "student",
        birthday: "2021-03-08",
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
        userInfo: {
            username: "",
            usertype: "",
            userUpvotedPosts: [],
            userDownvotedPosts: [],
            userFollows: [],
        },
        posts:  "",
    }

    // Check the state of the edit, and changes UI accordingly
    handleEdit = () => {
        this.setState({
            edit: !this.state.edit,
        })
    }

    // Change the state of openFollowers, this is for opening 
    // the dialog
    handleFollowersOpen = () => {
        this.state.openFollowers = true;
        this.setState({
            openFollowers: this.state.openFollowers,
        })
    }

    // Change the state of openFollowers, this is for closing 
    // the dialog
    handleFollowersClose = () => {
        this.state.openFollowers = false;

        this.setState({
            openFollowers: this.state.openFollowers,
        })
    }

    // Change the state of openFollowing, this is for opening 
    // the dialog
    handleFollowingOpen = () => {
        this.state.openFollowing = true;
        this.setState({
            openFollowing: this.state.openFollowing,
        })
    }

    // Change the state of openFollowing, this is for closing 
    // the dialog
    handleFollowingClose = () => {
        this.state.openFollowing = false;
        this.setState({
            openFollowing: this.state.openFollowing,
        })
    }

    /********************************************************************************
    for phase 2, you would be making a server call to check the list of followers
    and its following state
    *********************************************************************************/
    handleFollow = (wantToFollow) => {
        const index = this.state.followerData.indexOf(wantToFollow);
        this.state.followingData.push(wantToFollow)
        this.state.followerData[index]["following"] = true;
        this.setState({
            followerData: this.state.followerData,
            followingData: this.state.followingData
        })
    }

    /********************************************************************************
    for phase 2, you would be making a server call to check the list of followers
    and its following state
    *********************************************************************************/
    handleUnfollow = (wantToUnfollow) => {
        const index = this.state.followerData.indexOf(wantToUnfollow)
        console.log(index)
        const keep = this.state.followingData.filter(f => f["id"] != wantToUnfollow["id"])
        this.state.followingData = keep
        this.state.followerData[index]["following"] = false;
        this.setState({
            followerData: this.state.followerData,
            followingData: this.state.followingData
        })
    }

    /********************************************************************************
    for phase 2, you would be making a server call to check the list of following users
    and its following state
    *********************************************************************************/
    handleFollowing = (wantToFollow) => {
        const index = this.state.followingData.indexOf(wantToFollow)
        console.log(index)
        this.state.followingData[index]["following"] = true;
        this.setState({
            followingData: this.state.followingData,
        })
    }

    /********************************************************************************
    for phase 2, you would be making a server call to check the list of following users
    and its following state
    *********************************************************************************/
    handleUnfollowing = (wantToUnfollow) => {
        const index = this.state.followingData.indexOf(wantToUnfollow)
        console.log(index)
        const keep = this.state.followingData.filter(f => f != wantToUnfollow)
        this.state.followingData = keep
        const changeFollowingStatus = this.state.followerData.filter(f => f["id"] == wantToUnfollow["id"])
        const indexForChangingFollowingStatus = this.state.followerData.indexOf(changeFollowingStatus[0])
        if (indexForChangingFollowingStatus != -1) this.state.followerData[indexForChangingFollowingStatus]["following"] = false
        
        this.setState({
            followingData: this.state.followingData,
            followerData: this.state.followerData
        })
    }

    handleInputChange = (event) => {
    
        // get the value we type in 
        const target = event.target;
        const value = target.value;
        const name = target.name;
        
        /********************************************************************************
        for phase 2, you would be making a server call to get the username of the post
        author, and update the avatar, author, or commenter accordingly
        *********************************************************************************/
        if(name == "username") {
            for(let i = 0; i < this.state.posts.length; i++) {
                this.state.posts[i].author = value;
                this.state.posts[i].authorAvatar = value.charAt(0).toUpperCase();
            }
            this.state.avatar = value.charAt(0).toUpperCase();
            this.state.author = value;
            this.state.commenter = value;
        }
        // state is updated and value is also updated in JSX
        // the square bracket dynamically changes the name 
        this.setState({
          [name]: value
        })
    };

    // These code are taken from ForumList, check ForumList for more details
    postComment = (target) => {
        const targetPostID = target.postID
        console.log(targetPostID)
        const targetPostIndex = this.state.posts.findIndex(post => post.postID === targetPostID)
        
        const targetPost = this.state.posts.filter((p) => { return p.postID === targetPostID })
        const targetPostComments = targetPost[0].comments
    
        const newComment = {
          commenter: this.state.commenter,
          commentContent: target.comment
        }
    
        targetPostComments.push(newComment)
        targetPost[0].comments = targetPostComments
        
        const otherPosts = this.state.posts.filter((p) => { return p.postID !== targetPostID })
    
        otherPosts.splice(targetPostIndex, 0, targetPost[0])
    
        this.setState({ posts: otherPosts })
    }

    // These code are taken from ForumList, check forumList for more details
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

    // These code are taken from ForumList, check forumList for more details
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

    // These code are taken from ForumList, check forumList for more details
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

    // These code are taken from ForumList, check forumList for more details
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

    // These code are taken from ForumList, check forumList for more details
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

    // Mount the current user state passed in from the app.js
    componentDidMount() {
        this.changeUserState();
    }

    // All of these data will not be hardcoded and will be fetched from a database
    /********************************************************************************
    for phase 2, you would be making a server call to get the user information and 
    update the state accordingly, will also fetch its corresponded posts
    *********************************************************************************/
    changeUserState = () => {
        if(this.state.userLevel === "User") {
            this.state.avatar = "U";
            this.state.bio = "An individual that is pursuing one's passions.";
            this.state.username = "user";
            this.state.name = "User X";
            this.state.email = "user@123.com";
            this.state.occupation = "Student";
            this.state.birthday = "2021-03-08";
            this.state.commenter = "User";
            this.state.posts = [
                {author: 'User', 
                authorUsertype: "RU",
                title: 'Welcome to communtiy', 
                content: 'this is the first community thread', 
                authorAvatar: "U",
                category: "Announcement",
                postID: 1,
                numUpvotes: 5,
                numDownvotes: 1,
                comments: [
                {commenter: "User2",
                    commentContent: "This is a great post"},
                {commenter: "User3",
                    commentContent: "This is a bad post"}
                ]
                },
                {author: 'User', 
                authorUsertype: "RU",
                title: 'My second post', 
                content: 'This is the second post ever!!!!!!!', 
                authorAvatar: "U",
                category: "Opinion",
                postID: 2,
                numUpvotes: 4,
                numDownvotes: 2,
                comments: [
                {commenter: "Financial Advisor3",
                    commentContent: "You should come to my page to learn about financials"},
                {commenter: "User4",
                    commentContent: "Go buy GME!"}
                ]
                }
            ];
            this.setState({
                avatar: this.state.avatar,
                bio: this.state.bio,
                username: this.state.username,
                name: this.state.name,
                email: this.state.email,
                occupation: this.state.occupation,
                birthday: this.state.birthday,
                posts: this.state.posts,
                commenter: this.state.commenter,
            })
            
        } else if(this.state.userLevel === "Financial Advisor") {
            this.state.avatar = "A";
            this.state.bio = "A certified financial advisor, dedicated to help others";
            this.state.username = "admin";
            this.state.name = "Admin X";
            this.state.email = "admin@123.com";
            this.state.occupation = "Financial advisor";
            this.state.birthday = "2021-03-08";
            this.state.commenter = "Admin";
            this.state.posts = [
                {author: 'Admin', 
                authorUsertype: "FA",
                title: 'Welcome to communtiy', 
                content: 'I am the financial advisor', 
                authorAvatar: "A",
                category: "Announcement",
                postID: 1,
                numUpvotes: 5,
                numDownvotes: 1,
                comments: [
                {commenter: "User2",
                    commentContent: "This is a great post"},
                {commenter: "User3",
                    commentContent: "This is a bad post"}
                ]
                },
                {author: 'Admin', 
                authorUsertype: "FA",
                title: 'My second post', 
                content: 'I am here to provide you guys with some help in financing', 
                authorAvatar: "A",
                category: "Opinion",
                postID: 2,
                numUpvotes: 4,
                numDownvotes: 2,
                comments: [
                {commenter: "Financial Advisor3",
                    commentContent: "You should come to my page to learn about financials"},
                {commenter: "User4",
                    commentContent: "Go buy GME!"}
                ]
                }
            ];
            this.setState({
                avatar: this.state.avatar,
                bio: this.state.bio,
                username: this.state.username,
                name: this.state.name,
                email: this.state.email,
                occupation: this.state.occupation,
                birthday: this.state.birthday,
                posts: this.state.posts,
                commenter: this.state.commenter,
            })
        }
    }

    render() {
        const { classes, username, handleLogOut, password, userLevel } = this.props;

        if(userLevel === "User") {
            this.state.userLevel = "User"
        } else if(userLevel === "Financial Advisor") {
            this.state.userLevel = "Financial Advisor"
        }

        return ( 
            <ThemeProvider theme={theme}>
                <div className={classes.root}>
                    { this.state.userLevel === "User" ? 
                        <AppBar color="secondary" position="fixed" className={classes.appBar}>
                            <Toolbar>
                                <Typography variant='h6' noWrap>
                                    Profile
                                </Typography>

                                <Tabs inkBarStyle={{background: 'black'}} centered>
                    
                                    <Link to={'/spendings'} className={classes.tabs, classes.removeLine}>
                                        <Tab label="Spendings"/>
                                    </Link>

                                    <Link to={'/investments'}  className={classes.tabs, classes.removeLine}>
                                        <Tab label="Investments"/>
                                    </Link>
                                    
                                    <Link to={'/community'} className={classes.tabs, classes.removeLine}>
                                        <Tab label="Community"/>
                                    </Link>

                                </Tabs>
                            </Toolbar>
                        </AppBar>
                        :
                        <AppBar color="secondary" position="fixed" className={classes.appBar}>
                            <Toolbar>
                                <Typography variant='h6' noWrap>
                                    Profile
                                </Typography>

                                <Tabs inkBarStyle={{background: 'black'}} centered>
                                    <Link to={'/community'} className={classes.tabs, classes.removeLine}>
                                        <Tab label="Community"/>
                                    </Link>
                                </Tabs>
                            </Toolbar>
                        </AppBar>
                    }
                    <Drawer className={classes.drawer} 
                            variant="permanent"
                            anchor="left"
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                    >
                        <Toolbar />
                        <div className={classes.drawerContainer}>
                            <Avatar align="center"
                                    name="avatar"
                                    value={this.state.avatar}
                                    className={classes.avatar}>{ this.state.avatar }</Avatar>

                            { this.state.edit ? 
                                <Edit 
                                    handleInputChange={ this.handleInputChange }
                                    username={ this.state.username }
                                    name={ this.state.name }
                                    email={ this.state.email }
                                    occupation={ this.state.occupation }
                                    birthday={ this.state.birthday }
                                    bio={ this.state.bio }
                                />
                                :
                                <Done  
                                    username={ this.state.username }
                                    name={ this.state.name }
                                    email={ this.state.email }
                                    occupation={ this.state.occupation }
                                    birthday={ this.state.birthday }
                                    bio={ this.state.bio } 
                                />    
                            }
                            
                            { this.state.edit ? 
                                <Button onClick={ this.handleEdit }
                                        color="primary" 
                                        variant="contained" 
                                        className={classes.doneButton}>
                                    Done
                                </Button>
                            :
                            <div>
                                <Button onClick={ this.handleEdit }
                                        color="primary" 
                                        variant="contained" 
                                        className={classes.editButton}>
                                    Edit Profile
                                </Button>
                                <Link to={"/"}>
                                    <Button onClick={ () => handleLogOut() }
                                            color="primary" 
                                            variant="contained" 
                                            className={classes.logoutButton}>
                                        Log Out
                                    </Button>
                                </Link>
                            </div>
                            }
                        </div>
                    </Drawer>
                   
                    <main className={classes.content}>
                        <Grid container direction="row" className={classes.numberGroup}>
                            <div className={classes.group}>
                                <Button variant="contained" color="primary" className={classes.followersButton} onClick={ this.handleFollowersOpen }>
                                    Followers
                                    <br></br>
                                    { this.state.followerData.length }
                                </Button>
                                <Dialog open={ this.state.openFollowers } 
                                        onClose={ this.handleFollowersClose }  
                                        PaperComponent={PaperComponent}
                                        aria-labelledby="draggable"
                                        className={classes.dialog}
                                        classes={{
                                            paper: classes.paper,
                                        }}
                                        >
                                    <DialogTitle style={{ cursor: 'move' }} id="draggable">
                                        Followers
                                    </DialogTitle>
                                    
                                    { this.state.followerData.map((followerData) => (
                                        <Followers followerData={followerData} handleFollow={ this.handleFollow } handleUnfollow={ this.handleUnfollow } />
                                    ))}
                                    
                                    <HandleClosing handleClose={ this.handleFollowersClose } />
                                </Dialog>
                            </div>
                            <div className={classes.group}>
                                <Button variant="contained" color="primary" className={classes.followingButton} onClick={ this.handleFollowingOpen }>
                                    Following
                                    <br></br>
                                    { this.state.followingData.length }
                                </Button>
                                <Dialog open={ this.state.openFollowing } 
                                        onClose={ this.handleFollowingClose }  
                                        PaperComponent={ PaperComponent }
                                        aria-labelledby="draggable"
                                        classes={{
                                            paper: classes.paper,
                                        }}
                                        >
                                    <DialogTitle style={{ cursor: 'move' }} id="draggable">
                                        Following
                                    </DialogTitle>

                                    { this.state.followingData.map((followingData) => (
                                        <Following followingData={followingData} handleFollow={ this.handleFollowing } handleUnfollow={ this.handleUnfollowing } />
                                    ))}

                                    <HandleClosing handleClose={ this.handleFollowingClose } />
                                </Dialog>
                            </div>
                            <div className={classes.group1}>
                                <Button variant="contained" color="primary" className={classes.postButton}>
                                    Posts
                                    <br></br>
                                    { this.state.posts.length }
                                </Button>
                            </div>    
                        </Grid>

                        <div>
                            <Typography variant='h5' className={classes.post}>
                                My posts:
                            </Typography>

                            { this.state.posts == "" ? 
                                <div>
                                    <PostAddIcon className={classes.postIcon}/>
                                    <Typography variant='h5' className={classes.nothing}>
                                        You don't have anything posted yet. Go post something!
                                    </Typography>
                                </div>
                                :
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
                                    })
                                }
                                </List>
                            }
                            
                        </div>
                    </main> 
                </div>
            </ThemeProvider>
        )
    }
}

export default withStyles(useStyles)(Profile);
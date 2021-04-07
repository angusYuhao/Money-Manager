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
        Divider,
        ButtonGroup} from '@material-ui/core';
import { deepPurple } from '@material-ui/core/colors';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import ForumListItem from './forumListItemOld.js';
import PostAddIcon from '@material-ui/icons/PostAdd';
import Edit from './edit.js';
import Done from './done.js';
import Draggable from 'react-draggable';
import { followingData, followerData } from './data';
import Followers from './followers.js';
import Following from './following.js';
import HandleClosing from './handleClosing.js';
import { logout, updateFAInfo, updateProfile, updateProfileField } from '../../actions/user.js';
import { getPostsdb } from '../Community/actions.js';

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
    dialogue_cursor: {
        cursor: 'move'
    },
    postSection: {
        paddingLeft: '10%'
    }
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

    // logs out the user
    logoutUser = (app) => {
        this.props.history.push("/");
        logout(app);
    };

    constructor(props) {
        super(props);

        this.state = {
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
            bio: "",
            username: "",
            name: "",
            email: "",
            occupation: "",
            birthday: "",
            FAName: "",
            FAIntro: "",
            FAFields: "",
            FAPoints: "",
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
            posts: [],
            displayPostCat: "My Posts",
        }
    }

    componentDidMount() {
        this.setState({
            avatar: this.props.user.username[0],
            username: this.props.user.username,
            email: this.props.user.email,
            occupation: this.props.user.occupation,
            birthday: this.props.user.birthday,
            bio: this.props.user.bio,
            userLevel: this.props.user.userLevel,
            FAName: this.props.user.firstName + " " + this.props.user.lastName,
            FAIntro: this.props.user.FAIntro,
            FAPoints: this.props.user.FAPoints,
            FAFields: this.props.user.FAFields,
        })
        getPostsdb(this)
    }

    // Check the state of the edit, and changes UI accordingly
    handleEdit = () => {
        this.setState({
            edit: !this.state.edit,
        })
        if(this.state.edit == true && this.state.userLevel == "Regular User") {
            const updatedProfile = [{
                username: this.state.username,
                op: "replace",
                path: "/" + "email",
                value: this.state.email
            }, 
            {
                username: this.state.username,
                op: "replace",
                path: "/" + "occupation",
                value: this.state.occupation,
            },
            {
                username: this.state.username,
                op: "replace",
                path: "/" + "birthday",
                value: this.state.birthday,
            },
            {
                username: this.state.username,
                op: "replace",
                path: "/" + "bio",
                value: this.state.bio,
            }]   
            updateProfileField(updatedProfile, this.props.app);
        } else if(this.state.edit == true && this.state.userLevel == "Financial Advisor") {
            const updatedProfile = [{
                username: this.state.username,
                op: "replace",
                path: "/" + "email",
                value: this.state.email
            }, 
            {
                username: this.state.username,
                op: "replace",
                path: "/" + "FAIntro",
                value: this.state.FAIntro,
            },
            {
                username: this.state.username,
                op: "replace",
                path: "/" + "FAFields",
                value: this.state.FAFields,
            }]
            const updatedFAInfo = [{
                username: this.state.username,
                op: "replace",
                path: "/" + "FAIntro",
                value: this.state.FAIntro
            }, 
            {
                username: this.state.username,
                op: "replace",
                path: "/" + "FAFields",
                value: this.state.FAFields,
            }]
            updateProfileField(updatedProfile, this.props.app);
            updateFAInfo(updatedFAInfo);
        }
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
        const targetPostID = target.postID
        const otherPosts = this.state.posts.filter((p) => { return p.postID !== targetPostID })
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

    // changes the list of posts to display
    changePostsDisplay = (displayTitle) => {
        this.setState({ displayPostCat: displayTitle })
    }

    render() {
        const { classes, handleLogOut, loggedIn, user, app } = this.props;
        const name = user.firstName + ' ' + user.lastName;
        console.log(user.username);
        return ( 

            loggedIn ? 
            <ThemeProvider theme={theme}>
                <div className={classes.root}>
                    { user.userLevel === "Regular User" ? 
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
                                    name={ name }
                                    email={ this.state.email }
                                    occupation={ this.state.occupation }
                                    birthday={ this.state.birthday }
                                    bio={ this.state.bio }
                                    userLevel = { this.state.userLevel }
                                    FAName = { this.state.FAName }
                                    FAIntro = { this.state.FAIntro }
                                    FAFields = { this.state.FAFields }
                                    profile={this}
                                />
                                :
                                <Done  
                                    username={ this.state.username }
                                    name={ name }
                                    email={ this.state.email }
                                    occupation={ this.state.occupation }
                                    birthday={ this.state.birthday }
                                    bio={ this.state.bio } 
                                    userLevel = { this.state.userLevel }
                                    FAName = { this.state.FAName }
                                    FAIntro = { this.state.FAIntro }
                                    FAFields = { this.state.FAFields }
                                    FAPoints = { this.state.FAPoints }
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
                                    <Button onClick={() => this.logoutUser(app)}
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
                                    <DialogTitle className={classes.dialogue_cursor} id="draggable">
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
                                    <DialogTitle className={classes.dialogue_cursor} id="draggable">
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

                        <div className={ classes.postSection }>
                            <br></br>
                            <br></br>
                            <Typography variant="h5" gutterBottom>
                                Community Posts:
                            </Typography>
                            <ButtonGroup color="primary" fullWidth>
                                <Button variant={ this.state.displayPostCat === "My Posts" ? "contained" : "outlined" } title="Your community posts" onClick={ () => this.changePostsDisplay("My Posts") }>My Posts</Button>
                                <Button variant={ this.state.displayPostCat === "Saved Posts" ? "contained" : "outlined" } title="Your saved posts" onClick={ () => this.changePostsDisplay("Saved Posts") }>Saved Posts</Button>
                                <Button variant={ this.state.displayPostCat === "Followed Posts" ? "contained" : "outlined" } title="Posts from financial advisors you follow" onClick={ () => this.changePostsDisplay("Followed Posts") }>Followed Posts</Button>
                            </ButtonGroup>

                            
                            <List className={ classes.forumList }>
                                { this.state.posts.map((thread) => {
                                    if (this.state.displayPostCat === "My Posts" && thread.author === user.username) {
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
                                    else if (this.state.displayPostCat === "Saved Posts" && thread.author === user.username) {
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
                                    if (this.state.displayPostCat === "My Posts" && thread.author === user.username) {
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
                            
                        </div>
                    </main> 
                </div>
            </ThemeProvider> : <Redirect to="/login" />
        )
    }
}

export default withStyles(useStyles)(Profile);
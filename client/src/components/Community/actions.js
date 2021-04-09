// environment configutations
import ENV from '../../config.js'
const API_HOST = ENV.api_host

// const { ObjectID } = require('mongodb')


// get all posts from database
export const getPostsdb = (forumList) => {

    const url = `${API_HOST}/community/posts`;

    fetch(url)
    .then((res) => {
        if (res.status === 200) {
            // get post successful
            console.log("got posts")
            return res.json()
        }
        else {
            // get post failed
            console.log("failed to get posts")
        }
    })
    .then((json) => {
        console.log(json)
        forumList.setState({
            posts: json
        })
    })
    .catch((error) => {
        console.log(error)
    });
};

// // get posts for profile page
// export const getProfilePostsdb = (profilePage) => {

//     const url = `${API_HOST}/community/posts`;

//     fetch(url)
//     .then((res) => {
//         if (res.status === 200) {
//             // get post successful
//             console.log("got posts")
//             return res.json()
//         }
//         else {
//             // get post failed
//             console.log("failed to get posts")
//         }
//     })
//     .then((json) => {
//         console.log(json)
//         profilePage.setState({
//             posts: json
//         })
//     })
//     .catch((error) => {
//         console.log(error)
//     });
// };

// add a post to database
export const addPostdb = (forumListState) => {

    const url = `${API_HOST}/community/posts`;

    const newPost = {
        postID: forumListState.postID,
        // author: forumListState.author,
        authorUsertype: forumListState.authorUsertype,
        title: forumListState.title,
        category: forumListState.category,
        content: forumListState.content,
        numUpvotes: 0,
        numDownvotes: 0,
        time: forumListState.time,
        comments: []
    };

    const request = new Request(url, {
        method: "post",
        body: JSON.stringify(newPost),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    fetch(request)
    .then(function (res) {
        if (res.status === 200) {
            // add post successful
            console.log("added post")
        }
        else {
            // add post failed
            console.log("failed to add post")
        }
    })
    .catch((error) => {
        console.log(error)
    });
};

// delete a post in database
export const deletePostdb = (postID) => {

    const url = `${API_HOST}/community/posts/${postID}`;

    const request = new Request(url, {
        method: "delete"
        // body: JSON.stringify(newPost),
        // headers: {
        //     Accept: "application/json, text/plain, */*",
        //     "Content-Type": "application/json"
        // }
    });

    fetch(request)
    .then(function (res) {
        if (res.status === 200) {
            // add post successful
            console.log("deleted post")
        }
        else {
            // add post failed
            console.log("failed to delete post")
        }
    })
    .catch((error) => {
        console.log(error)
    });
};

// edit the post (upvotes and downvotes)
export const UpdatePostVotesdb = (postInfo) => {

    const url = `${API_HOST}/community/posts/${postInfo.postID}`;

    const updatedPost = [{
        op: "replace",
        path: "/" + postInfo.path,
        value: postInfo.value
    }]

    console.log(url)
    console.log(updatedPost)
    
    const request = new Request(url, {
        method: "PATCH",
        body: JSON.stringify(updatedPost),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    fetch(request)
    .then(function (res) {
        if (res.status === 200) {
            // add post successful
            console.log("updated post")
        }
        else {
            // add post failed
            console.log("failed to update post")
        }
    })
    .catch((error) => {
        console.log(error)
    });
};

// add a comment to a post in database
export const addCommentdb = (comment) => {

    const url = `${API_HOST}/community/posts/${comment.targetPostID}`;

    const newComment = {
        commenter: comment.newComment.commenter,
        commentContent: comment.newComment.commentContent
    };
    
    console.log("newcomment:", newComment)

    const request = new Request(url, {
        method: "post",
        body: JSON.stringify(newComment),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    fetch(request)
    .then(function (res) {
        if (res.status === 200) {
            // add comment successful
            console.log("added comment to post")
        }
        else {
            // add comment failed
            console.log("failed to add comment to post")
        }
    })
    .catch((error) => {
        console.log(error)
    });
};

// add a post to a user's profile
export const addUserPostdb = (forumListState) => {

    const url = `${API_HOST}/users/profile/userPosts`;

    const newPost = {
        postID: forumListState.postID,
        // author: forumListState.author,
        // authorUsertype: forumListState.authorUsertype,
        // title: forumListState.title,
        // category: forumListState.category,
        // content: forumListState.content,
        // numUpvotes: 0,
        // numDownvotes: 0,
        // comments: []
    };

    const request = new Request(url, {
        method: "post",
        body: JSON.stringify(newPost),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    fetch(request)
    .then(function (res) {
        if (res.status === 200) {
            // add post successful
            console.log("added post to user profile")
        }
        else {
            // add post failed
            console.log("failed to add post to user profile")
        }
    })
    .catch((error) => {
        console.log(error)
    });
};

// delete a post from user profile
export const deleteUserPostdb = (postInfo) => {

    const url = `${API_HOST}/users/profile/userPosts/${postInfo.postID}`;

    const request = new Request(url, {
        method: "delete"
        // body: JSON.stringify(newPost),
        // headers: {
        //     Accept: "application/json, text/plain, */*",
        //     "Content-Type": "application/json"
        // }
    });

    fetch(request)
    .then(function (res) {
        if (res.status === 200) {
            // add post successful
            console.log("deleted post from user profile")
        }
        else {
            // add post failed
            console.log("failed to delete post from user profile")
        }
    })
    .catch((error) => {
        console.log(error)
    });
};


// add a post to a user's profile userSavedPosts
export const addUserSavedPostdb = (postInfo) => {

    const url = `${API_HOST}/users/profile/userSavedPosts`;

    const newPost = {
        postID: postInfo.postID,
    };

    const request = new Request(url, {
        method: "post",
        body: JSON.stringify(newPost),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    fetch(request)
    .then(function (res) {
        if (res.status === 200) {
            // add post successful
            console.log("added post to user profile userSavedPosts")
            return res.json()
        }
        else {
            // add post failed
            console.log("failed to add post to user profile userSavedPosts")
        }
    })
    .then(json => {
        if (json !== undefined) {
            postInfo.app.setState({ currentUser: json })
        }
    })
    .catch((error) => {
        console.log(error)
    });
};

// delete a post from user profile userSavedPosts
export const deleteUserSavedPostdb = (postInfo) => {

    const url = `${API_HOST}/users/profile/userSavedPosts/${postInfo.postID}`;

    const request = new Request(url, {
        method: "delete"
    });

    fetch(request)
    .then(function (res) {
        if (res.status === 200) {
            // add post successful
            console.log("deleted post from user profile userSavedPosts")
            return res.json()
        }
        else {
            // add post failed
            console.log("failed to delete post from user profile userSavedPosts")
        }
    })
    .then(json => {
        if (json !== undefined) {
            postInfo.app.setState({ currentUser: json })
        }
    })
    .catch((error) => {
        console.log(error)
    });
};


// add a post to a user's profile userUpvotedPosts
export const addUserUpvotedPostdb = (postInfo) => {

    const url = `${API_HOST}/users/profile/userUpvotedPosts`;

    const newPost = {
        postID: postInfo.postID,
    };

    const request = new Request(url, {
        method: "post",
        body: JSON.stringify(newPost),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    fetch(request)
    .then(function (res) {
        if (res.status === 200) {
            // add post successful
            console.log("added post to user profile userUpvotedPosts")
            return res.json()
        }
        else {
            // add post failed
            console.log("failed to add post to user profile userUpvotedPosts")
        }
    })
    .then(json => {
        if (json !== undefined) {
            postInfo.app.setState({ currentUser: json })
        }
    })
    .catch((error) => {
        console.log(error)
    });
};

// delete a post from user profile userUpvotedPosts
export const deleteUserUpvotedPostdb = (postInfo) => {

    const url = `${API_HOST}/users/profile/userUpvotedPosts/${postInfo.postID}`;

    const request = new Request(url, {
        method: "delete"
    });

    fetch(request)
    .then(function (res) {
        if (res.status === 200) {
            // add post successful
            console.log("deleted post from user profile userUpvotedPosts")
            return res.json()
        }
        else {
            // add post failed
            console.log("failed to delete post from user profile userUpvotedPosts")
        }
    })
    .then(json => {
        if (json !== undefined) {
            postInfo.app.setState({ currentUser: json })
        }
    })
    .catch((error) => {
        console.log(error)
    });
};


// add a post to a user's profile userDownvotedPosts
export const addUserDownvotedPostdb = (postInfo) => {

    const url = `${API_HOST}/users/profile/userDownvotedPosts`;

    const newPost = {
        postID: postInfo.postID,
    };

    const request = new Request(url, {
        method: "post",
        body: JSON.stringify(newPost),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    fetch(request)
    .then(function (res) {
        if (res.status === 200) {
            // add post successful
            console.log("added post to user profile userDownvotedPosts")
            return res.json()
        }
        else {
            // add post failed
            console.log("failed to add post to user profile userDownvotedPosts")
        }
    })
    .then(json => {
        if (json !== undefined) {
            postInfo.app.setState({ currentUser: json })
        }
    })
    .catch((error) => {
        console.log(error)
    });
};

// delete a post from user profile userDownvotedPosts
export const deleteUserDownvotedPostdb = (postInfo) => {

    const url = `${API_HOST}/users/profile/userDownvotedPosts/${postInfo.postID}`;

    const request = new Request(url, {
        method: "delete"
    });

    fetch(request)
    .then(function (res) {
        if (res.status === 200) {
            // add post successful
            console.log("deleted post from user profile userDownvotedPosts")
            return res.json()
        }
        else {
            // add post failed
            console.log("failed to delete post from user profile userDownvotedPosts")
        }
    })
    .then(json => {
        if (json !== undefined) {
            postInfo.app.setState({ currentUser: json })
        }
    })
    .catch((error) => {
        console.log(error)
    });
};

// add a FA to user's profile userFollows
export const addUserFollowdb = (followInfo) => {

    const url = `${API_HOST}/users/profile/userFollows`;

    const newFollow = {
        FAusername: followInfo.FAusername,
    };

    const request = new Request(url, {
        method: "post",
        body: JSON.stringify(newFollow),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    fetch(request)
    .then(function (res) {
        if (res.status === 200) {
            // add post successful
            console.log("added FA to user profile userFollows")
            return res.json()
        }
        else {
            // add post failed
            console.log("failed to add FA to user profile userFollows")
        }
    })
    .then(json => {
        if (json !== undefined) {
            // console.log("please", json)
            followInfo.app.setState({ currentUser: json })
        }
    })
    .catch((error) => {
        console.log(error)
    });
};

// delete a FA from user's profile userFollows
export const deleteUserFollowdb = (followInfo) => {

    const url = `${API_HOST}/users/profile/userFollows/${followInfo.FAusername}`;

    const request = new Request(url, {
        method: "delete"
    });

    fetch(request)
    .then(function (res) {
        if (res.status === 200) {
            // add post successful
            console.log("deleted FA from user profile userFollows")
            return res.json()
        }
        else {
            // add post failed
            console.log("failed to delete FA from user profile userFollows")
        }
    })
    .then(json => {
        if (json !== undefined) {
            followInfo.app.setState({ currentUser: json })
        }
    })
    .catch((error) => {
        console.log(error)
    });
};

// get all FAInfos
export const getFAInfodb = (index) => {

    const url = `${API_HOST}/users/FAInfo`;

    fetch(url)
    .then((res) => {
        if (res.status === 200) {
            // get post successful
            console.log("got FAInfo")
            return res.json()
        }
        else {
            // get post failed
            console.log("failed to get FAInfo")
        }
    })
    .then((json) => {
        console.log(json)
        index.setState({
            tempFAInfo: json
        })
    })
    .catch((error) => {
        console.log(error)
    });
};

// get the user's recommendations
export const getRecommendationsdb = (info) => {

    const url = `${API_HOST}/community/recommend/${info.username}`;

    fetch(url)
    .then((res) => {
        if (res.status === 200) {
            // get recommendations successful
            console.log("got recommendations")
            return res.json()
        }
        else {
            // get recommendations failed
            console.log("failed to get recommendation")
        }
    })
    .then((json) => {
        console.log(json)
        info.forumList.setState({
            recommendations: json
        })
    })
    .catch((error) => {
        console.log(error)
    });
};
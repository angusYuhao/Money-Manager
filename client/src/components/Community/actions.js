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
        author: forumListState.author,
        authorUsertype: forumListState.authorUsertype,
        title: forumListState.title,
        category: forumListState.category,
        content: forumListState.content,
        numUpvotes: 0,
        numDownvotes: 0,
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

    const url = `${API_HOST}/users/profile/userPosts/${forumListState.author}`;

    const newPost = {
        postID: forumListState.postID,
        author: forumListState.author,
        authorUsertype: forumListState.authorUsertype,
        title: forumListState.title,
        category: forumListState.category,
        content: forumListState.content,
        numUpvotes: 0,
        numDownvotes: 0,
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

    const url = `${API_HOST}/users/profile/userPosts/${postInfo.username}/${postInfo.postID}`;

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
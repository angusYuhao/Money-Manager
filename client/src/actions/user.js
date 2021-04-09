// environment configutations
import ENV from './../config.js'
const API_HOST = ENV.api_host

// Send a request to check if a user is logged in through the session cookie
export const checkSession = (app) => {
    const url = `${API_HOST}/users/check-session`;
    console.log(url)
    if (ENV.env === 'production') {
        fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then(json => {
            if (json && json.currentUser) {
                app.setState({ currentUser: json.currentUser });
            }
        })
        .catch(error => {
            console.log("check session does not work");
        });
    } else {
        app.setState({ currentUser: app.state.currentUser });
    }
    
};

// A functon to update the login form state
export const updateLoginForm = (loginComp, field) => {
    const value = field.value;
    const name = field.name;

    loginComp.setState({
        [name]: value
    });
};

// A function to send a POST request with the user to be logged in
export const login = (loginComp, app) => {
    console.log(loginComp);
    // Create our request constructor with all the parameters we need
    const request = new Request(`${API_HOST}/users/login`, {
        method: "post",
        body: JSON.stringify(loginComp.state),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    // Send the request with fetch()
    fetch(request)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then(json => {
            if (json.currentUser !== undefined) {
                app.setState({ currentUser: json.currentUser, signedUpUser: false });
                console.log("inside json");
                
                if(json.currentUser.userLevel == "Regular User") {
                    loginComp.props.history.push('/spendings')
                } else if(json.currentUser.userLevel == "Financial Advisor") {
                    loginComp.props.history.push('/community')
                }
            } 
        })
        .catch(error => {
            console.log("error");
            loginComp.setState({ snackMessage: "Wrong credentials, please re-enter!", displaySnack: true});
        });
};

// A function to update the signup form state
export const updateSignupForm = (formComp, field) => {
    const value = field.value;
    const name = field.name;

    formComp.setState({
        [name]: value
    });
};

export const updateConfirmPassword = (formComp, field) => {
    const value = field.value;
    const name = field.name;
    
    formComp.setState({
        [name]: value
    });

    if(value !== formComp.state.createdPassword) {
        formComp.state.passwordConfirmError = true;
        formComp.state.firstTimeConfirm = false;
        console.log("password did not match");
    } else {
        formComp.state.passwordConfirmError = false;
        formComp.state.firstTimeConfirm = false;
        console.log("password match")
    }
}

// A function to send a POST request with a new student
export const addUser = (formComp, app) => {
    // the URL for the request
    const url = `${API_HOST}/users/signup`;

    // The data we are going to send in our request
    const user = formComp.state
    console.log("inside addUser: ", user);

    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: "post",
        body: JSON.stringify(user),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    // Send the request with fetch()
    fetch(request)
        .then(function (res) {
            // Handle response we get from the API.
            // Usually check the error codes to see what happened.
            if (res.status === 200) {
                // If student was added successfully, tell the user.
                console.log("Successfully signed up")
                app.setState({signedUpUser: true})
                formComp.props.history.push("/login");
            } else {
                // If server couldn't add the student, tell the user.
                // Here we are adding a generic message, but you could be more specific in your app.
                console.log("Failed to sign up");
            }
        })
        .catch(error => {
            if(error === "Internal server error") {
                formComp.props.history.push('/error')
            }
            console.log(error);
        });
};

// add FAInfo when an FA signs up
export const addFAInfo = (formComp) => {

    if (formComp.state.userLevel === "Regular User") {
        return;
    }

    const url = `${API_HOST}/users/FAInfo`

    const newFAInfo = {
        FAName: formComp.state.userName,
        FAFirstname: formComp.state.firstName,
        FALastname: formComp.state.lastName,
        FAIntro: formComp.state.FAIntro,
        FAFields: formComp.state.FAFields,
        FAPoints: formComp.state.FAPoints
    }

    const request = new Request(url, {
        method: "post",
        body: JSON.stringify(newFAInfo),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    })

    fetch(request)
    .then(function (res) {
        if (res.status === 200) {
            console.log("Successfully added FAInfo")
        } else {
            console.log("Failed to add FAInfo");
        }
    })
    .catch(error => {
        if(error === "Internal server error") {
            formComp.props.history.push('/error')
        }
        console.log(error);
    });
}

// get all FAInfos
export const getFAInfo = (profile) => {

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
        profile.setState({
            FAInfo: json
        })
    })
    .catch((error) => {
        if(error === "Internal server error") {
            profile.props.history.push('/error')
        }
        console.log(error)
    });
};

// update the FAInfo when user changes it in profile page
export const updateFAInfo = (pathObj) => {
    const url = `${API_HOST}/users/FAInfo`;

    const request = new Request(url, {
        method: "PATCH",
        body: JSON.stringify(pathObj),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    fetch(request)
    .then(res => {
        if (res.status === 200) {
            console.log("updated FAInfo")
        } else {
            console.log("failed to update FAInfo")
        }
    })
    .catch(error => {
        console.log("inside updateFAInfo function");
        if(error === "Internal server error") {
            pathObj.props.history.push('/error')
        }
        console.log(error)
    });
}

// A function to update the signup form state
export const updateProfile = (profileComp, field) => {
    const value = field.value;
    const name = field.name;

    profileComp.setState({
        [name]: value
    });
};

// edit the profile (name, birthday, email, bio...)
export const updateProfileField = (pathObj, app) => {

    const url = `${API_HOST}/users/profile`;

    const request = new Request(url, {
        method: "PATCH",
        body: JSON.stringify(pathObj),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    fetch(request)
        .then(res => {
            if (res.status === 200) {
                console.log("updated profile")
                return res.json();
            } else {
                // add post failed
                console.log("failed to update post")
            }
        })
        .then(json => {
            if (json !== undefined) {
                app.setState({ currentUser: json });
            }
        })
        .catch(error => {
            if(error === "Internal server error") {
                pathObj.props.history.push('/error')
            }
            console.log("inside login function");
            console.log(error)
        });
};

// A function to send a GET request to logout the current user
export const logout = (app) => {
    const url = `${API_HOST}/users/logout`;

    fetch(url)
        .then(res => {
            app.setState({
                currentUser: null,
            });
        })
        .catch(error => {
            if(error === "Internal server error") {
                app.props.history.push('/error')
            }
            console.log(error);
        });
};

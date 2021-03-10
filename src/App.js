import React from 'react';

import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './App.css';

import Spendings from './components/Spendings'
import Investments from './components/Investments'
import Community from './components/Community'
import NavBar from './components/NavBar/index.js';
import AdminNavBar from './components/NavBar/adminNavBar.js';
import Home from './components/Home';
import Login from './components/Login/login';
import SignUp from './components/Signup/signup.js';
import Contact from './components/ContactUs/contact.js';
import Sent from './components/ContactUs/sent.js';
import About from './components/AboutUs/about.js';
import Profile from './components/Profile/profile.js';

class App extends React.Component {

  state = {
    loggedIn: false,
    username: "",
    password: "",
    userLevel: "",
  }

  loginHandler = (username, password) => {

    if (username == 'user' && password == 'user') {
      this.state.loggedIn = true;
      this.state.username = username;
      this.state.password = password;
      this.state.userLevel = "User";
    }
    else if (username == 'admin' && password == 'admin') {
      this.state.loggedIn = true;
      this.state.username = username;
      this.state.password = password;
      this.state.userLevel = "Financial Advisor";
    }
    else this.state.loggedIn = false;

    this.setState({
      loggedIn: this.state.loggedIn,
      username: this.state.username,
      password: this.state.password,
      userLevel: this.state.userLevel,
    })
  }

  handleLogOut = () => {
    this.state.loggedIn = false;
    this.state.userLevel = "";
    this.setState({
      loggedIn: this.state.loggedIn,
      userLevel: this.state.userLevel,
    })
  }

  render() {

    return (

      <div>
        <BrowserRouter>

          {this.state.userLevel === "Financial Advisor" ?
            <div>
              <AdminNavBar
                username={this.state.username}
                password={this.state.password} />
            </div>
            : this.state.loggedIn ?
              <div>
                <NavBar
                  username={this.state.username}
                  password={this.state.password} />
              </div>
              : null
          }

          <Switch>

            <Route exact path='/'
              render={() => (<Home
                loggedIn={this.state.loggedIn} />)} />

            <Route exact path='/login'
              render={() => (<Login
                loginHandler={this.loginHandler}
              />)} />

            <Route exact path='/signup'
              render={() => (<SignUp />)} />

            <Route exact path='/spendings'
              render={() => (<Spendings
                loggedIn={this.state.loggedIn}
                username={this.state.username}
                password={this.state.password}
              />)} />

            <Route exact path='/investments'
              render={() => (<Investments
                loggedIn={this.state.loggedIn}
              />)} />

            <Route exact path='/community'
              render={() => (<Community
                loggedIn={this.state.loggedIn}
                username={this.state.username}
                usertype={this.state.userLevel} />)} />

            <Route exact path='/contact'
              render={() => (<Contact
                loggedIn={this.state.loggedIn} />)} />

            <Route exact path='/sent'
              render={() => (<Sent
                loggedIn={this.state.loggedIn} />)} />

            <Route exact path='/about'
              render={() => (<About
                loggedIn={this.state.loggedIn} />)} />

            <Route exact path='/profile'
              render={() => (<Profile
                handleLogOut={this.handleLogOut}
                loggedIn={this.state.loggedIn}
                username={this.state.username}
                password={this.state.password}
                userLevel={this.state.userLevel}
              />)} />

          </Switch>


        </BrowserRouter>


      </div>

    )

  }

}

export default App;
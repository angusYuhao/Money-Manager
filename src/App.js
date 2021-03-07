import React from 'react';

import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './App.css';

import Spendings from './components/Spendings'
import Investments from './components/Investments'
import Community from './components/Community'
import NavBar from './components/NavBar'
import Home from './components/Home'
import Login from './components/Login/login';
import SignUp from './components/Signup/signup.js';
import Contact from './components/ContactUs/contact.js';
import Sent from './components/ContactUs/sent.js';
import About from './components/AboutUs/about.js';

class App extends React.Component {

  state = {
    loggedIn: false,
    username: "",
    password: "",
  }

  loginHandler = (username, password) => {

    if (username == 'user' && password == 'user') {
      this.state.loggedIn = true;
      this.state.username = username;
      this.state.password = password;
    }
    else if (username == 'admin' && password == 'admin') {
      this.state.loggedIn = true;
      this.state.username = username;
      this.state.password = password;
    }
    else this.state.loggedIn = false;

    this.setState({ 
      loggedIn: this.state.loggedIn,
      username: this.state.username,
      password: this.state.password
     })
  }

  render() {

    return (

      <div>
        <BrowserRouter>
          {this.state.loggedIn ? 
            <div>
              <NavBar 
                username={this.state.username}
                password={this.state.password}/>
              <br></br>
              <br></br>
              <br></br>
            </div> : null}
          

          <Switch>

            <Route exact path='/'
              render={() => (<Home />)} />

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
              render={() => (<Investments />)} />

            <Route exact path='/community'
              render={() => (<Community 
                username={this.state.username}/>)} />

            <Route exact path='/contact'
              render={() => (<Contact />)} />

            <Route exact path='/sent'
              render={() => (<Sent />)} />

            <Route exact path='/about'
              render={() => (<About />)} />

          </Switch>
          

        </BrowserRouter>
        
        
      </div>
      /*<div>

        <BrowserRouter>

          <div class="NavBar">
            <NavBar/>
          </div>

          <br></br>
          <br></br>
          <br></br>
          
          <div className="PageContent">
            <Switch>

              <Route exact path='/spendings' render={() => 
                    (<Spendings/>)}/>
              <Route exact path='/investments' render={() => 
                    (<Investments/>)}/>
              <Route exact path='/community' render={() => 
                    (<Community/>)}/>

            </Switch>
          </div>

        </BrowserRouter>

      </div>*/

    )

  }

}

export default App;
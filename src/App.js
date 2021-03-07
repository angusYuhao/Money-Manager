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

class App extends React.Component {

  state = {
    loggedIn: false,
    username: ""
  }

  loginHandler = (username, password) => {

    if (username == 'user' && password == 'user') this.state.loggedIn = true;
    else if (username == 'admin' && password == 'admin') this.state.loggedIn = true;
    else this.state.loggedIn = false;

    this.setState({ 
      loggedIn: this.state.loggedIn,
      username: username
     })
  }

  render() {

    return (

      <div>
        <BrowserRouter>
          {this.state.loggedIn ? 
            <div>
              <NavBar />
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
              />)} />

            <Route exact path='/investments'
              render={() => (<Investments />)} />

            <Route exact path='/community'
              render={() => (<Community 
                username={this.state.username}/>)} />

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
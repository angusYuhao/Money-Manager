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

  render() {
    
    return (

      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' 
                render={() => (<Home />)} />
            <Route exact path='/login' 
                render={() => (<Login />)} />
            <Route exact path='/signup' 
                render={() => (<SignUp />)} />
            <Route exact path='/spendings' 
                render={() => (<Spendings/>)}/>
            <Route exact path='/investments' 
                render={() => (<Investments/>)}/>
            <Route exact path='/community' 
                render={() => (<Community/>)}/>
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
          
          <div class="PageContent">
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
import React from 'react';

import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './App.css';

import Spendings from './components/Spendings'
import Investments from './components/Investments'
import Community from './components/Community'
import NavBar from './components/NavBar'

class App extends React.Component {

  render() {
  
    return (

      <div>

        <BrowserRouter>

          <div class="NavBar">
            <NavBar/>
          </div>

          <br></br>
          <br></br>
          <br></br>
          <div><p>Hello there this is just a change!</p></div>
          
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

      </div>

    )

  }

}

export default App;
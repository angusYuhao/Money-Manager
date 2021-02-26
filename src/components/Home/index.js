import React from 'react';
import { AppBar, 
         Toolbar, 
         Typography, 
         ThemeProvider, 
         createMuiTheme, 
         Button,
         makeStyles,
         ButtonGroup,
         Grid } from '@material-ui/core';
import Logo from './money.png';
import { deepPurple, green } from '@material-ui/core/colors';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import "./home.css";
import Login from '../Login/login.js';
import HomeAppBar from './appBar.js';
import ImageSlider from './image_slider.js';

import Sliding from './sliding.js';

class Home extends React.Component {
    
  render() {
    
    return (
        
        
        <Grid className="grid">
            <HomeAppBar className="appBar" />
            
            <Sliding />
            
        </Grid>

        /*
        <Grid>
          <Login />
        </Grid>*/
        
    )

  }

}

export default Home;
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
import { deepPurple, green } from '@material-ui/core/colors'

import "./home.css";
import HomeAppBar from './appBar.js';
import Sliding from './sliding.js';
import background from './money.png';

class Home extends React.Component {
    
  render() {
    
    return (
        
        <Grid className="grid">
            <HomeAppBar className="appBar" />
            
            <Sliding className="slide"/>
            
        </Grid>
        
    )

  }

}

export default Home;
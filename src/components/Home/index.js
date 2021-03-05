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

import "./home.css";
import HomeAppBar from './appBar.js';
import Sliding from './sliding.js';

class Home extends React.Component {
    
  render() {
    
    return (
        
        
        <Grid className="grid">
            <HomeAppBar className="appBar" />
            
            <Sliding/>
            
        </Grid>
        
    )

  }

}

export default Home;
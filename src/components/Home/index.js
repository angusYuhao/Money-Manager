import React from 'react';
import { Grid } from '@material-ui/core';

import "./home.css";
import HomeAppBar from './appBar.js';
import Sliding from './../Sliding/sliding.js';
import Footer from './../Footer/footer.js';

class Home extends React.Component {
    
  render() {

    return (

        <Grid className="grid">
            <HomeAppBar />
            <Sliding/>
            <Footer/>   
        </Grid>
        
    )

  }

}

export default Home;
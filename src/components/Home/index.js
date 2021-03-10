import React from 'react';
import { Grid } from '@material-ui/core';

import "./home.css";
import HomeAppBar from './appBar.js';
import Sliding from './../Sliding/sliding.js';
import Footer from './../Footer/footer.js';

class Home extends React.Component {

  render() {
    const { loggedIn } = this.props
    return (


      <Grid className="grid">
        <HomeAppBar className="appBar"
          loggedIn={loggedIn} />

        <Sliding />
        <Footer />

      </Grid>
    )

  }

}

export default Home;
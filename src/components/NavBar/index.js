import React from 'react';
import { AppBar, Tab, Tabs } from '@material-ui/core';
import { Link } from 'react-router-dom';

class NavBar extends React.Component {

  render() {
  
    return (

      <AppBar>
          <Tabs aria-label="simple tabs example">
            
              <Link to={'./../spendings'}>
                  <Tab label="Spendings"/>
              </Link>

              <Link to={'./../investments'}>
                  <Tab label="Investments"/>
              </Link>
              
              <Link to={'./../community'}>
                  <Tab label="Community"/>
              </Link>

          </Tabs>
      </AppBar>

    )

  }

}

export default NavBar;
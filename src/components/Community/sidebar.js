import React from 'react';
import { withStyles } from "@material-ui/core/styles";
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import BarChartIcon from '@material-ui/icons/BarChart';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { createMuiTheme } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

// define styles
const styles =  theme => ({
    forumList: {
      backgroundColor: '#f0f0f0',
      borderRadius: 5,
      margin: 10,
    },
    drawer: {
      width: 200,
      flexShrink: 0,
    },
    drawerContainer: {
      overflow: 'auto',
    }
  });

// define theme
const theme = createMuiTheme({
  palette: {
      primary: {
          main: deepPurple[800],
      },
      secondary: {
          main: deepPurple[100],
      }
  },
  typography: {
      fontFamily: [
          'Poppins',
          'sans-serif',
      ].join(','),
  },
});

// class definition
class Sidebar extends React.Component {

  render() {

    // save props
    const { classes, openSidebar, closeSidebar, handleSidebarToggle, open } = this.props

    return (
      <Drawer
        className={classes.drawer}
        open={ this.props.open }
        variant="persistent"
      >
        <Toolbar />
        <div className={classes.drawerContainer}>

          {/* {close button} */}
          <List>

            <ListItem button color="secondary" onClick={ closeSidebar } >
              <ListItemIcon>
               <ArrowBackIosIcon />
              </ListItemIcon>
              <ListItemText primary="Close" />
            </ListItem>

          </List>

          <Divider />

          {/* {all posts and followed posts toggles} */}
          <List>

            <ListItem button onClick={ () => handleSidebarToggle("Home") }>
              <ListItemIcon>
                <BarChartIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>

            <ListItem button onClick={ () => handleSidebarToggle("Followed Posts") }>
              <ListItemIcon>
                <PermIdentityIcon />
              </ListItemIcon>
              <ListItemText primary="Followed Posts" />
            </ListItem>

          </List>

          <Divider />

          {/* {liked posts and saved posts toggles} */}
          <List>

            <ListItem button onClick={ () => handleSidebarToggle("Liked Posts") }>
              <ListItemIcon>
                <ThumbUpAltIcon />
              </ListItemIcon>
              <ListItemText primary="Liked Posts" />
            </ListItem>

            <ListItem button onClick={ () => handleSidebarToggle("Saved Posts") }>
              <ListItemIcon>
                <SaveAltIcon />
              </ListItemIcon>
              <ListItemText primary="Saved Posts" />
            </ListItem>

          </List>
          
        </div>

      </Drawer>
    )
  }
}

export default withStyles(styles)(Sidebar) 
import React from 'react';
import { withStyles } from "@material-ui/core/styles";
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import BarChartIcon from '@material-ui/icons/BarChart';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import { deepPurple, grey, green } from '@material-ui/core/colors';

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

class Sidebar extends React.Component {

  render() {

    const { classes, openSidebar, closeSidebar, handleSidebarToggle, open } = this.props

    return (
      <Drawer
        className={classes.drawer}
        open={ this.props.open }
        variant="persistent"
        // onClose={ this.toggleOpen }
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            <ListItem button color="secondary" onClick={ closeSidebar } >
              <ListItemIcon>
               <ArrowBackIosIcon />
              </ListItemIcon>
              <ListItemText primary="Close" />
            </ListItem>
          </List>

          <Divider />

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
          {/* <Divider /> */}
          
        </div>
      </Drawer>
    )
  }
}

export default withStyles(styles)(Sidebar) 
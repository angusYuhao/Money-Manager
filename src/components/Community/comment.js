import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import { deepPurple, grey } from '@material-ui/core/colors';
import { withStyles } from "@material-ui/core/styles";

class Comment extends React.Component {
    render() {
      const { commenter, commentContent } = this.props
  
      return(
        <div>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar></Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <React.Fragment>
                  { commenter }
                </React.Fragment>
              }
              secondary={
                <React.Fragment>
                  { commentContent }
                </React.Fragment>
              }
            />
          </ListItem>
        </div>
      )
    }
  }

  export default Comment;
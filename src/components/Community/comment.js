import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

// class definition
class Comment extends React.Component {

    render() {
      
      // save props
      const { commenter, commentContent } = this.props
  
      return(
        <div>
          <ListItem alignItems="flex-start">

            {/* {commenter avatar (set to null now)} */}
            <ListItemAvatar>
              <Avatar></Avatar>
            </ListItemAvatar>

            {/* {commenter username and comment content} */}
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
import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';

import { createMuiTheme } from '@material-ui/core/styles';
import { deepPurple, green } from '@material-ui/core/colors';
import { withStyles } from "@material-ui/core/styles";

import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import CloseIcon from '@material-ui/icons/Close';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';


// define styles
const styles =  theme => ({
  closePostButton: {
    backgroundColor: deepPurple[500],
  },
  blackText: {
    color: '#000000',
  },
  redText: {
    color: '#dd0000',
  },
  purpleText: {
    color: deepPurple[500],
    fontSize: 30
  },
  upvoteText: {
    color: '#aaaaaa',
  },
  checkCircle: {
    color: green[500]
  },
  financialAdvisorTag: {
    color: '#ffffff',
    backgroundColor: green[500]
  },
  followButtonGrid: {
    padding: 20,
  },
  timeText: {
    color: '#555555',
    // fontSize: 13,
  },
  postTitle: {
    color: deepPurple[800],
    fontSize: 20,
  },
  authorText: {
    fontSize: 24,
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

class InboxListItem extends React.Component {
  
  state = {
    recommendations: null,
    openRecommendation: false,
  }

  componentDidMount() {
    this.setState({recommendations: this.props.recommendations})
  }

  openRecommendation = () => {
    this.setState({openRecommendation: true})
  }

  closeRecommendation = () => {
    this.setState({openRecommendation: false})
  }

  render() {

    const { classes, recommendations } = this.props

    return(

      <div>
        {/* {post list item (not opened)} */}
        <ListItem alignItems="flex-start" button="true" onClick={ this.openRecommendation }>

          <ListItemText
            primary={
              <React.Fragment>

                {/* {post title and the author's username} */}
                <span className={ classes.postTitle }>{ recommendations["Recommendation Action"] } :: </span>
                <span> { recommendations["FAName"] } </span>

              </React.Fragment>
            }            
            secondary={
              <React.Fragment>

                {/* {post's contents} */}
                { recommendations["Recommendation Text"] }
              </React.Fragment>
            }
          />

        </ListItem>

        <Dialog open={ this.state.openRecommendation } onClose={ this.closeRecommendation } aria-labelledby="form-dialog-title" fullScreen>

          <DialogActions className={ classes.closePostButton }>

            {/* {display the close dialog button} */}
            <Tooltip title="Close">
              <Fab color="secondary" size="small" onClick={ this.closeRecommendation }>
                <CloseIcon fontSize="default" />
              </Fab>
            </Tooltip>

          </DialogActions>
          
          <DialogTitle id="form-dialog-title">

            {/* {display category, post title and author} */}
            <span className={ classes.upvoteText }>Recommendation From </span>
            <span className={ classes.authorText }>{ recommendations["FAName"] } </span>
            <span> </span> 
            <Chip className={ classes.financialAdvisorTag } label={ "Financial Advisor" } size="small"/>
            <span> &gt;&gt; </span> 
            <span className={ classes.postTitle }> { recommendations["Recommendation Action"] } </span>

            

          </DialogTitle>

          <Divider variant="fullWidth" />

          <DialogContent>

            {/* {display contents of the post} */}
            
            <DialogContentText className={ classes.timeText }>
              { recommendations["Recommendation Text"] }
            </DialogContentText>
            
          </DialogContent>

        </Dialog>
      </div>
    )
  }
}

export default withStyles(styles)(InboxListItem);
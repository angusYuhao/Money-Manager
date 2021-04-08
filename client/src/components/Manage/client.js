import React from 'react';
import { AppBar, Tab, Tabs } from '@material-ui/core';
import { Link } from 'react-router-dom';
import {
  withStyles,
  Toolbar,
  Typography,
  Avatar,
  Button,
  Tooltip,
  Divider,
  List,
  Card,
  CardActions,
  Container,
  CardContent,
  ListItemIcon,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  createMuiTheme,
  ThemeProvider
} from '@material-ui/core';
import { deepPurple, pink, indigo } from '@material-ui/core/colors';
import VisibilityIcon from '@material-ui/icons/Visibility';
import PersonIcon from '@material-ui/icons/Person';

const useStyles = theme => ({
    avatar: {
        backgroundColor: deepPurple[800]
    },
    sendButton: {
        margin: theme.spacing(1),
    },
    view: {
        margin: theme.spacing(1),
    },
    genderFemale: {
        marginLeft: theme.spacing(1), 
        color: pink[100]
    },
    genderMale: {
        marginLeft: theme.spacing(1),
        color: indigo[600]
    },

})

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

class ClientItem extends React.Component {
    
    state = {
        openClientDetail: false,
    }

    render() {
        const { classes, username, firstName, lastName, email, birthday,
                occupation, salary, gender, totalSpendings, totalGain, totalLoss } = this.props;
        
        return (
            <ThemeProvider theme={theme}>
                <div>
                    <ListItem button="true">
                        <ListItemAvatar>
                            <Avatar className={classes.avatar}>{username[0]}</Avatar>
                        </ListItemAvatar>
                        <ListItemText>
                            <span className={classes.username}>{username}</span>
                            { gender == "female" ?
                                <ListItemIcon className={classes.genderFemale}>
                                    <PersonIcon className={classes.gender}/>
                                </ListItemIcon>
                            :
                                <ListItemIcon className={classes.genderMale}>
                                    <PersonIcon />
                                </ListItemIcon>
                            }   
                        </ListItemText>
                        
                        <ListItemSecondaryAction>
                            <Tooltip title="View profile">
                                <IconButton edge="end" aria-label="visible" className={classes.view}>
                                    <VisibilityIcon />
                                </IconButton>
                            </Tooltip>
                            <Button variant="contained" 
                                color="primary" 
                                className={classes.sendButton}>
                              Recommend
                            </Button>
                        </ListItemSecondaryAction>
                    </ListItem>
                </div>
            </ThemeProvider>

        )

    }

}

export default withStyles(useStyles)(ClientItem);
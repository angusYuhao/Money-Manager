import React from 'react';
import { AppBar, Tab, Tabs } from '@material-ui/core';
import { Link } from 'react-router-dom';
import {
  withStyles,
  Toolbar,
  Typography,
  Avatar,
  Divider,
  List,
  Card,
  CardActions,
  Container,
  CardContent,
  createMuiTheme,
  ThemeProvider
} from '@material-ui/core';
import { deepPurple } from '@material-ui/core/colors';
import ClientItem from '../Manage/client.js';

const useStyles = theme => ({
  root: {
    flexGrow: 1,
    marginLeft: 50,
  },
  manageTop: {
    marginTop: theme.spacing(5),
    marginRight: theme.spacing(5),
  },
  manageTopBar: {
    backgroundColor: deepPurple[50],
    borderRadius: 5,
    spacing: '100',
  },
  purpleText: {
    fontSize: 30
  },
  clientList: {
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginTop: 10,
    marginRight: theme.spacing(5),
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
  
  class Manage extends React.Component {
    
    state = {
      clients: [
        { username: 'annexie',
          firstName: 'Anne',
          lastName: 'Xie',
          email: 'annexie@gmail.com',
          birthday:'2000-08-21',
          occupation: 'student',
          salary: '$2000',
          gender: 'female',
          totalSpendings: '$10,000',
          totalGain: '$100',
          totalLoss: '$1000'
        },
        { username: 'ianchen',
          firstName: 'Ian',
          lastName: 'Chen',
          email: 'ianchen@gmail.com',
          birthday:'2000-01-12',
          occupation: 'student',
          salary: '$2000',
          gender: 'male',
          totalSpendings: '$10,000',
          totalGain: '$100',
          totalLoss: '$1000'
        }
      ]
    }

    render() {
      const { classes } = this.props;
      
      let clientList;
      clientList = <List className={classes.clientList} >
        { this.state.clients.map((client) => {
          return (
            <div>
              <Divider />
              <ClientItem username={client.username}
                        firstName={client.firstName}
                        lastName={client.lastName}
                        email={client.email}
                        birthday={client.birthday}
                        occupation={client.occupation}
                        salary={client.salary}
                        gender={client.gender}
                        totalSpendings={client.totalSpendings}
                        totalGain={client.totalGain}
                        totalLoss={client.totalLoss}
              />
            </div>
          )
        })}
      </List>
      return (
        <ThemeProvider theme={theme}>
          <div className={classes.root}>
            <Container maxWidth="xl">
              <Card className={ classes.manageTop }>
                <CardActions className={ classes.manageTopBar }>
                  <CardContent>
                    <span className={ classes.purpleText } > Your clients </span>
                  </CardContent>
                </CardActions>
              </Card>
              {clientList}
            </Container>
          </div>
        </ThemeProvider>
  
      )
  
    }
  
  }
  
  export default withStyles(useStyles)(Manage);
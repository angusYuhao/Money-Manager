import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, 
  withStyles,
  Avatar,
  AppBar, 
  Toolbar, 
  Typography,
  Button,
  TextField,
  Grid,
  createMuiTheme,
  Paper,
  ThemeProvider} from '@material-ui/core';
import { deepPurple, grey } from '@material-ui/core/colors';

const useStyles = theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  new: {
    float: 'right',
    marginRight: 10,
  },
  grid: {
    direction: 'row',
    justifyContent: 'center',
  },
  paper: {
    marginTop: theme.spacing(12),
    display: 'flex',
    flexDirection: 'column',  
  },
  avatar: {
    marginTop: theme.spacing(2),
    color: theme.palette.getContrastText(deepPurple[800]),
    backgroundColor: deepPurple[500],
  },
  text1: {
    margin: theme.spacing(3)
  },
  subtitle: {
    marginLeft: theme.spacing(3),
    color: grey[500],
  },
  form: {
    margin: theme.spacing(3),
  },
  text: {
    margin: theme.spacing(1),
  },
  email: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  signInButton: {
    margin: theme.spacing(2),
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



class SignUp extends React.Component {

  render() {
    
    const { classes } = this.props;

    return (

      <ThemeProvider theme={theme}>
        <div className={classes.root}>
          <AppBar position="sticky" color="secondary">
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                Money Manager
              </Typography>
            </Toolbar>
          </AppBar>

          <Grid container className={classes.grid} >
            <Paper elevation={3} className={classes.paper}>
              <Typography variant="h5" className={classes.text1}>
                Welcome to Money Manager!
              </Typography>
              <Typography variant="subtitle2" className={classes.subtitle}>
                Please fill out the rest of the information
              </Typography>

              <form className={classes.form}>
                <Grid container direction="row" spacing={2}>
                  <TextField required 
                            id="outlined-required" 
                            label="First Name" 
                            name="firstName"
                            variant="outlined" 
                            className={classes.text}/>
                  <TextField required
                            id="outlined-required" 
                            label="Last Name" 
                            name="lastName"
                            variant="outlined" 
                            className={classes.text}/>
                  
                </Grid>
                <Grid container direction="row" spacing={2}>
                  <TextField 
                            id="date" 
                            label="Birthday" 
                            type="date"
                            defaultValue="2021/2/25"
                            name="date"
                            variant="outlined" 
                            InputLabelProps={{
                              shrink: true,
                            }}
                            className={classes.text}/>
                  <TextField required
                            id="outlined-required" 
                            label="Last Name" 
                            name="lastName"
                            variant="outlined" 
                            className={classes.text}/>
                  
                </Grid>
                <Grid container direction="column" spacing={2}>
                  <TextField required 
                            fullWidth
                            id="outlined-required" 
                            label="Email@example.com" 
                            name="email"
                            variant="outlined" 
                            className={classes.email}/>
                  <TextField required 
                            fullWidth
                            id="outlined-required" 
                            label="Create password" 
                            name="password"
                            variant="outlined" 
                            className={classes.email}/>
                  <TextField required 
                            fullWidth
                            id="outlined-required" 
                            label="Confirm password" 
                            name="confirm"
                            variant="outlined" 
                            className={classes.email}/>
                </Grid>
                <Button 
                        variant="contained" 
                        color="primary" 
                        type="submit" 
                        className={classes.signInButton}>
                  Sign up
                </Button>
                  
                    
                  
                

              </form>
            </Paper>
          </Grid>
        </div>
      </ThemeProvider>

    )

  }

}

export default withStyles(useStyles)(SignUp);
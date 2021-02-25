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
import  PersonIcon  from '@material-ui/icons/Person';

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
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(3),
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
  logInButton: {
    margin: theme.spacing(1),
  },
  signInButton: {
    float: 'right',
    marginRight: 10,
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

const ConditionalLink = ({ children, to, condition }) => (!!condition && to)
                    ? <Link to={to}></Link>
                    : <>{children}</>

class Login extends React.Component {

  state = {
    userName: "",
    password: "",
    link: "",
    credentials: false,
  };

  handleInputChange = (event) => {
    console.log(event)

    // get the value we type in 
    const target = event.target;
    const value = target.value;
    const name = target.name;
    console.log(value);
    console.log(name);

    // state is updated and value is also updated in JSX
    // the square bracket dynamically changes the name 
    this.setState({
      [name]: value
    })
  }

  handleLogin = (event) => {
    console.log("loggin in...");
    const username = this.state.userName;
    const password = this.state.password;

    if(username == 'user' && password == 'user') {
      this.state.credentials = true;
      this.state.link = '/spendings';
      console.log("correct credentials!")
    } else if(username == 'admin' && password == 'admin') {
      this.state.link = '/spendings';
      this.state.credentials = true;
      console.log("correct credentials!")
    } else {
      this.state.credentials = false;
      this.state.link = '/login';
      this.state.userName = "";
      this.state.password = "";
      console.log("wrong credentials!")
      alert('Wrong credentials! Please re-enter!');
    }

    this.setState({
      link: this.state.link,
      credentials: this.state.credentials
    })

    console.log(this.state.link);
  }

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
                        <Typography variant="subtitle1" className={classes.new}>
                          New User?
                        </Typography>
                        <Link to={'/signup'}>
                          <Button color="primary" variant="contained" className={classes.signInButton}>
                            Get Started
                          </Button>
                        </Link>
                    </Toolbar>
                </AppBar>

                <Grid container className={classes.grid} >
                  <Paper elevation={3} className={classes.paper}>
                    <Typography variant="h5" className={classes.text1}>
                      Welcome back!
                    </Typography>
                    <Typography variant="subtitle2" className={classes.subtitle}>
                      Login to continue
                    </Typography>

                    <form className={classes.form}>
                      <Grid container direction="column" spacing={2}>
                        <TextField required 
                                  onChange={ this.handleInputChange }
                                  value={ this.state.userName }
                                  id="outlined-required" 
                                  label="username" 
                                  name="userName"
                                  variant="outlined" 
                                  className={classes.text}/>
                        <TextField required
                                   value={ this.state.password }
                                   onChange={ this.handleInputChange }
                                   id="outlined-basic" 
                                   label="password" 
                                   name="password"
                                   type="password" 
                                   variant="outlined" 
                                   className={classes.text}/>
                        
                          <ConditionalLink to='/spendings' condition={this.state.credentials}>
                            <Button onClick={ this.handleLogin }
                                    variant="contained" 
                                    color="primary" 
                                    type="submit" 
                                    className={classes.logInButton}>
                              Log in
                            </Button>
                          </ConditionalLink>
                          
                        
                      </Grid>

                    </form>
                  </Paper>
                </Grid>
            </div>   
      </ThemeProvider>
    )
  }
}

export default withStyles(useStyles)(Login);
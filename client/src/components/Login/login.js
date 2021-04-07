import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles,
        AppBar, 
        Toolbar, 
        Typography,
        Button,
        TextField,
        Grid,
        createMuiTheme,
        Paper,
        ThemeProvider,
        Snackbar} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { deepPurple } from '@material-ui/core/colors';
import Footer from '../Footer/footer.js';
import LogoButton from './../Signup/logoButton.js';
import FormTitle from './../Signup/formTitle.js';

// Importing actions/required methods
import { updateLoginForm, login } from "../../actions/user";

const useStyles = theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    cursor: 'pointer',
    marginRight: '70vw',
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
  },
  footer: {
    position: 'absolute',
    marginTop: theme.spacing(25),
    bottom: 0,
    width: '100%',
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

class Login extends React.Component {

  constructor(props) {
    super(props);
    //this.props.history.push("/login");
  }

  state = {
    userName: "",
    password: "",
    userLevel: "",
    displaySnack: false,
    snackMessage: undefined,
  };

  // set state for all the state variables
  handleInputChange = (event) => {

    // get the value we type in 
    const target = event.target;
    const value = target.value;
    const name = target.name;

    // state is updated and value is also updated in JSX
    // the square bracket dynamically changes the name 
    this.setState({
      [name]: value,
      userLevel: this.state.userLevel
    })
  }

  snackBarOnClose() {
    this.setState({ displaySnack: false })
  }

  snackBarOnExited() {
    this.setState({ snackMessage: undefined })
  }

  render() {
    
    const { classes, loginHandler, app } = this.props;

    return (

      <ThemeProvider theme={theme}>
            <div className={classes.root}>
                <AppBar position="sticky" color="secondary">
                    <Toolbar>
                      <LogoButton buttonTitle="Money Manager" />
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
                      {!app.state.signedUpUser ? 
                        <FormTitle firstTitle="Welcome back!"
                                  subTitle="Login to continue"
                        />
                        :
                        <FormTitle firstTitle="Sign up was successful!"
                                  subTitle="Login to continue" 
                        />
                      }

                    <form className={classes.form}>
                      {!this.state.displaySnack ? 
                      <Grid container direction="column" spacing={2}>
                        <TextField required 
                                  onChange={ e => updateLoginForm(this, e.target) }
                                  value={ this.state.userName }
                                  id="outlined-required" 
                                  label="username" 
                                  name="userName"
                                  variant="outlined" 
                                  className={classes.text}/>
                        <TextField required
                                   value={ this.state.password }
                                   onChange={ e => updateLoginForm(this, e.target) }
                                   id="outlined-basic" 
                                   label="password" 
                                   name="password"
                                   type="password" 
                                   variant="outlined" 
                                   className={classes.text}/>
                        
                        <Button onClick={ () => login(this, app) }
                                    variant="contained" 
                                    color="primary" 
                                    className={classes.logInButton}>
                              Log in
                        </Button>
                      </Grid>
                      :
                      <Grid container direction="column" spacing={2}>
                        <TextField required 
                                  error
                                  onChange={ e => updateLoginForm(this, e.target) }
                                  value={ this.state.userName }
                                  id="outlined-required" 
                                  label="username" 
                                  name="userName"
                                  variant="outlined" 
                                  className={classes.text}/>
                        <TextField required
                                   error
                                   value={ this.state.password }
                                   onChange={ e => updateLoginForm(this, e.target) }
                                   id="outlined-basic" 
                                   label="password" 
                                   name="password"
                                   type="password" 
                                   variant="outlined" 
                                   className={classes.text}/>
                        
                        <Button onClick={ () => login(this, app) }
                                    variant="contained" 
                                    color="primary" 
                                    className={classes.logInButton}>
                              Log in
                        </Button>
                      </Grid>
                      }
                    </form>
                  </Paper>
                </Grid>

                <Snackbar
                  open={this.state.displaySnack}
                  autoHideDuration={4000}
                  onClose={() => this.snackBarOnClose()}
                  onExited={() => this.snackBarOnExited()}
                >

                <Alert severity="error"
                      variant="filled">
                  {this.state.snackMessage}
                </Alert>

                </Snackbar>

                <div className={classes.footer}>
                  <Footer />
                </div>
            </div>   
      </ThemeProvider>
    )
  }
}

export default withStyles(useStyles)(Login);
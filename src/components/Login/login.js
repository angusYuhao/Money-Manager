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
        ThemeProvider} from '@material-ui/core';
import { deepPurple } from '@material-ui/core/colors';
import Footer from '../Footer/footer.js';
import LogoButton from './../Signup/logoButton.js';
import FormTitle from './../Signup/formTitle.js';

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

  state = {
    userName: "",
    password: "",
    userLevel: "",
  };

  // set state for all the state variables
  handleInputChange = (event) => {
    console.log(event)

    // get the value we type in 
    const target = event.target;
    const value = target.value;
    const name = target.name;

    /********************************************************************************
    for phase 2, you would be making a server call to check the user level of the user
    *********************************************************************************/
    if(value === "user") {
      this.state.userLevel = "User"
    } else if(value === "admin") {
      this.state.userLevel = "Financial Advisor"
    }
    // state is updated and value is also updated in JSX
    // the square bracket dynamically changes the name 
    this.setState({
      [name]: value,
      userLevel: this.state.userLevel
    })
  }

  render() {
    
    const { classes, loginHandler } = this.props;

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
                      <FormTitle firstTitle="Welcome back!"
                                subTitle="Login to continue"
                      />

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
                        
                        { this.state.userLevel === "Financial Advisor" ? 
                          <Link to={"/community"}>
                            <Button onClick={ () => loginHandler(this.state.userName, this.state.password) }
                                    variant="contained" 
                                    color="primary" 
                                    type="submit" 
                                    className={classes.logInButton}>
                              Log in
                            </Button>
                          </Link>
                          :
                          <Link to={"/spendings"}>
                            <Button onClick={ () => loginHandler(this.state.userName, this.state.password) }
                                    variant="contained" 
                                    color="primary" 
                                    type="submit" 
                                    className={classes.logInButton}>
                              Log in
                            </Button>
                          </Link>
                        }
                      </Grid>

                    </form>
                  </Paper>
                </Grid>

                <div className={classes.footer}>
                  <Footer />
                </div>
            </div>   
      </ThemeProvider>
    )
  }
}

export default withStyles(useStyles)(Login);
import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, 
  withStyles,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Avatar,
  AppBar, 
  Toolbar, 
  Typography,
  Button,
  TextField,
  Grid,
  createMuiTheme,
  InputAdornment,
  Paper,
  ThemeProvider} from '@material-ui/core';
import { deepPurple, grey } from '@material-ui/core/colors';
import { Message } from '@material-ui/icons';

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
  text1: {
    marginTop: theme.spacing(3),
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
  email: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  signInButton: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(1),
  },
  radio: {
    marginRight: theme.spacing(3),
    '&$checked': {
      color: deepPurple[800],
    }
  },
  checked: {},
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

  state = {
    firstName: "",
    lastName: "",
    userName: "",
    birthday: "",
    gender: "",
    occupation: "",
    salary: "",
    email: "",
    createdPassword: "",
    confirmPassword: "",
  };

  handleInputChange = (event) => {
    console.log(event)

    // get the value we type in 
    const target = event.target;
    const value = target.value;
    const name = target.name;
    console.log(value);

    // state is updated and value is also updated in JSX
    // the square bracket dynamically changes the name 
    this.setState({
      [name]: value
    })
  };

  checkLength = (event) => {
    // get the value we type in 
    const target = event.target;
    const value = target.value;
    const name = target.name;
    console.log(value);

    this.setState({
      [name]: value
    })

    if(value.length >= 8) {
      console.log("good password")
    } else {
      console.log("The minimum number of characters for password is 8!")
    }

  }

  handleConfirmPassword = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    
    console.log(value);

    this.setState({
      [name]: value
    })

    if(value !== this.state.createdPassword) {
      console.log("password did not match");
    } else {
      console.log("password match")
    }
  }

  render() {
    
    const { classes } = this.props;

    return (

      <ThemeProvider theme={theme}>
        <div className={classes.root}>
          <AppBar position="sticky" color="secondary">
            <Toolbar>
              <Link to={'/'} style={{ textDecoration: 'none', color: 'black' }}>
                <Typography variant="h6" className={classes.title}>
                  Money Manager
                </Typography>
              </Link>
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
                <Grid container direction="row" spacing={1}>
                  <TextField required 
                            value={ this.state.firstName } 
                            onChange={ this.handleInputChange }
                            id="outlined-required" 
                            label="First Name" 
                            name="firstName"
                            variant="outlined" 
                            className={classes.text}/>
                  <TextField required
                            value={ this.state.lastName } 
                            onChange={ this.handleInputChange }
                            id="outlined-required" 
                            label="Last Name" 
                            name="lastName"
                            variant="outlined" 
                            className={classes.text}/>
                  
                </Grid>
                <Grid container direction="row" spacing={1}>
                  <TextField required
                            value={ this.state.userName } 
                            onChange={ this.handleInputChange }
                            id="outlined-required" 
                            label="User Name" 
                            name="userName"
                            variant="outlined" 
                            className={classes.text}/>
                  <TextField 
                            value={ this.state.birthday } 
                            onChange={ this.handleInputChange }
                            id="date" 
                            label="Birthday" 
                            type="date"
                            name="date"
                            variant="outlined" 
                            InputLabelProps={{
                              shrink: true,
                            }}
                            className={classes.text}/>
                  
                </Grid>
                
                <RadioGroup aria-label="gender" value={ this.state.gender } onChange={ this.handleInputChange } name="gender" row >
                  <FormControlLabel value="female" control={<Radio />} label="Female" className={classes.radio}/>
                  <FormControlLabel value="male" control={<Radio />} label="Male" className={classes.radio}/>
                  <FormControlLabel value="other" control={<Radio />} label="Other" className={classes.radio}/>
                </RadioGroup>
                
                <Grid container direction="row" spacing={1}>
                  <TextField required 
                            value={ this.state.occupation } 
                            onChange={ this.handleInputChange }
                            id="outlined-required" 
                            label="Occupation" 
                            name="occupation"
                            variant="outlined" 
                            className={classes.text}/>
                  <TextField value={ this.state.salary } 
                            onChange={ this.handleInputChange }
                            id="outlined-required" 
                            label="Monthly salary ($)" 
                            name="salary"
                            variant="outlined" 
                            InputProps={{
                              startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            }}
                            className={classes.text}/>
                  
                </Grid>

                <Grid container direction="column" spacing={1}>
                  <TextField required 
                            fullWidth
                            value={ this.state.email } 
                            onChange={ this.handleInputChange }
                            id="outlined-required" 
                            label="Email@example.com" 
                            name="email"
                            variant="outlined" 
                            className={classes.email}/>
                  <TextField required 
                            fullWidth
                            value={ this.state.createdPassword } 
                            onChange={ this.checkLength }
                            id="outlined-required" 
                            label="Create password" 
                            type="password"
                            name="createdPassword"
                            variant="outlined" 
                            className={classes.email}/>
                  <TextField required 
                            fullWidth
                            value={ this.state.confirmPassword } 
                            onChange={ this.handleConfirmPassword }
                            id="outlined-required" 
                            label="Confirm password" 
                            type="password"
                            name="confirmPassword"
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
import React from 'react';
import { Link } from 'react-router-dom';
import {  
  withStyles,
  RadioGroup,
  FormControlLabel,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Radio,
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
    marginTop: theme.spacing(6),
    display: 'flex',
    flexDirection: 'column',  
    borderRadius: 10,
    borderColor: deepPurple[800],
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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 250,
  },
  text: {
    margin: theme.spacing(1),
  },
  fullWidthTextfield: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  signInButton: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(1),
  },
  backHome: {
    float: 'right',
    marginLeft: 40,
  },
  radio: {
    marginRight: theme.spacing(3),
  },
  admin: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
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

  state = {
    userLevel: "Regular User",
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
    passwordLengthError: false,
    passwordConfirmError: false, 
    signedUp: false,
  };

  signedUpHandler = (event) => {
    this.state.signedUp = true;
  }

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
    console.log(name);
    console.log(value);

    this.setState({
      [name]: value
    })

    if(value.length >= 8) {
      this.state.passwordLengthError = false;
      console.log("good password")
    } else {
      this.state.passwordLengthError = true;
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
      this.state.passwordConfirmError = true;
      console.log("password did not match");
    } else {
      this.state.passwordConfirmError = false;
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
              <Link to={'/'}>
                <Button color="primary" variant="contained" className={classes.backHome}>
                  Back to Home
                </Button>
              </Link>
            </Toolbar>
          </AppBar>

          <Grid container className={classes.grid} >
            <Paper variant="outlined" elevation={3} className={classes.paper}>
              <Typography variant="h5" className={classes.text1}>
                Welcome to Money Manager!
              </Typography>
              <Typography variant="subtitle2" className={classes.subtitle}>
                Please fill out the rest of the information
              </Typography>

              <form className={classes.form}>

                <Grid container direction="row" spacing={1}>
                  <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="user-label">Sign up as:</InputLabel>
                    <Select labelId="user-label" 
                            id="user"
                            value={this.state.userLevel}
                            name="userLevel"
                            onChange={this.handleInputChange}
                            label="Sign up as:"
                    >
                      <MenuItem value={"Regular User"}>Regular user</MenuItem>
                      <MenuItem value={"Financial Advisor"}>Financial advisor</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                { this.state.userLevel === "Regular User" ? 
                <div>
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
                              name="birthday"
                              variant="outlined" 
                              InputLabelProps={{
                                shrink: true,
                              }}
                              className={classes.text}/>
                    
                  </Grid>
                  
                  <RadioGroup aria-label="gender" value={ this.state.gender } onChange={ this.handleInputChange } name="gender" row >
                    <FormControlLabel value="female" control={<Radio color="primary" />} label="Female" className={classes.radio}/>
                    <FormControlLabel value="male" control={<Radio color="primary" />} label="Male" className={classes.radio}/>
                    <FormControlLabel value="other" control={<Radio color="primary" />} label="Other" className={classes.radio}/>
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
                              className={classes.fullWidthTextfield}/>
                    
                    { this.state.passwordLengthError ? 
                      <TextField
                                fullWidth
                                error
                                helperText="The minimum number of characters is 8!"
                                value={ this.state.createdPassword } 
                                onChange={ this.checkLength }
                                id="outlined-error" 
                                label="Error" 
                                type="password"
                                name="createdPassword"
                                variant="outlined" 
                                className={classes.fullWidthTextfield}/>
                      :
                      <TextField required 
                              fullWidth
                              value={ this.state.createdPassword } 
                              onChange={ this.checkLength }
                              id="outlined-required" 
                              label="Create password" 
                              type="password"
                              name="createdPassword"
                              variant="outlined" 
                              className={classes.fullWidthTextfield}/>
                    }
                    { this.state.passwordConfirmError ? 
                      <TextField error
                                fullWidth
                                helperText="The password does not match!"
                                value={ this.state.confirmPassword } 
                                onChange={ this.handleConfirmPassword }
                                id="outlined-error" 
                                label="Error" 
                                type="password"
                                name="confirmPassword"
                                variant="outlined" 
                                className={classes.fullWidthTextfield}/>
                      :
                      <TextField required 
                              fullWidth
                              value={ this.state.confirmPassword } 
                              onChange={ this.handleConfirmPassword }
                              id="outlined-required" 
                              label="Confirm password" 
                              type="password"
                              name="confirmPassword"
                              variant="outlined" 
                              className={classes.fullWidthTextfield}/>

                    }
                  </Grid>
                </div>
                :
                <div>
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
                    <FormControlLabel value="female" control={<Radio color="primary" />} label="Female" className={classes.radio}/>
                    <FormControlLabel value="male" control={<Radio color="primary" />} label="Male" className={classes.radio}/>
                    <FormControlLabel value="other" control={<Radio color="primary" />} label="Other" className={classes.radio}/>
                  </RadioGroup>

                  <Grid container direction="column" spacing={1}>
                    <TextField required 
                              fullWidth
                              value={ this.state.email } 
                              onChange={ this.handleInputChange }
                              id="outlined-required" 
                              label="Email@example.com" 
                              name="email"
                              variant="outlined" 
                              className={classes.fullWidthTextfield}/>
                    
                    { this.state.passwordLengthError ? 
                      <TextField
                                fullWidth
                                error
                                helperText="The minimum number of characters is 8!"
                                value={ this.state.createdPassword } 
                                onChange={ this.checkLength }
                                id="outlined-error" 
                                label="Error" 
                                type="password"
                                name="createdPassword"
                                variant="outlined" 
                                className={classes.fullWidthTextfield}/>
                      :
                      <TextField required 
                              fullWidth
                              value={ this.state.createdPassword } 
                              onChange={ this.checkLength }
                              id="outlined-required" 
                              label="Create password" 
                              type="password"
                              name="createdPassword"
                              variant="outlined" 
                              className={classes.fullWidthTextfield}/>
                    }
                    { this.state.passwordConfirmError ? 
                      <TextField error
                                fullWidth
                                helperText="The password does not match!"
                                value={ this.state.confirmPassword } 
                                onChange={ this.handleConfirmPassword }
                                id="outlined-error" 
                                label="Error" 
                                type="password"
                                name="confirmPassword"
                                variant="outlined" 
                                className={classes.fullWidthTextfield}/>
                      :
                      <TextField required 
                              fullWidth
                              value={ this.state.confirmPassword } 
                              onChange={ this.handleConfirmPassword }
                              id="outlined-required" 
                              label="Confirm password" 
                              type="password"
                              name="confirmPassword"
                              variant="outlined" 
                              className={classes.fullWidthTextfield}/>

                    }
                  </Grid>
                  <Grid container direction="row" spacing={1}>
                    <TextField required 
                              value={ this.state.adminPasscode } 
                              onChange={ this.handleInputChange }
                              id="outlined-required" 
                              label="Admin Passcode" 
                              name="adminPasscode"
                              variant="outlined" 
                              className={classes.admin}/> 
                  </Grid>
                </div>
                }
                <Link to={"/spendings"}>
                  <Button signedUp={ this.state.signedUp }
                          onClick={ this.signedUpHandler }
                          variant="contained" 
                          color="primary" 
                          type="submit" 
                          className={classes.signInButton}>
                    Sign up
                  </Button>
                </Link>

              </form>
            </Paper>
          </Grid>
        </div>
      </ThemeProvider>

    )

  }

}

export default withStyles(useStyles)(SignUp);
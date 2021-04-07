import React from 'react';
import { withStyles,
        FormControl,
        InputLabel,
        MenuItem,
        Select,
        AppBar, 
        Toolbar, 
        Button,
        Grid,
        createMuiTheme,
        Paper,
        ThemeProvider} from '@material-ui/core';
import { deepPurple } from '@material-ui/core/colors';
import { withRouter } from 'react-router-dom';
import Footer from '../Footer/footer.js';
import RegularUserForm from '../RegularUserForm/regularUserForm.js';
import FinancialAdvisorForm from '../FinancialAdvisorForm/financialAdvisorForm.js';
import LinkButton from './linkButton.js';
import LogoButton from './logoButton.js';
import FormTitle from './formTitle.js';
import { updateSignupForm, addUser, addFAInfo } from '../../actions/user.js';
const useStyles = theme => ({
  root: {
    flexGrow: 1,
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
  form: {
    margin: theme.spacing(3),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 250,
  },
  signInButton: {
    float: 'right',
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(1),
  },
  footer: {
    marginTop: theme.spacing(5),
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

// All of the information filled on the form will be stored into a database
// If it is admin, there will be a required admin code that will be provided
// by the people who manages the website

class SignUp extends React.Component {

  constructor(props) {
    super(props);
    this.props.history.push("/signup");
  }

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
    FAName: "",
    FAIntro: "N/A",
    FAFields: "N/A",
    FAPoints: 0,
  };

  addInfo = () => {
    console.log("hello????")
    addUser(this, this.props.app)
    addFAInfo(this)
  }

  handleInputChange = (event) => {

    // get the value we type in 
    const target = event.target;
    const value = target.value;
    const name = target.name;

    // state is updated and value is also updated in JSX
    // the square bracket dynamically changes the name 
    this.setState({
      [name]: value
    })
  };

  // check the length of the password and see if its 8 characters and above
  checkLength = (event) => {
    // get the value we type in 
    const target = event.target;
    const value = target.value;
    const name = target.name;

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

  // check if the confirmed password is input correctly as the created 
  // password
  handleConfirmPassword = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    
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

  /********************************************************************************
  for phase 2, you would be making a server call to add the form information and 
  store it in the database
  *********************************************************************************/
  submitValidation = (event) => {
    event.preventDefault();
    this.state.signedUp = true;

    this.setState({
      signedUp: this.state.signedUp,
    })
    this.props.history.push('/spendings');
    return;
  }

  render() {
    
    const { classes, app } = this.props;

    return (

      <ThemeProvider theme={theme}>
        <div className={classes.root}>
          <AppBar position="sticky" color="secondary">
            <Toolbar>

              <LogoButton buttonTitle="Money Manager" />
              <LinkButton buttonTitle="Back to Home" />
      
            </Toolbar>
          </AppBar>

          <Grid container className={classes.grid} >
            <Paper variant="outlined" elevation={3} className={classes.paper}>
              <FormTitle firstTitle="Welcome to Money Manager!"
                         subTitle="Please fill out the rest of the information"
              />

              <form className={classes.form}>

                <Grid container direction="row" spacing={1}>
                  <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="user-label">Sign up as:</InputLabel>
                    <Select labelId="user-label" 
                            id="user"
                            value={this.state.userLevel}
                            name="userLevel"
                            onChange={e => updateSignupForm(this, e.target)}
                            label="Sign up as:"
                    >
                      <MenuItem value={"Regular User"}>Regular user</MenuItem>
                      <MenuItem value={"Financial Advisor"}>Financial advisor</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                { this.state.userLevel === "Regular User" ? 
                
                  <RegularUserForm 
                    signup={ this }
                    firstName={ this.state.firstName }
                    lastName={ this.state.lastName }
                    userName={ this.state.userName }
                    birthday={ this.state.birthday }
                    gender={ this.state.gender }
                    occupation={ this.state.occupation }
                    salary={ this.state.salary }
                    email={ this.state.email }
                    createdPassword={ this.state.createdPassword }
                    checkLength={ this.checkLength }
                    passwordLengthError={ this.state.passwordLengthError }
                    passwordConfirmError={ this.state.passwordConfirmError }
                    confirmPassword={ this.state.confirmPassword }
                    handleConfirmPassword={ this.handleConfirmPassword }
                    handleInputChange={this.handleInputChange}
                  />
                :
                  <FinancialAdvisorForm
                    signup={ this }
                    firstName={ this.state.firstName }
                    handleInputChange={ this.handleInputChange }
                    lastName={ this.state.lastName }
                    userName={ this.state.userName }
                    birthday={ this.state.birthday }
                    gender={ this.state.gender }
                    email={ this.state.email }
                    passwordLengthError={ this.state.passwordLengthError }
                    createdPassword={ this.state.createdPassword }
                    checkLength={ this.checkLength }
                    passwordConfirmError={ this.state.passwordConfirmError }
                    confirmPassword={ this.state.confirmPassword }
                    handleConfirmPassword={ this.handleConfirmPassword }
                    adminPasscode={ this.state.adminPasscode }
                  />
                }
                
                <Button variant="contained" 
                        color="primary"  
                        onClick={() => this.addInfo()}
                        className={classes.signInButton}>
                  Sign up
                </Button>
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

export default withRouter((withStyles(useStyles)(SignUp)));
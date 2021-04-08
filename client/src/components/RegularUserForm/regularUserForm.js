import React from 'react';
import { withStyles,
        RadioGroup,
        FormControlLabel,
        FormControl,
        Radio,
        TextField,
        Grid,
        createMuiTheme,
        InputAdornment,
        Divider,
        Typography,
        InputLabel,
        Select,
        MenuItem} from '@material-ui/core';
import { deepPurple, green } from '@material-ui/core/colors';
import styled from "styled-components";
import { updateSignupForm, updateConfirmPassword } from '../../actions/user.js';
const useStyles = theme => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 250,
    },
    radio: {
      marginRight: theme.spacing(3),
    },
    divider: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(1),
    },
    investment: {
        marginBottom: theme.spacing(1),
    },
    textField: {
        '& p':{
            color:'green',
        },
    },
    floatingLabelFocusStyle: {
        color: "green"
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
    notchedOutline: {
        borderColor: "green"
    }
});

const CssTextField = withStyles({
    root: {
      '& label.Mui-focused': {
        color: 'green',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: 'green',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'green',
          borderWidth: 2,
        },
        '&:hover fieldset': {
          borderColor: 'green',
          borderWidth: 2,
        },
        '&.Mui-focused fieldset': {
          borderColor: 'green',
        },
      },
    },
  })(TextField);
  
class RegularUserForm extends React.Component {

    render() {
        const { classes, signup, firstName, lastName, userName, birthday, gender, occupation, salary, email, 
                accountName, accountNumber, investmentCurrency, createdPassword, checkLength, firstTime, firstTimeConfirm, 
                passwordLengthError, passwordConfirmError, confirmPassword, handleConfirmPassword, handleInputChange } = this.props;
        return (
            <div>
                <Grid container direction="row" spacing={1}>
                <FormControl variant="outlined" className={classes.formControl}>
                    <TextField required 
                            value={ firstName } 
                            onChange={ e => updateSignupForm(signup, e.target) }
                            id="outlined-required" 
                            label="First Name" 
                            name="firstName"
                            variant="outlined" 
                            />
                </FormControl>
                <FormControl variant="outlined" className={classes.formControl}>
                    <TextField required
                            value={ lastName } 
                            onChange={ e => updateSignupForm(signup, e.target) }
                            id="outlined-required" 
                            label="Last Name" 
                            name="lastName"
                            variant="outlined" 
                            />
                </FormControl>
                </Grid>

                <Grid container direction="row" spacing={1}>
                <FormControl variant="outlined" className={classes.formControl}>
                    <TextField required
                            value={ userName } 
                            onChange={ e => updateSignupForm(signup, e.target) }
                            id="outlined-required" 
                            label="User Name" 
                            name="userName"
                            variant="outlined" 
                            />
                </FormControl>
                <FormControl variant="outlined" className={classes.formControl}>
                    <TextField 
                            value={ birthday } 
                            onChange={ e => updateSignupForm(signup, e.target) }
                            id="date" 
                            label="Birthday" 
                            type="date"
                            name="birthday"
                            variant="outlined" 
                            InputLabelProps={{
                                shrink: true,
                            }}
                            />
                </FormControl>
                </Grid>
                
                <RadioGroup aria-label="gender" value={ gender } onChange={ e => updateSignupForm(signup, e.target) } name="gender" row >
                <FormControlLabel value="female" control={<Radio color="primary" />} label="Female" className={classes.radio}/>
                <FormControlLabel value="male" control={<Radio color="primary" />} label="Male" className={classes.radio}/>
                <FormControlLabel value="other" control={<Radio color="primary" />} label="Other" className={classes.radio}/>
                </RadioGroup>
                
                <Grid container direction="row" spacing={1}>
                <FormControl variant="outlined" className={classes.formControl}>
                    <TextField required 
                            value={ occupation } 
                            onChange={ e => updateSignupForm(signup, e.target) }
                            id="outlined-required" 
                            label="Occupation" 
                            name="occupation"
                            variant="outlined" 
                            />
                    </FormControl>
                    <FormControl variant="outlined" className={classes.formControl}>
                    <TextField value={ salary } 
                            onChange={ e => updateSignupForm(signup, e.target) }
                            id="outlined-required" 
                            label="Monthly salary ($)" 
                            name="salary"
                            variant="outlined" 
                            InputProps={{
                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            }}
                            />
                    </FormControl>
                </Grid>
                
                <Divider className={classes.divider} />
                <Typography align="center" variant="h6" className={classes.investment}> Investment details (optional)</Typography>
                <Grid container direction="row" spacing={1}>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="accountName">Account Name:</InputLabel>
                        <Select labelId="accountName" 
                                id="accountName"
                                value={accountName}
                                name="accountName"
                                onChange={e => updateSignupForm(signup, e.target)}
                                label="Account Name:"
                        >
                        <MenuItem value={"TFSA"}>TFSA</MenuItem>
                        <MenuItem value={"RRSP"}>RRSP</MenuItem>
                        <MenuItem value={"USD"}>USD Cash</MenuItem>
                        <MenuItem value={"CAD"}>CAD Cash</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <TextField value={ accountNumber } 
                                onChange={ e => updateSignupForm(signup, e.target) }
                                helperText="i.e. 2A3D4F from your investment portfolio"
                                id="accountNumber" 
                                label="Account Number" 
                                name="accountNumber"
                                variant="outlined" 
                                />
                    </FormControl>
                </Grid>
                <Grid container direction="row" spacing={1}>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="investmentCurrency">Investment Currency:</InputLabel>
                        <Select labelId="investmentCurrency" 
                                id="investmentCurrency"
                                value={investmentCurrency}
                                name="investmentCurrency"
                                onChange={e => updateSignupForm(signup, e.target)}
                                label="Investment Currency:"
                        >
                        <MenuItem value={"CAD"}>CAD($)</MenuItem>
                        <MenuItem value={"USD"}>USD($)</MenuItem>
                        <MenuItem value={"EURO"}>EURO(€)</MenuItem>
                        <MenuItem value={"RMB"}>RMB(¥)</MenuItem>
                        <MenuItem value={"HKG"}>HKG($)</MenuItem>
                        <MenuItem value={"Pound"}>Pound(£)</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                
                <Divider className={classes.divider} />
                <Typography align="center" variant="h6" className={classes.investment}>Account Setup (required)</Typography>
                <Grid container direction="column" spacing={1}>
                <FormControl variant="outlined" className={classes.formControl}>
                    <TextField required 
                            value={ email } 
                            onChange={ e => updateSignupForm(signup, e.target) }
                            id="outlined-required" 
                            label="Email@example.com" 
                            name="email"
                            variant="outlined" 
                            />
                </FormControl>
                
                { passwordLengthError ? 
                    <FormControl variant="outlined" className={classes.formControl}>
                    <TextField fullWidth
                                error
                                helperText="The minimum number of characters is 8!"
                                value={ createdPassword } 
                                onChange={ checkLength }
                                id="outlined-error" 
                                label="Error" 
                                type="password"
                                name="createdPassword"
                                variant="outlined" 
                                />
                    </FormControl>
                    :
                    firstTime ?
                        <FormControl variant="outlined" className={classes.formControl}>
                        <TextField required 
                                value={ createdPassword } 
                                onChange={ checkLength }
                                id="outlined-required" 
                                label="Create password" 
                                type="password"
                                name="createdPassword"
                                variant="outlined" 
                                />
                        </FormControl>
                        :
                        <FormControl variant="outlined" className={classes.formControl}>
                        <CssTextField 
                                autoFocus
                                value={ createdPassword } 
                                onChange={ checkLength }
                                helperText="Good password!"
                                id="outlined-required" 
                                label="Success" 
                                type="password"
                                name="createdPassword"
                                variant="outlined"
                                InputLabelProps={{
                                    className: classes.floatingLabelFocusStyle,
                                }}
                                className={classes.textField} 
                                />
                        </FormControl>
                    }
                
                { passwordConfirmError ? 
                    <FormControl variant="outlined" className={classes.formControl}>
                    <TextField error
                                fullWidth
                                helperText="The password does not match!"
                                value={ confirmPassword } 
                                onChange={ e => updateConfirmPassword(signup, e.target) }
                                id="outlined-error" 
                                label="Error" 
                                type="password"
                                name="confirmPassword"
                                variant="outlined" 
                                />
                    </FormControl>
                    :
                    firstTimeConfirm ?
                        <FormControl variant="outlined" className={classes.formControl}>
                        <TextField required 
                                fullWidth
                                value={ confirmPassword } 
                                onChange={ e => updateConfirmPassword(signup, e.target) }
                                id="outlined-required" 
                                label="Confirm password" 
                                type="password"
                                name="confirmPassword"
                                variant="outlined" 
                                />
                        </FormControl>
                        : 
                        <FormControl variant="outlined" className={classes.formControl}>
                        <CssTextField 
                                fullWidth
                                autoFocus
                                value={ confirmPassword }
                                helperText="The password matches!" 
                                onChange={ e => updateConfirmPassword(signup, e.target) }
                                id="outlined-required" 
                                label="Success" 
                                type="password"
                                name="confirmPassword"
                                variant="outlined"
                                InputLabelProps={{
                                    className: classes.floatingLabelFocusStyle,
                                }}
                                className={classes.textField}  
                                />
                        </FormControl>
                }
                </Grid>

            </div>
            
        )
    }
}

export default withStyles(useStyles)(RegularUserForm);
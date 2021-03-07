import React from 'react';
import { Typography, Button, withStyles, createMuiTheme, Grid, Paper, FormControl, InputLabel, Select, MenuItem, ThemeProvider, TextField } from '@material-ui/core';
import HomeAppBar from './../Home/appBar.js';
import Footer from './../Footer/footer.js';
import { withRouter } from 'react-router-dom';
import { deepPurple, grey } from '@material-ui/core/colors';

const useStyles = theme => ({
    
    contact: {
        position: 'relative',
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(2),
    },
    subtitle: {
        position: 'relative',
        marginLeft: theme.spacing(2),
    },
    grid: {
        direction: 'row',
        justifyContent: 'center',
        minWidth: 600,
    },
    paper: {
        marginTop: theme.spacing(6),
        display: 'flex',
        flexDirection: 'column',  
        marginBottom: theme.spacing(6),
        minWidth: 600,
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
    question: {
        marginLeft: theme.spacing(1),
    },
    sentButton: {
        marginTop: theme.spacing(2),
        float: 'right',
        marginLeft: theme.spacing(1),
    }

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

class Contact extends React.Component {

    state = {
        userLevel: "Regular User",
        request: "",
        email: "",
        additional: "",
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

    submitValidation = (event) => {
        event.preventDefault();
        console.log("inside validation!")
        
        this.props.history.push('/sent');
        return;
        
    }

    render() {
        const { classes } = this.props;

        return (
            <ThemeProvider theme={theme}>
                <div>
                    <HomeAppBar />
                        <Typography variant="h2" className={classes.contact}>
                            Contact us
                        </Typography>
                        <Typography variant="subtitle1" className={classes.subtitle}>
                            Get in touch with the right people. 
                            Email a member of our technical team.
                        </Typography>

                        <Grid container className={classes.grid} >
                            <Paper elevation={3} className={classes.paper}>
                            <Typography variant="h5" className={classes.text1}>
                                Contact our customer service
                            </Typography>
                            <Typography variant="subtitle2" className={classes.subtitle}>
                                Please fill out the rest of the information
                            </Typography>

                            <form onSubmit={ this.submitValidation } className={classes.form}>

                                <Grid container direction="column" spacing={1}>
                                    <Typography variant="subtitle2" className={classes.question}>
                                        What type of user are you? *
                                    </Typography>
                                    <FormControl variant="outlined" className={classes.formControl}>
                                        <InputLabel id="user-label">User level:</InputLabel>
                                        <Select labelId="user-label" 
                                                id="user"
                                                value={this.state.userLevel}
                                                onChange={this.handleInputChange}
                                                name="userLevel"
                                                label="User level"
                                        >
                                        <MenuItem value={"Regular User"}>Regular user</MenuItem>
                                        <MenuItem value={"Financial Advisor"}>Financial advisor</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <Typography variant="subtitle2" className={classes.question}>
                                        What type of request are you looking for? *
                                    </Typography>
                                    <FormControl variant="outlined" className={classes.formControl}>
                                        <InputLabel id="request-label">Request: </InputLabel>
                                        <Select labelId="request-label" 
                                                id="request"
                                                value={this.state.request}
                                                onChange={this.handleInputChange}
                                                name="request"
                                                label="Request"
                                        >
                                        <MenuItem value={"Technical issues"}>Technical issues</MenuItem>
                                        <MenuItem value={"Retrieve a password"}>Retrieve a password</MenuItem>
                                        <MenuItem value={"Open an account"}>Open an account</MenuItem>
                                        <MenuItem value={"Guidance on the website"}>Guidence on the website</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <Typography variant="subtitle2" className={classes.question}>
                                        What is your email address? *
                                    </Typography>
                                
                                    <FormControl variant="outlined" className={classes.formControl}>
                                        <TextField  value={ this.state.email } 
                                                    required 
                                                    onChange={ this.handleInputChange }
                                                    id="outlined-required" 
                                                    label="Email@example.com" 
                                                    name="email"
                                                    variant="outlined" 
                                                    />
                                    </FormControl>
                                          
                                    <Typography variant="subtitle2" className={classes.question}>
                                       Any other things you want to tell us?
                                    </Typography>
                                    <FormControl variant="outlined" className={classes.formControl}>
                                        <TextField 
                                                    value={ this.state.additional } 
                                                    onChange={ this.handleInputChange }
                                                    id="outlined-multiline" 
                                                    multiline
                                                    rows={5}
                                                    defaultValue="Type in here: " 
                                                    name="additional"
                                                    variant="outlined" 
                                                    />
                                    </FormControl>
                                </Grid>
                                
                                <Button variant="contained" 
                                        color="primary" 
                                        type="submit" 
                                        className={classes.sentButton}>
                                    Send
                                </Button>
                                
                            </form>
                        </Paper>
                    </Grid>

                    <Footer />
                </div>
            </ThemeProvider>
        )
    }
}

export default withRouter((withStyles(useStyles)(Contact)));
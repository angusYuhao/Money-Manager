import React from 'react';
import { Typography, Button, withStyles, createMuiTheme, Grid, Paper, FormControl, InputLabel, Select, MenuItem, ThemeProvider, TextField } from '@material-ui/core';
import HomeAppBar from './../Home/appBar.js';
import Footer from './../Footer/footer.js';
import { deepPurple, grey } from '@material-ui/core/colors';

const useStyles = theme => ({

    contact: {
        position: 'relative',
        justifyContent: 'center',
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(2),
    },
    subtitle: {
        position: 'relative',
        marginLeft: theme.spacing(2),
        marginBottom: theme.spacing(49.2),
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

class Sent extends React.Component {

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

    render() {
        const { classes, loggedIn } = this.props;

        return (
            <ThemeProvider theme={theme}>
                <div>
                    <HomeAppBar loggedIn={loggedIn} />
                    <Typography variant="h2" className={classes.contact}>
                        Thank you. <br></br>
                        Your request has been successfully sent!
                    </Typography>
                    <Typography variant="h6" className={classes.subtitle}>
                        The team will get in touch with you shortly.
                    </Typography>

                    <Footer />
                </div>
            </ThemeProvider>
        )
    }
}

export default withStyles(useStyles)(Sent);
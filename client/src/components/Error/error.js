import React from 'react';
import { Typography, Button, AppBar, createMuiTheme, Toolbar, withStyles, InputLabel, Select, MenuItem, ThemeProvider, TextField } from '@material-ui/core';
import { Redirect } from 'react-router';
import HomeAppBar from './../Home/appBar.js';
import broken from './../Images/broken.jpg';
import Footer from './../Footer/footer.js';
import { deepPurple, grey } from '@material-ui/core/colors';

const useStyles = theme => ({
    content: {
        flexGrow: 1,
        display: "flex",
        justifyContent: "center",
        flexDirection: 'column',
    },
    title: {
        flexGrow: 1,
        marginRight: '71vw',
    },
    contact: {
        position: "absolute",
        top: "40%",
        transform: "translate(0, -60%)",
        left: "40%",
    },
    subtitle: {
        position: "absolute",
        top: "50%",
        transform: "translate(0, -50%)",
        left: "40%",
    },
    subtitle2: {
        position: "absolute",
        top: "60%",
        transform: "translate(0, -40%)",
        left: "40%",
    },
    broken: {
        position: "absolute",
        top: "50%",
        transform: "translate(0, -50%)",
        left: "15%",
    },
    logInButton: {
        position: "absolute",
        top: "70%",
        transform: "translate(0, -30%)",
        left: "70%",
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

class Error extends React.Component {

    handleRoute = () => {
        this.props.history.push('/');
    }

    render() {
        const { classes, loggedIn, app } = this.props;
        
        return (
            <ThemeProvider theme={theme}>
                <div className={classes.content}>
                    <AppBar color="secondary">

                        <Toolbar>
                            <Typography variant="h6" className={classes.title}>
                                    Money Manager
                            </Typography>
                        </Toolbar>

                    </AppBar>
                    <img src={broken} alt="broken" className={classes.broken}></img>
                    <Typography variant="h1" className={classes.contact}>
                        Uh-Oh! <br></br>
                    </Typography>
                    <Typography variant="h6" className={classes.subtitle}>
                        Don't worry, it is not you! It is us! <br></br>
                    </Typography>
                    <Typography variant="h6" className={classes.subtitle2}>
                        It seems like there is some internal problems with our server. <br></br>
                        We are sorry and let us help you to get out of this hot mess!
                    </Typography>
                    
                    <Button color="primary" 
                            variant="contained" 
                            className={classes.logInButton}
                            onClick={ this.handleRoute }>
                        Back to Home
                    </Button>

                    
                </div>
            </ThemeProvider>
        
        )
    }
}

export default withStyles(useStyles)(Error);
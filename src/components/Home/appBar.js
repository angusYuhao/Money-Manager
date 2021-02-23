import React from 'react';
import { makeStyles, 
         AppBar, 
         Toolbar, 
         Typography,
         Button,
         createMuiTheme,
         ThemeProvider} from '@material-ui/core';
import { deepPurple, green } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
    signInButton: {
        float: 'right',
        marginRight: 10,
    },
    logInButton: {
        float: 'right',
        margin: 10,
    }
}))

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

export default function HomeAppBar() {
    const classes = useStyles();

    return (
        <ThemeProvider theme={theme}>
            <div className={classes.root}>
                <AppBar position="sticky" color="secondary">
                    
                    <Toolbar>
                        {/*<img class="comLogo" alt="money" src={Logo} />*/}
                        <Typography variant="h6" className={classes.title}>
                            Money Manager
                        </Typography>

                        <Button href="#login" className={classes.logInButton}>
                            Login
                        </Button>
                        <Button href="#signin" color="primary" variant="contained" className={classes.signInButton}>
                            Get Started
                        </Button>
                        
                    </Toolbar>
                    
                </AppBar>
            </div>
        </ThemeProvider>
    );
}


import React from 'react';
import { makeStyles, 
         AppBar,
         Box, 
         Toolbar, 
         Typography,
         Button,
         createMuiTheme,
         ThemeProvider} from '@material-ui/core';
import { deepPurple, green } from '@material-ui/core/colors';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
        cursor: 'pointer',
        marginRight: '71vw',
    },
    signInButton: {
        float: 'right',
        marginRight: 10,

    },
    logInButton: {
        float: 'right',
        marginRight: 10,
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
                        
                        <Link to={'/'} style={{ textDecoration: 'none', color: 'black' }}>
                            <Typography variant="h6" className={classes.title}>
                                Money Manager
                            </Typography>
                        </Link>
                        
                       
                        <Link to={'/login'}>
                            <Button className={classes.logInButton}>
                                Login
                            </Button>
                        </Link>
                        
                        <Link to={'/signup'}>
                            <Button color="primary" variant="contained" className={classes.signInButton}>
                                Get Started
                            </Button>
                        </Link>
                      
                        
                    </Toolbar>
                    
                </AppBar>
            </div>
        </ThemeProvider>
    );
}


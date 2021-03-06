import React from 'react';
import {
    makeStyles,
    AppBar,
    Toolbar,
    Typography,
    Button,
    createMuiTheme,
    ThemeProvider
} from '@material-ui/core';
import { deepPurple } from '@material-ui/core/colors';
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
    },
    removeLine: {
        textDecoration: 'none',
        color: 'black'
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

export default function HomeAppBar(props) {
    const classes = useStyles();

    return (
        <ThemeProvider theme={theme}>
            {!props.loggedIn ?

                <div className={classes.root}>
                    <AppBar position="sticky" color="secondary">

                        <Toolbar>

                            <Link to={'/'} className={classes.removeLine}>
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
                : null}

        </ThemeProvider>
    );
}


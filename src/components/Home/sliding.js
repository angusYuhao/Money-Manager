import { makeStyles, 
    AppBar, 
    Toolbar, 
    Typography,
    Button,
    createMuiTheme,
    ThemeProvider,
    IconButton} from '@material-ui/core';
import { deepPurple} from '@material-ui/core/colors';
import { NavigateNext, NavigateBefore, LinearScale, ScatterPlot, DonutSmall } from '@material-ui/icons';
import { Link } from 'react-router-dom';

import React from 'react';
import { useState } from 'react';
import "./sliding.css";

import Background from './leaves.jpg';
import test from './test_leaves.jpg';
import help from './help.jpg';

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

const useStyles = makeStyles((theme) => ({

    signInButton: {
        position: 'absolute',
        top: '60%',
        left: '85%',
    },
    beforeButton: {
        position: 'absolute',
        top: '50%',
        left: '1%',
    },
    nextButton: {
        position: 'absolute',
        top: '50%',
        left: '95%',
    },
    beforeIcon: {
        fontSize: '2em',
        cursor: 'pointer',
    },
    nextIcon: {
        fontSize: '2em',
        cursor: 'pointer',
    }
}))

export default function Sliding() {
    const classes = useStyles();

    return (

        <ThemeProvider theme={theme}>
            <div className="sliding">
                
                <div className="image_container">
                    <img className="first" src={test} alt="leaves"/>
                    <div className="caption">
                        We help investors make their dreams come true!
                    </div>
                    
                    <Link to={'/signup'}>
                        <Button href="#signin" size="large" color="primary" variant="contained" className={classes.signInButton}>
                            Get Started
                        </Button>
                    </Link>
                </div>

                
                <div className="image_conatainer">
                    <img className="second" src={help} alt="help" />
                    <div className="caption">
                        We help you calculate your spendings.
                    </div>
                    <Link to={'/signup'}>
                        <Button href="#signin" size="large" color="primary" variant="contained" className={classes.signInButton}>
                            Get Started
                        </Button>
                    </Link>
                </div>

                <IconButton color="secondary" aria-label="before" className={classes.beforeButton}>
                    <NavigateBefore className={classes.beforeIcon} />
                </IconButton>

                <IconButton color="primary" aria-label="next" className={classes.nextButton}>
                    <NavigateNext className={classes.nextIcon} />
                </IconButton>

            </div>

        </ThemeProvider>

    );
}



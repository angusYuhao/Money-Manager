import { makeStyles, 
    AppBar, 
    Toolbar, 
    Typography,
    Button,
    createMuiTheme,
    ThemeProvider} from '@material-ui/core';
import { deepPurple, green } from '@material-ui/core/colors';

import React from 'react';
import { useState } from 'react';
import "./sliding.css";

import Background from './leaves.jpg';
import test from './test_leaves.jpg';
import help from './help.jpg';

const Slider = () => {
    return <div>

    </div>
}

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
                    <Button href="#signin" size="large" color="primary" variant="contained" className={classes.signInButton}>
                        Get Started
                    </Button>
                </div>
            </div>

        </ThemeProvider>

    );
}



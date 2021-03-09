import { withStyles,
    Button,
    Box,
    Typography,
    createMuiTheme,
    ThemeProvider,
    IconButton} from '@material-ui/core';
import { deepPurple } from '@material-ui/core/colors';
import { NavigateNext, NavigateBefore } from '@material-ui/icons';
import {Link} from 'react-router-dom';
import React from 'react';
import bitcoin from './bitcoin.jpg';
import stock from './stock.jpg';
import "./sliding.css";

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

const useStyles = theme => ({

    signInButton: {
        position: 'absolute',
        top: '60%',
        left: '70%',
    },
    box: {
        position: 'absolute',
        top: '40%',
        left: '70%',
        borderRadius: 10,
        width: 180,
    },
    text: {
        color: 'white',
    },
    title: {
        position: 'absolute',
        top: '50%',
        left: 100,
    },
    beforeButton: {
        position: 'absolute',
        top: '50%',
        left: 32,
        fontSize: '3em',
        cursor: 'pointer',
    },
    nextButton: {
        position: 'absolute',
        top: '50%',
        right: 32,
        fontSize: '3em',
        cursor: 'pointer',
    },
    beforeIcon: {
        fontSize: '1em',
    },
    nextIcon: {
        fontSize: '1em',
    }

});

const slides = [
    {
        image: bitcoin
    },
    {
        image: stock
    },
    {
        image: 'https://images.unsplash.com/photo-1614867517189-34c259f98b17?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=60'
    }
]

const length = slides.length;
let value = 0;

class Sliding extends React.Component {
    state = {
        currentSlide: 0,
    };

    nextSlide = (event) => {
        console.log(length);

        if(value === length - 1) {
            value = 0;
        } else {
            value = value + 1;
        }

        this.setState({
            currentSlide: value
        })
    }

    prevSlide = (event) => {
        
        if(value === 0) {
            value = length - 1;
        } else {
            value = value - 1;
        }

        this.setState({
            currentSlide: value
        })
    }

    render() {
        const { classes } = this.props;

        return (
            <ThemeProvider theme={theme}>
                <section className="slider">
                    <IconButton value={this.state.currentSlide} name="currentSlide" color="primary" size="large" aria-label="before" name="currentSlide" className={classes.beforeButton} onClick={this.prevSlide}>
                        <NavigateBefore className={classes.beforeIcon} />
                    </IconButton>

                    <IconButton value={this.state.currentSlide} name="currentSlide" color="primary" size="large" aria-label="next" className={classes.nextButton} onClick={this.nextSlide}>
                        <NavigateNext className={classes.nextIcon} />
                    </IconButton>

                    {slides.map((slide, index) => {
                        return (
                            <div>
                                <div className={index === this.state.currentSlide ? 'slide active' : 'slide'} key={index}>
                                    {index === this.state.currentSlide && (<img src={slide.image} alt="travel" className="image"/>)}
                                </div>
                                <Box className={classes.box}>
                                    <Typography variant="h5" className={classes.text}>
                                        We can help investor's dream come true!
                                    </Typography>
                                </Box>
                                <Link to={'/signup'}>
                                    <Button href="#signin" size="large" color="primary" variant="contained" className={classes.signInButton}>
                                        Get Started
                                    </Button>
                                </Link>
                            </div>
                        )
                    })}
                </section>
            </ThemeProvider>
        )
    }

}

export default withStyles(useStyles)(Sliding);
import React from 'react';
import { withStyles, AppBar, Toolbar, ThemeProvider, createMuiTheme, Typography, IconButton } from '@material-ui/core';
import { deepPurple } from '@material-ui/core/colors';
import HelpIcon from '@material-ui/icons/Help';
import InfoIcon from '@material-ui/icons/Info';
import { Link } from 'react-router-dom';

const useStyles = theme => ({
    root: {
        top: 'auto',
        bottom: 0,
    },
    subFooter: {
        backgroundColor: deepPurple[100],
    },
    contactButton: {
        position: 'relative',
        top: '50%',
        left: 32,
        fontSize: '3em',
        cursor: 'pointer',
        marginTop: theme.spacing(1),
    },
    contactIcon: {
        fontSize: '0.5em',
    },
    contact: {
        position: 'relative',
        marginTop: theme.spacing(1),
        top: '50%',
        left: 25,
    },
    copyRight: {
        position: 'relative',
        marginTop: theme.spacing(1),
        top: '50%',
        marginLeft: theme.spacing(45),
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

class Footer extends React.Component {

    render() {
        const { classes } = this.props;

        return (
            <ThemeProvider theme={theme}>
                <div className={classes.root}>
                    <AppBar position="sticky" color="secondary" className={classes.root}>
                        <Toolbar>
                            <Link to={"/contact"} style={{ textDecoration: 'none', color: 'black' }}>
                                <IconButton name="contact" color="primary" size="large" aria-label="contact" className={classes.contactButton}>
                                    <HelpIcon className={classes.contactIcon} />
                                </IconButton>
                            </Link>
                            <Typography variant="subtitle2" className={classes.contact}>
                                Contact us
                            </Typography>
                            <Link to={"/about"} >
                                <IconButton name="about" color="primary" size="large" aria-label="about" className={classes.contactButton}>
                                    <InfoIcon className={classes.contactIcon} />
                                </IconButton>
                            </Link>
                            <Typography variant="subtitle2" className={classes.contact}>
                                About us
                            </Typography>
                            <Typography variant="subtitle2" className={classes.copyRight}>
                                Copyright © 2021 All Rights Reserved
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </div>
            </ThemeProvider>
        )
    }
}

export default withStyles(useStyles)(Footer);
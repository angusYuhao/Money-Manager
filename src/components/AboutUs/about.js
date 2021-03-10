import React from 'react';
import { Typography, 
        withStyles, 
        createMuiTheme, 
        Grid, 
        Paper, 
        ThemeProvider } from '@material-ui/core';
import HomeAppBar from './../Home/appBar.js';
import Footer from './../Footer/footer.js';
import { deepPurple, grey } from '@material-ui/core/colors';

const useStyles = theme => ({
    
    contact: {
        position: 'relative',
        textAlign: 'center',
        verticalAlign: 'middle',
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(2),
    },
    subtitle: {
        position: 'relative',
        marginLeft: theme.spacing(5),
        color: grey[600],
    },
    subtitle2: {
        position: 'relative',
        marginLeft: theme.spacing(5),
        marginBottom: theme.spacing(3),
        color: grey[600],
    },
    grid: {
        direction: 'row',
        justifyContent: 'center',
        minWidth: 1000,
    },
    paper: {
        marginTop: theme.spacing(6),
        display: 'flex',
        flexDirection: 'column',  
        marginBottom: theme.spacing(10),
        maxWidth: 1000,
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
        const { classes } = this.props;

        return (
            <ThemeProvider theme={theme}>
                <div>
                    <HomeAppBar />
                    <Grid container className={classes.grid} >
                        <Paper elevation={3} className={classes.paper}>
                            <Typography variant="h5" className={classes.contact}>
                                About Money Manager
                            </Typography>
                            <Typography variant="subtitle1" className={classes.subtitle}>
                                Money Manager has began as an idea of helping investers to organize their cash flows
                                on their spendings and stock portfolio. If also serves as a tool for investors to 
                                communicate with each other on the forum and talk to financial advisors for opinion. 
                            </Typography>
                            <Typography variant="h5" className={classes.contact}>
                                Our goal
                            </Typography>
                            <Typography variant="subtitle1" className={classes.subtitle}>
                                Our goal is to make this website user-friendly and easily accessible. We are looking 
                                forward to add more additional features for this website including live stock data update 
                                and projected income to help investors achieve their goal easier. We are also looking to
                                add private chat functions with financial advisors to add more flexibility to this webiste.
                            </Typography>
                            <Typography variant="h5" className={classes.contact}>
                                Our team
                            </Typography>
                            <Typography variant="subtitle1" className={classes.subtitle2}>
                                We are 4 University of Toronto Computer Engineering students who are on our way of 
                                pursuing our dreams. We are looking forward to make more contributions to the society. 
                            </Typography>
                        </Paper>
                    </Grid>

                    <Footer />
                </div>
            </ThemeProvider>
        )
    }
}

export default withStyles(useStyles)(Sent);
import React from 'react';
import { Typography, 
        Button,
        CardActionArea,
        Box,
        withStyles, 
        createMuiTheme,
        Card,
        CardActions,
        CardContent,
        CardMedia,
        ThemeProvider, 
        ButtonGroup} from '@material-ui/core';
import { deepPurple, grey } from '@material-ui/core/colors';
import finance_card from './../Images/finance_card.jpg';
import stock_card from './../Images/stock_card.jpg';
import forbes_card from './../Images/forbes.jpg';
import tax_card from './../Images/tax.jpg';
import mutualFunds from './../Images/mutual-funds.jpg';
import bonds from './../Images/bonds.jpg';
import Calculator from './../Investments/Calculator';

const useStyles = theme => ({
    resourcesTitle: {
        color: '#ffffff',
        position: "absolute",
        top: "40%",
        transform: "translate(0, -60%)",
    },
    background: {
        backgroundColor: deepPurple[800],
        display: 'flex',
        height: '40vh',
        position: 'relative',
        display: "flex",
        justifyContent: "center",
        flexDirection: 'column',
        alignItems: 'center',
    },
    subtitle: {
        color: grey[400],
        position: "absolute",
        top: "55%",
        transform: "translate(0, -45%)",
    },
    buttonGroup: {
        marginTop: theme.spacing(25),
    },
    button: {
        width: theme.spacing(20),
        height: theme.spacing(6),
    },
    card: {
        maxWidth: 345,
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(5),
        position: 'relative',
    },
    media: {
        height: 140,
    },
    containCard: {
        display: "flex",
        justifyContent: "space-evenly",
    },
    buttonLearn: {
        position: 'absolute',
        bottom: 0,
        marginBottom: theme.spacing(1),
    },
    calculator: {
        margin: theme.spacing(3),
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

class Resources extends React.Component {
    
    state = {
        finance: true,
        investment: false,
        calculator: false,
    }

    handleFinance = () => {
        this.setState({
            finance: true,
            investment: false,
            calculatos: false,
        })
    }

    handleInvestment = () => {
        this.setState({
            finance: false,
            investment: true,
            calculatos: false,
        })
    }

    handleCalculator = () => {
        this.setState({
            finance: false,
            investment: false,
            calculatos: true,
        })
    }

    render() {
        const { classes, handleLogOut, loggedIn, user, app } = this.props;
        return (
            <ThemeProvider theme={theme}>
                <div className={classes.root}>
                    <Box component="span" className={classes.background}>
                        <Typography variant="h3" className={classes.resourcesTitle}>
                            Resources
                        </Typography>
                        <Typography variant="subtitle1" className={classes.subtitle}>
                            Learn from others and get advice from here!
                        </Typography>
                        <ButtonGroup variant="contained" color="primary" className={classes.buttonGroup}>
                            <Button className={classes.button} onClick={this.handleFinance}>Finance</Button>
                            <Button className={classes.button} onClick={this.handleInvestment}>Investments</Button>
                            <Button className={classes.button} onClick={this.handleCalculator}>Calculator</Button>
                        </ButtonGroup>
                    </Box>

                    { this.state.finance ? 
                        <div className={classes.containCard}>
                            <Card className={classes.card}>
                                <CardActionArea>
                                    <CardMedia
                                        className={classes.media}
                                        image={finance_card}
                                        title="Finance Card"
                                    />
                                    <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Finance
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Finance is a term for matters regarding the creation, management and study of money and investments.
                                    </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <Button size="small" color="primary" href="https://www.investopedia.com/ask/answers/what-is-finance/" target="_blank" className={classes.buttonLearn}>
                                        Learn More About Finance
                                    </Button>
                                </CardActions>
                            </Card>

                            <Card className={classes.card}>
                                <CardActionArea>
                                    <CardMedia
                                        className={classes.media}
                                        image={forbes_card}
                                        title="Forbes Card"
                                    />
                                    <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Forbes
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Forbes is a global media company, focusing on business, investing, technology, entrepreneurship, leadership, and lifestyle.
                                        Go and checkout successful entrepreuneurs!
                                    </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <Button size="small" color="primary" href="https://www.forbes.com/?sh=196729b62254" target="_blank">
                                        Learn More About Forbes
                                    </Button>
                                </CardActions>
                            </Card>

                            <Card className={classes.card}>
                                <CardActionArea>
                                    <CardMedia
                                        className={classes.media}
                                        image={tax_card}
                                        title="Tax Card"
                                    />
                                    <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Taxes
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        A tax is a compulsory financial charge or some other type of levy imposed on a taxpayer by a governmental organization in order to fund government spending and various public expenditures.
                                    </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <Button size="small" color="primary" href="https://www.investopedia.com/terms/t/taxation.asp" target="_blank">
                                        Learn More About Taxes
                                    </Button>
                                </CardActions>
                            </Card>
                        </div>
                        :
                        this.state.investment ?
                            <div className={classes.containCard}>
                                <Card className={classes.card}>
                                    <CardActionArea>
                                        <CardMedia
                                            className={classes.media}
                                            image={stock_card}
                                            title="Stock Card"
                                        />
                                        <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            Stock
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            Stock is all of the shares into which ownership of a corporation is divided.
                                        </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions>
                                        <Button size="small" color="primary" href="https://www.investopedia.com/terms/s/stock.asp" target="_blank" className={classes.buttonLearn}> 
                                            Learn More About Stocks
                                        </Button>
                                    </CardActions>
                                </Card>

                                <Card className={classes.card}>
                                    <CardActionArea>
                                        <CardMedia
                                            className={classes.media}
                                            image={mutualFunds}
                                            title="Mutualfund Card"
                                        />
                                        <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            Mutual Funds
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            A mutual fund is a type of financial vehicle made up of a pool of money collected from many investors to invest in securities like stocks, bonds, money market instruments, and other assets. 
                                        </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions>
                                        <Button size="small" color="primary" href="https://www.investopedia.com/terms/m/mutualfund.asp" target="_blank" >
                                            Learn More About Mutual Funds
                                        </Button>
                                    </CardActions>
                                </Card>

                                <Card className={classes.card}>
                                    <CardActionArea>
                                        <CardMedia
                                            className={classes.media}
                                            image={bonds}
                                            title="Bonds Card"
                                        />
                                        <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            Bonds
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            A bond is a fixed income instrument that represents a loan made by an investor to a borrower (typically corporate or governmental).
                                        </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions>
                                        <Button size="small" color="primary" href="https://www.investopedia.com/terms/b/bond.asp" target="_blank" className={classes.buttonLearn}>
                                            Learn More About Bonds
                                        </Button>
                                    </CardActions>
                                </Card>
                            </div>
                            : 
                            <div className={classes.calculator}>
                                <Calculator/>
                            </div>
                    }
                </div>
            </ThemeProvider>

        )
    }
}

export default withStyles(useStyles)(Resources);
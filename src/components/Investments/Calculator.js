import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { ThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';


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


class Calculator extends React.Component{
    state = {
        menuPosition: null,
        initialInvestment: 0,
        interestRate: 0,
        yrsToGrow: 0,
        compound: 0,
        amount: 0,
        error: 0,
    }

    toggleDrawer = () => {
        this.state.openDrawer = !this.state.openDrawer
        this.setState({ openDrawer: this.state.openDrawer })
    }

    displayCompoundTypes(e) {
        this.setState({ menuPosition: e.currentTarget })
    }
    
    hideCompoundTypes() {
        this.setState({ menuPosition: null })
    }
    
    handleInitInvestment(e){
        console.log(e.target.value)
        this.setState({
            initialInvestment: e.target.value
        })
        // if(!isNaN(e.target.value) && parseFloat(e.target.value) >= 0
    }

    handleInterestRate(e){
        console.log(e.target.value)
        this.setState({
            interestRate: e.target.value
        })
    }
    handleYrsToGrow(e){
        console.log(e.target.value)
        this.setState({
            yrsToGrow: e.target.value
        })
    }
    
    clickedMonthly(event){
        this.setState({
            compound: 12
        })
        this.anchorEl = null;
        this.state.menuPosition = null;
    }

    clickedAnnually(event){
        this.setState({
            compound: 1
        })
        this.anchorEl = null;
        this.state.menuPosition = null;
    }

    clickedQuarterly(event){
        this.setState({
            compound: 4
        })
        this.anchorEl = null;
        this.state.menuPosition = null;
    }

    clickedSemiAnnually(event){
        this.setState({
            compound: 2
        })
        this.anchorEl = null;
        this.state.menuPosition = null;
    }

    calculateAmount(){
        let insideBrackets = ((this.state.interestRate/100)/(this.state.compound)) + 1;
        console.log(insideBrackets);
        let appliedPower = Math.pow(insideBrackets,this.state.compound * this.state.yrsToGrow);
        console.log(appliedPower);
        let finalAmount = appliedPower* this.state.initialInvestment;
        console.log(finalAmount)
        this.setState({
            amount: finalAmount.toFixed(2)
        })
    }

    render(){
        const {compoundTypes} = this.props;
        return(
        <ThemeProvider theme={ theme }>
        <Card className = "CalculatorCard" variant="outlined" color = "secondary"> 
            <CardContent>
                <Typography variant="h3" component="h2">
                    Investment Calculator
                </Typography>
                <br/>
                <form noValidate autoComplete="off">
                    <TextField id="standard-basic" label = "Intial investment($):" defaultValue = "0" 
                     margin="normal"  onChange = {(e) => this.handleInitInvestment(e)}/>
                    <br/>
                    <TextField id="standard-basic" label="Interest rate(%):" defaultValue = "0" 
                    margin="normal" onChange = {(e) => this.handleInterestRate(e)}/>
                    <br/>
                    <TextField id="standard-basic" label="Years to grow(yrs):" defaultValue = "1" 
                    margin="normal" onChange = {(e) => this.handleYrsToGrow(e)}/>
                    <br/>
                    <br/>

                    <div className = "CalculatorButtons">
                        <Button variant="outlined" aria-label="add" color = "primary" onClick={(e) => this.displayCompoundTypes(e)}>
                            Compounding interval
                            <AddCircleIcon/>
                        </Button>
                            <Menu
                                id="long-menu"
                                anchorEl={this.state.menuPosition}
                                open={Boolean(this.state.menuPosition)}
                                onClose={() => this.hideCompoundTypes()}
                            >
                                <MenuItem >
                                    <MenuItem onClick={(e)=>this.clickedMonthly(e)}>Monthly</MenuItem>
                                    <MenuItem onClick={(e)=>this.clickedQuarterly(e)}>Quarterly</MenuItem>
                                    <MenuItem onClick={(e)=>this.clickedSemiAnnually(e)}>Semi-annually</MenuItem>
                                    <MenuItem onClick={(e)=>this.clickedAnnually(e)}>Annually</MenuItem>
                                </MenuItem>
                            </Menu>
                        <br/>
                        <br/>
                        <Button variant="outlined" aria-label="add" color = "primary" onClick={() => this.calculateAmount()}>
                            Calculate
                        </Button>
                    </div>
                    <br/>
                    <TextField InputProps={{readOnly: true,}} label = "Results($)"
                        value={this.state.amount}
                    />
                </form>
            </CardContent>
        </Card>
        </ThemeProvider>
        )
    }
}


export default Calculator;
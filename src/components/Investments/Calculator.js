//Sources referenced:
//https://www.thecalculatorsite.com/articles/finance/compound-interest-formula.php#:~:text=The%20formula%20for%20compound%20interest,the%20number%20of%20time%20periods.

import React from 'react';
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
import { withStyles } from '@material-ui/core'


const useStyles = () => ({
    calculator: {
        backgroundColor: deepPurple[100],
    },
});


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
        yrsToGrow: 1,
        compound: 1,
        amount: 0,
        error: 0,
        strToDisplay: "",
        buttonText: "Compound Rate",
    }

    //To open and close the menu:

    displayCompoundTypes(e) {
        this.setState({ menuPosition: e.currentTarget })
    }

    hideCompoundTypes() {
        this.setState({ menuPosition: null })
    }
    
    //To handle the inputs(error checking will be done once the user clicks calculate):
    handleInitInvestment(e){
        this.setState({
            initialInvestment: e.target.value
        })
    }

    handleInterestRate(e){
        this.setState({
            interestRate: e.target.value
        })
    }
    handleYrsToGrow(e){
        this.setState({
            yrsToGrow: e.target.value
        })
    }

    //Menu options, make sure to update what's shown on the button
    clickedMonthly(event){
        this.setState({
            compound: 12,
            buttonText: "Monthly",
        })
        this.anchorEl = null;
        this.state.menuPosition = null;
    }

    clickedAnnually(event){
        this.setState({
            compound: 1,
            buttonText: "Annualy",
        })
        this.anchorEl = null;
        this.state.menuPosition = null;
    }

    clickedQuarterly(event){
        this.setState({
            compound: 4,
            buttonText: "Quarterly",
        })
        this.anchorEl = null;
        this.state.menuPosition = null;
    }

    clickedSemiAnnually(event){
        this.setState({
            compound: 2,
            buttonText: "Semi-annually",
        })
        this.anchorEl = null;
        this.state.menuPosition = null;
    }

    //Calculate the final amount and do error checking:
    calculateAmount(){
        let insideBrackets = ((this.state.interestRate/100)/(this.state.compound)) + 1;
        console.log(insideBrackets);
        let exponentVal = this.state.compound * this.state.yrsToGrow;
        console.log(exponentVal);
        let appliedPower = Math.pow(insideBrackets,exponentVal);
        console.log(appliedPower);
        let finalAmount = appliedPower* this.state.initialInvestment;
        console.log(finalAmount)
        let compoundStr = "";
        if(this.compound == 1){
            compoundStr = "annually";
        }else if (this.compound == 2){
            compoundStr = "semi-annually";
        }else if (this.compound == 4){
            compoundStr = "quarterly";
        }else{
            compoundStr = "monthly";
        }
        let finalStr =  "Your initial investment of $"+String(this.state.initialInvestment)+" at interest rate of " + String(this.state.interestRate)+ "% will be worth $" + String(finalAmount.toFixed(2))
        + " after " + String(this.state.yrsToGrow)+ " year(s) when compounded " +compoundStr;
       
        if(isNaN(insideBrackets) || isNaN(exponentVal) || isNaN(appliedPower) || isNaN(finalAmount)
        || insideBrackets<0 || exponentVal < 0 || appliedPower < 0 || finalAmount < 0){
            this.setState({
                error:1,
                strToDisplay:"Erroneous input. Please only enter in positive numbers.",
            })
        }else{
            this.setState({
                amount: finalAmount.toFixed(2),
                strToDisplay: finalStr,
            })
        }
        
        this.setState({
            interestRate: 0,
            yrsToGrow: 1,
            compound: 0,
            initialInvestment: 0,
            buttonText: "Compound Rate",
            error:0
        })
    }

    render(){
        const {compoundTypes, classes } = this.props
        return(
        <ThemeProvider theme={ theme }>
        <Card className = {classes.calculator} variant="outlined" color = "secondary"> 
            <CardContent>
                <Typography variant="h3" component="h2">
                    Investment Calculator
                </Typography>
                <br/>
                <form noValidate autoComplete="off">
             
                    <TextField value = {this.state.initialInvestment} label = "Intial investment($):" placeholder="ie. 5000" 
                     margin="normal"  onChange = {(e) => this.handleInitInvestment(e)}/>
                    <br/>
                    <TextField value = {this.state.interestRate} label="Interest rate(%):" placeholder="ie. 5" 
                    margin="normal" onChange = {(e) => this.handleInterestRate(e)}/>
                    <br/>
                    <TextField value = {this.state.yrsToGrow} label="Years to grow(yrs):" placeholder="ie. 1"
                    margin="normal" onChange = {(e) => this.handleYrsToGrow(e)}/>
                    <br/>
                    <br/>

                    <div className = "CalculatorButtons">
                        <Button variant="outlined" aria-label="add" color = "primary" onClick={(e) => this.displayCompoundTypes(e)}>
                            {this.state.buttonText}
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
                    <TextField fullWidth = "true" InputProps={{readOnly: true,}} label = "Results($)"
                        value={this.state.strToDisplay}
                    />
                </form>
            </CardContent>
        </Card>
        </ThemeProvider>
        )
    }
}

export default withStyles(useStyles)(Calculator);
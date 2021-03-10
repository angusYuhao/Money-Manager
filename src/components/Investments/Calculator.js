import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Icon from '@material-ui/core/Icon';


const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '25ch',
    },
}));


class Calculator extends React.Component{
    
    state = {
        menuPosition: null,
        initialInvestment: 0,
        interestRate: 0,
        yrsToGrow: 0,
    }

 
      
    textFieldOnChangeHandler(e, headings, index) {

        this.state.update[headings[index]] = e.target.value
        this.setState({ update: this.state.update })

        // if nothing is in the cell, put null error 
        if (e.target.value == "" || e.target.value === null) this.state.error[index] = null

        else {
            switch (this.props.options[index]) {

                case "Number":
                case "Percentage":
                    // error if input not a number, or less than 0 
                    if (!isNaN(e.target.value) && parseFloat(e.target.value) >= 0) this.state.error[index] = false
                    else this.state.error[index] = true
                    break
                case "Any":
                    // I think description can be anything? 
                    this.state.error[index] = false
                    break
                case "Select":
                    this.state.error[index] = false
                    break
                default:
                    throw ("Please specify a valid option.")

            }
        }

        this.setState({ error: this.state.error })
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

    render(){
        const {compoundTypes} = this.props;
        
        return(
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
                    {/* <TextField id="standard-basic" label="Compounding interval:" defaultValue = "Monthly" margin="normal"/> */}
                    <br/>
                    <TextField id="standard-basic" label="Years to grow(years):" defaultValue = "1" 
                    margin="normal" onChange = {(e) => this.handleYrsToGrow(e)}/>
                    <br/>   
                    <Button variant="outlined" aria-label="add" onClick={(e) => this.displayCompoundTypes(e)}>
                        
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
                            <MenuItem onClick={e => e.stopPropagation()}>Monthly</MenuItem>
                            <MenuItem onClick={e => e.stopPropagation()}>Quarterly</MenuItem>
                            <MenuItem onClick={e => e.stopPropagation()}>Semi-annually</MenuItem>
                            <MenuItem onClick={e => e.stopPropagation()}>Yearly</MenuItem>

                        </MenuItem>

                      </Menu>
                    <br/>
                    <Button variant="outlined" aria-label="add" onClick={() => this.toggleEdit()}>
                        Calculate
                    </Button>
                    

                </form>
            </CardContent>

        </Card>
        )

    }


}


export default Calculator ;
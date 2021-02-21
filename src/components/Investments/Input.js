import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';






class Input extends React.Component {
    state = {
        ticker: 0,
        quantity: 0,
        price: 0,
        avgCost: 0,
        mktValue: 0,
        bookCost: 0,
        gainLoss: 0,
        percentageOfPortfolio:0,
        stockList: [{name: "", quantity: 1, price: 1.0, avgCost: 1.0, mktVal: 1, bookCost: 2, gainLoss:0, percentage:100 }],
    }

    handleInputChange = (event) =>{
        //this in this function refers to the app
        console.log(event)
        const target = event.target
        const value = target.value
        const name = target.name
        this.setState({
          //this is bound to App class 
          [name]: value //now the name of the input
          //entire state is updated
        })
      }

    handleInputStock = () => {
        console.log("Handling input stock");
        const currList = this.state.stockList
        const stock = {
            name:this.state.name,//no query selector..
            quantity: this.state.quantity,
            price: this.state.price,
            avgCost: this.state.avgCost,
            mktVal: this.state.mktVal,
            bookCost: this.state.bookCost,
            gainLoss: this.state.gainLoss,
            percentage:this.state.percentage

        }
        currList.push(stock)
        this.setState({
          stockList:currList
        })
        console.log(this.state.stockList)
      }


    render() {

        return (
        <form className="Input" noValidate autoComplete="off">
        <TextField id="ticker" label="ticker" variant="outlined" onChange={this.handleInputChange}/>
        <TextField id="quantity" label="quantity" variant="outlined" />
        <TextField id="price" label="price" variant="outlined" />
        <TextField id="avgCost" label="avg cost" variant="outlined" />
        <TextField id="mktValue" label="market value" variant="outlined" />
        <TextField id="bookCost" label="book cost" variant="outlined" />
        <TextField id="gainLoss" label="gain/loss" variant="outlined" />
        <TextField id="percentageOfPortfolio" label="percentage of portfolio" variant="outlined" />
        <Button variant="contained" onClick={this.handleInputStock}>Submit</Button>
        </form>
        )
    }
}

export default Input;
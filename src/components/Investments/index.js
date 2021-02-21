import React from 'react';
import Entry from './StockList';
import StockEntryTextBoxes from './Input';
import SubmitButton from './Button';
import Input from './Input'

const log = console.log;



class Investments extends React.Component {

  state = {
    myTotalBalance: 0,
    investmentAccounts: [],
    totalProfit: 0,
    totalCost: 0,
    //investments: [{name: "", quantity: 1, price: 1.0, avgCost: 1.0, mktVal: 1, bookCost: 2, gainLoss:0, percentage:100 }],
  }

  addEntry = (event) => {
    log(event)
    const investmentList = this.state.investments
    const newInvestment = {
      name: this.state.name,
      quantity: this.state.quantity,
      price: this.state.price,
      avgCost: this.state.avgCost,
      mktVal: this.state.mktVal,
      bookCost: this.state.bookCost,
      gainLoss: this.state.gainLoss,
      percentage: this.state.percentage,
    }

    investmentList.push(newInvestment)
    this.setState({
      investments:investmentList
    })

  }


  handleInputChange = (event) =>{
    //this in this function refers to the app
    log(event)
    const target = event.target
    const value = target.value
    const name = target.name
    this.setState({
      //this is bound to App class 
      [name]: value //now the name of the input
      //entire state is updated
    })
  }


  render() {

  
    return (

      <div>
      {/* <input type = "text" onChange = {this.handleInputChange} placeholder="ticker name"></input>
      <input type = "text" onChange = {this.handleInputChange} placeholder="quantity"></input>
      <input type = "text" onChange = {this.handleInputChange} placeholder="price"></input>
      <input type = "text" onChange = {this.handleInputChange} placeholder="market value"></input>
      <input type = "text" onChange = {this.handleInputChange} placeholder="ticker name"></input>
      <input type = "submit" onClick = {this.addEntry} value="Adding stock entry"></input> */}
      {/* <StockEntryTextBoxes/> */}
      {/* <SubmitButton/> */}
      {/* <Entry /> */}
      <Input/>
      </div>

    )

  }

}

export default Investments;

/*  */
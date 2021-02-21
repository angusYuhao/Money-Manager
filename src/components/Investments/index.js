import React from 'react';
import Input from './Input'
import StockList from './StockList'

const log = console.log;



class Investments extends React.Component {

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


  handleInputStock = () => {
    console.log("Handling input stock");
    const stock = {
        name:this.state.name,//no query selector..
        quantity: this.state.quantity,
        price: this.state.price,
        avgCost: this.state.avgCost,
        mktValue: this.state.mktValue,
        bookCost: this.state.bookCost,
        gainLoss: this.state.gainLoss,
        percentageOfPortfolio:this.state.percentageOfPortfolio

    }
    const currList = this.state.stockList
    console.log(currList)
    currList.push(stock)
    this.setState({
      stockList:currList
    })
    console.log(currList)

  }

  handleInputChange = (event) =>{
    //this in this function refers to the app
    console.log("Handle input change")
    const target = event.target
    const value = target.value
    const name = target.name
    this.setState({
      //this is bound to App class 
      [name]: value //now the name of the input
      
      //entire state is updated
    })
    console.log(value);
  }

  render() {

  
    return (

      <div>
      <Input stockList={this.state.stockList} 
      handleInputStock = {this.handleInputStock} 
      handleInputChange = {this.handleInputChange}
      // name = {this.name}
      // quantity = {this.quantity}
      // price = {this.price}
      // avgCost = {this.avgCost}
      // mktValue = {this.mktValue}
      // bookCost = {this.bookCost}
      // gainLoss = {this.gainLoss}
      // percentageOfPortfolio = {this.percentageOfPortfolio}
      />
      <StockList stockList={this.state.stockList}/>
      </div>

    )

  }

}

export default Investments;

/*  */
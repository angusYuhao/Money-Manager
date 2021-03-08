import React from 'react';
import Input from './Input'
import StockList from './StockList'
// import Canvas from './canvasExample'
import PieChart from './PieChart'


class Investments extends React.Component {

  state = {
    totalAmountInvested: 100,
    ticker: 0,
    quantity: 0,
    price: 0,
    avgCost: 0,
    mktValue: 0,
    bookCost: 0,
    gainLoss: 0,
    percentageOfPortfolio:0,
    stockList: [{name: "FB", quantity: 20, price: 1.0, avgCost: 32.5, mktValue: 1, bookCost: 100, gainLoss:0, percentageOfPortfolio:100 },
    {name: "GOOGL", quantity: 3, price: 1.0, avgCost: 1523, mktValue: 1, bookCost: 37, gainLoss:0, percentageOfPortfolio:100 },
    {name: "PDD", quantity: 8, price: 1.0, avgCost: 170, mktValue: 1, bookCost: 34, gainLoss:0, percentageOfPortfolio:100 },
    {name: "GME", quantity: 4, price: 1.0, avgCost: 340, mktValue: 1, bookCost: 78, gainLoss:0, percentageOfPortfolio:100 },
    {name: "MSFT", quantity: 4, price: 1.0, avgCost: 230, mktValue: 1, bookCost: 39, gainLoss:0, percentageOfPortfolio:100 },
    {name: "BABA", quantity: 20, price: 1.0, avgCost: 220, mktValue: 1, bookCost: 46, gainLoss:0, percentageOfPortfolio:100 },
    {name: "V", quantity: 20, price: 1.0, avgCost: 220, mktValue: 1, bookCost: 50, gainLoss:0, percentageOfPortfolio:100 },
    {name: "SHOP", quantity: 20, price: 1.0, avgCost: 220, mktValue: 1, bookCost: 87, gainLoss:0, percentageOfPortfolio:100 }],
  }

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     canvasRef: useCanvas()
  //   };
  // }

  handleInputStock = () => {
    console.log("Handling input stock");
    console.log(this.state.bookCost)
    console.log(this.state.totalAmountInvested)
    let a =Number(this.state.quantity)* Number(this.state.price)
    console.log(Number(this.totalAmountInvested)+Number(a))
    const stock = {
      name:this.state.name,//no query selector..
      quantity: this.state.quantity,
      price: this.state.price,
      avgCost: this.state.avgCost,
      mktValue: this.state.mktValue,
      bookCost: Number(this.state.quantity)* Number(this.state.price),
      gainLoss: this.state.gainLoss,
      percentageOfPortfolio:(Number(this.state.bookCost)/(Number(this.state.bookCost)+Number(this.state.totalAmountInvested)))*100,
      totalAmountInvested: Number(this.totalAmountInvested)+Number(this.bookCost)
    }
    const currList = this.state.stockList
    console.log(currList)
    currList.push(stock)
    this.setState({
      stockList:currList
    })

    console.log(Number(stock.totalAmountInvested))


    console.log(currList)
    for(let i = 0; i < this.state.stockList.length; i++){
      let allStocks = [...this.state.stockList];
      // 2. Make a shallow copy of the item you want to mutate
      let currentStock = {...allStocks[i]};
      // 3. Replace the property you're intested in
      console.log(Number(currentStock.bookCost))
      console.log(Number(currentStock.totalAmountInvested))
      currentStock.percentageOfPortfolio = Number(currentStock.bookCost)/Number(currentStock.totalAmountInvested);
      // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
      allStocks[i] = currentStock;
      // 5. Set the state to our new copy
      this.setState({allStocks});


      // console.log(this.state.stockList[i].percentageOfPortfolio)
      // this.state.stockList[i].percentageOfPortfolio = Number(this.state.stockList[i].bookCost)/Number(this.state.stockList[i].totalAmountInvested)
      // console.log(this.state.stockList[i].percentageOfPortfolio)
    }

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

  }


    //student is the object to reference
  deleteStock = (stock) => {
    //make var because not mutating this 
    console.log("Delete")
    const filteredStock = this.state.stockList.filter((s) => {
      return s !== stock  //the one's we don't want to remove
    })

    this.setState({
      stockList: filteredStock
    })
  }

  editStock = (stock, valueToEdit) => {

    console.log("Editing stock")
    console.log(stock)
    console.log("Value")
    console.log(valueToEdit)
    
  }

  render() {
    return (

      <div>
 
      <Input stockList={this.state.stockList} 
      handleInputStock = {this.handleInputStock} 
      handleInputChange = {this.handleInputChange}
      />
      <StockList stockList={this.state.stockList} deleteStock = {this.deleteStock} editStock = {this.editStock}/>
      
   
      <PieChart listToDisplay = {this.state.stockList}/>
      </div>
      

    )

  }

}

export default Investments;

/*  */
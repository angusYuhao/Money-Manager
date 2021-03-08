import React from 'react';
import Input from './Input'
import StockList from './StockList'
// import Canvas from './canvasExample'
import PieChart from './PieChart'
import BarChart from './BarChart'
import TableComp from '../Table'



class Investments extends React.Component {

  state = {
    //new values for tables
    stockList_headings: ["Name", "Quantity", "Price", "Average Cost", "Market Value", "Book cost", "Gain/Loss", "Percentage of portfolio"],
    stockList_options: ["Any", "Number", "Number", "Number", "Number", "Number", "Number", "Number"],
    stockList_categories: [],
    
    stocklist_data: [{name: "FB", quantity: 20, price: 1.0, avgCost: 32.5, mktValue: 1, bookCost: 100, gainLoss:100, percentageOfPortfolio:100 },
    {name: "GOOGL", quantity: 3, price: 1.0, avgCost: 1523, mktValue: 1, bookCost: 37, gainLoss:200, percentageOfPortfolio:100 },
    {name: "PDD", quantity: 8, price: 1.0, avgCost: 170, mktValue: 1, bookCost: 34, gainLoss:20, percentageOfPortfolio:100 },
    {name: "GME", quantity: 4, price: 1.0, avgCost: 340, mktValue: 1, bookCost: 78, gainLoss:-89, percentageOfPortfolio:100 },
    {name: "MSFT", quantity: 4, price: 1.0, avgCost: 230, mktValue: 1, bookCost: 45, gainLoss:-201, percentageOfPortfolio:100 },
    {name: "BABA", quantity: 20, price: 1.0, avgCost: 220, mktValue: 1, bookCost: 46, gainLoss:30, percentageOfPortfolio:100 },
    {name: "V", quantity: 20, price: 1.0, avgCost: 220, mktValue: 1, bookCost: 50, gainLoss:67, percentageOfPortfolio:100 },
    {name: "SHOP", quantity: 20, price: 1.0, avgCost: 220, mktValue: 1, bookCost: 87, gainLoss:3, percentageOfPortfolio:100 }],
    
    
    //old values for tables
    pieChartSize: 900,
    pieChartRadius: 200,
    totalAmountInvested: 100,
    ticker: 0,
    quantity: 0,
    price: 0,
    avgCost: 0,
    mktValue: 0,
    bookCost: 0,
    gainLoss: 0,
    percentageOfPortfolio:0,
    stockList: [{name: "FB", quantity: 20, price: 1.0, avgCost: 32.5, mktValue: 1, bookCost: 100, gainLoss:100, percentageOfPortfolio:100 },
    {name: "GOOGL", quantity: 3, price: 1.0, avgCost: 1523, mktValue: 1, bookCost: 37, gainLoss:200, percentageOfPortfolio:100 },
    {name: "PDD", quantity: 8, price: 1.0, avgCost: 170, mktValue: 1, bookCost: 34, gainLoss:20, percentageOfPortfolio:100 },
    {name: "GME", quantity: 4, price: 1.0, avgCost: 340, mktValue: 1, bookCost: 78, gainLoss:-89, percentageOfPortfolio:100 },
    {name: "MSFT", quantity: 4, price: 1.0, avgCost: 230, mktValue: 1, bookCost: 45, gainLoss:-201, percentageOfPortfolio:100 },
    {name: "BABA", quantity: 20, price: 1.0, avgCost: 220, mktValue: 1, bookCost: 46, gainLoss:30, percentageOfPortfolio:100 },
    {name: "V", quantity: 20, price: 1.0, avgCost: 220, mktValue: 1, bookCost: 50, gainLoss:67, percentageOfPortfolio:100 },
    {name: "SHOP", quantity: 20, price: 1.0, avgCost: 220, mktValue: 1, bookCost: 87, gainLoss:3, percentageOfPortfolio:100 }],
    sortBy: "Market Value",
    sortDes: {
      "Name": false,
      "Quantity": false,
      "Market Value": false,
      "Gain/Loss": false,
      "Percentage of portfolio": false,
    },
    openDrawer: false
  }

  // componentDidUpdate(undefined, prevState) {
  //   // only update the account balance if any transaction has been modified
  //   if (prevState.transactions_data != this.state.transactions_data) this.sumAccountBalance()
  // }
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     canvasRef: useCanvas()
  //   };
  // }


  // sorting the transactions based on the currently selected element 
  sortStocks = () => {
    this.state.stocklist_data.sort(this.sortObj)
    this.setState({ stocklist_data: this.state.stocklist_data })
  }

  // add newTransaction to the beginning of the transactions_data array 
  addStock = (newStock) => {
    this.state.stocklist_data.unshift(newStock)
    this.setState({ stocklist_data: this.state.stocklist_data })
  }

  // finds the index of the oldTransaction data and replace it with the newTransaction data
  editStock = (oldStock, newStock) => {
    const index = this.state.stocklist_data.findIndex(t => t === oldStock)
    this.state.stocklist_data[index] = newStock
    this.setState({ stocklist_data: this.state.stocklist_data })
  }

  // deletes transaction from transactions_data array 
  deleteStock = (transaction) => {
    const keepTransactions = this.state.stocklist_data.filter(t => t !== transaction)
    this.setState({ stocklist_data: keepTransactions })
  }

  // adds a user defined category 
  addCategory = (newCategory) => {
    if (!this.state.transactions_categories.includes(newCategory))
      this.state.transactions_categories.push(newCategory)
    this.setState({ transactions_categories: this.state.transactions_categories })
  }

  // deletes a user defined category (the default cannot be deleted)
  deleteCategory = (category) => {
    const keepCategories = this.state.transactions_categories.filter(c => c !== category)
    this.setState({ transactions_categories: keepCategories })
  }


  handleInputStock = () => {
    console.log("Handling input stock");
    console.log(this.state.bookCost)
    console.log(this.state.totalAmountInvested)
    let a = Number(this.state.quantity)* Number(this.state.price)
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
      <div>
        <Input stockList={this.state.stockList} 
        handleInputStock = {this.handleInputStock} 
        handleInputChange = {this.handleInputChange}
        />
        <StockList stockList={this.state.stockList} deleteStock = {this.deleteStock} editStock = {this.editStock}/>
        
    
        <PieChart listToDisplay = {this.state.stockList} pieChartSize = {this.state.pieChartSize} pieChartRadius = {this.state.pieChartRadius}/>
      {/* <BarChart listToDisplay = {this.state.stockList}/> */}
      
      </div>
      <div className="Stocklist Table">

        <TableComp
          // use the TableContainer class to style the table itself 
          classes={{ TableContainer: 'TableContainer' }}
          headings={this.state.stockList_headings}
          data={this.state.stocklist_data}
          options={this.state.stockList_options}
          categories={this.state.stockList_categories}
          addRow={this.addStock}
          editRow={this.editStock}
          removeRow={this.deleteStock}
          addCategory={this.addCategory}
          removeCategory={this.deleteCategory}
        />
        </div>
      </div>


      
      

    )

  }

}

export default Investments;

/*  */
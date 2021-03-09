import React from 'react';
// import Input from './Input'
// import StockList from './StockList'
// import Canvas from './canvasExample'
import PieChart from './PieChart'
import BarChart from './BarChart'
import TableComp from '../Table'
import './investments.css'
import SortButton from './SortButton';
import Button from '@material-ui/core/Button';

import Paper from '@material-ui/core/Paper';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
// import Title from './Title'




class Investments extends React.Component {

  state = {
    //general stock data
    stockList_headings: ["Name", "Quantity", "Price", "Average Cost", "Market Value", "Book Cost", "Gain/Loss", "Percentage of portfolio"],
    stockList_options: ["Any", "Number", "Number", "Number", "Number", "Number", "Number", "Number"],
    stockList_categories: [],
    stocklist_data: [{"Name": "FB", "Quantity": 20, "Price": 1.0, "Average Cost": 32.5,  "Market Value": 1, "Book Cost": 100, "Gain/Loss":100, "Percentage of portfolio":100 },
    {"Name": "GOOGL", "Quantity": 3, "Price": 1.0, "Average Cost": 1523,  "Market Value": 1, "Book Cost": 37, "Gain/Loss":200, "Percentage of portfolio":100 },
    {"Name": "PDD", "Quantity": 8, "Price": 1.0, "Average Cost": 170,  "Market Value": 1, "Book Cost": 45, "Gain/Loss":20, "Percentage of portfolio":100 },
    {"Name": "GME", "Quantity": 4, "Price": 1.0, "Average Cost": 340,  "Market Value": 1, "Book Cost": 78, "Gain/Loss":-89, "Percentage of portfolio":100 },
    {"Name": "MSFT", "Quantity": 4, "Price": 1.0, "Average Cost": 230,  "Market Value": 1, "Book Cost": 45, "Gain/Loss":-201, "Percentage of portfolio":100 },
    {"Name": "BABA", "Quantity": 20, "Price": 1.0, "Average Cost": 220,  "Market Value": 1, "Book Cost": 46, "Gain/Loss":30, "Percentage of portfolio":100 },
    {"Name": "V", "Quantity": 20, "Price": 1.0, "Average Cost": 220,  "Market Value": 1, "Book Cost": 50, "Gain/Loss":67, "Percentage of portfolio":100 },
    {"Name": "SHOP", "Quantity": 20, "Price": 1.0, "Average Cost": 220,  "Market Value": 1, "Book Cost": 87, "Gain/Loss":3, "Percentage of portfolio":100 }],

    //table values
    sortBy: "Market Value",
    sortDes: {
      "Name": false,
      "Quantity": false,
      "Market Value": false,
      "Gain/Loss": false,
      "Percentage of portfolio": false,
    },
    openDrawer: false,

    //Pie chart values
    pieChartSize: 600,
    pieChartRadius: 150,
  }

  // componentDidUpdate(undefined, prevState) {
  //   // only update the account balance if any transaction has been modified
  //   if (prevState.transactions_data != this.state.transactions_data) this.sumAccountBalance()
  // }
 
  constructor(props) {
    super(props);
    this.changeSort = this.changeSort.bind(this);
  }

  sortObj = (a, b) => {

    switch (this.state.sortBy) {

      case "Name":
        if (!this.state.sortDes["Name"]) {
          if (a["Name"] < b["Name"]) return -1
          else return 1
        }
        else {
          if (a["Name"] > b["Name"]) return -1
          else return 1
        }

      case "Quantity":
        if (!this.state.sortDes["Quantity"]) {
          if (parseFloat(a["Quantity"]) < parseFloat(b["Quantity"])) return -1
          else return 1
        }
        else {
          if (parseFloat(a["Quantity"]) > parseFloat(b["Quantity"])) return -1
          else return 1
        }

      case "Market Value":
        if (!this.state.sortDes["Market Value"]) {
          if (parseFloat(a["Market Value"]) < parseFloat(b["Market Value"])) return -1
          else return 1
        }
        else {
          if (parseFloat(a["Market Value"]) > parseFloat(b["Market Value"])) return -1
          else return 1
        }
      case "Gain/Loss":
        if (!this.state.sortDes["Gain/Loss"]) {
          if (parseFloat(a["Gain/Loss"]) < parseFloat(b["Gain/Loss"])) return -1
          else return 1
        }
        else {
          if (parseFloat(a["Gain/Loss"]) > parseFloat(b["Gain/Loss"])) return -1
          else return 1
        }
    
      case "Percentage of portfolio":
        if (!this.state.sortDes["Percentage of portfolio"]) {
          if (parseFloat(a["Percentage of portfolio"]) < parseFloat(b["Percentage of portfolio"])) return -1
          else return 1
        }
        else {
          if (parseFloat(a["Percentage of portfolio"]) > parseFloat(b["Percentage of portfolio"])) return -1
          else return 1
        }
      

      case "Default":
        return

    }

  }



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
    console.log("Edit")
    const index = this.state.stocklist_data.findIndex(t => t === oldStock)
    this.state.stocklist_data[index] = newStock
    this.setState({ stocklist_data: this.state.stocklist_data })
  }

  // deletes transaction from transactions_data array 
  deleteStock = (transaction) => {
    const keepTransactions = this.state.stocklist_data.filter(t => t !== transaction)
    this.setState({ stocklist_data: keepTransactions })
  }

  changeSort(sortBy) {
    console.log("Sorting!")
    this.state.sortBy = sortBy
    this.setState({ sortBy: this.state.sortBy })
    this.state.sortDes[sortBy] = !this.state.sortDes[sortBy]
    this.setState({ sortDes: this.state.sortDes })
    this.sortStocks()
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


  //   //student is the object to reference
  // deleteStock = (stock) => {
  //   //make var because not mutating this 
  //   console.log("Delete")
  //   const filteredStock = this.state.stockList.filter((s) => {
  //     return s !== stock  //the one's we don't want to remove
  //   })

  //   this.setState({
  //     stockList: filteredStock
  //   })
  // }

  // editStock = (stock, valueToEdit) => {

  //   console.log("Editing stock")
  //   console.log(stock)
  //   console.log("Value")
  //   console.log(valueToEdit)
    
  // }

  render() {
    return (

    <div className = "InvestmentPage"> 
      <div className = "PieChartTable">
          <div className = "TitleAndPieChart">
            <div className = "StockPieChartTitle">
                Stock Portfolio
            </div>
            <div className = "PieChart">
              <PieChart listToDisplay = {this.state.stocklist_data} pieChartSize = {this.state.pieChartSize} pieChartRadius = {this.state.pieChartRadius}/>            
            </div>
          </div>

          <div className = "StockList">
            <div className="StockTable" width = "100vw">
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
              />
          </div>

          <div className="SortButtons">
            <SortButton categoryName = "Name" callBackFunction = {this.changeSort} 
            sortDes = {this.state.sortDes} sortBy = {this.state.sortBy}/>
            <SortButton categoryName = "Quantity" callBackFunction = {this.changeSort} 
            sortDes = {this.state.sortDes} sortBy = {this.state.sortBy}/>
            <SortButton categoryName = "Market Value" callBackFunction = {this.changeSort} 
            sortDes = {this.state.sortDes} sortBy = {this.state.sortBy}/>
            <SortButton categoryName = "Gain/Loss" callBackFunction = {this.changeSort} 
            sortDes = {this.state.sortDes} sortBy = {this.state.sortBy}/>
            <SortButton categoryName = "Percentage of portfolio" callBackFunction = {this.changeSort} 
            sortDes = {this.state.sortDes} sortBy = {this.state.sortBy}/>
          </div>
        </div>
      </div>
      <div className = "BarChart">
          {/* <Input stockList={this.state.stockList} 
          handleInputStock = {this.handleInputStock} 
          handleInputChange = {this.handleInputChange}
          />
          <StockList stockList={this.state.stockList} deleteStock = {this.deleteStock} editStock = {this.editStock}/> */}
          
      
          {/* <PieChart listToDisplay = {this.state.stocklist_data} pieChartSize = {this.state.pieChartSize} pieChartRadius = {this.state.pieChartRadius}/> */}
        <BarChart listToDisplay = {this.state.stocklist_data}/>
      </div>
    </div>

    )

  }

}

export default Investments;

/*  */
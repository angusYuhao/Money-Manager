import React from 'react';
// import Input from './Input'
// import StockList from './StockList'
// import Canvas from './canvasExample'
import PieChart from './PieChart'
import BarChart from './BarChart'
import TableComp from '../Table'
import './investments.css'
import SortButton from './SortButton';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import { deepPurple, grey } from '@material-ui/core/colors';
import { withStyles } from "@material-ui/core/styles";
import Calculator from './Calculator'
import { makeStyles } from '@material-ui/core/styles';


import Button from '@material-ui/core/Button';

import Paper from '@material-ui/core/Paper';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
// import Title from './Title'


const useStyles = theme => ({
  root: {
    diplay: 'flex',
  }
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

class Investments extends React.Component {

  state = {
    //general stock data
    stockList_headings: ["Name", "Quantity", "Price", "Average Cost", "Market Value", "Book Cost", "Gain/Loss"],
    stockList_options: ["Any", "Number", "Number", "Number", "Number", "Number", "Number", "Number"],
    stockList_categories: [],
    stocklist_data: [{"Name": "FB", "Quantity": 15, "Price": 310.0, "Average Cost": 232.5,  "Market Value": 4560, "Book Cost": 3487.5, "Gain/Loss":1072.5},
    {"Name": "GOOGL", "Quantity": 3, "Price": 1500.40, "Average Cost": 1523,  "Market Value": 4501.2, "Book Cost": 4569, "Gain/Loss":-67.8 },
    {"Name": "PDD", "Quantity": 8, "Price": 260.03, "Average Cost": 190,  "Market Value": 1840.24, "Book Cost": 2080.24, "Gain/Loss":-240},
    {"Name": "GME", "Quantity": 11, "Price": 280.45, "Average Cost": 340,  "Market Value": 3084.95, "Book Cost": 3740, "Gain/Loss":-655.05 },
    {"Name": "MSFT", "Quantity": 4, "Price": 330.0, "Average Cost": 230,  "Market Value": 1320, "Book Cost": 920, "Gain/Loss":1473.56},
    {"Name": "BABA", "Quantity": 17, "Price": 222.98, "Average Cost": 136.3,  "Market Value": 3790.66, "Book Cost": 2317.1, "Gain/Loss":1473.56 },
    {"Name": "V", "Quantity": 20, "Price": 233.0, "Average Cost": 220,  "Market Value": 4660, "Book Cost": 4400, "Gain/Loss":260},
    {"Name": "SHOP", "Quantity": 20, "Price": 233.8, "Average Cost": 220,  "Market Value": 4676, "Book Cost": 4400, "Gain/Loss":276}],

    //table values
    sortBy: "Market Value",
    sortDes: {
      "Name": false,
      "Quantity": false,
      "Market Value": false,
      "Gain/Loss": false,
    },
    openDrawer: false,

    //Pie chart values
    pieChartSize: 650,
    pieChartRadius: 175,
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

  render() {
    return (

    <ThemeProvider theme={ theme }>
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

      <div>
      <Calculator/>
      </div>


      <div className = "BarChart">
          {/* <Input stockList={this.state.stockList} 
          handleInputStock = {this.handleInputStock} 
          handleInputChange = {this.handleInputChange}
          />
          <StockList stockList={this.state.stockList} deleteStock = {this.deleteStock} editStock = {this.editStock}/> */}
          
      
          {/* <PieChart listToDisplay = {this.state.stocklist_data} pieChartSize = {this.state.pieChartSize} pieChartRadius = {this.state.pieChartRadius}/> */}
        <BarChart listToDisplay = {this.state.stocklist_data} col = "Gain/Loss"/>
      </div>
    </div>

    </ThemeProvider>
    )

  }

}

export default withStyles(useStyles)(Investments);


/*  */
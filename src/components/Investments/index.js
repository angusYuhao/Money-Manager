import React from 'react';
import PieChart from './PieChart'
import TableComp from '../Table'
import './investments.css'
import SortButton from './SortButton';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import { deepPurple, grey } from '@material-ui/core/colors';
import { withStyles } from "@material-ui/core/styles";
import Calculator from './Calculator'
import GeneralCard from './GeneralCard';

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
    stockList_options: ["Any", "Number", "Dollar", "Dollar", "Dollar", "Dollar", "Dollar", "Dollar"],
    stockList_categories: [],

    //some hard coded stock entries: will need to be linked to some database
    stocklist_data: [{"Name": "FB", "Quantity": 15, "Price": 310.0, "Average Cost": 232.5,  "Market Value": 4560, "Book Cost": 3487.5, "Gain/Loss":1072.5},
    {"Name": "GOOGL", "Quantity": 3, "Price": 1500.40, "Average Cost": 1523,  "Market Value": 4501.2, "Book Cost": 4569, "Gain/Loss":-67.8 },
    {"Name": "PDD", "Quantity": 9, "Price": 260.03, "Average Cost": 250,  "Market Value": 2340.27, "Book Cost": 2250, "Gain/Loss":-240},
    {"Name": "GME", "Quantity": 11, "Price": 280.45, "Average Cost": 340,  "Market Value": 3084.95, "Book Cost": 3740, "Gain/Loss":-655.05 },
    {"Name": "MSFT", "Quantity": 6, "Price": 330.0, "Average Cost": 280,  "Market Value": 1980, "Book Cost": 1680, "Gain/Loss":1473.56},
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
    //These sizes were chosen to have a good ratio between the account 
    //overview card and the pie chart itself
    pieChartSize: 700,
    pieChartRadius: 200,
    total: 0,
  }

  constructor(props) {
    super(props);
    this.changeSort = this.changeSort.bind(this);
    this.totalMoneyInvested();
  }

  //For sorting the stock entries in the table:
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

  //For re-ensuring the sum is up to date:
  componentDidUpdate(undefined, prevState) {
    // only update the account balance if any transaction has been modified
    if (prevState.stocklist_data != this.state.stocklist_data) {
      console.log("componenet updated");
      this.totalMoneyInvested();
      
    }
  }

  totalMoneyInvested = () => {
    this.state.total = this.state.stocklist_data.reduce( (ttl, stock) => {
      return ttl +  parseFloat(stock["Book Cost"]) 
    }, 0);
    this.setState({total: this.state.total})
    console.log(this.state.total)
  }


  // sorting the transactions based on the currently selected element 
  sortStocks = () => {
    this.state.stocklist_data.sort(this.sortObj)
    this.setState({ stocklist_data: this.state.stocklist_data })
  }

  // add newTransaction to the beginning of the stocklist array 
  addStock = (newStock) => {
    this.state.stocklist_data.unshift(newStock)
    this.setState({ stocklist_data: this.state.stocklist_data })
    this.totalMoneyInvested();
  }

  // finds the index of the stock data and replace it with the new stock data
  editStock = (oldStock, newStock) => {
    //console.log("Edit")
    const index = this.state.stocklist_data.findIndex(t => t === oldStock)
    this.state.stocklist_data[index] = newStock
    this.setState({ stocklist_data: this.state.stocklist_data })
    this.totalMoneyInvested();
  }

  // deletes stocks from the stock list
  deleteStock = (transaction) => {
    const keepTransactions = this.state.stocklist_data.filter(t => t !== transaction)
    this.setState({ stocklist_data: keepTransactions })
    this.totalMoneyInvested();
  }

  changeSort(sortBy) {
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

      <div className = "PieChartGeneral">
          <div className = "TitleAndPieChart">
            <div className = "StockPieChartTitle">
                Stock Portfolio
            </div>
            <div className = "PieChart">
              <PieChart totalAmountInvested = {this.state.total} listToDisplay = {this.state.stocklist_data} pieChartSize = {this.state.pieChartSize} pieChartRadius = {this.state.pieChartRadius}/>            
            </div>
          </div>
          <div className = "GeneralInfo">
            <GeneralCard total = {this.state.total}/>
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
        </div>
      </div>

      <div className = "Calculator">
      <Calculator/>
      </div>
    </div>

    </ThemeProvider>
    )

  }

}

export default withStyles(useStyles)(Investments);

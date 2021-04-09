import React from 'react';
import PieChart from './PieChart'
import BarChart from './BarChart'
// import newBarChart from './BarChartNew'
import TableComp from '../Table'
import './investments.css'

import SortButton from './SortButton';
// import App from './liveStock';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import { deepPurple, grey } from '@material-ui/core/colors';
import { withStyles } from "@material-ui/core/styles";
import Calculator from './Calculator'
import GeneralCard from './GeneralCard';
import { Redirect } from 'react-router';

// getting the config settings variable 
import CONFIG from '../../config'
// const { User } = require("../models/user");
// const username = "ianc999"
// const pw = "11111111"

//let user = User.findByUserNamePassword(username, pw);


const API_HOST = CONFIG.api_host

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
    //general account data: upon signup, pass in this info
    accountName: "TFSA",
    accountNumber: "ABCDEFG",
    currency: "USD$",

    //general stock data
    stockList_headings: ["Last Traded Date", "Name", "Quantity", "Price", "Average Cost", "Market Value", "Book Cost", "Gain/Loss"],
    stockList_options: ["Date", "Any", "Number", "Number", "Number", "Number", "Number", "Number"],
    stockList_categories: [],
    stocklist_data: [],

    //table values  
    sortBy: "Last Traded Date",
    sortDes: {
      "Last Traded Date": false,
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
    pieChartRadius: 190,
    barChartWidth: 1100,
    barChartHeight: 600,
    total: 0,
  }

  
  constructor(props) {
    super(props);
    this.changeSort = this.changeSort.bind(this);
    
  }

  //For sorting the stock entries in the table:
  sortObj = (a, b) => {
    switch (this.state.sortBy) {
      case "Last Traded Date":
        if (!this.state.sortDes["Last Traded Date"]) {
          if (a["Last Traded Date"] < b["Last Traded Date"]) return -1
          else return 1
        }
        else {
          if (a["Last Traded Date"] > b["Last Traded Date"]) return -1
          else return 1
        }

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

  componentDidMount() {

    // populate the data variable in the state upon mount 

    const url = `${API_HOST}/investments`
    const request = new Request(url, {
      method: "GET",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      }
    })

    fetch(request)
      .then(res => res.json())
      .then(data => {
        this.setState({ stocklist_data: data })
        this.totalMoneyInvested();

      })
      .catch(error => {
        console.log(error)
      })
  }

  //For re-ensuring the sum is up to date:
  componentDidUpdate(undefined, prevState) {
    // only update the account balance if any transaction has been modified
    if (prevState.stocklist_data != this.state.stocklist_data) {
      this.totalMoneyInvested();
      
    }
  }

  totalMoneyInvested = () => {
    this.state.total = this.state.stocklist_data.reduce( (ttl, stock) => {
      return ttl +  parseFloat(stock["Book Cost"]) 
    }, 0);
    this.setState({total: this.state.total})
  }


  // sorting the transactions based on the currently selected element 
  sortStocks = () => {
    this.state.stocklist_data.sort(this.sortObj)
    this.setState({ stocklist_data: this.state.stocklist_data })
  }

  // add newTransaction to the beginning of the stocklist array 
  addStock = (newStock) => {
    console.log(newStock);
    //const stockname = newStock.Name
    const url = `${API_HOST}/investments/`
    const request = new Request(url, {
      method: "POST",
      body: JSON.stringify(newStock),
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      }
    })

    fetch(request)
      .then(res => res.json())
      .then(data => {
        if(data == "duplicate"){
          console.log("You already have a stock with the same name in your stock table!");
          return;
        }
        console.log(data);
        this.setState({ stocklist_data: data })
        this.totalMoneyInvested();

      })
      .catch(error => {
        console.log(error)
      })
      console.log(this.state.stocklist_data)
    // this.state.stocklist_data.unshift(newStock)
    // this.setState({ stocklist_data: this.state.stocklist_data })
    // this.totalMoneyInvested();
  }

  // deletes stocks from the stock list
  deleteStock = (stockToDelete,numToDelete) => {
    console.log("Deleting stock");
    console.log(stockToDelete)
    // const keepTransactions = this.state.stocklist_data.filter(t => t !== transaction)
    // this.setState({ stocklist_data: keepTransactions })
    // this.totalMoneyInvested();
    const stockname = stockToDelete["Name"];

    const url = `${API_HOST}/investments/${stockname}/${numToDelete}`
    const request = new Request(url, {
      method: "DELETE",
      body: JSON.stringify(stockToDelete),
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      }
    })

    fetch(request)
      .then(res => res.json())
      .then(data => {
        this.setState({ stocklist_data: data })
        this.totalMoneyInvested();
      })
      .catch(error => {
        console.log(error)
      })
  }


  getStock = async ticker => {
    console.log("Getting data");
    const request = new Request(`${API_HOST}/stock`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
    
        body: JSON.stringify({
          ticker: ticker,
        })
    });
  
    fetch(request)
      .then(res => res.json())
      .then(data =>{
        console.log(data);
      })
      .then(data => {
        this.setState({ stocklist_data: data })
        this.totalMoneyInvested();
      })
      .catch(error => {
        console.log(error)
      })
};
  

  changeSort(sortBy) {
    this.state.sortBy = sortBy
    this.setState({ sortBy: this.state.sortBy })
    this.state.sortDes[sortBy] = !this.state.sortDes[sortBy]
    this.setState({ sortDes: this.state.sortDes })
    this.sortStocks()
  }

  render() {
    const { loggedIn } = this.props
    return ( 
    loggedIn ? 
    <ThemeProvider theme={ theme }>
    <div className = "InvestmentPage">
      <div className = "PieChartGeneral">
        <div className = "TitleAndPieChart">
          <div className = "StockPieChartTitle">
              Stock Portfolio
          </div>
          <div className = "PieChart">
            <PieChart listToDisplay = {this.state.stocklist_data} pieChartSize = {this.state.pieChartSize} pieChartRadius = {this.state.pieChartRadius}/>            
          </div>
        </div>

        <div className = "GeneralInfo">
          <GeneralCard total = {this.state.total} accountName = {this.state.accountName} accountNumber = {this.state.accountNumber} currency = {this.state.currency}/>
        </div>
      </div>

      <div className = "BarChartGeneral">
        <div className = "BarChartTitle">
            Overall Portfolio Performance
        </div>
        <div className = "BarChart">
          <BarChart listToDisplay = {this.state.stocklist_data} 
                    numDatasets = {3} indices = {["Book Cost", "Market Value", "Gain/Loss"]} 
                    labelIndex = "Name" 
                    barChartWidth = {this.state.barChartWidth} 
                    barChartHeight = {this.state.barChartHeight}/>
       
        </div>
      </div>

      <div className = "StockList">
        <div className="StockTable">
          <TableComp
            // use the TableContainer class to style the table itself 
            classes={{ TableContainer: 'TableContainer' }}
            headings={this.state.stockList_headings}
            data={this.state.stocklist_data}
            options={this.state.stockList_options}
            categories={this.state.stockList_categories}
            addRow={this.addStock}
            // removeRow={this.deleteStock}
            tableType='Investments'
            sellStock={this.deleteStock}
          />
        </div>

        <div className="SortButtons">
          <SortButton categoryName = "Last Traded Date" callBackFunction = {this.changeSort} 
          sortDes = {this.state.sortDes} sortBy = {this.state.sortBy}/>
          <SortButton categoryName = "Name" callBackFunction = {this.changeSort} 
          sortDes = {this.state.sortDes} sortBy = {this.state.sortBy}/>
          <SortButton categoryName = "Quantity" callBackFunction = {this.changeSort} 
          sortDes = {this.state.sortDes} sortBy = {this.state.sortBy}/>
          <SortButton categoryName = "Market Value" callBackFunction = {this.changeSort} 
          sortDes = {this.state.sortDes} sortBy = {this.state.sortBy}/>
          <SortButton categoryName = "Gain/Loss" callBackFunction = {this.changeSort} 
          sortDes = {this.state.sortDes} sortBy = {this.state.sortBy}/>
        </div>

        {/* <div className = "Calculator">
        <Calculator/>
        </div> */}
      </div>

     

    </div>
    </ThemeProvider> : <Redirect to="/login" />
    )
  }
}

export default withStyles(useStyles)(Investments);

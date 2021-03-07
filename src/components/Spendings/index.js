import React from 'react';
import { Redirect } from 'react-router';
import TableComp from '../Table'

import Button from '@material-ui/core/Button';

import './spendings.css'
import pieChart from './pieChart.png'

class Spendings extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      // the headings to appear in the header bar 
      transactions_headings: ["Date", "Amount", "Description", "Category"],
      // the options for each transaction for the table to know which kind of cell to display
      transactions_options: ["Date", "Number", "Any", "Select"],
      // a list of the categories that the transaction falls under 
      transactions_categories: ["Food", "Personal", "Transportation", "Home"],
      // the data to appear in each rows of the table 
      transactions_data: [
        { "Date": "02/01/2021", "Amount": "35.23", "Description": "McDonalds", "Category": "Food" },
        { "Date": "02/03/2021", "Amount": "26.38", "Description": "Starbucks", "Category": "Food" },
        { "Date": "02/05/2021", "Amount": "136.83", "Description": "Runners", "Category": "Personal" },
        { "Date": "02/07/2021", "Amount": "13.28", "Description": "Movies", "Category": "Personal" },
        { "Date": "02/09/2021", "Amount": "52.85", "Description": "Presto Card", "Category": "Transportation" },
        { "Date": "02/12/2021", "Amount": "83.16", "Description": "Internet + Utilities", "Category": "Home" },
        { "Date": "02/15/2021", "Amount": "267.33", "Description": "Gift for Joe", "Category": "Personal" },
        { "Date": "02/18/2021", "Amount": "8.37", "Description": "Bubble Tea", "Category": "Food" },
      ],
      // the net balance on the account 
      accountBalance: 0,
      sortBy: "Date"
    }

    this.sumAccountBalance()

  }

  // array form for data 
  // ["02/01/2021", "35.23", "McDonalds", "Food"],
  // ["02/03/2021", "26.38", "Starbucks", "Food"],
  // ["02/05/2021", "136.83", "Runners", "Personal"],
  // ["02/07/2021", "13.28", "Movies", "Personal"],
  // ["02/09/2021", "52.85", "Presto Card", "Transportation"],
  // ["02/12/2021", "83.16", "Internet + Utilities", "Home"],
  // ["02/15/2021", "267.33", "Gift for Joe", "Personal"],
  // ["02/18/2021", "8.37", "Bubble Tea", "Food"]

  // just in case if we need to switch structure to obj 
  // {"Date": "02/01/2021", "Amount": "35.23", "Description": "McDonalds", "Category": "Food"},
  // {"Date": "02/03/2021", "Amount": "26.38", "Description": "Starbucks", "Category": "Food"},
  // {"Date": "02/05/2021", "Amount": "136.83", "Description": "Runners", "Category": "Personal"},
  // {"Date": "02/07/2021", "Amount": "13.28", "Description": "Movies", "Category": "Personal"},
  // {"Date": "02/09/2021", "Amount": "52.85", "Description": "Presto Card", "Category": "Transportation"},
  // {"Date": "02/12/2021", "Amount": "83.16", "Description": "Internet + Utilities", "Category": "Home"},
  // {"Date": "02/15/2021", "Amount": "267.33", "Description": "Gift for Joe", "Category": "Personal"},
  // {"Date": "02/18/2021", "Amount": "8.37", "Description": "Bubble Tea", "Category": "Food"},

  componentDidUpdate(undefined, prevState) {
    // only update the account balance if any transaction has been modified
    if (prevState.transactions_data != this.state.transactions_data) this.sumAccountBalance()
  }

  sumAccountBalance = () => {
    this.state.accountBalance = this.state.transactions_data.reduce((total, current) => {
      let sum = parseFloat(total) + parseFloat(current["Amount"])
      sum = sum.toFixed(2)
      return sum
    }, 0)
    this.setState({ accountBalance: this.state.accountBalance })
  }

  // add newTransaction to the beginning of the transactions_data array 
  addTransaction = (newTransaction) => {
    this.state.transactions_data.unshift(newTransaction)
    this.setState({ transactions_data: this.state.transactions_data })
  }

  // finds the index of the oldTransaction data and replace it with the newTransaction data
  editTransaction = (oldTransaction, newTransaction) => {
    const index = this.state.transactions_data.findIndex(t => t === oldTransaction)
    this.state.transactions_data[index] = newTransaction
    this.setState({ transactions_data: this.state.transactions_data })
  }

  // deletes transaction from transactions_data array 
  deleteTransaction = (transaction) => {
    const keepTransactions = this.state.transactions_data.filter(t => t !== transaction)
    this.setState({ transactions_data: keepTransactions })
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

  changeSort(sortBy) {
    this.state.sortBy = sortBy
    this.setState({ sortBy: this.state.sortBy })
  }

  render() {

    const { loggedIn } = this.props

    return (

      loggedIn ?

        <div>

          <br></br>
          <br></br>
          <br></br>

          <div className="Chart">

            <img src={pieChart} alt="pieChart" style={{ marginRight: "auto", marginLeft: "auto", width: "50%", display: "block" }}></img>

            <div className="AccountBalance">
              Total Amount: {this.state.accountBalance}
            </div>

          </div>

          <div className="Table">

            <TableComp
              // use the TableContainer class to style the table itself 
              classes={{ TableContainer: 'TableContainer' }}
              headings={this.state.transactions_headings}
              data={this.state.transactions_data}
              options={this.state.transactions_options}
              categories={this.state.transactions_categories}
              addRow={this.addTransaction}
              editRow={this.editTransaction}
              removeRow={this.deleteTransaction}
              addCategory={this.addCategory}
              removeCategory={this.deleteCategory}
            />


            <div className="SortButtons">

              <Button
                variant={this.state.sortBy == "Date" ? "contained" : "outlined"}
                onClick={() => this.changeSort("Date")}>
                Sort By Date
              </Button>
              <Button
                variant={this.state.sortBy == "Amount" ? "contained" : "outlined"}
                onClick={() => this.changeSort("Amount")}>
                Sort By Amount
              </ Button>
              <Button
                variant={this.state.sortBy == "Category" ? "contained" : "outlined"}
                onClick={() => this.changeSort("Category")}>
                Sort By Category
              </Button>

            </div>

          </div>

        </div>
        : <Redirect to="/login" />

    )

  }

}

export default Spendings;
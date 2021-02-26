import React from 'react';
import TableComp from '../Table'

import './spendings.css'

class Spendings extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      // the headings to appear in the header bar 
      transactions_headings: ["Date", "Amount", "Description", "Category"],
      // the data to appear in each rows of the table 
      transactions_data: [
        ["02/01/2021", "35.23", "McDonalds", "Food"],
        ["02/03/2021", "26.38", "Starbucks", "Food"],
        ["02/05/2021", "136.83", "Runners", "Personal"],
        ["02/07/2021", "13.28", "Movies", "Personal"],
        ["02/09/2021", "52.85", "Presto Card", "Transportation"],
        ["02/12/2021", "83.16", "Internet + Utilities", "Home"],
        ["02/15/2021", "267.33", "Gift for Joe", "Personal"],
        ["02/18/2021", "8.37", "Bubble Tea", "Food"]
      ]
    }

  }

  // just in case if we need to switch structure to obj 
  // {"Date": "02/01/2021", "Amount": "35.23", "Description": "McDonalds", "Category": "Food"},
  // {"Date": "02/03/2021", "Amount": "26.38", "Description": "Starbucks", "Category": "Food"},
  // {"Date": "02/05/2021", "Amount": "136.83", "Description": "Runners", "Category": "Personal"},
  // {"Date": "02/07/2021", "Amount": "13.28", "Description": "Movies", "Category": "Personal"},
  // {"Date": "02/09/2021", "Amount": "52.85", "Description": "Presto Card", "Category": "Transportation"},
  // {"Date": "02/12/2021", "Amount": "83.16", "Description": "Internet + Utilities", "Category": "Home"},
  // {"Date": "02/15/2021", "Amount": "267.33", "Description": "Gift for Joe", "Category": "Personal"},
  // {"Date": "02/18/2021", "Amount": "8.37", "Description": "Bubble Tea", "Category": "Food"},

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

  render() {

    return (

      <div>

        This is the Spendings page :D

        <div>

          <TableComp
            // use the TableContainer class to style the table itself 
            classes={{ TableContainer: 'TableContainer' }}
            headings={this.state.transactions_headings}
            data={this.state.transactions_data}
            addRow={this.addTransaction}
            editRow={this.editTransaction}
            removeRow={this.deleteTransaction}
          />

        </div>

      </div>

    )

  }

}

export default Spendings;
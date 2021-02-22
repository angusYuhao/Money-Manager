import React from 'react';
import TableComp from '../Table'

import './spendings.css'

class Spendings extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      transactions_headings: ["Date", "Amount", "Description", "Category"],
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

  deleteTransaction = (transaction) => {
    const keepTransactions = this.state.transactions_data.filter(t => t !== transaction)
    this.setState({ transactions_data: keepTransactions })
  }

  render() {

    return (

      <div>

        This is the Spendings page :D

        <div>
          <TableComp classes={{ TableContainer: 'TableContainer' }}
            headings={this.state.transactions_headings}
            data={this.state.transactions_data}
            removeRow={this.deleteTransaction}
          />
        </div>

      </div>

    )

  }

}

export default Spendings;
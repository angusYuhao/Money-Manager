import React from 'react';
import TableRowComp from '../TableRow'

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';

import "./table.css"

class TableComp extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      // true -> displays the new row to be added to table, false -> hides the new row to be added to table 
      add: false,
      // the default values for the new row to be added to table 
      newRow: []
    }

  }

  // handles action for the 'plus' button to add a new row to table 
  addRowHandler() {

    // the new rows will contain the headings for the table (can be changed if needed)
    const newData = {}
    this.props.headings.map((value, index) => {
      if (this.props.options[index] == "Date") newData[value] = null
      else newData[value] = value
    })

    this.setState({ newRow: newData })
    this.toggleAdd()

  }

  toggleAdd() {
    this.setState({ add: !this.state.add })
  }

  render() {

    const { headings, data, options, categories, addRow, editRow, removeRow } = this.props;

    return (

      <div>

        <Paper>

          <TableContainer className="TableContainer">

            <Table stickyHeader aria-label="sticky table">

              <TableHead>

                <TableRow>

                  {/* displays the headings for each column */}
                  {headings.map(heading =>
                    <TableCell>
                      {heading}
                    </TableCell>
                  )}

                  <TableCell width="100vw" align="right">

                    <IconButton aria-label="add">
                      <AddIcon onClick={() => this.addRowHandler()} />
                    </IconButton>

                  </TableCell>

                </TableRow>

              </TableHead>

              <TableBody>

                {this.state.add ?

                  <TableRowComp
                    headings={headings}
                    row={this.state.newRow}
                    options={options}
                    categories={categories}
                    addRow={addRow}
                    editRow={editRow}
                    removeRow={removeRow}
                    rowForAdd={true}
                    toggleAdd={this.toggleAdd.bind(this)}
                  />

                  : null
                }

                {data.map(row =>
                  <TableRowComp
                    headings={headings}
                    row={row}
                    options={options}
                    categories={categories}
                    addRow={addRow}
                    editRow={editRow}
                    removeRow={removeRow}
                    rowForAdd={false}
                    toggleAdd={this.toggleAdd.bind(this)}
                  />
                )}

              </TableBody>

            </Table>

          </TableContainer>

        </Paper>

      </div>

    )

  }

}

export default TableComp;
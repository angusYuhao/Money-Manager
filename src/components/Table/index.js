import React from 'react';
import TableRowComp from '../TableRow'

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import "./table.css"

class TableComp extends React.Component {

  constructor(props) {
    super(props);

    this.state = {

    }

  }

  render() {

    const { headings, data, removeRow } = this.props;

    return (

      <div>

        <Paper >

          <TableContainer className="TableContainer" >

            <Table stickyHeader aria-label="sticky table">

              <TableHead>

                <TableRow>

                  {headings.map(heading =>
                    <TableCell>
                      {heading}
                    </TableCell>
                  )}

                  <TableCell width="100vw">

                  </TableCell>

                </TableRow>

              </TableHead>

              <TableBody>

                {data.map(row =>
                  <TableRowComp
                    row={row}
                    removeRow={removeRow}
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
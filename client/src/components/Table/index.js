import React from 'react';
import TableRowComp from '../TableRow'
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core'

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import Snackbar from '@material-ui/core/Snackbar';
import { Alert } from '@material-ui/lab';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import RemoveIcon from '@material-ui/icons/Remove';
import TextField from '@material-ui/core/TextField';

import "./table.css"

const useStyles = () => ({
  emptyMessage: {
    textAlign: "center"
  }
})

class TableComp extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      // true -> displays the new row to be added to table, false -> hides the new row to be added to table 
      add: false,
      // the default values for the new row to be added to table 
      newRow: [],
      // array that holds all the snacks (notifications) that remains to be shown 
      snacks: [],
      // the message that the snack should currently display
      currentSnackMsg: undefined,
      // true -> displays the snack, false -> hides the snack
      displaySnack: false,
      // the categories menu position on the screen
      menuPosition: null,
      // the category name that the user can input to add customized category
      newCategory: ""
    }

  }

  // this function is called whenever there's a change in the DOM 
  componentDidUpdate() {

    // if there is a snack message to be shown but we currently don't have the snack opened 
    if (this.state.snacks.length && !this.state.currentSnackMsg) {
      this.setState({ currentSnackMsg: this.state.snacks[0] })
      this.setState({ snacks: this.state.snacks.slice(1) })
      this.setState({ displaySnack: true })
    }

    // if there is a snack message to be shown and we are already displaying a snack, close the active one 
    else if (this.state.snacks.length && this.state.currentSnackMsg && this.state.displaySnack) {
      this.setState({ displaySnack: false })
    }

  }

  // handles action for the 'plus' button to add a new row to table 
  addRowHandler() {

    // the new rows will contain the headings for the table (can be changed if needed)
    const newData = {}
    this.props.headings.map((value, index) => {
      newData[value] = null
      // if (this.props.options[index] == "Date") newData[value] = null
      // else newData[value] = value
    })

    this.setState({ newRow: newData })
    this.toggleAdd()

  }

  toggleAdd() {
    this.setState({ add: !this.state.add })
  }

  // displays categories menu
  displayCategories(e) {
    this.setState({ menuPosition: e.currentTarget })
  }

  hideCategories() {
    this.setState({ menuPosition: null })
  }

  // updates the category string as user is inputting 
  updateCategory(e) {
    this.state.newCategory = e.target.value
    this.setState({ newCategory: this.state.newCategory })
  }

  // adds a message to the snack array 
  addSnack(message) {
    this.state.snacks.push(message)
    this.setState({ snacks: this.state.snacks })
  }

  snackBarOnClose() {
    this.setState({ displaySnack: false })
  }

  snackBarOnExited() {
    this.setState({ currentSnackMsg: undefined })
  }

  // renders different helper messages depending on the error or success 
  renderHelperMsg() {
    switch (this.state.currentSnackMsg) {
      case "addError":
        return "Could not add, please check the fields."
      case "editError":
        return "Could not edit, please check the fields."
      case "addSuccess":
        return "Added successfully!"
      case "editSuccess":
        return "Edited successfully!"
      case "deleteSuccess":
        return "Deleted successfully!"
      default:
        return ""
    }
  }

  render() {

    const { headings, data, options, categories, addRow, editRow, removeRow, addCategory, removeCategory, tableType, sellStock } = this.props;

    return (

      <div>

        <Paper>

          <TableContainer className="TableContainer">

            <Table stickyHeader aria-label="sticky table">

              <TableHead>

                <TableRow>

                  {/* displays the headings for each column */}
                  {headings.map((heading, index) =>
                    <TableCell>

                      {heading}

                      {/* used for the vertical three dots icon, only display for "select" options */}
                      {options[index] == "Select" ?
                        <IconButton aria-label="add" onClick={(e) => this.displayCategories(e)}>
                          <MoreVertIcon />
                        </IconButton>
                        : null
                      }

                      <Menu
                        id="long-menu"
                        anchorEl={this.state.menuPosition}
                        open={Boolean(this.state.menuPosition)}
                        onClose={() => this.hideCategories()}
                      >

                        {/* user can't delete predetermined categories */}
                        {categories.map((category, index) => (
                          <MenuItem
                            key={category}
                            onClick={() => {
                              if (index > 3) removeCategory(category)
                            }}
                          >
                            {category}
                            {index > 3 ? <RemoveIcon /> : null}

                          </MenuItem>
                        ))}

                        <MenuItem onKeyDown={e => e.stopPropagation()}>

                          <TextField
                            id="standard-basic"
                            label="New Category"
                            onChange={(e) => this.updateCategory(e)}
                            value={this.state.newCategory}
                          />

                          <AddIcon
                            onClick={() => {
                              addCategory(this.state.newCategory)
                              this.state.newCategory = ""
                              this.setState({ newCategory: this.state.newCategory })
                            }} />

                        </MenuItem>

                      </Menu>

                    </TableCell>
                  )}

                  <TableCell width="100vw" align="right">

                    {tableType == "Spendings" ?

                      <IconButton
                        aria-label="add"
                        onClick={() => this.addRowHandler()}>
                        <AddIcon />
                      </IconButton>
                      :
                      <Button
                        aria-label="buy"
                        onClick={() => this.addRowHandler()}>
                        Buy
                      </Button>

                    }

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
                    addSnacks={this.addSnack.bind(this)}
                    toggleAdd={this.toggleAdd.bind(this)}
                    tableType={tableType}
                    sellStock={sellStock}
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
                    addSnacks={this.addSnack.bind(this)}
                    toggleAdd={this.toggleAdd.bind(this)}
                    tableType={tableType}
                    sellStock={sellStock}
                  />
                )}

                {/* if there are currently no entries in table right now, display message */}
                {data.length == 0 ?
                  <TableRow>
                    <TableCell
                      className={this.props.classes.emptyMessage}
                      colspan={headings.length + 1}>
                      <Typography variant="h5" >
                        You have no entry so far! <br></br>Add an entry by clicking on the add icon above!
                      </Typography>
                    </TableCell>
                  </TableRow>
                  : null
                }

                {tableType == "Investments" ? null :

                  <Snackbar
                    open={this.state.displaySnack}
                    autoHideDuration={2000}
                    onClose={() => this.snackBarOnClose()}
                    onExited={() => this.snackBarOnExited()}
                  >

                    <Alert
                      severity={this.state.currentSnackMsg ? (this.state.currentSnackMsg.includes("Success") ? "success" : "error") : undefined}
                      variant="filled">
                      {this.renderHelperMsg()}
                    </Alert>

                  </Snackbar>

                }

              </TableBody>

            </Table>

          </TableContainer>

        </Paper >

      </div >

    )

  }

}

export default withStyles(useStyles)(TableComp);
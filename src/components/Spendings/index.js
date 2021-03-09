import React from 'react';
import { Redirect } from 'react-router';
import { withStyles } from '@material-ui/core'
import TableComp from '../Table'

import Button from '@material-ui/core/Button';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from "@material-ui/core/Divider";
import AddIcon from '@material-ui/icons/Add';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

import './spendings.css'
import PieChart from '../Investments/PieChart'

const useStyles = () => ({
  drawer_paper: {
    position: "relative",
    height: "100%"
  },
  menu_list: {
    width: "15vw"
  },
  formControl_root: {
    outline: "none",
    minWidth: "15vw"
  }
})

const useStyles = () => ({
  drawer_paper: {
    position: "relative",
    height: "100%"
  }
})

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
      // current sorting by string, default is sort by date
      sortBy: "Date",
      // sorting in an ascending/descending order
      sortDes: {
        "Date": false,
        "Amount": false,
        "Category": false
      },
      // true for displaying the drawer (sidebar for months), false to hide
      openDrawer: false,
      // the array used for displaying the pie chart, will contain array of objects, key is the category, value is the total spending of that category
      sumForCategories: [],
      // the position for the menu used to create a new spendings page
      menuPosition: null,
      // the month selected for the menu 
      monthSelected: ""
    }

    this.sumAccountBalance()
    this.sumCategoriesAmount()

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
    if (prevState.transactions_data != this.state.transactions_data) {
      this.sumAccountBalance()
      this.sumCategoriesAmount()
    }
  }

  sumAccountBalance = () => {
    this.state.accountBalance = this.state.transactions_data.reduce((total, current) => {
      let sum = parseFloat(total) + parseFloat(current["Amount"])
      sum = sum.toFixed(2)
      return sum
    }, 0)
    this.setState({ accountBalance: this.state.accountBalance })
  }

  sumCategoriesAmount = () => {

    this.state.sumForCategories = []

    this.state.transactions_data.map(transaction => {
      const category = transaction["Category"]
      let index = this.state.sumForCategories.findIndex(x => x.name == category)
      if (index == -1) {
        this.state.sumForCategories.push({ name: category, bookCost: 0 })
        index = this.state.sumForCategories.length - 1
      }
      this.state.sumForCategories[index].bookCost += parseFloat(transaction["Amount"])
    })

    this.setState({ sumForCategories: this.state.sumForCategories })

  }

  sortObj = (a, b) => {

    switch (this.state.sortBy) {

      case "Date":
        if (!this.state.sortDes["Date"]) {
          if (a["Date"] < b["Date"]) return -1
          else return 1
        }
        else {
          if (a["Date"] > b["Date"]) return -1
          else return 1
        }

      case "Amount":
        if (!this.state.sortDes["Amount"]) {
          if (parseFloat(a["Amount"]) < parseFloat(b["Amount"])) return -1
          else return 1
        }
        else {
          if (parseFloat(a["Amount"]) > parseFloat(b["Amount"])) return -1
          else return 1
        }

      case "Category":
        if (!this.state.sortDes["Category"]) {
          if (a["Category"] < b["Category"]) return -1
          else return 1
        }
        else {
          if (a["Category"] > b["Category"]) return -1
          else return 1
        }

      case "Default":
        return

    }

  }

  // sorting the transactions based on the currently selected element 
  sortTransactions = () => {
    this.state.transactions_data.sort(this.sortObj)
    this.setState({ transactions_data: this.state.transactions_data })
  }

  // add newTransaction to the beginning of the transactions_data array 
  addTransaction = (newTransaction) => {
    this.state.transactions_data.unshift(newTransaction)
    this.setState({ transactions_data: this.state.transactions_data })
    this.sumAccountBalance()
    this.sumCategoriesAmount()
  }

  // finds the index of the oldTransaction data and replace it with the newTransaction data
  editTransaction = (oldTransaction, newTransaction) => {
    const index = this.state.transactions_data.findIndex(t => t === oldTransaction)
    this.state.transactions_data[index] = newTransaction
    this.setState({ transactions_data: this.state.transactions_data })
    this.sumAccountBalance()
    this.sumCategoriesAmount()
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
    this.state.sortDes[sortBy] = !this.state.sortDes[sortBy]
    this.setState({ sortDes: this.state.sortDes })
    this.sortTransactions()
  }

  toggleDrawer = () => {
    this.state.openDrawer = !this.state.openDrawer
    this.setState({ openDrawer: this.state.openDrawer })
  }

  hideAddNewMonth = () => {
    this.setState({ menuPosition: null })
  }

  displayAddNewMonth = (e) => {
    this.setState({ menuPosition: e.currentTarget })
  }

  selectFieldOnChangeHandler = (e) => {
    this.state.monthSelected = e.target.value
    this.setState({ monthSelected: this.state.monthSelected })
  }

  render() {

    const { loggedIn, classes } = this.props

    return (

      loggedIn ?

        <div>

          <div className="DrawerDiv">

            {/* <IconButton className="OpenDrawerButton"
                // color="inherit"
                aria-label="open drawer"
                onClick={() => this.toggleDrawer()}
              // edge="start"
              // className={clsx(classes.menuButton, {
              //   [classes.hide]: open,
              // })}
              >
                <MenuIcon />
              </IconButton> */}

            <Drawer classes={{ paper: classes.drawer_paper, paperAnchorDocked: classes.drawer_paper }}
              variant="permanent"
            >

              <Menu
                id="long-menu"
                anchorEl={this.state.menuPosition}
                open={Boolean(this.state.menuPosition)}
                onClose={() => this.hideAddNewMonth()}
                classes={{ list: classes.menu_list }}
              >

                <FormControl
                  classes={{ root: classes.formControl_root }}
                >

                  <InputLabel id="simple-select-label">Month</InputLabel>
                  <Select
                    id="simple-select"
                    defaultValue={this.state.monthSelected}
                    onChange={(e) => this.selectFieldOnChangeHandler(e)}
                  >

                    {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map(month =>
                      <MenuItem
                        value={month}>
                        {month}
                      </MenuItem>
                    )}

                  </Select>

                </FormControl>

                <TextField
                  id="standard-basic"
                  label="Year"
                  classes={{ root: classes.menu_list }}
                />

                <TextField
                  id="standard-basic"
                  label="Projected Spendings"
                  classes={{ root: classes.menu_list }}
                />

                <Button
                  variant="outlined"
                  color="primary"
                  classes={{ root: classes.menu_list }}
                  size="small"
                >
                  Add New Spendings Page
                </Button>

              </Menu>

              <IconButton
                aria-label="add"
                onClick={(e) => this.displayAddNewMonth(e)}>
                <AddIcon />
              </IconButton>
              <Divider />

              <List>
                {["Jan", "Feb", "Mar", "Apr"].map((text, index) => (
                  <ListItem button key={text}>
                    <ListItemText primary={text} />
                  </ListItem>
                ))}
              </List>

            </Drawer>

          </div>

          <div className="Content">

            <div className="Chart">

              <img src={pieChart} alt="pieChart" style={{ marginRight: "auto", marginLeft: "auto", width: "50%", display: "block" }}></img>

              <div className="AccountBalance">
                Total Amount: {this.state.accountBalance}

              {/* <img src={pieChart} alt="pieChart" style={{ marginRight: "auto", marginLeft: "auto", width: "50%", display: "block" }}></img> */}
              <PieChart
                listToDisplay={this.state.sumForCategories}
              >

              </PieChart>

              <div className="AccountBalance">
                Total Amount: ${this.state.accountBalance}
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

                <Grid container spacing={3}>

                  <Grid item xs={4}>
                    <Paper>
                      <Button
                        className="SortButton"
                        variant={this.state.sortBy == "Date" ? "contained" : "outlined"}
                        onClick={() => this.changeSort("Date")}>
                        Sort By Date
                          {this.state.sortDes["Date"] ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
                      </Button>
                    </Paper>
                  </Grid>

                  <Grid item xs={4}>
                    <Paper>
                      <Button
                        className="SortButton"
                        variant={this.state.sortBy == "Amount" ? "contained" : "outlined"}
                        onClick={() => this.changeSort("Amount")}>
                        Sort By Amount
                          {this.state.sortDes["Amount"] ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
                      </ Button>
                    </Paper>
                  </Grid>

                  <Grid item xs={4}>
                    <Paper>
                      <Button
                        className="SortButton"
                        variant={this.state.sortBy == "Category" ? "contained" : "outlined"}
                        onClick={() => this.changeSort("Category")}>
                        Sort By Category
                          {this.state.sortDes["Category"] ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
                      </Button>
                    </Paper>
                  </Grid>

                </Grid>

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

                <Grid container spacing={3}>

                  <Grid item xs={4}>
                    <Paper>
                      <Button
                        className="SortButton"
                        variant={this.state.sortBy == "Date" ? "contained" : "outlined"}
                        onClick={() => this.changeSort("Date")}>
                        Sort By Date
                          {this.state.sortDes["Date"] ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
                      </Button>
                    </Paper>
                  </Grid>

                  <Grid item xs={4}>
                    <Paper>
                      <Button
                        className="SortButton"
                        variant={this.state.sortBy == "Amount" ? "contained" : "outlined"}
                        onClick={() => this.changeSort("Amount")}>
                        Sort By Amount
                          {this.state.sortDes["Amount"] ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
                      </ Button>
                    </Paper>
                  </Grid>

                  <Grid item xs={4}>
                    <Paper>
                      <Button
                        className="SortButton"
                        variant={this.state.sortBy == "Category" ? "contained" : "outlined"}
                        onClick={() => this.changeSort("Category")}>
                        Sort By Category
                          {this.state.sortDes["Category"] ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
                      </Button>
                    </Paper>
                  </Grid>

                </Grid>

              </div>

            </div>
            
          </div>

        </div >

        : <Redirect to="/login" />

    )

  }

}

export default withStyles(useStyles)(Spendings);
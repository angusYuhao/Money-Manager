import React from 'react';
import { withStyles } from '@material-ui/core'

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';

import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';

import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';

const useStyles = () => ({
    formControl_root: {
        minWidth: "10vw",
    }
})

class TableRowComp extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            // true -> displays the edit and delete buttons, false -> hides the edit and delete buttons
            hover: false,
            // true -> displays done button, false -> displays edit button 
            edit: this.props.rowForAdd,
            // holds the input values when the row is being edited, key = heading, value = data 
            update: {},
            // holds the data value that will be updated when dates are selected on the calendar
            date: "",
            // holds an array (same length as headings) that will show if there is an error or not 
            // if cell is empty (for adding) => null, if error => true, if no error => false 
            error: this.props.rowForAdd ? Array.from({ length: this.props.headings.length }, () => null) :
                Array.from({ length: this.props.headings.length }, () => false)
        }

    }

    clearState() {
        this.setState({ update: {} })
        this.setState({ date: "" })
        this.setState({
            error: this.props.rowForAdd ? Array.from({ length: this.props.headings.length }, () => null) :
                Array.from({ length: this.props.headings.length }, () => false)
        })
    }

    displayIcons() {
        this.setState({ hover: true })
    }

    hideIcons() {
        this.setState({ hover: false })
    }

    toggleEdit() {
        this.setState({ edit: !this.state.edit })
    }

    // updates the state as the value in the inputs are being changed 
    textFieldOnChangeHandler(e, headings, index) {

        this.state.update[headings[index]] = e.target.value
        this.setState({ update: this.state.update })

        // if nothing is in the cell, put null error 
        if (e.target.value == "" || e.target.value === null) this.state.error[index] = null

        else {
            switch (this.props.options[index]) {

                case "Number":
                case "Percentage":
                    // error if input not a number, or less than 0 
                    if (!isNaN(e.target.value) && parseFloat(e.target.value) >= 0) this.state.error[index] = false
                    else this.state.error[index] = true
                    break
                case "Dollar":
                    if (!isNaN(e.target.value)) this.state.error[index] = false
                    else this.state.error[index] = true
                    break
                case "Any":
                    // I think description can be anything? 
                    this.state.error[index] = false
                    break
                case "Select":
                    this.state.error[index] = false
                    break
                default:
                    throw ("Please specify a valid option.")

            }
        }

        this.setState({ error: this.state.error })

    }

    // updates the state for the date as the inputs are being changed 
    dateFieldOnChangeHandler(e, heading, index) {

        // if it's an invalid date, set it to the invalid data so Material UI knows to display "incorrect date format"
        if (e == "Invalid Date") {
            this.setState({ date: e })
            this.state.error[index] = true
            this.setState({ error: this.state.error })
            return
        }

        // if no dates have been inputted, set error state to null
        else if (e == null) {
            this.setState({ date: null })
            this.state.error[index] = null
            this.setState({ error: this.state.error })
            return
        }

        // converting the string to the appropriate format (MM/dd/yyyy)
        const isoString = e.toISOString()
        const year = isoString.substring(0, 4)
        const month = isoString.substring(5, 7)
        const day = isoString.substring(8, 10)
        const newDate = month + '/' + day + '/' + year

        this.state.update[heading] = newDate
        this.setState({ date: newDate, update: this.state.update })

        this.state.error[index] = false
        this.setState({ error: this.state.error })

    }

    // put the edited data into newRow 
    getUpdatedRow(headings, row) {

        // if there has been an error in any cell
        if (this.state.error.includes(null) || this.state.error.includes(true)) return null

        const newRow = {}

        // use the new values if user edited the input, otherwise use previous values
        headings.map((heading, index) => {
            if (heading in this.state.update) {
                if (this.props.options[index] == "Date") newRow[heading] = this.state.date
                else newRow[heading] = this.state.update[heading]
            }
            else newRow[heading] = row[heading]
        })

        return newRow

    }

    // a switch function that displays different kind of cells when editing depending on the options 
    renderEditCell(option, heading, index) {

        switch (option) {
            case "Date":
                return <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        // disableToolbar
                        id="date-picker-inline"
                        label={heading}
                        variant="inline"
                        format="MM/dd/yyyy"
                        value={this.state.date == "" ? this.props.row[heading] : this.state.date}
                        onChange={(e) => this.dateFieldOnChangeHandler(e, heading, index)}
                    />
                </MuiPickersUtilsProvider>

            case "Select":
                return <FormControl classes={{ root: this.props.classes.formControl_root }}>
                    <InputLabel id="simple-select-label">Category</InputLabel>
                    <Select
                        error={this.state.error[index]}
                        id="simple-select"
                        defaultValue={this.props.rowForAdd ? "" : this.props.row[heading]}
                        onChange={(e) => this.textFieldOnChangeHandler(e, this.props.headings, index)}
                    >
                        {this.props.categories.map(category =>
                            <MenuItem
                                value={category}>
                                {category}
                            </MenuItem>
                        )}

                    </Select>
                </FormControl>

            case "Number":
                return <TextField
                    error={this.state.error[index]}
                    helperText={this.state.error[index] ? `Please enter: ${option}` : ""}
                    id="standard-basic"
                    label={this.props.headings[index]}
                    defaultValue={this.props.rowForAdd ? "" : this.props.row[heading]}
                    onChange={(e) => this.textFieldOnChangeHandler(e, this.props.headings, index)}
                // InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
                > </TextField>

            default:
                return <TextField
                    error={this.state.error[index]}
                    helperText={this.state.error[index] ? `Please enter: ${option}` : ""}
                    id="standard-basic"
                    label={this.props.headings[index]}
                    defaultValue={this.props.rowForAdd ? "" : this.props.row[heading]}
                    onChange={(e) => this.textFieldOnChangeHandler(e, this.props.headings, index)}
                > </TextField>

        }

    }

    renderCellValue(option, value) {
        switch (option) {
            case "Percentage":
                return value + '%'
            case "Dollar":
                if (value > 0) return '$' + value
                else {
                    // if value is a string (used by spendings)
                    if (typeof value === "string") return '-' + '$' + value.slice(1)
                    // if value is a float (used by investments)
                    else return '-' + '$' + Math.abs(value)
                }
            default:
                return value
        }
    }

    doneIconOnClick() {

        if (this.props.rowForAdd) {
            const newRow = this.getUpdatedRow(this.props.headings, this.props.row)
            if (newRow === null) {
                this.props.addSnacks("addError")
                return
            }
            this.props.addRow(newRow)
            this.props.addSnacks("addSuccess")
            this.toggleEdit()
            this.props.toggleAdd()
        }

        else {
            const newRow = this.getUpdatedRow(this.props.headings, this.props.row)
            if (newRow === null) {
                this.props.addSnacks("editError")
                return
            }
            this.props.editRow(this.props.row, newRow)
            this.props.addSnacks("editSuccess")
            this.toggleEdit()
        }

    }

    render() {

        const { headings, row, options, categories, addRow, editRow, removeRow, rowForAdd, addSnacks, toggleAdd } = this.props;

        return (
            <TableRow hover
                onMouseEnter={() => this.displayIcons()}
                onMouseLeave={() => this.hideIcons()}
            >

                {headings.map((heading, index) =>

                    <TableCell>

                        {this.state.edit ?

                            <div>
                                {this.renderEditCell(options[index], heading, index)}
                            </div>
                            :
                            <div>
                                {this.renderCellValue(options[index], row[heading])}
                            </div>

                        }

                    </TableCell>

                )}

                <TableCell>

                    {this.state.hover ?

                        <div className="icons">

                            {this.state.edit ?

                                <IconButton
                                    aria-label="done"
                                    onClick={() => this.doneIconOnClick()}
                                >
                                    <DoneIcon />
                                </IconButton>
                                :
                                <IconButton
                                    aria-label="edit"
                                    onClick={() => this.toggleEdit()}
                                >
                                    <EditIcon />
                                </IconButton>

                            }

                            <IconButton
                                aria-label="delete"
                                onClick={() => {
                                    if (rowForAdd) toggleAdd()
                                    else {
                                        removeRow(row)
                                        addSnacks("deleteSuccess")
                                        this.clearState()
                                    }
                                    if (this.state.edit) this.toggleEdit()
                                }} >
                                <DeleteIcon />
                            </IconButton>

                        </div>

                        : null
                    }

                </TableCell>

            </TableRow >

        )

    }

}

export default withStyles(useStyles)(TableRowComp);
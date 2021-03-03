import React from 'react';

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

import Snackbar from '@material-ui/core/Snackbar';
import { Alert } from '@material-ui/lab';

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
                Array.from({ length: this.props.headings.length }, () => false),
            // the helper message that will be displayed at the bottom of the page for editing and adding
            helperMsg: "none"
        }

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

        if (e.target.value == "" || e.target.value === null) this.state.error[index] = null

        else {
            switch (this.props.options[index]) {

                case "Number":
                    // error if input not a number, or less than 0 
                    if (!isNaN(e.target.value) && parseFloat(e.target.value) >= 0) this.state.error[index] = false
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
                return <FormControl style={{ minWidth: "10vw" }}>
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

    // the onClose function for the snackBar used to display helper messages 
    snackBarOnClose() {
        this.setState({ helperMsg: "none" })
    }

    renderHelperMsg() {
        switch (this.state.helperMsg) {
            case "addError":
                return "Could not add, please check the fields."
            case "editError":
                return "Could not edit, please check the fields."
            case "addSuccess":
                return "Added successfully!"
            case "editSuccess":
                return "Edited successfully!"
            default:
                return ""
        }
    }

    render() {

        const { headings, row, options, categories, addRow, editRow, removeRow, rowForAdd, toggleAdd } = this.props;

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

                            : row[heading]

                        }

                    </TableCell>

                )}

                <TableCell>

                    {this.state.hover ?

                        <div className="icons">

                            {this.state.edit ?

                                <IconButton aria-label="done">

                                    {rowForAdd ?

                                        <DoneIcon onClick={() => {
                                            const newRow = this.getUpdatedRow(headings, row)
                                            if (newRow === null) {
                                                console.log("Cannot add")
                                                this.setState({ helperMsg: "addError" })
                                                return
                                            }
                                            addRow(newRow)
                                            this.setState({ helperMsg: "addSuccess" })
                                            this.toggleEdit()
                                            toggleAdd()
                                        }} />
                                        :
                                        <DoneIcon onClick={() => {
                                            const newRow = this.getUpdatedRow(headings, row)
                                            if (newRow === null) {
                                                this.setState({ helperMsg: "editError" })
                                                return
                                            }
                                            editRow(row, newRow)
                                            this.setState({ helperMsg: "editSuccess" })
                                            this.toggleEdit()
                                        }} />

                                    }

                                </IconButton>
                                :
                                <IconButton aria-label="edit">

                                    <EditIcon onClick={() => this.toggleEdit()} />

                                </IconButton>

                            }

                            <IconButton aria-label="delete">
                                <DeleteIcon onClick={() => {
                                    if (rowForAdd) toggleAdd()
                                    else removeRow(row)
                                    if (this.state.edit) this.toggleEdit()
                                }} />
                            </IconButton>

                        </div>

                        : null
                    }

                </TableCell>

                <Snackbar
                    open={this.state.helperMsg != "none"}
                    autoHideDuration={2000}
                    onClose={() => this.snackBarOnClose()}
                >
                    {this.state.helperMsg != "none" ?
                        <Alert
                            severity={this.state.helperMsg.includes("Success") ? "success" : "error"}
                            variant="filled">
                            {this.renderHelperMsg()}
                        </Alert>
                        : null
                    }

                </Snackbar >

            </TableRow >

        )

    }

}

export default TableRowComp;
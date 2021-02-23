import React from 'react';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';

import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';

class TableRowComp extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            // true -> displays the edit and delete buttons, false -> hides the edit and delete buttons
            hover: false,
            // true -> displays done button, false -> displays edit button 
            edit: this.props.rowForAdd,
            // holds the input values when the row is being edited, key = heading, value = data 
            update: {}
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
    }

    // put the edited data into newRow 
    getUpdatedRow(headings, row) {

        const newRow = []

        // use the new values if user edited the input, otherwise use previous values
        headings.map((heading, index) => {
            if (heading in this.state.update) newRow.push(this.state.update[heading])
            else newRow.push(row[index])
        })

        return newRow

    }

    render() {

        const { headings, row, addRow, editRow, removeRow, rowForAdd, toggleAdd } = this.props;

        return (

            <TableRow hover
                onMouseEnter={() => this.displayIcons()}
                onMouseLeave={() => this.hideIcons()}
            >

                {row.map((value, index) =>

                    <TableCell>

                        {this.state.edit ?

                            <TextField
                                id="standard-basic"
                                label={headings[index]}
                                defaultValue={value}
                                onChange={(e) => this.textFieldOnChangeHandler(e, headings, index)}
                            > </TextField>

                            : value
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
                                            addRow(newRow)
                                            this.toggleEdit()
                                            toggleAdd()
                                        }} />
                                        :
                                        <DoneIcon onClick={() => {
                                            const newRow = this.getUpdatedRow(headings, row)
                                            editRow(row, newRow)
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

            </TableRow>

        )

    }

}

export default TableRowComp;
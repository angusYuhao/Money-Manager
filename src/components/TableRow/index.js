import React from 'react';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

class TableRowComp extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            hover: false
        }

    }

    displayIcons() {
        this.setState({ hover: true })
    }

    hideIcons() {
        this.setState({ hover: false })
    }

    render() {

        const { row, removeRow } = this.props;

        return (

            <TableRow hover
                onMouseEnter={() => this.displayIcons()}
                onMouseLeave={() => this.hideIcons()} >

                {row.map(value =>
                    <TableCell>
                        {value}
                    </TableCell>
                )}

                <TableCell>

                    {this.state.hover ?
                        <div className="icons">
                            <IconButton aria-label="edit">
                                <EditIcon />
                            </IconButton>
                            <IconButton aria-label="delete">
                                <DeleteIcon onClick={() => removeRow(row)} />
                            </IconButton>
                        </div> : null
                    }

                </TableCell>

            </TableRow>

        )

    }

}

export default TableRowComp;
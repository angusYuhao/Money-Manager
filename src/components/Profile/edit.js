import React from 'react';
import { withStyles, 
        Table,
        TableContainer,
        TableBody,
        TableCell,
        TableRow,
        TextField } from '@material-ui/core';

const useStyles = theme => ({
    table: {
        marginTop: theme.spacing(1),
    },
    tableCell: {
        borderBottom: 'none',
        paddingLeft: theme.spacing(3),
        fontSize: '1em',
    },
    textfield: {
        minWidth: 340,
    },
})

class Edit extends React.Component {
    render() {

        const { classes, handleInputChange, username, name, email, occupation, birthday, bio } = this.props;
        return (
            <TableContainer>
                <Table className={classes.table} aria-label="profile table">
                    <TableBody>
                        <TableRow>
                            <TableCell className={classes.tableCell}>
                                <TextField onChange={ handleInputChange }
                                        value={ username }
                                        defaultValue="user"
                                        id="outlined" 
                                        label="username" 
                                        name="username"
                                        variant="outlined" 
                                        className={classes.textfield}
                                        />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className={classes.tableCell}>
                                <TextField onChange={ handleInputChange }
                                            value={ name }
                                            defaultValue="User X"
                                            id="outlined" 
                                            label="name" 
                                            name="name"
                                            variant="outlined" 
                                            className={classes.textfield}
                                            />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className={classes.tableCell}>
                                <TextField onChange={ handleInputChange }
                                                value={ email }
                                                defaultValue="user@123.com"
                                                id="outlined" 
                                                label="email" 
                                                name="email"
                                                variant="outlined" 
                                                className={classes.textfield}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className={classes.tableCell}>
                                <TextField onChange={ handleInputChange }
                                                value={ occupation }
                                                defaultValue="student"
                                                id="outlined" 
                                                label="occupation" 
                                                name="occupation"
                                                variant="outlined" 
                                                className={classes.textfield}
                                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className={classes.tableCell}>
                                <TextField 
                                    value={ birthday } 
                                    onChange={ handleInputChange }
                                    defaultValue="2021-03-08"
                                    id="date" 
                                    label="Birthday" 
                                    type="date"
                                    name="birthday"
                                    variant="outlined" 
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                    className={classes.textfield}
                                    />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className={classes.tableCell}>
                                <TextField 
                                    value={ bio } 
                                    onChange={ handleInputChange }
                                    multiline
                                    defaultValue="An individual that is pursuing one's passions."
                                    id="bio" 
                                    label="Bio"
                                    name="bio"
                                    variant="outlined" 
                                    className={classes.textfield}
                                    />
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

        )
    }
}
export default withStyles(useStyles)(Edit);
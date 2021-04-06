import React from 'react';
import { withStyles, 
        Table,
        TableContainer,
        TableBody,
        TableCell,
        TableRow,
        TextField,
        Typography } from '@material-ui/core';
import { updateProfile } from '../../actions/user.js';
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
    name: {
        fontWeight: 'bold',
        fontSize: '1.6em',
        borderBottom: 'none',
    },
})

class Edit extends React.Component {
    render() {

        const { classes, handleInputChange, username, name, email, occupation, birthday, bio, userLevel, FAName, FAIntro, FAFields, profile } = this.props;
        return (
            <TableContainer>
                <Table className={classes.table} aria-label="profile table">
                    { userLevel == "Regular User" ?
                        <TableBody>
                            <TableRow>
                                <Typography align="center" className={classes.name}>{ name }</Typography>
                            </TableRow>              
                            <TableRow>
                                <TableCell className={classes.tableCell}>
                                    <TextField onChange={ e => updateProfile(profile, e.target) }
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
                                    <TextField onChange={ e => updateProfile(profile, e.target) }
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
                                        onChange={ e => updateProfile(profile, e.target) }
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
                                        onChange={ e => updateProfile(profile, e.target) }
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
                        :
                        <TableBody>
                            <TableRow>
                                <Typography align="center" className={classes.name}>{ FAName }</Typography>
                            </TableRow>              
                            <TableRow>
                                <TableCell className={classes.tableCell}>
                                    <TextField onChange={ e => updateProfile(profile, e.target) }
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
                                    <TextField onChange={ e => updateProfile(profile, e.target) }
                                                    value={ FAIntro }
                                                    multiline
                                                    id="outlined" 
                                                    label="FAIntro" 
                                                    name="FAIntro"
                                                    variant="outlined" 
                                                    className={classes.textfield}
                                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className={classes.tableCell}>
                                    <TextField 
                                        value={ FAFields } 
                                        onChange={ e => updateProfile(profile, e.target) }
                                        defaultValue="Stocks"
                                        id="fields" 
                                        label="FAFields"
                                        name="FAFields"
                                        variant="outlined" 
                                        className={classes.textfield}
                                        />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    }
                </Table>
            </TableContainer>

        )
    }
}
export default withStyles(useStyles)(Edit);
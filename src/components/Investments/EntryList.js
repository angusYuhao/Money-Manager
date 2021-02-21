import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

function createData(date, description, withdrawal, deposit, balance) {
    return { date, description, withdrawal, deposit, balance};
}

//const {date, description, withdrawal, deposit, balance}= this.props.investments

const rows = [
    createData("2000/11/22", "UofT", 20000, 0 , -20000),
    //createData(date, description, withdrawal, deposit, balance)
];



export default function Entry() {
    const classes = useStyles();
    return(
        <TableContainer component={Paper}>
        <Table >
        <TableHead>
            <TableRow>
            <TableCell>date</TableCell>
            <TableCell >description</TableCell>
            <TableCell >withdrawal</TableCell>
            <TableCell >deposit</TableCell>
            <TableCell >balance</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {rows.map((row) => (
            <TableRow key={row.name}>
                <TableCell>{row.date}</TableCell>
                <TableCell >{row.description}</TableCell>
                <TableCell >{row.withdrawal}</TableCell>
                <TableCell >{row.deposit}</TableCell>
                <TableCell>{row.balance}</TableCell>

            </TableRow>
            ))}
        </TableBody>
        </Table>
        </TableContainer>
    );
}



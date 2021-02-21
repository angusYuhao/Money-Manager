import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';



class StockList extends React.Component{

  

    render(){
        const {stockList}= this.props
        return(
            <TableContainer component={Paper}>
            <Table>
            <TableHead>
                <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Average Cost</TableCell>
                <TableCell>Market Value</TableCell>
                <TableCell>Book Cost</TableCell>
                <TableCell>Gain Loss</TableCell>
                <TableCell>Percentage of portfolio</TableCell>
                </TableRow>
            </TableHead>

            <TableBody>
                {stockList.map((stock) => {
                    return(
                    <TableRow>
                    <TableCell>{stock.name}</TableCell>
                    <TableCell>{stock.quantity}</TableCell>
                    <TableCell>{stock.price}</TableCell>
                    <TableCell>{stock.avgCost}</TableCell>
                    <TableCell>{stock.mktVal}</TableCell>
                    <TableCell>{stock.bookCost}</TableCell>
                    <TableCell>{stock.gainLoss}</TableCell>                    
                    <TableCell>{stock.percentage}</TableCell>
                    {/* <Button variant="contained" onClick = {this.editButtonClicked}>Edit</Button>
                    <Button variant="contained" onClick = {this.deleteButtonClicked}>Delete</Button> */}
                    </TableRow>
                    )
                })}                
            </TableBody>
            </Table>
            </TableContainer>
        )
    }
}

export default StockList;
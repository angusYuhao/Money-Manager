import React from 'react';
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
        const {stockList, deleteStock,editStock}= this.props
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
                    {/* <Button onClick = {() => editStock(stock, stock.name)}>{stock.name}</Button>
                    <Button onClick = {() => editStock(stock, stock.quantity)}>{stock.quantity}</Button>
                    <Button onClick = {() => editStock(stock, stock.price)}>{stock.price}</Button>
                    <Button onClick = {() => editStock(stock, stock.avgCost)}>{stock.avgCost}</Button>
                    <Button onClick = {() => editStock(stock, stock.mktValue)}>{stock.mktValue}</Button>
                    <Button onClick = {() => editStock(stock, stock.bookCost)}>{stock.bookCost}</Button>
                    <Button onClick = {() => editStock(stock, stock.gainLoss)}>{stock.gainLoss}</Button>                    
                    <Button onClick = {() => editStock(stock, stock.percentageOfPortfolio)}>{stock.percentageOfPortfolio}</Button>
                    <Button variant="contained" onClick = {()=>deleteStock(stock)}>Delete</Button> */}
                    <TableCell>{stock.name}</TableCell>
                    <TableCell>{stock.quantity}</TableCell>
                    <TableCell>{stock.price}</TableCell>
                    <TableCell>{stock.avgCost}</TableCell>
                    <TableCell>{stock.mktValue}</TableCell>
                    <TableCell>{stock.bookCost}</TableCell>
                    <TableCell>{stock.gainLoss}</TableCell>                    
                    <TableCell>{stock.percentageOfPortfolio}</TableCell>
                    <Button variant="contained" onClick = {()=>deleteStock(stock)}>Delete</Button>
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
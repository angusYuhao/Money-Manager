import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
// import StockList from './StockList';



class Input extends React.Component {
    render() {
        const {handleInputStock, handleInputChange} = this.props
        return (
        <form className="Input" noValidate autoComplete="off">
        <TextField id="ticker" name = "name" label="ticker" variant="outlined" onChange={handleInputChange}/>
        <TextField id="quantity" name = "quantity" label="quantity" variant="outlined" onChange={handleInputChange}/>
        <TextField id="price" name="price" label="price" variant="outlined" onChange={handleInputChange}/>
        <TextField id="avgCost" name="avgCost" label="avg cost" variant="outlined" onChange={handleInputChange}/>
        <TextField id="mktValue" name="mktValue" label="market value" variant="outlined" onChange={handleInputChange}/>
        <TextField id="bookCost" name="bookCost" label="book cost" variant="outlined" onChange={handleInputChange}/>
        <TextField id="gainLoss" name ="gainLoss" label="gain/loss" variant="outlined" onChange={handleInputChange}/>
        <TextField id="percentageOfPortfolio" name="percentageOfPortfolio" label="percentage of portfolio" variant="outlined"onChange={handleInputChange} />
        <Button variant="contained" onClick={handleInputStock}>Submit</Button>
        </form>
        )
    }
}

export default Input;
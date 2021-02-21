import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '23ch',
    },
  },
}));

export default function StockEntryTextBoxes() {
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField id="ticker" label="ticker" variant="outlined" />
      <TextField id="quantity" label="quantity" variant="outlined" />
      <TextField id="price" label="price" variant="outlined" />
      <TextField id="avgCost" label="avg cost" variant="outlined" />
      <TextField id="mktValue" label="market value" variant="outlined" />
      <TextField id="bookCost" label="book cost" variant="outlined" />
      <TextField id="gainLoss" label="gain/loss" variant="outlined" />
      <TextField id="percentageOfPortfolio" label="percentage of portfolio" variant="outlined" />
      <Button variant="contained" onClick={handleInputStock}>Submit</Button>
    </form>
  );
}



function handleInputStock(){
    console.log("Handling input stock");
}
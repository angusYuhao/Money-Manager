import React from 'react';
import Button from '@material-ui/core/Button';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

class SortButton extends React.Component{
   render(){
       const {categoryName,callBackFunction, sortDes, sortBy} = this.props;
       return(

        <Grid item xs={4}>
            <Paper>
            <Button color="primary" 
                className="InvestmentSortButton"
                variant={sortBy == categoryName ? "contained" : "outlined"}
                //onClick={() => this.changeSort(categoryName)}>
                onClick={() => callBackFunction(categoryName)}>
                Sort By {categoryName}
                {sortDes[categoryName] ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
            </Button>
            </Paper>
        </Grid>

       )
   }
  
}

export default SortButton;
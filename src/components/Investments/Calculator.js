import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '25ch',
    },
}));


class Calculator extends React.Component{
    
    state = {
        menuPosition: null,
        
    }

 
      
    

    displayCompoundTypes(e) {
        this.setState({ menuPosition: e.currentTarget })
    }
    hideCompoundTypes() {
        this.setState({ menuPosition: null })
    }
    
    render(){
        const {compoundTypes} = this.props;
        return(
        <Card className = "CalculatorCard" variant="outlined" color = "secondary"> 
            <CardContent>

                <form noValidate autoComplete="off">
                    <TextField id="standard-basic" label = "Intial investment:" defaultValue = "0"  margin="normal"/>
                    <TextField id="standard-basic" label="Regular contribution:" defaultValue = "0"  margin="normal" />
                    <TextField id="standard-basic" label="Interest rate:" defaultValue = "5" margin="normal" />
                    {/* <TextField id="standard-basic" label="Compounding interval:" defaultValue = "Monthly" margin="normal"/> */}

                    <TextField id="standard-basic" label="Years to grow:" defaultValue = "5" margin="normal"/>
                    {/* <Button aria-controls="simple-menu" aria-haspopup="true"  onClick = {() => this.handleCompound()}>
                        Annually
                    </Button> */}
                    {/* <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                    <MenuItem onClick={this.handleClose}>My account</MenuItem>
                    <MenuItem onClick={this.handleClose}>Logout</MenuItem>

                    <IconButton aria-label="add" onClick={(e) => this.displayCategories(e)}>
                          <MoreVertIcon />
                        </IconButton>
                       */}
                       
                        <Button aria-label="add" onClick={(e) => this.displayCompoundTypes(e)}>
                            Compounding interval
                        </Button>
                       

                      <Menu
                        id="long-menu"
                        anchorEl={this.state.menuPosition}
                        open={Boolean(this.state.menuPosition)}
                        onClose={() => this.hideCompoundTypes()}
                      >

             
                        <MenuItem onKeyDown={e => e.stopPropagation()}>

                          {/* <TextField
                            id="standard-basic"
                            label="New Category"
                            onChange={(e) => this.updateCategory(e)}
                            value={this.state.newCategory}
                          /> */}
                            <MenuItem >Monthly</MenuItem>
                            <MenuItem >Quarterly</MenuItem>
                            <MenuItem >Semi-annually</MenuItem>
                            <MenuItem >Yearly</MenuItem>

                        </MenuItem>

                      </Menu>
                    {/* <Menu
                        id="Compound"
                        
                        keepMounted
                        >
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={handleClose}>My account</MenuItem>
                        <MenuItem onClick={handleClose}>Logout</MenuItem>
                    </Menu> */}
                    {/* <TextField id="filled-basic" label="Filled" variant="filled" />
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" /> */}


                </form>
            </CardContent>

        </Card>
        )



    }


}


export default Calculator ;
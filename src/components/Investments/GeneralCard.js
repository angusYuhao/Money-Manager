import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import Button from '@material-ui/core/Button';
import { ThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';
import { Link } from 'react-router-dom';

import { AppBar, Tab, Tabs } from '@material-ui/core';


const theme = createMuiTheme({
    palette: {
        primary: {
            main: deepPurple[800],
        },
        secondary: {
            main: deepPurple[100],
        }
    },
    typography: {
        fontFamily: [
            'Poppins',
            'sans-serif',
        ].join(','),
    },
  });

class GeneralCard extends React.Component {
    
    render(){
        const {total} = this.props;
        return(
            <ThemeProvider theme={ theme }>
            <Card variant="outlined">
            <CardContent>
              <Typography variant="h3">
                Account overview
              </Typography>
              <br/>
              <Typography variant="h4">
                Account name: 
                <Typography variant="h6"  gutterBottom>
                RRSP
                </Typography>
              </Typography>
              <Typography variant="h4" display="block">
                Account number: 
                <Typography variant="h6" gutterBottom>
                12345A6
                </Typography>
              </Typography>
              <Typography variant="h4" display="block">
                Currency: 
                <Typography variant="h6"  gutterBottom>
                CAD$
                </Typography>
              </Typography>
              <Typography variant="h4" display="block">
                Total amount invested: 
                <Typography variant="h6" gutterBottom>
                ${total}
                </Typography>
              </Typography>
              <br/>
              <br/>
              <Typography variant="h6" display="block">
                If you'd like to learn more about saving and investing, visit our community page
                <Link to={'/community'} >
                <Button color="primary" >
                    <Typography variant="h6" >
                      here.
                    </Typography>
                </Button>
                </Link>
              </Typography>
            </CardContent>
          </Card>  
          </ThemeProvider>
        )
    }
}

export default GeneralCard;
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import Button from '@material-ui/core/Button';


class GeneralCard extends React.Component {
    
    render(){
        const {total} = this.props;
        return(
            <Card >
            <CardContent>
              <Typography variant="h3" component="h2">
                Account overview
              </Typography>
              <br/>
              <Typography variant="h4" component="h2">
                Account name: 
                <Typography variant="h6" component="h2"  gutterBottom>
                RRSP
                </Typography>
              </Typography>
              <Typography variant="h4" component="h2" display="block">
                Account number: 
                <Typography variant="h6" component="h2"  gutterBottom>
                12345A6
                </Typography>
              </Typography>
              <Typography variant="h4" component="h2"  display="block">
                Currency: 
                <Typography variant="h6" component="h2"  gutterBottom>
                CAD$
                </Typography>
              </Typography>
              <Typography variant="h4" component="h2"  display="block">
                Total amount invested: 
                <Typography variant="h6" component="h2"  gutterBottom>
                ${total}
                </Typography>
              </Typography>
              <br/>
              <Typography variant="h6" component="h2" display="block">
                If you'd like to learn more about saving and investing, visit our community page 
                <Button href="/community" color="primary">
                  <Typography variant="h6" component="h2">
                    here. 
                  </Typography>
                </Button>
              </Typography>
            </CardContent>
          </Card>  


        )
    }
}

export default GeneralCard;
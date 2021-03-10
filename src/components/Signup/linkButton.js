import React from 'react';
import { Button, withStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = theme => ({
    backHome: {
      float: 'right',
      marginLeft: 40,
    },
});

class LinkButton extends React.Component {
    render() {
        const { classes, buttonTitle } = this.props;

        return (
            <Link to={'/'}>
                <Button color="primary" variant="contained" className={classes.backHome}>
                  { buttonTitle }
                </Button>
            </Link>
        )
    }
}

export default withStyles(useStyles)(LinkButton);
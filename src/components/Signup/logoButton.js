import React from 'react';
import { Typography, withStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = theme => ({
    title: {
        flexGrow: 1,
        cursor: 'pointer',
        marginRight: '70vw',
    },
});

class LogoButton extends React.Component {
    render() {
        const { classes, buttonTitle } = this.props;

        return (
            <Link to={'/'} style={{ textDecoration: 'none', color: 'black' }}>
                <Typography variant="h6" className={classes.title}>
                  { buttonTitle }
                </Typography>
            </Link>
        )
    }
}

export default withStyles(useStyles)(LogoButton);
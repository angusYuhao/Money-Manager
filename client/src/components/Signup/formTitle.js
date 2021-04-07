import React from 'react';
import { Typography, withStyles } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

const useStyles = theme => ({
    text: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
    },
    subtitle: {
        marginLeft: theme.spacing(3),
        color: grey[500],
    },
});

class FormTitle extends React.Component {
    render() {
        const { classes, firstTitle, subTitle } = this.props;

        return (
            <div>
                <Typography variant="h5" className={classes.text}>
                    { firstTitle }
                </Typography>
                <Typography variant="subtitle2" className={classes.subtitle}>
                    { subTitle }
                </Typography>
            </div>
        )
    }
}

export default withStyles(useStyles)(FormTitle);
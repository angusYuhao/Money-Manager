import React from 'react';
import {withStyles,
        Typography,
        Button,
        createMuiTheme} from '@material-ui/core';
import { deepPurple } from '@material-ui/core/colors';

const useStyles = theme => ({
    follow: {
        float: 'right',
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
        marginBottom: theme.spacing(1),
    },
    followingdata: {
        float: 'left',
        marginLeft: theme.spacing(3),
        marginBottom: theme.spacing(1),
    },
})

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

class Following extends React.Component {
    

    render() {
        const { classes, followingData, handleFollow, handleUnfollow } = this.props;
        return(

            <div>
                <Typography variant="subtitle2" value={followingData} key={followingData} label={followingData} className={classes.followingdata}>
                    { followingData["id"] }
                </Typography>
                { followingData["following"] ?
                    <Button variant="contained" color="primary" onClick={ () => handleUnfollow(followingData) } className={classes.follow}>Unfollow</Button>
                    :
                    <Button variant="contained" color="primary" onClick={ () => handleFollow(followingData) } className={classes.follow}>Follow</Button>
                }  
            </div>
        )
    }
}

export default withStyles(useStyles)(Following);
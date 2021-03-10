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
    followerdata: {
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

class Followers extends React.Component {
    

    render() {
        const { classes, followerData, handleFollow, handleUnfollow } = this.props;
        return(

            <div>
                <Typography variant="subtitle2" value={followerData} key={followerData} label={followerData} className={classes.followerdata}>
                    { followerData["id"] }
                </Typography>
                { followerData["following"] ?
                    <Button variant="contained" color="primary" onClick={ () => handleUnfollow(followerData) } className={classes.follow}>Unfollow</Button>
                    :
                    <Button variant="contained" color="primary" onClick={ () => handleFollow(followerData) } className={classes.follow}>Follow</Button>
                }  
            </div>
        )
    }
}

export default withStyles(useStyles)(Followers);
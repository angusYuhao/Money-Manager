import React from 'react';
import clsx from 'clsx';
import { Typography, 
        AppBar,
        Toolbar,
        Button,
        Drawer,
        withStyles, 
        createMuiTheme,
        Table,
        TableContainer,
        TableBody,
        TableCell,
        TableRow,
        Tab,
        Tabs,
        Avatar,
        ThemeProvider, 
        TextField } from '@material-ui/core';
import HomeAppBar from './../Home/appBar.js';
import Footer from './../Footer/footer.js';
import { deepPurple, grey } from '@material-ui/core/colors';
import MenuIcon from '@material-ui/icons/Menu';
import InboxIcon from '@material-ui/icons/Inbox';
import MailIcon from '@material-ui/icons/Mail';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { Link } from 'react-router-dom';

const drawerWidth = 400;

const useStyles = theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerContainer: {
        overflow: 'auto',
    },
    content: {
        paddingLeft: theme.spacing(15),
        marginTop: theme.spacing(3),
    },
    tabs: {
        marginLeft: theme.spacing(3),
    },
    avatar: {
        height: '80px',
        width: '80px',
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(19.5),
        backgroundColor: deepPurple[800],
    },
    username: {
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(12),
    },
    email: {
        marginTop: theme.spacing(1),
        marginLeft: theme.spacing(5),
    },
    table: {
        marginTop: theme.spacing(1),
    },
    tableCell: {
        borderBottom: 'none',
    },
    editButton: {
        float: 'right',
        marginRight: 10,
    },
    group: {
        float: 'right',
        marginRight: theme.spacing(30),
    },
    name: {
        fontWeight: 'bold',
        fontSize: '1.6em',
        borderBottom: 'none',
    },
    textfield: {
        minWidth: 350,
    }
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

class Profile extends React.Component {

    state = {
        // if false, display edit; if true, display Done
        edit: false,
        bio: "An individual that is pursuing one's passions.",
        username: "user",
        name: "User X",
        email: "user@123.com",
        occupation: "student",
        birthday: "2021-03-08",
    }

    handleEdit = () => {
        this.setState({
            edit: !this.state.edit,
        })
    }

    handleInputChange = (event) => {
        console.log(event)
    
        // get the value we type in 
        const target = event.target;
        const value = target.value;
        const name = target.name;
        console.log(value);
    
        // state is updated and value is also updated in JSX
        // the square bracket dynamically changes the name 
        this.setState({
          [name]: value
        })
    };

    render() {
        const { classes, username, password } = this.props;
        const firstLetter = username.charAt(0).toUpperCase();
        console.log(firstLetter);
        return (
            <ThemeProvider theme={theme}>
                <div className={classes.root}>
                    <AppBar color="secondary" position="fixed" className={classes.appBar}>
                        <Toolbar>
                            <Typography variant='h6' noWrap>
                                Profile
                            </Typography>

                            <Tabs inkBarStyle={{background: 'black'}} centered>
                
                                <Link to={'/spendings'} style={{ textDecoration: 'none', color: 'black' }} className={classes.tabs}>
                                    <Tab label="Spendings"/>
                                </Link>

                                <Link to={'/investments'} style={{ textDecoration: 'none', color: 'black' }} className={classes.tabs}>
                                    <Tab label="Investments"/>
                                </Link>
                                
                                <Link to={'/community'} style={{ textDecoration: 'none', color: 'black' }} className={classes.tabs}>
                                    <Tab label="Community"/>
                                </Link>

                            </Tabs>
                        </Toolbar>
                    </AppBar>
                    <Drawer className={classes.drawer} 
                            variant="permanent"
                            anchor="left"
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                    >
                        <Toolbar />
                        <div className={classes.drawerContainer}>
                            <Avatar align="center" className={classes.avatar}>{ firstLetter }</Avatar>

                            { this.state.edit ? 
                                <TableContainer>
                                    <Table className={classes.table} aria-label="profile table">
                                        <TableBody>
                                            <TableRow>
                                                <TableCell className={classes.tableCell}>
                                                    <TextField onChange={ this.handleInputChange }
                                                            value={ this.state.username }
                                                            defaultValue="user"
                                                            id="outlined" 
                                                            label="username" 
                                                            name="username"
                                                            variant="outlined" 
                                                            className={classes.textfield}
                                                            />
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className={classes.tableCell}>
                                                    <TextField onChange={ this.handleInputChange }
                                                                value={ this.state.name }
                                                                defaultValue="User X"
                                                                id="outlined" 
                                                                label="name" 
                                                                name="name"
                                                                variant="outlined" 
                                                                className={classes.textfield}
                                                                />
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className={classes.tableCell}>
                                                    <TextField onChange={ this.handleInputChange }
                                                                    value={ this.state.email }
                                                                    defaultValue="user@123.com"
                                                                    id="outlined" 
                                                                    label="email" 
                                                                    name="email"
                                                                    variant="outlined" 
                                                                    className={classes.textfield}
                                                                    />
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className={classes.tableCell}>
                                                    <TextField onChange={ this.handleInputChange }
                                                                    value={ this.state.occupation }
                                                                    defaultValue="student"
                                                                    id="outlined" 
                                                                    label="occupation" 
                                                                    name="occupation"
                                                                    variant="outlined" 
                                                                    className={classes.textfield}
                                                                    />
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className={classes.tableCell}>
                                                    <TextField 
                                                        value={ this.state.birthday } 
                                                        onChange={ this.handleInputChange }
                                                        defaultValue="2021-03-08"
                                                        id="date" 
                                                        label="Birthday" 
                                                        type="date"
                                                        name="birthday"
                                                        variant="outlined" 
                                                        InputLabelProps={{
                                                        shrink: true,
                                                        }}
                                                        className={classes.textfield}
                                                        />
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className={classes.tableCell}>
                                                    <TextField 
                                                        value={ this.state.bio } 
                                                        onChange={ this.handleInputChange }
                                                        multiline
                                                        defaultValue="An individual that is pursuing one's passions."
                                                        id="bio" 
                                                        label="Bio"
                                                        name="bio"
                                                        variant="outlined" 
                                                        className={classes.textfield}
                                                        />
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                :
                                <TableContainer>
                                    <Table className={classes.table} aria-label="profile table">
                                        <TableBody>
                                            <TableRow>
                                                <Typography align="center" className={classes.name}>{ this.state.name }</Typography>
                                            </TableRow>
                                            <TableRow>
                                                <Typography align="center" className={classes.bio}>{ this.state.bio }</Typography>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className={classes.tableCell}>Username: { this.state.username }</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className={classes.tableCell}>Email: { this.state.email }</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className={classes.tableCell}>Occupation: { this.state.occupation }</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className={classes.tableCell}>Birthday: { this.state.birthday }</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>       
                            }
                            
                            { this.state.edit ? 
                            <Button onClick={ this.handleEdit }
                                    color="primary" 
                                    variant="contained" 
                                    className={classes.editButton}>
                                Done
                            </Button>
                            :
                            <Button onClick={ this.handleEdit }
                                    color="primary" 
                                    variant="contained" 
                                    className={classes.editButton}>
                                Edit Profile
                            </Button>
                            }
                        </div>
                    </Drawer>

                   
                    <main className={classes.content}>
                        <div className={classes.group}>
                            <Typography variant='h6'>
                                Posts
                            </Typography>
                            <Typography variant='h6'>
                                10
                            </Typography>
                        </div>
                        <div className={classes.group}>
                            <Typography variant='h6'>
                                Following
                            </Typography>
                            <Typography variant='h6'>
                                300
                            </Typography>
                        </div>
                        <div className={classes.group}>
                            <Typography variant='h6'>
                                Followers
                            </Typography>
                            <Typography variant='h6'>
                                250
                            </Typography>
                        </div>
                    </main> 
                </div>
            </ThemeProvider>
        )
    }
}

export default withStyles(useStyles)(Profile);
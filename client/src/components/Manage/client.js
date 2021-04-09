import React from 'react';
import { AppBar, Tab, Tabs } from '@material-ui/core';
import { Link } from 'react-router-dom';
import {
    withStyles,
    Toolbar,
    Typography,
    Avatar,
    Button,
    Tooltip,
    Dialog,
    Chip,
    Container,
    Card,
    Grid,
    CardActions,
    CardContent,
    DialogContent,
    DialogTitle,
    DialogActions,
    ListItemIcon,
    ListItem,
    ListItemAvatar,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Select,
    FormControl,
    InputLabel,
    MenuItem,
    createMuiTheme,
    TextField,
    ThemeProvider
} from '@material-ui/core';
import { deepPurple, pink, indigo, red } from '@material-ui/core/colors';
import VisibilityIcon from '@material-ui/icons/Visibility';
import PersonIcon from '@material-ui/icons/Person';
import CloseIcon from '@material-ui/icons/Close';
import BarChart from '../Investments/BarChart.js';

import CONFIG from '../../config'
const API_HOST = CONFIG.api_host

const useStyles = theme => ({
    avatar: {
        backgroundColor: deepPurple[800]
    },
    sendButton: {
        margin: theme.spacing(1),
    },
    view: {
        margin: theme.spacing(1),
    },
    genderFemale: {
        marginLeft: theme.spacing(1),
        verticalAlign: "middle",
        color: pink[100]
    },
    genderMale: {
        marginLeft: theme.spacing(1),
        verticalAlign: "middle",
        color: indigo[600]
    },
    genderOther: {
        marginLeft: theme.spacing(1),
        verticalAlign: "middle",
        color: red[600]
    },
    username: {
        verticalAlign: "middle",
    },
    content: {
        marginTop: theme.spacing(10),
    },
    dialogusername: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(3),
        fontWeight: 'bold',
        fontSize: '1.5em',
    },
    dialogchip: {
        fontSize: '0.7em'
    },
    container: {
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(0),
        float: 'left',
    },
    clientTop: {
        marginTop: theme.spacing(3),
        marginRight: theme.spacing(5),
    },
    clientTopBar: {
        backgroundColor: deepPurple[50],
        borderRadius: 5,
        spacing: '100',
    },
    purpleText: {
        fontSize: 20,
        marginBottom: theme.spacing(3),
    },
    text: {
        fontSize: 20,
    },
    email_text: {
        marginLeft: theme.spacing(17),
    },
    birthday_text: {
        marginLeft: theme.spacing(13.3),
    },
    occupation_text: {
        marginLeft: theme.spacing(9.3),
    },
    salary_text: {
        marginLeft: theme.spacing(16.2),
    },
    spendings_text: {
        marginLeft: theme.spacing(4.2),
    },
    gain_text: {
        marginLeft: theme.spacing(11.8),
    },
    loss_text: {
        marginLeft: theme.spacing(12.6),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 250,
    },
    textAdvice: {
        margin: theme.spacing(1),
        minWidth: 500,
    },
    barChart: {
        float: 'right',
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

class ClientItem extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            openClientDetail: false,
            closeDetail: true,
            recommend: false,
            recommendationText: "",
            actions: "",
            arrayForBarGraph: [],
            textAdvice: "",
        }
    }

    componentDidMount() {
        this.setState({
            arrayForBarGraph: [{
                "Duration": 2021,
                "Total Spendings": 5000,
                "Total Gain": 2000,
                "Total Loss": 1000
            }]
        })
    }

    openHandler = () => {
        this.setState({
            openClientDetail: true,
        })
    }

    handleClose = () => {
        this.setState({
            openClientDetail: false,
        })
    }

    handleCloseRecommend = () => {
        this.setState({
            recommend: false,
            // textAdvice: "Give some advice to your clients!",
            textAdvice: "",
            actions: ""
        })
    }

    clickRecommend = () => {
        this.setState({
            recommend: true
        })
    }

    handleInputChange = (event) => {

        // get the value we type in 
        const target = event.target;
        const value = target.value;
        const name = target.name;

        // state is updated and value is also updated in JSX
        // the square bracket dynamically changes the name 
        this.setState({
            [name]: value
        })
    }

    // sends server request to have recommendation from FA -> regular user 
    sendRecommend = (username) => {

        // closes the popup 
        this.handleCloseRecommend()

        // no FA name here, will be added on server side 
        const body = {
            "Recommendation Action": this.state.actions,
            "Recommendation Text": this.state.textAdvice
        }

        const url = `${API_HOST}/users/manage/recommend/${username}`
        const request = new Request(url, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json"
            }
        })

        fetch(request)
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })
            .catch(error => {
                console.log(error)
            })

    }

    render() {
        const { classes, username, firstName, lastName, email, birthday,
            occupation, salary, gender, totalSpendings, totalGain, totalLoss } = this.props;
        const name = firstName + " " + lastName;
        console.log(totalSpendings)

        const arrayForBarGraph = [{
            "Duration": 2021,
            "Total Spendings": 5000,
            "Total Gain": 2000,
            "Total Loss": 1000
        }]

        return (
            <ThemeProvider theme={theme}>
                <div>
                    <ListItem button="true" onClick={this.openHandler}>
                        <ListItemAvatar>
                            <Avatar className={classes.avatar}>{username[0]}</Avatar>
                        </ListItemAvatar>
                        <ListItemText>
                            <span className={classes.username}>{username}</span>
                            {gender == "female" ?
                                <ListItemIcon className={classes.genderFemale}>
                                    <PersonIcon className={classes.gender} />
                                </ListItemIcon>
                                :
                                gender == "male" ?
                                    <ListItemIcon className={classes.genderMale}>
                                        <PersonIcon />
                                    </ListItemIcon>
                                    :
                                    <ListItemIcon className={classes.genderOther}>
                                        <PersonIcon />
                                    </ListItemIcon>
                            }
                        </ListItemText>

                        <ListItemSecondaryAction>
                            <Tooltip title="View profile">
                                <IconButton edge="end" aria-label="visible" className={classes.view} onClick={this.openHandler}>
                                    <VisibilityIcon />
                                </IconButton>
                            </Tooltip>
                            <Button variant="contained"
                                color="primary"
                                className={classes.sendButton}
                                onClick={this.clickRecommend}>
                                Recommend
                            </Button>
                        </ListItemSecondaryAction>
                    </ListItem>

                    <Dialog open={this.state.recommend} onClose={this.handleCloseRecommend} aria-labelledby="reommend-dialog">
                        <DialogTitle id="customized-dialog-title" onClose={this.handleCloseRecommend}>
                            Recommendations for clients
                        </DialogTitle>
                        <DialogContent dividers>
                            <Grid container direction="column" spacing={1}>
                                <FormControl variant="outlined" className={classes.formControl}>
                                    <InputLabel id="user-label">Recommended actions:</InputLabel>
                                    <Select labelId="user-label"
                                        id="user"
                                        value={this.state.actions}
                                        name="actions"
                                        label="Recommended actions"
                                        onChange={this.handleInputChange}
                                    >
                                        <MenuItem value={"Mutual Funds"}>Mutual Funds</MenuItem>
                                        <MenuItem value={"Bonds"}>Bonds</MenuItem>
                                        <MenuItem value={"ETF"}>Exchange-Traded Funds (ETF)</MenuItem>
                                    </Select>
                                </FormControl>
                                <TextField multiline
                                    rows={4}
                                    value={this.state.textAdvice}
                                    onChange={this.handleInputChange}
                                    id="outlined-basic"
                                    label="Recommendations"
                                    name="textAdvice"
                                    // defaultValue="Give some advice to your clients!"
                                    placeholder="Give some advice to your clients!"
                                    variant="outlined"
                                    className={classes.textAdvice} />
                            </Grid>
                        </DialogContent>

                        <DialogActions>
                            <   Button autoFocus onClick={this.handleCloseRecommend} color="primary">
                                Cancel
                            </Button>
                            <Button autoFocus onClick={() => this.sendRecommend(username)} color="primary">
                                Send
                            </Button>
                        </DialogActions>
                    </Dialog>

                    <Dialog open={this.state.openClientDetail} onClose={this.handleClose} aria-labelledby="form-dialog-title" fullScreen>
                        <AppBar className={classes.appBar}>
                            <Toolbar>
                                <Tooltip title="Close">
                                    <IconButton edge="start" color="inherit" aria-label="close" onClick={this.handleClose}>
                                        <CloseIcon />
                                    </IconButton>
                                </Tooltip>
                                <Typography variant="h6" className={classes.title}>
                                    Client profile
                                </Typography>
                            </Toolbar>
                        </AppBar>

                        <DialogContent className={classes.content}>
                            <Typography variant="h5" className={classes.dialogusername}>
                                {name} : <Chip className={classes.dialogchip} label={username}></Chip>
                                {gender == "female" ?
                                    <ListItemIcon className={classes.genderFemale}>
                                        <PersonIcon className={classes.gender} />
                                    </ListItemIcon>
                                    :
                                    gender == "male" ?
                                        <ListItemIcon className={classes.genderMale}>
                                            <PersonIcon />
                                        </ListItemIcon>
                                        :
                                        <ListItemIcon className={classes.genderOther}>
                                            <PersonIcon />
                                        </ListItemIcon>
                                }
                            </Typography>

                            <Container className={classes.container} maxWidth="md">
                                <Card className={classes.clientTop}>
                                    <CardActions className={classes.clientTopBar}>
                                        <CardContent>
                                            <Typography className={classes.purpleText} > Email:
                                                <span className={classes.email_text}>{email}</span>
                                            </Typography>
                                            <Typography className={classes.purpleText} > Birthday:
                                                <span className={classes.birthday_text}>{birthday}</span>
                                            </Typography>
                                            <Typography className={classes.purpleText} > Occupation:
                                                <span className={classes.occupation_text}>{occupation}</span>
                                            </Typography>
                                            <Typography className={classes.purpleText} > Salary:
                                                <span className={classes.salary_text}>{salary}</span>
                                            </Typography>
                                            <Typography className={classes.purpleText} > Total spendings:
                                                <span className={classes.spendings_text}>{totalSpendings}</span>
                                            </Typography>
                                            <Typography className={classes.purpleText} > Total gain:
                                                <span className={classes.gain_text}>{totalGain}</span>
                                            </Typography>
                                            <Typography className={classes.text} > Total loss:
                                                <span className={classes.loss_text}>{totalLoss}</span>
                                            </Typography>
                                        </CardContent>
                                    </CardActions>
                                </Card>
                            </Container>
                            <div className={classes.barChart}>
                                <BarChart listToDisplay = {arrayForBarGraph} 
                                        numDatasets = {3} 
                                        indices = {["Total Spendings", "Total Gain", "Total Loss"]} 
                                        labelIndex = "Duration" 
                                        barChartWidth = {500} 
                                        barChartHeight = {500}/>
                            </div>

                        </DialogContent>
                    </Dialog>
                </div>
            </ThemeProvider>

        )

    }

}

export default withStyles(useStyles)(ClientItem);
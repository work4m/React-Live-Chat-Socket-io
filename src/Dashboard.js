import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { CTX } from './Store';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: '50px',
        padding: theme.spacing(3, 2),
    },
    flex: {
        display: 'flex',
        alignItems: 'center',
    },
    topicsWindow: {
        width: '30%',
        height: '300px',
        borderRight: '1px solid gray'
    },
    chatWindow: {
        width: '70%',
        height: '300px',
        padding: '20px',
    },
    chatBox: {
        width: '85%',
    },
    button: {
        width: '15%',
    },
}));

function Dashboard() {

    // use CTX here
    const { allChats, sendChatAction, user } = React.useContext(CTX);
    const topics = Object.keys(allChats);

    const classes = useStyles();

    // local state
    const [activeTopics, changeActiveTopics] = useState(topics[0]);
    const [textValue, changeTextValue] = useState("");

    return (
        <div >
            <Paper className={classes.root} >
                <Typography variant="h4" component="h4" >
                    Chat app
                </Typography>
                <Typography variant="h5">
                    {activeTopics}
                </Typography>
                <div className={classes.flex}>
                    <div className={classes.topicsWindow}>
                        <List>
                            {
                                topics.map(topic =>
                                    <ListItem key={topic} onClick={e => changeActiveTopics(e.target.innerText)} button>
                                        <ListItemText primary={topic} />
                                    </ListItem>
                                )
                            }
                        </List>
                    </div>
                    <div className={classes.chatWindow}>
                        {
                            allChats[activeTopics].map((chat, i) =>
                                <div
                                    className={classes.flex}
                                    key={i}
                                >
                                    <Chip label={chat.from} className={classes.chip} />
                                    <Typography variant='body1'>{chat.msg}</Typography>
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className={classes.flex}>
                    <TextField
                        id="standard-basic"
                        label="Send a Chat"
                        className={classes.chatBox}
                        value={textValue}
                        onChange={e => changeTextValue(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={() => {
                            sendChatAction({ from: user, msg: textValue, topic: activeTopics });
                            changeTextValue("");
                        }}
                    >
                        Send
                    </Button>
                </div>
            </Paper>
        </div>
    )
}

export default Dashboard

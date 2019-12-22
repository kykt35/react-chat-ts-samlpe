import React, { FC, useState, useEffect, useRef } from 'react';
import { Container, Box, TextField, makeStyles } from '@material-ui/core';
import MessageArea from './MessageArea';
import SendMessageBox from './SendMessageBox';
import firebase, { db } from '../firebase';
import { AppState } from '../App';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',

        position: 'relative',

        paddigBottom: 80,
    },
    chatRoomwrap: {
        height: '85%',
        overflow: 'scroll',
    },
    sendBox: {
        width: '100%',
        position: 'sticky',
        marginTop: 20,
    },
    messageArea: {
        height: '100%',
    },
}));

interface MesssageProps {
    username: string;
    text: string;
}

const ChatRoom: FC<AppState> = ({ currentUser }) => {
    const user = {
        username: currentUser?.displayName || currentUser?.email || ' NoName',
    };
    const [messages, setMessages] = useState([
        {
            username:
                currentUser?.displayName || currentUser?.email || ' NoName',
            text: '',
        },
    ]);
    const classes = useStyles();

    useEffect(() => {
        const storeMessages = [{ username: '', text: '' }];
        db.collection('messages')
            .orderBy('createdAt', 'asc')
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    storeMessages.push({
                        username: doc.data().username,
                        text: doc.data().text,
                    });
                });
                setMessages(storeMessages);
            });
    });

    const postMessageToFirestore = (values: MesssageProps) => {
        db.collection('messages')
            .add({
                username: values.username,
                text: values.text,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
            })
            .then(function(docRef) {
                console.log('Document written with ID: ', docRef.id);
            })
            .catch(function(error) {
                console.error('Error adding document: ', error);
            });
    };

    const sendMessage = (text: string) => {
        const message = { username: user.username, text: text };
        postMessageToFirestore(message);

        const newMessages = messages.slice();
        newMessages.push(message);

        setMessages(newMessages);
    };

    return (
        <>
            <Container
                id="chatarea-wrap"
                maxWidth="sm"
                className={classes.chatRoomwrap}
            >
                <MessageArea
                    chatMessages={messages}
                    user={user}
                    className={classes.messageArea}
                />
            </Container>
            <SendMessageBox
                className={classes.sendBox}
                onSendMessage={sendMessage}
            />
        </>
    );
};

export default ChatRoom;

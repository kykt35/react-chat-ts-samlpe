import React, { FC, useState, useEffect } from 'react';
import { Container, Box, TextField, makeStyles } from '@material-ui/core';
import MessageArea from './MessageArea'
import SendMessageBox from './SendMessageBox';
import AppHeader from './AppHeader'
import firebase, { db } from '../firebase'

const useStyles = makeStyles(theme => ({
    root: {

        width: '100%',
        height: '100vh',
        position: 'relative',

    },
    sendBox: {
        width: '100%',
        position: "absolute",
        bottom: 20,
        left: 0,
      }
  })
)

interface messsageProps {
  username:string;
  text:string;
}

const AppContainer: FC = () => {
  const [user, setUser] = useState({username: ""})
  const [messages, setMessages] = useState([{username: "", text: ""}]);
  const classes = useStyles()

useEffect(()=>{
  let storeMessages = [{username: "", text: ""}]
  db.collection("messages").orderBy('createdAt', 'asc').get().then((querySnapshot) => {

      querySnapshot.forEach((doc) => {
          storeMessages.push({username: doc.data().username, text: doc.data().text})
      });
  setMessages(storeMessages)
  });

})

const postMessageToFirestore = (values: messsageProps) => {
  db.collection("messages").add({
      username: values.username,
      text: values.text,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
  })
  .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
  })
  .catch(function(error) {
      console.error("Error adding document: ", error);
  });

}


  const sendMessage = (text: string, username: string) =>{
    let message = {username: username, text: text,  }
    postMessageToFirestore(message)

    let newMessages=messages.slice()
    newMessages.push(message)

    setMessages(newMessages)
  }

  const handleChangeUsername = (username: string) => {
    setUser({username: username})
  }

  return (
    <Container maxWidth="sm" className={classes.root}>
      <AppHeader/>
      <MessageArea chatMessages={messages} user={user}/>
      <SendMessageBox className={classes.sendBox} onSendMessage={sendMessage} onChangeUsename={handleChangeUsername}/>
    </Container>
  );
}

export default AppContainer;

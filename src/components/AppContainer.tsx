import React, { FC, useState } from 'react';
import { Container, Box, TextField, makeStyles } from '@material-ui/core';
import MessageArea from './MessageArea'
import SendMessageBox from './SendMessageBox';
import AppHeader from './MessageArea'

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


const AppContainer: FC = () => {
  const [values, setValues] = useState([{username: "", text: "", isMe: false}]);
  const messages =[{username: "1234", text: "aaaa"},{username: "2345", text: "いいいい", isMe: true},]
  const classes = useStyles()
  const sendMessage = (text: string) =>{
  let val = values.slice();
  val.push({username: "1234", text: text, isMe: true})
  setValues(val)
  }
  return (
    <Container maxWidth="sm" className={classes.root}>

      <MessageArea chatMessages={values}/>
      <SendMessageBox className={classes.sendBox} onSendMessage={sendMessage}/>
    </Container>
  );
}

export default AppContainer;

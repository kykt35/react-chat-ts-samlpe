import React, { FC } from 'react';
import MessageBody from './MessageBody';

import {  Box, makeStyles } from '@material-ui/core';


interface ChatMessages{
  username:string;
  isMe?:boolean;
  text?:string;
}
interface ChatProps {
  chatMessages:ChatMessages[];
}

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        position: "relative",
    },
    sendBox: {
      width: '100%',
      position: "fixed",
      bottom: 0,
      left: 0,
    }
  })
)

const MessageArea: FC<ChatProps> = ({
  chatMessages
}) => {
  const classes = useStyles()
  const messages = chatMessages.map((m, index) => <MessageBody username={m.username} text={m.text} isMe={m.isMe} key={index}/>);

  return (
    <Box className={classes.root}>
      <Box className="">
        {messages}
      </Box>
    </Box>
  );
}

export default MessageArea;

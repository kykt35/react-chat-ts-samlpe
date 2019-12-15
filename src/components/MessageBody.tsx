import React, { FC } from 'react';
import { Avatar, Box, List, ListItem, makeStyles } from '@material-ui/core';
import MessageCard from './MessageCard';

interface MessageProps {
  username:string;
  isMe?:boolean;
  text?:string;
}

const useStyles = makeStyles(theme => ({
    listItem: {
        justifyContent: 'space-between',

    },
  })
)

const MessageBody: FC<MessageProps> = ({username, text, isMe}) => {
  const classes = useStyles();
  const messageCard = <MessageCard >{text}</MessageCard>
  const avatar =  <Avatar>{username.substr(0,3)}</Avatar>
  const item = isMe
          ? <>{messageCard}{avatar}</>
          : <>{avatar} {messageCard}</>

  return (
    <Box className="Messsage">
      <List >
        <ListItem className={classes.listItem}>{username ? item : ""}</ListItem>
      </List>
    </Box>
  );
}

export default MessageBody;

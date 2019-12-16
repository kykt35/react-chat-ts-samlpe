import React, { FC, useState } from 'react';
import { Button, Box, TextareaAutosize, Input, makeStyles } from '@material-ui/core';
import {  BoxProps } from '@material-ui/core/Box';
import {  ButtonProps } from '@material-ui/core/Button';
import classNames from 'classnames';

interface SendMessageBoxProps {
  onSendMessage?: (text: string, username: string)=>void;
  className?: BoxProps["className"]
  onChangeUsename?: (username: string)=>void;

}

const useStyles = makeStyles(theme => ({
    sendBox: {
        width: '100%',
        padding: 10,
        miniHeight: 50,
        fontSize: '16px',
        borderRadius: 0,
        backgroundColor: "white",
    },
    inner: {
      height: "100%",
        display: "flex",
        alignItems: 'flex-end',

    },
    textarea: {
      width: "100%"
    },
    username: {
      textAlign: "left",
      display: "block"
    }
  })
)

const SendMessageBox: FC<SendMessageBoxProps> = ({onSendMessage,  className, onChangeUsename}) => {

  const [text, setText] = useState('');
  const [username, setUsername] = useState('');
  const handleTextFieldChange = (e:  React.ChangeEvent<HTMLTextAreaElement>)=>{
    setText(e.target.value)
  }
  const handleNameFieldChange = (e:  React.ChangeEvent<HTMLTextAreaElement>)=>{
    setUsername(e.target.value)

    if (onChangeUsename) {
      onChangeUsename(e.target.value)
    }
  }
  const handleClick = (e: React.MouseEvent<HTMLElement>)=> {
    e.preventDefault()
    if (!text || !username) {return }

    if (onSendMessage) { onSendMessage(text, username) }
    setText('');
  }
  const classes = useStyles();
  return (
    <Box className={classNames(classes.sendBox, className)}>
      <Input  value={username} className={classes.username} onChange={handleNameFieldChange} placeholder="なまえ"/>
      <Box className={classes.inner}>
        <TextareaAutosize rows={2} className={classes.textarea} value={text} onChange={handleTextFieldChange}/>


        <Button variant="contained" color="primary" onClick={handleClick}>send</Button>
      </Box>
    </Box>


  );
}

export default SendMessageBox;

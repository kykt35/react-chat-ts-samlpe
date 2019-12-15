import React, { FC, useState } from 'react';
import { Button, Box, TextareaAutosize, makeStyles } from '@material-ui/core';
import {  BoxProps } from '@material-ui/core/Box';
import {  ButtonProps } from '@material-ui/core/Button';
import classNames from 'classnames';

interface SendMessageBoxProps {
  onSendMessage?: (text: string)=>void;
  className?: BoxProps["className"]

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
    }
  })
)

const SendMessageBox: FC<SendMessageBoxProps> = ({onSendMessage,  className}) => {

  const [text, setText] = useState('');
  const handleTextFieldChange = (e:  React.ChangeEvent<HTMLTextAreaElement>)=>{
    setText(e.target.value)
  }
  const handleClick = (e: React.MouseEvent<HTMLElement>)=> {
    e.preventDefault()
    if (onSendMessage) { onSendMessage(text) }
    setText('');
  }
  const classes = useStyles();
  return (
    <Box className={classNames(classes.sendBox, className)}>
      <Box className={classes.inner}>
        <TextareaAutosize rows={2} className={classes.textarea} value={text} onChange={handleTextFieldChange}/>
        <Button variant="contained" color="primary" onClick={handleClick}>send</Button>
      </Box>
    </Box>


  );
}

export default SendMessageBox;

import React, { FC } from 'react';
import MessageBody from './MessageBody';
import clsx from 'clsx';
import { Box, makeStyles } from '@material-ui/core';

interface ChatMessages {
    username: string;
    isMe?: boolean;
    text?: string;
}
interface ChatProps {
    chatMessages: ChatMessages[];
    user: { username: string };
    className?: string;
}

const useStyles = makeStyles(() => ({
    root: {
        width: '100%',
        position: 'relative',
    },
}));

const MessageArea: FC<ChatProps> = ({ chatMessages, user, className }) => {
    const classes = useStyles();
    const messages = chatMessages.map((m, index) => (
        <MessageBody
            username={m.username}
            text={m.text}
            isMe={m.username === user.username}
            key={index}
        />
    ));

    return <Box className={clsx(classes.root, className)}>{messages}</Box>;
};

export default MessageArea;

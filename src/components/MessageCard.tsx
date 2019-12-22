import React, { FC } from 'react';
import { Card, makeStyles } from '@material-ui/core';

interface MessageCardProps {
    children?: string;
}

const useStyles = makeStyles(theme => ({
    root: {
        width: '85%',
        padding: 10,
        fontSize: '16px',
        borderRadius: 8,
        whiteSpace: 'pre-line',
    },
}));

const MessageCard: FC<MessageCardProps> = ({ children = 'テキスト' }) => {
    const classes = useStyles();
    return <Card className={classes.root}>{children}</Card>;
};

export default MessageCard;

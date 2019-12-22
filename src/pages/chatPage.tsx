import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core';
import ChatRoom from '../components/ChatRoom';
import { AppState } from '../App';
import { DefaultLayout } from '../layout';

interface ChatPageProps {
    state: AppState;
}

const useStyles = makeStyles(() => ({
    root: {
        height: '100vh',
    },
}));

export const ChatPage: FC<ChatPageProps> = ({ state }) => {
    const classes = useStyles();
    return (
        <DefaultLayout state={state} className={classes.root}>
            <ChatRoom currentUser={state.currentUser} />
        </DefaultLayout>
    );
};

export default ChatPage;

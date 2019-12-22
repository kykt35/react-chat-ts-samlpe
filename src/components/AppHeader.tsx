import React, { FC } from 'react';
import { Box, Button, makeStyles, createStyles, Link } from '@material-ui/core';
import firebase, { db } from '../firebase';
import { AppState } from '../App';

interface AppHeaderProps extends AppState {
    fixed?: boolean;
}

const useStyles = makeStyles(fixed =>
    createStyles({
        root: {
            width: '100%',
            height: 80,
            textAlign: 'left',
            padding: 20,
            boxSizing: 'border-box',
            backgroundColor: 'lemonchiffon',
            position: 'sticky',
            display: 'flex',
            justifyContent: 'space-between',
        },
        logo: {
            fontSize: 26,
            color: 'black',
        },
    }),
);

const AppHeader: FC<AppHeaderProps> = ({ currentUser, fixed = false }) => {
    const classes = useStyles(fixed);
    const hadleSignOut = () => {
        firebase.auth().signOut();
    };

    return (
        <Box className={classes.root}>
            <Box className={classes.logo}>
                <Link href="/" underline="none" color="textPrimary">
                    chat-sample
                </Link>
            </Box>
            <Box>
                <Box>{currentUser?.displayName || currentUser?.email}</Box>
                {currentUser ? (
                    <Button onClick={hadleSignOut}>sign out</Button>
                ) : (
                    <Button>
                        <Link href="/sign_in">sign in</Link>
                    </Button>
                )}
            </Box>
        </Box>
    );
};

export default AppHeader;

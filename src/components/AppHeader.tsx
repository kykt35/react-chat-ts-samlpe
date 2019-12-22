import React, { FC } from 'react';
import { Box, makeStyles, createStyles, Link } from '@material-ui/core';
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
        },
        logo: {
            fontSize: 26,
            color: 'black',
        },
    }),
);

const AppHeader: FC<AppHeaderProps> = ({ currentUser, fixed = false }) => {
    const classes = useStyles(fixed);

    return (
        <Box className={classes.root}>
            <Box className={classes.logo}>
                <Link href="/" underline="none" color="textPrimary">
                    chat-sample
                </Link>
            </Box>
            <Box>{currentUser?.displayName || currentUser?.email}</Box>
        </Box>
    );
};

export default AppHeader;

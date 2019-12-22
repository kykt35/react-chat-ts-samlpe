import React, { FC, ReactNode } from 'react';
import AppHeader from '../components/AppHeader';
import { Container, Box, makeStyles } from '@material-ui/core';
import { AppState } from '../App';
import clsx from 'clsx';

interface DefaultLayoutProps {
    state: AppState;
    children: ReactNode;
    className?: string;
}

const useStyles = makeStyles(() => ({
    root: {
        height: '100vh',
    },
    layoutInner: {
        width: '100%',
        height: 'calc(100% - 80px)',
    },
}));

export const DefaultLayout: FC<DefaultLayoutProps> = ({
    state,
    children,
    className,
}) => {
    const classes = useStyles();
    return (
        <Container maxWidth="lg" className={classes.root}>
            <AppHeader currentUser={state.currentUser} />
            <Box id="default-layout-innner" className={classes.layoutInner}>
                {children}
            </Box>
        </Container>
    );
};

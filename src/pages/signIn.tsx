import React, { FC, useState } from 'react';

import { Container, makeStyles, createStyles } from '@material-ui/core';
import { LoginCard } from '../components/LoginCard';
import firebase, { db } from '../firebase';
import { AppState } from '../App';

interface State {
    email: string;
    password: string;
}

const useStyles = makeStyles(() =>
    createStyles({
        root: {},
    }),
);

export const SignInPage: FC<AppState> = ({ currentUser }) => {
    const [values, setValues] = useState({ email: '', password: '' });
    const handleChange = (
        prop: keyof State,
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setValues({ ...values, [prop]: event.target.value });
    };
    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        handleChange('email', event);
    };
    const handlePasswordChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        handleChange('password', event);
    };
    const login = () => {
        firebase
            .auth()
            .signInWithEmailAndPassword(values.email, values.password)
            .catch(function(error) {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(
                    `error code: ${errorCode} errorMessage: ${errorMessage}`,
                );
            });
        const currentUser = firebase.auth().currentUser;
        sessionStorage.setItem('current_user', JSON.stringify(currentUser));
    };
    const classes = useStyles();
    return (
        <Container maxWidth="sm" className={classes.root}>
            <LoginCard
                email={values.email}
                password={values.password}
                onChangeEmail={handleEmailChange}
                onChangePassword={handlePasswordChange}
                onClickLogin={login}
            />
        </Container>
    );
};

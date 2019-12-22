import React, { FC, useState } from 'react';

import { Container, makeStyles, createStyles } from '@material-ui/core';
import { SignUpCard } from '../components/SignUpCard';
import firebase, { db } from '../firebase';
import { AppState } from '../App';
import { DefaultLayout } from '../layout';
import { useHistory } from 'react-router-dom';

interface State {
    email: string;
    password: string;
}

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            height: '100%',
        },
        loginWrap: {
            height: '100%',
        },
        loginCard: {
            marginTop: 40,
            width: '100%',
        },
    }),
);

export const SignUpPage: FC<AppState> = state => {
    const [values, setValues] = useState({ email: '', password: '' });
    const history = useHistory();

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
    const signUp = async () => {
        await firebase
            .auth()
            .createUserWithEmailAndPassword(values.email, values.password)
            .then(() => {
                const currentUser = firebase.auth().currentUser;
                sessionStorage.setItem(
                    'current_user',
                    JSON.stringify(currentUser),
                );
                history.push('/chat');
            })
            .catch(error => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(
                    `error code: ${errorCode} errorMessage: ${errorMessage}`,
                );
            });
    };

    const classes = useStyles();
    return (
        <DefaultLayout state={state} className={classes.root}>
            <Container
                id="login-wrap"
                maxWidth="sm"
                className={classes.loginWrap}
            >
                <SignUpCard
                    className={classes.loginCard}
                    email={values.email}
                    password={values.password}
                    onChangeEmail={handleEmailChange}
                    onChangePassword={handlePasswordChange}
                    onClickLogin={signUp}
                />
            </Container>
        </DefaultLayout>
    );
};

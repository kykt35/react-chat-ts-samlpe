import React, { FC, useState } from 'react';
import {
    Card,
    CardContent,
    Input,
    CardActions,
    Button,
    FormControl,
    InputLabel,
    InputAdornment,
    IconButton,
    makeStyles,
    createStyles,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { CardProps } from '@material-ui/core/Card';
import clsx from 'clsx';

interface SignUpCardProps extends CardProps {
    email: string;
    password: string;
    onChangeEmail?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onChangePassword?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onClickLogin?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            textAlign: 'left',
            padding: 40,
            backgroundColor: 'white',
        },
    }),
);

export const SignUpCard: FC<SignUpCardProps> = ({
    email,
    password,
    onChangeEmail,
    onChangePassword,
    onClickLogin,
    className,
    children,
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>,
    ) => {
        event.preventDefault();
    };

    const classes = useStyles();
    return (
        <Card className={clsx(classes.root, className)}>
            <CardContent>
                <FormControl variant="outlined" fullWidth>
                    <InputLabel htmlFor="email">email</InputLabel>
                    <Input
                        id="email"
                        fullWidth
                        value={email}
                        onChange={onChangeEmail}
                    />
                </FormControl>
            </CardContent>

            <CardContent>
                <FormControl variant="outlined" fullWidth>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input
                        id="password"
                        fullWidth
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={onChangePassword}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {showPassword ? (
                                        <Visibility />
                                    ) : (
                                        <VisibilityOff />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
            </CardContent>
            <CardActions>
                <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={onClickLogin}
                >
                    sign up
                </Button>
            </CardActions>
        </Card>
    );
};

export default SignUpCard;

import React from 'react';
import { TextField, Button } from '@material-ui/core';
import { useAuthContext } from './AuthContext';

export const Login = () => {
    const {login,emailChange,passwordChange} = useAuthContext();
    return (
        <form onSubmit={login}>
            <h2>Login</h2>
            <TextField onChange={emailChange} placeholder="Email" type="email" />
            <TextField onChange={passwordChange} placeholder="Password" type="password" />
            <Button type="submit">Iniciar Session</Button>
        </form>
    )
}
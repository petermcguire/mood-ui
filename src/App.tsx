import React, { FormEvent, useState } from 'react';
import { createTheme, TextField, ThemeProvider, Button } from '@mui/material';

const theme = createTheme();

type LoginPayload = {
    username: string;
    password: string;
};

const App = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        const payload: LoginPayload = { username, password };

        try {
            const response = await fetch('https://mood.fly.dev/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Username"
                    variant="outlined"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    label="Password"
                    variant="outlined"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button type="submit" variant="contained" color="primary">
                    Submit
                </Button>
            </form>
        </ThemeProvider>
    );
}

export default App;
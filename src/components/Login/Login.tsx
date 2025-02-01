import { FormEvent, useState } from 'react';
import { TextField, Button } from '@mui/material';

type LoginProps = {
    onLogin: (username: string, password: string) => Promise<void>;
};

const Login = ({ onLogin }: LoginProps) => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState('');

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        if (!username || !password) {
            setError('Please fill out all fields');
            return;
        }
        setError('');
        onLogin(username, password);
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Username"
                id="username"
                type="text"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
                label="Password"
                variant="outlined"
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" variant="contained" color="primary">
                Login
            </Button>
            {error && <p>{error}</p>}
        </form>
    );
};

export default Login;
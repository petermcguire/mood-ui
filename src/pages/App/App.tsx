import { createTheme, ThemeProvider } from '@mui/material';
import Login from '../../components/Login/Login.tsx';

const theme = createTheme();

type LoginPayload = {
    username: string;
    password: string;
};

const App = () => {
    const handleLogin = async (username: string, password: string) => {
        const payload: LoginPayload = { username, password };

        try {
            const response = await fetch(import.meta.env.VITE_MOOD_API_URL + '/auth/login', {
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
            <Login onLogin={handleLogin}></Login>
        </ThemeProvider>
    );
};

export default App;
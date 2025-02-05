import { createTheme, ThemeProvider } from '@mui/material';
import Login from '../../components/Login/Login.tsx';
import { LoginResponse } from "../../services/api/apiService.ts";

const theme = createTheme();

const App = (
    { loginService }: { loginService: (username: string, password: string) => Promise<LoginResponse> }
) => {
    const handleLogin = async (username: string, password: string) => {
        try {
            const data = await loginService(username, password); // Call the injected service
            console.log('Login successful:', data);
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
import { createTheme, ThemeProvider } from '@mui/material';
import Login from '../../components/Login/Login.tsx';

const theme = createTheme();

const App = (
    { handleLogin }: { handleLogin: (username: string, password: string) => Promise<void> }
) => {

    return (
        <ThemeProvider theme={theme}>
            <Login onLogin={handleLogin}></Login>
        </ThemeProvider>
    );
};

export default App;
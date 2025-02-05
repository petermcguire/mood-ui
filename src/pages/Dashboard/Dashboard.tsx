import { createTheme, ThemeProvider } from '@mui/material';
import LogMood from "../../components/LogMood/LogMood.tsx";

const theme = createTheme();

const Dashboard = () => {
    return (
        <ThemeProvider theme={theme}>
            <LogMood />
        </ThemeProvider>
    );
};

export default Dashboard;
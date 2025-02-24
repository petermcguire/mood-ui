import { createTheme, ThemeProvider } from '@mui/material';
import LogMood from "../../components/LogMood/LogMood.tsx";
import MoodChart from "../../components/MoodChart/MoodChart.tsx";
import {Mood} from "../../services/api/apiService.ts";

const theme = createTheme();

type DashboardProps = {
    data: Mood[];
};


const Dashboard = ({ data }: DashboardProps) => {
    return (
        <ThemeProvider theme={theme}>
            <LogMood />
            <MoodChart data={data} />
        </ThemeProvider>
    );
};

export default Dashboard;
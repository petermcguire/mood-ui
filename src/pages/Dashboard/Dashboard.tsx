import { createTheme, ThemeProvider } from '@mui/material';
import LogMood from "../../components/LogMood/LogMood.tsx";
import MoodChart from "../../components/MoodChart/MoodChart.tsx";
import {AddMoodResponse, Mood} from "../../services/api/apiService.ts";
import {UseNavigateResult} from "@tanstack/react-router";

const theme = createTheme();

type DashboardProps = {
    username: string;
    data: Mood[],
    handleMoodSubmit: (mood: Mood) => Promise<AddMoodResponse>,
    navigate: UseNavigateResult<never>,
};


const Dashboard = ({ username, data, handleMoodSubmit, navigate }: DashboardProps) => {
    return (
        <ThemeProvider theme={theme}>
            <LogMood username={username} onMoodSubmit={handleMoodSubmit} navigate={navigate} />
            <MoodChart data={data} />
        </ThemeProvider>
    );
};

export default Dashboard;
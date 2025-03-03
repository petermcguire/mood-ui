import { createTheme, ThemeProvider } from '@mui/material';
import LogMood from "../../components/LogMood/LogMood.tsx";
import MoodChart from "../../components/MoodChart/MoodChart.tsx";
import {AddMoodResponse, Mood} from "../../services/api/apiService.ts";

const theme = createTheme();

type DashboardProps = {
    username: string;
    data: Mood[],
    handleMoodSubmit: (mood: Mood) => Promise<AddMoodResponse>;
};


const Dashboard = ({ username, data, handleMoodSubmit }: DashboardProps) => {
    return (
        <ThemeProvider theme={theme}>
            <LogMood username={username} onMoodSubmit={handleMoodSubmit} />
            <MoodChart data={data} />
        </ThemeProvider>
    );
};

export default Dashboard;
import { createTheme, ThemeProvider } from '@mui/material';
import LogMood from "../../components/LogMood/LogMood.tsx";
import MoodChart from "../../components/MoodChart/MoodChart.tsx";
import {getRouteApi} from "@tanstack/react-router";

const theme = createTheme();



const Dashboard = () => {
    const routeApi = getRouteApi('/_authenticated/dashboard');
    const data = routeApi.useLoaderData();
    console.log(data);
    return (
        <ThemeProvider theme={theme}>
            <LogMood />
            <MoodChart />
        </ThemeProvider>
    );
};

export default Dashboard;
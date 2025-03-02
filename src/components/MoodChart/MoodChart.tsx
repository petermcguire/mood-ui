import { LineChart } from "@mui/x-charts";
import {Mood} from "../../services/api/apiService.ts";

type MoodChartProps = {
    data: Mood[];
};


const MoodChart = ({ data }: MoodChartProps) => {
    return (
        <LineChart
            dataset={data.map(({ timestamp, level }) => ({ timestamp, level }))}
            xAxis={[
                {
                    scaleType: 'utc',
                    dataKey: 'timestamp',
                }
            ]}
            series={[
                {
                   dataKey: 'level',
                },
            ]}
            width={500}
            height={300}
        />
    );
};

export default MoodChart;

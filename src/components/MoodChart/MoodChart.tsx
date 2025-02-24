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
                    // data: [1,2,3,4],
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

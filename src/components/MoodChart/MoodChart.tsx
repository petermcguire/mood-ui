import { LineChart } from "@mui/x-charts";
import {Mood} from "../../services/api/apiService.ts";

type MoodChartProps = {
    data: Mood[];
};


const MoodChart = ({ data }: MoodChartProps) => {
    return (
        <LineChart
            dataset={
                // to overcome type mismatch
                data.map(
                    ({ timestamp, level }) => ({ timestamp, level })
                )
            }
            yAxis={[
                {
                    min: 0,
                    max: 5,
                }
            ]}
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

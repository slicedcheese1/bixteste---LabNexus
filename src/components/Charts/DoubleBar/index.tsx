import { Typography } from "@mui/material";
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface Props {
  data: { [key: string]: any }[];
  title: string;
  xAxisDataKey: string;
  dataKey: string;
  barDataKeys: string[];
  colors: string[];
}

export const DoubleBarChartComponent: React.FC<Props> = ({ data, xAxisDataKey, title, barDataKeys, colors }: Props) => {
  return (
    <div style={{ textAlign: "center", width: "100%" }}>
      <Typography variant="h6" align="center" gutterBottom>
        {title}
      </Typography>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey={xAxisDataKey} />
          <YAxis />
          <Tooltip />
          <Legend />
          {barDataKeys.map((barDataKey, index) => (
            <Bar key={barDataKey} dataKey={barDataKey} fill={colors[index]} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

import { Typography } from "@mui/material";
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface Props {
  data: { name: string; value: number }[];
  title: string;
  dataKey: string;
  xAxisDataKey: string;
}

export const SimpleBarChartComponent: React.FC<Props> = ({ data, title, dataKey, xAxisDataKey }) => {
  return (
    <div style={{ textAlign: "center", height: "100%" }}>
      <Typography variant="h6" align="center" gutterBottom>
        {title}
      </Typography>
      <ResponsiveContainer width="100%" height={340}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xAxisDataKey} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey={dataKey} fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

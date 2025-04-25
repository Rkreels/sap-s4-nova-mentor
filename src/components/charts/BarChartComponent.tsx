
import React from 'react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

interface BarChartComponentProps {
  data: Array<{ [key: string]: string | number }>;
  dataKey: string;
  xAxisKey: string;
  height?: number;
  color?: string;
}

const BarChartComponent: React.FC<BarChartComponentProps> = ({ 
  data, 
  dataKey, 
  xAxisKey,
  height = 300,
  color = "#0284c7"
}) => {
  return (
    <div style={{ height: height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey={xAxisKey} />
          <YAxis />
          <Tooltip />
          <Bar dataKey={dataKey} fill={color} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;

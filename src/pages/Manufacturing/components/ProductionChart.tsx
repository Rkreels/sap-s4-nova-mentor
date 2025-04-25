
import React from 'react';
import BarChartComponent from '../../../components/charts/BarChartComponent';
import { BarChartIcon } from 'lucide-react';

const productionData = [
  { month: 'Jan', output: 1200 },
  { month: 'Feb', output: 1400 },
  { month: 'Mar', output: 1100 },
  { month: 'Apr', output: 1600 },
  { month: 'May', output: 1300 },
  { month: 'Jun', output: 1500 },
];

const ProductionChart = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-medium mb-4">Production Output</h3>
      <BarChartComponent
        data={productionData}
        dataKey="output"
        xAxisKey="month"
        height={300}
      />
      <div className="text-xs text-gray-500 mt-2 flex justify-between">
        <span>Last updated: Today, 10:30 AM</span>
        <span className="flex items-center gap-1">
          <BarChartIcon className="h-3 w-3" />
          <span>Monthly view</span>
        </span>
      </div>
    </div>
  );
};

export default ProductionChart;

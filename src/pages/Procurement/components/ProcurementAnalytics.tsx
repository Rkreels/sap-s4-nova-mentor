
import React from 'react';
import BarChartComponent from '../../../components/charts/BarChartComponent';

const spendingData = [
  { category: 'Raw Materials', amount: 245000 },
  { category: 'Equipment', amount: 180000 },
  { category: 'IT Services', amount: 120000 },
  { category: 'Logistics', amount: 95000 },
  { category: 'Office Supplies', amount: 45000 },
  { category: 'Consulting', amount: 75000 },
];

const savingsData = [
  { month: 'Jan', savings: 12500 },
  { month: 'Feb', savings: 15800 },
  { month: 'Mar', savings: 19200 },
  { month: 'Apr', savings: 17500 },
  { month: 'May', savings: 21000 },
  { month: 'Jun', savings: 23400 },
];

const ProcurementAnalytics: React.FC = () => {
  return (
    <>
      <div className="col-span-full md:col-span-2">
        <div className="bg-white p-4 rounded-lg shadow">
          <BarChartComponent
            data={spendingData}
            dataKey="amount"
            xAxisKey="category"
            height={300}
            title="Spending by Category"
            subtitle="Current quarter, in EUR"
            showGrid={true}
            showLegend={true}
          />
        </div>
      </div>
      
      <div className="col-span-full md:col-span-1">
        <div className="bg-white p-4 rounded-lg shadow h-full">
          <h3 className="text-lg font-medium mb-4">Procurement Insights</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium">Top Spending Category</p>
              <p className="text-xl font-semibold">Raw Materials</p>
              <p className="text-xs text-gray-500">€245,000 (32% of total)</p>
            </div>
            
            <div>
              <p className="text-sm font-medium">Total Suppliers</p>
              <p className="text-xl font-semibold">157</p>
              <p className="text-xs text-green-600">↑ 5 new this quarter</p>
            </div>
            
            <div>
              <p className="text-sm font-medium">Savings Achieved</p>
              <p className="text-xl font-semibold">€109,400</p>
              <p className="text-xs text-green-600">↑ 12.5% vs last quarter</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="col-span-full">
        <div className="bg-white p-4 rounded-lg shadow">
          <BarChartComponent
            data={savingsData}
            dataKey="savings"
            xAxisKey="month"
            height={250}
            title="Monthly Procurement Savings"
            subtitle="Current year, in EUR"
            color="#22c55e"
          />
        </div>
      </div>
    </>
  );
};

export default ProcurementAnalytics;

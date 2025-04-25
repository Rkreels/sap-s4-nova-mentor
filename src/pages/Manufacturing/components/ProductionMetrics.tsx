
import React from 'react';
import MetricCard from '../../../components/metrics/MetricCard';

const ProductionMetrics = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        title="Production Efficiency"
        value="92.5%"
        trend={{ value: "3.2%", direction: "up", label: "vs last month" }}
      />
      <MetricCard
        title="Active Production Orders"
        value="847"
        trend={{ value: "12", direction: "up", label: "vs yesterday" }}
      />
      <MetricCard
        title="Material Utilization"
        value="88.7%"
        trend={{ value: "1.5%", direction: "down", label: "vs target" }}
      />
      <MetricCard
        title="Quality Rating"
        value="96.3%"
        trend={{ value: "0.8%", direction: "up", label: "vs last week" }}
      />
    </div>
  );
};

export default ProductionMetrics;

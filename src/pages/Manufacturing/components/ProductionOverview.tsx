
import React from 'react';
import ProductionMetrics from './ProductionMetrics';
import ProductionChart from './ProductionChart';

const ProductionOverview: React.FC = () => {
  return (
    <>
      <div className="col-span-full mb-6">
        <ProductionMetrics />
      </div>
      
      <div className="col-span-full">
        <ProductionChart />
      </div>
    </>
  );
};

export default ProductionOverview;

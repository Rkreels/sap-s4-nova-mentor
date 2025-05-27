
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import BusinessIntelligence from './BusinessIntelligence';

const BusinessIntelligenceRoutes: React.FC = () => {
  return (
    <Routes>
      <Route index element={<BusinessIntelligence />} />
    </Routes>
  );
};

export default BusinessIntelligenceRoutes;

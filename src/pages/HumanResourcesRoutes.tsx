
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HumanResources from './HumanResources';

const HumanResourcesRoutes: React.FC = () => {
  return (
    <Routes>
      <Route index element={<HumanResources />} />
    </Routes>
  );
};

export default HumanResourcesRoutes;


import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Procurement from './Procurement';
import SupplierDetail from './Procurement/SupplierDetail';

const ProcurementRoutes: React.FC = () => {
  return (
    <Routes>
      <Route index element={<Procurement />} />
      <Route path="supplier/:supplierId" element={<SupplierDetail />} />
    </Routes>
  );
};

export default ProcurementRoutes;

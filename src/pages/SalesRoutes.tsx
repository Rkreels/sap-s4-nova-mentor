
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sales from './Sales';
import CustomerDetail from './Sales/CustomerDetail';
import SalesOrderDetail from './Sales/SalesOrderDetail';

const SalesRoutes: React.FC = () => {
  return (
    <Routes>
      <Route index element={<Sales />} />
      <Route path="customer/:customerId" element={<CustomerDetail />} />
      <Route path="order/:orderId" element={<SalesOrderDetail />} />
    </Routes>
  );
};

export default SalesRoutes;

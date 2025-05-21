
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sales from './Sales';
import CustomerDetail from './Sales/CustomerDetail';
import SalesOrderDetail from './Sales/SalesOrderDetail';
import ProductCatalog from './Sales/ProductCatalog';
import ProductDetail from './Sales/ProductDetail';
import SalesAnalytics from './Sales/SalesAnalytics';
import QuotationManagement from './Sales/QuotationManagement';

const SalesRoutes: React.FC = () => {
  return (
    <Routes>
      <Route index element={<Sales />} />
      <Route path="customer/:customerId" element={<CustomerDetail />} />
      <Route path="order/:orderId" element={<SalesOrderDetail />} />
      <Route path="products" element={<ProductCatalog />} />
      <Route path="product/:productId" element={<ProductDetail />} />
      <Route path="analytics" element={<SalesAnalytics />} />
      <Route path="quotations" element={<QuotationManagement />} />
    </Routes>
  );
};

export default SalesRoutes;

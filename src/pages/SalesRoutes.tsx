
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sales from './Sales';
import CustomerDetail from './Sales/CustomerDetail';
import SalesOrderDetail from './Sales/SalesOrderDetail';
import ProductCatalog from './Sales/ProductCatalog';
import ProductDetail from './Sales/ProductDetail';
import SalesAnalytics from './Sales/SalesAnalytics';
import QuotationManagement from './Sales/QuotationManagement';
import PricingManagement from './Sales/PricingManagement';
import SalesContracts from './Sales/SalesContracts';
import CreditManagement from './Sales/CreditManagement';
import SalesReturns from './Sales/SalesReturns';
import BillingDocuments from './Sales/BillingDocuments';
import NotFound from '../pages/NotFound';

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
      <Route path="pricing" element={<PricingManagement />} />
      <Route path="contracts" element={<SalesContracts />} />
      <Route path="credit-management" element={<CreditManagement />} />
      <Route path="returns" element={<SalesReturns />} />
      <Route path="billing" element={<BillingDocuments />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default SalesRoutes;

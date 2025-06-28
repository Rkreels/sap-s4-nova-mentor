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
import CustomerManagement from './Sales/CustomerManagement';
import SalesOrders from './Sales/SalesOrders';
import Commission from './Sales/Commission';
import TerritoryManagement from './Sales/TerritoryManagement';
import NotFound from '../pages/NotFound';

const SalesRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Sales />} />
      <Route path="/sales-orders" element={<SalesOrders />} />
      <Route path="/quotations" element={<QuotationManagement />} />
      <Route path="/customer-management" element={<CustomerManagement />} />
      <Route path="/pricing-management" element={<PricingManagement />} />
      <Route path="/product-catalog" element={<ProductCatalog />} />
      <Route path="/credit-management" element={<CreditManagement />} />
      <Route path="/sales-analytics" element={<SalesAnalytics />} />
    </Routes>
  );
};

export default SalesRoutes;

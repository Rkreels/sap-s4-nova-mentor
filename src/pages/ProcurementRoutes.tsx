
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Procurement from './Procurement';
import PurchaseOrders from './Procurement/PurchaseOrders';
import PurchaseRequisitions from './Procurement/PurchaseRequisitions';
import SupplierManagement from './Procurement/SupplierManagement';
import ContractManagement from './Procurement/ContractManagement';
import SourceDetermination from './Procurement/SourceDetermination';
import GoodsReceipt from './Procurement/GoodsReceipt';
import InvoiceVerification from './Procurement/InvoiceVerification';
import BiddingAuctions from './Procurement/BiddingAuctions';

const ProcurementRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Procurement />} />
      <Route path="/purchase-orders" element={<PurchaseOrders />} />
      <Route path="/purchase-requisitions" element={<PurchaseRequisitions />} />
      <Route path="/supplier-management" element={<SupplierManagement />} />
      <Route path="/contract-management" element={<ContractManagement />} />
      <Route path="/source-determination" element={<SourceDetermination />} />
      <Route path="/goods-receipt" element={<GoodsReceipt />} />
      <Route path="/invoice-verification" element={<InvoiceVerification />} />
      <Route path="/bidding-auctions" element={<BiddingAuctions />} />
    </Routes>
  );
};

export default ProcurementRoutes;

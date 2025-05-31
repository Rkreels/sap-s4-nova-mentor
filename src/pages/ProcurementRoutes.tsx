
import { Routes, Route } from 'react-router-dom';
import Procurement from './Procurement';
import SupplierDetail from './Procurement/SupplierDetail';
import RFQManagement from './Procurement/RFQManagement';
import PurchaseOrders from './Procurement/PurchaseOrders';
import PurchaseRequisitions from './Procurement/PurchaseRequisitions';
import SupplierManagement from './Procurement/SupplierManagement';
import ContractManagement from './Procurement/ContractManagement';
import SourceDetermination from './Procurement/SourceDetermination';
import GoodsReceipt from './Procurement/GoodsReceipt';
import InvoiceVerification from './Procurement/InvoiceVerification';
import BiddingAuctions from './Procurement/BiddingAuctions';
import ProcurementAnalytics from './Procurement/ProcurementAnalytics';

const ProcurementRoutes = () => {
  return (
    <Routes>
      <Route index element={<Procurement />} />
      <Route path="suppliers/:id" element={<SupplierDetail />} />
      <Route path="rfq" element={<RFQManagement />} />
      <Route path="purchase-orders" element={<PurchaseOrders />} />
      <Route path="purchase-requisitions" element={<PurchaseRequisitions />} />
      <Route path="supplier-management" element={<SupplierManagement />} />
      <Route path="contract-management" element={<ContractManagement />} />
      <Route path="source-determination" element={<SourceDetermination />} />
      <Route path="goods-receipt" element={<GoodsReceipt />} />
      <Route path="invoice-verification" element={<InvoiceVerification />} />
      <Route path="bidding-auctions" element={<BiddingAuctions />} />
      <Route path="analytics" element={<ProcurementAnalytics />} />
    </Routes>
  );
};

export default ProcurementRoutes;


import { Routes, Route } from 'react-router-dom';
import SupplyChain from './SupplyChain';
import PurchaseOrders from './SupplyChain/PurchaseOrders';
import Requisitions from './SupplyChain/Requisitions';
import SupplierManagement from './SupplyChain/SupplierManagement';
import InboundDeliveries from './SupplyChain/InboundDeliveries';
import OutboundDeliveries from './SupplyChain/OutboundDeliveries';
import Transportation from './SupplyChain/Transportation';

const SupplyChainRoutes = () => {
  return (
    <Routes>
      <Route index element={<SupplyChain />} />
      <Route path="purchase-orders" element={<PurchaseOrders />} />
      <Route path="requisitions" element={<Requisitions />} />
      <Route path="supplier-management" element={<SupplierManagement />} />
      <Route path="inbound-deliveries" element={<InboundDeliveries />} />
      <Route path="outbound-deliveries" element={<OutboundDeliveries />} />
      <Route path="transportation" element={<Transportation />} />
      {/* Add additional supply chain routes here */}
    </Routes>
  );
};

export default SupplyChainRoutes;

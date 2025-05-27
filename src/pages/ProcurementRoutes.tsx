
import { Routes, Route } from 'react-router-dom';
import Procurement from './Procurement';
import SupplierDetail from './Procurement/SupplierDetail';
import RFQManagement from './Procurement/RFQManagement';

const ProcurementRoutes = () => {
  return (
    <Routes>
      <Route index element={<Procurement />} />
      <Route path="suppliers/:id" element={<SupplierDetail />} />
      <Route path="rfq" element={<RFQManagement />} />
    </Routes>
  );
};

export default ProcurementRoutes;

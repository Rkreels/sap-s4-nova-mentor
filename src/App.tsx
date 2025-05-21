
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SAPLayout from './components/SAPLayout';
import Dashboard from './pages/Dashboard';
import Finance from './pages/Finance';
import FinanceRoutes from './pages/FinanceRoutes';
import Manufacturing from './pages/Manufacturing';
import Sales from './pages/Sales';
import SupplyChain from './pages/SupplyChain';
import SupplyChainRoutes from './pages/SupplyChainRoutes';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SAPLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="finance/*" element={<FinanceRoutes />} />
          <Route path="manufacturing/*" element={<Manufacturing />} />
          <Route path="sales" element={<Sales />} />
          <Route path="supply-chain/*" element={<SupplyChainRoutes />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

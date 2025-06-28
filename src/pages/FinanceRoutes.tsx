
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Finance from './Finance';
import GeneralLedger from './Finance/GeneralLedger';
import AccountsPayable from './Finance/AccountsPayable';
import AccountsReceivable from './Finance/AccountsReceivable';
import FixedAssets from './Finance/FixedAssets';
import CostAccounting from './Finance/CostAccounting';
import BudgetPlanning from './Finance/BudgetPlanning';
import CashManagement from './Finance/CashManagement';
import TaxManagement from './Finance/TaxManagement';
import FinancialReporting from './Finance/FinancialReporting';
import Consolidation from './Finance/Consolidation';

const FinanceRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Finance />} />
      <Route path="/general-ledger" element={<GeneralLedger />} />
      <Route path="/accounts-payable" element={<AccountsPayable />} />
      <Route path="/accounts-receivable" element={<AccountsReceivable />} />
      <Route path="/fixed-assets" element={<FixedAssets />} />
      <Route path="/cost-accounting" element={<CostAccounting />} />
      <Route path="/budget-planning" element={<BudgetPlanning />} />
      <Route path="/cash-management" element={<CashManagement />} />
      <Route path="/tax-management" element={<TaxManagement />} />
      <Route path="/financial-reporting" element={<FinancialReporting />} />
      <Route path="/consolidation" element={<Consolidation />} />
    </Routes>
  );
};

export default FinanceRoutes;

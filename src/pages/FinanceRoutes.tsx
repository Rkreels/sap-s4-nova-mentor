
import { Routes, Route } from 'react-router-dom';
import Finance from './Finance';
import GeneralLedger from './Finance/GeneralLedger';
import AccountsPayable from './Finance/AccountsPayable';
import AccountsReceivable from './Finance/AccountsReceivable';
import CashManagement from './Finance/CashManagement';
import BankAccounts from './Finance/BankAccounts';
import FinancialReports from './Finance/FinancialReports';
import AssetAccounting from './Finance/AssetAccounting';
import CostCenterAccounting from './Finance/CostCenterAccounting';
import ProfitCenterAccounting from './Finance/ProfitCenterAccounting';
import FinancialPlanning from './Finance/FinancialPlanning';
import Treasury from './Finance/Treasury';
import FinanceCreditManagement from './Finance/FinanceCreditManagement';

const FinanceRoutes = () => {
  return (
    <Routes>
      <Route index element={<Finance />} />
      <Route path="general-ledger" element={<GeneralLedger />} />
      <Route path="accounts-payable" element={<AccountsPayable />} />
      <Route path="accounts-receivable" element={<AccountsReceivable />} />
      <Route path="cash-management" element={<CashManagement />} />
      <Route path="bank-accounts" element={<BankAccounts />} />
      <Route path="asset-accounting" element={<AssetAccounting />} />
      <Route path="cost-center" element={<CostCenterAccounting />} />
      <Route path="profit-center" element={<ProfitCenterAccounting />} />
      <Route path="planning" element={<FinancialPlanning />} />
      <Route path="treasury" element={<Treasury />} />
      <Route path="credit-management" element={<FinanceCreditManagement />} />
      <Route path="reports" element={<FinancialReports />} />
    </Routes>
  );
};

export default FinanceRoutes;


import { Routes, Route } from 'react-router-dom';
import Finance from './Finance';
import GeneralLedger from './Finance/GeneralLedger';
import AccountsPayable from './Finance/AccountsPayable';
import AccountsReceivable from './Finance/AccountsReceivable';
import CashManagement from './Finance/CashManagement';
import BankAccounts from './Finance/BankAccounts';
import FinancialReports from './Finance/FinancialReports';

const FinanceRoutes = () => {
  return (
    <Routes>
      <Route index element={<Finance />} />
      <Route path="general-ledger" element={<GeneralLedger />} />
      <Route path="accounts-payable" element={<AccountsPayable />} />
      <Route path="accounts-receivable" element={<AccountsReceivable />} />
      <Route path="cash-management" element={<CashManagement />} />
      <Route path="bank-accounts" element={<BankAccounts />} />
      <Route path="financial-reports" element={<FinancialReports />} />
      {/* Add additional finance routes here */}
    </Routes>
  );
};

export default FinanceRoutes;

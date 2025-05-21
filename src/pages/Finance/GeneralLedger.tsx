
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { useVoiceAssistantContext } from '../../context/VoiceAssistantContext';
import { useVoiceAssistant } from '../../hooks/useVoiceAssistant';
import PageHeader from '../../components/page/PageHeader';
import { ArrowLeft, Calendar, Filter, Download, Plus, FileText } from 'lucide-react';
import { Card } from '../../components/ui/card';
import { DataTable } from '../../components/data/DataTable';

const GeneralLedger: React.FC = () => {
  const navigate = useNavigate();
  const { isEnabled } = useVoiceAssistantContext();
  const { speak } = useVoiceAssistant();

  React.useEffect(() => {
    if (isEnabled) {
      speak('You are now in the General Ledger page. Here you can manage general ledger accounts, journal entries, and related activities.');
    }
  }, [isEnabled, speak]);

  // Sample data for the ledger entries
  const ledgerEntries = [
    { 
      document: '1000157243', 
      postingDate: '05/20/2025', 
      accountNumber: '100000', 
      accountName: 'Cash in Bank', 
      debit: '25,000.00',
      credit: '',
      amountInUSD: '25,000.00',
      businessArea: 'Finance',
      reference: 'Payment Receipt'
    },
    { 
      document: '1000157244', 
      postingDate: '05/20/2025', 
      accountNumber: '400000', 
      accountName: 'Sales Revenue', 
      debit: '',
      credit: '25,000.00',
      amountInUSD: '-25,000.00',
      businessArea: 'Sales',
      reference: 'Invoice Payment'
    },
    { 
      document: '1000157245', 
      postingDate: '05/19/2025', 
      accountNumber: '200000', 
      accountName: 'Accounts Payable', 
      debit: '12,750.00',
      credit: '',
      amountInUSD: '12,750.00',
      businessArea: 'Procurement',
      reference: 'Vendor Payment'
    },
    { 
      document: '1000157246', 
      postingDate: '05/19/2025', 
      accountNumber: '100000', 
      accountName: 'Cash in Bank', 
      debit: '',
      credit: '12,750.00',
      amountInUSD: '-12,750.00',
      businessArea: 'Finance',
      reference: 'Vendor Payment'
    },
  ];

  // Column definitions for the table
  const columns = [
    { key: 'document', header: 'Document' },
    { key: 'postingDate', header: 'Posting Date' },
    { key: 'accountNumber', header: 'Account' },
    { key: 'accountName', header: 'Account Name' },
    { key: 'debit', header: 'Debit' },
    { key: 'credit', header: 'Credit' },
    { key: 'amountInUSD', header: 'Amount in USD' },
    { key: 'businessArea', header: 'Business Area' },
    { key: 'reference', header: 'Reference' },
    { 
      key: 'actions', 
      header: 'Actions',
      render: (_, row: any) => (
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">View</Button>
          <Button variant="outline" size="sm">Edit</Button>
        </div>
      )
    }
  ];

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex items-center mb-4">
        <Button 
          variant="outline" 
          size="sm" 
          className="mr-4"
          onClick={() => navigate('/finance')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back
        </Button>
        <PageHeader
          title="General Ledger"
          description="Manage general ledger accounts, journal entries, and related activities"
          voiceIntroduction="Welcome to General Ledger. Here you can manage your general ledger accounts and journal entries."
        />
      </div>

      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">General Ledger Entries</h2>
          <p className="text-sm text-gray-500">May 2025</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            Change Period
          </Button>
          <Button variant="outline" size="sm" className="flex items-center">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm" className="flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="default" size="sm" className="flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            New Journal Entry
          </Button>
        </div>
      </div>

      <Card className="p-6">
        <DataTable columns={columns} data={ledgerEntries} className="w-full" />
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-6">Account Summary</h2>
          <div className="space-y-4">
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">Total Debits</span>
              <span className="font-semibold text-blue-600">$37,750.00</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">Total Credits</span>
              <span className="font-semibold text-blue-600">$37,750.00</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">Balance</span>
              <span className="font-semibold">$0.00</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">Number of Entries</span>
              <span>4</span>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-6">Document Types</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Invoices</span>
              <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-full" style={{ width: '65%' }}></div>
              </div>
            </div>
            
            <div className="flex justify-between">
              <span>Payments</span>
              <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="bg-green-500 h-full" style={{ width: '35%' }}></div>
              </div>
            </div>
            
            <div className="flex justify-between">
              <span>Internal Transfers</span>
              <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="bg-yellow-500 h-full" style={{ width: '15%' }}></div>
              </div>
            </div>
            
            <div className="flex justify-between">
              <span>Manual Journal Entries</span>
              <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="bg-purple-500 h-full" style={{ width: '25%' }}></div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default GeneralLedger;

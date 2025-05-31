
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { ArrowLeft, Plus, FileText, DollarSign, AlertCircle } from 'lucide-react';
import PageHeader from '../../components/page/PageHeader';
import { useVoiceAssistantContext } from '../../context/VoiceAssistantContext';
import { useVoiceAssistant } from '../../hooks/useVoiceAssistant';
import DataTable from '../../components/data/DataTable';

const InvoiceVerification: React.FC = () => {
  const navigate = useNavigate();
  const { isEnabled } = useVoiceAssistantContext();
  const { speak } = useVoiceAssistant();

  useEffect(() => {
    if (isEnabled) {
      speak('Welcome to Invoice Verification. Verify and process supplier invoices for payment.');
    }
  }, [isEnabled, speak]);

  const invoices = [
    {
      invoiceNumber: 'INV-2025-001',
      supplier: 'Tech Components Inc.',
      poNumber: 'PO-2025-001',
      invoiceDate: '2025-01-20',
      dueDate: '2025-02-19',
      invoiceAmount: 125000,
      currency: 'USD',
      status: 'Verified',
      variance: 0
    },
    {
      invoiceNumber: 'INV-2025-002',
      supplier: 'Office Supplies Ltd.',
      poNumber: 'PO-2025-002',
      invoiceDate: '2025-01-22',
      dueDate: '2025-02-21',
      invoiceAmount: 46200,
      currency: 'USD',
      status: 'Pending Verification',
      variance: 400
    }
  ];

  const columns = [
    { key: 'invoiceNumber', header: 'Invoice Number' },
    { key: 'supplier', header: 'Supplier' },
    { key: 'poNumber', header: 'PO Number' },
    { key: 'invoiceDate', header: 'Invoice Date' },
    { key: 'dueDate', header: 'Due Date' },
    { 
      key: 'invoiceAmount', 
      header: 'Amount',
      render: (value: number, row: any) => `${value.toLocaleString()} ${row.currency}`
    },
    { 
      key: 'variance', 
      header: 'Variance',
      render: (value: number, row: any) => (
        <span className={value > 0 ? 'text-red-600' : 'text-green-600'}>
          {value > 0 ? `+${value}` : value} {row.currency}
        </span>
      )
    },
    { 
      key: 'status', 
      header: 'Status',
      render: (value: string) => {
        const colors = {
          'Verified': 'bg-green-100 text-green-800',
          'Pending Verification': 'bg-yellow-100 text-yellow-800',
          'Rejected': 'bg-red-100 text-red-800',
          'Approved for Payment': 'bg-blue-100 text-blue-800'
        };
        return (
          <Badge className={colors[value as keyof typeof colors]}>
            {value}
          </Badge>
        );
      }
    }
  ];

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex items-center mb-4">
        <Button 
          variant="outline" 
          size="sm" 
          className="mr-4"
          onClick={() => navigate('/procurement')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back
        </Button>
        <PageHeader
          title="Invoice Verification"
          description="Verify and process supplier invoices for payment"
          voiceIntroduction="Welcome to Invoice Verification."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="text-sm text-gray-500">Pending Invoices</div>
          <div className="text-2xl font-bold">23</div>
          <div className="text-sm text-orange-600">Awaiting verification</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-gray-500">Verified Today</div>
          <div className="text-2xl font-bold">12</div>
          <div className="text-sm text-green-600">Processed</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-gray-500">Total Value</div>
          <div className="text-2xl font-bold">$847K</div>
          <div className="text-sm text-blue-600">This month</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-gray-500">Variance Rate</div>
          <div className="text-2xl font-bold">2.1%</div>
          <div className="text-sm text-purple-600">Accuracy</div>
        </Card>
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Invoice Verification</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Invoice
        </Button>
      </div>

      <Card className="p-6">
        <DataTable columns={columns} data={invoices} />
      </Card>
    </div>
  );
};

export default InvoiceVerification;

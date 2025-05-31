
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { ArrowLeft, Plus, Edit, Eye, FileText, Calendar, AlertTriangle } from 'lucide-react';
import PageHeader from '../../components/page/PageHeader';
import { useVoiceAssistantContext } from '../../context/VoiceAssistantContext';
import { useVoiceAssistant } from '../../hooks/useVoiceAssistant';
import DataTable from '../../components/data/DataTable';

const ContractManagement: React.FC = () => {
  const navigate = useNavigate();
  const { isEnabled } = useVoiceAssistantContext();
  const { speak } = useVoiceAssistant();

  useEffect(() => {
    if (isEnabled) {
      speak('Welcome to Contract Management. Manage supplier contracts, agreements, and terms.');
    }
  }, [isEnabled, speak]);

  const contracts = [
    {
      contractNumber: 'CTR-2025-001',
      supplier: 'Tech Components Inc.',
      type: 'Framework Agreement',
      startDate: '2025-01-01',
      endDate: '2025-12-31',
      value: 500000,
      currency: 'USD',
      status: 'Active',
      autoRenewal: true,
      daysToExpiry: 335
    },
    {
      contractNumber: 'CTR-2024-078',
      supplier: 'Office Supplies Ltd.',
      type: 'Service Agreement',
      startDate: '2024-06-01',
      endDate: '2025-05-31',
      value: 125000,
      currency: 'USD',
      status: 'Active',
      autoRenewal: false,
      daysToExpiry: 120
    },
    {
      contractNumber: 'CTR-2024-065',
      supplier: 'Industrial Parts Co.',
      type: 'Purchase Agreement',
      startDate: '2024-03-15',
      endDate: '2025-03-14',
      value: 750000,
      currency: 'USD',
      status: 'Expiring Soon',
      autoRenewal: true,
      daysToExpiry: 42
    }
  ];

  const columns = [
    { key: 'contractNumber', header: 'Contract Number' },
    { key: 'supplier', header: 'Supplier' },
    { key: 'type', header: 'Contract Type' },
    { key: 'startDate', header: 'Start Date' },
    { key: 'endDate', header: 'End Date' },
    { 
      key: 'value', 
      header: 'Contract Value',
      render: (value: number, row: any) => `${value.toLocaleString()} ${row.currency}`
    },
    { 
      key: 'status', 
      header: 'Status',
      render: (value: string) => {
        const colors = {
          'Active': 'bg-green-100 text-green-800',
          'Draft': 'bg-gray-100 text-gray-800',
          'Expiring Soon': 'bg-yellow-100 text-yellow-800',
          'Expired': 'bg-red-100 text-red-800',
          'Terminated': 'bg-red-100 text-red-800'
        };
        return (
          <Badge className={colors[value as keyof typeof colors]}>
            {value}
          </Badge>
        );
      }
    },
    { 
      key: 'daysToExpiry', 
      header: 'Days to Expiry',
      render: (value: number) => (
        <span className={value <= 60 ? 'text-red-600 font-medium' : 'text-gray-600'}>
          {value} days
        </span>
      )
    },
    { 
      key: 'actions', 
      header: 'Actions',
      render: (_, row: any) => (
        <div className="flex space-x-2">
          <Button variant="ghost" size="sm" title="View">
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" title="Edit">
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" title="Download">
            <FileText className="h-4 w-4" />
          </Button>
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
          onClick={() => navigate('/procurement')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back
        </Button>
        <PageHeader
          title="Contract Management"
          description="Manage supplier contracts, agreements, and terms"
          voiceIntroduction="Welcome to Contract Management."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="text-sm text-gray-500">Active Contracts</div>
          <div className="text-2xl font-bold">87</div>
          <div className="text-sm text-green-600">Currently in force</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-gray-500">Expiring Soon</div>
          <div className="text-2xl font-bold">12</div>
          <div className="text-sm text-orange-600">Next 90 days</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-gray-500">Total Value</div>
          <div className="text-2xl font-bold">$12.5M</div>
          <div className="text-sm text-purple-600">Portfolio value</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-gray-500">Compliance Rate</div>
          <div className="text-2xl font-bold">96%</div>
          <div className="text-sm text-blue-600">Performance</div>
        </Card>
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Contract Portfolio</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Contract
        </Button>
      </div>

      <Card className="p-6">
        <DataTable columns={columns} data={contracts} />
      </Card>
    </div>
  );
};

export default ContractManagement;

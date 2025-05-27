
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { useVoiceAssistantContext } from '../../context/VoiceAssistantContext';
import { useVoiceAssistant } from '../../hooks/useVoiceAssistant';
import PageHeader from '../../components/page/PageHeader';
import DataTable from '../../components/data/DataTable';
import { ArrowLeft, Plus, Edit, Eye, Send, FileText } from 'lucide-react';

const RFQManagement: React.FC = () => {
  const navigate = useNavigate();
  const { isEnabled } = useVoiceAssistantContext();
  const { speak } = useVoiceAssistant();
  const [rfqs, setRfqs] = useState([
    {
      rfqNumber: 'RFQ-2025-001',
      description: 'Electronic Components Package',
      category: 'Electronics',
      requestDate: '2025-01-20',
      dueDate: '2025-02-10',
      status: 'Sent to Vendors',
      vendorCount: 5,
      responseCount: 3,
      estimatedValue: 150000
    },
    {
      rfqNumber: 'RFQ-2025-002',
      description: 'Office Furniture Procurement',
      category: 'Office Supplies',
      requestDate: '2025-01-22',
      dueDate: '2025-02-15',
      status: 'Draft',
      vendorCount: 3,
      responseCount: 0,
      estimatedValue: 75000
    },
    {
      rfqNumber: 'RFQ-2025-003',
      description: 'Manufacturing Equipment',
      category: 'Machinery',
      requestDate: '2025-01-18',
      dueDate: '2025-02-05',
      status: 'Under Evaluation',
      vendorCount: 4,
      responseCount: 4,
      estimatedValue: 500000
    }
  ]);

  React.useEffect(() => {
    if (isEnabled) {
      speak('You are now in RFQ Management. Here you can create, manage, and evaluate Request for Quotations from suppliers.');
    }
  }, [isEnabled, speak]);

  const columns = [
    { key: 'rfqNumber', header: 'RFQ Number' },
    { key: 'description', header: 'Description' },
    { key: 'category', header: 'Category' },
    { key: 'requestDate', header: 'Request Date' },
    { key: 'dueDate', header: 'Due Date' },
    { 
      key: 'status', 
      header: 'Status',
      render: (value: string) => {
        const colors = {
          'Draft': 'bg-gray-100 text-gray-800',
          'Sent to Vendors': 'bg-blue-100 text-blue-800',
          'Under Evaluation': 'bg-yellow-100 text-yellow-800',
          'Awarded': 'bg-green-100 text-green-800',
          'Cancelled': 'bg-red-100 text-red-800'
        };
        return (
          <span className={`px-2 py-1 rounded-full text-xs ${colors[value as keyof typeof colors]}`}>
            {value}
          </span>
        );
      }
    },
    { 
      key: 'responseCount', 
      header: 'Responses',
      render: (value: number, row: any) => `${value}/${row.vendorCount}`
    },
    { 
      key: 'estimatedValue', 
      header: 'Estimated Value',
      render: (value: number) => `$${value.toLocaleString()}`
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
          <Button variant="ghost" size="sm" title="Send to Vendors">
            <Send className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" title="Generate Report">
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
          title="RFQ Management"
          description="Create, manage, and evaluate Request for Quotations from suppliers"
          voiceIntroduction="Welcome to RFQ Management."
        />
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Request for Quotations</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create RFQ
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="text-sm text-gray-500">Active RFQs</div>
          <div className="text-2xl font-bold">12</div>
          <div className="text-sm text-blue-600">In progress</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-gray-500">Awaiting Responses</div>
          <div className="text-2xl font-bold">8</div>
          <div className="text-sm text-yellow-600">Pending vendor input</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-gray-500">Avg Response Rate</div>
          <div className="text-2xl font-bold">78%</div>
          <div className="text-sm text-green-600">Last 6 months</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-gray-500">Cost Savings</div>
          <div className="text-2xl font-bold">$2.1M</div>
          <div className="text-sm text-purple-600">Year to date</div>
        </Card>
      </div>

      <Card className="p-6">
        <DataTable columns={columns} data={rfqs} />
      </Card>
    </div>
  );
};

export default RFQManagement;

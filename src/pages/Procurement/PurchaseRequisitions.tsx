
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { ArrowLeft, Plus, Edit, Eye, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import PageHeader from '../../components/page/PageHeader';
import { useVoiceAssistantContext } from '../../context/VoiceAssistantContext';
import { useVoiceAssistant } from '../../hooks/useVoiceAssistant';
import DataTable from '../../components/data/DataTable';

const PurchaseRequisitions: React.FC = () => {
  const navigate = useNavigate();
  const { isEnabled } = useVoiceAssistantContext();
  const { speak } = useVoiceAssistant();

  useEffect(() => {
    if (isEnabled) {
      speak('Welcome to Purchase Requisitions. Create and manage requisition requests for procurement approval.');
    }
  }, [isEnabled, speak]);

  const requisitions = [
    {
      prNumber: 'PR-2025-001',
      description: 'Office Supplies',
      requestor: 'John Smith',
      department: 'Finance',
      requestDate: '2025-01-20',
      totalValue: 1250,
      currency: 'USD',
      status: 'Pending Approval',
      priority: 'Medium',
      items: 12
    },
    {
      prNumber: 'PR-2025-002',
      description: 'IT Equipment',
      requestor: 'Maria Garcia',
      department: 'IT',
      requestDate: '2025-01-18',
      totalValue: 8750,
      currency: 'USD',
      status: 'Approved',
      priority: 'High',
      items: 5
    },
    {
      prNumber: 'PR-2025-003',
      description: 'Marketing Materials',
      requestor: 'Alex Johnson',
      department: 'Marketing',
      requestDate: '2025-01-15',
      totalValue: 3500,
      currency: 'USD',
      status: 'Rejected',
      priority: 'Low',
      items: 8
    }
  ];

  const columns = [
    { key: 'prNumber', header: 'PR Number' },
    { key: 'description', header: 'Description' },
    { key: 'requestor', header: 'Requestor' },
    { key: 'department', header: 'Department' },
    { key: 'requestDate', header: 'Request Date' },
    { 
      key: 'totalValue', 
      header: 'Total Value',
      render: (value: number, row: any) => `${value.toLocaleString()} ${row.currency}`
    },
    { 
      key: 'priority', 
      header: 'Priority',
      render: (value: string) => {
        const colors = {
          'High': 'bg-red-100 text-red-800',
          'Medium': 'bg-yellow-100 text-yellow-800',
          'Low': 'bg-green-100 text-green-800'
        };
        return (
          <Badge className={colors[value as keyof typeof colors]}>
            {value}
          </Badge>
        );
      }
    },
    { 
      key: 'status', 
      header: 'Status',
      render: (value: string) => {
        const colors = {
          'Pending Approval': 'bg-orange-100 text-orange-800',
          'Approved': 'bg-green-100 text-green-800',
          'Rejected': 'bg-red-100 text-red-800',
          'Converted to PO': 'bg-blue-100 text-blue-800'
        };
        return (
          <Badge className={colors[value as keyof typeof colors]}>
            {value}
          </Badge>
        );
      }
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
          title="Purchase Requisitions"
          description="Create and manage requisition requests for procurement approval"
          voiceIntroduction="Welcome to Purchase Requisitions Management."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="text-sm text-gray-500">Total PRs</div>
          <div className="text-2xl font-bold">156</div>
          <div className="text-sm text-blue-600">This month</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-gray-500">Pending Approval</div>
          <div className="text-2xl font-bold">23</div>
          <div className="text-sm text-orange-600">Awaiting review</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-gray-500">Approved</div>
          <div className="text-2xl font-bold">118</div>
          <div className="text-sm text-green-600">Ready for PO</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-gray-500">Avg Processing Time</div>
          <div className="text-2xl font-bold">2.3 days</div>
          <div className="text-sm text-purple-600">Performance</div>
        </Card>
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Purchase Requisitions</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Requisition
        </Button>
      </div>

      <Card className="p-6">
        <DataTable columns={columns} data={requisitions} />
      </Card>
    </div>
  );
};

export default PurchaseRequisitions;

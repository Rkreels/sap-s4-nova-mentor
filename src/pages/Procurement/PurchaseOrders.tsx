
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { ArrowLeft, Plus, Edit, Eye, FileText, Download, Calendar, Filter } from 'lucide-react';
import PageHeader from '../../components/page/PageHeader';
import { useVoiceAssistantContext } from '../../context/VoiceAssistantContext';
import { useVoiceAssistant } from '../../hooks/useVoiceAssistant';
import DataTable from '../../components/data/DataTable';

const PurchaseOrders: React.FC = () => {
  const navigate = useNavigate();
  const { isEnabled } = useVoiceAssistantContext();
  const { speak } = useVoiceAssistant();
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    if (isEnabled) {
      speak('Welcome to Purchase Orders. Here you can create, manage, and track purchase orders for goods and services.');
    }
  }, [isEnabled, speak]);

  const purchaseOrders = [
    {
      poNumber: 'PO-2025-001',
      supplier: 'Tech Components Inc.',
      orderDate: '2025-01-20',
      deliveryDate: '2025-02-15',
      totalValue: 125000,
      currency: 'USD',
      status: 'Open',
      approvalStatus: 'Approved',
      items: 12
    },
    {
      poNumber: 'PO-2025-002',
      supplier: 'Industrial Supplies Ltd.',
      orderDate: '2025-01-22',
      deliveryDate: '2025-02-10',
      totalValue: 45800,
      currency: 'USD',
      status: 'Partially Delivered',
      approvalStatus: 'Approved',
      items: 8
    },
    {
      poNumber: 'PO-2025-003',
      supplier: 'Office Solutions',
      orderDate: '2025-01-25',
      deliveryDate: '2025-02-05',
      totalValue: 15200,
      currency: 'USD',
      status: 'Pending Approval',
      approvalStatus: 'Pending',
      items: 5
    }
  ];

  const columns = [
    { key: 'poNumber', header: 'PO Number' },
    { key: 'supplier', header: 'Supplier' },
    { key: 'orderDate', header: 'Order Date' },
    { key: 'deliveryDate', header: 'Delivery Date' },
    { 
      key: 'totalValue', 
      header: 'Total Value',
      render: (value: number, row: any) => `${value.toLocaleString()} ${row.currency}`
    },
    { 
      key: 'status', 
      header: 'Status',
      render: (value: string) => {
        const colors = {
          'Open': 'bg-blue-100 text-blue-800',
          'Partially Delivered': 'bg-yellow-100 text-yellow-800',
          'Delivered': 'bg-green-100 text-green-800',
          'Pending Approval': 'bg-orange-100 text-orange-800',
          'Cancelled': 'bg-red-100 text-red-800'
        };
        return (
          <Badge className={colors[value as keyof typeof colors]}>
            {value}
          </Badge>
        );
      }
    },
    { key: 'items', header: 'Items' },
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
          <Button variant="ghost" size="sm" title="Print">
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
          title="Purchase Orders"
          description="Create, manage, and track purchase orders for goods and services"
          voiceIntroduction="Welcome to Purchase Orders Management."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="text-sm text-gray-500">Total POs</div>
          <div className="text-2xl font-bold">247</div>
          <div className="text-sm text-blue-600">This month</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-gray-500">Pending Approval</div>
          <div className="text-2xl font-bold">18</div>
          <div className="text-sm text-orange-600">Requires attention</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-gray-500">Total Value</div>
          <div className="text-2xl font-bold">$1.24M</div>
          <div className="text-sm text-green-600">Current month</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-gray-500">On-Time Delivery</div>
          <div className="text-2xl font-bold">92%</div>
          <div className="text-sm text-purple-600">Performance</div>
        </Card>
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Purchase Orders</h2>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Date Range
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create PO
          </Button>
        </div>
      </div>

      <Card className="p-6">
        <DataTable columns={columns} data={purchaseOrders} />
      </Card>
    </div>
  );
};

export default PurchaseOrders;

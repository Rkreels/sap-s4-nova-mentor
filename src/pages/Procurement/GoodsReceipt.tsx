
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { ArrowLeft, Plus, Package, CheckCircle, AlertCircle } from 'lucide-react';
import PageHeader from '../../components/page/PageHeader';
import { useVoiceAssistantContext } from '../../context/VoiceAssistantContext';
import { useVoiceAssistant } from '../../hooks/useVoiceAssistant';
import DataTable from '../../components/data/DataTable';

const GoodsReceipt: React.FC = () => {
  const navigate = useNavigate();
  const { isEnabled } = useVoiceAssistantContext();
  const { speak } = useVoiceAssistant();

  useEffect(() => {
    if (isEnabled) {
      speak('Welcome to Goods Receipt. Process and manage incoming deliveries from suppliers.');
    }
  }, [isEnabled, speak]);

  const receipts = [
    {
      grNumber: 'GR-2025-001',
      poNumber: 'PO-2025-001',
      supplier: 'Tech Components Inc.',
      deliveryDate: '2025-01-20',
      receivedDate: '2025-01-20',
      orderedQty: 100,
      receivedQty: 100,
      status: 'Complete',
      inspector: 'John Smith'
    },
    {
      grNumber: 'GR-2025-002',
      poNumber: 'PO-2025-002',
      supplier: 'Office Supplies Ltd.',
      deliveryDate: '2025-01-22',
      receivedDate: '2025-01-22',
      orderedQty: 50,
      receivedQty: 45,
      status: 'Partial',
      inspector: 'Maria Garcia'
    }
  ];

  const columns = [
    { key: 'grNumber', header: 'GR Number' },
    { key: 'poNumber', header: 'PO Number' },
    { key: 'supplier', header: 'Supplier' },
    { key: 'deliveryDate', header: 'Delivery Date' },
    { key: 'receivedDate', header: 'Received Date' },
    { key: 'orderedQty', header: 'Ordered Qty' },
    { key: 'receivedQty', header: 'Received Qty' },
    { 
      key: 'status', 
      header: 'Status',
      render: (value: string) => {
        const colors = {
          'Complete': 'bg-green-100 text-green-800',
          'Partial': 'bg-yellow-100 text-yellow-800',
          'Pending': 'bg-orange-100 text-orange-800',
          'Quality Issue': 'bg-red-100 text-red-800'
        };
        return (
          <Badge className={colors[value as keyof typeof colors]}>
            {value}
          </Badge>
        );
      }
    },
    { key: 'inspector', header: 'Inspector' }
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
          title="Goods Receipt"
          description="Process and manage incoming deliveries from suppliers"
          voiceIntroduction="Welcome to Goods Receipt Management."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="text-sm text-gray-500">Today's Receipts</div>
          <div className="text-2xl font-bold">15</div>
          <div className="text-sm text-blue-600">Deliveries processed</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-gray-500">Pending Receipts</div>
          <div className="text-2xl font-bold">8</div>
          <div className="text-sm text-orange-600">Awaiting processing</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-gray-500">Quality Issues</div>
          <div className="text-2xl font-bold">2</div>
          <div className="text-sm text-red-600">Require attention</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-gray-500">On-Time Delivery</div>
          <div className="text-2xl font-bold">94%</div>
          <div className="text-sm text-green-600">Performance</div>
        </Card>
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Goods Receipts</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Receipt
        </Button>
      </div>

      <Card className="p-6">
        <DataTable columns={columns} data={receipts} />
      </Card>
    </div>
  );
};

export default GoodsReceipt;

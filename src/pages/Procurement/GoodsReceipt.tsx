
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { ArrowLeft, Plus, Package, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import PageHeader from '../../components/page/PageHeader';
import { useVoiceAssistantContext } from '../../context/VoiceAssistantContext';
import { useVoiceAssistant } from '../../hooks/useVoiceAssistant';
import EnhancedDataTable, { EnhancedColumn, TableAction } from '../../components/data/EnhancedDataTable';
import { useToast } from '../../hooks/use-toast';

interface GoodsReceiptItem {
  id: string;
  receiptNumber: string;
  poNumber: string;
  supplier: string;
  receiptDate: string;
  status: 'Pending' | 'Partial' | 'Complete' | 'Discrepancy';
  totalItems: number;
  receivedItems: number;
  inspector: string;
  location: string;
}

const GoodsReceipt: React.FC = () => {
  const navigate = useNavigate();
  const { isEnabled } = useVoiceAssistantContext();
  const { speak } = useVoiceAssistant();
  const [activeTab, setActiveTab] = useState('receipts');
  const [receipts, setReceipts] = useState<GoodsReceiptItem[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    if (isEnabled) {
      speak('Welcome to Goods Receipt. Record and verify the receipt of goods from purchase orders.');
    }
  }, [isEnabled, speak]);

  useEffect(() => {
    const sampleReceipts: GoodsReceiptItem[] = [
      {
        id: 'gr-001',
        receiptNumber: 'GR-2025-001',
        poNumber: 'PO-2025-001',
        supplier: 'Dell Technologies',
        receiptDate: '2025-01-26',
        status: 'Complete',
        totalItems: 5,
        receivedItems: 5,
        inspector: 'Mike Wilson',
        location: 'Warehouse A'
      },
      {
        id: 'gr-002',
        receiptNumber: 'GR-2025-002',
        poNumber: 'PO-2025-002',
        supplier: 'Office Depot Inc.',
        receiptDate: '2025-01-25',
        status: 'Partial',
        totalItems: 12,
        receivedItems: 8,
        inspector: 'Sarah Johnson',
        location: 'Warehouse B'
      }
    ];
    setReceipts(sampleReceipts);
  }, []);

  const getStatusColor = (status: string) => {
    const colors = {
      'Pending': 'bg-yellow-100 text-yellow-800',
      'Partial': 'bg-blue-100 text-blue-800',
      'Complete': 'bg-green-100 text-green-800',
      'Discrepancy': 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const columns: EnhancedColumn[] = [
    { key: 'receiptNumber', header: 'Receipt #', sortable: true, searchable: true },
    { key: 'poNumber', header: 'PO Number', sortable: true, searchable: true },
    { key: 'supplier', header: 'Supplier', sortable: true, searchable: true },
    { key: 'receiptDate', header: 'Receipt Date', sortable: true },
    { 
      key: 'status', 
      header: 'Status',
      filterable: true,
      filterOptions: [
        { label: 'Pending', value: 'Pending' },
        { label: 'Partial', value: 'Partial' },
        { label: 'Complete', value: 'Complete' },
        { label: 'Discrepancy', value: 'Discrepancy' }
      ],
      render: (value: string) => (
        <Badge className={getStatusColor(value)}>
          {value}
        </Badge>
      )
    },
    { 
      key: 'receivedItems', 
      header: 'Items Received',
      render: (value: number, row: GoodsReceiptItem) => `${value}/${row.totalItems}`
    },
    { key: 'inspector', header: 'Inspector', searchable: true },
    { key: 'location', header: 'Location', filterable: true, filterOptions: [
      { label: 'Warehouse A', value: 'Warehouse A' },
      { label: 'Warehouse B', value: 'Warehouse B' },
      { label: 'Warehouse C', value: 'Warehouse C' }
    ]}
  ];

  const actions: TableAction[] = [
    {
      label: 'Complete Receipt',
      icon: <CheckCircle className="h-4 w-4" />,
      onClick: (row: GoodsReceiptItem) => {
        toast({
          title: 'Complete Receipt',
          description: `Completing goods receipt ${row.receiptNumber}`,
        });
      },
      variant: 'default',
      condition: (row: GoodsReceiptItem) => row.status === 'Pending' || row.status === 'Partial'
    },
    {
      label: 'Report Issue',
      icon: <AlertCircle className="h-4 w-4" />,
      onClick: (row: GoodsReceiptItem) => {
        toast({
          title: 'Report Issue',
          description: `Reporting discrepancy for ${row.receiptNumber}`,
        });
      },
      variant: 'destructive'
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
          title="Goods Receipt"
          description="Record and verify receipt of goods from purchase orders"
          voiceIntroduction="Welcome to Goods Receipt for comprehensive delivery verification."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{receipts.length}</div>
            <div className="text-sm text-muted-foreground">Total Receipts</div>
            <div className="text-sm text-blue-600">This month</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">
              {receipts.filter(r => r.status === 'Pending').length}
            </div>
            <div className="text-sm text-muted-foreground">Pending</div>
            <div className="text-sm text-orange-600">Needs action</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">
              {receipts.filter(r => r.status === 'Complete').length}
            </div>
            <div className="text-sm text-muted-foreground">Completed</div>
            <div className="text-sm text-green-600">Successfully processed</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">97%</div>
            <div className="text-sm text-muted-foreground">Accuracy Rate</div>
            <div className="text-sm text-green-600">Above target</div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="receipts">Goods Receipts</TabsTrigger>
          <TabsTrigger value="pending">Pending Receipts</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="receipts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                Goods Receipt Register
                <Button onClick={() => toast({ title: 'Create Receipt', description: 'Opening goods receipt form' })}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Receipt
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <EnhancedDataTable 
                columns={columns}
                data={receipts}
                actions={actions}
                searchPlaceholder="Search receipts by number, PO, or supplier..."
                exportable={true}
                refreshable={true}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {receipts.filter(r => r.status === 'Pending' || r.status === 'Partial').map((receipt) => (
              <Card key={receipt.id}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center justify-between">
                    {receipt.receiptNumber}
                    <Badge className={getStatusColor(receipt.status)}>
                      {receipt.status}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>PO Number:</span>
                      <span className="font-medium">{receipt.poNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Supplier:</span>
                      <span className="font-medium">{receipt.supplier}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Items:</span>
                      <span className="font-medium">{receipt.receivedItems}/{receipt.totalItems}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Location:</span>
                      <span className="font-medium">{receipt.location}</span>
                    </div>
                    <div className="flex space-x-2 mt-4">
                      <Button size="sm">
                        <Package className="h-4 w-4 mr-2" />
                        Process Receipt
                      </Button>
                      <Button size="sm" variant="outline">
                        <Clock className="h-4 w-4 mr-2" />
                        Schedule Inspection
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Receipt Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded">
                    <h4 className="font-semibold mb-2">Monthly Statistics</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Total Receipts:</span>
                        <span className="font-medium">{receipts.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>On-Time Rate:</span>
                        <span className="font-medium">94%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Accuracy Rate:</span>
                        <span className="font-medium">97%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Status Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['Complete', 'Pending', 'Partial', 'Discrepancy'].map((status) => {
                    const count = receipts.filter(r => r.status === status).length;
                    const percentage = receipts.length > 0 ? Math.round((count / receipts.length) * 100) : 0;
                    return (
                      <div key={status} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>{status}</span>
                          <span>{count} ({percentage}%)</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GoodsReceipt;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { ArrowLeft, Plus, Edit, Eye, Package, Truck, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import PageHeader from '../../components/page/PageHeader';
import { useVoiceAssistantContext } from '../../context/VoiceAssistantContext';
import { useVoiceAssistant } from '../../hooks/useVoiceAssistant';
import EnhancedDataTable, { EnhancedColumn, TableAction } from '../../components/data/EnhancedDataTable';
import VoiceTrainingComponent from '../../components/procurement/VoiceTrainingComponent';
import WorkflowManager from '../../components/procurement/WorkflowManager';
import { useToast } from '../../hooks/use-toast';
import { LineChart, Line, BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts';

interface PurchaseOrder {
  id: string;
  poNumber: string;
  supplier: string;
  orderDate: string;
  deliveryDate: string;
  totalValue: number;
  currency: string;
  status: 'Draft' | 'Sent' | 'Acknowledged' | 'In Transit' | 'Delivered' | 'Invoiced' | 'Completed' | 'Cancelled';
  urgency: 'Low' | 'Medium' | 'High' | 'Critical';
  department: string;
  buyer: string;
  paymentTerms: string;
  deliveryAddress: string;
  items: number;
  prNumber?: string;
}

const PurchaseOrders: React.FC = () => {
  const navigate = useNavigate();
  const { isEnabled } = useVoiceAssistantContext();
  const { speak } = useVoiceAssistant();
  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState<PurchaseOrder[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    if (isEnabled) {
      speak('Welcome to Purchase Orders Management. Track and manage your purchase orders from creation to delivery completion.');
    }
  }, [isEnabled, speak]);

  useEffect(() => {
    const sampleOrders: PurchaseOrder[] = [
      {
        id: 'po-001',
        poNumber: 'PO-2025-001',
        supplier: 'Office Depot Inc.',
        orderDate: '2025-01-25',
        deliveryDate: '2025-02-10',
        totalValue: 1250,
        currency: 'USD',
        status: 'In Transit',
        urgency: 'Medium',
        department: 'Finance',
        buyer: 'Sarah Johnson',
        paymentTerms: 'Net 30',
        deliveryAddress: '123 Main St, Corporate HQ',
        items: 12,
        prNumber: 'PR-2025-001'
      },
      {
        id: 'po-002',
        poNumber: 'PO-2025-002',
        supplier: 'Dell Technologies',
        orderDate: '2025-01-23',
        deliveryDate: '2025-02-05',
        totalValue: 8750,
        currency: 'USD',
        status: 'Delivered',
        urgency: 'High',
        department: 'IT',
        buyer: 'Mike Wilson',
        paymentTerms: 'Net 15',
        deliveryAddress: '123 Main St, IT Department',
        items: 5,
        prNumber: 'PR-2025-002'
      },
      {
        id: 'po-003',
        poNumber: 'PO-2025-003',
        supplier: 'Safety First Corp',
        orderDate: '2025-01-24',
        deliveryDate: '2025-02-07',
        totalValue: 2800,
        currency: 'USD',
        status: 'Acknowledged',
        urgency: 'Critical',
        department: 'Manufacturing',
        buyer: 'Emma Davis',
        paymentTerms: 'Net 30',
        deliveryAddress: 'Manufacturing Plant, Building A',
        items: 15,
        prNumber: 'PR-2025-004'
      }
    ];
    setOrders(sampleOrders);
  }, []);

  const getStatusColor = (status: string) => {
    const colors = {
      'Draft': 'bg-gray-100 text-gray-800',
      'Sent': 'bg-blue-100 text-blue-800',
      'Acknowledged': 'bg-yellow-100 text-yellow-800',
      'In Transit': 'bg-purple-100 text-purple-800',
      'Delivered': 'bg-green-100 text-green-800',
      'Invoiced': 'bg-cyan-100 text-cyan-800',
      'Completed': 'bg-green-100 text-green-800',
      'Cancelled': 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const columns: EnhancedColumn[] = [
    { key: 'poNumber', header: 'PO Number', sortable: true, searchable: true },
    { key: 'supplier', header: 'Supplier', sortable: true, searchable: true },
    { key: 'orderDate', header: 'Order Date', sortable: true },
    { key: 'deliveryDate', header: 'Delivery Date', sortable: true },
    { 
      key: 'totalValue', 
      header: 'Total Value',
      sortable: true,
      render: (value: number, row: PurchaseOrder) => `$${value.toLocaleString()} ${row.currency}`
    },
    { 
      key: 'status', 
      header: 'Status',
      filterable: true,
      filterOptions: [
        { label: 'Draft', value: 'Draft' },
        { label: 'Sent', value: 'Sent' },
        { label: 'Acknowledged', value: 'Acknowledged' },
        { label: 'In Transit', value: 'In Transit' },
        { label: 'Delivered', value: 'Delivered' },
        { label: 'Completed', value: 'Completed' }
      ],
      render: (value: string) => (
        <Badge className={getStatusColor(value)}>
          {value}
        </Badge>
      )
    },
    { key: 'buyer', header: 'Buyer', sortable: true },
    { key: 'items', header: 'Items', sortable: true }
  ];

  const actions: TableAction[] = [
    {
      label: 'View',
      icon: <Eye className="h-4 w-4" />,
      onClick: (row: PurchaseOrder) => console.log('View PO:', row),
      variant: 'ghost'
    },
    {
      label: 'Edit',
      icon: <Edit className="h-4 w-4" />,
      onClick: (row: PurchaseOrder) => console.log('Edit PO:', row),
      variant: 'ghost',
      condition: (row: PurchaseOrder) => row.status === 'Draft'
    },
    {
      label: 'Track',
      icon: <Truck className="h-4 w-4" />,
      onClick: (row: PurchaseOrder) => console.log('Track PO:', row),
      variant: 'ghost',
      condition: (row: PurchaseOrder) => ['Sent', 'Acknowledged', 'In Transit'].includes(row.status)
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
          description="Create, track, and manage purchase orders for goods and services"
          voiceIntroduction="Welcome to Purchase Orders Management with comprehensive tracking capabilities."
        />
      </div>

      <VoiceTrainingComponent 
        module="Purchase Orders"
        topic="Purchase Order Management"
        examples={[
          "Create and manage purchase orders with supplier integration",
          "Track order status from creation to delivery completion",
          "Monitor delivery schedules and manage exceptions",
          "Analyze purchase order performance and supplier metrics"
        ]}
        detailLevel="advanced"
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{orders.length}</div>
            <div className="text-sm text-muted-foreground">Total Orders</div>
            <div className="text-sm text-green-600">+12% vs last month</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">
              {orders.filter(po => po.status === 'In Transit').length}
            </div>
            <div className="text-sm text-muted-foreground">In Transit</div>
            <div className="text-sm text-blue-600">On schedule</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">
              ${orders.reduce((sum, po) => sum + po.totalValue, 0).toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">Total Value</div>
            <div className="text-sm text-green-600">+18% vs last month</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">95%</div>
            <div className="text-sm text-muted-foreground">On-Time Delivery</div>
            <div className="text-sm text-green-600">Above target</div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="orders">Purchase Orders</TabsTrigger>
          <TabsTrigger value="tracking">Delivery Tracking</TabsTrigger>
          <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="workflow">Workflow</TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                Purchase Orders Portfolio
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create PO
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <EnhancedDataTable 
                columns={columns}
                data={orders}
                actions={actions}
                searchPlaceholder="Search orders by PO number, supplier, or buyer..."
                exportable={true}
                refreshable={true}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tracking" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {orders.filter(po => ['Sent', 'Acknowledged', 'In Transit'].includes(po.status)).map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{order.poNumber}</CardTitle>
                  <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Supplier:</span>
                      <span className="font-medium">{order.supplier}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Expected Delivery:</span>
                      <span className="font-medium">{order.deliveryDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Value:</span>
                      <span className="font-medium">${order.totalValue.toLocaleString()}</span>
                    </div>
                    <div className="flex space-x-2 mt-4">
                      <Button size="sm" variant="outline">
                        <Truck className="h-4 w-4 mr-2" />
                        Track Shipment
                      </Button>
                      <Button size="sm" variant="outline">
                        <Package className="h-4 w-4 mr-2" />
                        Update Status
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="suppliers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Supplier Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Array.from(new Set(orders.map(po => po.supplier))).map((supplier) => {
                  const supplierOrders = orders.filter(po => po.supplier === supplier);
                  const onTimeDeliveries = supplierOrders.filter(po => po.status === 'Delivered').length;
                  const totalValue = supplierOrders.reduce((sum, po) => sum + po.totalValue, 0);
                  
                  return (
                    <div key={supplier} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold">{supplier}</h4>
                        <Badge variant="outline">{supplierOrders.length} orders</Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Total Value:</span>
                          <div className="font-medium">${totalValue.toLocaleString()}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">On-Time Rate:</span>
                          <div className="font-medium">
                            {supplierOrders.length > 0 ? Math.round((onTimeDeliveries / supplierOrders.length) * 100) : 0}%
                          </div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Average Order:</span>
                          <div className="font-medium">
                            ${supplierOrders.length > 0 ? Math.round(totalValue / supplierOrders.length).toLocaleString() : 0}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Purchase Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={[
                    { month: 'Jan', orders: 28, value: 125000 },
                    { month: 'Feb', orders: 32, value: 145000 },
                    { month: 'Mar', orders: 25, value: 98000 },
                    { month: 'Apr', orders: 38, value: 167000 },
                    { month: 'May', orders: 42, value: 189000 },
                    { month: 'Jun', orders: 35, value: 156000 }
                  ]}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="orders" stroke="#8884d8" name="Orders" />
                    <Line type="monotone" dataKey="value" stroke="#82ca9d" name="Value ($)" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Order Status Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={[
                    { status: 'Draft', count: orders.filter(po => po.status === 'Draft').length },
                    { status: 'Sent', count: orders.filter(po => po.status === 'Sent').length },
                    { status: 'Transit', count: orders.filter(po => po.status === 'In Transit').length },
                    { status: 'Delivered', count: orders.filter(po => po.status === 'Delivered').length }
                  ]}>
                    <XAxis dataKey="status" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="workflow" className="space-y-4">
          <WorkflowManager 
            entityType="purchase-order"
            entityId="global"
            onWorkflowComplete={(instanceId) => {
              toast({
                title: 'Workflow Completed',
                description: `Purchase order workflow ${instanceId} completed successfully.`,
              });
            }}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PurchaseOrders;

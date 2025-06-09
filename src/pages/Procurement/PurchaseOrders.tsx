
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { ArrowLeft, Plus, Edit, Eye, Trash2, FileText, Package, TrendingUp } from 'lucide-react';
import PageHeader from '../../components/page/PageHeader';
import { useVoiceAssistantContext } from '../../context/VoiceAssistantContext';
import { useVoiceAssistant } from '../../hooks/useVoiceAssistant';
import EnhancedDataTable, { EnhancedColumn, TableAction } from '../../components/data/EnhancedDataTable';
import VoiceTrainingComponent from '../../components/procurement/VoiceTrainingComponent';
import { useToast } from '../../hooks/use-toast';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts';

interface PurchaseOrder {
  id: string;
  poNumber: string;
  supplier: string;
  requisitioner: string;
  orderDate: string;
  deliveryDate: string;
  status: 'Draft' | 'Approved' | 'Sent' | 'Received' | 'Cancelled';
  priority: 'Low' | 'Medium' | 'High';
  totalAmount: number;
  currency: string;
  items: number;
  department: string;
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
      speak('Welcome to Purchase Orders. Create, track, and manage purchase orders for goods and services with comprehensive approval workflows.');
    }
  }, [isEnabled, speak]);

  useEffect(() => {
    const sampleOrders: PurchaseOrder[] = [
      {
        id: 'po-001',
        poNumber: 'PO-2025-001',
        supplier: 'Dell Technologies',
        requisitioner: 'John Smith',
        orderDate: '2025-01-26',
        deliveryDate: '2025-02-02',
        status: 'Approved',
        priority: 'High',
        totalAmount: 15600,
        currency: 'USD',
        items: 12,
        department: 'IT'
      },
      {
        id: 'po-002',
        poNumber: 'PO-2025-002',
        supplier: 'Office Depot Inc.',
        requisitioner: 'Sarah Wilson',
        orderDate: '2025-01-25',
        deliveryDate: '2025-01-30',
        status: 'Sent',
        priority: 'Medium',
        totalAmount: 2400,
        currency: 'USD',
        items: 25,
        department: 'Administration'
      },
      {
        id: 'po-003',
        poNumber: 'PO-2025-003',
        supplier: 'Safety First Corp',
        requisitioner: 'Mike Brown',
        orderDate: '2025-01-24',
        deliveryDate: '2025-02-01',
        status: 'Draft',
        priority: 'High',
        totalAmount: 8900,
        currency: 'USD',
        items: 18,
        department: 'Operations'
      }
    ];
    setOrders(sampleOrders);
  }, []);

  const getStatusColor = (status: string) => {
    const colors = {
      'Draft': 'bg-gray-100 text-gray-800',
      'Approved': 'bg-blue-100 text-blue-800',
      'Sent': 'bg-yellow-100 text-yellow-800',
      'Received': 'bg-green-100 text-green-800',
      'Cancelled': 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      'Low': 'bg-green-100 text-green-800',
      'Medium': 'bg-yellow-100 text-yellow-800',
      'High': 'bg-red-100 text-red-800'
    };
    return colors[priority as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const columns: EnhancedColumn[] = [
    { key: 'poNumber', header: 'PO Number', sortable: true, searchable: true },
    { key: 'supplier', header: 'Supplier', sortable: true, searchable: true },
    { key: 'requisitioner', header: 'Requisitioner', searchable: true },
    { key: 'orderDate', header: 'Order Date', sortable: true },
    { key: 'deliveryDate', header: 'Delivery Date', sortable: true },
    { 
      key: 'status', 
      header: 'Status',
      filterable: true,
      filterOptions: [
        { label: 'Draft', value: 'Draft' },
        { label: 'Approved', value: 'Approved' },
        { label: 'Sent', value: 'Sent' },
        { label: 'Received', value: 'Received' },
        { label: 'Cancelled', value: 'Cancelled' }
      ],
      render: (value: string) => (
        <Badge className={getStatusColor(value)}>
          {value}
        </Badge>
      )
    },
    { 
      key: 'priority', 
      header: 'Priority',
      filterable: true,
      filterOptions: [
        { label: 'Low', value: 'Low' },
        { label: 'Medium', value: 'Medium' },
        { label: 'High', value: 'High' }
      ],
      render: (value: string) => (
        <Badge className={getPriorityColor(value)}>
          {value}
        </Badge>
      )
    },
    { 
      key: 'totalAmount', 
      header: 'Total Amount',
      sortable: true,
      render: (value: number, row: PurchaseOrder) => `${row.currency} ${value.toLocaleString()}`
    },
    { key: 'items', header: 'Items', sortable: true },
    { key: 'department', header: 'Department', filterable: true, filterOptions: [
      { label: 'IT', value: 'IT' },
      { label: 'Administration', value: 'Administration' },
      { label: 'Operations', value: 'Operations' }
    ]}
  ];

  const actions: TableAction[] = [
    {
      label: 'View',
      icon: <Eye className="h-4 w-4" />,
      onClick: (row: PurchaseOrder) => {
        toast({
          title: 'View Purchase Order',
          description: `Opening PO ${row.poNumber}`,
        });
      },
      variant: 'ghost'
    },
    {
      label: 'Edit',
      icon: <Edit className="h-4 w-4" />,
      onClick: (row: PurchaseOrder) => {
        toast({
          title: 'Edit Purchase Order',
          description: `Editing PO ${row.poNumber}`,
        });
      },
      variant: 'ghost',
      condition: (row: PurchaseOrder) => row.status === 'Draft'
    },
    {
      label: 'Approve',
      icon: <FileText className="h-4 w-4" />,
      onClick: (row: PurchaseOrder) => {
        setOrders(prev => prev.map(order => 
          order.id === row.id ? { ...order, status: 'Approved' as const } : order
        ));
        toast({
          title: 'Order Approved',
          description: `PO ${row.poNumber} has been approved`,
        });
      },
      variant: 'default',
      condition: (row: PurchaseOrder) => row.status === 'Draft'
    },
    {
      label: 'Delete',
      icon: <Trash2 className="h-4 w-4" />,
      onClick: (row: PurchaseOrder) => {
        setOrders(prev => prev.filter(order => order.id !== row.id));
        toast({
          title: 'Order Deleted',
          description: `PO ${row.poNumber} has been deleted`,
        });
      },
      variant: 'destructive',
      condition: (row: PurchaseOrder) => row.status === 'Draft'
    }
  ];

  const bulkActions: TableAction[] = [
    {
      label: 'Bulk Approve',
      icon: <FileText className="h-4 w-4 mr-2" />,
      onClick: (selectedRows: PurchaseOrder[]) => {
        const approvedCount = selectedRows.filter(row => row.status === 'Draft').length;
        setOrders(prev => prev.map(order => 
          selectedRows.some(selected => selected.id === order.id) && order.status === 'Draft'
            ? { ...order, status: 'Approved' as const }
            : order
        ));
        toast({
          title: 'Bulk Approval',
          description: `${approvedCount} orders have been approved`,
        });
      },
      variant: 'default'
    },
    {
      label: 'Bulk Delete',
      icon: <Trash2 className="h-4 w-4 mr-2" />,
      onClick: (selectedRows: PurchaseOrder[]) => {
        setOrders(prev => prev.filter(order => 
          !selectedRows.some(selected => selected.id === order.id)
        ));
        toast({
          title: 'Bulk Delete',
          description: `${selectedRows.length} orders have been deleted`,
        });
      },
      variant: 'destructive'
    }
  ];

  const handleCreateOrder = () => {
    const newOrder: PurchaseOrder = {
      id: `po-${Date.now()}`,
      poNumber: `PO-2025-${String(orders.length + 1).padStart(3, '0')}`,
      supplier: 'New Supplier',
      requisitioner: 'Current User',
      orderDate: new Date().toISOString().split('T')[0],
      deliveryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'Draft',
      priority: 'Medium',
      totalAmount: 0,
      currency: 'USD',
      items: 0,
      department: 'IT'
    };
    setOrders(prev => [newOrder, ...prev]);
    toast({
      title: 'Order Created',
      description: `New PO ${newOrder.poNumber} created successfully`,
    });
  };

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
          voiceIntroduction="Welcome to Purchase Orders with comprehensive order management capabilities."
        />
      </div>

      <VoiceTrainingComponent 
        module="Purchase Orders"
        topic="Purchase Order Management"
        examples={[
          "Create purchase orders with automated approval workflows",
          "Track order status from creation to delivery confirmation",
          "Manage supplier relationships and delivery schedules",
          "Monitor spending against budgets and compliance requirements"
        ]}
        detailLevel="advanced"
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{orders.length}</div>
            <div className="text-sm text-muted-foreground">Total Orders</div>
            <div className="text-sm text-blue-600">+{orders.filter(o => o.orderDate >= '2025-01-20').length} this week</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">
              {orders.filter(o => o.status === 'Draft').length}
            </div>
            <div className="text-sm text-muted-foreground">Pending Approval</div>
            <div className="text-sm text-orange-600">Needs action</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">
              ${orders.reduce((sum, o) => sum + o.totalAmount, 0).toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">Total Value</div>
            <div className="text-sm text-green-600">Monthly spend</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">
              {orders.filter(o => o.priority === 'High').length}
            </div>
            <div className="text-sm text-muted-foreground">High Priority</div>
            <div className="text-sm text-red-600">Urgent orders</div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="orders">All Orders</TabsTrigger>
          <TabsTrigger value="pending">Pending Approval</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                Purchase Order Management
                <Button onClick={handleCreateOrder}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Order
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <EnhancedDataTable 
                columns={columns}
                data={orders}
                actions={actions}
                bulkActions={bulkActions}
                searchPlaceholder="Search orders by PO number, supplier, or requisitioner..."
                exportable={true}
                refreshable={true}
                onRefresh={() => {
                  toast({
                    title: 'Refreshing Data',
                    description: 'Purchase order data has been refreshed',
                  });
                }}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {orders.filter(o => o.status === 'Draft').map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center justify-between">
                    {order.poNumber}
                    <div className="flex space-x-2">
                      <Badge className={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                      <Badge className={getPriorityColor(order.priority)}>
                        {order.priority}
                      </Badge>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Supplier:</span>
                      <span className="font-medium">{order.supplier}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Requisitioner:</span>
                      <span className="font-medium">{order.requisitioner}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Department:</span>
                      <span className="font-medium">{order.department}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Amount:</span>
                      <span className="font-medium">{order.currency} {order.totalAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex space-x-2 mt-4">
                      <Button size="sm" onClick={() => {
                        setOrders(prev => prev.map(o => 
                          o.id === order.id ? { ...o, status: 'Approved' as const } : o
                        ));
                        toast({ title: 'Order Approved', description: `PO ${order.poNumber} approved` });
                      }}>
                        <FileText className="h-4 w-4 mr-2" />
                        Approve
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
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
                <CardTitle>Order Status Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={[
                    { status: 'Draft', count: orders.filter(o => o.status === 'Draft').length },
                    { status: 'Approved', count: orders.filter(o => o.status === 'Approved').length },
                    { status: 'Sent', count: orders.filter(o => o.status === 'Sent').length },
                    { status: 'Received', count: orders.filter(o => o.status === 'Received').length }
                  ]}>
                    <XAxis dataKey="status" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Department Spending</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['IT', 'Administration', 'Operations'].map((dept) => {
                    const deptOrders = orders.filter(o => o.department === dept);
                    const total = deptOrders.reduce((sum, o) => sum + o.totalAmount, 0);
                    return (
                      <div key={dept} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>{dept}</span>
                          <span>${total.toLocaleString()}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${total > 0 ? (total / Math.max(...['IT', 'Administration', 'Operations'].map(d => 
                              orders.filter(o => o.department === d).reduce((sum, o) => sum + o.totalAmount, 0)
                            ))) * 100 : 0}%` }}
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

        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Order Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded cursor-pointer hover:bg-gray-50">
                  <Package className="h-8 w-8 mb-2 text-blue-600" />
                  <h4 className="font-semibold">IT Equipment</h4>
                  <p className="text-sm text-muted-foreground">Standard template for IT hardware purchases</p>
                  <Button size="sm" className="mt-2" onClick={() => toast({ title: 'Template Applied', description: 'IT Equipment template applied to new order' })}>
                    Use Template
                  </Button>
                </div>
                <div className="p-4 border rounded cursor-pointer hover:bg-gray-50">
                  <FileText className="h-8 w-8 mb-2 text-green-600" />
                  <h4 className="font-semibold">Office Supplies</h4>
                  <p className="text-sm text-muted-foreground">Template for regular office supply orders</p>
                  <Button size="sm" className="mt-2" onClick={() => toast({ title: 'Template Applied', description: 'Office Supplies template applied to new order' })}>
                    Use Template
                  </Button>
                </div>
                <div className="p-4 border rounded cursor-pointer hover:bg-gray-50">
                  <TrendingUp className="h-8 w-8 mb-2 text-purple-600" />
                  <h4 className="font-semibold">Services</h4>
                  <p className="text-sm text-muted-foreground">Template for service procurement orders</p>
                  <Button size="sm" className="mt-2" onClick={() => toast({ title: 'Template Applied', description: 'Services template applied to new order' })}>
                    Use Template
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PurchaseOrders;

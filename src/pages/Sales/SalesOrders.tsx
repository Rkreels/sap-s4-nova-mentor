
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Button } from '../../components/ui/button';
import { Search, Plus, Filter, Edit, Trash2, Eye, Download, Upload, FileText, Truck, Package } from 'lucide-react';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { useToast } from '../../hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Textarea } from '../../components/ui/textarea';
import DataTable from '../../components/data/DataTable';
import { LineChart, Line, BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts';

interface SalesOrder {
  id: string;
  customer: string;
  customerId: string;
  status: 'Draft' | 'Pending' | 'Confirmed' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  orderDate: string;
  deliveryDate: string;
  totalAmount: number;
  currency: string;
  salesRep: string;
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  items: OrderItem[];
  shippingAddress: string;
  paymentTerms: string;
  notes: string;
}

interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  deliveryStatus: string;
}

const SalesOrders: React.FC = () => {
  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState<SalesOrder[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<SalesOrder | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const sampleOrders: SalesOrder[] = [
      {
        id: 'SO-2025-001',
        customer: 'Acme Corporation',
        customerId: 'CUST-001',
        status: 'Processing',
        orderDate: '2025-05-20',
        deliveryDate: '2025-06-05',
        totalAmount: 24500,
        currency: 'USD',
        salesRep: 'Sarah Johnson',
        priority: 'High',
        items: [
          {
            id: '1',
            productId: 'PROD-001',
            productName: 'Industrial Machine A',
            quantity: 2,
            unitPrice: 10000,
            totalPrice: 20000,
            deliveryStatus: 'In Stock'
          },
          {
            id: '2',
            productId: 'PROD-002',
            productName: 'Maintenance Kit',
            quantity: 5,
            unitPrice: 900,
            totalPrice: 4500,
            deliveryStatus: 'In Stock'
          }
        ],
        shippingAddress: '123 Industrial Blvd, New York, NY 10001',
        paymentTerms: 'Net 30',
        notes: 'Priority delivery required'
      },
      {
        id: 'SO-2025-002',
        customer: 'TechSolutions Inc',
        customerId: 'CUST-002',
        status: 'Confirmed',
        orderDate: '2025-05-18',
        deliveryDate: '2025-06-02',
        totalAmount: 15750,
        currency: 'USD',
        salesRep: 'Mike Wilson',
        priority: 'Medium',
        items: [
          {
            id: '1',
            productId: 'PROD-003',
            productName: 'Software License',
            quantity: 10,
            unitPrice: 1500,
            totalPrice: 15000,
            deliveryStatus: 'Digital'
          },
          {
            id: '2',
            productId: 'PROD-004',
            productName: 'Support Package',
            quantity: 1,
            unitPrice: 750,
            totalPrice: 750,
            deliveryStatus: 'Service'
          }
        ],
        shippingAddress: '456 Tech Street, San Francisco, CA 94105',
        paymentTerms: 'Net 45',
        notes: 'Include installation guide'
      }
    ];

    setTimeout(() => {
      setOrders(sampleOrders);
      setIsLoading(false);
    }, 1000);
  }, []);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || order.status.toLowerCase() === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleCreateOrder = () => {
    setSelectedOrder(null);
    setIsEditing(false);
    setIsDialogOpen(true);
  };

  const handleEditOrder = (order: SalesOrder) => {
    setSelectedOrder(order);
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const handleDeleteOrder = (orderId: string) => {
    setOrders(prev => prev.filter(o => o.id !== orderId));
    toast({
      title: 'Order Deleted',
      description: 'Sales order has been successfully removed.',
    });
  };

  const handleUpdateStatus = (orderId: string, newStatus: SalesOrder['status']) => {
    setOrders(prev => prev.map(o => 
      o.id === orderId ? { ...o, status: newStatus } : o
    ));
    toast({
      title: 'Status Updated',
      description: `Order status changed to ${newStatus}`,
    });
  };

  const orderColumns = [
    { key: 'id', header: 'Order ID' },
    { key: 'customer', header: 'Customer' },
    { key: 'orderDate', header: 'Order Date' },
    { key: 'deliveryDate', header: 'Delivery Date' },
    { 
      key: 'totalAmount', 
      header: 'Total Amount',
      render: (value: number, row: SalesOrder) => `${row.currency} ${value.toLocaleString()}`
    },
    { 
      key: 'status', 
      header: 'Status',
      render: (value: string) => (
        <Badge variant={
          value === 'Delivered' ? 'default' : 
          value === 'Processing' || value === 'Shipped' ? 'secondary' : 
          value === 'Cancelled' ? 'destructive' : 'outline'
        }>
          {value}
        </Badge>
      )
    },
    { 
      key: 'priority', 
      header: 'Priority',
      render: (value: string) => (
        <Badge variant={
          value === 'Urgent' || value === 'High' ? 'destructive' : 
          value === 'Medium' ? 'secondary' : 'outline'
        }>
          {value}
        </Badge>
      )
    },
    { 
      key: 'actions', 
      header: 'Actions',
      render: (_, row: SalesOrder) => (
        <div className="flex space-x-2">
          <Button variant="ghost" size="sm" onClick={() => handleEditOrder(row)}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => handleDeleteOrder(row.id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
          <StatusMenu order={row} onStatusChange={handleUpdateStatus} />
        </div>
      )
    }
  ];

  const orderMetrics = [
    { name: 'Total Orders', value: orders.length, change: '+8%' },
    { name: 'Processing', value: orders.filter(o => o.status === 'Processing').length, change: '+12%' },
    { name: 'Total Value', value: `$${orders.reduce((sum, o) => sum + o.totalAmount, 0).toLocaleString()}`, change: '+15%' },
    { name: 'Avg Order Value', value: `$${Math.round(orders.reduce((sum, o) => sum + o.totalAmount, 0) / orders.length).toLocaleString()}`, change: '+7%' }
  ];

  const monthlyData = [
    { month: 'Jan', orders: 45, value: 125000 },
    { month: 'Feb', orders: 52, value: 142000 },
    { month: 'Mar', orders: 48, value: 138000 },
    { month: 'Apr', orders: 61, value: 165000 },
    { month: 'May', orders: 55, value: 158000 },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Sales Orders</h1>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button onClick={handleCreateOrder}>
            <Plus className="h-4 w-4 mr-2" />
            Create Order
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {orderMetrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className="text-sm text-muted-foreground">{metric.name}</div>
              <div className="text-sm text-green-600">{metric.change}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="fulfillment">Fulfillment</TabsTrigger>
          <TabsTrigger value="shipping">Shipping</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sales Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between mb-4">
                <div className="flex space-x-2">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search orders..." 
                      className="pl-8 w-80"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="processing">Processing</SelectItem>
                      <SelectItem value="shipped">Shipped</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {isLoading ? (
                <div className="h-64 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              ) : (
                <DataTable columns={orderColumns} data={filteredOrders} />
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Order Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="orders" stroke="#8884d8" name="Orders" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Monthly Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Revenue']} />
                    <Bar dataKey="value" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="fulfillment" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="h-5 w-5 mr-2" />
                  Ready to Ship
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {orders.filter(o => o.status === 'Confirmed').length}
                </div>
                <p className="text-sm text-muted-foreground">Orders awaiting shipment</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Truck className="h-5 w-5 mr-2" />
                  In Transit
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {orders.filter(o => o.status === 'Shipped').length}
                </div>
                <p className="text-sm text-muted-foreground">Orders being delivered</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Pending Items
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {orders.filter(o => o.status === 'Processing').length}
                </div>
                <p className="text-sm text-muted-foreground">Orders being processed</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="shipping" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Shipping Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orders.filter(o => o.status === 'Confirmed' || o.status === 'Shipped').map(order => (
                  <div key={order.id} className="flex justify-between items-center p-4 border rounded-lg">
                    <div>
                      <div className="font-medium">{order.id}</div>
                      <div className="text-sm text-muted-foreground">{order.customer}</div>
                      <div className="text-sm">Delivery: {order.deliveryDate}</div>
                    </div>
                    <div className="flex space-x-2">
                      <Badge variant={order.status === 'Shipped' ? 'default' : 'secondary'}>
                        {order.status}
                      </Badge>
                      <Button size="sm" variant="outline">
                        Track
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Order Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="h-20 flex flex-col">
                  <span>Sales Performance</span>
                  <span className="text-xs text-muted-foreground">Monthly analysis</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col">
                  <span>Order Fulfillment</span>
                  <span className="text-xs text-muted-foreground">Delivery metrics</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col">
                  <span>Customer Orders</span>
                  <span className="text-xs text-muted-foreground">By customer analysis</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col">
                  <span>Product Performance</span>
                  <span className="text-xs text-muted-foreground">Best selling items</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Edit Sales Order' : 'Create New Sales Order'}</DialogTitle>
          </DialogHeader>
          <OrderForm 
            order={selectedOrder}
            onSave={(orderData) => {
              if (isEditing && selectedOrder) {
                setOrders(prev => prev.map(o => 
                  o.id === selectedOrder.id ? { ...o, ...orderData } : o
                ));
                toast({ title: 'Order Updated', description: 'Sales order has been successfully updated.' });
              } else {
                const newOrder: SalesOrder = {
                  id: `SO-2025-${String(orders.length + 1).padStart(3, '0')}`,
                  orderDate: new Date().toISOString().split('T')[0],
                  items: [],
                  ...orderData as SalesOrder
                };
                setOrders(prev => [...prev, newOrder]);
                toast({ title: 'Order Created', description: 'New sales order has been successfully created.' });
              }
              setIsDialogOpen(false);
            }}
            onCancel={() => setIsDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

const StatusMenu: React.FC<{
  order: SalesOrder;
  onStatusChange: (orderId: string, status: SalesOrder['status']) => void;
}> = ({ order, onStatusChange }) => {
  const statuses: SalesOrder['status'][] = ['Draft', 'Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
  
  return (
    <Select value={order.status} onValueChange={(value) => onStatusChange(order.id, value as SalesOrder['status'])}>
      <SelectTrigger className="w-32 h-8">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {statuses.map(status => (
          <SelectItem key={status} value={status}>{status}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

const OrderForm: React.FC<{
  order: SalesOrder | null;
  onSave: (data: Partial<SalesOrder>) => void;
  onCancel: () => void;
}> = ({ order, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    customer: order?.customer || '',
    customerId: order?.customerId || '',
    status: order?.status || 'Draft',
    deliveryDate: order?.deliveryDate || '',
    totalAmount: order?.totalAmount || 0,
    currency: order?.currency || 'USD',
    salesRep: order?.salesRep || '',
    priority: order?.priority || 'Medium',
    shippingAddress: order?.shippingAddress || '',
    paymentTerms: order?.paymentTerms || 'Net 30',
    notes: order?.notes || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="customer">Customer</Label>
          <Input
            id="customer"
            value={formData.customer}
            onChange={(e) => setFormData(prev => ({ ...prev, customer: e.target.value }))}
            required
          />
        </div>
        <div>
          <Label htmlFor="deliveryDate">Delivery Date</Label>
          <Input
            id="deliveryDate"
            type="date"
            value={formData.deliveryDate}
            onChange={(e) => setFormData(prev => ({ ...prev, deliveryDate: e.target.value }))}
            required
          />
        </div>
        <div>
          <Label htmlFor="totalAmount">Total Amount</Label>
          <Input
            id="totalAmount"
            type="number"
            value={formData.totalAmount}
            onChange={(e) => setFormData(prev => ({ ...prev, totalAmount: Number(e.target.value) }))}
            required
          />
        </div>
        <div>
          <Label htmlFor="currency">Currency</Label>
          <Select value={formData.currency} onValueChange={(value) => setFormData(prev => ({ ...prev, currency: value }))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="USD">USD</SelectItem>
              <SelectItem value="EUR">EUR</SelectItem>
              <SelectItem value="GBP">GBP</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="priority">Priority</Label>
          <Select value={formData.priority} onValueChange={(value) => setFormData(prev => ({ ...prev, priority: value as any }))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Low">Low</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="High">High</SelectItem>
              <SelectItem value="Urgent">Urgent</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="salesRep">Sales Representative</Label>
          <Input
            id="salesRep"
            value={formData.salesRep}
            onChange={(e) => setFormData(prev => ({ ...prev, salesRep: e.target.value }))}
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor="shippingAddress">Shipping Address</Label>
        <Textarea
          id="shippingAddress"
          value={formData.shippingAddress}
          onChange={(e) => setFormData(prev => ({ ...prev, shippingAddress: e.target.value }))}
        />
      </div>

      <div>
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          value={formData.notes}
          onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
        />
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          Save Order
        </Button>
      </div>
    </form>
  );
};

export default SalesOrders;

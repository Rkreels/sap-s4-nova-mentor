
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { ArrowLeft, Plus, Edit, Eye, FileText, Download, Calendar, Filter, Package, Truck, DollarSign, Clock } from 'lucide-react';
import PageHeader from '../../components/page/PageHeader';
import { useVoiceAssistantContext } from '../../context/VoiceAssistantContext';
import { useVoiceAssistant } from '../../hooks/useVoiceAssistant';
import DataTable from '../../components/data/DataTable';
import { Input } from '../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import { Label } from '../../components/ui/label';
import { useToast } from '../../hooks/use-toast';
import { LineChart, Line, BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts';

interface PurchaseOrder {
  id: string;
  poNumber: string;
  supplier: string;
  orderDate: string;
  deliveryDate: string;
  requestedDate: string;
  totalValue: number;
  currency: string;
  status: 'Draft' | 'Sent' | 'Confirmed' | 'Partially Delivered' | 'Delivered' | 'Invoiced' | 'Paid' | 'Cancelled';
  approvalStatus: 'Pending' | 'Approved' | 'Rejected';
  items: number;
  requestor: string;
  department: string;
  paymentTerms: string;
  deliveryTerms: string;
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  category: string;
}

interface POItem {
  id: string;
  poId: string;
  description: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  deliveryDate: string;
  status: 'Ordered' | 'Confirmed' | 'Shipped' | 'Delivered' | 'Returned';
}

const PurchaseOrders: React.FC = () => {
  const navigate = useNavigate();
  const { isEnabled } = useVoiceAssistantContext();
  const { speak } = useVoiceAssistant();
  const [activeTab, setActiveTab] = useState('orders');
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>([]);
  const [poItems, setPOItems] = useState<POItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPO, setSelectedPO] = useState<PurchaseOrder | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isEnabled) {
      speak('Welcome to Purchase Orders. Create, manage, and track purchase orders for goods and services.');
    }
  }, [isEnabled, speak]);

  // Sample data
  useEffect(() => {
    const samplePOs: PurchaseOrder[] = [
      {
        id: 'po-001',
        poNumber: 'PO-2025-001',
        supplier: 'Tech Components Inc.',
        orderDate: '2025-01-20',
        deliveryDate: '2025-02-15',
        requestedDate: '2025-02-10',
        totalValue: 125000,
        currency: 'USD',
        status: 'Confirmed',
        approvalStatus: 'Approved',
        items: 12,
        requestor: 'John Smith',
        department: 'IT',
        paymentTerms: 'Net 30',
        deliveryTerms: 'FOB Destination',
        priority: 'High',
        category: 'Electronics'
      },
      {
        id: 'po-002',
        poNumber: 'PO-2025-002',
        supplier: 'Industrial Supplies Ltd.',
        orderDate: '2025-01-22',
        deliveryDate: '2025-02-10',
        requestedDate: '2025-02-05',
        totalValue: 45800,
        currency: 'USD',
        status: 'Partially Delivered',
        approvalStatus: 'Approved',
        items: 8,
        requestor: 'Sarah Johnson',
        department: 'Manufacturing',
        paymentTerms: 'Net 45',
        deliveryTerms: 'FOB Origin',
        priority: 'Medium',
        category: 'Raw Materials'
      },
      {
        id: 'po-003',
        poNumber: 'PO-2025-003',
        supplier: 'Office Solutions',
        orderDate: '2025-01-25',
        deliveryDate: '2025-02-05',
        requestedDate: '2025-02-01',
        totalValue: 15200,
        currency: 'USD',
        status: 'Draft',
        approvalStatus: 'Pending',
        items: 5,
        requestor: 'Mike Wilson',
        department: 'Admin',
        paymentTerms: 'Net 30',
        deliveryTerms: 'FOB Destination',
        priority: 'Low',
        category: 'Office Supplies'
      }
    ];

    const sampleItems: POItem[] = [
      {
        id: 'item-001',
        poId: 'po-001',
        description: 'Server Memory 32GB DDR4',
        quantity: 50,
        unitPrice: 250,
        totalPrice: 12500,
        deliveryDate: '2025-02-15',
        status: 'Confirmed'
      },
      {
        id: 'item-002',
        poId: 'po-001',
        description: 'Network Switch 48-port',
        quantity: 5,
        unitPrice: 1200,
        totalPrice: 6000,
        deliveryDate: '2025-02-15',
        status: 'Confirmed'
      },
      {
        id: 'item-003',
        poId: 'po-002',
        description: 'Steel Pipes 6-inch',
        quantity: 100,
        unitPrice: 150,
        totalPrice: 15000,
        deliveryDate: '2025-02-10',
        status: 'Delivered'
      }
    ];

    setPurchaseOrders(samplePOs);
    setPOItems(sampleItems);
  }, []);

  const filteredPOs = purchaseOrders.filter(po => {
    const matchesSearch = po.poNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         po.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         po.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || po.status.toLowerCase().replace(' ', '') === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleCreatePO = () => {
    setSelectedPO(null);
    setIsEditing(false);
    setIsDialogOpen(true);
  };

  const handleEditPO = (po: PurchaseOrder) => {
    setSelectedPO(po);
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const handleDeletePO = (poId: string) => {
    setPurchaseOrders(prev => prev.filter(po => po.id !== poId));
    toast({
      title: 'Purchase Order Deleted',
      description: 'Purchase order has been successfully removed.',
    });
  };

  const handleSavePO = (poData: Partial<PurchaseOrder>) => {
    if (isEditing && selectedPO) {
      setPurchaseOrders(prev => prev.map(po => 
        po.id === selectedPO.id ? { ...po, ...poData } : po
      ));
      toast({
        title: 'Purchase Order Updated',
        description: 'Purchase order has been successfully updated.',
      });
    } else {
      const newPO: PurchaseOrder = {
        id: `po-${purchaseOrders.length + 1}`,
        poNumber: `PO-2025-${String(purchaseOrders.length + 1).padStart(3, '0')}`,
        orderDate: new Date().toISOString().split('T')[0],
        status: 'Draft',
        approvalStatus: 'Pending',
        currency: 'USD',
        items: 0,
        ...poData as PurchaseOrder
      };
      setPurchaseOrders(prev => [...prev, newPO]);
      toast({
        title: 'Purchase Order Created',
        description: 'New purchase order has been successfully created.',
      });
    }
    setIsDialogOpen(false);
  };

  const poColumns = [
    { key: 'poNumber', header: 'PO Number' },
    { key: 'supplier', header: 'Supplier' },
    { key: 'orderDate', header: 'Order Date' },
    { key: 'deliveryDate', header: 'Delivery Date' },
    { 
      key: 'totalValue', 
      header: 'Total Value',
      render: (value: number, row: PurchaseOrder) => `$${value.toLocaleString()} ${row.currency}`
    },
    { 
      key: 'priority', 
      header: 'Priority',
      render: (value: string) => {
        const colors = {
          'Low': 'bg-green-100 text-green-800',
          'Medium': 'bg-yellow-100 text-yellow-800',
          'High': 'bg-orange-100 text-orange-800',
          'Urgent': 'bg-red-100 text-red-800'
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
          'Draft': 'bg-gray-100 text-gray-800',
          'Sent': 'bg-blue-100 text-blue-800',
          'Confirmed': 'bg-green-100 text-green-800',
          'Partially Delivered': 'bg-yellow-100 text-yellow-800',
          'Delivered': 'bg-green-100 text-green-800',
          'Invoiced': 'bg-purple-100 text-purple-800',
          'Paid': 'bg-green-100 text-green-800',
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
      render: (_, row: PurchaseOrder) => (
        <div className="flex space-x-2">
          <Button variant="ghost" size="sm" title="View">
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => handleEditPO(row)} title="Edit">
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" title="Print">
            <FileText className="h-4 w-4" />
          </Button>
        </div>
      )
    }
  ];

  const itemColumns = [
    { key: 'description', header: 'Description' },
    { key: 'quantity', header: 'Quantity' },
    { 
      key: 'unitPrice', 
      header: 'Unit Price',
      render: (value: number) => `$${value.toLocaleString()}`
    },
    { 
      key: 'totalPrice', 
      header: 'Total Price',
      render: (value: number) => `$${value.toLocaleString()}`
    },
    { key: 'deliveryDate', header: 'Delivery Date' },
    { 
      key: 'status', 
      header: 'Status',
      render: (value: string) => {
        const colors = {
          'Ordered': 'bg-blue-100 text-blue-800',
          'Confirmed': 'bg-green-100 text-green-800',
          'Shipped': 'bg-yellow-100 text-yellow-800',
          'Delivered': 'bg-green-100 text-green-800',
          'Returned': 'bg-red-100 text-red-800'
        };
        return (
          <Badge className={colors[value as keyof typeof colors]}>
            {value}
          </Badge>
        );
      }
    }
  ];

  const poMetrics = [
    { name: 'Total POs', value: purchaseOrders.length, change: '+8%', icon: Package },
    { name: 'Total Value', value: `$${purchaseOrders.reduce((sum, po) => sum + po.totalValue, 0).toLocaleString()}`, change: '+12%', icon: DollarSign },
    { name: 'Pending Approval', value: purchaseOrders.filter(po => po.approvalStatus === 'Pending').length, change: '-5%', icon: Clock },
    { name: 'On-Time Delivery', value: '92%', change: '+3%', icon: Truck }
  ];

  const monthlyData = [
    { month: 'Jan', orders: 45, value: 850000 },
    { month: 'Feb', orders: 52, value: 920000 },
    { month: 'Mar', orders: 38, value: 780000 },
    { month: 'Apr', orders: 67, value: 1050000 },
    { month: 'May', orders: 73, value: 1200000 },
    { month: 'Jun', orders: 58, value: 980000 }
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
        {poMetrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <div className="text-sm text-muted-foreground">{metric.name}</div>
                  <div className="text-sm text-green-600">{metric.change}</div>
                </div>
                <metric.icon className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        ))}
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
          <Button onClick={handleCreatePO}>
            <Plus className="h-4 w-4 mr-2" />
            Create PO
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="items">Line Items</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="approvals">Approvals</TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Purchase Order Portfolio</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between mb-4">
                <div className="flex space-x-2">
                  <Input 
                    placeholder="Search purchase orders..." 
                    className="w-80"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="sent">Sent</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="partiallydelivered">Partially Delivered</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DataTable columns={poColumns} data={filteredPOs} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="items" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Purchase Order Line Items</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable columns={itemColumns} data={poItems} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly PO Trends</CardTitle>
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
                <CardTitle>Monthly Spend Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Value']} />
                    <Bar dataKey="value" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="text-sm text-muted-foreground">Avg PO Value</div>
                <div className="text-2xl font-bold">$48,750</div>
                <div className="text-sm text-green-600">+15% vs last month</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-sm text-muted-foreground">Avg Processing Time</div>
                <div className="text-2xl font-bold">3.2 days</div>
                <div className="text-sm text-green-600">-0.8 days vs last month</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-sm text-muted-foreground">Emergency Orders</div>
                <div className="text-2xl font-bold">7</div>
                <div className="text-sm text-orange-600">3% of total orders</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="approvals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Purchase Order Approvals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {purchaseOrders
                  .filter(po => po.approvalStatus === 'Pending')
                  .map((po, index) => (
                    <div key={po.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <div>
                          <span className="font-medium">{po.poNumber}</span>
                          <Badge className="ml-2 bg-yellow-100 text-yellow-800">
                            Pending Approval
                          </Badge>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">${po.totalValue.toLocaleString()}</div>
                          <div className="text-sm text-muted-foreground">{po.supplier}</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground mb-3">
                        <div>Requestor: {po.requestor}</div>
                        <div>Department: {po.department}</div>
                        <div>Priority: {po.priority}</div>
                        <div>Delivery: {po.deliveryDate}</div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          Approve
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                          Reject
                        </Button>
                        <Button size="sm" variant="outline">
                          Request Info
                        </Button>
                      </div>
                    </div>
                  ))}
                {purchaseOrders.filter(po => po.approvalStatus === 'Pending').length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No purchase orders pending approval
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Edit Purchase Order' : 'Create New Purchase Order'}</DialogTitle>
          </DialogHeader>
          <POForm 
            po={selectedPO}
            onSave={handleSavePO}
            onCancel={() => setIsDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

const POForm: React.FC<{
  po: PurchaseOrder | null;
  onSave: (data: Partial<PurchaseOrder>) => void;
  onCancel: () => void;
}> = ({ po, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    supplier: po?.supplier || '',
    deliveryDate: po?.deliveryDate || '',
    totalValue: po?.totalValue || 0,
    requestor: po?.requestor || '',
    department: po?.department || '',
    priority: po?.priority || 'Medium',
    category: po?.category || '',
    paymentTerms: po?.paymentTerms || 'Net 30',
    deliveryTerms: po?.deliveryTerms || 'FOB Destination'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="supplier">Supplier</Label>
          <Input
            id="supplier"
            value={formData.supplier}
            onChange={(e) => setFormData(prev => ({ ...prev, supplier: e.target.value }))}
            required
          />
        </div>
        <div>
          <Label htmlFor="category">Category</Label>
          <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Electronics">Electronics</SelectItem>
              <SelectItem value="Office Supplies">Office Supplies</SelectItem>
              <SelectItem value="Raw Materials">Raw Materials</SelectItem>
              <SelectItem value="Services">Services</SelectItem>
              <SelectItem value="Equipment">Equipment</SelectItem>
            </SelectContent>
          </Select>
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
          <Label htmlFor="totalValue">Total Value ($)</Label>
          <Input
            id="totalValue"
            type="number"
            value={formData.totalValue}
            onChange={(e) => setFormData(prev => ({ ...prev, totalValue: Number(e.target.value) }))}
            required
          />
        </div>
        <div>
          <Label htmlFor="requestor">Requestor</Label>
          <Input
            id="requestor"
            value={formData.requestor}
            onChange={(e) => setFormData(prev => ({ ...prev, requestor: e.target.value }))}
            required
          />
        </div>
        <div>
          <Label htmlFor="department">Department</Label>
          <Input
            id="department"
            value={formData.department}
            onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
            required
          />
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
          <Label htmlFor="paymentTerms">Payment Terms</Label>
          <Select value={formData.paymentTerms} onValueChange={(value) => setFormData(prev => ({ ...prev, paymentTerms: value }))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Net 15">Net 15</SelectItem>
              <SelectItem value="Net 30">Net 30</SelectItem>
              <SelectItem value="Net 45">Net 45</SelectItem>
              <SelectItem value="Net 60">Net 60</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          Save Purchase Order
        </Button>
      </div>
    </form>
  );
};

export default PurchaseOrders;

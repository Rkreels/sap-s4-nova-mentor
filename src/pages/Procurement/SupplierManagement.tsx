
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { ArrowLeft, Plus, Edit, Trash2, Eye, Search, Filter, Download, Upload, Star, AlertTriangle, CheckCircle } from 'lucide-react';
import PageHeader from '../../components/page/PageHeader';
import { useVoiceAssistantContext } from '../../context/VoiceAssistantContext';
import { useVoiceAssistant } from '../../hooks/useVoiceAssistant';
import DataTable from '../../components/data/DataTable';
import { Input } from '../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { useToast } from '../../hooks/use-toast';
import { LineChart, Line, BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts';

interface Supplier {
  id: string;
  name: string;
  email: string;
  phone: string;
  category: string;
  status: 'Active' | 'Inactive' | 'Blocked' | 'Pending';
  rating: number;
  totalOrders: number;
  totalValue: number;
  address: string;
  contactPerson: string;
  paymentTerms: string;
  leadTime: string;
  certification: string;
  created: string;
  lastOrder: string;
}

const SupplierManagement: React.FC = () => {
  const navigate = useNavigate();
  const { isEnabled } = useVoiceAssistantContext();
  const { speak } = useVoiceAssistant();
  const [activeTab, setActiveTab] = useState('suppliers');
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isEnabled) {
      speak('Welcome to Supplier Management. Manage your supplier relationships, contracts, and performance.');
    }
  }, [isEnabled, speak]);

  // Sample data
  useEffect(() => {
    const sampleSuppliers: Supplier[] = [
      {
        id: 'SUP-001',
        name: 'Tech Components Inc.',
        email: 'contact@techcomponents.com',
        phone: '+1-555-0101',
        category: 'Electronics',
        status: 'Active',
        rating: 4.8,
        totalOrders: 145,
        totalValue: 2750000,
        address: '123 Tech Ave, Silicon Valley, CA 94025',
        contactPerson: 'John Wilson',
        paymentTerms: 'Net 30',
        leadTime: '14 days',
        certification: 'ISO 9001',
        created: '2023-01-15',
        lastOrder: '2025-01-20'
      },
      {
        id: 'SUP-002',
        name: 'Global Manufacturing Ltd.',
        email: 'sales@globalmanuf.com',
        phone: '+1-555-0102',
        category: 'Manufacturing',
        status: 'Active',
        rating: 4.5,
        totalOrders: 89,
        totalValue: 1890000,
        address: '456 Industrial Blvd, Detroit, MI 48201',
        contactPerson: 'Sarah Chen',
        paymentTerms: 'Net 45',
        leadTime: '21 days',
        certification: 'ISO 14001',
        created: '2023-03-20',
        lastOrder: '2025-01-18'
      },
      {
        id: 'SUP-003',
        name: 'Office Solutions Corp.',
        email: 'info@officesolutions.com',
        phone: '+1-555-0103',
        category: 'Office Supplies',
        status: 'Pending',
        rating: 4.2,
        totalOrders: 0,
        totalValue: 0,
        address: '789 Business St, New York, NY 10001',
        contactPerson: 'Mike Johnson',
        paymentTerms: 'Net 30',
        leadTime: '7 days',
        certification: 'Pending',
        created: '2025-01-10',
        lastOrder: ''
      }
    ];

    setTimeout(() => {
      setSuppliers(sampleSuppliers);
      setIsLoading(false);
    }, 1000);
  }, []);

  const filteredSuppliers = suppliers.filter(supplier => {
    const matchesSearch = supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplier.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplier.contactPerson.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || supplier.status.toLowerCase() === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleCreateSupplier = () => {
    setSelectedSupplier(null);
    setIsEditing(false);
    setIsDialogOpen(true);
  };

  const handleEditSupplier = (supplier: Supplier) => {
    setSelectedSupplier(supplier);
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const handleDeleteSupplier = (supplierId: string) => {
    setSuppliers(prev => prev.filter(s => s.id !== supplierId));
    toast({
      title: 'Supplier Deleted',
      description: 'Supplier has been successfully removed.',
    });
  };

  const handleSaveSupplier = (supplierData: Partial<Supplier>) => {
    if (isEditing && selectedSupplier) {
      setSuppliers(prev => prev.map(s => 
        s.id === selectedSupplier.id ? { ...s, ...supplierData } : s
      ));
      toast({
        title: 'Supplier Updated',
        description: 'Supplier information has been successfully updated.',
      });
    } else {
      const newSupplier: Supplier = {
        id: `SUP-${String(suppliers.length + 1).padStart(3, '0')}`,
        created: new Date().toISOString().split('T')[0],
        totalOrders: 0,
        totalValue: 0,
        rating: 0,
        lastOrder: '',
        ...supplierData as Supplier
      };
      setSuppliers(prev => [...prev, newSupplier]);
      toast({
        title: 'Supplier Created',
        description: 'New supplier has been successfully added.',
      });
    }
    setIsDialogOpen(false);
  };

  const supplierColumns = [
    { key: 'id', header: 'Supplier ID' },
    { key: 'name', header: 'Supplier Name' },
    { key: 'category', header: 'Category' },
    { key: 'contactPerson', header: 'Contact Person' },
    { 
      key: 'rating', 
      header: 'Rating',
      render: (value: number) => (
        <div className="flex items-center">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
          <span>{value.toFixed(1)}</span>
        </div>
      )
    },
    { 
      key: 'status', 
      header: 'Status',
      render: (value: string) => {
        const colors = {
          'Active': 'bg-green-100 text-green-800',
          'Inactive': 'bg-gray-100 text-gray-800',
          'Blocked': 'bg-red-100 text-red-800',
          'Pending': 'bg-yellow-100 text-yellow-800'
        };
        return (
          <Badge className={colors[value as keyof typeof colors]}>
            {value}
          </Badge>
        );
      }
    },
    { 
      key: 'totalValue', 
      header: 'Total Value',
      render: (value: number) => `$${value.toLocaleString()}`
    },
    { 
      key: 'actions', 
      header: 'Actions',
      render: (_, row: Supplier) => (
        <div className="flex space-x-2">
          <Button variant="ghost" size="sm" onClick={() => navigate(`/procurement/suppliers/${row.id}`)}>
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => handleEditSupplier(row)}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => handleDeleteSupplier(row.id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      )
    }
  ];

  const supplierMetrics = [
    { name: 'Total Suppliers', value: suppliers.length, change: '+5%' },
    { name: 'Active Suppliers', value: suppliers.filter(s => s.status === 'Active').length, change: '+8%' },
    { name: 'Total Spend', value: `$${suppliers.reduce((sum, s) => sum + s.totalValue, 0).toLocaleString()}`, change: '+12%' },
    { name: 'Avg Rating', value: (suppliers.reduce((sum, s) => sum + s.rating, 0) / suppliers.length).toFixed(1), change: '+0.2' }
  ];

  const performanceData = suppliers.filter(s => s.totalValue > 0).map(supplier => ({
    name: supplier.name,
    orders: supplier.totalOrders,
    value: supplier.totalValue,
    rating: supplier.rating
  }));

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
          title="Supplier Management"
          description="Manage supplier relationships, contracts, and performance"
          voiceIntroduction="Welcome to Supplier Management."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {supplierMetrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className="text-sm text-muted-foreground">{metric.name}</div>
              <div className="text-sm text-green-600">{metric.change}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Supplier Portfolio</h2>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button onClick={handleCreateSupplier}>
            <Plus className="h-4 w-4 mr-2" />
            Add Supplier
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="contracts">Contracts</TabsTrigger>
          <TabsTrigger value="evaluation">Evaluation</TabsTrigger>
        </TabsList>

        <TabsContent value="suppliers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Supplier Directory</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between mb-4">
                <div className="flex space-x-2">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search suppliers..." 
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
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="blocked">Blocked</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {isLoading ? (
                <div className="h-64 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              ) : (
                <DataTable columns={supplierColumns} data={filteredSuppliers} />
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Supplier Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={performanceData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value, name) => [
                      name === 'value' ? `$${Number(value).toLocaleString()}` : value,
                      name === 'value' ? 'Total Value' : name === 'orders' ? 'Orders' : 'Rating'
                    ]} />
                    <Legend />
                    <Bar dataKey="orders" fill="#8884d8" name="orders" />
                    <Bar dataKey="rating" fill="#82ca9d" name="rating" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Performing Suppliers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {suppliers
                    .filter(s => s.rating > 0)
                    .sort((a, b) => b.rating - a.rating)
                    .slice(0, 5)
                    .map((supplier, index) => (
                      <div key={supplier.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">{supplier.name}</div>
                          <div className="text-sm text-muted-foreground">{supplier.category}</div>
                        </div>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                          <span className="font-medium">{supplier.rating.toFixed(1)}</span>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="contracts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Contract Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold">Active Contracts</h3>
                  <div className="text-2xl font-bold mt-2">24</div>
                  <div className="text-sm text-green-600">Currently in force</div>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold">Expiring Soon</h3>
                  <div className="text-2xl font-bold mt-2">3</div>
                  <div className="text-sm text-orange-600">Next 30 days</div>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold">Renewal Required</h3>
                  <div className="text-2xl font-bold mt-2">7</div>
                  <div className="text-sm text-red-600">Action needed</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="evaluation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Supplier Evaluation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Evaluation Criteria</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Quality</span>
                      <span className="font-medium">40%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery Performance</span>
                      <span className="font-medium">30%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Price Competitiveness</span>
                      <span className="font-medium">20%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Service &amp; Support</span>
                      <span className="font-medium">10%</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-medium">Recent Evaluations</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 border rounded">
                      <span className="text-sm">Tech Components Inc.</span>
                      <Badge className="bg-green-100 text-green-800">Excellent</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 border rounded">
                      <span className="text-sm">Global Manufacturing Ltd.</span>
                      <Badge className="bg-blue-100 text-blue-800">Good</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 border rounded">
                      <span className="text-sm">Office Solutions Corp.</span>
                      <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Edit Supplier' : 'Create New Supplier'}</DialogTitle>
          </DialogHeader>
          <SupplierForm 
            supplier={selectedSupplier}
            onSave={handleSaveSupplier}
            onCancel={() => setIsDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

const SupplierForm: React.FC<{
  supplier: Supplier | null;
  onSave: (data: Partial<Supplier>) => void;
  onCancel: () => void;
}> = ({ supplier, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: supplier?.name || '',
    email: supplier?.email || '',
    phone: supplier?.phone || '',
    category: supplier?.category || '',
    status: supplier?.status || 'Pending',
    address: supplier?.address || '',
    contactPerson: supplier?.contactPerson || '',
    paymentTerms: supplier?.paymentTerms || 'Net 30',
    leadTime: supplier?.leadTime || '',
    certification: supplier?.certification || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Supplier Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
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
              <SelectItem value="Manufacturing">Manufacturing</SelectItem>
              <SelectItem value="Office Supplies">Office Supplies</SelectItem>
              <SelectItem value="Services">Services</SelectItem>
              <SelectItem value="Raw Materials">Raw Materials</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            required
          />
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
          />
        </div>
        <div>
          <Label htmlFor="contactPerson">Contact Person</Label>
          <Input
            id="contactPerson"
            value={formData.contactPerson}
            onChange={(e) => setFormData(prev => ({ ...prev, contactPerson: e.target.value }))}
          />
        </div>
        <div>
          <Label htmlFor="status">Status</Label>
          <Select value={formData.status} onValueChange={(value) => setFormData(prev => ({ ...prev, status: value as any }))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Blocked">Blocked</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div>
        <Label htmlFor="address">Address</Label>
        <Textarea
          id="address"
          value={formData.address}
          onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
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
        <div>
          <Label htmlFor="leadTime">Lead Time</Label>
          <Input
            id="leadTime"
            value={formData.leadTime}
            onChange={(e) => setFormData(prev => ({ ...prev, leadTime: e.target.value }))}
            placeholder="e.g., 14 days"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          Save Supplier
        </Button>
      </div>
    </form>
  );
};

export default SupplierManagement;

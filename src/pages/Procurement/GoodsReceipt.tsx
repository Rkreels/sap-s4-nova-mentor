
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { ArrowLeft, Plus, Package, CheckCircle, AlertCircle, Search, Filter, Edit, Trash2, Eye, Download, Upload, Truck, Calendar, BarChart3 } from 'lucide-react';
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

interface GoodsReceipt {
  id: string;
  grNumber: string;
  poNumber: string;
  supplier: string;
  deliveryDate: string;
  receivedDate: string;
  orderedQty: number;
  receivedQty: number;
  status: 'Complete' | 'Partial' | 'Pending' | 'Quality Issue' | 'Rejected';
  inspector: string;
  material: string;
  unit: string;
  variance: number;
  location: string;
  batchNumber: string;
  notes: string;
  created: string;
}

const GoodsReceipt: React.FC = () => {
  const navigate = useNavigate();
  const { isEnabled } = useVoiceAssistantContext();
  const { speak } = useVoiceAssistant();
  const [activeTab, setActiveTab] = useState('receipts');
  const [receipts, setReceipts] = useState<GoodsReceipt[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedReceipt, setSelectedReceipt] = useState<GoodsReceipt | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isEnabled) {
      speak('Welcome to Goods Receipt. Process and manage incoming deliveries from suppliers.');
    }
  }, [isEnabled, speak]);

  // Sample data
  useEffect(() => {
    const sampleReceipts: GoodsReceipt[] = [
      {
        id: 'GR-001',
        grNumber: 'GR-2025-001',
        poNumber: 'PO-2025-001',
        supplier: 'Tech Components Inc.',
        deliveryDate: '2025-01-20',
        receivedDate: '2025-01-20',
        orderedQty: 100,
        receivedQty: 100,
        status: 'Complete',
        inspector: 'John Smith',
        material: 'Microprocessors',
        unit: 'PCS',
        variance: 0,
        location: 'Warehouse A',
        batchNumber: 'BATCH001',
        notes: 'All items received in good condition',
        created: '2025-01-20'
      },
      {
        id: 'GR-002',
        grNumber: 'GR-2025-002',
        poNumber: 'PO-2025-002',
        supplier: 'Office Supplies Ltd.',
        deliveryDate: '2025-01-22',
        receivedDate: '2025-01-22',
        orderedQty: 50,
        receivedQty: 45,
        status: 'Partial',
        inspector: 'Maria Garcia',
        material: 'Office Chairs',
        unit: 'PCS',
        variance: -5,
        location: 'Warehouse B',
        batchNumber: 'BATCH002',
        notes: '5 units damaged during transport',
        created: '2025-01-22'
      },
      {
        id: 'GR-003',
        grNumber: 'GR-2025-003',
        poNumber: 'PO-2025-003',
        supplier: 'Industrial Parts Co.',
        deliveryDate: '2025-01-25',
        receivedDate: '',
        orderedQty: 200,
        receivedQty: 0,
        status: 'Pending',
        inspector: '',
        material: 'Steel Components',
        unit: 'KG',
        variance: 0,
        location: 'Warehouse C',
        batchNumber: '',
        notes: 'Awaiting delivery',
        created: '2025-01-15'
      }
    ];

    setTimeout(() => {
      setReceipts(sampleReceipts);
      setIsLoading(false);
    }, 1000);
  }, []);

  const filteredReceipts = receipts.filter(receipt => {
    const matchesSearch = receipt.grNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         receipt.poNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         receipt.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         receipt.material.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || receipt.status.toLowerCase() === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleCreateReceipt = () => {
    setSelectedReceipt(null);
    setIsEditing(false);
    setIsDialogOpen(true);
  };

  const handleEditReceipt = (receipt: GoodsReceipt) => {
    setSelectedReceipt(receipt);
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const handleDeleteReceipt = (receiptId: string) => {
    setReceipts(prev => prev.filter(r => r.id !== receiptId));
    toast({
      title: 'Receipt Deleted',
      description: 'Goods receipt has been successfully removed.',
    });
  };

  const handleSaveReceipt = (receiptData: Partial<GoodsReceipt>) => {
    if (isEditing && selectedReceipt) {
      setReceipts(prev => prev.map(r => 
        r.id === selectedReceipt.id ? { ...r, ...receiptData } : r
      ));
      toast({
        title: 'Receipt Updated',
        description: 'Goods receipt has been successfully updated.',
      });
    } else {
      const newReceipt: GoodsReceipt = {
        id: `GR-${String(receipts.length + 1).padStart(3, '0')}`,
        grNumber: `GR-2025-${String(receipts.length + 1).padStart(3, '0')}`,
        created: new Date().toISOString().split('T')[0],
        receivedDate: '',
        variance: 0,
        ...receiptData as GoodsReceipt
      };
      setReceipts(prev => [...prev, newReceipt]);
      toast({
        title: 'Receipt Created',
        description: 'New goods receipt has been successfully created.',
      });
    }
    setIsDialogOpen(false);
  };

  const receiptColumns = [
    { key: 'grNumber', header: 'GR Number' },
    { key: 'poNumber', header: 'PO Number' },
    { key: 'supplier', header: 'Supplier' },
    { key: 'material', header: 'Material' },
    { key: 'deliveryDate', header: 'Delivery Date' },
    { key: 'orderedQty', header: 'Ordered Qty' },
    { key: 'receivedQty', header: 'Received Qty' },
    { 
      key: 'variance', 
      header: 'Variance',
      render: (value: number) => (
        <span className={value < 0 ? 'text-red-600' : value > 0 ? 'text-blue-600' : 'text-green-600'}>
          {value > 0 ? `+${value}` : value}
        </span>
      )
    },
    { 
      key: 'status', 
      header: 'Status',
      render: (value: string) => {
        const colors = {
          'Complete': 'bg-green-100 text-green-800',
          'Partial': 'bg-yellow-100 text-yellow-800',
          'Pending': 'bg-orange-100 text-orange-800',
          'Quality Issue': 'bg-red-100 text-red-800',
          'Rejected': 'bg-red-100 text-red-800'
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
      render: (_, row: GoodsReceipt) => (
        <div className="flex space-x-2">
          <Button variant="ghost" size="sm" onClick={() => handleEditReceipt(row)}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => handleDeleteReceipt(row.id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      )
    }
  ];

  const receiptMetrics = [
    { name: 'Today\'s Receipts', value: receipts.filter(r => r.receivedDate === new Date().toISOString().split('T')[0]).length, change: '+12%' },
    { name: 'Pending Receipts', value: receipts.filter(r => r.status === 'Pending').length, change: '-8%' },
    { name: 'Quality Issues', value: receipts.filter(r => r.status === 'Quality Issue').length, change: '-15%' },
    { name: 'On-Time Delivery', value: '94%', change: '+2%' }
  ];

  const performanceData = receipts.reduce((acc, receipt) => {
    const month = receipt.receivedDate ? receipt.receivedDate.substring(0, 7) : '';
    if (month) {
      acc[month] = acc[month] || { month, complete: 0, partial: 0, issues: 0 };
      if (receipt.status === 'Complete') acc[month].complete++;
      else if (receipt.status === 'Partial') acc[month].partial++;
      else if (receipt.status === 'Quality Issue') acc[month].issues++;
    }
    return acc;
  }, {} as Record<string, any>);

  const chartData = Object.values(performanceData);

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
        {receiptMetrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className="text-sm text-muted-foreground">{metric.name}</div>
              <div className={`text-sm ${metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                {metric.change}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Goods Receipt Management</h2>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button onClick={handleCreateReceipt}>
            <Plus className="h-4 w-4 mr-2" />
            Create Receipt
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="receipts">Receipts</TabsTrigger>
          <TabsTrigger value="inspection">Inspection</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="receipts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Goods Receipt Directory</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between mb-4">
                <div className="flex space-x-2">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search receipts..." 
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
                      <SelectItem value="complete">Complete</SelectItem>
                      <SelectItem value="partial">Partial</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="quality issue">Quality Issue</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {isLoading ? (
                <div className="h-64 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              ) : (
                <DataTable columns={receiptColumns} data={filteredReceipts} />
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inspection" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Quality Inspection</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold">Pending Inspection</h3>
                  <div className="text-2xl font-bold mt-2">
                    {receipts.filter(r => r.status === 'Pending').length}
                  </div>
                  <div className="text-sm text-orange-600">Awaiting review</div>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold">Passed Inspection</h3>
                  <div className="text-2xl font-bold mt-2">
                    {receipts.filter(r => r.status === 'Complete').length}
                  </div>
                  <div className="text-sm text-green-600">Quality approved</div>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold">Failed Inspection</h3>
                  <div className="text-2xl font-bold mt-2">
                    {receipts.filter(r => r.status === 'Quality Issue').length}
                  </div>
                  <div className="text-sm text-red-600">Quality issues</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Receipt Performance Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="complete" fill="#22c55e" name="Complete" />
                    <Bar dataKey="partial" fill="#eab308" name="Partial" />
                    <Bar dataKey="issues" fill="#ef4444" name="Issues" />
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
                  {Array.from(new Set(receipts.map(r => r.supplier))).map((supplier, index) => {
                    const supplierReceipts = receipts.filter(r => r.supplier === supplier);
                    const completeRate = (supplierReceipts.filter(r => r.status === 'Complete').length / supplierReceipts.length) * 100;
                    return (
                      <div key={supplier} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">{supplier}</div>
                          <div className="text-sm text-muted-foreground">{supplierReceipts.length} receipts</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">{completeRate.toFixed(1)}%</div>
                          <div className="text-sm text-muted-foreground">Complete rate</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Receipt Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="h-20 flex flex-col">
                  <span>Daily Receipt Report</span>
                  <span className="text-xs text-muted-foreground">Today's activities</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col">
                  <span>Quality Analysis</span>
                  <span className="text-xs text-muted-foreground">Inspection results</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col">
                  <span>Supplier Performance</span>
                  <span className="text-xs text-muted-foreground">Delivery & quality metrics</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col">
                  <span>Variance Analysis</span>
                  <span className="text-xs text-muted-foreground">Quantity discrepancies</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Edit Goods Receipt' : 'Create New Goods Receipt'}</DialogTitle>
          </DialogHeader>
          <ReceiptForm 
            receipt={selectedReceipt}
            onSave={handleSaveReceipt}
            onCancel={() => setIsDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

const ReceiptForm: React.FC<{
  receipt: GoodsReceipt | null;
  onSave: (data: Partial<GoodsReceipt>) => void;
  onCancel: () => void;
}> = ({ receipt, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    poNumber: receipt?.poNumber || '',
    supplier: receipt?.supplier || '',
    material: receipt?.material || '',
    orderedQty: receipt?.orderedQty || 0,
    receivedQty: receipt?.receivedQty || 0,
    deliveryDate: receipt?.deliveryDate || '',
    receivedDate: receipt?.receivedDate || '',
    status: receipt?.status || 'Pending',
    inspector: receipt?.inspector || '',
    unit: receipt?.unit || 'PCS',
    location: receipt?.location || '',
    batchNumber: receipt?.batchNumber || '',
    notes: receipt?.notes || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const variance = formData.receivedQty - formData.orderedQty;
    onSave({ ...formData, variance });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="poNumber">PO Number</Label>
          <Input
            id="poNumber"
            value={formData.poNumber}
            onChange={(e) => setFormData(prev => ({ ...prev, poNumber: e.target.value }))}
            required
          />
        </div>
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
          <Label htmlFor="material">Material</Label>
          <Input
            id="material"
            value={formData.material}
            onChange={(e) => setFormData(prev => ({ ...prev, material: e.target.value }))}
            required
          />
        </div>
        <div>
          <Label htmlFor="unit">Unit</Label>
          <Select value={formData.unit} onValueChange={(value) => setFormData(prev => ({ ...prev, unit: value }))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="PCS">Pieces</SelectItem>
              <SelectItem value="KG">Kilograms</SelectItem>
              <SelectItem value="LTR">Liters</SelectItem>
              <SelectItem value="MTR">Meters</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="orderedQty">Ordered Quantity</Label>
          <Input
            id="orderedQty"
            type="number"
            value={formData.orderedQty}
            onChange={(e) => setFormData(prev => ({ ...prev, orderedQty: Number(e.target.value) }))}
            required
          />
        </div>
        <div>
          <Label htmlFor="receivedQty">Received Quantity</Label>
          <Input
            id="receivedQty"
            type="number"
            value={formData.receivedQty}
            onChange={(e) => setFormData(prev => ({ ...prev, receivedQty: Number(e.target.value) }))}
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
          />
        </div>
        <div>
          <Label htmlFor="receivedDate">Received Date</Label>
          <Input
            id="receivedDate"
            type="date"
            value={formData.receivedDate}
            onChange={(e) => setFormData(prev => ({ ...prev, receivedDate: e.target.value }))}
          />
        </div>
        <div>
          <Label htmlFor="status">Status</Label>
          <Select value={formData.status} onValueChange={(value) => setFormData(prev => ({ ...prev, status: value as any }))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Complete">Complete</SelectItem>
              <SelectItem value="Partial">Partial</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Quality Issue">Quality Issue</SelectItem>
              <SelectItem value="Rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="inspector">Inspector</Label>
          <Input
            id="inspector"
            value={formData.inspector}
            onChange={(e) => setFormData(prev => ({ ...prev, inspector: e.target.value }))}
          />
        </div>
        <div>
          <Label htmlFor="location">Storage Location</Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
          />
        </div>
        <div>
          <Label htmlFor="batchNumber">Batch Number</Label>
          <Input
            id="batchNumber"
            value={formData.batchNumber}
            onChange={(e) => setFormData(prev => ({ ...prev, batchNumber: e.target.value }))}
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          value={formData.notes}
          onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
          rows={3}
        />
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          Save Receipt
        </Button>
      </div>
    </form>
  );
};

export default GoodsReceipt;

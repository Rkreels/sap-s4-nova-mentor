
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { ArrowLeft, Plus, FileText, DollarSign, AlertCircle, Search, Filter, Edit, Trash2, Eye, Download, Upload, CheckCircle, XCircle } from 'lucide-react';
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

interface Invoice {
  id: string;
  invoiceNumber: string;
  supplier: string;
  poNumber: string;
  grNumber: string;
  invoiceDate: string;
  dueDate: string;
  invoiceAmount: number;
  currency: string;
  status: 'Verified' | 'Pending Verification' | 'Rejected' | 'Approved for Payment' | 'Paid';
  variance: number;
  paymentTerms: string;
  taxAmount: number;
  discountAmount: number;
  netAmount: number;
  verifiedBy: string;
  verificationDate: string;
  notes: string;
  created: string;
}

const InvoiceVerification: React.FC = () => {
  const navigate = useNavigate();
  const { isEnabled } = useVoiceAssistantContext();
  const { speak } = useVoiceAssistant();
  const [activeTab, setActiveTab] = useState('invoices');
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isEnabled) {
      speak('Welcome to Invoice Verification. Verify and process supplier invoices for payment.');
    }
  }, [isEnabled, speak]);

  // Sample data
  useEffect(() => {
    const sampleInvoices: Invoice[] = [
      {
        id: 'INV-001',
        invoiceNumber: 'INV-2025-001',
        supplier: 'Tech Components Inc.',
        poNumber: 'PO-2025-001',
        grNumber: 'GR-2025-001',
        invoiceDate: '2025-01-20',
        dueDate: '2025-02-19',
        invoiceAmount: 125000,
        currency: 'USD',
        status: 'Verified',
        variance: 0,
        paymentTerms: 'Net 30',
        taxAmount: 12500,
        discountAmount: 2500,
        netAmount: 135000,
        verifiedBy: 'John Smith',
        verificationDate: '2025-01-21',
        notes: 'Invoice verified and approved for payment',
        created: '2025-01-20'
      },
      {
        id: 'INV-002',
        invoiceNumber: 'INV-2025-002',
        supplier: 'Office Supplies Ltd.',
        poNumber: 'PO-2025-002',
        grNumber: 'GR-2025-002',
        invoiceDate: '2025-01-22',
        dueDate: '2025-02-21',
        invoiceAmount: 46200,
        currency: 'USD',
        status: 'Pending Verification',
        variance: 400,
        paymentTerms: 'Net 30',
        taxAmount: 4620,
        discountAmount: 500,
        netAmount: 50320,
        verifiedBy: '',
        verificationDate: '',
        notes: 'Price variance detected - requires review',
        created: '2025-01-22'
      },
      {
        id: 'INV-003',
        invoiceNumber: 'INV-2025-003',
        supplier: 'Industrial Parts Co.',
        poNumber: 'PO-2025-003',
        grNumber: 'GR-2025-003',
        invoiceDate: '2025-01-25',
        dueDate: '2025-02-24',
        invoiceAmount: 75000,
        currency: 'USD',
        status: 'Approved for Payment',
        variance: -500,
        paymentTerms: 'Net 30',
        taxAmount: 7500,
        discountAmount: 1000,
        netAmount: 81500,
        verifiedBy: 'Maria Garcia',
        verificationDate: '2025-01-26',
        notes: 'Minor discount applied, approved for payment',
        created: '2025-01-25'
      }
    ];

    setTimeout(() => {
      setInvoices(sampleInvoices);
      setIsLoading(false);
    }, 1000);
  }, []);

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.poNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || invoice.status.toLowerCase().includes(filterStatus);
    return matchesSearch && matchesFilter;
  });

  const handleCreateInvoice = () => {
    setSelectedInvoice(null);
    setIsEditing(false);
    setIsDialogOpen(true);
  };

  const handleEditInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const handleDeleteInvoice = (invoiceId: string) => {
    setInvoices(prev => prev.filter(i => i.id !== invoiceId));
    toast({
      title: 'Invoice Deleted',
      description: 'Invoice has been successfully removed.',
    });
  };

  const handleApproveInvoice = (invoiceId: string) => {
    setInvoices(prev => prev.map(i => 
      i.id === invoiceId ? { 
        ...i, 
        status: 'Approved for Payment' as const,
        verifiedBy: 'Current User',
        verificationDate: new Date().toISOString().split('T')[0]
      } : i
    ));
    toast({
      title: 'Invoice Approved',
      description: 'Invoice has been approved for payment.',
    });
  };

  const handleRejectInvoice = (invoiceId: string) => {
    setInvoices(prev => prev.map(i => 
      i.id === invoiceId ? { 
        ...i, 
        status: 'Rejected' as const,
        verifiedBy: 'Current User',
        verificationDate: new Date().toISOString().split('T')[0]
      } : i
    ));
    toast({
      title: 'Invoice Rejected',
      description: 'Invoice has been rejected.',
    });
  };

  const handleSaveInvoice = (invoiceData: Partial<Invoice>) => {
    if (isEditing && selectedInvoice) {
      setInvoices(prev => prev.map(i => 
        i.id === selectedInvoice.id ? { ...i, ...invoiceData } : i
      ));
      toast({
        title: 'Invoice Updated',
        description: 'Invoice has been successfully updated.',
      });
    } else {
      const newInvoice: Invoice = {
        id: `INV-${String(invoices.length + 1).padStart(3, '0')}`,
        created: new Date().toISOString().split('T')[0],
        verifiedBy: '',
        verificationDate: '',
        ...invoiceData as Invoice
      };
      setInvoices(prev => [...prev, newInvoice]);
      toast({
        title: 'Invoice Created',
        description: 'New invoice has been successfully created.',
      });
    }
    setIsDialogOpen(false);
  };

  const invoiceColumns = [
    { key: 'invoiceNumber', header: 'Invoice Number' },
    { key: 'supplier', header: 'Supplier' },
    { key: 'poNumber', header: 'PO Number' },
    { key: 'invoiceDate', header: 'Invoice Date' },
    { key: 'dueDate', header: 'Due Date' },
    { 
      key: 'invoiceAmount', 
      header: 'Amount',
      render: (value: number, row: Invoice) => `$${value.toLocaleString()}`
    },
    { 
      key: 'variance', 
      header: 'Variance',
      render: (value: number) => (
        <span className={value > 0 ? 'text-red-600' : value < 0 ? 'text-green-600' : 'text-gray-600'}>
          {value !== 0 ? (value > 0 ? `+$${value}` : `-$${Math.abs(value)}`) : '$0'}
        </span>
      )
    },
    { 
      key: 'status', 
      header: 'Status',
      render: (value: string) => {
        const colors = {
          'Verified': 'bg-blue-100 text-blue-800',
          'Pending Verification': 'bg-yellow-100 text-yellow-800',
          'Rejected': 'bg-red-100 text-red-800',
          'Approved for Payment': 'bg-green-100 text-green-800',
          'Paid': 'bg-gray-100 text-gray-800'
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
      render: (_, row: Invoice) => (
        <div className="flex space-x-2">
          {row.status === 'Pending Verification' && (
            <>
              <Button variant="ghost" size="sm" onClick={() => handleApproveInvoice(row.id)}>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => handleRejectInvoice(row.id)}>
                <XCircle className="h-4 w-4 text-red-600" />
              </Button>
            </>
          )}
          <Button variant="ghost" size="sm" onClick={() => handleEditInvoice(row)}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => handleDeleteInvoice(row.id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      )
    }
  ];

  const invoiceMetrics = [
    { name: 'Pending Invoices', value: invoices.filter(i => i.status === 'Pending Verification').length, change: '-8%' },
    { name: 'Verified Today', value: invoices.filter(i => i.verificationDate === new Date().toISOString().split('T')[0]).length, change: '+15%' },
    { name: 'Total Value', value: `$${invoices.reduce((sum, i) => sum + i.invoiceAmount, 0).toLocaleString()}`, change: '+12%' },
    { name: 'Average Processing Time', value: '2.5 days', change: '-10%' }
  ];

  const verificationData = invoices.reduce((acc, invoice) => {
    const month = invoice.invoiceDate.substring(0, 7);
    acc[month] = acc[month] || { month, verified: 0, pending: 0, rejected: 0, approved: 0 };
    if (invoice.status === 'Verified') acc[month].verified++;
    else if (invoice.status === 'Pending Verification') acc[month].pending++;
    else if (invoice.status === 'Rejected') acc[month].rejected++;
    else if (invoice.status === 'Approved for Payment') acc[month].approved++;
    return acc;
  }, {} as Record<string, any>);

  const chartData = Object.values(verificationData);

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
          title="Invoice Verification"
          description="Verify and process supplier invoices for payment"
          voiceIntroduction="Welcome to Invoice Verification."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {invoiceMetrics.map((metric, index) => (
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
        <h2 className="text-xl font-semibold">Invoice Verification</h2>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button onClick={handleCreateInvoice}>
            <Plus className="h-4 w-4 mr-2" />
            Create Invoice
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="verification">Verification</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="invoices" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Invoice Directory</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between mb-4">
                <div className="flex space-x-2">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search invoices..." 
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
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="verified">Verified</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {isLoading ? (
                <div className="h-64 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              ) : (
                <DataTable columns={invoiceColumns} data={filteredInvoices} />
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="verification" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Verification Workflow</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold">Pending Review</h3>
                  <div className="text-2xl font-bold mt-2">
                    {invoices.filter(i => i.status === 'Pending Verification').length}
                  </div>
                  <div className="text-sm text-yellow-600">Awaiting verification</div>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold">Verified</h3>
                  <div className="text-2xl font-bold mt-2">
                    {invoices.filter(i => i.status === 'Verified').length}
                  </div>
                  <div className="text-sm text-blue-600">Completed verification</div>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold">Approved</h3>
                  <div className="text-2xl font-bold mt-2">
                    {invoices.filter(i => i.status === 'Approved for Payment').length}
                  </div>
                  <div className="text-sm text-green-600">Ready for payment</div>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold">Rejected</h3>
                  <div className="text-2xl font-bold mt-2">
                    {invoices.filter(i => i.status === 'Rejected').length}
                  </div>
                  <div className="text-sm text-red-600">Verification failed</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Verification Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="verified" fill="#3b82f6" name="Verified" />
                    <Bar dataKey="approved" fill="#22c55e" name="Approved" />
                    <Bar dataKey="rejected" fill="#ef4444" name="Rejected" />
                    <Bar dataKey="pending" fill="#eab308" name="Pending" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Invoice Value Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {invoices
                    .sort((a, b) => b.invoiceAmount - a.invoiceAmount)
                    .slice(0, 5)
                    .map((invoice, index) => (
                      <div key={invoice.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">{invoice.supplier}</div>
                          <div className="text-sm text-muted-foreground">{invoice.invoiceNumber}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">${invoice.invoiceAmount.toLocaleString()}</div>
                          <Badge variant={invoice.status === 'Approved for Payment' ? 'default' : 'secondary'}>
                            {invoice.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Invoice Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="h-20 flex flex-col">
                  <span>Verification Report</span>
                  <span className="text-xs text-muted-foreground">Processing status summary</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col">
                  <span>Variance Analysis</span>
                  <span className="text-xs text-muted-foreground">Price & quantity variances</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col">
                  <span>Aging Report</span>
                  <span className="text-xs text-muted-foreground">Outstanding invoices</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col">
                  <span>Payment Schedule</span>
                  <span className="text-xs text-muted-foreground">Upcoming due dates</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Edit Invoice' : 'Create New Invoice'}</DialogTitle>
          </DialogHeader>
          <InvoiceForm 
            invoice={selectedInvoice}
            onSave={handleSaveInvoice}
            onCancel={() => setIsDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

const InvoiceForm: React.FC<{
  invoice: Invoice | null;
  onSave: (data: Partial<Invoice>) => void;
  onCancel: () => void;
}> = ({ invoice, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    invoiceNumber: invoice?.invoiceNumber || '',
    supplier: invoice?.supplier || '',
    poNumber: invoice?.poNumber || '',
    grNumber: invoice?.grNumber || '',
    invoiceDate: invoice?.invoiceDate || '',
    dueDate: invoice?.dueDate || '',
    invoiceAmount: invoice?.invoiceAmount || 0,
    currency: invoice?.currency || 'USD',
    status: invoice?.status || 'Pending Verification',
    paymentTerms: invoice?.paymentTerms || 'Net 30',
    taxAmount: invoice?.taxAmount || 0,
    discountAmount: invoice?.discountAmount || 0,
    notes: invoice?.notes || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const netAmount = formData.invoiceAmount + formData.taxAmount - formData.discountAmount;
    const variance = 0; // This would normally be calculated against PO/GR amounts
    onSave({ ...formData, netAmount, variance });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="invoiceNumber">Invoice Number</Label>
          <Input
            id="invoiceNumber"
            value={formData.invoiceNumber}
            onChange={(e) => setFormData(prev => ({ ...prev, invoiceNumber: e.target.value }))}
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
          <Label htmlFor="poNumber">PO Number</Label>
          <Input
            id="poNumber"
            value={formData.poNumber}
            onChange={(e) => setFormData(prev => ({ ...prev, poNumber: e.target.value }))}
          />
        </div>
        <div>
          <Label htmlFor="grNumber">GR Number</Label>
          <Input
            id="grNumber"
            value={formData.grNumber}
            onChange={(e) => setFormData(prev => ({ ...prev, grNumber: e.target.value }))}
          />
        </div>
        <div>
          <Label htmlFor="invoiceDate">Invoice Date</Label>
          <Input
            id="invoiceDate"
            type="date"
            value={formData.invoiceDate}
            onChange={(e) => setFormData(prev => ({ ...prev, invoiceDate: e.target.value }))}
            required
          />
        </div>
        <div>
          <Label htmlFor="dueDate">Due Date</Label>
          <Input
            id="dueDate"
            type="date"
            value={formData.dueDate}
            onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
            required
          />
        </div>
        <div>
          <Label htmlFor="invoiceAmount">Invoice Amount</Label>
          <Input
            id="invoiceAmount"
            type="number"
            step="0.01"
            value={formData.invoiceAmount}
            onChange={(e) => setFormData(prev => ({ ...prev, invoiceAmount: Number(e.target.value) }))}
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
              <SelectItem value="JPY">JPY</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="taxAmount">Tax Amount</Label>
          <Input
            id="taxAmount"
            type="number"
            step="0.01"
            value={formData.taxAmount}
            onChange={(e) => setFormData(prev => ({ ...prev, taxAmount: Number(e.target.value) }))}
          />
        </div>
        <div>
          <Label htmlFor="discountAmount">Discount Amount</Label>
          <Input
            id="discountAmount"
            type="number"
            step="0.01"
            value={formData.discountAmount}
            onChange={(e) => setFormData(prev => ({ ...prev, discountAmount: Number(e.target.value) }))}
          />
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
        <div>
          <Label htmlFor="status">Status</Label>
          <Select value={formData.status} onValueChange={(value) => setFormData(prev => ({ ...prev, status: value as any }))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Pending Verification">Pending Verification</SelectItem>
              <SelectItem value="Verified">Verified</SelectItem>
              <SelectItem value="Approved for Payment">Approved for Payment</SelectItem>
              <SelectItem value="Rejected">Rejected</SelectItem>
              <SelectItem value="Paid">Paid</SelectItem>
            </SelectContent>
          </Select>
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
          Save Invoice
        </Button>
      </div>
    </form>
  );
};

export default InvoiceVerification;

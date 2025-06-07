import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Input } from '../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { ArrowLeft, Plus, Edit, Trash2, Eye, Download, Filter, Calendar, Users, DollarSign, FileText, AlertCircle } from 'lucide-react';
import PageHeader from '../../components/page/PageHeader';
import DataTable, { Column } from '../../components/data/DataTable';
import { Badge } from '../../components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../components/ui/form';
import { useForm } from 'react-hook-form';
import { useVoiceAssistantContext } from '../../context/VoiceAssistantContext';
import { useVoiceAssistant } from '../../hooks/useVoiceAssistant';

const AccountsPayable: React.FC = () => {
  const navigate = useNavigate();
  const { isEnabled } = useVoiceAssistantContext();
  const { speak } = useVoiceAssistant();
  const [activeTab, setActiveTab] = useState('invoices');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const form = useForm({
    defaultValues: {
      vendor: '',
      invoiceNumber: '',
      amount: '',
      dueDate: '',
      description: '',
      poNumber: ''
    }
  });

  React.useEffect(() => {
    if (isEnabled) {
      speak('You are now in Accounts Payable. Here you can manage vendor invoices, payment processing, and supplier relationships in the procure-to-pay cycle.');
    }
  }, [isEnabled, speak]);

  const [invoices, setInvoices] = useState([
    { 
      id: 'AP-001',
      invoiceNumber: 'INV-2024-001',
      vendor: 'ABC Suppliers',
      vendorId: 'V001',
      amount: 15000.00,
      dueDate: '2024-06-15',
      status: 'Pending Approval',
      poNumber: 'PO-2024-001',
      receiptDate: '2024-05-20',
      paymentTerms: 'Net 30',
      description: 'Office Supplies'
    },
    { 
      id: 'AP-002',
      invoiceNumber: 'INV-2024-002',
      vendor: 'Tech Solutions Ltd',
      vendorId: 'V002',
      amount: 25000.00,
      dueDate: '2024-06-10',
      status: 'Approved',
      poNumber: 'PO-2024-002',
      receiptDate: '2024-05-18',
      paymentTerms: 'Net 15',
      description: 'Software Licenses'
    },
    { 
      id: 'AP-003',
      invoiceNumber: 'INV-2024-003',
      vendor: 'Global Manufacturing',
      vendorId: 'V003',
      amount: 45000.00,
      dueDate: '2024-05-25',
      status: 'Overdue',
      poNumber: 'PO-2024-003',
      receiptDate: '2024-04-20',
      paymentTerms: 'Net 30',
      description: 'Raw Materials'
    }
  ]);

  const [vendors, setVendors] = useState([
    { id: 'V001', vendorCode: 'ABC001', name: 'ABC Suppliers', paymentTerms: 'Net 30', status: 'Active', totalOwed: 15000 },
    { id: 'V002', vendorCode: 'TECH002', name: 'Tech Solutions Ltd', paymentTerms: 'Net 15', status: 'Active', totalOwed: 25000 },
    { id: 'V003', vendorCode: 'GLOB003', name: 'Global Manufacturing', paymentTerms: 'Net 30', status: 'Active', totalOwed: 45000 },
    { id: 'V004', vendorCode: 'SERV004', name: 'Service Partners Inc', paymentTerms: 'Net 45', status: 'Active', totalOwed: 0 }
  ]);

  const [paymentRuns, setPaymentRuns] = useState([
    { id: 'PR-001', runDate: '2024-05-20', totalAmount: 35000, invoiceCount: 5, status: 'Completed', method: 'Bank Transfer' },
    { id: 'PR-002', runDate: '2024-05-15', totalAmount: 22000, invoiceCount: 3, status: 'Completed', method: 'Check' },
    { id: 'PR-003', runDate: '2024-05-10', totalAmount: 18000, invoiceCount: 4, status: 'Pending', method: 'ACH' }
  ]);

  const handleCreate = (data: any) => {
    const newInvoice = {
      id: `AP-${String(invoices.length + 1).padStart(3, '0')}`,
      invoiceNumber: data.invoiceNumber,
      vendor: vendors.find(v => v.id === data.vendor)?.name || '',
      vendorId: data.vendor,
      amount: parseFloat(data.amount),
      dueDate: data.dueDate,
      status: 'Pending Approval',
      poNumber: data.poNumber,
      receiptDate: new Date().toISOString().split('T')[0],
      paymentTerms: 'Net 30',
      description: data.description
    };
    setInvoices([...invoices, newInvoice]);
    setIsCreateDialogOpen(false);
    form.reset();
  };

  const handleEdit = (invoice: any) => {
    setSelectedInvoice(invoice);
    form.reset({
      vendor: invoice.vendorId,
      invoiceNumber: invoice.invoiceNumber,
      amount: invoice.amount.toString(),
      dueDate: invoice.dueDate,
      description: invoice.description,
      poNumber: invoice.poNumber
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdate = (data: any) => {
    setInvoices(invoices.map(i => 
      i.id === selectedInvoice?.id 
        ? { 
            ...i, 
            invoiceNumber: data.invoiceNumber,
            vendor: vendors.find(v => v.id === data.vendor)?.name || '',
            vendorId: data.vendor,
            amount: parseFloat(data.amount),
            dueDate: data.dueDate,
            description: data.description,
            poNumber: data.poNumber
          } 
        : i
    ));
    setIsEditDialogOpen(false);
    setSelectedInvoice(null);
  };

  const handleDelete = (id: string) => {
    setInvoices(invoices.filter(i => i.id !== id));
  };

  const invoiceColumns: Column[] = [
    { key: 'invoiceNumber', header: 'Invoice Number' },
    { key: 'vendor', header: 'Vendor' },
    { 
      key: 'amount', 
      header: 'Amount',
      render: (value) => `$${value.toLocaleString()}`
    },
    { key: 'dueDate', header: 'Due Date' },
    { 
      key: 'status', 
      header: 'Status',
      render: (value) => (
        <Badge variant={
          value === 'Approved' ? 'default' : 
          value === 'Overdue' ? 'destructive' : 'secondary'
        }>
          {value}
        </Badge>
      )
    },
    { key: 'poNumber', header: 'PO Number' },
    { key: 'paymentTerms', header: 'Payment Terms' },
    {
      key: 'actions',
      header: 'Actions',
      render: (_, row) => (
        <div className="flex space-x-1">
          <Button variant="ghost" size="sm"><Eye className="h-4 w-4" /></Button>
          <Button variant="ghost" size="sm" onClick={() => handleEdit(row)}><Edit className="h-4 w-4" /></Button>
          <Button variant="ghost" size="sm" onClick={() => handleDelete(row.id)}><Trash2 className="h-4 w-4" /></Button>
        </div>
      )
    }
  ];

  const vendorColumns: Column[] = [
    { key: 'vendorCode', header: 'Vendor Code' },
    { key: 'name', header: 'Vendor Name' },
    { key: 'paymentTerms', header: 'Payment Terms' },
    { 
      key: 'totalOwed', 
      header: 'Total Owed',
      render: (value) => `$${value.toLocaleString()}`
    },
    { 
      key: 'status', 
      header: 'Status',
      render: (value) => (
        <Badge variant={value === 'Active' ? 'default' : 'secondary'}>{value}</Badge>
      )
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (_, row) => (
        <div className="flex space-x-1">
          <Button variant="ghost" size="sm"><Eye className="h-4 w-4" /></Button>
          <Button variant="ghost" size="sm"><Edit className="h-4 w-4" /></Button>
          <Button variant="ghost" size="sm"><Trash2 className="h-4 w-4" /></Button>
        </div>
      )
    }
  ];

  const paymentColumns: Column[] = [
    { key: 'runDate', header: 'Run Date' },
    { 
      key: 'totalAmount', 
      header: 'Total Amount',
      render: (value) => `$${value.toLocaleString()}`
    },
    { key: 'invoiceCount', header: 'Invoice Count' },
    { key: 'method', header: 'Payment Method' },
    { 
      key: 'status', 
      header: 'Status',
      render: (value) => (
        <Badge variant={value === 'Completed' ? 'default' : 'secondary'}>{value}</Badge>
      )
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (_, row) => (
        <div className="flex space-x-1">
          <Button variant="ghost" size="sm"><Eye className="h-4 w-4" /></Button>
          <Button variant="ghost" size="sm"><Edit className="h-4 w-4" /></Button>
          <Button variant="ghost" size="sm"><Download className="h-4 w-4" /></Button>
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
          onClick={() => navigate('/finance')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back
        </Button>
        <PageHeader
          title="Accounts Payable"
          description="Manage vendor invoices, payments, and supplier relationships"
          voiceIntroduction="Welcome to Accounts Payable management."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <p className="text-2xl font-bold">{invoices.length}</p>
                <p className="text-xs text-muted-foreground">Total Invoices</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <p className="text-2xl font-bold">$85K</p>
                <p className="text-xs text-muted-foreground">Total Outstanding</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <AlertCircle className="h-8 w-8 text-red-600 mr-3" />
              <div>
                <p className="text-2xl font-bold">1</p>
                <p className="text-xs text-muted-foreground">Overdue Invoices</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-purple-600 mr-3" />
              <div>
                <p className="text-2xl font-bold">{vendors.length}</p>
                <p className="text-xs text-muted-foreground">Active Vendors</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="invoices">Invoice Management</TabsTrigger>
          <TabsTrigger value="vendors">Vendor Management</TabsTrigger>
          <TabsTrigger value="payments">Payment Processing</TabsTrigger>
          <TabsTrigger value="analytics">Analytics & Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="invoices" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Vendor Invoices</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                  <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                    <DialogTrigger asChild>
                      <Button size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        New Invoice
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Create New Invoice</DialogTitle>
                      </DialogHeader>
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleCreate)} className="space-y-4">
                          <FormField
                            control={form.control}
                            name="vendor"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Vendor</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select vendor" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {vendors.map(vendor => (
                                      <SelectItem key={vendor.id} value={vendor.id}>
                                        {vendor.name}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="invoiceNumber"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Invoice Number</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="amount"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Amount</FormLabel>
                                <FormControl>
                                  <Input type="number" step="0.01" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="dueDate"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Due Date</FormLabel>
                                <FormControl>
                                  <Input type="date" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="poNumber"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>PO Number</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <div className="flex justify-end gap-2">
                            <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                              Cancel
                            </Button>
                            <Button type="submit">Create Invoice</Button>
                          </div>
                        </form>
                      </Form>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <DataTable columns={invoiceColumns} data={invoices} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vendors" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Vendor Management</CardTitle>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  New Vendor
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <DataTable columns={vendorColumns} data={vendors} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Payment Runs</CardTitle>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Payment Run
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <DataTable columns={paymentColumns} data={paymentRuns} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Payment Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Average Payment Time</span>
                    <span className="font-semibold">25 days</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cash Discount Utilization</span>
                    <span className="font-semibold text-green-600">85%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Vendor Performance Score</span>
                    <span className="font-semibold">92%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Outstanding Payables</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>0-30 Days</span>
                    <span className="font-semibold">$40,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>31-60 Days</span>
                    <span className="font-semibold">$25,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>60+ Days</span>
                    <span className="font-semibold text-red-600">$45,000</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Invoice</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleUpdate)} className="space-y-4">
              <FormField
                control={form.control}
                name="vendor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vendor</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select vendor" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {vendors.map(vendor => (
                          <SelectItem key={vendor.id} value={vendor.id}>
                            {vendor.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="invoiceNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Invoice Number</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Due Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="poNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>PO Number</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Update Invoice</Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AccountsPayable;

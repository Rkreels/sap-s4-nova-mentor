import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Input } from '../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { ArrowLeft, Plus, Edit, Trash2, Eye, Download, Filter, Calendar, Users, DollarSign, FileText, AlertCircle, TrendingUp } from 'lucide-react';
import PageHeader from '../../components/page/PageHeader';
import DataTable, { Column } from '../../components/data/DataTable';
import { Badge } from '../../components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../components/ui/form';
import { useForm } from 'react-hook-form';
import { useVoiceAssistantContext } from '../../context/VoiceAssistantContext';
import { useVoiceAssistant } from '../../hooks/useVoiceAssistant';

const AccountsReceivable: React.FC = () => {
  const navigate = useNavigate();
  const { isEnabled } = useVoiceAssistantContext();
  const { speak } = useVoiceAssistant();
  const [activeTab, setActiveTab] = useState('invoices');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const form = useForm({
    defaultValues: {
      customer: '',
      invoiceNumber: '',
      amount: '',
      dueDate: '',
      description: '',
      salesOrder: ''
    }
  });

  React.useEffect(() => {
    if (isEnabled) {
      speak('You are now in Accounts Receivable. Here you can manage customer invoices, payment collections, and receivables aging in the order-to-cash cycle.');
    }
  }, [isEnabled, speak]);

  const [invoices, setInvoices] = useState([
    { 
      id: 'AR-001',
      invoiceNumber: 'INV-C-2024-001',
      customer: 'Acme Corporation',
      customerId: 'C001',
      amount: 35000.00,
      dueDate: '2024-06-20',
      status: 'Outstanding',
      salesOrder: 'SO-2024-001',
      invoiceDate: '2024-05-21',
      paymentTerms: 'Net 30',
      description: 'Product Sales'
    },
    { 
      id: 'AR-002',
      invoiceNumber: 'INV-C-2024-002',
      customer: 'Global Tech Solutions',
      customerId: 'C002',
      amount: 22000.00,
      dueDate: '2024-06-15',
      status: 'Paid',
      salesOrder: 'SO-2024-002',
      invoiceDate: '2024-05-16',
      paymentTerms: 'Net 30',
      description: 'Consulting Services'
    },
    { 
      id: 'AR-003',
      invoiceNumber: 'INV-C-2024-003',
      customer: 'Manufacturing Plus',
      customerId: 'C003',
      amount: 18500.00,
      dueDate: '2024-05-30',
      status: 'Overdue',
      salesOrder: 'SO-2024-003',
      invoiceDate: '2024-04-30',
      paymentTerms: 'Net 30',
      description: 'Equipment Rental'
    }
  ]);

  const [customers, setCustomers] = useState([
    { id: 'C001', customerCode: 'ACME001', name: 'Acme Corporation', paymentTerms: 'Net 30', status: 'Active', totalOwed: 35000, creditLimit: 100000 },
    { id: 'C002', customerCode: 'GLOB002', name: 'Global Tech Solutions', paymentTerms: 'Net 30', status: 'Active', totalOwed: 0, creditLimit: 75000 },
    { id: 'C003', customerCode: 'MANU003', name: 'Manufacturing Plus', paymentTerms: 'Net 30', status: 'Active', totalOwed: 18500, creditLimit: 50000 },
    { id: 'C004', customerCode: 'SERV004', name: 'Service Industries Inc', paymentTerms: 'Net 45', status: 'Active', totalOwed: 0, creditLimit: 60000 }
  ]);

  const [collections, setCollections] = useState([
    { id: 'COL-001', date: '2024-05-22', customer: 'Global Tech Solutions', amount: 22000, method: 'Bank Transfer', status: 'Completed', reference: 'TXN-001' },
    { id: 'COL-002', date: '2024-05-20', customer: 'Acme Corporation', amount: 15000, method: 'Check', status: 'Pending', reference: 'CHK-001' },
    { id: 'COL-003', date: '2024-05-18', customer: 'Manufacturing Plus', amount: 8500, method: 'Credit Card', status: 'Completed', reference: 'CC-001' }
  ]);

  const [agingBuckets, setAgingBuckets] = useState([
    { range: '0-30 Days', amount: 35000, percentage: 46.7, count: 1 },
    { range: '31-60 Days', amount: 22000, percentage: 29.3, count: 1 },
    { range: '61-90 Days', amount: 18500, percentage: 24.7, count: 1 },
    { range: '90+ Days', amount: 0, percentage: 0, count: 0 }
  ]);

  const handleCreate = (data: any) => {
    const newInvoice = {
      id: `AR-${String(invoices.length + 1).padStart(3, '0')}`,
      invoiceNumber: data.invoiceNumber,
      customer: customers.find(c => c.id === data.customer)?.name || '',
      customerId: data.customer,
      amount: parseFloat(data.amount),
      dueDate: data.dueDate,
      status: 'Outstanding',
      salesOrder: data.salesOrder,
      invoiceDate: new Date().toISOString().split('T')[0],
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
      customer: invoice.customerId,
      invoiceNumber: invoice.invoiceNumber,
      amount: invoice.amount.toString(),
      dueDate: invoice.dueDate,
      description: invoice.description,
      salesOrder: invoice.salesOrder
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdate = (data: any) => {
    setInvoices(invoices.map(i => 
      i.id === selectedInvoice?.id 
        ? { 
            ...i, 
            invoiceNumber: data.invoiceNumber,
            customer: customers.find(c => c.id === data.customer)?.name || '',
            customerId: data.customer,
            amount: parseFloat(data.amount),
            dueDate: data.dueDate,
            description: data.description,
            salesOrder: data.salesOrder
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
    { key: 'customer', header: 'Customer' },
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
          value === 'Paid' ? 'default' : 
          value === 'Overdue' ? 'destructive' : 'secondary'
        }>
          {value}
        </Badge>
      )
    },
    { key: 'salesOrder', header: 'Sales Order' },
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

  const customerColumns: Column[] = [
    { key: 'customerCode', header: 'Customer Code' },
    { key: 'name', header: 'Customer Name' },
    { key: 'paymentTerms', header: 'Payment Terms' },
    { 
      key: 'totalOwed', 
      header: 'Total Owed',
      render: (value) => `$${value.toLocaleString()}`
    },
    { 
      key: 'creditLimit', 
      header: 'Credit Limit',
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

  const collectionColumns: Column[] = [
    { key: 'date', header: 'Collection Date' },
    { key: 'customer', header: 'Customer' },
    { 
      key: 'amount', 
      header: 'Amount',
      render: (value) => `$${value.toLocaleString()}`
    },
    { key: 'method', header: 'Payment Method' },
    { key: 'reference', header: 'Reference' },
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

  const agingColumns: Column[] = [
    { key: 'range', header: 'Age Range' },
    { 
      key: 'amount', 
      header: 'Amount',
      render: (value) => `$${value.toLocaleString()}`
    },
    { 
      key: 'percentage', 
      header: 'Percentage',
      render: (value) => `${value}%`
    },
    { key: 'count', header: 'Invoice Count' }
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
          title="Accounts Receivable"
          description="Manage customer invoices, payments, and receivables aging"
          voiceIntroduction="Welcome to Accounts Receivable management."
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
                <p className="text-2xl font-bold">$53.5K</p>
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
              <TrendingUp className="h-8 w-8 text-purple-600 mr-3" />
              <div>
                <p className="text-2xl font-bold">95%</p>
                <p className="text-xs text-muted-foreground">Collection Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="invoices">Invoice Management</TabsTrigger>
          <TabsTrigger value="customers">Customer Management</TabsTrigger>
          <TabsTrigger value="collections">Collections</TabsTrigger>
          <TabsTrigger value="aging">Aging Analysis</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="invoices" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Customer Invoices</CardTitle>
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
                            name="customer"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Customer</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select customer" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {customers.map(customer => (
                                      <SelectItem key={customer.id} value={customer.id}>
                                        {customer.name}
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
                            name="salesOrder"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Sales Order</FormLabel>
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

        <TabsContent value="customers" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Customer Management</CardTitle>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  New Customer
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <DataTable columns={customerColumns} data={customers} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="collections" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Collection Activities</CardTitle>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Record Payment
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <DataTable columns={collectionColumns} data={collections} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="aging" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Receivables Aging Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable columns={agingColumns} data={agingBuckets} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Collection Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Average Collection Period</span>
                    <span className="font-semibold">28 days</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Collection Efficiency</span>
                    <span className="font-semibold text-green-600">95%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Days Sales Outstanding</span>
                    <span className="font-semibold">32 days</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Outstanding Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Current (0-30)</span>
                    <span className="font-semibold">$35,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Past Due (31-60)</span>
                    <span className="font-semibold text-yellow-600">$22,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Overdue (60+)</span>
                    <span className="font-semibold text-red-600">$18,500</span>
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
                name="customer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select customer" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {customers.map(customer => (
                          <SelectItem key={customer.id} value={customer.id}>
                            {customer.name}
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
                name="salesOrder"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sales Order</FormLabel>
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

export default AccountsReceivable;

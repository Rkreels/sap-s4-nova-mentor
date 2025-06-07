import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Input } from '../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { ArrowLeft, Plus, Edit, Trash2, Eye, Download, Filter, Calendar, Search, FileText, BarChart } from 'lucide-react';
import PageHeader from '../../components/page/PageHeader';
import DataTable, { Column } from '../../components/data/DataTable';
import { Badge } from '../../components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../components/ui/form';
import { useForm } from 'react-hook-form';
import { useVoiceAssistantContext } from '../../context/VoiceAssistantContext';
import { useVoiceAssistant } from '../../hooks/useVoiceAssistant';

const GeneralLedger: React.FC = () => {
  const navigate = useNavigate();
  const { isEnabled } = useVoiceAssistantContext();
  const { speak } = useVoiceAssistant();
  const [activeTab, setActiveTab] = useState('entries');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);

  const form = useForm({
    defaultValues: {
      account: '',
      description: '',
      debit: '',
      credit: '',
      reference: '',
      businessArea: ''
    }
  });

  React.useEffect(() => {
    if (isEnabled) {
      speak('You are now in the General Ledger page. Here you can manage general ledger accounts, journal entries, and related activities.');
    }
  }, [isEnabled, speak]);

  const [ledgerEntries, setLedgerEntries] = useState([
    { 
      id: 'GL-001',
      document: '1000157243', 
      postingDate: '2024-05-20', 
      accountNumber: '100000', 
      accountName: 'Cash in Bank', 
      debit: 25000.00,
      credit: 0,
      amountInUSD: 25000.00,
      businessArea: 'Finance',
      reference: 'Payment Receipt',
      status: 'Posted'
    },
    { 
      id: 'GL-002',
      document: '1000157244', 
      postingDate: '2024-05-20', 
      accountNumber: '400000', 
      accountName: 'Sales Revenue', 
      debit: 0,
      credit: 25000.00,
      amountInUSD: -25000.00,
      businessArea: 'Sales',
      reference: 'Invoice Payment',
      status: 'Posted'
    },
    { 
      id: 'GL-003',
      document: '1000157245', 
      postingDate: '2024-05-19', 
      accountNumber: '200000', 
      accountName: 'Accounts Payable', 
      debit: 12750.00,
      credit: 0,
      amountInUSD: 12750.00,
      businessArea: 'Procurement',
      reference: 'Vendor Payment',
      status: 'Posted'
    }
  ]);

  const [chartOfAccounts, setChartOfAccounts] = useState([
    { id: 'COA-001', accountNumber: '100000', accountName: 'Cash in Bank', accountType: 'Asset', status: 'Active', balance: 125000 },
    { id: 'COA-002', accountNumber: '110000', accountName: 'Accounts Receivable', accountType: 'Asset', status: 'Active', balance: 85000 },
    { id: 'COA-003', accountNumber: '200000', accountName: 'Accounts Payable', accountType: 'Liability', status: 'Active', balance: 45000 },
    { id: 'COA-004', accountNumber: '400000', accountName: 'Sales Revenue', accountType: 'Revenue', status: 'Active', balance: 250000 }
  ]);

  const [journalEntries, setJournalEntries] = useState([
    { id: 'JE-001', entryNumber: 'JE2024001', date: '2024-05-20', description: 'Monthly Depreciation', totalDebit: 5000, totalCredit: 5000, status: 'Posted', createdBy: 'John Doe' },
    { id: 'JE-002', entryNumber: 'JE2024002', date: '2024-05-19', description: 'Accrued Expenses', totalDebit: 3500, totalCredit: 3500, status: 'Draft', createdBy: 'Jane Smith' },
    { id: 'JE-003', entryNumber: 'JE2024003', date: '2024-05-18', description: 'Bank Reconciliation', totalDebit: 1200, totalCredit: 1200, status: 'Posted', createdBy: 'Mike Johnson' }
  ]);

  const handleCreate = (data: any) => {
    const newEntry = {
      id: `GL-${String(ledgerEntries.length + 1).padStart(3, '0')}`,
      document: `10001${Math.floor(Math.random() * 10000)}`,
      postingDate: new Date().toISOString().split('T')[0],
      accountNumber: data.account,
      accountName: chartOfAccounts.find(a => a.accountNumber === data.account)?.accountName || '',
      debit: parseFloat(data.debit) || 0,
      credit: parseFloat(data.credit) || 0,
      amountInUSD: (parseFloat(data.debit) || 0) - (parseFloat(data.credit) || 0),
      businessArea: data.businessArea,
      reference: data.reference,
      status: 'Draft'
    };
    setLedgerEntries([...ledgerEntries, newEntry]);
    setIsCreateDialogOpen(false);
    form.reset();
  };

  const handleEdit = (entry: any) => {
    setSelectedEntry(entry);
    form.reset({
      account: entry.accountNumber,
      description: entry.accountName,
      debit: entry.debit.toString(),
      credit: entry.credit.toString(),
      reference: entry.reference,
      businessArea: entry.businessArea
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdate = (data: any) => {
    setLedgerEntries(ledgerEntries.map(e => 
      e.id === selectedEntry?.id 
        ? { 
            ...e, 
            accountNumber: data.account,
            accountName: data.description,
            debit: parseFloat(data.debit) || 0,
            credit: parseFloat(data.credit) || 0,
            reference: data.reference,
            businessArea: data.businessArea
          } 
        : e
    ));
    setIsEditDialogOpen(false);
    setSelectedEntry(null);
  };

  const handleDelete = (id: string) => {
    setLedgerEntries(ledgerEntries.filter(e => e.id !== id));
  };

  const entryColumns: Column[] = [
    { key: 'document', header: 'Document' },
    { key: 'postingDate', header: 'Posting Date' },
    { key: 'accountNumber', header: 'Account' },
    { key: 'accountName', header: 'Account Name' },
    { 
      key: 'debit', 
      header: 'Debit',
      render: (value) => value > 0 ? `$${value.toLocaleString()}` : ''
    },
    { 
      key: 'credit', 
      header: 'Credit',
      render: (value) => value > 0 ? `$${value.toLocaleString()}` : ''
    },
    { key: 'businessArea', header: 'Business Area' },
    { 
      key: 'status', 
      header: 'Status',
      render: (value) => (
        <Badge variant={value === 'Posted' ? 'default' : 'secondary'}>{value}</Badge>
      )
    },
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

  const accountColumns: Column[] = [
    { key: 'accountNumber', header: 'Account Number' },
    { key: 'accountName', header: 'Account Name' },
    { key: 'accountType', header: 'Account Type' },
    { 
      key: 'balance', 
      header: 'Balance',
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

  const journalColumns: Column[] = [
    { key: 'entryNumber', header: 'Entry Number' },
    { key: 'date', header: 'Date' },
    { key: 'description', header: 'Description' },
    { 
      key: 'totalDebit', 
      header: 'Total Debit',
      render: (value) => `$${value.toLocaleString()}`
    },
    { 
      key: 'totalCredit', 
      header: 'Total Credit',
      render: (value) => `$${value.toLocaleString()}`
    },
    { key: 'createdBy', header: 'Created By' },
    { 
      key: 'status', 
      header: 'Status',
      render: (value) => (
        <Badge variant={value === 'Posted' ? 'default' : 'secondary'}>{value}</Badge>
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
          title="General Ledger"
          description="Manage general ledger accounts, journal entries, and related activities"
          voiceIntroduction="Welcome to General Ledger. Here you can manage your general ledger accounts and journal entries."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <p className="text-2xl font-bold">{ledgerEntries.length}</p>
                <p className="text-xs text-muted-foreground">Total Entries</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <BarChart className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <p className="text-2xl font-bold">{chartOfAccounts.length}</p>
                <p className="text-xs text-muted-foreground">Chart of Accounts</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-purple-600 mr-3" />
              <div>
                <p className="text-2xl font-bold">{journalEntries.length}</p>
                <p className="text-xs text-muted-foreground">Journal Entries</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <BarChart className="h-8 w-8 text-orange-600 mr-3" />
              <div>
                <p className="text-2xl font-bold">$0.00</p>
                <p className="text-xs text-muted-foreground">Trial Balance</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="entries">Ledger Entries</TabsTrigger>
          <TabsTrigger value="accounts">Chart of Accounts</TabsTrigger>
          <TabsTrigger value="journal">Journal Entries</TabsTrigger>
          <TabsTrigger value="reports">Reports & Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="entries" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>General Ledger Entries</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                  <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                    <DialogTrigger asChild>
                      <Button size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        New Entry
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Create New Ledger Entry</DialogTitle>
                      </DialogHeader>
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleCreate)} className="space-y-4">
                          <FormField
                            control={form.control}
                            name="account"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Account Number</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select account" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {chartOfAccounts.map(account => (
                                      <SelectItem key={account.id} value={account.accountNumber}>
                                        {account.accountNumber} - {account.accountName}
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
                            name="debit"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Debit Amount</FormLabel>
                                <FormControl>
                                  <Input type="number" step="0.01" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="credit"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Credit Amount</FormLabel>
                                <FormControl>
                                  <Input type="number" step="0.01" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="reference"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Reference</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="businessArea"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Business Area</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select business area" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="Finance">Finance</SelectItem>
                                    <SelectItem value="Sales">Sales</SelectItem>
                                    <SelectItem value="Procurement">Procurement</SelectItem>
                                    <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <div className="flex justify-end gap-2">
                            <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                              Cancel
                            </Button>
                            <Button type="submit">Create Entry</Button>
                          </div>
                        </form>
                      </Form>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <DataTable columns={entryColumns} data={ledgerEntries} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="accounts" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Chart of Accounts</CardTitle>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  New Account
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <DataTable columns={accountColumns} data={chartOfAccounts} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="journal" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Journal Entries</CardTitle>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  New Journal Entry
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <DataTable columns={journalColumns} data={journalEntries} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Trial Balance Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium">Total Debits</span>
                    <span className="font-semibold text-blue-600">$37,750.00</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium">Total Credits</span>
                    <span className="font-semibold text-blue-600">$37,750.00</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium">Balance</span>
                    <span className="font-semibold">$0.00</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Account Balances</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Assets</span>
                    <span className="font-semibold">$210,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Liabilities</span>
                    <span className="font-semibold">$45,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Equity</span>
                    <span className="font-semibold">$165,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Revenue</span>
                    <span className="font-semibold">$250,000</span>
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
            <DialogTitle>Edit Ledger Entry</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleUpdate)} className="space-y-4">
              <FormField
                control={form.control}
                name="account"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account Number</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select account" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {chartOfAccounts.map(account => (
                          <SelectItem key={account.id} value={account.accountNumber}>
                            {account.accountNumber} - {account.accountName}
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
                name="debit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Debit Amount</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="credit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Credit Amount</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="reference"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reference</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="businessArea"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Area</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select business area" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Finance">Finance</SelectItem>
                        <SelectItem value="Sales">Sales</SelectItem>
                        <SelectItem value="Procurement">Procurement</SelectItem>
                        <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Update Entry</Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GeneralLedger;

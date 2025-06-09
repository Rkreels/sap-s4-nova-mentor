
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { ArrowLeft, Plus, FileText, CheckCircle, AlertCircle, DollarSign } from 'lucide-react';
import PageHeader from '../../components/page/PageHeader';
import { useVoiceAssistantContext } from '../../context/VoiceAssistantContext';
import { useVoiceAssistant } from '../../hooks/useVoiceAssistant';
import EnhancedDataTable, { EnhancedColumn, TableAction } from '../../components/data/EnhancedDataTable';
import { useToast } from '../../hooks/use-toast';

interface Invoice {
  id: string;
  invoiceNumber: string;
  poNumber: string;
  supplier: string;
  invoiceDate: string;
  dueDate: string;
  amount: number;
  currency: string;
  status: 'Pending' | 'Verified' | 'Approved' | 'Rejected' | 'Paid';
  verifier: string;
  discrepancies: number;
}

const InvoiceVerification: React.FC = () => {
  const navigate = useNavigate();
  const { isEnabled } = useVoiceAssistantContext();
  const { speak } = useVoiceAssistant();
  const [activeTab, setActiveTab] = useState('invoices');
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    if (isEnabled) {
      speak('Welcome to Invoice Verification. Verify and approve supplier invoices for payment processing.');
    }
  }, [isEnabled, speak]);

  useEffect(() => {
    const sampleInvoices: Invoice[] = [
      {
        id: 'iv-001',
        invoiceNumber: 'INV-2025-0156',
        poNumber: 'PO-2025-001',
        supplier: 'Dell Technologies',
        invoiceDate: '2025-01-26',
        dueDate: '2025-02-25',
        amount: 8750,
        currency: 'USD',
        status: 'Verified',
        verifier: 'Mike Wilson',
        discrepancies: 0
      },
      {
        id: 'iv-002',
        invoiceNumber: 'INV-2025-0157',
        poNumber: 'PO-2025-002',
        supplier: 'Office Depot Inc.',
        invoiceDate: '2025-01-25',
        dueDate: '2025-02-24',
        amount: 1250,
        currency: 'USD',
        status: 'Pending',
        verifier: '',
        discrepancies: 1
      }
    ];
    setInvoices(sampleInvoices);
  }, []);

  const getStatusColor = (status: string) => {
    const colors = {
      'Pending': 'bg-yellow-100 text-yellow-800',
      'Verified': 'bg-blue-100 text-blue-800',
      'Approved': 'bg-green-100 text-green-800',
      'Rejected': 'bg-red-100 text-red-800',
      'Paid': 'bg-gray-100 text-gray-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const columns: EnhancedColumn[] = [
    { key: 'invoiceNumber', header: 'Invoice #', sortable: true, searchable: true },
    { key: 'poNumber', header: 'PO Number', sortable: true, searchable: true },
    { key: 'supplier', header: 'Supplier', sortable: true, searchable: true },
    { key: 'invoiceDate', header: 'Invoice Date', sortable: true },
    { key: 'dueDate', header: 'Due Date', sortable: true },
    { 
      key: 'amount', 
      header: 'Amount',
      sortable: true,
      render: (value: number, row: Invoice) => `${row.currency} ${value.toLocaleString()}`
    },
    { 
      key: 'status', 
      header: 'Status',
      filterable: true,
      filterOptions: [
        { label: 'Pending', value: 'Pending' },
        { label: 'Verified', value: 'Verified' },
        { label: 'Approved', value: 'Approved' },
        { label: 'Rejected', value: 'Rejected' },
        { label: 'Paid', value: 'Paid' }
      ],
      render: (value: string) => (
        <Badge className={getStatusColor(value)}>
          {value}
        </Badge>
      )
    },
    { key: 'verifier', header: 'Verifier', searchable: true },
    { 
      key: 'discrepancies', 
      header: 'Issues',
      render: (value: number) => value > 0 ? (
        <Badge variant="destructive">{value}</Badge>
      ) : (
        <Badge variant="outline">None</Badge>
      )
    }
  ];

  const actions: TableAction[] = [
    {
      label: 'Verify',
      icon: <CheckCircle className="h-4 w-4" />,
      onClick: (row: Invoice) => {
        toast({
          title: 'Verify Invoice',
          description: `Verifying invoice ${row.invoiceNumber}`,
        });
      },
      variant: 'default',
      condition: (row: Invoice) => row.status === 'Pending'
    },
    {
      label: 'Approve',
      icon: <DollarSign className="h-4 w-4" />,
      onClick: (row: Invoice) => {
        toast({
          title: 'Approve Invoice',
          description: `Approving invoice ${row.invoiceNumber} for payment`,
        });
      },
      variant: 'default',
      condition: (row: Invoice) => row.status === 'Verified'
    },
    {
      label: 'Report Issue',
      icon: <AlertCircle className="h-4 w-4" />,
      onClick: (row: Invoice) => {
        toast({
          title: 'Report Issue',
          description: `Reporting discrepancy for ${row.invoiceNumber}`,
        });
      },
      variant: 'destructive'
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
          title="Invoice Verification"
          description="Verify and approve supplier invoices for payment processing"
          voiceIntroduction="Welcome to Invoice Verification for comprehensive invoice processing."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{invoices.length}</div>
            <div className="text-sm text-muted-foreground">Total Invoices</div>
            <div className="text-sm text-blue-600">This month</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">
              {invoices.filter(i => i.status === 'Pending').length}
            </div>
            <div className="text-sm text-muted-foreground">Pending Verification</div>
            <div className="text-sm text-orange-600">Needs action</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">
              ${invoices.reduce((sum, i) => sum + i.amount, 0).toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">Total Value</div>
            <div className="text-sm text-green-600">This month</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">2.1</div>
            <div className="text-sm text-muted-foreground">Avg. Processing Days</div>
            <div className="text-sm text-green-600">Below target</div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="pending">Pending Verification</TabsTrigger>
          <TabsTrigger value="discrepancies">Discrepancies</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="invoices" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                Invoice Register
                <Button onClick={() => toast({ title: 'Record Invoice', description: 'Opening invoice entry form' })}>
                  <Plus className="h-4 w-4 mr-2" />
                  Record Invoice
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <EnhancedDataTable 
                columns={columns}
                data={invoices}
                actions={actions}
                searchPlaceholder="Search invoices by number, PO, or supplier..."
                exportable={true}
                refreshable={true}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {invoices.filter(i => i.status === 'Pending').map((invoice) => (
              <Card key={invoice.id}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center justify-between">
                    {invoice.invoiceNumber}
                    <Badge className={getStatusColor(invoice.status)}>
                      {invoice.status}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>PO Number:</span>
                      <span className="font-medium">{invoice.poNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Supplier:</span>
                      <span className="font-medium">{invoice.supplier}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Amount:</span>
                      <span className="font-medium">{invoice.currency} {invoice.amount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Due Date:</span>
                      <span className="font-medium">{invoice.dueDate}</span>
                    </div>
                    {invoice.discrepancies > 0 && (
                      <div className="flex justify-between">
                        <span>Issues:</span>
                        <Badge variant="destructive">{invoice.discrepancies}</Badge>
                      </div>
                    )}
                    <div className="flex space-x-2 mt-4">
                      <Button size="sm">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Verify
                      </Button>
                      <Button size="sm" variant="outline">
                        <FileText className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="discrepancies" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Invoice Discrepancies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {invoices.filter(i => i.discrepancies > 0).map((invoice) => (
                  <div key={invoice.id} className="p-4 border rounded border-red-200 bg-red-50">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold">{invoice.invoiceNumber}</h4>
                        <p className="text-sm text-muted-foreground">{invoice.supplier}</p>
                      </div>
                      <Badge variant="destructive">{invoice.discrepancies} issues</Badge>
                    </div>
                    <p className="text-sm mb-3">
                      Amount: {invoice.currency} {invoice.amount.toLocaleString()}
                    </p>
                    <div className="flex space-x-2">
                      <Button size="sm">Resolve</Button>
                      <Button size="sm" variant="outline">Contact Supplier</Button>
                    </div>
                  </div>
                ))}
                {invoices.filter(i => i.discrepancies > 0).length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No discrepancies found. All invoices are in good order.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Processing Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded">
                    <h4 className="font-semibold mb-2">Monthly Statistics</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Total Invoices:</span>
                        <span className="font-medium">{invoices.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Processed:</span>
                        <span className="font-medium">{invoices.filter(i => i.status !== 'Pending').length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Avg. Processing Time:</span>
                        <span className="font-medium">2.1 days</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Status Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['Pending', 'Verified', 'Approved', 'Rejected', 'Paid'].map((status) => {
                    const count = invoices.filter(i => i.status === status).length;
                    const percentage = invoices.length > 0 ? Math.round((count / invoices.length) * 100) : 0;
                    return (
                      <div key={status} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>{status}</span>
                          <span>{count} ({percentage}%)</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${percentage}%` }}
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
      </Tabs>
    </div>
  );
};

export default InvoiceVerification;

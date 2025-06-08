
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { ArrowLeft, Plus, Edit, Eye, FileText, Calendar, AlertTriangle, Search, Filter, Download, Upload, Clock, DollarSign } from 'lucide-react';
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

interface Contract {
  id: string;
  contractNumber: string;
  supplier: string;
  type: 'Framework Agreement' | 'Service Agreement' | 'Purchase Agreement' | 'Master Agreement' | 'One-time Contract';
  startDate: string;
  endDate: string;
  value: number;
  currency: string;
  status: 'Active' | 'Draft' | 'Expiring Soon' | 'Expired' | 'Terminated' | 'Under Review';
  autoRenewal: boolean;
  daysToExpiry: number;
  owner: string;
  department: string;
  paymentTerms: string;
  deliveryTerms: string;
  penalties: string;
  notes: string;
  created: string;
  lastModified: string;
}

const ContractManagement: React.FC = () => {
  const navigate = useNavigate();
  const { isEnabled } = useVoiceAssistantContext();
  const { speak } = useVoiceAssistant();
  const [activeTab, setActiveTab] = useState('contracts');
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isEnabled) {
      speak('Welcome to Contract Management. Manage supplier contracts, agreements, and terms.');
    }
  }, [isEnabled, speak]);

  // Sample data
  useEffect(() => {
    const sampleContracts: Contract[] = [
      {
        id: 'CTR-001',
        contractNumber: 'CTR-2025-001',
        supplier: 'Tech Components Inc.',
        type: 'Framework Agreement',
        startDate: '2025-01-01',
        endDate: '2025-12-31',
        value: 500000,
        currency: 'USD',
        status: 'Active',
        autoRenewal: true,
        daysToExpiry: 335,
        owner: 'John Smith',
        department: 'Procurement',
        paymentTerms: 'Net 30',
        deliveryTerms: 'FOB Destination',
        penalties: '2% per day for late delivery',
        notes: 'Annual framework agreement for electronic components',
        created: '2024-12-01',
        lastModified: '2025-01-01'
      },
      {
        id: 'CTR-002',
        contractNumber: 'CTR-2024-078',
        supplier: 'Office Supplies Ltd.',
        type: 'Service Agreement',
        startDate: '2024-06-01',
        endDate: '2025-05-31',
        value: 125000,
        currency: 'USD',
        status: 'Active',
        autoRenewal: false,
        daysToExpiry: 120,
        owner: 'Sarah Johnson',
        department: 'Operations',
        paymentTerms: 'Net 45',
        deliveryTerms: 'DDP',
        penalties: '1% per week for late delivery',
        notes: 'Office supplies and maintenance services',
        created: '2024-05-15',
        lastModified: '2024-06-01'
      },
      {
        id: 'CTR-003',
        contractNumber: 'CTR-2024-065',
        supplier: 'Industrial Parts Co.',
        type: 'Purchase Agreement',
        startDate: '2024-03-15',
        endDate: '2025-03-14',
        value: 750000,
        currency: 'USD',
        status: 'Expiring Soon',
        autoRenewal: true,
        daysToExpiry: 42,
        owner: 'Mike Wilson',
        department: 'Manufacturing',
        paymentTerms: 'Net 30',
        deliveryTerms: 'EXW',
        penalties: '3% per day for late delivery',
        notes: 'Industrial equipment and spare parts',
        created: '2024-02-20',
        lastModified: '2024-03-15'
      },
      {
        id: 'CTR-004',
        contractNumber: 'CTR-2025-002',
        supplier: 'Global Logistics Inc.',
        type: 'Service Agreement',
        startDate: '2025-01-15',
        endDate: '2026-01-14',
        value: 300000,
        currency: 'USD',
        status: 'Draft',
        autoRenewal: false,
        daysToExpiry: 365,
        owner: 'Lisa Chen',
        department: 'Logistics',
        paymentTerms: 'Net 30',
        deliveryTerms: 'CIF',
        penalties: 'SLA-based penalties',
        notes: 'Transportation and warehousing services',
        created: '2025-01-10',
        lastModified: '2025-01-15'
      }
    ];

    setTimeout(() => {
      setContracts(sampleContracts);
      setIsLoading(false);
    }, 1000);
  }, []);

  const filteredContracts = contracts.filter(contract => {
    const matchesSearch = contract.contractNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contract.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contract.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || contract.status.toLowerCase().includes(filterStatus);
    return matchesSearch && matchesFilter;
  });

  const handleCreateContract = () => {
    setSelectedContract(null);
    setIsEditing(false);
    setIsDialogOpen(true);
  };

  const handleEditContract = (contract: Contract) => {
    setSelectedContract(contract);
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const handleDeleteContract = (contractId: string) => {
    setContracts(prev => prev.filter(c => c.id !== contractId));
    toast({
      title: 'Contract Deleted',
      description: 'Contract has been successfully removed.',
    });
  };

  const handleRenewContract = (contractId: string) => {
    setContracts(prev => prev.map(c => 
      c.id === contractId ? { 
        ...c, 
        endDate: new Date(new Date(c.endDate).getTime() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        status: 'Active' as const,
        daysToExpiry: 365
      } : c
    ));
    toast({
      title: 'Contract Renewed',
      description: 'Contract has been successfully renewed for another year.',
    });
  };

  const handleSaveContract = (contractData: Partial<Contract>) => {
    if (isEditing && selectedContract) {
      setContracts(prev => prev.map(c => 
        c.id === selectedContract.id ? { 
          ...c, 
          ...contractData,
          lastModified: new Date().toISOString().split('T')[0]
        } : c
      ));
      toast({
        title: 'Contract Updated',
        description: 'Contract has been successfully updated.',
      });
    } else {
      const newContract: Contract = {
        id: `CTR-${String(contracts.length + 1).padStart(3, '0')}`,
        contractNumber: `CTR-2025-${String(contracts.length + 1).padStart(3, '0')}`,
        created: new Date().toISOString().split('T')[0],
        lastModified: new Date().toISOString().split('T')[0],
        daysToExpiry: 0,
        ...contractData as Contract
      };
      
      // Calculate days to expiry
      if (newContract.endDate) {
        const today = new Date();
        const endDate = new Date(newContract.endDate);
        newContract.daysToExpiry = Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      }
      
      setContracts(prev => [...prev, newContract]);
      toast({
        title: 'Contract Created',
        description: 'New contract has been successfully created.',
      });
    }
    setIsDialogOpen(false);
  };

  const contractColumns = [
    { key: 'contractNumber', header: 'Contract Number' },
    { key: 'supplier', header: 'Supplier' },
    { key: 'type', header: 'Contract Type' },
    { key: 'startDate', header: 'Start Date' },
    { key: 'endDate', header: 'End Date' },
    { 
      key: 'value', 
      header: 'Contract Value',
      render: (value: number, row: Contract) => `$${value.toLocaleString()}`
    },
    { 
      key: 'status', 
      header: 'Status',
      render: (value: string) => {
        const colors = {
          'Active': 'bg-green-100 text-green-800',
          'Draft': 'bg-gray-100 text-gray-800',
          'Expiring Soon': 'bg-yellow-100 text-yellow-800',
          'Expired': 'bg-red-100 text-red-800',
          'Terminated': 'bg-red-100 text-red-800',
          'Under Review': 'bg-blue-100 text-blue-800'
        };
        return (
          <Badge className={colors[value as keyof typeof colors]}>
            {value}
          </Badge>
        );
      }
    },
    { 
      key: 'daysToExpiry', 
      header: 'Days to Expiry',
      render: (value: number) => (
        <span className={value <= 60 ? 'text-red-600 font-medium' : value <= 120 ? 'text-yellow-600' : 'text-gray-600'}>
          {value} days
        </span>
      )
    },
    { 
      key: 'actions', 
      header: 'Actions',
      render: (_, row: Contract) => (
        <div className="flex space-x-2">
          {row.status === 'Expiring Soon' && (
            <Button variant="ghost" size="sm" onClick={() => handleRenewContract(row.id)}>
              <Clock className="h-4 w-4 text-blue-600" />
            </Button>
          )}
          <Button variant="ghost" size="sm" onClick={() => handleEditContract(row)}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <FileText className="h-4 w-4" />
          </Button>
        </div>
      )
    }
  ];

  const contractMetrics = [
    { name: 'Active Contracts', value: contracts.filter(c => c.status === 'Active').length, change: '+5%' },
    { name: 'Expiring Soon', value: contracts.filter(c => c.status === 'Expiring Soon').length, change: '+12%' },
    { name: 'Total Value', value: `$${contracts.reduce((sum, c) => sum + c.value, 0).toLocaleString()}`, change: '+8%' },
    { name: 'Auto-Renewal Rate', value: `${((contracts.filter(c => c.autoRenewal).length / contracts.length) * 100).toFixed(0)}%`, change: '+3%' }
  ];

  const typeData = contracts.reduce((acc, contract) => {
    acc[contract.type] = (acc[contract.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(typeData).map(([type, count]) => ({
    type,
    count,
    value: contracts.filter(c => c.type === type).reduce((sum, c) => sum + c.value, 0)
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
          title="Contract Management"
          description="Manage supplier contracts, agreements, and terms"
          voiceIntroduction="Welcome to Contract Management."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {contractMetrics.map((metric, index) => (
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
        <h2 className="text-xl font-semibold">Contract Portfolio</h2>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button onClick={handleCreateContract}>
            <Plus className="h-4 w-4 mr-2" />
            Create Contract
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="contracts">Contracts</TabsTrigger>
          <TabsTrigger value="expiring">Expiring</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="contracts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Contract Directory</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between mb-4">
                <div className="flex space-x-2">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search contracts..." 
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
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="expiring">Expiring</SelectItem>
                      <SelectItem value="expired">Expired</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {isLoading ? (
                <div className="h-64 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              ) : (
                <DataTable columns={contractColumns} data={filteredContracts} />
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expiring" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Contract Expiry Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {contracts
                  .filter(c => c.daysToExpiry <= 120 && c.status !== 'Expired')
                  .sort((a, b) => a.daysToExpiry - b.daysToExpiry)
                  .map((contract) => (
                    <div key={contract.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="font-medium">{contract.supplier}</div>
                        <div className="text-sm text-muted-foreground">{contract.contractNumber}</div>
                        <div className="text-sm text-muted-foreground">Type: {contract.type}</div>
                      </div>
                      <div className="text-center">
                        <div className={`font-bold ${contract.daysToExpiry <= 30 ? 'text-red-600' : contract.daysToExpiry <= 60 ? 'text-yellow-600' : 'text-blue-600'}`}>
                          {contract.daysToExpiry} days
                        </div>
                        <div className="text-sm text-muted-foreground">Expires: {contract.endDate}</div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" onClick={() => handleRenewContract(contract.id)}>
                          Renew
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleEditContract(contract)}>
                          Review
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Contract Types Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <XAxis dataKey="type" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#8884d8" name="Count" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contract Value by Type</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {chartData.map((item, index) => (
                    <div key={item.type} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{item.type}</div>
                        <div className="text-sm text-muted-foreground">{item.count} contracts</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">${item.value.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">Total value</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Monitoring</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Contract Compliance Metrics</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Active Contracts</span>
                      <span className="font-medium">{contracts.filter(c => c.status === 'Active').length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Auto-Renewal Enabled</span>
                      <span className="font-medium">{contracts.filter(c => c.autoRenewal).length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Requires Review</span>
                      <span className="font-medium text-yellow-600">{contracts.filter(c => c.daysToExpiry <= 60).length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Expired Contracts</span>
                      <span className="font-medium text-red-600">{contracts.filter(c => c.status === 'Expired').length}</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-medium">Risk Assessment</h3>
                  <div className="space-y-2">
                    <div className="p-3 border rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Low Risk</span>
                        <Badge className="bg-green-100 text-green-800">
                          {contracts.filter(c => c.daysToExpiry > 120).length}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">Contracts with adequate lead time</div>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Medium Risk</span>
                        <Badge className="bg-yellow-100 text-yellow-800">
                          {contracts.filter(c => c.daysToExpiry <= 120 && c.daysToExpiry > 60).length}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">Contracts requiring attention</div>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">High Risk</span>
                        <Badge className="bg-red-100 text-red-800">
                          {contracts.filter(c => c.daysToExpiry <= 60).length}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">Contracts requiring immediate action</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Contract Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="h-20 flex flex-col">
                  <span>Contract Portfolio Summary</span>
                  <span className="text-xs text-muted-foreground">Overview of all contracts</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col">
                  <span>Expiry Alert Report</span>
                  <span className="text-xs text-muted-foreground">Upcoming contract expirations</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col">
                  <span>Value Analysis</span>
                  <span className="text-xs text-muted-foreground">Contract value breakdown</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col">
                  <span>Compliance Report</span>
                  <span className="text-xs text-muted-foreground">Contract compliance status</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Edit Contract' : 'Create New Contract'}</DialogTitle>
          </DialogHeader>
          <ContractForm 
            contract={selectedContract}
            onSave={handleSaveContract}
            onCancel={() => setIsDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

const ContractForm: React.FC<{
  contract: Contract | null;
  onSave: (data: Partial<Contract>) => void;
  onCancel: () => void;
}> = ({ contract, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    supplier: contract?.supplier || '',
    type: contract?.type || 'Framework Agreement',
    startDate: contract?.startDate || '',
    endDate: contract?.endDate || '',
    value: contract?.value || 0,
    currency: contract?.currency || 'USD',
    status: contract?.status || 'Draft',
    autoRenewal: contract?.autoRenewal || false,
    owner: contract?.owner || '',
    department: contract?.department || '',
    paymentTerms: contract?.paymentTerms || 'Net 30',
    deliveryTerms: contract?.deliveryTerms || 'FOB',
    penalties: contract?.penalties || '',
    notes: contract?.notes || ''
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
          <Label htmlFor="type">Contract Type</Label>
          <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value as any }))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Framework Agreement">Framework Agreement</SelectItem>
              <SelectItem value="Service Agreement">Service Agreement</SelectItem>
              <SelectItem value="Purchase Agreement">Purchase Agreement</SelectItem>
              <SelectItem value="Master Agreement">Master Agreement</SelectItem>
              <SelectItem value="One-time Contract">One-time Contract</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="startDate">Start Date</Label>
          <Input
            id="startDate"
            type="date"
            value={formData.startDate}
            onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
            required
          />
        </div>
        <div>
          <Label htmlFor="endDate">End Date</Label>
          <Input
            id="endDate"
            type="date"
            value={formData.endDate}
            onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
            required
          />
        </div>
        <div>
          <Label htmlFor="value">Contract Value</Label>
          <Input
            id="value"
            type="number"
            value={formData.value}
            onChange={(e) => setFormData(prev => ({ ...prev, value: Number(e.target.value) }))}
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
          <Label htmlFor="owner">Contract Owner</Label>
          <Input
            id="owner"
            value={formData.owner}
            onChange={(e) => setFormData(prev => ({ ...prev, owner: e.target.value }))}
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
          <Label htmlFor="deliveryTerms">Delivery Terms</Label>
          <Select value={formData.deliveryTerms} onValueChange={(value) => setFormData(prev => ({ ...prev, deliveryTerms: value }))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="FOB">FOB</SelectItem>
              <SelectItem value="CIF">CIF</SelectItem>
              <SelectItem value="DDP">DDP</SelectItem>
              <SelectItem value="EXW">EXW</SelectItem>
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
              <SelectItem value="Draft">Draft</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Under Review">Under Review</SelectItem>
              <SelectItem value="Terminated">Terminated</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="autoRenewal"
            checked={formData.autoRenewal}
            onChange={(e) => setFormData(prev => ({ ...prev, autoRenewal: e.target.checked }))}
          />
          <Label htmlFor="autoRenewal">Auto Renewal</Label>
        </div>
      </div>
      
      <div>
        <Label htmlFor="penalties">Penalties</Label>
        <Textarea
          id="penalties"
          value={formData.penalties}
          onChange={(e) => setFormData(prev => ({ ...prev, penalties: e.target.value }))}
          rows={2}
        />
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
          Save Contract
        </Button>
      </div>
    </form>
  );
};

export default ContractManagement;

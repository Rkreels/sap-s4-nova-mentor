
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../../components/ui/dialog';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Textarea } from '../../components/ui/textarea';
import { ArrowLeft, Plus, Edit, Eye, FileText, Clock, CheckCircle, XCircle, Trash2 } from 'lucide-react';
import PageHeader from '../../components/page/PageHeader';
import { useVoiceAssistantContext } from '../../context/VoiceAssistantContext';
import { useVoiceAssistant } from '../../hooks/useVoiceAssistant';
import EnhancedDataTable, { EnhancedColumn, TableAction } from '../../components/data/EnhancedDataTable';
import { useToast } from '../../hooks/use-toast';
import { CRUDManager } from '../../lib/crudOperations';

interface PurchaseRequisition {
  id: string;
  createdAt: string;
  updatedAt: string;
  description: string;
  requestor: string;
  department: string;
  totalAmount: number;
  currency: string;
  status: 'Draft' | 'Pending' | 'Approved' | 'Rejected' | 'Converted';
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  requestDate: string;
  requiredDate: string;
  approver: string;
  items: number;
}

// CRUD Manager
const requisitionManager = new CRUDManager<PurchaseRequisition>('purchase_requisitions');

const PurchaseRequisitions: React.FC = () => {
  const navigate = useNavigate();
  const { isEnabled } = useVoiceAssistantContext();
  const { speak } = useVoiceAssistant();
  const [activeTab, setActiveTab] = useState('requisitions');
  const [requisitions, setRequisitions] = useState<PurchaseRequisition[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [editingRequisition, setEditingRequisition] = useState<PurchaseRequisition | null>(null);
  const [viewingRequisition, setViewingRequisition] = useState<PurchaseRequisition | null>(null);
  const [formData, setFormData] = useState<{
    description: string;
    requestor: string;
    department: string;
    totalAmount: string;
    currency: string;
    status: 'Draft' | 'Pending' | 'Approved' | 'Rejected' | 'Converted';
    priority: 'Low' | 'Medium' | 'High' | 'Urgent';
    requiredDate: string;
    approver: string;
    items: number;
  }>({
    description: '',
    requestor: '',
    department: '',
    totalAmount: '',
    currency: 'USD',
    status: 'Draft',
    priority: 'Medium',
    requiredDate: '',
    approver: '',
    items: 1
  });
  const { toast } = useToast();

  useEffect(() => {
    if (isEnabled) {
      speak('Welcome to Purchase Requisitions. Manage internal purchase requests and approval workflows.');
    }
  }, [isEnabled, speak]);

  // Load data
  useEffect(() => {
    loadRequisitions();
  }, []);

  const loadRequisitions = () => {
    const data = requisitionManager.getAll();
    if (data.length === 0) {
      // Seed initial data
      const sampleRequisitions = [
        {
          description: 'Office Equipment Request',
          requestor: 'John Smith',
          department: 'IT Department',
          totalAmount: 2500.00,
          currency: 'USD',
          status: 'Pending' as const,
          priority: 'Medium' as const,
          requestDate: '2025-01-20',
          requiredDate: '2025-02-15',
          approver: 'Sarah Wilson',
          items: 3
        },
        {
          description: 'Marketing Materials',
          requestor: 'Lisa Chen',
          department: 'Marketing',
          totalAmount: 850.00,
          currency: 'USD',
          status: 'Approved' as const,
          priority: 'Low' as const,
          requestDate: '2025-01-18',
          requiredDate: '2025-02-01',
          approver: 'Mike Brown',
          items: 5
        }
      ];
      sampleRequisitions.forEach(item => requisitionManager.create(item));
      setRequisitions(requisitionManager.getAll());
    } else {
      setRequisitions(data);
    }
  };

  const handleCreate = () => {
    setEditingRequisition(null);
    setFormData({
      description: '',
      requestor: '',
      department: '',
      totalAmount: '',
      currency: 'USD',
      status: 'Draft',
      priority: 'Medium',
      requiredDate: '',
      approver: '',
      items: 1
    });
    setIsDialogOpen(true);
  };

  const handleEdit = (requisition: PurchaseRequisition) => {
    setEditingRequisition(requisition);
    setFormData({
      description: requisition.description,
      requestor: requisition.requestor,
      department: requisition.department,
      totalAmount: requisition.totalAmount.toString(),
      currency: requisition.currency,
      status: requisition.status,
      priority: requisition.priority,
      requiredDate: requisition.requiredDate,
      approver: requisition.approver,
      items: requisition.items
    });
    setIsDialogOpen(true);
  };

  const handleView = (requisition: PurchaseRequisition) => {
    setViewingRequisition(requisition);
    setIsViewDialogOpen(true);
  };

  const handleDelete = (requisition: PurchaseRequisition) => {
    const reqNumber = `PR-${requisition.id.slice(0, 8).toUpperCase()}`;
    if (confirm(`Are you sure you want to delete requisition ${reqNumber}?`)) {
      requisitionManager.delete(requisition.id);
      loadRequisitions();
      toast({
        title: 'Success',
        description: 'Requisition deleted successfully',
      });
    }
  };

  const handleSubmit = () => {
    if (!formData.description || !formData.requestor || !formData.department || !formData.totalAmount) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields',
        variant: 'destructive'
      });
      return;
    }

    const requisitionData = {
      description: formData.description,
      requestor: formData.requestor,
      department: formData.department,
      totalAmount: parseFloat(formData.totalAmount),
      currency: formData.currency,
      status: formData.status,
      priority: formData.priority,
      requestDate: new Date().toISOString().split('T')[0],
      requiredDate: formData.requiredDate,
      approver: formData.approver,
      items: formData.items
    };

    if (editingRequisition) {
      requisitionManager.update(editingRequisition.id, requisitionData);
      toast({
        title: 'Success',
        description: 'Requisition updated successfully',
      });
    } else {
      requisitionManager.create(requisitionData);
      toast({
        title: 'Success',
        description: 'Requisition created successfully',
      });
    }

    loadRequisitions();
    setIsDialogOpen(false);
  };

  const handleApprove = (requisition: PurchaseRequisition) => {
    const reqNumber = `PR-${requisition.id.slice(0, 8).toUpperCase()}`;
    requisitionManager.update(requisition.id, { status: 'Approved' });
    loadRequisitions();
    toast({
      title: 'Success',
      description: `Requisition ${reqNumber} approved`,
    });
  };

  const handleReject = (requisition: PurchaseRequisition) => {
    const reqNumber = `PR-${requisition.id.slice(0, 8).toUpperCase()}`;
    requisitionManager.update(requisition.id, { status: 'Rejected' });
    loadRequisitions();
    toast({
      title: 'Success',
      description: `Requisition ${reqNumber} rejected`,
    });
  };

  const getStatusColor = (status: string) => {
    const colors = {
      'Draft': 'bg-gray-100 text-gray-800',
      'Pending': 'bg-yellow-100 text-yellow-800',
      'Approved': 'bg-green-100 text-green-800',
      'Rejected': 'bg-red-100 text-red-800',
      'Converted': 'bg-blue-100 text-blue-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      'Low': 'bg-green-100 text-green-800',
      'Medium': 'bg-yellow-100 text-yellow-800',
      'High': 'bg-orange-100 text-orange-800',
      'Urgent': 'bg-red-100 text-red-800'
    };
    return colors[priority as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const columns: EnhancedColumn[] = [
    { 
      key: 'id', 
      header: 'Requisition #', 
      sortable: true, 
      searchable: true,
      render: (value: string) => `PR-${value.slice(0, 8).toUpperCase()}`
    },
    { key: 'description', header: 'Description', searchable: true },
    { key: 'requestor', header: 'Requestor', searchable: true },
    { key: 'department', header: 'Department', filterable: true, filterOptions: [
      { label: 'IT Department', value: 'IT Department' },
      { label: 'Marketing', value: 'Marketing' },
      { label: 'Finance', value: 'Finance' },
      { label: 'Operations', value: 'Operations' }
    ]},
    { 
      key: 'status', 
      header: 'Status',
      filterable: true,
      filterOptions: [
        { label: 'Draft', value: 'Draft' },
        { label: 'Pending', value: 'Pending' },
        { label: 'Approved', value: 'Approved' },
        { label: 'Rejected', value: 'Rejected' },
        { label: 'Converted', value: 'Converted' }
      ],
      render: (value: string) => (
        <Badge className={getStatusColor(value)}>
          {value}
        </Badge>
      )
    },
    { 
      key: 'priority', 
      header: 'Priority',
      filterable: true,
      filterOptions: [
        { label: 'Low', value: 'Low' },
        { label: 'Medium', value: 'Medium' },
        { label: 'High', value: 'High' },
        { label: 'Urgent', value: 'Urgent' }
      ],
      render: (value: string) => (
        <Badge className={getPriorityColor(value)}>
          {value}
        </Badge>
      )
    },
    { 
      key: 'totalAmount', 
      header: 'Amount',
      sortable: true,
      render: (value: number, row: PurchaseRequisition) => `${row.currency} ${value.toLocaleString()}`
    },
    { key: 'requiredDate', header: 'Required Date', sortable: true }
  ];

  const actions: TableAction[] = [
    {
      label: 'View',
      icon: <Eye className="h-4 w-4 mr-2" />,
      onClick: handleView,
      variant: 'ghost'
    },
    {
      label: 'Edit',
      icon: <Edit className="h-4 w-4 mr-2" />,
      onClick: handleEdit,
      variant: 'ghost'
    },
    {
      label: 'Delete',
      icon: <Trash2 className="h-4 w-4 mr-2" />,
      onClick: handleDelete,
      variant: 'ghost'
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
          title="Purchase Requisitions"
          description="Manage internal purchase requests and approval workflows"
          voiceIntroduction="Welcome to Purchase Requisitions for managing internal requests."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{requisitions.length}</div>
            <div className="text-sm text-muted-foreground">Total Requisitions</div>
            <div className="text-sm text-blue-600">This month</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">
              {requisitions.filter(r => r.status === 'Pending').length}
            </div>
            <div className="text-sm text-muted-foreground">Pending Approval</div>
            <div className="text-sm text-orange-600">Needs attention</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">
              {requisitions.filter(r => r.status === 'Approved').length}
            </div>
            <div className="text-sm text-muted-foreground">Approved</div>
            <div className="text-sm text-green-600">Ready to convert</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">
              ${requisitions.reduce((sum, r) => sum + r.totalAmount, 0).toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">Total Value</div>
            <div className="text-sm text-purple-600">Requested</div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="requisitions">Requisitions</TabsTrigger>
          <TabsTrigger value="approval">Approval Queue</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="requisitions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                Purchase Requisitions
                <Button onClick={handleCreate}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Requisition
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <EnhancedDataTable 
                columns={columns}
                data={requisitions}
                actions={actions}
                searchPlaceholder="Search requisitions..."
                exportable={true}
                refreshable={true}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="approval" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Approval Queue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {requisitions.filter(r => r.status === 'Pending').map((requisition) => (
                  <div key={requisition.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold">PR-{requisition.id.slice(0, 8).toUpperCase()}</h4>
                        <p className="text-sm text-muted-foreground">{requisition.description}</p>
                        <p className="text-sm">Requestor: {requisition.requestor} | Amount: ${requisition.totalAmount.toLocaleString()}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" onClick={() => handleApprove(requisition)}>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Approve
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleReject(requisition)}>
                          <XCircle className="h-4 w-4 mr-2" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Requisition Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['Draft', 'Pending', 'Approved', 'Rejected', 'Converted'].map((status) => {
                    const count = requisitions.filter(r => r.status === status).length;
                    return (
                      <div key={status} className="flex justify-between">
                        <span>{status}</span>
                        <span className="font-medium">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Department Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['IT Department', 'Marketing', 'Finance', 'Operations'].map((dept) => {
                    const count = requisitions.filter(r => r.department === dept).length;
                    const total = requisitions.filter(r => r.department === dept).reduce((sum, r) => sum + r.totalAmount, 0);
                    return (
                      <div key={dept} className="space-y-1">
                        <div className="flex justify-between">
                          <span>{dept}</span>
                          <span className="font-medium">{count} req | ${total.toLocaleString()}</span>
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

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingRequisition ? 'Edit Requisition' : 'Create New Requisition'}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter requisition description"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="requestor">Requestor *</Label>
                <Input
                  id="requestor"
                  value={formData.requestor}
                  onChange={(e) => setFormData({ ...formData, requestor: e.target.value })}
                  placeholder="Enter requestor name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="department">Department *</Label>
                <Select value={formData.department} onValueChange={(value) => setFormData({ ...formData, department: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="IT Department">IT Department</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                    <SelectItem value="Operations">Operations</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="totalAmount">Total Amount *</Label>
                <Input
                  id="totalAmount"
                  type="number"
                  step="0.01"
                  value={formData.totalAmount}
                  onChange={(e) => setFormData({ ...formData, totalAmount: e.target.value })}
                  placeholder="0.00"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="currency">Currency</Label>
                <Select value={formData.currency} onValueChange={(value) => setFormData({ ...formData, currency: value })}>
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
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value: any) => setFormData({ ...formData, status: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Approved">Approved</SelectItem>
                    <SelectItem value="Rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="priority">Priority</Label>
                <Select value={formData.priority} onValueChange={(value: any) => setFormData({ ...formData, priority: value })}>
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
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="requiredDate">Required Date *</Label>
                <Input
                  id="requiredDate"
                  type="date"
                  value={formData.requiredDate}
                  onChange={(e) => setFormData({ ...formData, requiredDate: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="approver">Approver *</Label>
                <Input
                  id="approver"
                  value={formData.approver}
                  onChange={(e) => setFormData({ ...formData, approver: e.target.value })}
                  placeholder="Enter approver name"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="items">Number of Items</Label>
              <Input
                id="items"
                type="number"
                value={formData.items}
                onChange={(e) => setFormData({ ...formData, items: parseInt(e.target.value) || 1 })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSubmit}>
              {editingRequisition ? 'Update' : 'Create'} Requisition
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Requisition Details</DialogTitle>
          </DialogHeader>
          {viewingRequisition && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Requisition Number</Label>
                  <p className="font-medium">PR-{viewingRequisition.id.slice(0, 8).toUpperCase()}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Status</Label>
                  <p><Badge className={getStatusColor(viewingRequisition.status)}>{viewingRequisition.status}</Badge></p>
                </div>
              </div>
              <div>
                <Label className="text-muted-foreground">Description</Label>
                <p className="font-medium">{viewingRequisition.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Requestor</Label>
                  <p className="font-medium">{viewingRequisition.requestor}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Department</Label>
                  <p className="font-medium">{viewingRequisition.department}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Total Amount</Label>
                  <p className="font-medium">{viewingRequisition.currency} {viewingRequisition.totalAmount.toLocaleString()}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Priority</Label>
                  <p><Badge className={getPriorityColor(viewingRequisition.priority)}>{viewingRequisition.priority}</Badge></p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Request Date</Label>
                  <p className="font-medium">{viewingRequisition.requestDate}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Required Date</Label>
                  <p className="font-medium">{viewingRequisition.requiredDate}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Approver</Label>
                  <p className="font-medium">{viewingRequisition.approver}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Number of Items</Label>
                  <p className="font-medium">{viewingRequisition.items}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>Close</Button>
            {viewingRequisition && (
              <Button onClick={() => {
                setIsViewDialogOpen(false);
                handleEdit(viewingRequisition);
              }}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PurchaseRequisitions;

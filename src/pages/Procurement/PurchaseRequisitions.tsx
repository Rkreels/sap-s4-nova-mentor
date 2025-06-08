
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { ArrowLeft, Plus, Edit, Eye, CheckCircle, Clock, AlertCircle, XCircle, FileText, Download, Filter } from 'lucide-react';
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

interface PurchaseRequisition {
  id: string;
  prNumber: string;
  title: string;
  description: string;
  requestor: string;
  department: string;
  requestDate: string;
  requiredDate: string;
  totalValue: number;
  currency: string;
  status: 'Draft' | 'Submitted' | 'Pending Approval' | 'Approved' | 'Rejected' | 'Converted to PO' | 'Cancelled';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  category: string;
  approver: string;
  approvalDate?: string;
  rejectionReason?: string;
  items: number;
  budget: string;
  costCenter: string;
}

interface PRWorkflow {
  id: string;
  prId: string;
  step: string;
  assignee: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Skipped';
  completedDate?: string;
  comments?: string;
}

const PurchaseRequisitions: React.FC = () => {
  const navigate = useNavigate();
  const { isEnabled } = useVoiceAssistantContext();
  const { speak } = useVoiceAssistant();
  const [activeTab, setActiveTab] = useState('requisitions');
  const [requisitions, setRequisitions] = useState<PurchaseRequisition[]>([]);
  const [workflows, setWorkflows] = useState<PRWorkflow[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPR, setSelectedPR] = useState<PurchaseRequisition | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isEnabled) {
      speak('Welcome to Purchase Requisitions. Create and manage requisition requests for procurement approval.');
    }
  }, [isEnabled, speak]);

  // Sample data
  useEffect(() => {
    const samplePRs: PurchaseRequisition[] = [
      {
        id: 'pr-001',
        prNumber: 'PR-2025-001',
        title: 'Office Supplies Q1',
        description: 'Quarterly office supplies including stationery, paper, and consumables',
        requestor: 'John Smith',
        department: 'Finance',
        requestDate: '2025-01-20',
        requiredDate: '2025-02-15',
        totalValue: 1250,
        currency: 'USD',
        status: 'Pending Approval',
        priority: 'Medium',
        category: 'Office Supplies',
        approver: 'Sarah Johnson',
        items: 12,
        budget: 'OPEX-2025',
        costCenter: 'CC-1001'
      },
      {
        id: 'pr-002',
        prNumber: 'PR-2025-002',
        title: 'IT Equipment Upgrade',
        description: 'Laptops and peripherals for new team members',
        requestor: 'Maria Garcia',
        department: 'IT',
        requestDate: '2025-01-18',
        requiredDate: '2025-02-01',
        totalValue: 8750,
        currency: 'USD',
        status: 'Approved',
        priority: 'High',
        category: 'Electronics',
        approver: 'Mike Wilson',
        approvalDate: '2025-01-22',
        items: 5,
        budget: 'CAPEX-2025',
        costCenter: 'CC-2001'
      },
      {
        id: 'pr-003',
        prNumber: 'PR-2025-003',
        title: 'Marketing Materials',
        description: 'Promotional materials for Q1 campaigns',
        requestor: 'Alex Johnson',
        department: 'Marketing',
        requestDate: '2025-01-15',
        requiredDate: '2025-02-28',
        totalValue: 3500,
        currency: 'USD',
        status: 'Rejected',
        priority: 'Low',
        category: 'Marketing',
        approver: 'Lisa Chen',
        approvalDate: '2025-01-20',
        rejectionReason: 'Budget exceeded for this category',
        items: 8,
        budget: 'OPEX-2025',
        costCenter: 'CC-3001'
      },
      {
        id: 'pr-004',
        prNumber: 'PR-2025-004',
        title: 'Safety Equipment',
        description: 'Personal protective equipment for manufacturing floor',
        requestor: 'Robert Chen',
        department: 'Manufacturing',
        requestDate: '2025-01-22',
        requiredDate: '2025-02-05',
        totalValue: 2800,
        currency: 'USD',
        status: 'Converted to PO',
        priority: 'Critical',
        category: 'Safety',
        approver: 'Emma Davis',
        approvalDate: '2025-01-23',
        items: 15,
        budget: 'OPEX-2025',
        costCenter: 'CC-4001'
      }
    ];

    const sampleWorkflows: PRWorkflow[] = [
      {
        id: 'wf-001',
        prId: 'pr-001',
        step: 'Department Manager Approval',
        assignee: 'Sarah Johnson',
        status: 'Pending',
      },
      {
        id: 'wf-002',
        prId: 'pr-002',
        step: 'Department Manager Approval',
        assignee: 'Mike Wilson',
        status: 'Approved',
        completedDate: '2025-01-22',
        comments: 'Approved - urgent requirement'
      },
      {
        id: 'wf-003',
        prId: 'pr-002',
        step: 'Finance Approval',
        assignee: 'Budget Team',
        status: 'Approved',
        completedDate: '2025-01-22',
        comments: 'Budget available'
      }
    ];

    setRequisitions(samplePRs);
    setWorkflows(sampleWorkflows);
  }, []);

  const filteredPRs = requisitions.filter(pr => {
    const matchesSearch = pr.prNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pr.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pr.requestor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || pr.status.toLowerCase().replace(' ', '') === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleCreatePR = () => {
    setSelectedPR(null);
    setIsEditing(false);
    setIsDialogOpen(true);
  };

  const handleEditPR = (pr: PurchaseRequisition) => {
    setSelectedPR(pr);
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const handleDeletePR = (prId: string) => {
    setRequisitions(prev => prev.filter(pr => pr.id !== prId));
    toast({
      title: 'Purchase Requisition Deleted',
      description: 'Purchase requisition has been successfully removed.',
    });
  };

  const handleApprovePR = (prId: string) => {
    setRequisitions(prev => prev.map(pr => 
      pr.id === prId ? { 
        ...pr, 
        status: 'Approved' as const, 
        approvalDate: new Date().toISOString().split('T')[0] 
      } : pr
    ));
    toast({
      title: 'Purchase Requisition Approved',
      description: 'Purchase requisition has been approved.',
    });
  };

  const handleRejectPR = (prId: string, reason: string) => {
    setRequisitions(prev => prev.map(pr => 
      pr.id === prId ? { 
        ...pr, 
        status: 'Rejected' as const, 
        approvalDate: new Date().toISOString().split('T')[0],
        rejectionReason: reason
      } : pr
    ));
    toast({
      title: 'Purchase Requisition Rejected',
      description: 'Purchase requisition has been rejected.',
    });
  };

  const handleSavePR = (prData: Partial<PurchaseRequisition>) => {
    if (isEditing && selectedPR) {
      setRequisitions(prev => prev.map(pr => 
        pr.id === selectedPR.id ? { ...pr, ...prData } : pr
      ));
      toast({
        title: 'Purchase Requisition Updated',
        description: 'Purchase requisition has been successfully updated.',
      });
    } else {
      const newPR: PurchaseRequisition = {
        id: `pr-${requisitions.length + 1}`,
        prNumber: `PR-2025-${String(requisitions.length + 1).padStart(3, '0')}`,
        requestDate: new Date().toISOString().split('T')[0],
        status: 'Draft',
        currency: 'USD',
        items: 0,
        ...prData as PurchaseRequisition
      };
      setRequisitions(prev => [...prev, newPR]);
      toast({
        title: 'Purchase Requisition Created',
        description: 'New purchase requisition has been successfully created.',
      });
    }
    setIsDialogOpen(false);
  };

  const prColumns = [
    { key: 'prNumber', header: 'PR Number' },
    { key: 'title', header: 'Title' },
    { key: 'requestor', header: 'Requestor' },
    { key: 'department', header: 'Department' },
    { key: 'requestDate', header: 'Request Date' },
    { key: 'requiredDate', header: 'Required Date' },
    { 
      key: 'totalValue', 
      header: 'Total Value',
      render: (value: number, row: PurchaseRequisition) => `$${value.toLocaleString()} ${row.currency}`
    },
    { 
      key: 'priority', 
      header: 'Priority',
      render: (value: string) => {
        const colors = {
          'Low': 'bg-green-100 text-green-800',
          'Medium': 'bg-yellow-100 text-yellow-800',
          'High': 'bg-orange-100 text-orange-800',
          'Critical': 'bg-red-100 text-red-800'
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
          'Submitted': 'bg-blue-100 text-blue-800',
          'Pending Approval': 'bg-orange-100 text-orange-800',
          'Approved': 'bg-green-100 text-green-800',
          'Rejected': 'bg-red-100 text-red-800',
          'Converted to PO': 'bg-purple-100 text-purple-800',
          'Cancelled': 'bg-gray-100 text-gray-800'
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
      render: (_, row: PurchaseRequisition) => (
        <div className="flex space-x-2">
          <Button variant="ghost" size="sm" title="View">
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => handleEditPR(row)} title="Edit">
            <Edit className="h-4 w-4" />
          </Button>
          {row.status === 'Pending Approval' && (
            <>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleApprovePR(row.id)}
                className="text-green-600 hover:text-green-700"
                title="Approve"
              >
                <CheckCircle className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleRejectPR(row.id, 'Budget constraints')}
                className="text-red-600 hover:text-red-700"
                title="Reject"
              >
                <XCircle className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      )
    }
  ];

  const workflowColumns = [
    { key: 'step', header: 'Approval Step' },
    { key: 'assignee', header: 'Assignee' },
    { 
      key: 'status', 
      header: 'Status',
      render: (value: string) => {
        const colors = {
          'Pending': 'bg-yellow-100 text-yellow-800',
          'Approved': 'bg-green-100 text-green-800',
          'Rejected': 'bg-red-100 text-red-800',
          'Skipped': 'bg-gray-100 text-gray-800'
        };
        const icons = {
          'Pending': Clock,
          'Approved': CheckCircle,
          'Rejected': XCircle,
          'Skipped': AlertCircle
        };
        const Icon = icons[value as keyof typeof icons];
        return (
          <div className="flex items-center">
            <Icon className="h-4 w-4 mr-2" />
            <Badge className={colors[value as keyof typeof colors]}>
              {value}
            </Badge>
          </div>
        );
      }
    },
    { key: 'completedDate', header: 'Completed Date' },
    { key: 'comments', header: 'Comments' }
  ];

  const prMetrics = [
    { name: 'Total PRs', value: requisitions.length, change: '+15%' },
    { name: 'Pending Approval', value: requisitions.filter(pr => pr.status === 'Pending Approval').length, change: '-8%' },
    { name: 'Approved This Month', value: requisitions.filter(pr => pr.status === 'Approved').length, change: '+22%' },
    { name: 'Avg Processing Time', value: '2.3 days', change: '-0.5 days' }
  ];

  const statusData = [
    { status: 'Draft', count: requisitions.filter(pr => pr.status === 'Draft').length },
    { status: 'Pending', count: requisitions.filter(pr => pr.status === 'Pending Approval').length },
    { status: 'Approved', count: requisitions.filter(pr => pr.status === 'Approved').length },
    { status: 'Rejected', count: requisitions.filter(pr => pr.status === 'Rejected').length }
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
          description="Create and manage requisition requests for procurement approval"
          voiceIntroduction="Welcome to Purchase Requisitions Management."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {prMetrics.map((metric, index) => (
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
        <h2 className="text-xl font-semibold">Purchase Requisitions</h2>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button onClick={handleCreatePR}>
            <Plus className="h-4 w-4 mr-2" />
            Create Requisition
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="requisitions">Requisitions</TabsTrigger>
          <TabsTrigger value="workflow">Workflow</TabsTrigger>
          <TabsTrigger value="approvals">Approvals</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="requisitions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Purchase Requisition Portfolio</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between mb-4">
                <div className="flex space-x-2">
                  <Input 
                    placeholder="Search requisitions..." 
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
                      <SelectItem value="pendingapproval">Pending Approval</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DataTable columns={prColumns} data={filteredPRs} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="workflow" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Approval Workflow</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable columns={workflowColumns} data={workflows} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="approvals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Approvals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {requisitions
                  .filter(pr => pr.status === 'Pending Approval')
                  .map((pr, index) => (
                    <div key={pr.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <div>
                          <span className="font-medium">{pr.prNumber} - {pr.title}</span>
                          <Badge className="ml-2 bg-orange-100 text-orange-800">
                            Pending Approval
                          </Badge>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">${pr.totalValue.toLocaleString()}</div>
                          <div className="text-sm text-muted-foreground">{pr.department}</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground mb-3">
                        <div>Requestor: {pr.requestor}</div>
                        <div>Required Date: {pr.requiredDate}</div>
                        <div>Priority: {pr.priority}</div>
                        <div>Category: {pr.category}</div>
                      </div>
                      <div className="text-sm mb-3">{pr.description}</div>
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => handleApprovePR(pr.id)}
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Approve
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-red-600 hover:text-red-700"
                          onClick={() => handleRejectPR(pr.id, 'Requires additional information')}
                        >
                          <XCircle className="h-4 w-4 mr-2" />
                          Reject
                        </Button>
                        <Button size="sm" variant="outline">
                          <FileText className="h-4 w-4 mr-2" />
                          Request Info
                        </Button>
                      </div>
                    </div>
                  ))}
                {requisitions.filter(pr => pr.status === 'Pending Approval').length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No purchase requisitions pending approval
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
                <CardTitle>Requisition Status Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={statusData}>
                    <XAxis dataKey="status" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Monthly Requisition Volume</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={[
                    { month: 'Jan', count: 28 },
                    { month: 'Feb', count: 32 },
                    { month: 'Mar', count: 25 },
                    { month: 'Apr', count: 38 },
                    { month: 'May', count: 42 },
                    { month: 'Jun', count: 35 }
                  ]}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="count" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="text-sm text-muted-foreground">Approval Rate</div>
                <div className="text-2xl font-bold">89%</div>
                <div className="text-sm text-green-600">+5% vs last month</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-sm text-muted-foreground">Avg Value per PR</div>
                <div className="text-2xl font-bold">$4,075</div>
                <div className="text-sm text-blue-600">+12% vs last month</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-sm text-muted-foreground">Budget Utilization</div>
                <div className="text-2xl font-bold">73%</div>
                <div className="text-sm text-orange-600">On track for Q1</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Edit Purchase Requisition' : 'Create New Purchase Requisition'}</DialogTitle>
          </DialogHeader>
          <PRForm 
            pr={selectedPR}
            onSave={handleSavePR}
            onCancel={() => setIsDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

const PRForm: React.FC<{
  pr: PurchaseRequisition | null;
  onSave: (data: Partial<PurchaseRequisition>) => void;
  onCancel: () => void;
}> = ({ pr, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: pr?.title || '',
    description: pr?.description || '',
    requestor: pr?.requestor || '',
    department: pr?.department || '',
    requiredDate: pr?.requiredDate || '',
    totalValue: pr?.totalValue || 0,
    priority: pr?.priority || 'Medium',
    category: pr?.category || '',
    budget: pr?.budget || '',
    costCenter: pr?.costCenter || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title">Requisition Title</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
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
              <SelectItem value="Office Supplies">Office Supplies</SelectItem>
              <SelectItem value="Electronics">Electronics</SelectItem>
              <SelectItem value="Marketing">Marketing</SelectItem>
              <SelectItem value="Safety">Safety</SelectItem>
              <SelectItem value="Services">Services</SelectItem>
            </SelectContent>
          </Select>
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
          <Label htmlFor="requiredDate">Required Date</Label>
          <Input
            id="requiredDate"
            type="date"
            value={formData.requiredDate}
            onChange={(e) => setFormData(prev => ({ ...prev, requiredDate: e.target.value }))}
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
          <Label htmlFor="priority">Priority</Label>
          <Select value={formData.priority} onValueChange={(value) => setFormData(prev => ({ ...prev, priority: value as any }))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Low">Low</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="High">High</SelectItem>
              <SelectItem value="Critical">Critical</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="budget">Budget Code</Label>
          <Input
            id="budget"
            value={formData.budget}
            onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
            placeholder="e.g., OPEX-2025"
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          required
        />
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          Save Requisition
        </Button>
      </div>
    </form>
  );
};

export default PurchaseRequisitions;

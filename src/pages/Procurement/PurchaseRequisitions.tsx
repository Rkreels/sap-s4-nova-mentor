
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { ArrowLeft, Plus, Edit, Eye, CheckCircle, Clock, AlertCircle, XCircle, FileText, Download, Filter, Search } from 'lucide-react';
import PageHeader from '../../components/page/PageHeader';
import { useVoiceAssistantContext } from '../../context/VoiceAssistantContext';
import { useVoiceAssistant } from '../../hooks/useVoiceAssistant';
import EnhancedDataTable, { EnhancedColumn, TableAction } from '../../components/data/EnhancedDataTable';
import VoiceTrainingComponent from '../../components/procurement/VoiceTrainingComponent';
import WorkflowManager from '../../components/procurement/WorkflowManager';
import { Input } from '../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { useToast } from '../../hooks/use-toast';
import { LineChart, Line, BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';

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
  workflowStage: string;
  attachments: number;
  comments: string[];
}

interface PRItem {
  id: string;
  prId: string;
  itemNumber: string;
  description: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  unit: string;
  category: string;
  supplier?: string;
}

const PurchaseRequisitions: React.FC = () => {
  const navigate = useNavigate();
  const { isEnabled } = useVoiceAssistantContext();
  const { speak } = useVoiceAssistant();
  const [activeTab, setActiveTab] = useState('requisitions');
  const [requisitions, setRequisitions] = useState<PurchaseRequisition[]>([]);
  const [prItems, setPrItems] = useState<PRItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPR, setSelectedPR] = useState<PurchaseRequisition | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isEnabled) {
      speak('Welcome to Purchase Requisitions Management. Here you can create, track, and manage requisition requests with full workflow capabilities.');
    }
  }, [isEnabled, speak]);

  // Sample data initialization
  useEffect(() => {
    const samplePRs: PurchaseRequisition[] = [
      {
        id: 'pr-001',
        prNumber: 'PR-2025-001',
        title: 'Office Supplies Q1 2025',
        description: 'Quarterly office supplies including stationery, paper, and consumables for Finance department',
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
        costCenter: 'CC-1001',
        workflowStage: 'Department Manager Review',
        attachments: 2,
        comments: ['Initial request submitted', 'Budget approval required']
      },
      {
        id: 'pr-002',
        prNumber: 'PR-2025-002',
        title: 'IT Equipment Upgrade',
        description: 'Laptops and peripherals for new team members joining Q1',
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
        costCenter: 'CC-2001',
        workflowStage: 'Completed',
        attachments: 3,
        comments: ['Urgent requirement for new hires', 'Approved by department head', 'Ready for PO creation']
      },
      {
        id: 'pr-003',
        prNumber: 'PR-2025-003',
        title: 'Marketing Materials Q1',
        description: 'Promotional materials and marketing collateral for Q1 campaigns',
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
        rejectionReason: 'Budget exceeded for this category. Please revise quantities.',
        items: 8,
        budget: 'OPEX-2025',
        costCenter: 'CC-3001',
        workflowStage: 'Rejected',
        attachments: 1,
        comments: ['Budget review needed', 'Rejected due to budget constraints']
      },
      {
        id: 'pr-004',
        prNumber: 'PR-2025-004',
        title: 'Safety Equipment Manufacturing',
        description: 'Personal protective equipment for manufacturing floor workers',
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
        costCenter: 'CC-4001',
        workflowStage: 'Purchase Order Created',
        attachments: 4,
        comments: ['Critical safety requirement', 'Fast-tracked approval', 'PO-2025-001 created']
      },
      {
        id: 'pr-005',
        prNumber: 'PR-2025-005',
        title: 'Training & Development Services',
        description: 'External training programs for skill development initiatives',
        requestor: 'Emma Wilson',
        department: 'HR',
        requestDate: '2025-01-19',
        requiredDate: '2025-03-01',
        totalValue: 5200,
        currency: 'USD',
        status: 'Draft',
        priority: 'Medium',
        category: 'Services',
        approver: 'David Brown',
        items: 3,
        budget: 'OPEX-2025',
        costCenter: 'CC-5001',
        workflowStage: 'Draft',
        attachments: 0,
        comments: ['Draft in progress']
      }
    ];

    const sampleItems: PRItem[] = [
      {
        id: 'item-001',
        prId: 'pr-001',
        itemNumber: '001',
        description: 'A4 Copy Paper - 500 sheets',
        quantity: 50,
        unitPrice: 5.99,
        totalPrice: 299.50,
        unit: 'Pack',
        category: 'Stationery'
      },
      {
        id: 'item-002',
        prId: 'pr-001',
        itemNumber: '002',
        description: 'Blue Ballpoint Pens',
        quantity: 100,
        unitPrice: 0.75,
        totalPrice: 75.00,
        unit: 'Each',
        category: 'Stationery'
      },
      {
        id: 'item-003',
        prId: 'pr-002',
        itemNumber: '001',
        description: 'Business Laptop - Dell Latitude 5540',
        quantity: 3,
        unitPrice: 1250.00,
        totalPrice: 3750.00,
        unit: 'Each',
        category: 'Computer Hardware',
        supplier: 'Dell Technologies'
      }
    ];

    setRequisitions(samplePRs);
    setPrItems(sampleItems);
  }, []);

  const handleCreatePR = () => {
    setSelectedPR(null);
    setIsEditing(false);
    setIsViewMode(false);
    setIsDialogOpen(true);
  };

  const handleEditPR = (pr: PurchaseRequisition) => {
    setSelectedPR(pr);
    setIsEditing(true);
    setIsViewMode(false);
    setIsDialogOpen(true);
  };

  const handleViewPR = (pr: PurchaseRequisition) => {
    setSelectedPR(pr);
    setIsEditing(false);
    setIsViewMode(true);
    setIsDialogOpen(true);
  };

  const handleDeletePR = (prId: string) => {
    setRequisitions(prev => prev.filter(pr => pr.id !== prId));
    setPrItems(prev => prev.filter(item => item.prId !== prId));
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
        approvalDate: new Date().toISOString().split('T')[0],
        workflowStage: 'Approved',
        comments: [...pr.comments, `Approved on ${new Date().toLocaleDateString()}`]
      } : pr
    ));
    toast({
      title: 'Purchase Requisition Approved',
      description: 'Purchase requisition has been approved successfully.',
    });
  };

  const handleRejectPR = (prId: string, reason: string) => {
    setRequisitions(prev => prev.map(pr => 
      pr.id === prId ? { 
        ...pr, 
        status: 'Rejected' as const, 
        approvalDate: new Date().toISOString().split('T')[0],
        rejectionReason: reason,
        workflowStage: 'Rejected',
        comments: [...pr.comments, `Rejected: ${reason}`]
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
        pr.id === selectedPR.id ? { 
          ...pr, 
          ...prData,
          comments: [...pr.comments, `Updated on ${new Date().toLocaleDateString()}`]
        } : pr
      ));
      toast({
        title: 'Purchase Requisition Updated',
        description: 'Purchase requisition has been successfully updated.',
      });
    } else {
      const newPR: PurchaseRequisition = {
        id: `pr-${String(requisitions.length + 1).padStart(3, '0')}`,
        prNumber: `PR-2025-${String(requisitions.length + 1).padStart(3, '0')}`,
        requestDate: new Date().toISOString().split('T')[0],
        status: 'Draft',
        currency: 'USD',
        items: 0,
        workflowStage: 'Draft',
        attachments: 0,
        comments: ['Requisition created'],
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

  const handleConvertToPO = (prId: string) => {
    setRequisitions(prev => prev.map(pr => 
      pr.id === prId ? { 
        ...pr, 
        status: 'Converted to PO' as const,
        workflowStage: 'Purchase Order Created',
        comments: [...pr.comments, `Converted to Purchase Order on ${new Date().toLocaleDateString()}`]
      } : pr
    ));
    toast({
      title: 'Converted to Purchase Order',
      description: 'Purchase requisition has been converted to a purchase order.',
    });
  };

  const getStatusColor = (status: string) => {
    const colors = {
      'Draft': 'bg-gray-100 text-gray-800',
      'Submitted': 'bg-blue-100 text-blue-800',
      'Pending Approval': 'bg-orange-100 text-orange-800',
      'Approved': 'bg-green-100 text-green-800',
      'Rejected': 'bg-red-100 text-red-800',
      'Converted to PO': 'bg-purple-100 text-purple-800',
      'Cancelled': 'bg-gray-100 text-gray-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      'Low': 'bg-green-100 text-green-800',
      'Medium': 'bg-yellow-100 text-yellow-800',
      'High': 'bg-orange-100 text-orange-800',
      'Critical': 'bg-red-100 text-red-800'
    };
    return colors[priority as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const prColumns: EnhancedColumn[] = [
    { key: 'prNumber', header: 'PR Number', sortable: true, searchable: true },
    { key: 'title', header: 'Title', sortable: true, searchable: true },
    { key: 'requestor', header: 'Requestor', sortable: true, searchable: true },
    { key: 'department', header: 'Department', sortable: true, filterable: true, filterOptions: [
      { label: 'Finance', value: 'Finance' },
      { label: 'IT', value: 'IT' },
      { label: 'Marketing', value: 'Marketing' },
      { label: 'Manufacturing', value: 'Manufacturing' },
      { label: 'HR', value: 'HR' }
    ]},
    { key: 'requestDate', header: 'Request Date', sortable: true },
    { key: 'requiredDate', header: 'Required Date', sortable: true },
    { 
      key: 'totalValue', 
      header: 'Total Value',
      sortable: true,
      render: (value: number, row: PurchaseRequisition) => `$${value.toLocaleString()} ${row.currency}`
    },
    { 
      key: 'priority', 
      header: 'Priority',
      filterable: true,
      filterOptions: [
        { label: 'Low', value: 'Low' },
        { label: 'Medium', value: 'Medium' },
        { label: 'High', value: 'High' },
        { label: 'Critical', value: 'Critical' }
      ],
      render: (value: string) => (
        <Badge className={getPriorityColor(value)}>
          {value}
        </Badge>
      )
    },
    { 
      key: 'status', 
      header: 'Status',
      filterable: true,
      filterOptions: [
        { label: 'Draft', value: 'Draft' },
        { label: 'Submitted', value: 'Submitted' },
        { label: 'Pending Approval', value: 'Pending Approval' },
        { label: 'Approved', value: 'Approved' },
        { label: 'Rejected', value: 'Rejected' },
        { label: 'Converted to PO', value: 'Converted to PO' }
      ],
      render: (value: string) => (
        <Badge className={getStatusColor(value)}>
          {value}
        </Badge>
      )
    },
    { key: 'workflowStage', header: 'Workflow Stage', sortable: true }
  ];

  const prActions: TableAction[] = [
    {
      label: 'View',
      icon: <Eye className="h-4 w-4" />,
      onClick: (row: PurchaseRequisition) => handleViewPR(row),
      variant: 'ghost'
    },
    {
      label: 'Edit',
      icon: <Edit className="h-4 w-4" />,
      onClick: (row: PurchaseRequisition) => handleEditPR(row),
      variant: 'ghost',
      condition: (row: PurchaseRequisition) => row.status === 'Draft' || row.status === 'Submitted'
    },
    {
      label: 'Approve',
      icon: <CheckCircle className="h-4 w-4" />,
      onClick: (row: PurchaseRequisition) => handleApprovePR(row.id),
      variant: 'ghost',
      condition: (row: PurchaseRequisition) => row.status === 'Pending Approval'
    },
    {
      label: 'Convert to PO',
      icon: <FileText className="h-4 w-4" />,
      onClick: (row: PurchaseRequisition) => handleConvertToPO(row.id),
      variant: 'ghost',
      condition: (row: PurchaseRequisition) => row.status === 'Approved'
    }
  ];

  const bulkActions: TableAction[] = [
    {
      label: 'Bulk Approve',
      icon: <CheckCircle className="h-4 w-4" />,
      onClick: (rows: PurchaseRequisition[]) => {
        rows.forEach(row => {
          if (row.status === 'Pending Approval') {
            handleApprovePR(row.id);
          }
        });
      },
      variant: 'default'
    },
    {
      label: 'Export Selected',
      icon: <Download className="h-4 w-4" />,
      onClick: (rows: PurchaseRequisition[]) => {
        console.log('Exporting selected rows:', rows);
        toast({
          title: 'Export Started',
          description: `Exporting ${rows.length} selected requisitions.`,
        });
      },
      variant: 'outline'
    }
  ];

  const filteredPRs = requisitions.filter(pr => {
    const matchesSearch = pr.prNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pr.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pr.requestor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || pr.status.toLowerCase().replace(' ', '') === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // Analytics data
  const statusDistribution = [
    { name: 'Draft', value: requisitions.filter(pr => pr.status === 'Draft').length, color: '#94a3b8' },
    { name: 'Pending', value: requisitions.filter(pr => pr.status === 'Pending Approval').length, color: '#f59e0b' },
    { name: 'Approved', value: requisitions.filter(pr => pr.status === 'Approved').length, color: '#10b981' },
    { name: 'Rejected', value: requisitions.filter(pr => pr.status === 'Rejected').length, color: '#ef4444' }
  ];

  const monthlyTrend = [
    { month: 'Jan', count: 28, value: 145000 },
    { month: 'Feb', count: 32, value: 189000 },
    { month: 'Mar', count: 25, value: 134000 },
    { month: 'Apr', count: 38, value: 213000 },
    { month: 'May', count: 42, value: 267000 },
    { month: 'Jun', count: 35, value: 198000 }
  ];

  const departmentData = [
    { department: 'IT', count: 12, value: 87500 },
    { department: 'Manufacturing', count: 8, value: 45600 },
    { department: 'Marketing', count: 6, value: 23400 },
    { department: 'Finance', count: 4, value: 12300 },
    { department: 'HR', count: 3, value: 8900 }
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
          voiceIntroduction="Welcome to Purchase Requisitions Management with comprehensive workflow capabilities."
        />
      </div>

      {/* Voice Training Component */}
      <VoiceTrainingComponent 
        module="Purchase Requisitions"
        topic="Purchase Requisition Management"
        examples={[
          "Create a new purchase requisition for office supplies with proper approval workflow",
          "Track requisition status from draft to purchase order conversion",
          "Manage bulk approvals and rejections with detailed comments",
          "Analyze spending patterns and departmental requisition trends"
        ]}
        detailLevel="advanced"
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{requisitions.length}</div>
            <div className="text-sm text-muted-foreground">Total Requisitions</div>
            <div className="text-sm text-green-600">+15% vs last month</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">
              {requisitions.filter(pr => pr.status === 'Pending Approval').length}
            </div>
            <div className="text-sm text-muted-foreground">Pending Approval</div>
            <div className="text-sm text-orange-600">Requires attention</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">
              ${requisitions.reduce((sum, pr) => sum + pr.totalValue, 0).toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">Total Value</div>
            <div className="text-sm text-blue-600">+22% vs last month</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">2.3 days</div>
            <div className="text-sm text-muted-foreground">Avg Processing Time</div>
            <div className="text-sm text-green-600">-0.5 days improvement</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Purchase Requisitions Management</h2>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Advanced Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export All
          </Button>
          <Button onClick={handleCreatePR}>
            <Plus className="h-4 w-4 mr-2" />
            Create Requisition
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="requisitions">Requisitions</TabsTrigger>
          <TabsTrigger value="workflow">Workflow</TabsTrigger>
          <TabsTrigger value="approvals">Approvals</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="requisitions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Purchase Requisition Portfolio</CardTitle>
            </CardHeader>
            <CardContent>
              <EnhancedDataTable 
                columns={prColumns}
                data={filteredPRs}
                actions={prActions}
                bulkActions={bulkActions}
                searchPlaceholder="Search requisitions by PR number, title, or requestor..."
                exportable={true}
                refreshable={true}
                onRefresh={() => {
                  toast({
                    title: 'Data Refreshed',
                    description: 'Purchase requisitions data has been updated.',
                  });
                }}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="workflow" className="space-y-4">
          <WorkflowManager 
            entityType="purchase-requisition"
            entityId="global"
            onWorkflowComplete={(instanceId) => {
              toast({
                title: 'Workflow Completed',
                description: `Workflow ${instanceId} has been completed successfully.`,
              });
            }}
            onWorkflowCancel={(instanceId) => {
              toast({
                title: 'Workflow Cancelled',
                description: `Workflow ${instanceId} has been cancelled.`,
              });
            }}
          />
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
                  .map((pr) => (
                    <div key={pr.id} className="p-4 border rounded-lg bg-orange-50 border-orange-200">
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
                        <Button size="sm" variant="outline" onClick={() => handleViewPR(pr)}>
                          <FileText className="h-4 w-4 mr-2" />
                          Review Details
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
                <CardTitle>Status Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={statusDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {statusDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Monthly Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyTrend}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="count" stroke="#8884d8" name="Count" />
                    <Line type="monotone" dataKey="value" stroke="#82ca9d" name="Value ($)" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Department Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={departmentData}>
                    <XAxis dataKey="department" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#8884d8" name="Requisitions" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Key Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Approval Rate</span>
                  <span className="font-bold text-green-600">89%</span>
                </div>
                <div className="flex justify-between">
                  <span>Avg Value per PR</span>
                  <span className="font-bold">$4,075</span>
                </div>
                <div className="flex justify-between">
                  <span>Budget Utilization</span>
                  <span className="font-bold text-orange-600">73%</span>
                </div>
                <div className="flex justify-between">
                  <span>Processing Efficiency</span>
                  <span className="font-bold text-blue-600">94%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Reports</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Pending Approvals Report
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Department Spending Analysis
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Budget Utilization Report
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Supplier Analysis Report
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Scheduled Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Weekly PR Summary</span>
                    <Badge variant="outline">Every Monday</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Monthly Analytics</span>
                    <Badge variant="outline">1st of Month</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Quarterly Review</span>
                    <Badge variant="outline">Quarterly</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {isViewMode ? 'View Purchase Requisition' : 
               isEditing ? 'Edit Purchase Requisition' : 
               'Create New Purchase Requisition'}
            </DialogTitle>
          </DialogHeader>
          <PRForm 
            pr={selectedPR}
            items={prItems.filter(item => item.prId === selectedPR?.id)}
            onSave={handleSavePR}
            onCancel={() => setIsDialogOpen(false)}
            isEditing={isEditing}
            isViewMode={isViewMode}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

const PRForm: React.FC<{
  pr: PurchaseRequisition | null;
  items: PRItem[];
  onSave: (data: Partial<PurchaseRequisition>) => void;
  onCancel: () => void;
  isEditing: boolean;
  isViewMode: boolean;
}> = ({ pr, items, onSave, onCancel, isEditing, isViewMode }) => {
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
    if (!isViewMode) {
      onSave(formData);
    }
  };

  if (isViewMode) {
    return (
      <div className="space-y-6">
        <Tabs defaultValue="details" className="w-full">
          <TabsList>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="items">Items ({items.length})</TabsTrigger>
            <TabsTrigger value="workflow">Workflow</TabsTrigger>
            <TabsTrigger value="comments">Comments</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>PR Number</Label>
                <div className="font-medium">{pr?.prNumber}</div>
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Badge className={getStatusColor(pr?.status || '')}>{pr?.status}</Badge>
              </div>
              <div className="space-y-2">
                <Label>Title</Label>
                <div>{pr?.title}</div>
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <div>{pr?.category}</div>
              </div>
              <div className="space-y-2">
                <Label>Requestor</Label>
                <div>{pr?.requestor}</div>
              </div>
              <div className="space-y-2">
                <Label>Department</Label>
                <div>{pr?.department}</div>
              </div>
              <div className="space-y-2">
                <Label>Total Value</Label>
                <div className="font-medium">${pr?.totalValue.toLocaleString()} {pr?.currency}</div>
              </div>
              <div className="space-y-2">
                <Label>Priority</Label>
                <Badge className={getPriorityColor(pr?.priority || '')}>{pr?.priority}</Badge>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <div className="p-3 bg-gray-50 rounded">{pr?.description}</div>
            </div>
          </TabsContent>

          <TabsContent value="items" className="space-y-4">
            {items.length > 0 ? (
              <div className="space-y-3">
                {items.map((item, index) => (
                  <div key={item.id} className="p-3 border rounded">
                    <div className="grid grid-cols-4 gap-4">
                      <div>
                        <Label>Item #{item.itemNumber}</Label>
                        <div className="font-medium">{item.description}</div>
                      </div>
                      <div>
                        <Label>Quantity</Label>
                        <div>{item.quantity} {item.unit}</div>
                      </div>
                      <div>
                        <Label>Unit Price</Label>
                        <div>${item.unitPrice.toFixed(2)}</div>
                      </div>
                      <div>
                        <Label>Total</Label>
                        <div className="font-medium">${item.totalPrice.toFixed(2)}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No items added to this requisition yet
              </div>
            )}
          </TabsContent>

          <TabsContent value="workflow" className="space-y-4">
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                <div className="font-medium">Current Stage: {pr?.workflowStage}</div>
                <div className="text-sm text-muted-foreground">Assigned to: {pr?.approver}</div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="comments" className="space-y-4">
            <div className="space-y-3">
              {pr?.comments?.map((comment, index) => (
                <div key={index} className="p-3 bg-gray-50 border rounded">
                  <div className="text-sm">{comment}</div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end">
          <Button onClick={onCancel}>Close</Button>
        </div>
      </div>
    );
  }

  function getStatusColor(status: string): string {
    const colors = {
      'Draft': 'bg-gray-100 text-gray-800',
      'Submitted': 'bg-blue-100 text-blue-800',
      'Pending Approval': 'bg-orange-100 text-orange-800',
      'Approved': 'bg-green-100 text-green-800',
      'Rejected': 'bg-red-100 text-red-800',
      'Converted to PO': 'bg-purple-100 text-purple-800',
      'Cancelled': 'bg-gray-100 text-gray-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  }

  function getPriorityColor(priority: string): string {
    const colors = {
      'Low': 'bg-green-100 text-green-800',
      'Medium': 'bg-yellow-100 text-yellow-800',
      'High': 'bg-orange-100 text-orange-800',
      'Critical': 'bg-red-100 text-red-800'
    };
    return colors[priority as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  }

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
              <SelectItem value="Software">Software</SelectItem>
              <SelectItem value="Equipment">Equipment</SelectItem>
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
          <Select value={formData.department} onValueChange={(value) => setFormData(prev => ({ ...prev, department: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Select department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Finance">Finance</SelectItem>
              <SelectItem value="IT">IT</SelectItem>
              <SelectItem value="Marketing">Marketing</SelectItem>
              <SelectItem value="Manufacturing">Manufacturing</SelectItem>
              <SelectItem value="HR">HR</SelectItem>
              <SelectItem value="Sales">Sales</SelectItem>
              <SelectItem value="Operations">Operations</SelectItem>
            </SelectContent>
          </Select>
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
            step="0.01"
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
          rows={3}
        />
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {isEditing ? 'Update Requisition' : 'Create Requisition'}
        </Button>
      </div>
    </form>
  );
};

export default PurchaseRequisitions;

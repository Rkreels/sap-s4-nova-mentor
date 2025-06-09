
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { ArrowLeft, Plus, Edit, Eye, FileText, CheckCircle, X } from 'lucide-react';
import PageHeader from '../../components/page/PageHeader';
import { useVoiceAssistantContext } from '../../context/VoiceAssistantContext';
import { useVoiceAssistant } from '../../hooks/useVoiceAssistant';
import EnhancedDataTable, { EnhancedColumn, TableAction } from '../../components/data/EnhancedDataTable';
import { useToast } from '../../hooks/use-toast';

interface PurchaseRequisition {
  id: string;
  prNumber: string;
  title: string;
  requestor: string;
  department: string;
  requestDate: string;
  requiredDate: string;
  status: 'Draft' | 'Submitted' | 'Approved' | 'Rejected' | 'Converted';
  totalValue: number;
  currency: string;
  urgency: 'Low' | 'Medium' | 'High' | 'Critical';
  approver?: string;
  items: number;
}

const PurchaseRequisitions: React.FC = () => {
  const navigate = useNavigate();
  const { isEnabled } = useVoiceAssistantContext();
  const { speak } = useVoiceAssistant();
  const [activeTab, setActiveTab] = useState('requisitions');
  const [requisitions, setRequisitions] = useState<PurchaseRequisition[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    if (isEnabled) {
      speak('Welcome to Purchase Requisitions. Create and manage internal purchase requests for approval and conversion to purchase orders.');
    }
  }, [isEnabled, speak]);

  useEffect(() => {
    const sampleRequisitions: PurchaseRequisition[] = [
      {
        id: 'pr-001',
        prNumber: 'PR-2025-001',
        title: 'Office Supplies for Q1',
        requestor: 'Sarah Johnson',
        department: 'Finance',
        requestDate: '2025-01-24',
        requiredDate: '2025-02-10',
        status: 'Approved',
        totalValue: 1250,
        currency: 'USD',
        urgency: 'Medium',
        approver: 'John Smith',
        items: 12
      },
      {
        id: 'pr-002',
        prNumber: 'PR-2025-002',
        title: 'IT Equipment Upgrade',
        requestor: 'Mike Wilson',
        department: 'IT',
        requestDate: '2025-01-22',
        requiredDate: '2025-02-05',
        status: 'Converted',
        totalValue: 8750,
        currency: 'USD',
        urgency: 'High',
        approver: 'Emma Davis',
        items: 5
      },
      {
        id: 'pr-003',
        prNumber: 'PR-2025-003',
        title: 'Manufacturing Tools',
        requestor: 'David Brown',
        department: 'Manufacturing',
        requestDate: '2025-01-26',
        requiredDate: '2025-02-15',
        status: 'Submitted',
        totalValue: 3200,
        currency: 'USD',
        urgency: 'Low',
        items: 8
      }
    ];
    setRequisitions(sampleRequisitions);
  }, []);

  const getStatusColor = (status: string) => {
    const colors = {
      'Draft': 'bg-gray-100 text-gray-800',
      'Submitted': 'bg-blue-100 text-blue-800',
      'Approved': 'bg-green-100 text-green-800',
      'Rejected': 'bg-red-100 text-red-800',
      'Converted': 'bg-purple-100 text-purple-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getUrgencyColor = (urgency: string) => {
    const colors = {
      'Low': 'bg-gray-100 text-gray-800',
      'Medium': 'bg-yellow-100 text-yellow-800',
      'High': 'bg-orange-100 text-orange-800',
      'Critical': 'bg-red-100 text-red-800'
    };
    return colors[urgency as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const columns: EnhancedColumn[] = [
    { key: 'prNumber', header: 'PR Number', sortable: true, searchable: true },
    { key: 'title', header: 'Title', searchable: true },
    { key: 'requestor', header: 'Requestor', sortable: true, searchable: true },
    { key: 'department', header: 'Department', filterable: true, filterOptions: [
      { label: 'Finance', value: 'Finance' },
      { label: 'IT', value: 'IT' },
      { label: 'Manufacturing', value: 'Manufacturing' },
      { label: 'HR', value: 'HR' }
    ]},
    { key: 'requestDate', header: 'Request Date', sortable: true },
    { key: 'requiredDate', header: 'Required Date', sortable: true },
    { 
      key: 'status', 
      header: 'Status',
      filterable: true,
      filterOptions: [
        { label: 'Draft', value: 'Draft' },
        { label: 'Submitted', value: 'Submitted' },
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
      key: 'urgency', 
      header: 'Urgency',
      filterable: true,
      filterOptions: [
        { label: 'Low', value: 'Low' },
        { label: 'Medium', value: 'Medium' },
        { label: 'High', value: 'High' },
        { label: 'Critical', value: 'Critical' }
      ],
      render: (value: string) => (
        <Badge className={getUrgencyColor(value)}>
          {value}
        </Badge>
      )
    },
    { 
      key: 'totalValue', 
      header: 'Total Value',
      sortable: true,
      render: (value: number, row: PurchaseRequisition) => `${row.currency} ${value.toLocaleString()}`
    }
  ];

  const actions: TableAction[] = [
    {
      label: 'View',
      icon: <Eye className="h-4 w-4" />,
      onClick: (row: PurchaseRequisition) => {
        toast({
          title: 'View Requisition',
          description: `Opening details for ${row.prNumber}`,
        });
      },
      variant: 'ghost'
    },
    {
      label: 'Edit',
      icon: <Edit className="h-4 w-4" />,
      onClick: (row: PurchaseRequisition) => {
        toast({
          title: 'Edit Requisition',
          description: `Editing ${row.prNumber}`,
        });
      },
      variant: 'ghost',
      condition: (row: PurchaseRequisition) => row.status === 'Draft'
    },
    {
      label: 'Approve',
      icon: <CheckCircle className="h-4 w-4" />,
      onClick: (row: PurchaseRequisition) => {
        toast({
          title: 'Approve Requisition',
          description: `Approving ${row.prNumber}`,
        });
      },
      variant: 'default',
      condition: (row: PurchaseRequisition) => row.status === 'Submitted'
    },
    {
      label: 'Convert to PO',
      icon: <FileText className="h-4 w-4" />,
      onClick: (row: PurchaseRequisition) => {
        navigate('/procurement/purchase-orders');
        toast({
          title: 'Convert to PO',
          description: `Converting ${row.prNumber} to Purchase Order`,
        });
      },
      variant: 'default',
      condition: (row: PurchaseRequisition) => row.status === 'Approved'
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
          description="Create and manage internal purchase requests for approval"
          voiceIntroduction="Welcome to Purchase Requisitions for internal procurement requests."
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
              {requisitions.filter(r => r.status === 'Submitted').length}
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
            <div className="text-sm text-green-600">Ready for PO</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">
              ${requisitions.reduce((sum, r) => sum + r.totalValue, 0).toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">Total Value</div>
            <div className="text-sm text-green-600">This month</div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="requisitions">Requisitions</TabsTrigger>
          <TabsTrigger value="approvals">Pending Approvals</TabsTrigger>
          <TabsTrigger value="approved">Ready for PO</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="requisitions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                Purchase Requisitions
                <Button onClick={() => toast({ title: 'Create Requisition', description: 'Opening requisition creation form' })}>
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
                searchPlaceholder="Search requisitions by number, title, or requestor..."
                exportable={true}
                refreshable={true}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="approvals" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {requisitions.filter(r => r.status === 'Submitted').map((requisition) => (
              <Card key={requisition.id}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center justify-between">
                    {requisition.prNumber}
                    <Badge className={getUrgencyColor(requisition.urgency)}>
                      {requisition.urgency}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Title:</span>
                      <span className="font-medium">{requisition.title}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Requestor:</span>
                      <span className="font-medium">{requisition.requestor}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Department:</span>
                      <span className="font-medium">{requisition.department}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Value:</span>
                      <span className="font-medium">{requisition.currency} {requisition.totalValue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Required By:</span>
                      <span className="font-medium">{requisition.requiredDate}</span>
                    </div>
                    <div className="flex space-x-2 mt-4">
                      <Button size="sm">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Approve
                      </Button>
                      <Button size="sm" variant="destructive">
                        <X className="h-4 w-4 mr-2" />
                        Reject
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="approved" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {requisitions.filter(r => r.status === 'Approved').map((requisition) => (
              <Card key={requisition.id}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center justify-between">
                    {requisition.prNumber}
                    <Badge className={getStatusColor(requisition.status)}>
                      {requisition.status}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Title:</span>
                      <span className="font-medium">{requisition.title}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Requestor:</span>
                      <span className="font-medium">{requisition.requestor}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Value:</span>
                      <span className="font-medium">{requisition.currency} {requisition.totalValue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Approved By:</span>
                      <span className="font-medium">{requisition.approver}</span>
                    </div>
                    <div className="flex space-x-2 mt-4">
                      <Button size="sm" onClick={() => navigate('/procurement/purchase-orders')}>
                        <FileText className="h-4 w-4 mr-2" />
                        Convert to PO
                      </Button>
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Requisition Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded">
                    <h4 className="font-semibold mb-2">Processing Statistics</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Total Requisitions:</span>
                        <span className="font-medium">{requisitions.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Approval Rate:</span>
                        <span className="font-medium">87%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Avg. Processing Time:</span>
                        <span className="font-medium">2.3 days</span>
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
                  {['Draft', 'Submitted', 'Approved', 'Rejected', 'Converted'].map((status) => {
                    const count = requisitions.filter(r => r.status === status).length;
                    const percentage = requisitions.length > 0 ? Math.round((count / requisitions.length) * 100) : 0;
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

export default PurchaseRequisitions;

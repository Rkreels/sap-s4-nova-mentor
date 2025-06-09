
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { ArrowLeft, Plus, FileText, CheckCircle, XCircle, Clock, Send } from 'lucide-react';
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
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  status: 'Draft' | 'Submitted' | 'Approved' | 'Rejected' | 'Converted';
  requestDate: string;
  requiredDate: string;
  totalAmount: number;
  currency: string;
  approver: string;
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
      speak('Welcome to Purchase Requisitions. Create and manage internal purchase requests and approval workflows.');
    }
  }, [isEnabled, speak]);

  useEffect(() => {
    const sampleRequisitions: PurchaseRequisition[] = [
      {
        id: 'pr-001',
        prNumber: 'PR-2025-001',
        title: 'Office Equipment Request',
        requestor: 'John Smith',
        department: 'IT Department',
        priority: 'Medium',
        status: 'Approved',
        requestDate: '2025-01-20',
        requiredDate: '2025-02-15',
        totalAmount: 5500,
        currency: 'USD',
        approver: 'Sarah Wilson',
        items: 8
      },
      {
        id: 'pr-002',
        prNumber: 'PR-2025-002',
        title: 'Software Licenses',
        requestor: 'Mike Johnson',
        department: 'Development',
        priority: 'High',
        status: 'Submitted',
        requestDate: '2025-01-25',
        requiredDate: '2025-02-01',
        totalAmount: 12000,
        currency: 'USD',
        approver: '',
        items: 5
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

  const getPriorityColor = (priority: string) => {
    const colors = {
      'Low': 'bg-blue-100 text-blue-800',
      'Medium': 'bg-yellow-100 text-yellow-800',
      'High': 'bg-orange-100 text-orange-800',
      'Urgent': 'bg-red-100 text-red-800'
    };
    return colors[priority as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const columns: EnhancedColumn[] = [
    { key: 'prNumber', header: 'PR Number', sortable: true, searchable: true },
    { key: 'title', header: 'Title', searchable: true },
    { key: 'requestor', header: 'Requestor', sortable: true, searchable: true },
    { key: 'department', header: 'Department', filterable: true, filterOptions: [
      { label: 'IT Department', value: 'IT Department' },
      { label: 'Development', value: 'Development' },
      { label: 'HR', value: 'HR' },
      { label: 'Finance', value: 'Finance' }
    ]},
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
    { key: 'requiredDate', header: 'Required Date', sortable: true },
    { 
      key: 'totalAmount', 
      header: 'Amount',
      sortable: true,
      render: (value: number, row: PurchaseRequisition) => `${row.currency} ${value.toLocaleString()}`
    }
  ];

  const actions: TableAction[] = [
    {
      label: 'Approve',
      icon: <CheckCircle className="h-4 w-4" />,
      onClick: (row: PurchaseRequisition) => {
        toast({
          title: 'Approve Requisition',
          description: `Approving requisition ${row.prNumber}`,
        });
      },
      variant: 'default',
      condition: (row: PurchaseRequisition) => row.status === 'Submitted'
    },
    {
      label: 'Convert to PO',
      icon: <Send className="h-4 w-4" />,
      onClick: (row: PurchaseRequisition) => {
        toast({
          title: 'Convert to Purchase Order',
          description: `Converting ${row.prNumber} to purchase order`,
        });
      },
      variant: 'default',
      condition: (row: PurchaseRequisition) => row.status === 'Approved'
    },
    {
      label: 'Reject',
      icon: <XCircle className="h-4 w-4" />,
      onClick: (row: PurchaseRequisition) => {
        toast({
          title: 'Reject Requisition',
          description: `Rejecting requisition ${row.prNumber}`,
        });
      },
      variant: 'destructive',
      condition: (row: PurchaseRequisition) => row.status === 'Submitted'
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
          description="Create and manage internal purchase requests and approval workflows"
          voiceIntroduction="Welcome to Purchase Requisitions for comprehensive request management."
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
            <div className="text-sm text-green-600">Ready for conversion</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">
              ${requisitions.reduce((sum, r) => sum + r.totalAmount, 0).toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">Total Value</div>
            <div className="text-sm text-purple-600">All requisitions</div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="requisitions">Requisitions</TabsTrigger>
          <TabsTrigger value="approval">Approval Workflow</TabsTrigger>
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

        <TabsContent value="approval" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {requisitions.filter(r => r.status === 'Submitted').map((requisition) => (
              <Card key={requisition.id}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center justify-between">
                    {requisition.prNumber}
                    <Badge className={getPriorityColor(requisition.priority)}>
                      {requisition.priority}
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
                      <span>Amount:</span>
                      <span className="font-medium">{requisition.currency} {requisition.totalAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Required Date:</span>
                      <span className="font-medium">{requisition.requiredDate}</span>
                    </div>
                    <div className="flex space-x-2 mt-4">
                      <Button size="sm">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Approve
                      </Button>
                      <Button size="sm" variant="destructive">
                        <XCircle className="h-4 w-4 mr-2" />
                        Reject
                      </Button>
                      <Button size="sm" variant="outline">
                        <FileText className="h-4 w-4 mr-2" />
                        Review
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
                    <h4 className="font-semibold mb-2">Monthly Statistics</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Total Requisitions:</span>
                        <span className="font-medium">{requisitions.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Approval Rate:</span>
                        <span className="font-medium">85%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Avg. Processing Time:</span>
                        <span className="font-medium">3.2 days</span>
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

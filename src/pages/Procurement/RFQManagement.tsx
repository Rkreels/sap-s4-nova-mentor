
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { ArrowLeft, Plus, FileText, Send, Users, Clock, TrendingUp } from 'lucide-react';
import PageHeader from '../../components/page/PageHeader';
import { useVoiceAssistantContext } from '../../context/VoiceAssistantContext';
import { useVoiceAssistant } from '../../hooks/useVoiceAssistant';
import EnhancedDataTable, { EnhancedColumn, TableAction } from '../../components/data/EnhancedDataTable';
import { useToast } from '../../hooks/use-toast';

interface RFQ {
  id: string;
  rfqNumber: string;
  title: string;
  category: string;
  status: 'Draft' | 'Published' | 'Response Period' | 'Evaluation' | 'Awarded' | 'Closed';
  publishDate: string;
  responseDeadline: string;
  totalSuppliers: number;
  responsesReceived: number;
  estimatedValue: number;
  currency: string;
  buyer: string;
}

const RFQManagement: React.FC = () => {
  const navigate = useNavigate();
  const { isEnabled } = useVoiceAssistantContext();
  const { speak } = useVoiceAssistant();
  const [activeTab, setActiveTab] = useState('rfqs');
  const [rfqs, setRfqs] = useState<RFQ[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    if (isEnabled) {
      speak('Welcome to RFQ Management. Request quotes from suppliers and manage bidding processes.');
    }
  }, [isEnabled, speak]);

  useEffect(() => {
    const sampleRFQs: RFQ[] = [
      {
        id: 'rfq-001',
        rfqNumber: 'RFQ-2025-001',
        title: 'IT Infrastructure Equipment',
        category: 'Technology',
        status: 'Response Period',
        publishDate: '2025-01-20',
        responseDeadline: '2025-02-05',
        totalSuppliers: 8,
        responsesReceived: 5,
        estimatedValue: 250000,
        currency: 'USD',
        buyer: 'John Smith'
      },
      {
        id: 'rfq-002',
        rfqNumber: 'RFQ-2025-002',
        title: 'Office Furniture Supply',
        category: 'Furniture',
        status: 'Evaluation',
        publishDate: '2025-01-15',
        responseDeadline: '2025-01-30',
        totalSuppliers: 6,
        responsesReceived: 6,
        estimatedValue: 75000,
        currency: 'USD',
        buyer: 'Sarah Wilson'
      }
    ];
    setRfqs(sampleRFQs);
  }, []);

  const getStatusColor = (status: string) => {
    const colors = {
      'Draft': 'bg-gray-100 text-gray-800',
      'Published': 'bg-blue-100 text-blue-800',
      'Response Period': 'bg-yellow-100 text-yellow-800',
      'Evaluation': 'bg-orange-100 text-orange-800',
      'Awarded': 'bg-green-100 text-green-800',
      'Closed': 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const columns: EnhancedColumn[] = [
    { key: 'rfqNumber', header: 'RFQ Number', sortable: true, searchable: true },
    { key: 'title', header: 'Title', searchable: true },
    { key: 'category', header: 'Category', filterable: true, filterOptions: [
      { label: 'Technology', value: 'Technology' },
      { label: 'Furniture', value: 'Furniture' },
      { label: 'Services', value: 'Services' },
      { label: 'Manufacturing', value: 'Manufacturing' }
    ]},
    { 
      key: 'status', 
      header: 'Status',
      filterable: true,
      filterOptions: [
        { label: 'Draft', value: 'Draft' },
        { label: 'Published', value: 'Published' },
        { label: 'Response Period', value: 'Response Period' },
        { label: 'Evaluation', value: 'Evaluation' },
        { label: 'Awarded', value: 'Awarded' },
        { label: 'Closed', value: 'Closed' }
      ],
      render: (value: string) => (
        <Badge className={getStatusColor(value)}>
          {value}
        </Badge>
      )
    },
    { key: 'responseDeadline', header: 'Deadline', sortable: true },
    { 
      key: 'responsesReceived', 
      header: 'Responses',
      render: (value: number, row: RFQ) => `${value}/${row.totalSuppliers}`
    },
    { 
      key: 'estimatedValue', 
      header: 'Est. Value',
      sortable: true,
      render: (value: number, row: RFQ) => `${row.currency} ${value.toLocaleString()}`
    },
    { key: 'buyer', header: 'Buyer', searchable: true }
  ];

  const actions: TableAction[] = [
    {
      label: 'Publish',
      icon: <Send className="h-4 w-4" />,
      onClick: (row: RFQ) => {
        toast({
          title: 'Publish RFQ',
          description: `Publishing RFQ ${row.rfqNumber}`,
        });
      },
      variant: 'default',
      condition: (row: RFQ) => row.status === 'Draft'
    },
    {
      label: 'Evaluate',
      icon: <TrendingUp className="h-4 w-4" />,
      onClick: (row: RFQ) => {
        toast({
          title: 'Evaluate Responses',
          description: `Opening evaluation for ${row.rfqNumber}`,
        });
      },
      variant: 'default',
      condition: (row: RFQ) => row.status === 'Response Period' && row.responsesReceived > 0
    },
    {
      label: 'View Details',
      icon: <FileText className="h-4 w-4" />,
      onClick: (row: RFQ) => {
        toast({
          title: 'View RFQ Details',
          description: `Opening details for ${row.rfqNumber}`,
        });
      },
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
          title="RFQ Management"
          description="Request quotes from suppliers and manage competitive bidding processes"
          voiceIntroduction="Welcome to RFQ Management for comprehensive quote management."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{rfqs.length}</div>
            <div className="text-sm text-muted-foreground">Total RFQs</div>
            <div className="text-sm text-blue-600">This month</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">
              {rfqs.filter(r => r.status === 'Response Period').length}
            </div>
            <div className="text-sm text-muted-foreground">Active RFQs</div>
            <div className="text-sm text-green-600">Collecting responses</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">
              {rfqs.reduce((sum, r) => sum + r.responsesReceived, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Total Responses</div>
            <div className="text-sm text-purple-600">All RFQs</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">
              ${rfqs.reduce((sum, r) => sum + r.estimatedValue, 0).toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">Total Est. Value</div>
            <div className="text-sm text-orange-600">All active RFQs</div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="rfqs">RFQs</TabsTrigger>
          <TabsTrigger value="active">Active Bidding</TabsTrigger>
          <TabsTrigger value="evaluation">Evaluation</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="rfqs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                Request for Quotations
                <Button onClick={() => toast({ title: 'Create RFQ', description: 'Opening RFQ creation form' })}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create RFQ
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <EnhancedDataTable 
                columns={columns}
                data={rfqs}
                actions={actions}
                searchPlaceholder="Search RFQs by number, title, or category..."
                exportable={true}
                refreshable={true}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {rfqs.filter(r => r.status === 'Response Period').map((rfq) => (
              <Card key={rfq.id}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center justify-between">
                    {rfq.title}
                    <Badge className={getStatusColor(rfq.status)}>
                      {rfq.status}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>RFQ Number:</span>
                      <span className="font-medium">{rfq.rfqNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Category:</span>
                      <span className="font-medium">{rfq.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Deadline:</span>
                      <span className="font-medium">{rfq.responseDeadline}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Responses:</span>
                      <span className="font-medium">{rfq.responsesReceived}/{rfq.totalSuppliers}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Est. Value:</span>
                      <span className="font-medium">{rfq.currency} {rfq.estimatedValue.toLocaleString()}</span>
                    </div>
                    <div className="flex space-x-2 mt-4">
                      <Button size="sm">
                        <Users className="h-4 w-4 mr-2" />
                        View Responses
                      </Button>
                      <Button size="sm" variant="outline">
                        <Clock className="h-4 w-4 mr-2" />
                        Extend Deadline
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="evaluation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Response Evaluation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {rfqs.filter(r => r.status === 'Evaluation').map((rfq) => (
                  <div key={rfq.id} className="p-4 border rounded">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold">{rfq.title}</h4>
                        <p className="text-sm text-muted-foreground">{rfq.rfqNumber}</p>
                      </div>
                      <Badge className={getStatusColor(rfq.status)}>
                        {rfq.status}
                      </Badge>
                    </div>
                    <p className="text-sm mb-3">
                      {rfq.responsesReceived} responses received from {rfq.totalSuppliers} suppliers
                    </p>
                    <div className="flex space-x-2">
                      <Button size="sm">Compare Responses</Button>
                      <Button size="sm" variant="outline">Technical Evaluation</Button>
                      <Button size="sm" variant="outline">Award Contract</Button>
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
                <CardTitle>RFQ Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded">
                    <h4 className="font-semibold mb-2">Monthly Statistics</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Total RFQs:</span>
                        <span className="font-medium">{rfqs.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Response Rate:</span>
                        <span className="font-medium">78%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Avg. Suppliers per RFQ:</span>
                        <span className="font-medium">7.2</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Category Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['Technology', 'Furniture', 'Services', 'Manufacturing'].map((category) => {
                    const count = rfqs.filter(r => r.category === category).length;
                    const percentage = rfqs.length > 0 ? Math.round((count / rfqs.length) * 100) : 0;
                    return (
                      <div key={category} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>{category}</span>
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

export default RFQManagement;

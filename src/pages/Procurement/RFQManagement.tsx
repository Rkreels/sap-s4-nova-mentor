
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { useVoiceAssistantContext } from '../../context/VoiceAssistantContext';
import { useVoiceAssistant } from '../../hooks/useVoiceAssistant';
import PageHeader from '../../components/page/PageHeader';
import DataTable from '../../components/data/DataTable';
import { ArrowLeft, Plus, Edit, Eye, Send, FileText, Download, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Input } from '../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { useToast } from '../../hooks/use-toast';

interface RFQ {
  id: string;
  rfqNumber: string;
  title: string;
  description: string;
  category: string;
  requestDate: string;
  dueDate: string;
  status: 'Draft' | 'Sent' | 'Under Evaluation' | 'Awarded' | 'Cancelled';
  vendorCount: number;
  responseCount: number;
  estimatedValue: number;
  currency: string;
  requestor: string;
  department: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  specifications: string;
  terms: string;
}

interface RFQResponse {
  id: string;
  rfqId: string;
  vendorName: string;
  submitDate: string;
  totalPrice: number;
  deliveryTime: string;
  validityPeriod: string;
  status: 'Submitted' | 'Under Review' | 'Accepted' | 'Rejected';
  score: number;
}

const RFQManagement: React.FC = () => {
  const navigate = useNavigate();
  const { isEnabled } = useVoiceAssistantContext();
  const { speak } = useVoiceAssistant();
  const [activeTab, setActiveTab] = useState('rfqs');
  const [rfqs, setRfqs] = useState<RFQ[]>([]);
  const [responses, setResponses] = useState<RFQResponse[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedRFQ, setSelectedRFQ] = useState<RFQ | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isEnabled) {
      speak('Welcome to RFQ Management. Create, manage, and evaluate Request for Quotations from suppliers.');
    }
  }, [isEnabled, speak]);

  // Sample data
  useEffect(() => {
    const sampleRFQs: RFQ[] = [
      {
        id: 'rfq-001',
        rfqNumber: 'RFQ-2025-001',
        title: 'Electronic Components Package',
        description: 'High-capacity server memory and circuit boards for data center expansion',
        category: 'Electronics',
        requestDate: '2025-01-20',
        dueDate: '2025-02-10',
        status: 'Sent',
        vendorCount: 5,
        responseCount: 3,
        estimatedValue: 150000,
        currency: 'USD',
        requestor: 'John Smith',
        department: 'IT',
        priority: 'High',
        specifications: 'DDR4 32GB modules, enterprise-grade circuit boards',
        terms: 'Net 30, FOB destination'
      },
      {
        id: 'rfq-002',
        rfqNumber: 'RFQ-2025-002',
        title: 'Office Furniture Procurement',
        description: 'Ergonomic office chairs and desks for new office setup',
        category: 'Office Supplies',
        requestDate: '2025-01-22',
        dueDate: '2025-02-15',
        status: 'Draft',
        vendorCount: 3,
        responseCount: 0,
        estimatedValue: 75000,
        currency: 'USD',
        requestor: 'Sarah Johnson',
        department: 'Facilities',
        priority: 'Medium',
        specifications: 'Adjustable height desks, lumbar support chairs',
        terms: 'Net 45, delivery included'
      },
      {
        id: 'rfq-003',
        rfqNumber: 'RFQ-2025-003',
        title: 'Manufacturing Equipment',
        description: 'Industrial machinery for production line upgrade',
        category: 'Machinery',
        requestDate: '2025-01-18',
        dueDate: '2025-02-05',
        status: 'Under Evaluation',
        vendorCount: 4,
        responseCount: 4,
        estimatedValue: 500000,
        currency: 'USD',
        requestor: 'Mike Wilson',
        department: 'Manufacturing',
        priority: 'Critical',
        specifications: 'Automated assembly line equipment with IoT capabilities',
        terms: 'Net 60, installation included'
      }
    ];

    const sampleResponses: RFQResponse[] = [
      {
        id: 'resp-001',
        rfqId: 'rfq-001',
        vendorName: 'Tech Components Inc.',
        submitDate: '2025-01-25',
        totalPrice: 142000,
        deliveryTime: '14 days',
        validityPeriod: '30 days',
        status: 'Under Review',
        score: 95
      },
      {
        id: 'resp-002',
        rfqId: 'rfq-001',
        vendorName: 'Global Electronics Ltd.',
        submitDate: '2025-01-26',
        totalPrice: 155000,
        deliveryTime: '10 days',
        validityPeriod: '45 days',
        status: 'Under Review',
        score: 88
      },
      {
        id: 'resp-003',
        rfqId: 'rfq-003',
        vendorName: 'Industrial Solutions',
        submitDate: '2025-01-30',
        totalPrice: 475000,
        deliveryTime: '45 days',
        validityPeriod: '60 days',
        status: 'Accepted',
        score: 92
      }
    ];

    setRfqs(sampleRFQs);
    setResponses(sampleResponses);
  }, []);

  const filteredRFQs = rfqs.filter(rfq => {
    const matchesSearch = rfq.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         rfq.rfqNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         rfq.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || rfq.status.toLowerCase().replace(' ', '') === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleCreateRFQ = () => {
    setSelectedRFQ(null);
    setIsEditing(false);
    setIsDialogOpen(true);
  };

  const handleEditRFQ = (rfq: RFQ) => {
    setSelectedRFQ(rfq);
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const handleDeleteRFQ = (rfqId: string) => {
    setRfqs(prev => prev.filter(r => r.id !== rfqId));
    toast({
      title: 'RFQ Deleted',
      description: 'RFQ has been successfully removed.',
    });
  };

  const handleSendRFQ = (rfqId: string) => {
    setRfqs(prev => prev.map(r => 
      r.id === rfqId ? { ...r, status: 'Sent' as const } : r
    ));
    toast({
      title: 'RFQ Sent',
      description: 'RFQ has been sent to selected vendors.',
    });
  };

  const handleSaveRFQ = (rfqData: Partial<RFQ>) => {
    if (isEditing && selectedRFQ) {
      setRfqs(prev => prev.map(r => 
        r.id === selectedRFQ.id ? { ...r, ...rfqData } : r
      ));
      toast({
        title: 'RFQ Updated',
        description: 'RFQ has been successfully updated.',
      });
    } else {
      const newRFQ: RFQ = {
        id: `rfq-${rfqs.length + 1}`,
        rfqNumber: `RFQ-2025-${String(rfqs.length + 1).padStart(3, '0')}`,
        requestDate: new Date().toISOString().split('T')[0],
        vendorCount: 0,
        responseCount: 0,
        status: 'Draft',
        currency: 'USD',
        ...rfqData as RFQ
      };
      setRfqs(prev => [...prev, newRFQ]);
      toast({
        title: 'RFQ Created',
        description: 'New RFQ has been successfully created.',
      });
    }
    setIsDialogOpen(false);
  };

  const rfqColumns = [
    { key: 'rfqNumber', header: 'RFQ Number' },
    { key: 'title', header: 'Title' },
    { key: 'category', header: 'Category' },
    { key: 'requestDate', header: 'Request Date' },
    { key: 'dueDate', header: 'Due Date' },
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
          'Sent': 'bg-blue-100 text-blue-800',
          'Under Evaluation': 'bg-yellow-100 text-yellow-800',
          'Awarded': 'bg-green-100 text-green-800',
          'Cancelled': 'bg-red-100 text-red-800'
        };
        return (
          <Badge className={colors[value as keyof typeof colors]}>
            {value}
          </Badge>
        );
      }
    },
    { 
      key: 'responseCount', 
      header: 'Responses',
      render: (value: number, row: RFQ) => `${value}/${row.vendorCount}`
    },
    { 
      key: 'estimatedValue', 
      header: 'Estimated Value',
      render: (value: number, row: RFQ) => `$${value.toLocaleString()} ${row.currency}`
    },
    { 
      key: 'actions', 
      header: 'Actions',
      render: (_, row: RFQ) => (
        <div className="flex space-x-2">
          <Button variant="ghost" size="sm" title="View">
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => handleEditRFQ(row)} title="Edit">
            <Edit className="h-4 w-4" />
          </Button>
          {row.status === 'Draft' && (
            <Button variant="ghost" size="sm" onClick={() => handleSendRFQ(row.id)} title="Send">
              <Send className="h-4 w-4" />
            </Button>
          )}
          <Button variant="ghost" size="sm" title="Generate Report">
            <FileText className="h-4 w-4" />
          </Button>
        </div>
      )
    }
  ];

  const responseColumns = [
    { key: 'vendorName', header: 'Vendor' },
    { key: 'submitDate', header: 'Submit Date' },
    { 
      key: 'totalPrice', 
      header: 'Total Price',
      render: (value: number) => `$${value.toLocaleString()}`
    },
    { key: 'deliveryTime', header: 'Delivery Time' },
    { key: 'validityPeriod', header: 'Validity' },
    { 
      key: 'score', 
      header: 'Score',
      render: (value: number) => (
        <div className="flex items-center">
          <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
            <div 
              className="bg-blue-600 h-2 rounded-full" 
              style={{ width: `${value}%` }}
            />
          </div>
          <span className="font-medium">{value}</span>
        </div>
      )
    },
    { 
      key: 'status', 
      header: 'Status',
      render: (value: string) => {
        const colors = {
          'Submitted': 'bg-blue-100 text-blue-800',
          'Under Review': 'bg-yellow-100 text-yellow-800',
          'Accepted': 'bg-green-100 text-green-800',
          'Rejected': 'bg-red-100 text-red-800'
        };
        return (
          <Badge className={colors[value as keyof typeof colors]}>
            {value}
          </Badge>
        );
      }
    }
  ];

  const rfqMetrics = [
    { name: 'Active RFQs', value: rfqs.filter(r => r.status === 'Sent' || r.status === 'Under Evaluation').length, change: '+12%' },
    { name: 'Response Rate', value: '78%', change: '+5%' },
    { name: 'Avg Cycle Time', value: '18 days', change: '-2 days' },
    { name: 'Cost Savings', value: '$2.1M', change: '+15%' }
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
          description="Create, manage, and evaluate Request for Quotations from suppliers"
          voiceIntroduction="Welcome to RFQ Management."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {rfqMetrics.map((metric, index) => (
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
        <h2 className="text-xl font-semibold">Request for Quotations</h2>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button onClick={handleCreateRFQ}>
            <Plus className="h-4 w-4 mr-2" />
            Create RFQ
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="rfqs">RFQs</TabsTrigger>
          <TabsTrigger value="responses">Responses</TabsTrigger>
          <TabsTrigger value="evaluation">Evaluation</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="rfqs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>RFQ Portfolio</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between mb-4">
                <div className="flex space-x-2">
                  <Input 
                    placeholder="Search RFQs..." 
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
                      <SelectItem value="sent">Sent</SelectItem>
                      <SelectItem value="underevaluation">Under Evaluation</SelectItem>
                      <SelectItem value="awarded">Awarded</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DataTable columns={rfqColumns} data={filteredRFQs} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="responses" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Vendor Responses</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable columns={responseColumns} data={responses} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="evaluation" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Evaluation Criteria</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Price (40%)</span>
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '40%' }} />
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Quality (30%)</span>
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '30%' }} />
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Delivery (20%)</span>
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '20%' }} />
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Service (10%)</span>
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '10%' }} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Award Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {responses
                    .filter(r => r.status !== 'Rejected')
                    .sort((a, b) => b.score - a.score)
                    .slice(0, 3)
                    .map((response, index) => (
                      <div key={response.id} className="p-3 border rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">{response.vendorName}</span>
                          <Badge className={index === 0 ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}>
                            {index === 0 ? 'Recommended' : `Rank ${index + 1}`}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>Price: ${response.totalPrice.toLocaleString()}</div>
                          <div>Score: {response.score}/100</div>
                          <div>Delivery: {response.deliveryTime}</div>
                          <div>Validity: {response.validityPeriod}</div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>RFQ Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <h3 className="font-medium">IT Equipment Template</h3>
                  <p className="text-sm text-muted-foreground">For computers, servers, and networking equipment</p>
                  <div className="mt-2">
                    <Button variant="outline" size="sm">Use Template</Button>
                  </div>
                </div>
                <div className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <h3 className="font-medium">Office Supplies Template</h3>
                  <p className="text-sm text-muted-foreground">For furniture, stationery, and office equipment</p>
                  <div className="mt-2">
                    <Button variant="outline" size="sm">Use Template</Button>
                  </div>
                </div>
                <div className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <h3 className="font-medium">Services Template</h3>
                  <p className="text-sm text-muted-foreground">For consulting, maintenance, and professional services</p>
                  <div className="mt-2">
                    <Button variant="outline" size="sm">Use Template</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Edit RFQ' : 'Create New RFQ'}</DialogTitle>
          </DialogHeader>
          <RFQForm 
            rfq={selectedRFQ}
            onSave={handleSaveRFQ}
            onCancel={() => setIsDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

const RFQForm: React.FC<{
  rfq: RFQ | null;
  onSave: (data: Partial<RFQ>) => void;
  onCancel: () => void;
}> = ({ rfq, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: rfq?.title || '',
    description: rfq?.description || '',
    category: rfq?.category || '',
    dueDate: rfq?.dueDate || '',
    estimatedValue: rfq?.estimatedValue || 0,
    requestor: rfq?.requestor || '',
    department: rfq?.department || '',
    priority: rfq?.priority || 'Medium',
    specifications: rfq?.specifications || '',
    terms: rfq?.terms || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title">RFQ Title</Label>
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
              <SelectItem value="Electronics">Electronics</SelectItem>
              <SelectItem value="Office Supplies">Office Supplies</SelectItem>
              <SelectItem value="Machinery">Machinery</SelectItem>
              <SelectItem value="Services">Services</SelectItem>
              <SelectItem value="Raw Materials">Raw Materials</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="dueDate">Due Date</Label>
          <Input
            id="dueDate"
            type="date"
            value={formData.dueDate}
            onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
            required
          />
        </div>
        <div>
          <Label htmlFor="estimatedValue">Estimated Value ($)</Label>
          <Input
            id="estimatedValue"
            type="number"
            value={formData.estimatedValue}
            onChange={(e) => setFormData(prev => ({ ...prev, estimatedValue: Number(e.target.value) }))}
          />
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

      <div>
        <Label htmlFor="specifications">Specifications</Label>
        <Textarea
          id="specifications"
          value={formData.specifications}
          onChange={(e) => setFormData(prev => ({ ...prev, specifications: e.target.value }))}
        />
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          Save RFQ
        </Button>
      </div>
    </form>
  );
};

export default RFQManagement;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { ArrowLeft, Plus, Edit, Eye, Star, TrendingUp, Users, Award } from 'lucide-react';
import PageHeader from '../../components/page/PageHeader';
import { useVoiceAssistantContext } from '../../context/VoiceAssistantContext';
import { useVoiceAssistant } from '../../hooks/useVoiceAssistant';
import EnhancedDataTable, { EnhancedColumn, TableAction } from '../../components/data/EnhancedDataTable';
import VoiceTrainingComponent from '../../components/procurement/VoiceTrainingComponent';
import { useToast } from '../../hooks/use-toast';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, LineChart, Line } from 'recharts';

interface Supplier {
  id: string;
  name: string;
  category: string;
  status: 'Active' | 'Inactive' | 'Pending' | 'Blocked';
  rating: number;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  totalOrders: number;
  totalValue: number;
  onTimeDelivery: number;
  qualityRating: number;
  paymentTerms: string;
  certifications: string[];
  lastOrderDate: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

const SupplierManagement: React.FC = () => {
  const navigate = useNavigate();
  const { isEnabled } = useVoiceAssistantContext();
  const { speak } = useVoiceAssistant();
  const [activeTab, setActiveTab] = useState('suppliers');
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    if (isEnabled) {
      speak('Welcome to Supplier Management. Maintain comprehensive supplier relationships and performance tracking.');
    }
  }, [isEnabled, speak]);

  useEffect(() => {
    const sampleSuppliers: Supplier[] = [
      {
        id: 'sup-001',
        name: 'Dell Technologies',
        category: 'Technology',
        status: 'Active',
        rating: 4.5,
        contactPerson: 'John Anderson',
        email: 'john.anderson@dell.com',
        phone: '+1-555-0123',
        address: 'Round Rock, TX, USA',
        totalOrders: 45,
        totalValue: 275000,
        onTimeDelivery: 95,
        qualityRating: 4.7,
        paymentTerms: 'Net 30',
        certifications: ['ISO 9001', 'ISO 14001', 'SOC 2'],
        lastOrderDate: '2025-01-23',
        riskLevel: 'Low'
      },
      {
        id: 'sup-002',
        name: 'Office Depot Inc.',
        category: 'Office Supplies',
        status: 'Active',
        rating: 4.2,
        contactPerson: 'Sarah Wilson',
        email: 'sarah.wilson@officedepot.com',
        phone: '+1-555-0124',
        address: 'Boca Raton, FL, USA',
        totalOrders: 78,
        totalValue: 89000,
        onTimeDelivery: 92,
        qualityRating: 4.3,
        paymentTerms: 'Net 15',
        certifications: ['ISO 9001'],
        lastOrderDate: '2025-01-25',
        riskLevel: 'Low'
      },
      {
        id: 'sup-003',
        name: 'Safety First Corp',
        category: 'Safety Equipment',
        status: 'Active',
        rating: 4.8,
        contactPerson: 'Mike Brown',
        email: 'mike.brown@safetyfirst.com',
        phone: '+1-555-0125',
        address: 'Chicago, IL, USA',
        totalOrders: 23,
        totalValue: 156000,
        onTimeDelivery: 98,
        qualityRating: 4.9,
        paymentTerms: 'Net 30',
        certifications: ['ISO 9001', 'ISO 45001', 'ANSI Z87.1'],
        lastOrderDate: '2025-01-24',
        riskLevel: 'Low'
      },
      {
        id: 'sup-004',
        name: 'Global Logistics Ltd',
        category: 'Logistics',
        status: 'Pending',
        rating: 3.8,
        contactPerson: 'Lisa Chen',
        email: 'lisa.chen@globallogistics.com',
        phone: '+1-555-0126',
        address: 'Los Angeles, CA, USA',
        totalOrders: 0,
        totalValue: 0,
        onTimeDelivery: 0,
        qualityRating: 0,
        paymentTerms: 'Net 45',
        certifications: ['ISO 9001'],
        lastOrderDate: '',
        riskLevel: 'Medium'
      }
    ];
    setSuppliers(sampleSuppliers);
  }, []);

  const getStatusColor = (status: string) => {
    const colors = {
      'Active': 'bg-green-100 text-green-800',
      'Inactive': 'bg-gray-100 text-gray-800',
      'Pending': 'bg-yellow-100 text-yellow-800',
      'Blocked': 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getRiskColor = (risk: string) => {
    const colors = {
      'Low': 'bg-green-100 text-green-800',
      'Medium': 'bg-yellow-100 text-yellow-800',
      'High': 'bg-red-100 text-red-800'
    };
    return colors[risk as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const columns: EnhancedColumn[] = [
    { key: 'name', header: 'Supplier Name', sortable: true, searchable: true },
    { key: 'category', header: 'Category', sortable: true, filterable: true, filterOptions: [
      { label: 'Technology', value: 'Technology' },
      { label: 'Office Supplies', value: 'Office Supplies' },
      { label: 'Safety Equipment', value: 'Safety Equipment' },
      { label: 'Logistics', value: 'Logistics' }
    ]},
    { 
      key: 'status', 
      header: 'Status',
      filterable: true,
      filterOptions: [
        { label: 'Active', value: 'Active' },
        { label: 'Inactive', value: 'Inactive' },
        { label: 'Pending', value: 'Pending' },
        { label: 'Blocked', value: 'Blocked' }
      ],
      render: (value: string) => (
        <Badge className={getStatusColor(value)}>
          {value}
        </Badge>
      )
    },
    { 
      key: 'rating', 
      header: 'Rating',
      sortable: true,
      render: (value: number) => (
        <div className="flex items-center">
          <Star className="h-4 w-4 text-yellow-400 mr-1" />
          {value.toFixed(1)}
        </div>
      )
    },
    { key: 'contactPerson', header: 'Contact Person', searchable: true },
    { 
      key: 'totalValue', 
      header: 'Total Value',
      sortable: true,
      render: (value: number) => `$${value.toLocaleString()}`
    },
    { 
      key: 'onTimeDelivery', 
      header: 'On-Time %',
      sortable: true,
      render: (value: number) => `${value}%`
    },
    { 
      key: 'riskLevel', 
      header: 'Risk Level',
      filterable: true,
      filterOptions: [
        { label: 'Low', value: 'Low' },
        { label: 'Medium', value: 'Medium' },
        { label: 'High', value: 'High' }
      ],
      render: (value: string) => (
        <Badge className={getRiskColor(value)}>
          {value}
        </Badge>
      )
    }
  ];

  const actions: TableAction[] = [
    {
      label: 'View',
      icon: <Eye className="h-4 w-4" />,
      onClick: (row: Supplier) => console.log('View supplier:', row),
      variant: 'ghost'
    },
    {
      label: 'Edit',
      icon: <Edit className="h-4 w-4" />,
      onClick: (row: Supplier) => console.log('Edit supplier:', row),
      variant: 'ghost'
    },
    {
      label: 'Performance',
      icon: <TrendingUp className="h-4 w-4" />,
      onClick: (row: Supplier) => console.log('View performance:', row),
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
          title="Supplier Management"
          description="Maintain comprehensive supplier database and relationships"
          voiceIntroduction="Welcome to Supplier Management with comprehensive performance tracking."
        />
      </div>

      <VoiceTrainingComponent 
        module="Supplier Management"
        topic="Supplier Relationship Management"
        examples={[
          "Maintain comprehensive supplier database with performance metrics",
          "Track supplier performance and delivery reliability",
          "Manage supplier certifications and compliance requirements",
          "Evaluate supplier risk levels and mitigation strategies"
        ]}
        detailLevel="advanced"
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{suppliers.length}</div>
            <div className="text-sm text-muted-foreground">Total Suppliers</div>
            <div className="text-sm text-green-600">+8 new this month</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">
              {suppliers.filter(s => s.status === 'Active').length}
            </div>
            <div className="text-sm text-muted-foreground">Active Suppliers</div>
            <div className="text-sm text-blue-600">95% active rate</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">4.4</div>
            <div className="text-sm text-muted-foreground">Avg Rating</div>
            <div className="text-sm text-green-600">+0.2 improvement</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">94%</div>
            <div className="text-sm text-muted-foreground">On-Time Delivery</div>
            <div className="text-sm text-green-600">Above target</div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="certifications">Certifications</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="risk">Risk Management</TabsTrigger>
        </TabsList>

        <TabsContent value="suppliers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                Supplier Directory
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Supplier
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <EnhancedDataTable 
                columns={columns}
                data={suppliers}
                actions={actions}
                searchPlaceholder="Search suppliers by name, contact, or category..."
                exportable={true}
                refreshable={true}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {suppliers.filter(s => s.status === 'Active').map((supplier) => (
              <Card key={supplier.id}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center justify-between">
                    {supplier.name}
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      {supplier.rating.toFixed(1)}
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Total Orders:</span>
                      <span className="font-medium">{supplier.totalOrders}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Value:</span>
                      <span className="font-medium">${supplier.totalValue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>On-Time Delivery:</span>
                      <span className="font-medium">{supplier.onTimeDelivery}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Quality Rating:</span>
                      <span className="font-medium">{supplier.qualityRating.toFixed(1)}/5</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Risk Level:</span>
                      <Badge className={getRiskColor(supplier.riskLevel)}>
                        {supplier.riskLevel}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="certifications" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {suppliers.map((supplier) => (
              <Card key={supplier.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{supplier.name}</CardTitle>
                  <Badge className={getStatusColor(supplier.status)}>{supplier.status}</Badge>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-muted-foreground">Certifications:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {supplier.certifications.map((cert, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            <Award className="h-3 w-3 mr-1" />
                            {cert}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Contact:</span>
                      <div className="text-sm">{supplier.contactPerson}</div>
                      <div className="text-sm text-muted-foreground">{supplier.email}</div>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Payment Terms:</span>
                      <div className="text-sm">{supplier.paymentTerms}</div>
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
                <CardTitle>Supplier Performance Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={[
                    { month: 'Jan', rating: 4.2, onTime: 92 },
                    { month: 'Feb', rating: 4.3, onTime: 94 },
                    { month: 'Mar', rating: 4.1, onTime: 91 },
                    { month: 'Apr', rating: 4.4, onTime: 95 },
                    { month: 'May', rating: 4.5, onTime: 96 },
                    { month: 'Jun', rating: 4.4, onTime: 94 }
                  ]}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="rating" stroke="#8884d8" name="Avg Rating" />
                    <Line type="monotone" dataKey="onTime" stroke="#82ca9d" name="On-Time %" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Category Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={[
                    { category: 'Technology', count: suppliers.filter(s => s.category === 'Technology').length },
                    { category: 'Office Supplies', count: suppliers.filter(s => s.category === 'Office Supplies').length },
                    { category: 'Safety Equipment', count: suppliers.filter(s => s.category === 'Safety Equipment').length },
                    { category: 'Logistics', count: suppliers.filter(s => s.category === 'Logistics').length }
                  ]}>
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="risk" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['Low', 'Medium', 'High'].map((riskLevel) => (
              <Card key={riskLevel}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Badge className={getRiskColor(riskLevel)} variant="outline" className="mr-2">
                      {riskLevel} Risk
                    </Badge>
                    ({suppliers.filter(s => s.riskLevel === riskLevel).length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {suppliers.filter(s => s.riskLevel === riskLevel).map((supplier) => (
                      <div key={supplier.id} className="p-2 border rounded">
                        <div className="font-medium">{supplier.name}</div>
                        <div className="text-sm text-muted-foreground">{supplier.category}</div>
                        <div className="text-sm">
                          Rating: {supplier.rating.toFixed(1)} | 
                          On-Time: {supplier.onTimeDelivery}%
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SupplierManagement;

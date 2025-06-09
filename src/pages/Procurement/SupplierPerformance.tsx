
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { ArrowLeft, TrendingUp, Award, AlertTriangle, CheckCircle, Star } from 'lucide-react';
import PageHeader from '../../components/page/PageHeader';
import { useVoiceAssistantContext } from '../../context/VoiceAssistantContext';
import { useVoiceAssistant } from '../../hooks/useVoiceAssistant';
import EnhancedDataTable, { EnhancedColumn, TableAction } from '../../components/data/EnhancedDataTable';
import { useToast } from '../../hooks/use-toast';
import { BarChart, Bar, LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts';

interface SupplierPerformance {
  id: string;
  supplierName: string;
  category: string;
  overallRating: number;
  deliveryPerformance: number;
  qualityScore: number;
  costCompetitiveness: number;
  responseTime: number;
  totalOrders: number;
  onTimeDeliveries: number;
  defectRate: number;
  status: 'Excellent' | 'Good' | 'Fair' | 'Poor';
}

const SupplierPerformance: React.FC = () => {
  const navigate = useNavigate();
  const { isEnabled } = useVoiceAssistantContext();
  const { speak } = useVoiceAssistant();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [suppliers, setSuppliers] = useState<SupplierPerformance[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    if (isEnabled) {
      speak('Welcome to Supplier Performance Management. Monitor and evaluate supplier performance across key metrics including delivery, quality, and cost competitiveness.');
    }
  }, [isEnabled, speak]);

  useEffect(() => {
    const sampleSuppliers: SupplierPerformance[] = [
      {
        id: 'sp-001',
        supplierName: 'Dell Technologies',
        category: 'IT Equipment',
        overallRating: 4.8,
        deliveryPerformance: 95,
        qualityScore: 98,
        costCompetitiveness: 88,
        responseTime: 24,
        totalOrders: 156,
        onTimeDeliveries: 148,
        defectRate: 0.8,
        status: 'Excellent'
      },
      {
        id: 'sp-002',
        supplierName: 'Office Depot',
        category: 'Office Supplies',
        overallRating: 4.2,
        deliveryPerformance: 89,
        qualityScore: 92,
        costCompetitiveness: 94,
        responseTime: 18,
        totalOrders: 89,
        onTimeDeliveries: 79,
        defectRate: 2.1,
        status: 'Good'
      }
    ];
    setSuppliers(sampleSuppliers);
  }, []);

  const getStatusColor = (status: string) => {
    const colors = {
      'Excellent': 'bg-green-100 text-green-800',
      'Good': 'bg-blue-100 text-blue-800',
      'Fair': 'bg-yellow-100 text-yellow-800',
      'Poor': 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-600';
    if (rating >= 4.0) return 'text-blue-600';
    if (rating >= 3.0) return 'text-yellow-600';
    return 'text-red-600';
  };

  const columns: EnhancedColumn[] = [
    { key: 'supplierName', header: 'Supplier Name', sortable: true, searchable: true },
    { key: 'category', header: 'Category', filterable: true, filterOptions: [
      { label: 'IT Equipment', value: 'IT Equipment' },
      { label: 'Office Supplies', value: 'Office Supplies' },
      { label: 'Manufacturing', value: 'Manufacturing' },
      { label: 'Services', value: 'Services' }
    ]},
    { 
      key: 'overallRating', 
      header: 'Overall Rating',
      sortable: true,
      render: (value: number) => (
        <div className={`flex items-center ${getRatingColor(value)}`}>
          <Star className="h-4 w-4 mr-1" />
          <span className="font-medium">{value.toFixed(1)}</span>
        </div>
      )
    },
    { 
      key: 'deliveryPerformance', 
      header: 'Delivery %',
      sortable: true,
      render: (value: number) => `${value}%`
    },
    { 
      key: 'qualityScore', 
      header: 'Quality Score',
      sortable: true,
      render: (value: number) => `${value}%`
    },
    { 
      key: 'status', 
      header: 'Status',
      filterable: true,
      filterOptions: [
        { label: 'Excellent', value: 'Excellent' },
        { label: 'Good', value: 'Good' },
        { label: 'Fair', value: 'Fair' },
        { label: 'Poor', value: 'Poor' }
      ],
      render: (value: string) => (
        <Badge className={getStatusColor(value)}>
          {value}
        </Badge>
      )
    }
  ];

  const actions: TableAction[] = [
    {
      label: 'View Details',
      icon: <TrendingUp className="h-4 w-4" />,
      onClick: (row: SupplierPerformance) => {
        navigate(`/procurement/supplier-management/${row.id}`);
      },
      variant: 'ghost'
    },
    {
      label: 'Performance Review',
      icon: <Award className="h-4 w-4" />,
      onClick: (row: SupplierPerformance) => {
        toast({
          title: 'Performance Review',
          description: `Opening performance review for ${row.supplierName}`,
        });
      },
      variant: 'ghost'
    }
  ];

  const performanceTrends = [
    { month: 'Jan', delivery: 92, quality: 95, cost: 88 },
    { month: 'Feb', delivery: 94, quality: 96, cost: 89 },
    { month: 'Mar', delivery: 91, quality: 94, cost: 90 },
    { month: 'Apr', delivery: 95, quality: 97, cost: 88 },
    { month: 'May', delivery: 93, quality: 98, cost: 91 },
    { month: 'Jun', delivery: 96, quality: 96, cost: 89 }
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
          title="Supplier Performance"
          description="Monitor and evaluate supplier performance across key metrics"
          voiceIntroduction="Welcome to Supplier Performance Management for comprehensive performance tracking."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">4.6</div>
            <div className="text-sm text-muted-foreground">Avg. Rating</div>
            <div className="text-sm text-green-600">Above target</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">94%</div>
            <div className="text-sm text-muted-foreground">On-Time Delivery</div>
            <div className="text-sm text-green-600">Excellent</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">96%</div>
            <div className="text-sm text-muted-foreground">Quality Score</div>
            <div className="text-sm text-green-600">High quality</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">15</div>
            <div className="text-sm text-muted-foreground">Suppliers Reviewed</div>
            <div className="text-sm text-blue-600">This month</div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="suppliers">Supplier Scores</TabsTrigger>
          <TabsTrigger value="trends">Performance Trends</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="h-5 w-5 mr-2" />
                  Top Performers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {suppliers.filter(s => s.status === 'Excellent').map((supplier) => (
                    <div key={supplier.id} className="p-3 border rounded">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-semibold">{supplier.supplierName}</h4>
                          <p className="text-sm text-muted-foreground">{supplier.category}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-500 mr-1" />
                            <span className="font-medium">{supplier.overallRating}</span>
                          </div>
                          <Badge className={getStatusColor(supplier.status)} variant="outline">
                            {supplier.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  Performance Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border border-yellow-200 rounded bg-yellow-50">
                    <div className="flex items-center">
                      <AlertTriangle className="h-4 w-4 text-yellow-600 mr-2" />
                      <div>
                        <h4 className="font-semibold">Delivery Performance Drop</h4>
                        <p className="text-sm text-muted-foreground">
                          Global Manufacturing's delivery rate dropped to 78% this month
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 border border-red-200 rounded bg-red-50">
                    <div className="flex items-center">
                      <AlertTriangle className="h-4 w-4 text-red-600 mr-2" />
                      <div>
                        <h4 className="font-semibold">Quality Issues</h4>
                        <p className="text-sm text-muted-foreground">
                          Office Solutions Inc has 5% defect rate - requires immediate attention
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 border border-green-200 rounded bg-green-50">
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      <div>
                        <h4 className="font-semibold">Improvement Noted</h4>
                        <p className="text-sm text-muted-foreground">
                          TechCorp improved response time by 40% this quarter
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Performance Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={performanceTrends}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="delivery" fill="#8884d8" name="Delivery %" />
                  <Bar dataKey="quality" fill="#82ca9d" name="Quality %" />
                  <Bar dataKey="cost" fill="#ffc658" name="Cost Competitiveness %" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="suppliers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Supplier Performance Scorecard</CardTitle>
            </CardHeader>
            <CardContent>
              <EnhancedDataTable 
                columns={columns}
                data={suppliers}
                actions={actions}
                searchPlaceholder="Search suppliers..."
                exportable={true}
                refreshable={true}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Trends Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={performanceTrends}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="delivery" stroke="#8884d8" name="Delivery Performance" />
                  <Line type="monotone" dataKey="quality" stroke="#82ca9d" name="Quality Score" />
                  <Line type="monotone" dataKey="cost" stroke="#ffc658" name="Cost Competitiveness" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded">
                  <h4 className="font-semibold mb-2">Monthly Performance Report</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Comprehensive monthly analysis of all supplier performance metrics
                  </p>
                  <Button size="sm">Generate Report</Button>
                </div>
                <div className="p-4 border rounded">
                  <h4 className="font-semibold mb-2">Supplier Comparison Report</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Side-by-side comparison of supplier performance by category
                  </p>
                  <Button size="sm">Generate Report</Button>
                </div>
                <div className="p-4 border rounded">
                  <h4 className="font-semibold mb-2">Performance Improvement Plan</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Action plans for underperforming suppliers
                  </p>
                  <Button size="sm">Generate Report</Button>
                </div>
                <div className="p-4 border rounded">
                  <h4 className="font-semibold mb-2">Supplier Risk Assessment</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Risk evaluation based on performance history and trends
                  </p>
                  <Button size="sm">Generate Report</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SupplierPerformance;

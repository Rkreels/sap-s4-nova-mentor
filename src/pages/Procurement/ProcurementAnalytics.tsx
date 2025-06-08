
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { ArrowLeft, TrendingUp, TrendingDown, DollarSign, Package, Users, Calendar, Download, Filter } from 'lucide-react';
import PageHeader from '../../components/page/PageHeader';
import { useVoiceAssistantContext } from '../../context/VoiceAssistantContext';
import { useVoiceAssistant } from '../../hooks/useVoiceAssistant';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, AreaChart, Area } from 'recharts';

const ProcurementAnalytics: React.FC = () => {
  const navigate = useNavigate();
  const { isEnabled } = useVoiceAssistantContext();
  const { speak } = useVoiceAssistant();
  const [activeTab, setActiveTab] = useState('overview');
  const [timeframe, setTimeframe] = useState('month');

  useEffect(() => {
    if (isEnabled) {
      speak('Welcome to Procurement Analytics. Analyze spending patterns, supplier performance, and cost optimization opportunities.');
    }
  }, [isEnabled, speak]);

  const spendingData = [
    { month: 'Jan', total: 850000, savings: 85000, orders: 145 },
    { month: 'Feb', total: 920000, savings: 92000, orders: 162 },
    { month: 'Mar', total: 780000, savings: 78000, orders: 138 },
    { month: 'Apr', total: 1050000, savings: 115000, orders: 189 },
    { month: 'May', total: 1200000, savings: 140000, orders: 201 },
    { month: 'Jun', total: 980000, savings: 98000, orders: 167 }
  ];

  const categoryData = [
    { name: 'Electronics', value: 35, amount: 4200000, color: '#0088FE' },
    { name: 'Raw Materials', value: 28, amount: 3360000, color: '#00C49F' },
    { name: 'Services', value: 20, amount: 2400000, color: '#FFBB28' },
    { name: 'Office Supplies', value: 10, amount: 1200000, color: '#FF8042' },
    { name: 'Equipment', value: 7, amount: 840000, color: '#8884D8' }
  ];

  const supplierPerformance = [
    { name: 'Tech Components Inc.', onTime: 98, quality: 96, cost: 92, overall: 95 },
    { name: 'Global Manufacturing', onTime: 94, quality: 98, cost: 88, overall: 93 },
    { name: 'Industrial Supplies', onTime: 90, quality: 94, cost: 96, overall: 93 },
    { name: 'Office Solutions', onTime: 88, quality: 90, cost: 94, overall: 91 },
    { name: 'Equipment Corp', onTime: 85, quality: 92, cost: 90, overall: 89 }
  ];

  const savingsOpportunities = [
    { category: 'Electronics', current: 4200000, potential: 4620000, savings: 420000, percentage: 10 },
    { category: 'Raw Materials', current: 3360000, potential: 3696000, savings: 336000, percentage: 10 },
    { category: 'Services', current: 2400000, potential: 2640000, savings: 240000, percentage: 10 },
    { category: 'Office Supplies', current: 1200000, potential: 1320000, savings: 120000, percentage: 10 }
  ];

  const kpis = [
    {
      title: 'Total Spend',
      value: '$12.8M',
      change: '+8.5%',
      trend: 'up',
      icon: DollarSign,
      description: 'Year to date procurement spend'
    },
    {
      title: 'Cost Savings',
      value: '$1.2M',
      change: '+15.2%',
      trend: 'up',
      icon: TrendingDown,
      description: 'Total savings achieved'
    },
    {
      title: 'Purchase Orders',
      value: '1,847',
      change: '+12.1%',
      trend: 'up',
      icon: Package,
      description: 'Orders processed this year'
    },
    {
      title: 'Active Suppliers',
      value: '347',
      change: '+5.8%',
      trend: 'up',
      icon: Users,
      description: 'Qualified supplier base'
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
          title="Procurement Analytics"
          description="Analyze spending patterns, supplier performance, and optimization opportunities"
          voiceIntroduction="Welcome to Procurement Analytics."
        />
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Analytics Dashboard</h2>
        <div className="flex space-x-2">
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {kpis.map((kpi, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">{kpi.value}</div>
                  <div className="text-sm text-muted-foreground">{kpi.title}</div>
                  <div className={`text-sm flex items-center ${kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {kpi.trend === 'up' ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                    {kpi.change}
                  </div>
                </div>
                <kpi.icon className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="spending">Spending</TabsTrigger>
          <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
          <TabsTrigger value="savings">Savings</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Spending Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={spendingData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Amount']} />
                    <Area type="monotone" dataKey="total" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Spend by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name} ${value}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="text-sm text-muted-foreground">Contracts Expiring</div>
                <div className="text-2xl font-bold">18</div>
                <div className="text-sm text-orange-600">Next 90 days</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-sm text-muted-foreground">Maverick Spend</div>
                <div className="text-2xl font-bold">$245K</div>
                <div className="text-sm text-red-600">2.1% of total spend</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-sm text-muted-foreground">Compliance Rate</div>
                <div className="text-2xl font-bold">94.2%</div>
                <div className="text-sm text-green-600">Above target</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="spending" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Spending vs Savings</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={spendingData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Amount']} />
                    <Legend />
                    <Bar dataKey="total" fill="#8884d8" name="Total Spend" />
                    <Bar dataKey="savings" fill="#82ca9d" name="Savings" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Category Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {categoryData.map((category, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div 
                          className="w-4 h-4 rounded mr-3" 
                          style={{ backgroundColor: category.color }}
                        />
                        <span className="font-medium">{category.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">${category.amount.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">{category.value}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="suppliers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Supplier Performance Scorecard</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {supplierPerformance.map((supplier, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{supplier.name}</span>
                      <Badge className={supplier.overall >= 95 ? 'bg-green-100 text-green-800' : 
                                     supplier.overall >= 90 ? 'bg-blue-100 text-blue-800' : 
                                     'bg-yellow-100 text-yellow-800'}>
                        {supplier.overall}% Overall
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground">On-Time Delivery</div>
                        <div className="font-medium">{supplier.onTime}%</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Quality Score</div>
                        <div className="font-medium">{supplier.quality}%</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Cost Performance</div>
                        <div className="font-medium">{supplier.cost}%</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="savings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cost Savings Opportunities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {savingsOpportunities.map((opportunity, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{opportunity.category}</span>
                      <div className="text-right">
                        <div className="font-bold text-green-600">
                          ${opportunity.savings.toLocaleString()} ({opportunity.percentage}%)
                        </div>
                        <div className="text-sm text-muted-foreground">Potential savings</div>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Current: ${opportunity.current.toLocaleString()} → 
                      Target: ${opportunity.potential.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-green-50 rounded-lg">
                <div className="text-lg font-bold text-green-800">
                  Total Potential Savings: ${savingsOpportunities.reduce((sum, opp) => sum + opp.savings, 0).toLocaleString()}
                </div>
                <div className="text-sm text-green-600">
                  Achievable through strategic sourcing and contract optimization
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Compliance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Contract Compliance</span>
                    <div className="text-right">
                      <div className="font-bold">96.8%</div>
                      <div className="text-sm text-green-600">+2.1%</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Supplier Qualification</span>
                    <div className="text-right">
                      <div className="font-bold">94.2%</div>
                      <div className="text-sm text-green-600">+1.5%</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Policy Adherence</span>
                    <div className="text-right">
                      <div className="font-bold">91.7%</div>
                      <div className="text-sm text-yellow-600">-0.8%</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Documentation Complete</span>
                    <div className="text-right">
                      <div className="font-bold">98.5%</div>
                      <div className="text-sm text-green-600">+3.2%</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Risk Assessment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 border rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Low Risk</span>
                      <Badge className="bg-green-100 text-green-800">78%</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">270 suppliers</div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Medium Risk</span>
                      <Badge className="bg-yellow-100 text-yellow-800">18%</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">62 suppliers</div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">High Risk</span>
                      <Badge className="bg-red-100 text-red-800">4%</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">15 suppliers</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProcurementAnalytics;

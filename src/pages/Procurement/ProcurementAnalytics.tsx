
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { ArrowLeft, TrendingUp, DollarSign, Users, ShoppingCart, Download } from 'lucide-react';
import PageHeader from '../../components/page/PageHeader';
import { useVoiceAssistantContext } from '../../context/VoiceAssistantContext';
import { useVoiceAssistant } from '../../hooks/useVoiceAssistant';
import { useToast } from '../../hooks/use-toast';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const ProcurementAnalytics: React.FC = () => {
  const navigate = useNavigate();
  const { isEnabled } = useVoiceAssistantContext();
  const { speak } = useVoiceAssistant();
  const [activeTab, setActiveTab] = useState('overview');
  const { toast } = useToast();

  useEffect(() => {
    if (isEnabled) {
      speak('Welcome to Procurement Analytics. Analyze spending patterns, supplier performance, and cost savings.');
    }
  }, [isEnabled, speak]);

  const spendingData = [
    { month: 'Jan', spend: 2100000, budget: 2200000, savings: 150000 },
    { month: 'Feb', spend: 2300000, budget: 2400000, savings: 180000 },
    { month: 'Mar', spend: 1950000, budget: 2100000, savings: 220000 },
    { month: 'Apr', spend: 2450000, budget: 2500000, savings: 195000 },
    { month: 'May', spend: 2200000, budget: 2300000, savings: 240000 },
    { month: 'Jun', spend: 1800000, budget: 2000000, savings: 280000 }
  ];

  const categoryData = [
    { name: 'IT Equipment', value: 4200000, color: '#8884d8' },
    { name: 'Office Supplies', value: 1800000, color: '#82ca9d' },
    { name: 'Services', value: 3100000, color: '#ffc658' },
    { name: 'Manufacturing', value: 2900000, color: '#ff7300' }
  ];

  const supplierPerformance = [
    { supplier: 'Dell Technologies', orders: 45, onTime: 94, quality: 98, value: 1250000 },
    { supplier: 'Microsoft Corp', orders: 32, onTime: 96, quality: 97, value: 890000 },
    { supplier: 'Office Depot', orders: 67, onTime: 89, quality: 95, value: 430000 },
    { supplier: 'HP Inc', orders: 28, onTime: 92, quality: 96, value: 780000 },
    { supplier: 'Cisco Systems', orders: 21, onTime: 95, quality: 99, value: 1100000 }
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
          description="Analyze spending patterns, supplier performance, and cost savings"
          voiceIntroduction="Welcome to Procurement Analytics for comprehensive data insights."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">$12.8M</div>
                <div className="text-sm text-muted-foreground">Total Spend</div>
                <div className="text-sm text-green-600">+8.5% vs target</div>
              </div>
              <DollarSign className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">$1.2M</div>
                <div className="text-sm text-muted-foreground">Cost Savings</div>
                <div className="text-sm text-green-600">+15.3% YTD</div>
              </div>
              <TrendingUp className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">347</div>
                <div className="text-sm text-muted-foreground">Active Suppliers</div>
                <div className="text-sm text-blue-600">+5.2% this quarter</div>
              </div>
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">89</div>
                <div className="text-sm text-muted-foreground">Pending Orders</div>
                <div className="text-sm text-orange-600">Needs attention</div>
              </div>
              <ShoppingCart className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="spending">Spending Analysis</TabsTrigger>
          <TabsTrigger value="suppliers">Supplier Performance</TabsTrigger>
          <TabsTrigger value="savings">Cost Savings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Spending Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={spendingData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Amount']} />
                    <Legend />
                    <Line type="monotone" dataKey="spend" stroke="#8884d8" name="Actual Spend" />
                    <Line type="monotone" dataKey="budget" stroke="#82ca9d" name="Budget" />
                  </LineChart>
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
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Spend']} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                Top Suppliers by Value
                <Button size="sm" variant="outline" onClick={() => toast({ title: 'Export Report', description: 'Generating supplier report' })}>
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {supplierPerformance.map((supplier, index) => (
                  <div key={supplier.supplier} className="flex items-center justify-between p-3 border rounded">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium">{index + 1}</span>
                      </div>
                      <div>
                        <div className="font-medium">{supplier.supplier}</div>
                        <div className="text-sm text-muted-foreground">{supplier.orders} orders</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">${supplier.value.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">{supplier.onTime}% on-time</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="spending" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Spending Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={spendingData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Amount']} />
                  <Legend />
                  <Bar dataKey="spend" fill="#8884d8" name="Actual Spend" />
                  <Bar dataKey="budget" fill="#82ca9d" name="Budget" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Budget Variance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {spendingData.map((month) => {
                    const variance = ((month.spend - month.budget) / month.budget) * 100;
                    const isOverBudget = variance > 0;
                    return (
                      <div key={month.month} className="flex justify-between items-center">
                        <span>{month.month}</span>
                        <span className={`font-medium ${isOverBudget ? 'text-red-600' : 'text-green-600'}`}>
                          {variance > 0 ? '+' : ''}{variance.toFixed(1)}%
                        </span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Spending Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-green-50 border border-green-200 rounded">
                    <div className="font-medium text-green-800">Under Budget</div>
                    <div className="text-sm text-green-600">Currently 4.2% under annual budget</div>
                  </div>
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                    <div className="font-medium text-blue-800">Peak Month</div>
                    <div className="text-sm text-blue-600">April had highest spending at $2.45M</div>
                  </div>
                  <div className="p-3 bg-orange-50 border border-orange-200 rounded">
                    <div className="font-medium text-orange-800">Trend Alert</div>
                    <div className="text-sm text-orange-600">Q2 spending increased 8% vs Q1</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="suppliers" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Supplier Performance Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Supplier</th>
                      <th className="text-center p-2">Orders</th>
                      <th className="text-center p-2">On-Time %</th>
                      <th className="text-center p-2">Quality %</th>
                      <th className="text-right p-2">Total Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {supplierPerformance.map((supplier) => (
                      <tr key={supplier.supplier} className="border-b">
                        <td className="p-2 font-medium">{supplier.supplier}</td>
                        <td className="p-2 text-center">{supplier.orders}</td>
                        <td className="p-2 text-center">
                          <span className={`px-2 py-1 rounded text-sm ${
                            supplier.onTime >= 95 ? 'bg-green-100 text-green-800' :
                            supplier.onTime >= 90 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {supplier.onTime}%
                          </span>
                        </td>
                        <td className="p-2 text-center">
                          <span className={`px-2 py-1 rounded text-sm ${
                            supplier.quality >= 97 ? 'bg-green-100 text-green-800' :
                            supplier.quality >= 95 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {supplier.quality}%
                          </span>
                        </td>
                        <td className="p-2 text-right font-medium">
                          ${supplier.value.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="savings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Cost Savings Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={spendingData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Savings']} />
                  <Line type="monotone" dataKey="savings" stroke="#10b981" strokeWidth={3} name="Monthly Savings" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>YTD Savings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">$1.265M</div>
                <div className="text-sm text-muted-foreground">15.3% above target</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Avg. Monthly Savings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">$210K</div>
                <div className="text-sm text-muted-foreground">Consistent performance</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Savings Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-600">9.8%</div>
                <div className="text-sm text-muted-foreground">Of total procurement spend</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProcurementAnalytics;

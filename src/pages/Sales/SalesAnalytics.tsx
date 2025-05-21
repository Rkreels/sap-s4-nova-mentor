
import React, { useState, useEffect } from 'react';
import PageHeader from '../../components/page/PageHeader';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Calendar, Download, Printer, ChevronDown } from 'lucide-react';
import { 
  Bar, 
  BarChart, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  Tooltip, 
  LineChart, 
  Line,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

// Sample data for analytics
const salesTrend = [
  { month: 'Jan', sales: 325000, target: 300000 },
  { month: 'Feb', sales: 290000, target: 300000 },
  { month: 'Mar', sales: 350000, target: 320000 },
  { month: 'Apr', sales: 380000, target: 340000 },
  { month: 'May', sales: 410000, target: 360000 },
  { month: 'Jun', sales: 390000, target: 380000 },
  { month: 'Jul', sales: 420000, target: 400000 },
];

const salesByRegion = [
  { name: 'Europe', value: 45 },
  { name: 'North America', value: 30 },
  { name: 'Asia', value: 15 },
  { name: 'Others', value: 10 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const productPerformance = [
  { name: 'Server Hardware', sales: 1245000, growth: 8.5 },
  { name: 'Software Licenses', sales: 980000, growth: 12.3 },
  { name: 'IT Services', sales: 845000, growth: 5.2 },
  { name: 'Cloud Subscriptions', sales: 720000, growth: 18.7 },
  { name: 'Security Solutions', sales: 530000, growth: 9.1 },
];

const customerSegments = [
  { name: 'Enterprise', sales: 2450000, customers: 124, avgDeal: 19758 },
  { name: 'Mid-Market', sales: 1320000, customers: 278, avgDeal: 4748 },
  { name: 'SMB', sales: 850000, customers: 412, avgDeal: 2063 },
  { name: 'Public Sector', sales: 520000, customers: 45, avgDeal: 11555 },
];

const forecastData = [
  { quarter: 'Q1', forecast: 3200000, actual: 3400000 },
  { quarter: 'Q2', forecast: 3800000, actual: 3950000 },
  { quarter: 'Q3', forecast: 4100000, actual: 4050000 },
  { quarter: 'Q4', forecast: 4500000, actual: 0, projected: 4650000 },
];

const SalesAnalytics: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [timePeriod, setTimePeriod] = useState('year');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const renderLoading = () => (
    <div className="h-80 flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>
  );

  return (
    <div className="container mx-auto p-6">
      <PageHeader 
        title="Sales Analytics" 
        description="Comprehensive analysis of your sales performance"
        voiceIntroduction="Welcome to Sales Analytics. This dashboard provides a comprehensive view of your sales performance, trends, and forecasts."
      />

      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            {timePeriod === 'year' ? 'Year to Date' : 
             timePeriod === 'quarter' ? 'Current Quarter' : 'Current Month'}
            <ChevronDown className="h-4 w-4 ml-2" />
          </Button>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="products">Product Analysis</TabsTrigger>
          <TabsTrigger value="customers">Customer Analysis</TabsTrigger>
          <TabsTrigger value="forecast">Sales Forecast</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-4">
              <div className="flex flex-col">
                <div className="text-sm text-muted-foreground">Total Sales</div>
                <div className="text-2xl font-bold mt-2">€4.32M</div>
                <div className="text-xs text-green-600 mt-1">↑ 12.4% vs last year</div>
              </div>
            </Card>
            
            <Card className="p-4">
              <div className="flex flex-col">
                <div className="text-sm text-muted-foreground">Average Order Value</div>
                <div className="text-2xl font-bold mt-2">€12,450</div>
                <div className="text-xs text-green-600 mt-1">↑ 3.2% vs last year</div>
              </div>
            </Card>
            
            <Card className="p-4">
              <div className="flex flex-col">
                <div className="text-sm text-muted-foreground">Conversion Rate</div>
                <div className="text-2xl font-bold mt-2">24.8%</div>
                <div className="text-xs text-red-600 mt-1">↓ 1.5% vs last year</div>
              </div>
            </Card>
          </div>
          
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Sales Trend vs Target</h3>
            
            {isLoading ? renderLoading() : (
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={salesTrend} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value: number) => [`€${(value/1000).toFixed(0)}k`, 'Value']}
                    />
                    <Legend />
                    <Bar dataKey="sales" name="Actual Sales" fill="#0284c7" />
                    <Bar dataKey="target" name="Sales Target" fill="#d1d5db" />
                  </BarChart>
                </ResponsiveContainer>
                <div className="text-xs text-gray-500 mt-2 flex justify-between">
                  <span>Last updated: Today, 09:30 AM</span>
                </div>
              </div>
            )}
          </Card>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Sales by Region</h3>
              
              {isLoading ? renderLoading() : (
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={salesByRegion}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {salesByRegion.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Legend />
                      <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              )}
            </Card>
            
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Top Performing Products</h3>
              
              {isLoading ? renderLoading() : (
                <div className="space-y-4">
                  {productPerformance.map((product) => (
                    <div key={product.name} className="border-b pb-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{product.name}</span>
                        <span className="text-sm">€{(product.sales / 1000).toFixed(0)}k</span>
                      </div>
                      <div className="flex items-center mt-1">
                        <div className="w-full bg-gray-200 rounded-full h-2 mr-4">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${(product.sales / 1245000) * 100}%` }}
                          ></div>
                        </div>
                        <span className={`text-xs ${product.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {product.growth > 0 ? '↑' : '↓'} {Math.abs(product.growth)}%
                        </span>
                      </div>
                    </div>
                  ))}
                  
                  <Button variant="outline" className="w-full mt-2">
                    View Full Product Report
                  </Button>
                </div>
              )}
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="products">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Product Sales Analysis</h3>
            
            {isLoading ? renderLoading() : (
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={productPerformance} layout="vertical" margin={{ top: 20, right: 30, left: 100, bottom: 5 }}>
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" />
                    <Tooltip formatter={(value: number) => [`€${(value/1000).toFixed(0)}k`, 'Value']} />
                    <Bar dataKey="sales" fill="#0284c7" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </Card>

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Growth by Product Category</h3>
              
              {isLoading ? renderLoading() : (
                <div className="space-y-4">
                  {productPerformance.map((product) => (
                    <div key={product.name} className="border-b pb-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{product.name}</span>
                        <span className={`text-sm ${product.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {product.growth > 0 ? '+' : ''}{product.growth}%
                        </span>
                      </div>
                      <div className="flex items-center mt-1">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${product.growth > 10 ? 'bg-green-600' : product.growth > 0 ? 'bg-blue-600' : 'bg-red-600'}`}
                            style={{ width: `${Math.min(Math.abs(product.growth) * 5, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Product Mix</h3>
              
              {isLoading ? renderLoading() : (
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={productPerformance}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="sales"
                        nameKey="name"
                        label={({name}) => name}
                      >
                        {productPerformance.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value: number) => [`€${(value/1000).toFixed(0)}k`, 'Sales']} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              )}
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="customers">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Customer Segment Analysis</h3>
            
            {isLoading ? renderLoading() : (
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={customerSegments}>
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" orientation="left" stroke="#0284c7" />
                    <YAxis yAxisId="right" orientation="right" stroke="#10b981" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="sales" name="Revenue (€)" fill="#0284c7" />
                    <Bar yAxisId="right" dataKey="customers" name="Customers" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </Card>

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Average Deal Size by Segment</h3>
              
              {isLoading ? renderLoading() : (
                <div className="space-y-4">
                  {customerSegments.map((segment) => (
                    <div key={segment.name} className="border-b pb-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{segment.name}</span>
                        <span className="text-sm">€{segment.avgDeal.toLocaleString()}</span>
                      </div>
                      <div className="mt-1">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${(segment.avgDeal / 20000) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Customer Distribution</h3>
              
              {isLoading ? renderLoading() : (
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={customerSegments}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="customers"
                        nameKey="name"
                        label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {customerSegments.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value} customers`, 'Count']} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              )}
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="forecast">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Sales Forecast vs Actual</h3>
            
            {isLoading ? renderLoading() : (
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={forecastData}>
                    <XAxis dataKey="quarter" />
                    <YAxis />
                    <Tooltip formatter={(value: number) => [`€${(value/1000000).toFixed(1)}M`, 'Value']} />
                    <Legend />
                    <Line type="monotone" dataKey="forecast" name="Forecast" stroke="#8884d8" strokeWidth={2} />
                    <Line type="monotone" dataKey="actual" name="Actual" stroke="#82ca9d" strokeWidth={2} />
                    <Line type="monotone" dataKey="projected" name="Projected" stroke="#ff7300" strokeWidth={2} strokeDasharray="5 5" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </Card>

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
            <Card className="p-6">
              <div className="text-sm text-muted-foreground">Q1 Performance</div>
              <div className="text-2xl font-bold mt-2">+6.3%</div>
              <div className="text-xs text-green-600 mt-1">Above forecast</div>
            </Card>
            
            <Card className="p-6">
              <div className="text-sm text-muted-foreground">Q2 Performance</div>
              <div className="text-2xl font-bold mt-2">+3.9%</div>
              <div className="text-xs text-green-600 mt-1">Above forecast</div>
            </Card>
            
            <Card className="p-6">
              <div className="text-sm text-muted-foreground">Q3 Performance</div>
              <div className="text-2xl font-bold mt-2">-1.2%</div>
              <div className="text-xs text-red-600 mt-1">Below forecast</div>
            </Card>
            
            <Card className="p-6">
              <div className="text-sm text-muted-foreground">Q4 Forecast</div>
              <div className="text-2xl font-bold mt-2">+3.3%</div>
              <div className="text-xs text-blue-600 mt-1">Projected growth</div>
            </Card>
          </div>

          <Card className="mt-6 p-6">
            <h3 className="text-lg font-semibold mb-4">Annual Sales Forecast</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div>
                <div className="text-4xl font-bold">€16.05M</div>
                <div className="text-sm text-muted-foreground mt-1">Projected Annual Revenue</div>
                <div className="text-lg text-green-600 mt-2">↑ 8.4% YoY</div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Progress to Annual Target</span>
                    <span className="text-sm font-medium">74.8%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '74.8%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Q4 Pipeline Coverage</span>
                    <span className="text-sm font-medium">2.3x</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  Pipeline Analysis
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Opportunity Review
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Forecast Settings
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Download Forecast Report
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SalesAnalytics;

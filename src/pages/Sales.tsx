
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SAPSection from '../components/SAPSection';
import SAPTile from '../components/SAPTile';
import { useVoiceAssistant } from '../hooks/useVoiceAssistant';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, LineChart, Line } from "recharts";
import { Calendar, ChevronDown, Filter, Search, Users, BarChart as BarChartIcon, Download, Printer, Eye, FileText } from 'lucide-react';
import FilterBar from '../components/filters/FilterBar';
import { toast } from '../components/ui/use-toast';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Skeleton } from '../components/ui/skeleton';
import MetricCard from '../components/metrics/MetricCard';
import DataTable from '../components/data/DataTable';

// Sample data for charts and tables
const salesPerformanceData = [
  { month: 'Jan', sales: 65, target: 45 },
  { month: 'Feb', sales: 59, target: 45 },
  { month: 'Mar', sales: 80, target: 60 },
  { month: 'Apr', sales: 81, target: 60 },
  { month: 'May', sales: 56, target: 50 },
  { month: 'Jun', sales: 55, target: 50 },
  { month: 'Jul', sales: 40, target: 40 },
];

const recentSalesOrders = [
  { id: "SO-10293", customer: "Acme Corp", value: "€24,500", status: "Processing", date: "2025-04-22" },
  { id: "SO-10292", customer: "XYZ Industries", value: "€18,750", status: "Delivered", date: "2025-04-21" },
  { id: "SO-10291", customer: "Global Tech", value: "€32,100", status: "Processing", date: "2025-04-20" },
  { id: "SO-10290", customer: "Mega Enterprises", value: "€15,800", status: "Awaiting Payment", date: "2025-04-19" },
  { id: "SO-10289", customer: "Bright Solutions", value: "€28,300", status: "Delivered", date: "2025-04-18" },
  { id: "SO-10288", customer: "TechForward", value: "€42,700", status: "Processing", date: "2025-04-17" },
  { id: "SO-10287", customer: "Elite Corp", value: "€19,250", status: "Delivered", date: "2025-04-16" },
];

const customerData = [
  { id: "C-001", name: "Acme Corp", industry: "Manufacturing", revenue: "€1.2M", orders: 24, status: "Active" },
  { id: "C-002", name: "XYZ Industries", industry: "Technology", revenue: "€2.4M", orders: 18, status: "Active" },
  { id: "C-003", name: "Global Tech", industry: "Technology", revenue: "€3.7M", orders: 32, status: "Active" },
  { id: "C-004", name: "Mega Enterprises", industry: "Retail", revenue: "€850K", orders: 15, status: "Inactive" },
  { id: "C-005", name: "Bright Solutions", industry: "Services", revenue: "€1.8M", orders: 27, status: "Active" },
];

const invoiceData = [
  { id: "INV-5821", customer: "Acme Corp", amount: "€24,500", date: "2025-04-22", status: "Paid", dueDate: "2025-05-22" },
  { id: "INV-5820", customer: "XYZ Industries", amount: "€18,750", date: "2025-04-21", status: "Outstanding", dueDate: "2025-05-21" },
  { id: "INV-5819", customer: "Global Tech", amount: "€32,100", date: "2025-04-20", status: "Paid", dueDate: "2025-05-20" },
  { id: "INV-5818", customer: "Mega Enterprises", amount: "€15,800", date: "2025-04-19", status: "Overdue", dueDate: "2025-05-19" },
  { id: "INV-5817", customer: "Bright Solutions", amount: "€28,300", date: "2025-04-18", status: "Paid", dueDate: "2025-05-18" },
];

const forecastData = [
  { quarter: 'Q1', forecast: 320000, actual: 340000 },
  { quarter: 'Q2', forecast: 380000, actual: 395000 },
  { quarter: 'Q3', forecast: 410000, actual: 405000 },
  { quarter: 'Q4', forecast: 450000, actual: 0 },
];

const Sales: React.FC = () => {
  const [isVoiceAssistantEnabled, setIsVoiceAssistantEnabled] = useState(false);
  const [salesFilter, setSalesFilter] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('orders');
  const [selectedRecord, setSelectedRecord] = useState<string | null>(null);
  const navigate = useNavigate();
  const { speak } = useVoiceAssistant();
  
  useEffect(() => {
    const checkVoiceAssistant = () => {
      const enabled = localStorage.getItem('voiceAssistantEnabled') === 'true';
      setIsVoiceAssistantEnabled(enabled);
      
      if (enabled) {
        speak(`Welcome to the Sales module. This is where you manage all aspects of your sales operations. 
        You can create and track sales orders, manage customer relationships, review sales analytics, and handle billing activities. 
        For example, you can use the 'Create Sales Order' tile to initiate a new customer order, or view your recent sales in the 
        'Sales Overview' section. The 'Customer Analytics' feature allows you to understand customer behavior and preferences.`);
      }
    };
    
    checkVoiceAssistant();
    
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    
    return () => clearTimeout(timer);
  }, [speak]);

  // Handle creating a new sales order
  const handleCreateSalesOrder = () => {
    toast({
      title: "Creating new sales order",
      description: "The sales order creation form has been opened.",
    });
    // In a real app, this would redirect to a form or open a modal
  };
  
  // Handle viewing order details
  const handleViewOrderDetails = (orderId: string) => {
    setSelectedRecord(orderId);
    toast({
      title: "Opening order details",
      description: `Viewing details for order ${orderId}`,
    });
    // In a real app, this would open a detailed view or navigate to a details page
  };

  // Handle filter changes
  const handleFilterChange = (filter: string) => {
    setSalesFilter(filter);
    toast({
      description: `Filter applied: ${filter}`,
    });
  };
  
  // Handle search
  const handleSearch = (value: string) => {
    if (value.trim()) {
      toast({
        description: `Searching for: ${value}`,
      });
    }
  };
  
  // Order columns configuration for DataTable
  const orderColumns = [
    { key: "id", header: "Order ID" },
    { 
      key: "customer", 
      header: "Customer",
      render: (value: string) => (
        <span className="text-blue-600 underline cursor-pointer">{value}</span>
      )
    },
    { key: "value", header: "Value" },
    { 
      key: "status", 
      header: "Status",
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          value === 'Delivered' ? 'bg-green-100 text-green-800' :
          value === 'Processing' ? 'bg-blue-100 text-blue-800' :
          'bg-yellow-100 text-yellow-800'
        }`}>
          {value}
        </span>
      )
    },
    { key: "date", header: "Date" },
    { 
      key: "actions", 
      header: "Actions",
      render: (_, row: any) => (
        <div className="flex space-x-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0"
            onClick={() => handleViewOrderDetails(row.id)}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            className="h-8 w-8 p-0"
          >
            <FileText className="h-4 w-4" />
          </Button>
        </div>
      )
    }
  ];
  
  // Customer columns configuration
  const customerColumns = [
    { key: "id", header: "ID" },
    { key: "name", header: "Name" },
    { key: "industry", header: "Industry" },
    { key: "revenue", header: "Annual Revenue" },
    { key: "orders", header: "Orders" },
    { 
      key: "status", 
      header: "Status",
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          value === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {value}
        </span>
      )
    }
  ];
  
  // Invoice columns configuration
  const invoiceColumns = [
    { key: "id", header: "Invoice #" },
    { key: "customer", header: "Customer" },
    { key: "amount", header: "Amount" },
    { key: "date", header: "Issue Date" },
    { key: "dueDate", header: "Due Date" },
    { 
      key: "status", 
      header: "Status",
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          value === 'Paid' ? 'bg-green-100 text-green-800' :
          value === 'Outstanding' ? 'bg-blue-100 text-blue-800' :
          'bg-red-100 text-red-800'
        }`}>
          {value}
        </span>
      )
    }
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Sales</h1>

      <SAPSection 
        title="Sales Overview" 
        isVoiceAssistantEnabled={isVoiceAssistantEnabled}
        description="Get a comprehensive view of your sales performance and recent activities."
      >
        <div className="col-span-1 md:col-span-2 lg:col-span-3">
          <SAPTile 
            title="Sales Performance"
            isVoiceAssistantEnabled={isVoiceAssistantEnabled}
            description="This chart shows your monthly sales performance trends. You can use this data to identify seasonal patterns and track your progress against sales targets."
          >
            {isLoading ? (
              <div className="h-64">
                <Skeleton className="h-full w-full" />
              </div>
            ) : (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={salesPerformanceData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="sales" fill="#0284c7" />
                    <Bar dataKey="target" fill="#d1d5db" />
                  </BarChart>
                </ResponsiveContainer>
                <div className="text-xs text-gray-500 mt-2 flex justify-between">
                  <span>Last updated: Today, 10:30 AM</span>
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-[#0284c7]"></div>
                      <span>Actual</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-[#d1d5db]"></div>
                      <span>Target</span>
                    </span>
                    <Button variant="outline" size="sm" className="h-6 text-xs flex gap-1">
                      <Download className="h-3 w-3" />
                      Export
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </SAPTile>
        </div>

        <SAPTile 
          title="Total Sales"
          subtitle="Current Quarter"
          value="€3.2M" 
          isVoiceAssistantEnabled={isVoiceAssistantEnabled}
          description="This tile shows your total sales for the current quarter. It's a key performance indicator that helps you track your revenue goals."
        >
          {isLoading ? (
            <Skeleton className="h-24 w-full" />
          ) : (
            <div>
              <div className="text-3xl font-semibold mb-2">€3.2M</div>
              <div className="flex items-center gap-2">
                <span className="text-green-500 font-medium text-sm">↑ 12.5%</span>
                <span className="text-xs text-gray-500">vs last quarter</span>
              </div>
              <div className="mt-2 pt-2 border-t text-xs text-blue-600 cursor-pointer">
                View sales report
              </div>
            </div>
          )}
        </SAPTile>

        <SAPTile 
          title="Active Customers"
          value="842" 
          isVoiceAssistantEnabled={isVoiceAssistantEnabled}
          description="This tile displays the number of active customers in the current period. Monitoring this metric helps you understand your customer engagement."
        >
          {isLoading ? (
            <Skeleton className="h-24 w-full" />
          ) : (
            <div>
              <div className="text-3xl font-semibold mb-2">842</div>
              <div className="flex items-center gap-2">
                <span className="text-green-500 font-medium text-sm">↑ 5.2%</span>
                <span className="text-xs text-gray-500">vs last month</span>
              </div>
              <div className="mt-2 pt-2 border-t text-xs text-blue-600 cursor-pointer">
                View customer list
              </div>
            </div>
          )}
        </SAPTile>

        <SAPTile 
          title="Average Order Value"
          value="€12,450" 
          isVoiceAssistantEnabled={isVoiceAssistantEnabled}
          description="This tile shows the average value of sales orders. It's useful for tracking changes in customer purchasing patterns."
        >
          {isLoading ? (
            <Skeleton className="h-24 w-full" />
          ) : (
            <div>
              <div className="text-3xl font-semibold mb-2">€12,450</div>
              <div className="flex items-center gap-2">
                <span className="text-red-500 font-medium text-sm">↓ 2.3%</span>
                <span className="text-xs text-gray-500">vs last month</span>
              </div>
              <div className="mt-2 pt-2 border-t text-xs text-blue-600 cursor-pointer">
                View order analytics
              </div>
            </div>
          )}
        </SAPTile>
      </SAPSection>

      <SAPSection 
        title="Sales Forecast" 
        isVoiceAssistantEnabled={isVoiceAssistantEnabled}
        description="View and analyze sales forecasts and projections."
      >
        <div className="col-span-full">
          <SAPTile 
            title="Quarterly Sales Forecast"
            isVoiceAssistantEnabled={isVoiceAssistantEnabled}
            description="This chart compares forecasted sales against actual performance by quarter."
          >
            {isLoading ? (
              <div className="h-64">
                <Skeleton className="h-full w-full" />
              </div>
            ) : (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={forecastData}>
                    <XAxis dataKey="quarter" />
                    <YAxis />
                    <Tooltip formatter={(value) => `€${Number(value).toLocaleString()}`} />
                    <Line type="monotone" dataKey="forecast" stroke="#8884d8" name="Forecast" />
                    <Line type="monotone" dataKey="actual" stroke="#82ca9d" name="Actual" />
                  </LineChart>
                </ResponsiveContainer>
                <div className="mt-4 grid grid-cols-4 gap-4">
                  <div className="bg-blue-50 p-3 rounded-md">
                    <div className="text-sm text-gray-500">Q1 Performance</div>
                    <div className="text-lg font-medium">+6.25%</div>
                    <div className="text-xs text-green-500">Above forecast</div>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-md">
                    <div className="text-sm text-gray-500">Q2 Performance</div>
                    <div className="text-lg font-medium">+3.95%</div>
                    <div className="text-xs text-green-500">Above forecast</div>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-md">
                    <div className="text-sm text-gray-500">Q3 Performance</div>
                    <div className="text-lg font-medium">-1.22%</div>
                    <div className="text-xs text-red-500">Below forecast</div>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-md">
                    <div className="text-sm text-gray-500">Q4 Forecast</div>
                    <div className="text-lg font-medium">€450,000</div>
                    <div className="text-xs text-blue-500">In progress</div>
                  </div>
                </div>
              </div>
            )}
          </SAPTile>
        </div>
      </SAPSection>

      <SAPSection 
        title="Sales Data Management" 
        isVoiceAssistantEnabled={isVoiceAssistantEnabled}
        description="Manage sales orders, customers, and invoices."
      >
        <div className="col-span-full">
          <SAPTile 
            title="Sales Data"
            isVoiceAssistantEnabled={isVoiceAssistantEnabled}
            description="This section provides comprehensive access to your sales data, including orders, customers, and invoices."
          >
            <div>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="orders">Sales Orders</TabsTrigger>
                  <TabsTrigger value="customers">Customers</TabsTrigger>
                  <TabsTrigger value="invoices">Invoices</TabsTrigger>
                </TabsList>
                
                <TabsContent value="orders" className="mt-4">
                  <div className="mb-4 flex justify-between">
                    <FilterBar 
                      filters={['All', 'Processing', 'Delivered', 'Awaiting Payment']}
                      activeFilter={salesFilter}
                      onFilterChange={handleFilterChange}
                      onSearch={handleSearch}
                      showSort={true}
                    />
                    <Button 
                      onClick={handleCreateSalesOrder}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Create Sales Order
                    </Button>
                  </div>
                  
                  {isLoading ? (
                    <Skeleton className="h-64 w-full" />
                  ) : (
                    <DataTable 
                      columns={orderColumns}
                      data={recentSalesOrders.filter(order => salesFilter === 'All' || order.status === salesFilter)}
                      className="border rounded-md"
                    />
                  )}
                  
                  <div className="mt-4 text-xs text-gray-500 flex justify-between items-center">
                    <span>Showing {recentSalesOrders.filter(order => salesFilter === 'All' || order.status === salesFilter).length} orders</span>
                    <div className="flex items-center gap-1">
                      <Button variant="outline" size="sm" className="h-6 text-xs">Previous</Button>
                      <Button variant="outline" size="sm" className="h-6 text-xs bg-blue-50 text-blue-700">1</Button>
                      <Button variant="outline" size="sm" className="h-6 text-xs">2</Button>
                      <Button variant="outline" size="sm" className="h-6 text-xs">Next</Button>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="customers" className="mt-4">
                  <div className="mb-4 flex justify-between">
                    <FilterBar 
                      filters={['All', 'Active', 'Inactive']}
                      activeFilter={'All'}
                      onFilterChange={(filter) => toast({ description: `Filter applied: ${filter}` })}
                      onSearch={handleSearch}
                    />
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      Add Customer
                    </Button>
                  </div>
                  
                  {isLoading ? (
                    <Skeleton className="h-64 w-full" />
                  ) : (
                    <DataTable 
                      columns={customerColumns}
                      data={customerData}
                      className="border rounded-md"
                    />
                  )}
                  
                  <div className="mt-4 text-xs text-gray-500 flex justify-between items-center">
                    <span>Showing {customerData.length} customers</span>
                    <div className="flex items-center gap-1">
                      <Button variant="outline" size="sm" className="h-6 text-xs">Previous</Button>
                      <Button variant="outline" size="sm" className="h-6 text-xs bg-blue-50 text-blue-700">1</Button>
                      <Button variant="outline" size="sm" className="h-6 text-xs">Next</Button>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="invoices" className="mt-4">
                  <div className="mb-4 flex justify-between">
                    <FilterBar 
                      filters={['All', 'Paid', 'Outstanding', 'Overdue']}
                      activeFilter={'All'}
                      onFilterChange={(filter) => toast({ description: `Filter applied: ${filter}` })}
                      onSearch={handleSearch}
                    />
                    <div className="flex gap-2">
                      <Button variant="outline">
                        <Printer className="h-4 w-4 mr-1" />
                        Print
                      </Button>
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        Create Invoice
                      </Button>
                    </div>
                  </div>
                  
                  {isLoading ? (
                    <Skeleton className="h-64 w-full" />
                  ) : (
                    <DataTable 
                      columns={invoiceColumns}
                      data={invoiceData}
                      className="border rounded-md"
                    />
                  )}
                  
                  <div className="mt-4 text-xs text-gray-500 flex justify-between items-center">
                    <span>Showing {invoiceData.length} invoices</span>
                    <div className="flex items-center gap-1">
                      <Button variant="outline" size="sm" className="h-6 text-xs">Previous</Button>
                      <Button variant="outline" size="sm" className="h-6 text-xs bg-blue-50 text-blue-700">1</Button>
                      <Button variant="outline" size="sm" className="h-6 text-xs">Next</Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </SAPTile>
        </div>
      </SAPSection>

      <SAPSection 
        title="Quick Actions" 
        isVoiceAssistantEnabled={isVoiceAssistantEnabled}
        description="Frequently used actions and processes."
      >
        <SAPTile 
          title="Create Sales Order"
          isVoiceAssistantEnabled={isVoiceAssistantEnabled}
          description="This tile allows you to create new sales orders for customers. When creating a sales order, you'll need to specify the customer, products, quantities, pricing, and delivery terms."
          icon={<span className="text-xl">📝</span>}
          onClick={handleCreateSalesOrder}
        />
        <SAPTile 
          title="Order Overview"
          isVoiceAssistantEnabled={isVoiceAssistantEnabled}
          description="This tile provides access to view and manage existing sales orders. You can monitor order status, make changes to pending orders, and track order fulfillment."
          icon={<span className="text-xl">📊</span>}
          onClick={() => setActiveTab('orders')}
        />
        <SAPTile 
          title="Quotations"
          isVoiceAssistantEnabled={isVoiceAssistantEnabled}
          description="Use this tile to create and manage sales quotations before they become orders. Quotations allow you to provide pricing information to potential customers."
          icon={<span className="text-xl">💰</span>}
          onClick={() => toast({ title: "Quotation Module", description: "Opening quotation management interface" })}
        />
        <SAPTile 
          title="Returns and Credits"
          isVoiceAssistantEnabled={isVoiceAssistantEnabled}
          description="This tile helps you process customer returns and issue credit notes. It's essential for managing product returns and customer refunds."
          icon={<span className="text-xl">↩️</span>}
          onClick={() => toast({ title: "Returns Module", description: "Opening returns and credits interface" })}
        />
      </SAPSection>

      <SAPSection 
        title="Customer Management" 
        isVoiceAssistantEnabled={isVoiceAssistantEnabled}
        description="Manage customer relationships and accounts."
      >
        <SAPTile 
          title="Customer Directory"
          isVoiceAssistantEnabled={isVoiceAssistantEnabled}
          description="Access your complete customer database with this tile. You can view customer details, contact information, purchase history, and account settings."
          icon={<span className="text-xl">👥</span>}
          onClick={() => setActiveTab('customers')}
        />
        <SAPTile 
          title="Customer Analytics"
          isVoiceAssistantEnabled={isVoiceAssistantEnabled}
          description="This tile provides detailed analytics and reports about customer behavior and purchasing patterns. You can use these insights for targeted marketing and sales strategies."
          icon={<span className="text-xl">📈</span>}
          onClick={() => toast({ title: "Customer Analytics", description: "Opening customer analytics dashboard" })}
        />
        <SAPTile 
          title="Customer Segmentation"
          isVoiceAssistantEnabled={isVoiceAssistantEnabled}
          description="Use this tile to group customers based on criteria like purchase history, location, or industry. Customer segmentation helps in creating targeted marketing campaigns."
          icon={<span className="text-xl">🔍</span>}
          onClick={() => toast({ title: "Customer Segmentation", description: "Opening customer segmentation tool" })}
        />
        <SAPTile 
          title="Customer Feedback"
          isVoiceAssistantEnabled={isVoiceAssistantEnabled}
          description="Access and analyze customer feedback and satisfaction ratings. This information is valuable for improving products, services, and customer experience."
          icon={<span className="text-xl">💬</span>}
          onClick={() => toast({ title: "Customer Feedback", description: "Opening customer feedback analytics" })}
        />
      </SAPSection>

      <SAPSection 
        title="Billing and Invoicing" 
        isVoiceAssistantEnabled={isVoiceAssistantEnabled}
        description="Manage billing documents and customer payments."
      >
        <SAPTile 
          title="Create Invoice"
          isVoiceAssistantEnabled={isVoiceAssistantEnabled}
          description="This tile allows you to create and send invoices to customers. You can generate invoices from sales orders or create standalone invoices as needed."
          icon={<span className="text-xl">📄</span>}
          onClick={() => {
            setActiveTab('invoices');
            toast({ title: "Invoice Creation", description: "Opening invoice creation form" });
          }}
        />
        <SAPTile 
          title="Invoice Overview"
          isVoiceAssistantEnabled={isVoiceAssistantEnabled}
          description="Use this tile to view and manage all customer invoices. You can track payment status, send reminders, and process payments."
          icon={<span className="text-xl">📋</span>}
          onClick={() => setActiveTab('invoices')}
        />
        <SAPTile 
          title="Billing Plans"
          isVoiceAssistantEnabled={isVoiceAssistantEnabled}
          description="This tile helps you set up and manage recurring billing plans for customers with subscription services or installment payments."
          icon={<span className="text-xl">📅</span>}
          onClick={() => toast({ title: "Billing Plans", description: "Opening billing plan management" })}
        />
        <SAPTile 
          title="Payment Processing"
          isVoiceAssistantEnabled={isVoiceAssistantEnabled}
          description="Access tools for processing customer payments, including credit cards, bank transfers, and other payment methods."
          icon={<span className="text-xl">💳</span>}
          onClick={() => toast({ title: "Payment Processing", description: "Opening payment processing interface" })}
        />
      </SAPSection>
    </div>
  );
};

export default Sales;

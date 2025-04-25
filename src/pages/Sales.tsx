
import React, { useState, useEffect } from 'react';
import SAPSection from '../components/SAPSection';
import SAPTile from '../components/SAPTile';
import { useVoiceAssistant } from '../hooks/useVoiceAssistant';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { Calendar, ChevronDown, Filter, Search, Users, BarChart as BarChartIcon } from 'lucide-react';

// Sample data for charts and tables
const salesPerformanceData = [
  { month: 'Jan', sales: 65 },
  { month: 'Feb', sales: 59 },
  { month: 'Mar', sales: 80 },
  { month: 'Apr', sales: 81 },
  { month: 'May', sales: 56 },
  { month: 'Jun', sales: 55 },
  { month: 'Jul', sales: 40 },
];

const recentSalesOrders = [
  { id: "SO-10293", customer: "Acme Corp", value: "€24,500", status: "Processing", date: "2025-04-22" },
  { id: "SO-10292", customer: "XYZ Industries", value: "€18,750", status: "Delivered", date: "2025-04-21" },
  { id: "SO-10291", customer: "Global Tech", value: "€32,100", status: "Processing", date: "2025-04-20" },
  { id: "SO-10290", customer: "Mega Enterprises", value: "€15,800", status: "Awaiting Payment", date: "2025-04-19" },
];

const Sales: React.FC = () => {
  const [isVoiceAssistantEnabled, setIsVoiceAssistantEnabled] = useState(false);
  const [salesFilter, setSalesFilter] = useState('All');
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
  }, [speak]);

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
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesPerformanceData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="sales" fill="#0284c7" />
                </BarChart>
              </ResponsiveContainer>
              <div className="text-xs text-gray-500 mt-2 flex justify-between">
                <span>Last updated: Today, 10:30 AM</span>
                <span className="flex items-center gap-1">
                  <BarChartIcon className="h-3 w-3" />
                  <span>Monthly view</span>
                </span>
              </div>
            </div>
          </SAPTile>
        </div>

        <SAPTile 
          title="Total Sales"
          subtitle="Current Quarter"
          value="€3.2M" 
          isVoiceAssistantEnabled={isVoiceAssistantEnabled}
          description="This tile shows your total sales for the current quarter. It's a key performance indicator that helps you track your revenue goals."
        >
          <div>
            <div className="text-3xl font-semibold mb-2">€3.2M</div>
            <div className="flex items-center gap-2">
              <span className="text-green-500 font-medium text-sm">↑ 12.5%</span>
              <span className="text-xs text-gray-500">vs last quarter</span>
            </div>
          </div>
        </SAPTile>

        <SAPTile 
          title="Active Customers"
          value="842" 
          isVoiceAssistantEnabled={isVoiceAssistantEnabled}
          description="This tile displays the number of active customers in the current period. Monitoring this metric helps you understand your customer engagement."
        >
          <div>
            <div className="text-3xl font-semibold mb-2">842</div>
            <div className="flex items-center gap-2">
              <span className="text-green-500 font-medium text-sm">↑ 5.2%</span>
              <span className="text-xs text-gray-500">vs last month</span>
            </div>
          </div>
        </SAPTile>

        <SAPTile 
          title="Average Order Value"
          value="€12,450" 
          isVoiceAssistantEnabled={isVoiceAssistantEnabled}
          description="This tile shows the average value of sales orders. It's useful for tracking changes in customer purchasing patterns."
        >
          <div>
            <div className="text-3xl font-semibold mb-2">€12,450</div>
            <div className="flex items-center gap-2">
              <span className="text-red-500 font-medium text-sm">↓ 2.3%</span>
              <span className="text-xs text-gray-500">vs last month</span>
            </div>
          </div>
        </SAPTile>
      </SAPSection>

      <SAPSection 
        title="Recent Sales Orders" 
        isVoiceAssistantEnabled={isVoiceAssistantEnabled}
        description="View and manage your most recent sales orders."
      >
        <div className="col-span-full">
          <SAPTile 
            title="Sales Order List"
            isVoiceAssistantEnabled={isVoiceAssistantEnabled}
            description="This table displays your recent sales orders with key information like order ID, customer, value, and status. Click on any order to view its detailed information."
          >
            <div>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <button className={`px-3 py-1 text-sm rounded-full ${salesFilter === 'All' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`} onClick={() => setSalesFilter('All')}>All</button>
                  <button className={`px-3 py-1 text-sm rounded-full ${salesFilter === 'Processing' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`} onClick={() => setSalesFilter('Processing')}>Processing</button>
                  <button className={`px-3 py-1 text-sm rounded-full ${salesFilter === 'Delivered' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`} onClick={() => setSalesFilter('Delivered')}>Delivered</button>
                </div>
                
                <div className="flex items-center gap-2">
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <Filter className="h-4 w-4 text-gray-500" />
                  </button>
                  <div className="relative">
                    <Search className="h-4 w-4 text-gray-500 absolute left-2 top-1/2 transform -translate-y-1/2" />
                    <input 
                      type="text" 
                      placeholder="Search orders..." 
                      className="pl-8 pr-2 py-1 text-sm border rounded-md w-40 focus:outline-none focus:border-blue-500" 
                    />
                  </div>
                </div>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentSalesOrders
                    .filter(order => salesFilter === 'All' || order.status === salesFilter)
                    .map(order => (
                      <TableRow key={order.id} className="cursor-pointer hover:bg-gray-50">
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>
                          <HoverCard>
                            <HoverCardTrigger asChild>
                              <span className="text-blue-600 underline cursor-pointer">{order.customer}</span>
                            </HoverCardTrigger>
                            <HoverCardContent className="w-80">
                              <div className="space-y-2">
                                <h4 className="text-sm font-semibold">{order.customer}</h4>
                                <div className="text-xs text-gray-500">
                                  <div className="grid grid-cols-2 gap-1">
                                    <span>Contact:</span>
                                    <span>John Smith</span>
                                    <span>Email:</span>
                                    <span>contact@{order.customer.toLowerCase().replace(' ', '')}.com</span>
                                    <span>Customer since:</span>
                                    <span>Jan 2022</span>
                                    <span>Total orders:</span>
                                    <span>32</span>
                                  </div>
                                </div>
                              </div>
                            </HoverCardContent>
                          </HoverCard>
                        </TableCell>
                        <TableCell>{order.value}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                            order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {order.status}
                          </span>
                        </TableCell>
                        <TableCell>{order.date}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
              
              <div className="mt-4 text-xs text-gray-500 flex justify-between items-center">
                <span>Showing {recentSalesOrders.filter(order => salesFilter === 'All' || order.status === salesFilter).length} orders</span>
                <div className="flex items-center gap-1">
                  <button className="px-2 py-1 border rounded text-xs">Previous</button>
                  <button className="px-2 py-1 border rounded bg-blue-50 text-blue-700 text-xs">1</button>
                  <button className="px-2 py-1 border rounded text-xs">2</button>
                  <button className="px-2 py-1 border rounded text-xs">Next</button>
                </div>
              </div>
            </div>
          </SAPTile>
        </div>
      </SAPSection>

      <SAPSection 
        title="Sales Orders" 
        isVoiceAssistantEnabled={isVoiceAssistantEnabled}
        description="Manage customer orders and sales transactions."
      >
        <SAPTile 
          title="Create Sales Order"
          isVoiceAssistantEnabled={isVoiceAssistantEnabled}
          description="This tile allows you to create new sales orders for customers. When creating a sales order, you'll need to specify the customer, products, quantities, pricing, and delivery terms."
          icon={<span className="text-xl">📝</span>}
        />
        <SAPTile 
          title="Order Overview"
          isVoiceAssistantEnabled={isVoiceAssistantEnabled}
          description="This tile provides access to view and manage existing sales orders. You can monitor order status, make changes to pending orders, and track order fulfillment."
          icon={<span className="text-xl">📊</span>}
        />
        <SAPTile 
          title="Quotations"
          isVoiceAssistantEnabled={isVoiceAssistantEnabled}
          description="Use this tile to create and manage sales quotations before they become orders. Quotations allow you to provide pricing information to potential customers."
          icon={<span className="text-xl">💰</span>}
        />
        <SAPTile 
          title="Returns and Credits"
          isVoiceAssistantEnabled={isVoiceAssistantEnabled}
          description="This tile helps you process customer returns and issue credit notes. It's essential for managing product returns and customer refunds."
          icon={<span className="text-xl">↩️</span>}
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
        />
        <SAPTile 
          title="Customer Analytics"
          isVoiceAssistantEnabled={isVoiceAssistantEnabled}
          description="This tile provides detailed analytics and reports about customer behavior and purchasing patterns. You can use these insights for targeted marketing and sales strategies."
          icon={<span className="text-xl">📈</span>}
        />
        <SAPTile 
          title="Customer Segmentation"
          isVoiceAssistantEnabled={isVoiceAssistantEnabled}
          description="Use this tile to group customers based on criteria like purchase history, location, or industry. Customer segmentation helps in creating targeted marketing campaigns."
          icon={<span className="text-xl">🔍</span>}
        />
        <SAPTile 
          title="Customer Feedback"
          isVoiceAssistantEnabled={isVoiceAssistantEnabled}
          description="Access and analyze customer feedback and satisfaction ratings. This information is valuable for improving products, services, and customer experience."
          icon={<span className="text-xl">💬</span>}
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
        />
        <SAPTile 
          title="Invoice Overview"
          isVoiceAssistantEnabled={isVoiceAssistantEnabled}
          description="Use this tile to view and manage all customer invoices. You can track payment status, send reminders, and process payments."
          icon={<span className="text-xl">📋</span>}
        />
        <SAPTile 
          title="Billing Plans"
          isVoiceAssistantEnabled={isVoiceAssistantEnabled}
          description="This tile helps you set up and manage recurring billing plans for customers with subscription services or installment payments."
          icon={<span className="text-xl">📅</span>}
        />
        <SAPTile 
          title="Payment Processing"
          isVoiceAssistantEnabled={isVoiceAssistantEnabled}
          description="Access tools for processing customer payments, including credit cards, bank transfers, and other payment methods."
          icon={<span className="text-xl">💳</span>}
        />
      </SAPSection>
    </div>
  );
};

export default Sales;

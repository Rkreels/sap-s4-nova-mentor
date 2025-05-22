
import React, { useState } from 'react';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Search, PlusCircle, Filter, ChevronDown, AlertTriangle } from 'lucide-react';
import { Input } from '../../components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { Badge } from '../../components/ui/badge';

const SalesReturns: React.FC = () => {
  const [activeTab, setActiveTab] = useState('returns');

  const returnRequests = [
    {
      id: 'RR001',
      customer: 'Acme Corp',
      orderRef: 'SO78654',
      createdDate: '2025-05-15',
      products: '2 items',
      reason: 'Damaged in Transit',
      value: '$1,250.00',
      status: 'New'
    },
    {
      id: 'RR002',
      customer: 'TechSolutions Inc',
      orderRef: 'SO78432',
      createdDate: '2025-05-14',
      products: '1 item',
      reason: 'Wrong Item',
      value: '$750.00',
      status: 'In Process'
    },
    {
      id: 'RR003',
      customer: 'Global Retail',
      orderRef: 'SO78201',
      createdDate: '2025-05-12',
      products: '5 items',
      reason: 'Defective Product',
      value: '$3,200.00',
      status: 'Approved'
    },
    {
      id: 'RR004',
      customer: 'Manufacturing Partners',
      orderRef: 'SO77985',
      createdDate: '2025-05-10',
      products: '3 items',
      reason: 'Order Error',
      value: '$1,800.00',
      status: 'Completed'
    },
    {
      id: 'RR005',
      customer: 'Logistic Solutions',
      orderRef: 'SO77854',
      createdDate: '2025-05-08',
      products: '2 items',
      reason: 'Customer Changed Mind',
      value: '$950.00',
      status: 'Rejected'
    },
  ];

  const returnOrders = [
    {
      id: 'RO001',
      returnRequest: 'RR003',
      customer: 'Global Retail',
      createdDate: '2025-05-13',
      scheduledDate: '2025-05-20',
      itemCount: 5,
      value: '$3,200.00',
      status: 'Scheduled'
    },
    {
      id: 'RO002',
      returnRequest: 'RR004',
      customer: 'Manufacturing Partners',
      createdDate: '2025-05-11',
      scheduledDate: '2025-05-15',
      itemCount: 3,
      value: '$1,800.00',
      status: 'Received'
    },
    {
      id: 'RO003',
      returnRequest: 'RR002',
      customer: 'TechSolutions Inc',
      createdDate: '2025-05-14',
      scheduledDate: '2025-05-22',
      itemCount: 1,
      value: '$750.00',
      status: 'Processing'
    },
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig: { [key: string]: { color: string; bgColor: string } } = {
      'New': { color: 'text-blue-800', bgColor: 'bg-blue-100' },
      'In Process': { color: 'text-amber-800', bgColor: 'bg-amber-100' },
      'Approved': { color: 'text-green-800', bgColor: 'bg-green-100' },
      'Completed': { color: 'text-purple-800', bgColor: 'bg-purple-100' },
      'Rejected': { color: 'text-red-800', bgColor: 'bg-red-100' },
      'Scheduled': { color: 'text-indigo-800', bgColor: 'bg-indigo-100' },
      'Received': { color: 'text-cyan-800', bgColor: 'bg-cyan-100' },
      'Processing': { color: 'text-amber-800', bgColor: 'bg-amber-100' },
    };

    const config = statusConfig[status] || { color: 'text-gray-800', bgColor: 'bg-gray-100' };
    
    return (
      <Badge className={`${config.bgColor} ${config.color} hover:${config.bgColor}`}>
        {status}
      </Badge>
    );
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Sales Returns Management</h1>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button size="sm">
            <PlusCircle className="h-4 w-4 mr-2" />
            Create Return Request
          </Button>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 flex items-start">
        <AlertTriangle className="h-5 w-5 text-yellow-500 mr-3 mt-0.5" />
        <div>
          <h3 className="font-medium text-yellow-800">Returns Alert</h3>
          <p className="text-sm text-yellow-700">There are 2 return requests awaiting approval and 1 return scheduled for pickup today.</p>
        </div>
      </div>

      <Tabs defaultValue="returns" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="returns">Return Requests</TabsTrigger>
          <TabsTrigger value="orders">Return Orders</TabsTrigger>
          <TabsTrigger value="analytics">Returns Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="returns" className="space-y-4 pt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-4">
                <div className="relative w-72">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search return requests..." className="pl-8" />
                </div>
                <div className="flex items-center space-x-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[150px] h-9">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="in-process">In Process</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Return ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Order Ref</TableHead>
                      <TableHead>Created Date</TableHead>
                      <TableHead>Products</TableHead>
                      <TableHead>Return Reason</TableHead>
                      <TableHead>Value</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {returnRequests.map(request => (
                      <TableRow key={request.id}>
                        <TableCell>{request.id}</TableCell>
                        <TableCell>{request.customer}</TableCell>
                        <TableCell>{request.orderRef}</TableCell>
                        <TableCell>{request.createdDate}</TableCell>
                        <TableCell>{request.products}</TableCell>
                        <TableCell>{request.reason}</TableCell>
                        <TableCell>{request.value}</TableCell>
                        <TableCell>{getStatusBadge(request.status)}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            Process <ChevronDown className="h-4 w-4 ml-1" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders" className="space-y-4 pt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-4">
                <div className="relative w-72">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search return orders..." className="pl-8" />
                </div>
              </div>
              
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Return Order</TableHead>
                      <TableHead>Request Ref</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Created Date</TableHead>
                      <TableHead>Scheduled Date</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>Value</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {returnOrders.map(order => (
                      <TableRow key={order.id}>
                        <TableCell>{order.id}</TableCell>
                        <TableCell>{order.returnRequest}</TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell>{order.createdDate}</TableCell>
                        <TableCell>{order.scheduledDate}</TableCell>
                        <TableCell>{order.itemCount}</TableCell>
                        <TableCell>{order.value}</TableCell>
                        <TableCell>{getStatusBadge(order.status)}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4 pt-4">
          <Card>
            <CardContent className="pt-6 p-8 flex flex-col items-center justify-center">
              <h3 className="text-lg font-medium mb-6">Returns Analytics Dashboard</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                <div className="border rounded-md p-4 text-center">
                  <div className="text-2xl font-semibold text-blue-600 mb-2">12</div>
                  <div className="text-sm text-gray-500">Open Returns</div>
                </div>
                <div className="border rounded-md p-4 text-center">
                  <div className="text-2xl font-semibold text-green-600 mb-2">$12,650</div>
                  <div className="text-sm text-gray-500">Monthly Returns Value</div>
                </div>
                <div className="border rounded-md p-4 text-center">
                  <div className="text-2xl font-semibold text-amber-600 mb-2">3.2%</div>
                  <div className="text-sm text-gray-500">Return Rate</div>
                </div>
              </div>
              <div className="w-full mt-8 h-64 bg-gray-50 rounded-md flex items-center justify-center">
                <p className="text-gray-400">Return trend chart will be displayed here</p>
              </div>
              <div className="w-full mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border rounded-md p-4">
                  <h4 className="text-sm font-medium mb-4">Top Return Reasons</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Damaged in Transit</span>
                      <span className="text-sm font-medium">32%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '32%' }}></div>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-sm">Defective Product</span>
                      <span className="text-sm font-medium">24%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '24%' }}></div>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-sm">Wrong Item</span>
                      <span className="text-sm font-medium">18%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '18%' }}></div>
                    </div>
                  </div>
                </div>
                <div className="border rounded-md p-4">
                  <h4 className="text-sm font-medium mb-4">Return Processing Time</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Average Time</span>
                      <span className="text-sm font-medium">4.2 days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Fastest Return</span>
                      <span className="text-sm font-medium">1.5 days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Slowest Return</span>
                      <span className="text-sm font-medium">8.3 days</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SalesReturns;

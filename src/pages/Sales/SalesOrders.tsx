
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Search, Plus, FileText, Truck, CheckCircle, Clock } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Badge } from '../../components/ui/badge';
import PageHeader from '../../components/page/PageHeader';

const SalesOrders: React.FC = () => {
  const [activeTab, setActiveTab] = useState('orders');

  const orders = [
    { id: 'SO-78954', customer: 'Global Manufacturing Corp', date: '2024-05-25', amount: '€28,500', status: 'Processing', priority: 'High', delivery: '2024-06-01' },
    { id: 'SO-78965', customer: 'Tech Solutions Ltd', date: '2024-05-24', amount: '€45,200', status: 'Shipped', priority: 'Medium', delivery: '2024-05-30' },
    { id: 'SO-79001', customer: 'Retail Partners Inc', date: '2024-05-23', amount: '€120,000', status: 'Delivered', priority: 'High', delivery: '2024-05-28' },
    { id: 'SO-78990', customer: 'Service Dynamics', date: '2024-05-22', amount: '€12,750', status: 'Processing', priority: 'Low', delivery: '2024-06-05' },
    { id: 'SO-78975', customer: 'Industrial Holdings', date: '2024-05-21', amount: '€36,200', status: 'Confirmed', priority: 'Medium', delivery: '2024-06-03' },
  ];

  const orderItems = [
    { orderID: 'SO-78954', item: 'Professional Server Rack', quantity: 2, unitPrice: '€2,450.00', lineTotal: '€4,900.00', status: 'Available' },
    { orderID: 'SO-78954', item: 'Network Security Firewall', quantity: 1, unitPrice: '€8,750.00', lineTotal: '€8,750.00', status: 'Available' },
    { orderID: 'SO-78954', item: 'Enterprise Database License', quantity: 3, unitPrice: '€4,950.00', lineTotal: '€14,850.00', status: 'Backorder' },
  ];

  const fulfillment = [
    { orderID: 'SO-78965', status: 'Picked', warehouse: 'WH-001 Frankfurt', carrier: 'DHL Express', tracking: 'DHL123456789', estimatedDelivery: '2024-05-30' },
    { orderID: 'SO-79001', status: 'Delivered', warehouse: 'WH-002 Munich', carrier: 'UPS', tracking: 'UPS987654321', estimatedDelivery: '2024-05-28' },
    { orderID: 'SO-78975', status: 'Confirmed', warehouse: 'WH-001 Frankfurt', carrier: 'FedEx', tracking: 'Pending', estimatedDelivery: '2024-06-03' },
    { orderID: 'SO-78990', status: 'Processing', warehouse: 'WH-003 Berlin', carrier: 'DPD', tracking: 'Pending', estimatedDelivery: '2024-06-05' },
  ];

  return (
    <div className="p-6 space-y-6">
      <PageHeader 
        title="Sales Orders"
        description="Manage sales orders, fulfillment, and delivery tracking"
        voiceIntroduction="Welcome to Sales Orders. Track and manage your sales orders from creation to delivery."
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <p className="text-2xl font-bold">247</p>
                <p className="text-xs text-muted-foreground">Total Orders</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-orange-600 mr-3" />
              <div>
                <p className="text-2xl font-bold">28</p>
                <p className="text-xs text-muted-foreground">Processing</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Truck className="h-8 w-8 text-purple-600 mr-3" />
              <div>
                <p className="text-2xl font-bold">45</p>
                <p className="text-xs text-muted-foreground">Shipped</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <p className="text-2xl font-bold">174</p>
                <p className="text-xs text-muted-foreground">Delivered</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="orders">Order Management</TabsTrigger>
          <TabsTrigger value="items">Order Items</TabsTrigger>
          <TabsTrigger value="fulfillment">Fulfillment</TabsTrigger>
          <TabsTrigger value="analytics">Order Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Sales Orders</CardTitle>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Order
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search orders..." className="pl-8" />
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Order Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Delivery Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>{order.amount}</TableCell>
                        <TableCell>
                          <Badge variant={
                            order.status === 'Delivered' ? 'outline' :
                            order.status === 'Shipped' ? 'default' :
                            order.status === 'Processing' ? 'secondary' : 'outline'
                          }>
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={
                            order.priority === 'High' ? 'destructive' :
                            order.priority === 'Medium' ? 'secondary' : 'outline'
                          }>
                            {order.priority}
                          </Badge>
                        </TableCell>
                        <TableCell>{order.delivery}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">View</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="items" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Order Line Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Item Description</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Unit Price</TableHead>
                      <TableHead>Line Total</TableHead>
                      <TableHead>Availability</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orderItems.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{item.orderID}</TableCell>
                        <TableCell>{item.item}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>{item.unitPrice}</TableCell>
                        <TableCell>{item.lineTotal}</TableCell>
                        <TableCell>
                          <Badge variant={item.status === 'Available' ? 'outline' : 'secondary'}>
                            {item.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">Edit</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Item Availability</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Check item availability and stock levels.
                </p>
                <Button className="w-full">Check Availability</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Substitution Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Manage product substitutions for unavailable items.
                </p>
                <Button className="w-full">Manage Substitutions</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Pricing Updates</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Update pricing for pending order items.
                </p>
                <Button className="w-full">Update Prices</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="fulfillment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Order Fulfillment Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Fulfillment Status</TableHead>
                      <TableHead>Warehouse</TableHead>
                      <TableHead>Carrier</TableHead>
                      <TableHead>Tracking Number</TableHead>
                      <TableHead>Estimated Delivery</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {fulfillment.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{item.orderID}</TableCell>
                        <TableCell>
                          <Badge variant={
                            item.status === 'Delivered' ? 'outline' :
                            item.status === 'Picked' ? 'default' :
                            item.status === 'Confirmed' ? 'secondary' : 'secondary'
                          }>
                            {item.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{item.warehouse}</TableCell>
                        <TableCell>{item.carrier}</TableCell>
                        <TableCell>{item.tracking}</TableCell>
                        <TableCell>{item.estimatedDelivery}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">Track</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Shipping Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Manage shipping carriers and delivery options.
                </p>
                <Button className="w-full">Manage Shipping</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Warehouse Operations</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Coordinate with warehouse for order fulfillment.
                </p>
                <Button className="w-full">Warehouse Dashboard</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Delivery Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Track deliveries and manage exceptions.
                </p>
                <Button className="w-full">Track Deliveries</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Order Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Analyze order processing times and efficiency.
                </p>
                <Button className="w-full">View Performance</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Fulfillment Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Track fulfillment speed and accuracy metrics.
                </p>
                <Button className="w-full">View Metrics</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Customer Satisfaction</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Monitor delivery performance and customer feedback.
                </p>
                <Button className="w-full">View Satisfaction</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Revenue Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Analyze order values and revenue trends.
                </p>
                <Button className="w-full">View Revenue</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SalesOrders;

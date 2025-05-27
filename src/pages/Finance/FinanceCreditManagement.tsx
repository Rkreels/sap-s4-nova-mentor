
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Search, Plus, AlertTriangle, CheckCircle, Clock, Users } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Badge } from '../../components/ui/badge';
import PageHeader from '../../components/page/PageHeader';

const FinanceCreditManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('customers');

  const customers = [
    { id: 'CUST-001', name: 'Global Manufacturing Corp', creditLimit: '€500K', exposure: '€425K', rating: 'A+', utilization: '85%', status: 'Good' },
    { id: 'CUST-002', name: 'Tech Solutions Ltd', creditLimit: '€300K', exposure: '€285K', rating: 'A', utilization: '95%', status: 'Watch' },
    { id: 'CUST-003', name: 'Retail Partners Inc', creditLimit: '€750K', exposure: '€820K', rating: 'B+', utilization: '109%', status: 'Critical' },
    { id: 'CUST-004', name: 'Service Dynamics', creditLimit: '€200K', exposure: '€150K', rating: 'A-', utilization: '75%', status: 'Good' },
    { id: 'CUST-005', name: 'Industrial Holdings', creditLimit: '€1M', exposure: '€680K', rating: 'AA-', utilization: '68%', status: 'Good' },
  ];

  const creditRequests = [
    { id: 'CR-001', customer: 'New Client Solutions', amount: '€250K', purpose: 'Working Capital', status: 'Pending Review', submittedDate: '2024-05-25', reviewer: 'Credit Team' },
    { id: 'CR-002', customer: 'Expansion Corp', amount: '€500K', purpose: 'Equipment Purchase', status: 'Under Analysis', submittedDate: '2024-05-23', reviewer: 'Senior Analyst' },
    { id: 'CR-003', customer: 'Growth Industries', amount: '€150K', purpose: 'Inventory Financing', status: 'Approved', submittedDate: '2024-05-20', reviewer: 'Credit Manager' },
    { id: 'CR-004', customer: 'Startup Ventures', amount: '€75K', purpose: 'Bridge Financing', status: 'Rejected', submittedDate: '2024-05-18', reviewer: 'Risk Committee' },
  ];

  const overdueAccounts = [
    { customer: 'Tech Solutions Ltd', amount: '€45K', daysPastDue: 45, lastContact: '2024-05-20', nextAction: 'Legal Notice', priority: 'High' },
    { customer: 'Retail Partners Inc', amount: '€125K', daysPastDue: 90, lastContact: '2024-05-15', nextAction: 'Collections Agency', priority: 'Critical' },
    { customer: 'Service Dynamics', amount: '€12K', daysPastDue: 15, lastContact: '2024-05-25', nextAction: 'Payment Reminder', priority: 'Low' },
    { customer: 'Small Business Co', amount: '€28K', daysPastDue: 60, lastContact: '2024-05-18', nextAction: 'Demand Letter', priority: 'Medium' },
  ];

  return (
    <div className="p-6 space-y-6">
      <PageHeader 
        title="Finance Credit Management"
        description="Comprehensive credit risk management and customer credit analysis"
        voiceIntroduction="Welcome to Finance Credit Management. Monitor customer credit limits, assess credit risks, and manage collections."
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <p className="text-2xl font-bold">€2.75M</p>
                <p className="text-xs text-muted-foreground">Total Credit Exposure</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <p className="text-2xl font-bold">€3.25M</p>
                <p className="text-xs text-muted-foreground">Available Credit</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <AlertTriangle className="h-8 w-8 text-orange-600 mr-3" />
              <div>
                <p className="text-2xl font-bold">€210K</p>
                <p className="text-xs text-muted-foreground">Overdue Amount</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-purple-600 mr-3" />
              <div>
                <p className="text-2xl font-bold">4</p>
                <p className="text-xs text-muted-foreground">Pending Reviews</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="customers">Customer Credit</TabsTrigger>
          <TabsTrigger value="requests">Credit Requests</TabsTrigger>
          <TabsTrigger value="collections">Collections</TabsTrigger>
          <TabsTrigger value="analysis">Risk Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="customers" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Customer Credit Portfolio</CardTitle>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Customer
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search customers..." className="pl-8" />
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Credit Limit</TableHead>
                      <TableHead>Current Exposure</TableHead>
                      <TableHead>Credit Rating</TableHead>
                      <TableHead>Utilization</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {customers.map((customer) => (
                      <TableRow key={customer.id}>
                        <TableCell className="font-medium">{customer.id}</TableCell>
                        <TableCell>{customer.name}</TableCell>
                        <TableCell>{customer.creditLimit}</TableCell>
                        <TableCell>{customer.exposure}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{customer.rating}</Badge>
                        </TableCell>
                        <TableCell>{customer.utilization}</TableCell>
                        <TableCell>
                          <Badge variant={
                            customer.status === 'Good' ? 'outline' :
                            customer.status === 'Watch' ? 'secondary' : 'destructive'
                          }>
                            {customer.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">Review</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="requests" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Credit Limit Requests</CardTitle>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  New Request
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Request ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Requested Amount</TableHead>
                      <TableHead>Purpose</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Submitted Date</TableHead>
                      <TableHead>Reviewer</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {creditRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell className="font-medium">{request.id}</TableCell>
                        <TableCell>{request.customer}</TableCell>
                        <TableCell>{request.amount}</TableCell>
                        <TableCell>{request.purpose}</TableCell>
                        <TableCell>
                          <Badge variant={
                            request.status === 'Approved' ? 'outline' :
                            request.status === 'Rejected' ? 'destructive' : 'secondary'
                          }>
                            {request.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{request.submittedDate}</TableCell>
                        <TableCell>{request.reviewer}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">Process</Button>
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
                <CardTitle>Credit Scoring</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Automated credit scoring and risk assessment.
                </p>
                <Button className="w-full">Run Credit Score</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Financial Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Analyze customer financial statements and ratios.
                </p>
                <Button className="w-full">Analyze Financials</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>External Credit Check</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Perform external credit bureau checks.
                </p>
                <Button className="w-full">Check Credit Bureau</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="collections" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Overdue Accounts</CardTitle>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Bulk Action
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Overdue Amount</TableHead>
                      <TableHead>Days Past Due</TableHead>
                      <TableHead>Last Contact</TableHead>
                      <TableHead>Next Action</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {overdueAccounts.map((account, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{account.customer}</TableCell>
                        <TableCell className="text-red-600">{account.amount}</TableCell>
                        <TableCell>{account.daysPastDue}</TableCell>
                        <TableCell>{account.lastContact}</TableCell>
                        <TableCell>{account.nextAction}</TableCell>
                        <TableCell>
                          <Badge variant={
                            account.priority === 'Critical' ? 'destructive' :
                            account.priority === 'High' ? 'secondary' :
                            account.priority === 'Medium' ? 'outline' : 'outline'
                          }>
                            {account.priority}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">Contact</Button>
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
                <CardTitle>Dunning Process</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Automated dunning letters and escalation.
                </p>
                <Button className="w-full">Configure Dunning</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Payment Plans</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Create and manage customer payment plans.
                </p>
                <Button className="w-full">Create Payment Plan</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Legal Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Track legal proceedings and collection activities.
                </p>
                <Button className="w-full">Manage Legal Cases</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Portfolio Risk Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Analyze overall credit portfolio risk and concentration.
                </p>
                <Button className="w-full">Generate Risk Report</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Credit Loss Provisioning</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Calculate expected credit losses and provisions.
                </p>
                <Button className="w-full">Calculate Provisions</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Industry Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Analyze credit risk by industry and sector.
                </p>
                <Button className="w-full">View Industry Risk</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Stress Testing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Perform stress tests on credit portfolio.
                </p>
                <Button className="w-full">Run Stress Test</Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Risk Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">2.1%</p>
                  <p className="text-sm text-muted-foreground">Default Rate</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">€125K</p>
                  <p className="text-sm text-muted-foreground">Credit Loss Provision</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">A-</p>
                  <p className="text-sm text-muted-foreground">Avg Credit Rating</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-orange-600">84.6%</p>
                  <p className="text-sm text-muted-foreground">Portfolio Utilization</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FinanceCreditManagement;


import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Search, Plus, Users, Building, MapPin, Phone } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Badge } from '../../components/ui/badge';
import PageHeader from '../../components/page/PageHeader';

const CustomerManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('customers');

  const customers = [
    { id: 'CUST-001', name: 'Global Manufacturing Corp', type: 'Corporate', industry: 'Manufacturing', revenue: '€2.5M', status: 'Active', creditRating: 'A+', lastOrder: '2024-05-20' },
    { id: 'CUST-002', name: 'Tech Solutions Ltd', type: 'SME', industry: 'Technology', revenue: '€850K', status: 'Active', creditRating: 'A', lastOrder: '2024-05-18' },
    { id: 'CUST-003', name: 'Retail Partners Inc', type: 'Enterprise', industry: 'Retail', revenue: '€3.2M', status: 'Active', creditRating: 'B+', lastOrder: '2024-05-15' },
    { id: 'CUST-004', name: 'Service Dynamics', type: 'SME', industry: 'Services', revenue: '€650K', status: 'Inactive', creditRating: 'A-', lastOrder: '2024-04-28' },
    { id: 'CUST-005', name: 'Industrial Holdings', type: 'Corporate', industry: 'Industrial', revenue: '€4.1M', status: 'Active', creditRating: 'AA-', lastOrder: '2024-05-22' },
  ];

  const prospects = [
    { id: 'PROS-001', name: 'Future Systems Inc', industry: 'Technology', stage: 'Qualification', probability: '25%', value: '€150K', contact: 'John Smith', nextAction: '2024-05-28' },
    { id: 'PROS-002', name: 'Growth Enterprises', industry: 'Manufacturing', stage: 'Proposal', probability: '60%', value: '€450K', contact: 'Sarah Johnson', nextAction: '2024-05-30' },
    { id: 'PROS-003', name: 'New Ventures Ltd', industry: 'Services', stage: 'Negotiation', probability: '85%', value: '€280K', contact: 'Mike Wilson', nextAction: '2024-05-29' },
    { id: 'PROS-004', name: 'Market Leaders Co', industry: 'Retail', stage: 'Discovery', probability: '15%', value: '€320K', contact: 'Lisa Brown', nextAction: '2024-06-01' },
  ];

  const segments = [
    { name: 'Enterprise', customers: 28, revenue: '€12.5M', growth: '+15%', color: 'bg-blue-100 text-blue-800' },
    { name: 'SME', customers: 45, revenue: '€8.2M', growth: '+8%', color: 'bg-green-100 text-green-800' },
    { name: 'Government', customers: 12, revenue: '€3.8M', growth: '+12%', color: 'bg-purple-100 text-purple-800' },
    { name: 'Startup', customers: 18, revenue: '€1.2M', growth: '+25%', color: 'bg-orange-100 text-orange-800' },
  ];

  return (
    <div className="p-6 space-y-6">
      <PageHeader 
        title="Customer Management"
        description="Manage customer relationships, prospects, and segmentation"
        voiceIntroduction="Welcome to Customer Management. Manage your customer database, track prospects, and analyze customer segments."
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <p className="text-2xl font-bold">103</p>
                <p className="text-xs text-muted-foreground">Active Customers</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Building className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <p className="text-2xl font-bold">€25.7M</p>
                <p className="text-xs text-muted-foreground">Total Customer Value</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <MapPin className="h-8 w-8 text-purple-600 mr-3" />
              <div>
                <p className="text-2xl font-bold">24</p>
                <p className="text-xs text-muted-foreground">Active Prospects</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Phone className="h-8 w-8 text-orange-600 mr-3" />
              <div>
                <p className="text-2xl font-bold">€1.2M</p>
                <p className="text-xs text-muted-foreground">Pipeline Value</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="customers">Customer Database</TabsTrigger>
          <TabsTrigger value="prospects">Prospects</TabsTrigger>
          <TabsTrigger value="segments">Customer Segments</TabsTrigger>
          <TabsTrigger value="analytics">Customer Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="customers" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Customer Database</CardTitle>
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
                      <TableHead>Type</TableHead>
                      <TableHead>Industry</TableHead>
                      <TableHead>Annual Revenue</TableHead>
                      <TableHead>Credit Rating</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Order</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {customers.map((customer) => (
                      <TableRow key={customer.id}>
                        <TableCell className="font-medium">{customer.id}</TableCell>
                        <TableCell>{customer.name}</TableCell>
                        <TableCell>{customer.type}</TableCell>
                        <TableCell>{customer.industry}</TableCell>
                        <TableCell>{customer.revenue}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{customer.creditRating}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={customer.status === 'Active' ? 'outline' : 'secondary'}>
                            {customer.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{customer.lastOrder}</TableCell>
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

        <TabsContent value="prospects" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Sales Prospects</CardTitle>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Prospect
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Prospect ID</TableHead>
                      <TableHead>Company Name</TableHead>
                      <TableHead>Industry</TableHead>
                      <TableHead>Sales Stage</TableHead>
                      <TableHead>Probability</TableHead>
                      <TableHead>Deal Value</TableHead>
                      <TableHead>Contact Person</TableHead>
                      <TableHead>Next Action</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {prospects.map((prospect) => (
                      <TableRow key={prospect.id}>
                        <TableCell className="font-medium">{prospect.id}</TableCell>
                        <TableCell>{prospect.name}</TableCell>
                        <TableCell>{prospect.industry}</TableCell>
                        <TableCell>{prospect.stage}</TableCell>
                        <TableCell>{prospect.probability}</TableCell>
                        <TableCell>{prospect.value}</TableCell>
                        <TableCell>{prospect.contact}</TableCell>
                        <TableCell>{prospect.nextAction}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">Manage</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="segments" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {segments.map((segment, index) => (
              <Card key={index}>
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg">{segment.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-2xl font-bold">{segment.customers}</p>
                      <p className="text-xs text-muted-foreground">Customers</p>
                    </div>
                    <div>
                      <p className="text-lg font-semibold">{segment.revenue}</p>
                      <p className="text-xs text-muted-foreground">Annual Revenue</p>
                    </div>
                    <div>
                      <Badge className={segment.color}>
                        {segment.growth} Growth
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Segment Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-24 flex flex-col">
                  <span className="text-sm font-medium">Create New Segment</span>
                  <span className="text-xs text-muted-foreground mt-1">Define custom customer segments</span>
                </Button>
                <Button variant="outline" className="h-24 flex flex-col">
                  <span className="text-sm font-medium">Segment Analysis</span>
                  <span className="text-xs text-muted-foreground mt-1">Analyze segment performance</span>
                </Button>
                <Button variant="outline" className="h-24 flex flex-col">
                  <span className="text-sm font-medium">Campaign Targeting</span>
                  <span className="text-xs text-muted-foreground mt-1">Target campaigns by segment</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Customer Lifetime Value</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Analyze customer lifetime value and profitability.
                </p>
                <Button className="w-full">View CLV Analysis</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Churn Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Identify customers at risk of churning.
                </p>
                <Button className="w-full">Analyze Churn Risk</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Purchase Behavior</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Analyze customer purchasing patterns and trends.
                </p>
                <Button className="w-full">View Purchase Analytics</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Geographic Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Analyze customer distribution by region.
                </p>
                <Button className="w-full">View Geographic Data</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CustomerManagement;

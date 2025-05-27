
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Search, Plus, TrendingUp, DollarSign, PieChart } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Badge } from '../../components/ui/badge';
import PageHeader from '../../components/page/PageHeader';

const ProfitCenterAccounting: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profitcenters');

  const profitCenters = [
    { id: 'PC-001', name: 'Europe Region', manager: 'Anna Mueller', revenue: '€2.5M', costs: '€1.8M', profit: '€700K', margin: '28%', status: 'Active' },
    { id: 'PC-002', name: 'North America', manager: 'Robert Johnson', revenue: '€3.2M', costs: '€2.1M', profit: '€1.1M', margin: '34%', status: 'Active' },
    { id: 'PC-003', name: 'Asia Pacific', manager: 'Tanaka Hiroshi', revenue: '€1.8M', costs: '€1.3M', profit: '€500K', margin: '28%', status: 'Active' },
    { id: 'PC-004', name: 'Product Line A', manager: 'Sarah Williams', revenue: '€4.1M', costs: '€2.9M', profit: '€1.2M', margin: '29%', status: 'Active' },
    { id: 'PC-005', name: 'Product Line B', manager: 'Michael Brown', revenue: '€2.8M', costs: '€2.0M', profit: '€800K', margin: '29%', status: 'Active' },
  ];

  const transferPrices = [
    { from: 'PC-001', to: 'PC-002', product: 'Component A', price: '€125.00', method: 'Cost Plus', validFrom: '2024-01-01' },
    { from: 'PC-003', to: 'PC-001', product: 'Service Package', price: '€850.00', method: 'Market Price', validFrom: '2024-01-01' },
    { from: 'PC-004', to: 'PC-005', product: 'Raw Material', price: '€45.50', method: 'Standard Cost', validFrom: '2024-01-01' },
    { from: 'PC-002', to: 'PC-003', product: 'Technology License', price: '€2,500.00', method: 'Negotiated', validFrom: '2024-01-01' },
  ];

  return (
    <div className="p-6 space-y-6">
      <PageHeader 
        title="Profit Center Accounting"
        description="Manage profit centers and internal profitability analysis"
        voiceIntroduction="Welcome to Profit Center Accounting. Track profitability by business segments and manage internal profit measurement."
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <p className="text-2xl font-bold">€14.4M</p>
                <p className="text-xs text-muted-foreground">Total Revenue</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <p className="text-2xl font-bold">€4.3M</p>
                <p className="text-xs text-muted-foreground">Total Profit</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <PieChart className="h-8 w-8 text-purple-600 mr-3" />
              <div>
                <p className="text-2xl font-bold">29.9%</p>
                <p className="text-xs text-muted-foreground">Avg Margin</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-orange-600 font-bold">5</span>
              </div>
              <div>
                <p className="text-2xl font-bold">5</p>
                <p className="text-xs text-muted-foreground">Active Profit Centers</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profitcenters">Profit Centers</TabsTrigger>
          <TabsTrigger value="planning">Profit Planning</TabsTrigger>
          <TabsTrigger value="transfers">Transfer Pricing</TabsTrigger>
          <TabsTrigger value="reporting">Profitability Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="profitcenters" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Profit Center Master</CardTitle>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Profit Center
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search profit centers..." className="pl-8" />
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Profit Center</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Manager</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead>Costs</TableHead>
                      <TableHead>Profit</TableHead>
                      <TableHead>Margin</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {profitCenters.map((pc) => (
                      <TableRow key={pc.id}>
                        <TableCell className="font-medium">{pc.id}</TableCell>
                        <TableCell>{pc.name}</TableCell>
                        <TableCell>{pc.manager}</TableCell>
                        <TableCell>{pc.revenue}</TableCell>
                        <TableCell>{pc.costs}</TableCell>
                        <TableCell className="text-green-600 font-medium">{pc.profit}</TableCell>
                        <TableCell>{pc.margin}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{pc.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">Analyze</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="planning" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Planning</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Plan revenue targets by profit center.
                </p>
                <Button className="w-full">Plan Revenue</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Cost Planning</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Allocate costs to profit centers.
                </p>
                <Button className="w-full">Plan Costs</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Profit Targets</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Set profitability targets and KPIs.
                </p>
                <Button className="w-full">Set Targets</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="transfers" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Transfer Pricing</CardTitle>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Transfer Price
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>From PC</TableHead>
                      <TableHead>To PC</TableHead>
                      <TableHead>Product/Service</TableHead>
                      <TableHead>Transfer Price</TableHead>
                      <TableHead>Pricing Method</TableHead>
                      <TableHead>Valid From</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transferPrices.map((tp, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{tp.from}</TableCell>
                        <TableCell>{tp.to}</TableCell>
                        <TableCell>{tp.product}</TableCell>
                        <TableCell>{tp.price}</TableCell>
                        <TableCell>{tp.method}</TableCell>
                        <TableCell>{tp.validFrom}</TableCell>
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
        </TabsContent>

        <TabsContent value="reporting" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Profitability Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Analyze profitability by segments and products.
                </p>
                <Button className="w-full">Generate Analysis</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Market Segment Reporting</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Report profitability by market segments.
                </p>
                <Button className="w-full">View Segments</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Product Line Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Analyze product line profitability.
                </p>
                <Button className="w-full">Analyze Products</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Transfer Price Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Review transfer pricing transactions.
                </p>
                <Button className="w-full">View Transfers</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfitCenterAccounting;

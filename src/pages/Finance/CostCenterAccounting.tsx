
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Search, Plus, TrendingUp, BarChart, Target } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Badge } from '../../components/ui/badge';
import PageHeader from '../../components/page/PageHeader';

const CostCenterAccounting: React.FC = () => {
  const [activeTab, setActiveTab] = useState('costcenters');

  const costCenters = [
    { id: 'CC-1000', name: 'Sales Department', manager: 'John Smith', budget: '€500,000', actual: '€425,000', variance: '-15%', status: 'Active' },
    { id: 'CC-2000', name: 'Marketing', manager: 'Sarah Johnson', budget: '€300,000', actual: '€320,000', variance: '+7%', status: 'Active' },
    { id: 'CC-3000', name: 'IT Operations', manager: 'Mike Wilson', budget: '€250,000', actual: '€245,000', variance: '-2%', status: 'Active' },
    { id: 'CC-4000', name: 'Human Resources', manager: 'Lisa Brown', budget: '€180,000', actual: '€175,000', variance: '-3%', status: 'Active' },
    { id: 'CC-5000', name: 'Finance', manager: 'David Lee', budget: '€220,000', actual: '€210,000', variance: '-5%', status: 'Active' },
  ];

  const allocations = [
    { source: 'CC-1000', target: 'CC-2000', type: 'Marketing Support', amount: '€15,000', period: '2024-05' },
    { source: 'CC-3000', target: 'CC-1000', type: 'IT Services', amount: '€8,500', period: '2024-05' },
    { source: 'CC-4000', target: 'CC-2000', type: 'HR Services', amount: '€12,000', period: '2024-05' },
    { source: 'CC-5000', target: 'CC-1000', type: 'Financial Services', amount: '€6,200', period: '2024-05' },
  ];

  return (
    <div className="p-6 space-y-6">
      <PageHeader 
        title="Cost Center Accounting"
        description="Manage cost centers, budgets, and cost allocations"
        voiceIntroduction="Welcome to Cost Center Accounting. Manage your organization's cost centers, track budgets, and handle cost allocations."
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Target className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <p className="text-2xl font-bold">€1.45M</p>
                <p className="text-xs text-muted-foreground">Total Budget</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <p className="text-2xl font-bold">€1.375M</p>
                <p className="text-xs text-muted-foreground">Actual Spend</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <BarChart className="h-8 w-8 text-purple-600 mr-3" />
              <div>
                <p className="text-2xl font-bold">-5.2%</p>
                <p className="text-xs text-muted-foreground">Budget Variance</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-orange-600 font-bold">15</span>
              </div>
              <div>
                <p className="text-2xl font-bold">15</p>
                <p className="text-xs text-muted-foreground">Active Cost Centers</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="costcenters">Cost Centers</TabsTrigger>
          <TabsTrigger value="planning">Budget Planning</TabsTrigger>
          <TabsTrigger value="allocations">Cost Allocations</TabsTrigger>
          <TabsTrigger value="reporting">Reporting</TabsTrigger>
        </TabsList>

        <TabsContent value="costcenters" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Cost Center Master</CardTitle>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Cost Center
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search cost centers..." className="pl-8" />
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Cost Center</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Manager</TableHead>
                      <TableHead>Budget</TableHead>
                      <TableHead>Actual</TableHead>
                      <TableHead>Variance</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {costCenters.map((cc) => (
                      <TableRow key={cc.id}>
                        <TableCell className="font-medium">{cc.id}</TableCell>
                        <TableCell>{cc.name}</TableCell>
                        <TableCell>{cc.manager}</TableCell>
                        <TableCell>{cc.budget}</TableCell>
                        <TableCell>{cc.actual}</TableCell>
                        <TableCell>
                          <span className={cc.variance.startsWith('-') ? 'text-green-600' : 'text-red-600'}>
                            {cc.variance}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{cc.status}</Badge>
                        </TableCell>
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

        <TabsContent value="planning" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Budget Creation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Create annual budgets for cost centers.
                </p>
                <Button className="w-full">Create Budget</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Budget Revision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Revise existing budgets during the year.
                </p>
                <Button className="w-full">Revise Budget</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Forecast Planning</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Create rolling forecasts for better planning.
                </p>
                <Button className="w-full">Create Forecast</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="allocations" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Cost Allocations</CardTitle>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Allocation
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Source</TableHead>
                      <TableHead>Target</TableHead>
                      <TableHead>Allocation Type</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Period</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {allocations.map((allocation, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{allocation.source}</TableCell>
                        <TableCell>{allocation.target}</TableCell>
                        <TableCell>{allocation.type}</TableCell>
                        <TableCell>{allocation.amount}</TableCell>
                        <TableCell>{allocation.period}</TableCell>
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
                <CardTitle>Budget vs Actual</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Compare budget performance across cost centers.
                </p>
                <Button className="w-full">Generate Report</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Cost Center Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Detailed cost center performance analysis.
                </p>
                <Button className="w-full">View Analysis</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Variance Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Analyze budget variances and trends.
                </p>
                <Button className="w-full">View Variances</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Allocation Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Review cost allocation patterns.
                </p>
                <Button className="w-full">View Allocations</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CostCenterAccounting;

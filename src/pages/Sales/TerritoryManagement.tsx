
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Search, Plus, MapPin, Users, Target, TrendingUp } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Badge } from '../../components/ui/badge';
import PageHeader from '../../components/page/PageHeader';

const TerritoryManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('territories');

  const territories = [
    { id: 'TERR-001', name: 'North Region', manager: 'John Smith', coverage: 'Hamburg, Bremen, Kiel', customers: 45, revenue: '€2.5M', quota: '€3M', achievement: '83%', status: 'Active' },
    { id: 'TERR-002', name: 'Central Region', manager: 'Sarah Johnson', coverage: 'Frankfurt, Cologne, Düsseldorf', customers: 52, revenue: '€3.2M', quota: '€3.5M', achievement: '91%', status: 'Active' },
    { id: 'TERR-003', name: 'South Region', manager: 'Mike Wilson', coverage: 'Munich, Stuttgart, Nuremberg', customers: 38, revenue: '€1.8M', quota: '€2.5M', achievement: '72%', status: 'Active' },
    { id: 'TERR-004', name: 'East Region', manager: 'Lisa Brown', coverage: 'Berlin, Dresden, Leipzig', customers: 34, revenue: '€2.1M', quota: '€2.8M', achievement: '75%', status: 'Active' },
    { id: 'TERR-005', name: 'West Region', manager: 'David Lee', coverage: 'Dortmund, Essen, Münster', customers: 41, revenue: '€2.3M', quota: '€2.9M', achievement: '79%', status: 'Active' },
  ];

  const assignments = [
    { salesRep: 'John Smith', territory: 'North Region', role: 'Territory Manager', startDate: '2024-01-01', customers: 45, quota: '€3M', status: 'Active' },
    { salesRep: 'Anna Mueller', territory: 'North Region', role: 'Sales Representative', startDate: '2024-02-15', customers: 18, quota: '€1.2M', status: 'Active' },
    { salesRep: 'Sarah Johnson', territory: 'Central Region', role: 'Territory Manager', startDate: '2023-06-01', customers: 52, quota: '€3.5M', status: 'Active' },
    { salesRep: 'Robert Brown', territory: 'Central Region', role: 'Sales Representative', startDate: '2024-03-01', customers: 22, quota: '€1.5M', status: 'Active' },
    { salesRep: 'Mike Wilson', territory: 'South Region', role: 'Territory Manager', startDate: '2023-08-15', customers: 38, quota: '€2.5M', status: 'Active' },
  ];

  const coverage = [
    { territory: 'North Region', totalAccounts: 120, covered: 45, uncovered: 75, coverageRate: '38%', opportunity: '€1.8M' },
    { territory: 'Central Region', totalAccounts: 135, covered: 52, uncovered: 83, coverageRate: '39%', opportunity: '€2.1M' },
    { territory: 'South Region', totalAccounts: 98, covered: 38, uncovered: 60, coverageRate: '39%', opportunity: '€1.5M' },
    { territory: 'East Region', totalAccounts: 87, covered: 34, uncovered: 53, coverageRate: '39%', opportunity: '€1.3M' },
    { territory: 'West Region', totalAccounts: 105, covered: 41, uncovered: 64, coverageRate: '39%', opportunity: '€1.6M' },
  ];

  return (
    <div className="p-6 space-y-6">
      <PageHeader 
        title="Territory Management"
        description="Manage sales territories, assignments, and coverage optimization"
        voiceIntroduction="Welcome to Territory Management. Organize sales territories, manage assignments, and optimize market coverage."
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <MapPin className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <p className="text-2xl font-bold">5</p>
                <p className="text-xs text-muted-foreground">Active Territories</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <p className="text-2xl font-bold">210</p>
                <p className="text-xs text-muted-foreground">Total Customers</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Target className="h-8 w-8 text-purple-600 mr-3" />
              <div>
                <p className="text-2xl font-bold">€14.7M</p>
                <p className="text-xs text-muted-foreground">Total Quota</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-orange-600 mr-3" />
              <div>
                <p className="text-2xl font-bold">80%</p>
                <p className="text-xs text-muted-foreground">Avg Achievement</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="territories">Territory Setup</TabsTrigger>
          <TabsTrigger value="assignments">Sales Assignments</TabsTrigger>
          <TabsTrigger value="coverage">Coverage Analysis</TabsTrigger>
          <TabsTrigger value="optimization">Territory Optimization</TabsTrigger>
        </TabsList>

        <TabsContent value="territories" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Sales Territories</CardTitle>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Territory
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search territories..." className="pl-8" />
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Territory ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Manager</TableHead>
                      <TableHead>Geographic Coverage</TableHead>
                      <TableHead>Customers</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead>Quota</TableHead>
                      <TableHead>Achievement</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {territories.map((territory) => (
                      <TableRow key={territory.id}>
                        <TableCell className="font-medium">{territory.id}</TableCell>
                        <TableCell>{territory.name}</TableCell>
                        <TableCell>{territory.manager}</TableCell>
                        <TableCell>{territory.coverage}</TableCell>
                        <TableCell>{territory.customers}</TableCell>
                        <TableCell>{territory.revenue}</TableCell>
                        <TableCell>{territory.quota}</TableCell>
                        <TableCell>
                          <Badge variant={
                            parseFloat(territory.achievement.replace('%', '')) >= 90 ? 'default' :
                            parseFloat(territory.achievement.replace('%', '')) >= 75 ? 'outline' : 'secondary'
                          }>
                            {territory.achievement}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{territory.status}</Badge>
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Geographic Boundaries</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Define geographic boundaries for territories.
                </p>
                <Button className="w-full">Manage Boundaries</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Account Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Distribute accounts across territories fairly.
                </p>
                <Button className="w-full">Distribute Accounts</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Territory Hierarchy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Setup territory hierarchy and reporting structure.
                </p>
                <Button className="w-full">Setup Hierarchy</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="assignments" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Sales Representative Assignments</CardTitle>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  New Assignment
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Sales Representative</TableHead>
                      <TableHead>Territory</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Start Date</TableHead>
                      <TableHead>Customers</TableHead>
                      <TableHead>Quota</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {assignments.map((assignment, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{assignment.salesRep}</TableCell>
                        <TableCell>{assignment.territory}</TableCell>
                        <TableCell>{assignment.role}</TableCell>
                        <TableCell>{assignment.startDate}</TableCell>
                        <TableCell>{assignment.customers}</TableCell>
                        <TableCell>{assignment.quota}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{assignment.status}</Badge>
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
                <CardTitle>Assignment Rules</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Configure automatic assignment rules and criteria.
                </p>
                <Button className="w-full">Setup Rules</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Workload Balancing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Balance workload across sales representatives.
                </p>
                <Button className="w-full">Balance Workload</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Performance Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Track performance by territory and assignment.
                </p>
                <Button className="w-full">View Performance</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="coverage" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Territory Coverage Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Territory</TableHead>
                      <TableHead>Total Accounts</TableHead>
                      <TableHead>Covered</TableHead>
                      <TableHead>Uncovered</TableHead>
                      <TableHead>Coverage Rate</TableHead>
                      <TableHead>Revenue Opportunity</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {coverage.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{item.territory}</TableCell>
                        <TableCell>{item.totalAccounts}</TableCell>
                        <TableCell className="text-green-600">{item.covered}</TableCell>
                        <TableCell className="text-red-600">{item.uncovered}</TableCell>
                        <TableCell>
                          <Badge variant={
                            parseFloat(item.coverageRate.replace('%', '')) >= 50 ? 'default' :
                            parseFloat(item.coverageRate.replace('%', '')) >= 30 ? 'outline' : 'secondary'
                          }>
                            {item.coverageRate}
                          </Badge>
                        </TableCell>
                        <TableCell>{item.opportunity}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">Improve</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Coverage Gaps</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Identify and address coverage gaps in territories.
                </p>
                <Button className="w-full">Analyze Gaps</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Market Penetration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Analyze market penetration by territory.
                </p>
                <Button className="w-full">View Penetration</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="optimization" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Territory Realignment</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Optimize territory boundaries based on performance data.
                </p>
                <Button className="w-full">Run Realignment</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Quota Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Optimize quota distribution across territories.
                </p>
                <Button className="w-full">Optimize Quotas</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Resource Allocation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Optimize resource allocation to maximize ROI.
                </p>
                <Button className="w-full">Allocate Resources</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Performance Simulation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Simulate territory changes and their impact.
                </p>
                <Button className="w-full">Run Simulation</Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Optimization Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Territory Rebalancing</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Consider realigning North and Central regions to balance workload better.
                  </p>
                  <Button size="sm">Review Recommendation</Button>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Coverage Improvement</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    East Region has untapped potential worth €1.3M in revenue opportunity.
                  </p>
                  <Button size="sm">Explore Opportunity</Button>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Resource Optimization</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Adding one sales rep to South Region could increase coverage by 15%.
                  </p>
                  <Button size="sm">View Analysis</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TerritoryManagement;

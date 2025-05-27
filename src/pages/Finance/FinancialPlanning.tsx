
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Search, Plus, TrendingUp, Calculator, Target, Calendar } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Badge } from '../../components/ui/badge';
import PageHeader from '../../components/page/PageHeader';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';

const FinancialPlanning: React.FC = () => {
  const [activeTab, setActiveTab] = useState('budgets');

  const budgets = [
    { id: 'BGT-2025', name: 'Annual Budget 2025', status: 'Draft', version: '1.0', owner: 'Finance Team', lastModified: '2024-05-20', amount: '€15.2M' },
    { id: 'BGT-2024', name: 'Annual Budget 2024', status: 'Approved', version: '3.2', owner: 'Finance Team', lastModified: '2024-12-15', amount: '€14.8M' },
    { id: 'FCT-Q3-24', name: 'Q3 2024 Forecast', status: 'Active', version: '2.1', owner: 'Planning Team', lastModified: '2024-05-18', amount: '€3.7M' },
    { id: 'FCT-Q4-24', name: 'Q4 2024 Forecast', status: 'Review', version: '1.5', owner: 'Planning Team', lastModified: '2024-05-15', amount: '€4.1M' },
  ];

  const scenarios = [
    { name: 'Best Case', probability: '15%', revenue: '€16.8M', costs: '€12.1M', profit: '€4.7M', roi: '32%' },
    { name: 'Most Likely', probability: '60%', revenue: '€15.2M', costs: '€11.4M', profit: '€3.8M', roi: '28%' },
    { name: 'Worst Case', probability: '25%', revenue: '€13.5M', costs: '€11.0M', profit: '€2.5M', roi: '19%' },
  ];

  const kpis = [
    { name: 'Revenue Growth', target: '12%', actual: '8.5%', variance: '-3.5%', trend: 'down' },
    { name: 'EBITDA Margin', target: '25%', actual: '27.2%', variance: '+2.2%', trend: 'up' },
    { name: 'Cash Flow', target: '€2.5M', actual: '€2.8M', variance: '+€0.3M', trend: 'up' },
    { name: 'ROI', target: '18%', actual: '21.5%', variance: '+3.5%', trend: 'up' },
  ];

  return (
    <div className="p-6 space-y-6">
      <PageHeader 
        title="Financial Planning"
        description="Budget planning, forecasting, and scenario analysis"
        voiceIntroduction="Welcome to Financial Planning. Create budgets, forecasts, and perform scenario analysis for strategic planning."
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Target className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <p className="text-2xl font-bold">€15.2M</p>
                <p className="text-xs text-muted-foreground">2025 Budget</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <p className="text-2xl font-bold">€14.1M</p>
                <p className="text-xs text-muted-foreground">Current Forecast</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Calculator className="h-8 w-8 text-purple-600 mr-3" />
              <div>
                <p className="text-2xl font-bold">7.2%</p>
                <p className="text-xs text-muted-foreground">Budget Variance</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-orange-600 mr-3" />
              <div>
                <p className="text-2xl font-bold">Q3</p>
                <p className="text-xs text-muted-foreground">Planning Cycle</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="budgets">Budget Management</TabsTrigger>
          <TabsTrigger value="forecasting">Forecasting</TabsTrigger>
          <TabsTrigger value="scenarios">Scenario Planning</TabsTrigger>
          <TabsTrigger value="kpis">KPI Tracking</TabsTrigger>
        </TabsList>

        <TabsContent value="budgets" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Budget Plans</CardTitle>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Budget
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4 mb-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search budgets..." className="pl-8" />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="review">Under Review</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Budget ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Version</TableHead>
                      <TableHead>Owner</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Last Modified</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {budgets.map((budget) => (
                      <TableRow key={budget.id}>
                        <TableCell className="font-medium">{budget.id}</TableCell>
                        <TableCell>{budget.name}</TableCell>
                        <TableCell>
                          <Badge variant={
                            budget.status === 'Approved' ? 'outline' :
                            budget.status === 'Active' ? 'default' :
                            budget.status === 'Review' ? 'secondary' : 'outline'
                          }>
                            {budget.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{budget.version}</TableCell>
                        <TableCell>{budget.owner}</TableCell>
                        <TableCell>{budget.amount}</TableCell>
                        <TableCell>{budget.lastModified}</TableCell>
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

        <TabsContent value="forecasting" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Rolling Forecasts</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Create and maintain rolling 12-month forecasts.
                </p>
                <Button className="w-full">Create Forecast</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Driver-Based Planning</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Build forecasts based on business drivers.
                </p>
                <Button className="w-full">Configure Drivers</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Demand Planning</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Forecast customer demand and revenue.
                </p>
                <Button className="w-full">Plan Demand</Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Forecast Accuracy</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">92%</p>
                  <p className="text-sm text-muted-foreground">Revenue Accuracy</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">88%</p>
                  <p className="text-sm text-muted-foreground">Cost Accuracy</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">90%</p>
                  <p className="text-sm text-muted-foreground">Overall Accuracy</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scenarios" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Scenario Analysis</CardTitle>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Scenario
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Scenario</TableHead>
                      <TableHead>Probability</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead>Costs</TableHead>
                      <TableHead>Profit</TableHead>
                      <TableHead>ROI</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {scenarios.map((scenario, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{scenario.name}</TableCell>
                        <TableCell>{scenario.probability}</TableCell>
                        <TableCell>{scenario.revenue}</TableCell>
                        <TableCell>{scenario.costs}</TableCell>
                        <TableCell className="text-green-600">{scenario.profit}</TableCell>
                        <TableCell>{scenario.roi}</TableCell>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Sensitivity Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Analyze how changes in key variables affect outcomes.
                </p>
                <Button className="w-full">Run Sensitivity Analysis</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Monte Carlo Simulation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Run probabilistic simulations for risk assessment.
                </p>
                <Button className="w-full">Run Simulation</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="kpis" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Key Performance Indicators</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>KPI</TableHead>
                      <TableHead>Target</TableHead>
                      <TableHead>Actual</TableHead>
                      <TableHead>Variance</TableHead>
                      <TableHead>Trend</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {kpis.map((kpi, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{kpi.name}</TableCell>
                        <TableCell>{kpi.target}</TableCell>
                        <TableCell>{kpi.actual}</TableCell>
                        <TableCell className={kpi.variance.startsWith('+') ? 'text-green-600' : 'text-red-600'}>
                          {kpi.variance}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <TrendingUp className={`h-4 w-4 ${kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'}`} />
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">Details</Button>
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
                <CardTitle>Performance Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Interactive dashboard with real-time KPIs.
                </p>
                <Button className="w-full">View Dashboard</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Balanced Scorecard</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Strategic performance measurement framework.
                </p>
                <Button className="w-full">View Scorecard</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FinancialPlanning;

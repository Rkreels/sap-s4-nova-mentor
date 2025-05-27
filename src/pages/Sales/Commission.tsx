
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Search, Plus, DollarSign, TrendingUp, Calculator, Users } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Badge } from '../../components/ui/badge';
import PageHeader from '../../components/page/PageHeader';

const Commission: React.FC = () => {
  const [activeTab, setActiveTab] = useState('structures');

  const commissionStructures = [
    { id: 'CS-001', name: 'Standard Sales Commission', type: 'Percentage', rate: '5%', applicableProducts: 'All Products', salesTeam: 'General Sales', status: 'Active' },
    { id: 'CS-002', name: 'High-Value Enterprise', type: 'Tiered', rate: '3-8%', applicableProducts: 'Enterprise Solutions', salesTeam: 'Enterprise Sales', status: 'Active' },
    { id: 'CS-003', name: 'New Product Launch', type: 'Bonus', rate: '10%', applicableProducts: 'Product Line A', salesTeam: 'Specialist Team', status: 'Active' },
    { id: 'CS-004', name: 'Channel Partner', type: 'Fixed Amount', rate: '€500', applicableProducts: 'Channel Products', salesTeam: 'Channel Sales', status: 'Active' },
  ];

  const salesReps = [
    { id: 'SR-001', name: 'John Smith', territory: 'North Region', ytdSales: '€2.5M', commissionEarned: '€125K', quota: '€3M', achievement: '83%', status: 'Active' },
    { id: 'SR-002', name: 'Sarah Johnson', territory: 'Central Region', ytdSales: '€3.2M', commissionEarned: '€160K', quota: '€3.5M', achievement: '91%', status: 'Active' },
    { id: 'SR-003', name: 'Mike Wilson', territory: 'South Region', ytdSales: '€1.8M', commissionEarned: '€90K', quota: '€2.5M', achievement: '72%', status: 'Active' },
    { id: 'SR-004', name: 'Lisa Brown', territory: 'Enterprise Accounts', ytdSales: '€4.1M', commissionEarned: '€205K', quota: '€4M', achievement: '103%', status: 'Active' },
  ];

  const payouts = [
    { period: '2024-Q2', salesRep: 'John Smith', salesAmount: '€850K', commissionRate: '5%', commissionAmount: '€42.5K', status: 'Processed', payDate: '2024-07-15' },
    { period: '2024-Q2', salesRep: 'Sarah Johnson', salesAmount: '€1.1M', commissionRate: '5%', commissionAmount: '€55K', status: 'Processed', payDate: '2024-07-15' },
    { period: '2024-Q2', salesRep: 'Mike Wilson', salesAmount: '€650K', commissionRate: '5%', commissionAmount: '€32.5K', status: 'Processed', payDate: '2024-07-15' },
    { period: '2024-Q3', salesRep: 'Lisa Brown', salesAmount: '€1.3M', commissionRate: '6%', commissionAmount: '€78K', status: 'Pending', payDate: '2024-10-15' },
  ];

  return (
    <div className="p-6 space-y-6">
      <PageHeader 
        title="Commission Management"
        description="Manage sales commission structures, calculations, and payouts"
        voiceIntroduction="Welcome to Commission Management. Configure commission structures, track sales performance, and manage commission payouts."
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <p className="text-2xl font-bold">€580K</p>
                <p className="text-xs text-muted-foreground">YTD Commission Paid</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <p className="text-2xl font-bold">€11.6M</p>
                <p className="text-xs text-muted-foreground">Commissionable Sales</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Calculator className="h-8 w-8 text-purple-600 mr-3" />
              <div>
                <p className="text-2xl font-bold">5.0%</p>
                <p className="text-xs text-muted-foreground">Avg Commission Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-orange-600 mr-3" />
              <div>
                <p className="text-2xl font-bold">24</p>
                <p className="text-xs text-muted-foreground">Active Sales Reps</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="structures">Commission Structures</TabsTrigger>
          <TabsTrigger value="performance">Sales Performance</TabsTrigger>
          <TabsTrigger value="calculations">Commission Calculations</TabsTrigger>
          <TabsTrigger value="payouts">Payouts</TabsTrigger>
        </TabsList>

        <TabsContent value="structures" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Commission Structures</CardTitle>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Structure
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Structure ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Rate</TableHead>
                      <TableHead>Applicable Products</TableHead>
                      <TableHead>Sales Team</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {commissionStructures.map((structure) => (
                      <TableRow key={structure.id}>
                        <TableCell className="font-medium">{structure.id}</TableCell>
                        <TableCell>{structure.name}</TableCell>
                        <TableCell>{structure.type}</TableCell>
                        <TableCell>{structure.rate}</TableCell>
                        <TableCell>{structure.applicableProducts}</TableCell>
                        <TableCell>{structure.salesTeam}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{structure.status}</Badge>
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
                <CardTitle>Percentage-Based</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Commission calculated as percentage of sales value.
                </p>
                <Button className="w-full">Configure Percentage</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Tiered Commission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Different rates based on sales volume tiers.
                </p>
                <Button className="w-full">Setup Tiers</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Bonus Structure</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Additional bonuses for specific achievements.
                </p>
                <Button className="w-full">Define Bonuses</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sales Representative Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search sales reps..." className="pl-8" />
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Rep ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Territory</TableHead>
                      <TableHead>YTD Sales</TableHead>
                      <TableHead>Commission Earned</TableHead>
                      <TableHead>Quota</TableHead>
                      <TableHead>Achievement</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {salesReps.map((rep) => (
                      <TableRow key={rep.id}>
                        <TableCell className="font-medium">{rep.id}</TableCell>
                        <TableCell>{rep.name}</TableCell>
                        <TableCell>{rep.territory}</TableCell>
                        <TableCell>{rep.ytdSales}</TableCell>
                        <TableCell className="text-green-600">{rep.commissionEarned}</TableCell>
                        <TableCell>{rep.quota}</TableCell>
                        <TableCell>
                          <Badge variant={
                            parseFloat(rep.achievement.replace('%', '')) >= 100 ? 'default' :
                            parseFloat(rep.achievement.replace('%', '')) >= 80 ? 'outline' : 'secondary'
                          }>
                            {rep.achievement}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{rep.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">View Details</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calculations" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Automatic Calculation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Automatically calculate commissions based on sales data.
                </p>
                <Button className="w-full">Run Calculation</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Manual Adjustments</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Make manual adjustments to commission calculations.
                </p>
                <Button className="w-full">Make Adjustments</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Calculation Rules</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Configure business rules for commission calculations.
                </p>
                <Button className="w-full">Setup Rules</Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Commission Calculation Engine</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Calculation Methods</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Sales value based</li>
                    <li>• Gross margin based</li>
                    <li>• Quantity based</li>
                    <li>• Hybrid calculations</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">Processing Schedule</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Real-time calculations</li>
                    <li>• Monthly batch processing</li>
                    <li>• Quarterly reconciliation</li>
                    <li>• Annual true-up</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payouts" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Commission Payouts</CardTitle>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Process Payouts
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Period</TableHead>
                      <TableHead>Sales Rep</TableHead>
                      <TableHead>Sales Amount</TableHead>
                      <TableHead>Commission Rate</TableHead>
                      <TableHead>Commission Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Pay Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payouts.map((payout, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{payout.period}</TableCell>
                        <TableCell>{payout.salesRep}</TableCell>
                        <TableCell>{payout.salesAmount}</TableCell>
                        <TableCell>{payout.commissionRate}</TableCell>
                        <TableCell className="text-green-600">{payout.commissionAmount}</TableCell>
                        <TableCell>
                          <Badge variant={payout.status === 'Processed' ? 'outline' : 'secondary'}>
                            {payout.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{payout.payDate}</TableCell>
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
                <CardTitle>Payout Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Configure commission payout schedules and timing.
                </p>
                <Button className="w-full">Configure Schedule</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Payment Integration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Integrate with payroll systems for automatic payments.
                </p>
                <Button className="w-full">Setup Integration</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Commission;

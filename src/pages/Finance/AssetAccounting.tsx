
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Search, Plus, FileText, Download, Calculator, Building } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Badge } from '../../components/ui/badge';
import PageHeader from '../../components/page/PageHeader';

const AssetAccounting: React.FC = () => {
  const [activeTab, setActiveTab] = useState('assets');

  const assets = [
    { id: 'AST-001', description: 'Server Equipment', class: 'IT Equipment', cost: '€25,000', acquiredDate: '2024-01-15', depreciation: '€5,000', bookValue: '€20,000', status: 'Active' },
    { id: 'AST-002', description: 'Office Building', class: 'Real Estate', cost: '€500,000', acquiredDate: '2023-06-01', depreciation: '€50,000', bookValue: '€450,000', status: 'Active' },
    { id: 'AST-003', description: 'Manufacturing Equipment', class: 'Machinery', cost: '€150,000', acquiredDate: '2024-03-10', depreciation: '€15,000', bookValue: '€135,000', status: 'Active' },
    { id: 'AST-004', description: 'Vehicle Fleet', class: 'Transportation', cost: '€80,000', acquiredDate: '2024-02-20', depreciation: '€12,000', bookValue: '€68,000', status: 'Active' },
    { id: 'AST-005', description: 'Software Licenses', class: 'Intangible', cost: '€30,000', acquiredDate: '2024-04-01', depreciation: '€6,000', bookValue: '€24,000', status: 'Active' },
  ];

  const depreciationRuns = [
    { period: '2024-05', status: 'Completed', assets: 125, amount: '€45,600', date: '2024-05-31' },
    { period: '2024-04', status: 'Completed', assets: 123, amount: '€44,200', date: '2024-04-30' },
    { period: '2024-03', status: 'Completed', assets: 120, amount: '€43,800', date: '2024-03-31' },
    { period: '2024-02', status: 'Completed', assets: 118, amount: '€42,900', date: '2024-02-29' },
  ];

  return (
    <div className="p-6 space-y-6">
      <PageHeader 
        title="Asset Accounting"
        description="Manage fixed assets, depreciation, and asset lifecycle"
        voiceIntroduction="Welcome to Asset Accounting. Manage your organization's fixed assets, track depreciation, and handle asset lifecycle processes."
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Building className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <p className="text-2xl font-bold">€1.2M</p>
                <p className="text-xs text-muted-foreground">Total Asset Value</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Calculator className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <p className="text-2xl font-bold">€156K</p>
                <p className="text-xs text-muted-foreground">YTD Depreciation</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-purple-600 mr-3" />
              <div>
                <p className="text-2xl font-bold">125</p>
                <p className="text-xs text-muted-foreground">Active Assets</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-orange-600 font-bold">12</span>
              </div>
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-xs text-muted-foreground">Pending Retirements</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="assets">Asset Master</TabsTrigger>
          <TabsTrigger value="depreciation">Depreciation</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="assets" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Asset Master Data</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Asset
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search assets..." className="pl-8" />
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Asset ID</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Asset Class</TableHead>
                      <TableHead>Acquisition Cost</TableHead>
                      <TableHead>Acquired Date</TableHead>
                      <TableHead>Depreciation</TableHead>
                      <TableHead>Book Value</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {assets.map((asset) => (
                      <TableRow key={asset.id}>
                        <TableCell className="font-medium">{asset.id}</TableCell>
                        <TableCell>{asset.description}</TableCell>
                        <TableCell>{asset.class}</TableCell>
                        <TableCell>{asset.cost}</TableCell>
                        <TableCell>{asset.acquiredDate}</TableCell>
                        <TableCell>{asset.depreciation}</TableCell>
                        <TableCell>{asset.bookValue}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{asset.status}</Badge>
                        </TableCell>
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

        <TabsContent value="depreciation" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Depreciation Management</CardTitle>
                <Button size="sm">
                  <Calculator className="h-4 w-4 mr-2" />
                  Run Depreciation
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Period</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Assets Processed</TableHead>
                      <TableHead>Depreciation Amount</TableHead>
                      <TableHead>Run Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {depreciationRuns.map((run, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{run.period}</TableCell>
                        <TableCell>
                          <Badge variant={run.status === 'Completed' ? 'outline' : 'secondary'}>
                            {run.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{run.assets}</TableCell>
                        <TableCell>{run.amount}</TableCell>
                        <TableCell>{run.date}</TableCell>
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
        </TabsContent>

        <TabsContent value="transactions" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Asset Acquisitions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Process new asset acquisitions and initial recognition.
                </p>
                <Button className="w-full">Create Acquisition</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Asset Transfers</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Transfer assets between cost centers or companies.
                </p>
                <Button className="w-full">Create Transfer</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Asset Retirements</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Process asset disposals and retirements.
                </p>
                <Button className="w-full">Create Retirement</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Asset Balance Sheet</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Generate balance sheet asset reports.
                </p>
                <Button className="w-full">Generate Report</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Depreciation Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  View depreciation schedules and forecasts.
                </p>
                <Button className="w-full">View Reports</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Asset Utilization</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Analyze asset utilization and performance.
                </p>
                <Button className="w-full">View Analysis</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Tax Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Generate tax depreciation reports.
                </p>
                <Button className="w-full">Generate Tax Reports</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AssetAccounting;

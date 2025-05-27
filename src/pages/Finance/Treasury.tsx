
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Search, Plus, Wallet, CreditCard, TrendingUp, AlertTriangle } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Badge } from '../../components/ui/badge';
import PageHeader from '../../components/page/PageHeader';

const Treasury: React.FC = () => {
  const [activeTab, setActiveTab] = useState('liquidity');

  const liquidityData = [
    { date: '2024-05-27', opening: '€2.5M', inflows: '€450K', outflows: '€380K', closing: '€2.57M', position: 'Optimal' },
    { date: '2024-05-28', opening: '€2.57M', inflows: '€320K', outflows: '€420K', closing: '€2.47M', position: 'Good' },
    { date: '2024-05-29', opening: '€2.47M', inflows: '€280K', outflows: '€350K', closing: '€2.40M', position: 'Good' },
    { date: '2024-05-30', opening: '€2.40M', inflows: '€520K', outflows: '€290K', closing: '€2.63M', position: 'Optimal' },
  ];

  const investments = [
    { id: 'INV-001', type: 'Money Market Fund', amount: '€500K', rate: '3.5%', maturity: '2024-08-15', risk: 'Low' },
    { id: 'INV-002', type: 'Corporate Bond', amount: '€1M', rate: '4.2%', maturity: '2025-12-31', risk: 'Medium' },
    { id: 'INV-003', type: 'Treasury Bill', amount: '€750K', rate: '3.8%', maturity: '2024-11-30', risk: 'Low' },
    { id: 'INV-004', type: 'Certificate of Deposit', amount: '€300K', rate: '3.9%', maturity: '2024-09-20', risk: 'Low' },
  ];

  const riskMetrics = [
    { metric: 'Value at Risk (95%)', value: '€125K', limit: '€200K', status: 'Good' },
    { metric: 'Credit Risk Exposure', value: '€2.3M', limit: '€3M', status: 'Good' },
    { metric: 'Liquidity Ratio', value: '1.8', limit: '1.2', status: 'Optimal' },
    { metric: 'Interest Rate Duration', value: '2.4 years', limit: '3 years', status: 'Good' },
  ];

  const cashPositions = [
    { bank: 'Deutsche Bank', account: 'DE89 1234 5678 9012 3456', currency: 'EUR', balance: '€1.2M', status: 'Active' },
    { bank: 'JP Morgan Chase', account: 'US64 NWBK 6016 1331 9268', currency: 'USD', balance: '$850K', status: 'Active' },
    { bank: 'HSBC', account: 'GB29 NWBK 6016 1331 9268', currency: 'GBP', balance: '£320K', status: 'Active' },
    { bank: 'Credit Suisse', account: 'CH93 0076 2011 6238 5295', currency: 'CHF', balance: 'CHF 180K', status: 'Active' },
  ];

  return (
    <div className="p-6 space-y-6">
      <PageHeader 
        title="Treasury Management"
        description="Cash management, investments, and financial risk management"
        voiceIntroduction="Welcome to Treasury Management. Manage cash positions, investments, and financial risks across your organization."
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Wallet className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <p className="text-2xl font-bold">€4.2M</p>
                <p className="text-xs text-muted-foreground">Total Cash Position</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <p className="text-2xl font-bold">€2.55M</p>
                <p className="text-xs text-muted-foreground">Investments</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <CreditCard className="h-8 w-8 text-purple-600 mr-3" />
              <div>
                <p className="text-2xl font-bold">3.9%</p>
                <p className="text-xs text-muted-foreground">Avg Investment Yield</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <AlertTriangle className="h-8 w-8 text-orange-600 mr-3" />
              <div>
                <p className="text-2xl font-bold">€125K</p>
                <p className="text-xs text-muted-foreground">Risk Exposure (VaR)</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="liquidity">Liquidity Management</TabsTrigger>
          <TabsTrigger value="investments">Investments</TabsTrigger>
          <TabsTrigger value="risk">Risk Management</TabsTrigger>
          <TabsTrigger value="positions">Cash Positions</TabsTrigger>
        </TabsList>

        <TabsContent value="liquidity" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Daily Liquidity Position</CardTitle>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Cash Forecast
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Opening Balance</TableHead>
                      <TableHead>Inflows</TableHead>
                      <TableHead>Outflows</TableHead>
                      <TableHead>Closing Balance</TableHead>
                      <TableHead>Position</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {liquidityData.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{item.date}</TableCell>
                        <TableCell>{item.opening}</TableCell>
                        <TableCell className="text-green-600">{item.inflows}</TableCell>
                        <TableCell className="text-red-600">{item.outflows}</TableCell>
                        <TableCell className="font-medium">{item.closing}</TableCell>
                        <TableCell>
                          <Badge variant={item.position === 'Optimal' ? 'default' : 'secondary'}>
                            {item.position}
                          </Badge>
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
                <CardTitle>Cash Flow Forecasting</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Create rolling cash flow forecasts up to 13 weeks.
                </p>
                <Button className="w-full">Create Forecast</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Liquidity Planning</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Plan optimal liquidity levels and credit facilities.
                </p>
                <Button className="w-full">Plan Liquidity</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Cash Pooling</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Optimize cash across subsidiaries and accounts.
                </p>
                <Button className="w-full">Manage Pooling</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="investments" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Investment Portfolio</CardTitle>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  New Investment
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Investment ID</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Interest Rate</TableHead>
                      <TableHead>Maturity Date</TableHead>
                      <TableHead>Risk Level</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {investments.map((investment) => (
                      <TableRow key={investment.id}>
                        <TableCell className="font-medium">{investment.id}</TableCell>
                        <TableCell>{investment.type}</TableCell>
                        <TableCell>{investment.amount}</TableCell>
                        <TableCell>{investment.rate}</TableCell>
                        <TableCell>{investment.maturity}</TableCell>
                        <TableCell>
                          <Badge variant={investment.risk === 'Low' ? 'outline' : 'secondary'}>
                            {investment.risk}
                          </Badge>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Investment Strategy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Define investment policies and risk tolerance.
                </p>
                <Button className="w-full">Set Strategy</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Performance Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Analyze investment performance and returns.
                </p>
                <Button className="w-full">View Analytics</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="risk" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Risk Metrics Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Risk Metric</TableHead>
                      <TableHead>Current Value</TableHead>
                      <TableHead>Risk Limit</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {riskMetrics.map((metric, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{metric.metric}</TableCell>
                        <TableCell>{metric.value}</TableCell>
                        <TableCell>{metric.limit}</TableCell>
                        <TableCell>
                          <Badge variant={metric.status === 'Optimal' ? 'default' : 'outline'}>
                            {metric.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">Monitor</Button>
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
                <CardTitle>Interest Rate Risk</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Monitor and hedge interest rate exposures.
                </p>
                <Button className="w-full">Manage IR Risk</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Currency Risk</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Track and hedge foreign exchange exposures.
                </p>
                <Button className="w-full">Manage FX Risk</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Credit Risk</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Monitor counterparty and credit exposures.
                </p>
                <Button className="w-full">Manage Credit Risk</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="positions" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Bank Account Positions</CardTitle>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Account
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Bank</TableHead>
                      <TableHead>Account Number</TableHead>
                      <TableHead>Currency</TableHead>
                      <TableHead>Balance</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cashPositions.map((position, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{position.bank}</TableCell>
                        <TableCell>{position.account}</TableCell>
                        <TableCell>{position.currency}</TableCell>
                        <TableCell className="font-medium">{position.balance}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{position.status}</Badge>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Multi-Currency Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Manage positions across multiple currencies.
                </p>
                <Button className="w-full">Manage Currencies</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Bank Relationship Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Manage banking relationships and agreements.
                </p>
                <Button className="w-full">Manage Banks</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Treasury;

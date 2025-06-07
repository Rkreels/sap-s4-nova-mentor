import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Input } from '../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { ArrowLeft, Plus, Edit, Trash2, Eye, Download, TrendingUp, TrendingDown, Shield, Globe, AlertTriangle, BarChart3 } from 'lucide-react';
import PageHeader from '../../components/page/PageHeader';
import DataTable, { Column } from '../../components/data/DataTable';
import { Badge } from '../../components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../components/ui/form';
import { useForm } from 'react-hook-form';

const Treasury: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('positions');
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const form = useForm({
    defaultValues: {
      currency: '',
      amount: '',
      dealType: '',
      counterparty: '',
      rate: '',
      maturityDate: ''
    }
  });

  const [fxPositions, setFxPositions] = useState([
    { id: 'FX-001', currency: 'USD/EUR', position: '1,250,000', spotRate: '0.8542', unrealizedPnL: '+12,450', exposure: 'Long USD', hedgeRatio: '85%', maturity: '2024-06-15', status: 'Active' },
    { id: 'FX-002', currency: 'GBP/EUR', position: '780,000', spotRate: '1.1684', unrealizedPnL: '-8,720', exposure: 'Short GBP', hedgeRatio: '72%', maturity: '2024-07-20', status: 'Active' },
    { id: 'FX-003', currency: 'JPY/EUR', position: '85,000,000', spotRate: '0.0064', unrealizedPnL: '+5,680', exposure: 'Long JPY', hedgeRatio: '90%', maturity: '2024-08-10', status: 'Active' },
    { id: 'FX-004', currency: 'CHF/EUR', position: '450,000', spotRate: '0.9234', unrealizedPnL: '+3,210', exposure: 'Long CHF', hedgeRatio: '65%', maturity: '2024-06-30', status: 'Maturing Soon' }
  ]);

  const [derivatives, setDerivatives] = useState([
    { id: 'DER-001', instrument: 'Interest Rate Swap', notional: '10,000,000', currency: 'EUR', rate: '3.25%', maturity: '2027-05-20', counterparty: 'Goldman Sachs', mtm: '+45,670', status: 'Active' },
    { id: 'DER-002', instrument: 'FX Forward', notional: '2,500,000', currency: 'USD', rate: '0.8550', maturity: '2024-09-15', counterparty: 'JP Morgan', mtm: '-12,340', status: 'Active' },
    { id: 'DER-003', instrument: 'Currency Swap', notional: '5,000,000', currency: 'GBP', rate: '1.1700', maturity: '2025-12-01', counterparty: 'Barclays', mtm: '+23,890', status: 'Active' },
    { id: 'DER-004', instrument: 'Credit Default Swap', notional: '1,000,000', currency: 'EUR', rate: '150 bps', maturity: '2026-03-15', counterparty: 'Deutsche Bank', mtm: '+8,450', status: 'Monitoring' }
  ]);

  const [riskMetrics, setRiskMetrics] = useState([
    { metric: 'Value at Risk (1-day, 95%)', current: '€125,000', limit: '€150,000', utilization: '83%', trend: 'stable', status: 'Within Limit' },
    { metric: 'Expected Shortfall', current: '€198,500', limit: '€250,000', utilization: '79%', trend: 'down', status: 'Within Limit' },
    { metric: 'Currency Exposure', current: '€8,450,000', limit: '€10,000,000', utilization: '85%', trend: 'up', status: 'Watch' },
    { metric: 'Interest Rate Duration', current: '2.45 years', limit: '3.0 years', utilization: '82%', trend: 'stable', status: 'Within Limit' },
    { metric: 'Credit Exposure', current: '€2,340,000', limit: '€3,000,000', utilization: '78%', trend: 'down', status: 'Within Limit' },
    { metric: 'Liquidity Ratio', current: '1.85', limit: '1.20', utilization: '154%', trend: 'up', status: 'Excellent' }
  ]);

  const [marketData, setMarketData] = useState([
    { pair: 'EUR/USD', rate: '1.0892', change: '+0.0012', changePercent: '+0.11%', bid: '1.0890', ask: '1.0894', trend: 'up' },
    { pair: 'GBP/USD', rate: '1.2734', change: '-0.0023', changePercent: '-0.18%', bid: '1.2732', ask: '1.2736', trend: 'down' },
    { pair: 'USD/JPY', rate: '156.24', change: '+0.45', changePercent: '+0.29%', bid: '156.22', ask: '156.26', trend: 'up' },
    { pair: 'EUR/GBP', rate: '0.8553', change: '+0.0008', changePercent: '+0.09%', bid: '0.8551', ask: '0.8555', trend: 'up' },
    { pair: 'USD/CHF', rate: '0.9123', change: '-0.0015', changePercent: '-0.16%', bid: '0.9121', ask: '0.9125', trend: 'down' },
    { pair: 'AUD/USD', rate: '0.6587', change: '+0.0034', changePercent: '+0.52%', bid: '0.6585', ask: '0.6589', trend: 'up' }
  ]);

  const handleCreate = (data: any) => {
    const newPosition = {
      id: `FX-${String(fxPositions.length + 1).padStart(3, '0')}`,
      ...data,
      status: 'Active'
    };
    setFxPositions([...fxPositions, newPosition]);
    setIsCreateDialogOpen(false);
    form.reset();
  };

  const handleEdit = (position: any) => {
    setSelectedPosition(position);
    form.reset(position);
    setIsEditDialogOpen(true);
  };

  const handleUpdate = (data: any) => {
    setFxPositions(fxPositions.map(p => p.id === selectedPosition?.id ? { ...p, ...data } : p));
    setIsEditDialogOpen(false);
    setSelectedPosition(null);
  };

  const handleDelete = (id: string) => {
    setFxPositions(fxPositions.filter(p => p.id !== id));
  };

  const fxColumns: Column[] = [
    { key: 'id', header: 'Position ID' },
    { key: 'currency', header: 'Currency Pair' },
    { 
      key: 'position', 
      header: 'Position Size',
      render: (value) => (
        <span className="font-semibold">{value}</span>
      )
    },
    { key: 'spotRate', header: 'Spot Rate' },
    { 
      key: 'unrealizedPnL', 
      header: 'Unrealized P&L',
      render: (value) => (
        <span className={`font-semibold ${value.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
          €{value}
        </span>
      )
    },
    { key: 'exposure', header: 'Exposure' },
    { key: 'hedgeRatio', header: 'Hedge Ratio' },
    { key: 'maturity', header: 'Maturity' },
    { 
      key: 'status', 
      header: 'Status',
      render: (value) => (
        <Badge variant={value === 'Active' ? 'default' : 'secondary'}>{value}</Badge>
      )
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (_, row) => (
        <div className="flex space-x-1">
          <Button variant="ghost" size="sm"><Eye className="h-4 w-4" /></Button>
          <Button variant="ghost" size="sm" onClick={() => handleEdit(row)}><Edit className="h-4 w-4" /></Button>
          <Button variant="ghost" size="sm" onClick={() => handleDelete(row.id)}><Trash2 className="h-4 w-4" /></Button>
        </div>
      )
    }
  ];

  const derivativesColumns: Column[] = [
    { key: 'id', header: 'Deal ID' },
    { key: 'instrument', header: 'Instrument' },
    { 
      key: 'notional', 
      header: 'Notional',
      render: (value, row) => (
        <span className="font-semibold">{row.currency} {value}</span>
      )
    },
    { key: 'rate', header: 'Rate' },
    { key: 'maturity', header: 'Maturity' },
    { key: 'counterparty', header: 'Counterparty' },
    { 
      key: 'mtm', 
      header: 'Mark-to-Market',
      render: (value) => (
        <span className={`font-semibold ${value.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
          €{value}
        </span>
      )
    },
    { 
      key: 'status', 
      header: 'Status',
      render: (value) => (
        <Badge variant={value === 'Active' ? 'default' : 'secondary'}>{value}</Badge>
      )
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (_, row) => (
        <div className="flex space-x-1">
          <Button variant="ghost" size="sm"><Eye className="h-4 w-4" /></Button>
          <Button variant="ghost" size="sm"><Edit className="h-4 w-4" /></Button>
          <Button variant="ghost" size="sm"><Trash2 className="h-4 w-4" /></Button>
        </div>
      )
    }
  ];

  const marketDataColumns: Column[] = [
    { key: 'pair', header: 'Currency Pair' },
    { key: 'rate', header: 'Rate' },
    { 
      key: 'change', 
      header: 'Change',
      render: (value, row) => (
        <span className={`font-semibold ${value.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
          {value} ({row.changePercent})
        </span>
      )
    },
    { key: 'bid', header: 'Bid' },
    { key: 'ask', header: 'Ask' },
    { 
      key: 'trend', 
      header: 'Trend',
      render: (value) => (
        value === 'up' ? (
          <TrendingUp className="h-4 w-4 text-green-600" />
        ) : (
          <TrendingDown className="h-4 w-4 text-red-600" />
        )
      )
    }
  ];

  const totalFxExposure = fxPositions.reduce((sum, pos) => {
    const position = parseFloat(pos.position.replace(/,/g, ''));
    return sum + position;
  }, 0);

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex items-center mb-4">
        <Button 
          variant="outline" 
          size="sm" 
          className="mr-4"
          onClick={() => navigate('/finance')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back
        </Button>
        <PageHeader
          title="Treasury Management"
          description="Manage FX positions, derivatives, and financial risk"
          voiceIntroduction="Welcome to Treasury Management. Monitor foreign exchange positions, derivatives portfolio, and manage financial risk exposure."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Globe className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <p className="text-2xl font-bold">€{(totalFxExposure / 1000000).toFixed(1)}M</p>
                <p className="text-xs text-muted-foreground">FX Exposure</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <BarChart3 className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <p className="text-2xl font-bold">€125K</p>
                <p className="text-xs text-muted-foreground">Daily VaR</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-purple-600 mr-3" />
              <div>
                <p className="text-2xl font-bold">78%</p>
                <p className="text-xs text-muted-foreground">Hedge Ratio</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-orange-600 mr-3" />
              <div>
                <p className="text-2xl font-bold">+€41K</p>
                <p className="text-xs text-muted-foreground">Total MTM P&L</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="positions">FX Positions</TabsTrigger>
          <TabsTrigger value="derivatives">Derivatives</TabsTrigger>
          <TabsTrigger value="risk">Risk Management</TabsTrigger>
          <TabsTrigger value="market">Market Data</TabsTrigger>
          <TabsTrigger value="reporting">Treasury Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="positions" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Foreign Exchange Positions</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                  <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                    <DialogTrigger asChild>
                      <Button size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        New Position
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Create FX Position</DialogTitle>
                      </DialogHeader>
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleCreate)} className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="currency"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Currency Pair</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select pair" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="USD/EUR">USD/EUR</SelectItem>
                                      <SelectItem value="GBP/EUR">GBP/EUR</SelectItem>
                                      <SelectItem value="JPY/EUR">JPY/EUR</SelectItem>
                                      <SelectItem value="CHF/EUR">CHF/EUR</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="amount"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Amount</FormLabel>
                                  <FormControl>
                                    <Input {...field} type="number" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="dealType"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Deal Type</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select type" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="Spot">Spot</SelectItem>
                                      <SelectItem value="Forward">Forward</SelectItem>
                                      <SelectItem value="Swap">Swap</SelectItem>
                                      <SelectItem value="Option">Option</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="rate"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Exchange Rate</FormLabel>
                                  <FormControl>
                                    <Input {...field} type="number" step="0.0001" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <FormField
                            control={form.control}
                            name="counterparty"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Counterparty</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select counterparty" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="Goldman Sachs">Goldman Sachs</SelectItem>
                                    <SelectItem value="JP Morgan">JP Morgan</SelectItem>
                                    <SelectItem value="Barclays">Barclays</SelectItem>
                                    <SelectItem value="Deutsche Bank">Deutsche Bank</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="maturityDate"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Maturity Date</FormLabel>
                                <FormControl>
                                  <Input {...field} type="date" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <div className="flex justify-end gap-2">
                            <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                              Cancel
                            </Button>
                            <Button type="submit">Create Position</Button>
                          </div>
                        </form>
                      </Form>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <DataTable columns={fxColumns} data={fxPositions} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="derivatives" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Derivatives Portfolio</CardTitle>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  New Derivative
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <DataTable columns={derivativesColumns} data={derivatives} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risk" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Risk Metrics & Limits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {riskMetrics.map((metric, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold text-sm">{metric.metric}</h4>
                      <Badge variant={
                        metric.status === 'Within Limit' ? 'default' : 
                        metric.status === 'Excellent' ? 'outline' : 
                        metric.status === 'Watch' ? 'secondary' : 'destructive'
                      }>
                        {metric.status}
                      </Badge>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Current: <span className="font-semibold">{metric.current}</span></span>
                      <span>Limit: <span className="font-semibold">{metric.limit}</span></span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Utilization: <span className="font-semibold">{metric.utilization}</span></span>
                      <div className="flex items-center">
                        {metric.trend === 'up' ? (
                          <TrendingUp className="h-4 w-4 text-green-600" />
                        ) : metric.trend === 'down' ? (
                          <TrendingDown className="h-4 w-4 text-red-600" />
                        ) : (
                          <div className="h-4 w-4 bg-gray-400 rounded-full" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="market" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Real-time Market Data</CardTitle>
                <Badge variant="outline" className="text-green-600">
                  Live
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <DataTable columns={marketDataColumns} data={marketData} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reporting" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Risk Report</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Comprehensive risk analysis and exposure reports.
                </p>
                <Button className="w-full">Generate Risk Report</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>P&L Report</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Mark-to-market and realized P&L analysis.
                </p>
                <Button className="w-full">Generate P&L Report</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Position Report</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Detailed position breakdown by currency and maturity.
                </p>
                <Button className="w-full">Generate Position Report</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Hedge Effectiveness</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Analysis of hedging strategy effectiveness.
                </p>
                <Button className="w-full">Generate Hedge Report</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit FX Position</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleUpdate)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="currency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Currency Pair</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select pair" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="USD/EUR">USD/EUR</SelectItem>
                          <SelectItem value="GBP/EUR">GBP/EUR</SelectItem>
                          <SelectItem value="JPY/EUR">JPY/EUR</SelectItem>
                          <SelectItem value="CHF/EUR">CHF/EUR</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="dealType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Deal Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Spot">Spot</SelectItem>
                          <SelectItem value="Forward">Forward</SelectItem>
                          <SelectItem value="Swap">Swap</SelectItem>
                          <SelectItem value="Option">Option</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="rate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Exchange Rate</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" step="0.0001" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="counterparty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Counterparty</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select counterparty" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Goldman Sachs">Goldman Sachs</SelectItem>
                        <SelectItem value="JP Morgan">JP Morgan</SelectItem>
                        <SelectItem value="Barclays">Barclays</SelectItem>
                        <SelectItem value="Deutsche Bank">Deutsche Bank</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="maturityDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Maturity Date</FormLabel>
                    <FormControl>
                      <Input {...field} type="date" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Update Position</Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Treasury;

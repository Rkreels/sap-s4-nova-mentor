import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Input } from '../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { ArrowLeft, Plus, Edit, Trash2, Eye, Download, TrendingUp, TrendingDown, DollarSign, Calendar, Target, AlertTriangle } from 'lucide-react';
import PageHeader from '../../components/page/PageHeader';
import DataTable, { Column } from '../../components/data/DataTable';
import { Badge } from '../../components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../components/ui/form';
import { useForm } from 'react-hook-form';

const CashManagement: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('positions');
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const form = useForm({
    defaultValues: {
      date: '',
      account: '',
      inflow: '',
      outflow: '',
      description: '',
      category: ''
    }
  });

  const [cashPositions, setCashPositions] = useState([
    { id: 'CP-001', date: '2024-05-20', account: 'Deutsche Bank - Main', currency: 'EUR', openingBalance: '2,450,000', inflows: '125,000', outflows: '45,500', closingBalance: '2,529,500', status: 'Confirmed' },
    { id: 'CP-002', date: '2024-05-20', account: 'HSBC - USD Account', currency: 'USD', openingBalance: '1,780,500', inflows: '78,900', outflows: '15,200', closingBalance: '1,844,200', status: 'Confirmed' },
    { id: 'CP-003', date: '2024-05-19', account: 'JPMorgan - Operations', currency: 'USD', openingBalance: '980,250', inflows: '56,780', outflows: '89,320', closingBalance: '947,710', status: 'Confirmed' },
    { id: 'CP-004', date: '2024-05-19', account: 'Crédit Agricole - Investment', currency: 'EUR', openingBalance: '3,200,000', inflows: '0', outflows: '25,000', closingBalance: '3,175,000', status: 'Pending' }
  ]);

  const [cashForecasts, setCashForecasts] = useState([
    { id: 'CF-001', period: 'Week 21 (May 20-26)', expectedInflows: '456,000', expectedOutflows: '378,500', netCashFlow: '77,500', confidence: '92%', scenario: 'Base Case' },
    { id: 'CF-002', period: 'Week 22 (May 27-Jun 2)', expectedInflows: '489,200', expectedOutflows: '412,800', netCashFlow: '76,400', confidence: '89%', scenario: 'Base Case' },
    { id: 'CF-003', period: 'Month - June 2024', expectedInflows: '2,145,000', expectedOutflows: '1,890,000', netCashFlow: '255,000', confidence: '85%', scenario: 'Optimistic' },
    { id: 'CF-004', period: 'Quarter - Q3 2024', expectedInflows: '6,780,000', expectedOutflows: '5,950,000', netCashFlow: '830,000', confidence: '78%', scenario: 'Conservative' }
  ]);

  const [liquidityAnalysis, setLiquidityAnalysis] = useState([
    { metric: 'Current Ratio', current: '2.45', target: '2.0', variance: '+22.5%', trend: 'up', status: 'Good' },
    { metric: 'Quick Ratio', current: '1.82', target: '1.5', variance: '+21.3%', trend: 'up', status: 'Excellent' },
    { metric: 'Cash Ratio', current: '0.95', target: '0.8', variance: '+18.8%', trend: 'up', status: 'Good' },
    { metric: 'Operating Cash Flow Ratio', current: '1.23', target: '1.0', variance: '+23.0%', trend: 'up', status: 'Excellent' },
    { metric: 'Days Sales Outstanding', current: '28', target: '30', variance: '-6.7%', trend: 'down', status: 'Good' },
    { metric: 'Cash Conversion Cycle', current: '45', target: '50', variance: '-10.0%', trend: 'down', status: 'Excellent' }
  ]);

  const [investments, setInvestments] = useState([
    { id: 'INV-001', type: 'Money Market Fund', amount: '500,000', currency: 'EUR', maturity: '30 days', rate: '3.5%', institution: 'Goldman Sachs', status: 'Active' },
    { id: 'INV-002', type: 'Treasury Bills', amount: '1,000,000', currency: 'USD', maturity: '90 days', rate: '4.2%', institution: 'JP Morgan', status: 'Active' },
    { id: 'INV-003', type: 'Certificate of Deposit', amount: '750,000', currency: 'EUR', maturity: '180 days', rate: '3.8%', institution: 'Deutsche Bank', status: 'Active' },
    { id: 'INV-004', type: 'Commercial Paper', amount: '300,000', currency: 'USD', maturity: '60 days', rate: '3.9%', institution: 'Wells Fargo', status: 'Maturing Soon' }
  ]);

  const handleCreate = (data: any) => {
    const newPosition = {
      id: `CP-${String(cashPositions.length + 1).padStart(3, '0')}`,
      ...data,
      status: 'Pending'
    };
    setCashPositions([...cashPositions, newPosition]);
    setIsCreateDialogOpen(false);
    form.reset();
  };

  const handleEdit = (position: any) => {
    setSelectedPosition(position);
    form.reset(position);
    setIsEditDialogOpen(true);
  };

  const handleUpdate = (data: any) => {
    setCashPositions(cashPositions.map(p => p.id === selectedPosition?.id ? { ...p, ...data } : p));
    setIsEditDialogOpen(false);
    setSelectedPosition(null);
  };

  const handleDelete = (id: string) => {
    setCashPositions(cashPositions.filter(p => p.id !== id));
  };

  const positionColumns: Column[] = [
    { key: 'id', header: 'Position ID' },
    { key: 'date', header: 'Date' },
    { key: 'account', header: 'Account' },
    { key: 'currency', header: 'Currency' },
    { 
      key: 'openingBalance', 
      header: 'Opening Balance',
      render: (value, row) => (
        <span className="font-semibold">{row.currency} {value}</span>
      )
    },
    { 
      key: 'inflows', 
      header: 'Inflows',
      render: (value, row) => (
        <span className="font-semibold text-green-600">{row.currency} {value}</span>
      )
    },
    { 
      key: 'outflows', 
      header: 'Outflows',
      render: (value, row) => (
        <span className="font-semibold text-red-600">{row.currency} {value}</span>
      )
    },
    { 
      key: 'closingBalance', 
      header: 'Closing Balance',
      render: (value, row) => (
        <span className="font-semibold text-blue-600">{row.currency} {value}</span>
      )
    },
    { 
      key: 'status', 
      header: 'Status',
      render: (value) => (
        <Badge variant={value === 'Confirmed' ? 'default' : 'secondary'}>{value}</Badge>
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

  const forecastColumns: Column[] = [
    { key: 'id', header: 'Forecast ID' },
    { key: 'period', header: 'Period' },
    { 
      key: 'expectedInflows', 
      header: 'Expected Inflows',
      render: (value) => (
        <span className="font-semibold text-green-600">€{value}</span>
      )
    },
    { 
      key: 'expectedOutflows', 
      header: 'Expected Outflows',
      render: (value) => (
        <span className="font-semibold text-red-600">€{value}</span>
      )
    },
    { 
      key: 'netCashFlow', 
      header: 'Net Cash Flow',
      render: (value) => (
        <span className={`font-semibold ${parseFloat(value.replace(/,/g, '')) > 0 ? 'text-green-600' : 'text-red-600'}`}>
          €{value}
        </span>
      )
    },
    { key: 'confidence', header: 'Confidence' },
    { key: 'scenario', header: 'Scenario' },
    {
      key: 'actions',
      header: 'Actions',
      render: (_, row) => (
        <div className="flex space-x-1">
          <Button variant="ghost" size="sm"><Eye className="h-4 w-4" /></Button>
          <Button variant="ghost" size="sm"><Edit className="h-4 w-4" /></Button>
        </div>
      )
    }
  ];

  const investmentColumns: Column[] = [
    { key: 'id', header: 'Investment ID' },
    { key: 'type', header: 'Investment Type' },
    { 
      key: 'amount', 
      header: 'Amount',
      render: (value, row) => (
        <span className="font-semibold">{row.currency} {value}</span>
      )
    },
    { key: 'maturity', header: 'Maturity' },
    { key: 'rate', header: 'Interest Rate' },
    { key: 'institution', header: 'Institution' },
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

  const totalCashPosition = cashPositions.reduce((sum, pos) => {
    const balance = parseFloat(pos.closingBalance.replace(/,/g, ''));
    return sum + (pos.currency === 'EUR' ? balance : balance * 0.85);
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
          title="Cash Management"
          description="Monitor and manage cash flow, positions, and liquidity"
          voiceIntroduction="Welcome to Cash Management. Monitor cash positions, forecast cash flows, and manage liquidity efficiently."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <p className="text-2xl font-bold">€{totalCashPosition.toLocaleString()}</p>
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
                <p className="text-2xl font-bold">€255K</p>
                <p className="text-xs text-muted-foreground">Monthly Net Flow</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Target className="h-8 w-8 text-purple-600 mr-3" />
              <div>
                <p className="text-2xl font-bold">2.45</p>
                <p className="text-xs text-muted-foreground">Current Ratio</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-orange-600 mr-3" />
              <div>
                <p className="text-2xl font-bold">45</p>
                <p className="text-xs text-muted-foreground">Cash Cycle (Days)</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="positions">Cash Positions</TabsTrigger>
          <TabsTrigger value="forecasting">Cash Forecasting</TabsTrigger>
          <TabsTrigger value="liquidity">Liquidity Analysis</TabsTrigger>
          <TabsTrigger value="investments">Short-term Investments</TabsTrigger>
          <TabsTrigger value="reporting">Cash Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="positions" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Daily Cash Positions</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                  <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                    <DialogTrigger asChild>
                      <Button size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Position
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Cash Position</DialogTitle>
                      </DialogHeader>
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleCreate)} className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="date"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Date</FormLabel>
                                  <FormControl>
                                    <Input {...field} type="date" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="account"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Account</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select account" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="Deutsche Bank - Main">Deutsche Bank - Main</SelectItem>
                                      <SelectItem value="HSBC - USD Account">HSBC - USD Account</SelectItem>
                                      <SelectItem value="JPMorgan - Operations">JPMorgan - Operations</SelectItem>
                                      <SelectItem value="Crédit Agricole - Investment">Crédit Agricole - Investment</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="inflow"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Inflows</FormLabel>
                                  <FormControl>
                                    <Input {...field} type="number" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="outflow"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Outflows</FormLabel>
                                  <FormControl>
                                    <Input {...field} type="number" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <div className="flex justify-end gap-2">
                            <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                              Cancel
                            </Button>
                            <Button type="submit">Add Position</Button>
                          </div>
                        </form>
                      </Form>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <DataTable columns={positionColumns} data={cashPositions} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="forecasting" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Cash Flow Forecasts</CardTitle>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Forecast
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <DataTable columns={forecastColumns} data={cashForecasts} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="liquidity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Liquidity Ratios & Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {liquidityAnalysis.map((metric, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold">{metric.metric}</h4>
                      <Badge variant={metric.status === 'Excellent' ? 'default' : metric.status === 'Good' ? 'outline' : 'secondary'}>
                        {metric.status}
                      </Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Current: <span className="font-semibold">{metric.current}</span></span>
                      <span>Target: <span className="font-semibold">{metric.target}</span></span>
                    </div>
                    <div className="flex items-center mt-2">
                      {metric.trend === 'up' ? (
                        <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
                      )}
                      <span className={`text-sm font-semibold ${metric.variance.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                        {metric.variance}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="investments" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Short-term Investments</CardTitle>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  New Investment
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <DataTable columns={investmentColumns} data={investments} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reporting" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Cash Flow Statement</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Generate comprehensive cash flow statements.
                </p>
                <Button className="w-full">Generate Report</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Cash Position Report</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Daily and weekly cash position summaries.
                </p>
                <Button className="w-full">Generate Report</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Liquidity Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Real-time liquidity monitoring dashboard.
                </p>
                <Button className="w-full">View Dashboard</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Cash Forecast Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Detailed cash forecast accuracy analysis.
                </p>
                <Button className="w-full">Generate Analysis</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Cash Position</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleUpdate)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date</FormLabel>
                      <FormControl>
                        <Input {...field} type="date" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="account"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Account</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select account" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Deutsche Bank - Main">Deutsche Bank - Main</SelectItem>
                          <SelectItem value="HSBC - USD Account">HSBC - USD Account</SelectItem>
                          <SelectItem value="JPMorgan - Operations">JPMorgan - Operations</SelectItem>
                          <SelectItem value="Crédit Agricole - Investment">Crédit Agricole - Investment</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="inflow"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Inflows</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="outflow"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Outflows</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input {...field} />
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

export default CashManagement;

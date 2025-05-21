
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/page/PageHeader';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Input } from '../../components/ui/input';
import { Search, Filter, Plus, FileText, Copy, Calendar } from 'lucide-react';
import DataTable from '../../components/data/DataTable';
import { useToast } from '../../hooks/use-toast';

// Sample quotation data
const quotationsData = [
  { 
    id: "QT-5821", 
    customer: "Acme Corp", 
    amount: "€24,500.00", 
    created: "2025-05-12", 
    expires: "2025-06-12", 
    status: "Open",
    probability: "High"
  },
  { 
    id: "QT-5820", 
    customer: "XYZ Industries", 
    amount: "€18,750.00", 
    created: "2025-05-10", 
    expires: "2025-06-10", 
    status: "Open",
    probability: "Medium"
  },
  { 
    id: "QT-5819", 
    customer: "Global Tech", 
    amount: "€32,100.00", 
    created: "2025-05-08", 
    expires: "2025-06-08", 
    status: "Sent",
    probability: "Low"
  },
  { 
    id: "QT-5818", 
    customer: "Mega Enterprises", 
    amount: "€15,800.00", 
    created: "2025-05-05", 
    expires: "2025-06-05", 
    status: "Accepted",
    probability: "Won"
  },
  { 
    id: "QT-5817", 
    customer: "Bright Solutions", 
    amount: "€28,300.00", 
    created: "2025-05-02", 
    expires: "2025-06-02", 
    status: "Rejected",
    probability: "Lost"
  },
  { 
    id: "QT-5816", 
    customer: "TechForward", 
    amount: "€42,700.00", 
    created: "2025-04-30", 
    expires: "2025-05-30", 
    status: "Expired",
    probability: "Lost"
  },
  { 
    id: "QT-5815", 
    customer: "Elite Corp", 
    amount: "€19,250.00", 
    created: "2025-04-28", 
    expires: "2025-05-28", 
    status: "Converted",
    probability: "Won"
  }
];

// Sample items in quotation
const quotationItems = [
  { id: "ITEM-001", product: "Professional Server Rack", quantity: 2, unitPrice: "€2,450.00", discount: "0%", total: "€4,900.00" },
  { id: "ITEM-002", product: "Enterprise Database License", quantity: 1, unitPrice: "€12,850.00", discount: "5%", total: "€12,207.50" },
  { id: "ITEM-003", product: "Network Security Firewall", quantity: 1, unitPrice: "€8,750.00", discount: "10%", total: "€7,875.00" },
  { id: "ITEM-004", product: "IT Support (40 Hours)", quantity: 40, unitPrice: "€125.00", discount: "0%", total: "€5,000.00" },
];

const QuotationManagement: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('active');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredQuotations, setFilteredQuotations] = useState(quotationsData);
  const [selectedQuotation, setSelectedQuotation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredQuotations(quotationsData);
    } else {
      const filtered = quotationsData.filter(
        quote => 
          quote.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
          quote.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredQuotations(filtered);
    }
  }, [searchTerm]);

  useEffect(() => {
    if (activeTab === 'active') {
      setFilteredQuotations(quotationsData.filter(q => q.status !== 'Rejected' && q.status !== 'Expired'));
    } else if (activeTab === 'all') {
      setFilteredQuotations(quotationsData);
    } else if (activeTab === 'closed') {
      setFilteredQuotations(quotationsData.filter(q => q.status === 'Rejected' || q.status === 'Expired' || q.status === 'Converted'));
    }
  }, [activeTab]);

  const handleCreateQuotation = () => {
    toast({
      title: "Create Quotation",
      description: "Quotation creation form has been opened.",
    });
    // In a real application, this would open a form or modal
  };

  const handleViewQuotation = (quotationId: string) => {
    setSelectedQuotation(quotationId);
    toast({
      description: `Viewing quotation ${quotationId}`,
    });
    // In a real application, this would navigate to a detail view or open a modal
  };

  // Quotation columns configuration
  const quotationColumns = [
    { key: "id", header: "Quotation #" },
    { 
      key: "customer", 
      header: "Customer",
      render: (value: string) => (
        <span className="text-blue-600 underline cursor-pointer">{value}</span>
      )
    },
    { key: "amount", header: "Amount" },
    { key: "created", header: "Created Date" },
    { key: "expires", header: "Valid Until" },
    { 
      key: "status", 
      header: "Status",
      render: (value: string) => (
        <Badge variant={
          value === 'Open' ? 'outline' : 
          value === 'Sent' ? 'secondary' :
          value === 'Accepted' || value === 'Converted' ? 'default' :
          'destructive'
        }>
          {value}
        </Badge>
      )
    },
    { 
      key: "probability", 
      header: "Probability",
      render: (value: string) => (
        <Badge variant={
          value === 'High' ? 'outline' : 
          value === 'Medium' ? 'secondary' :
          value === 'Low' ? 'destructive' :
          value === 'Won' ? 'default' : 'destructive'
        }>
          {value}
        </Badge>
      )
    },
    { 
      key: "actions", 
      header: "Actions",
      render: (_, row: any) => (
        <div className="flex space-x-2">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => handleViewQuotation(row.id)}
          >
            <FileText className="h-4 w-4" />
          </Button>
          {row.status !== 'Converted' && row.status !== 'Rejected' && row.status !== 'Expired' && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => toast({ description: `Converting quotation ${row.id} to order` })}
            >
              <Copy className="h-4 w-4" />
            </Button>
          )}
        </div>
      )
    }
  ];

  // Quotation item columns
  const itemColumns = [
    { key: "product", header: "Product" },
    { key: "quantity", header: "Quantity" },
    { key: "unitPrice", header: "Unit Price" },
    { key: "discount", header: "Discount" },
    { key: "total", header: "Total" }
  ];

  return (
    <div className="container mx-auto p-6">
      <PageHeader 
        title="Quotation Management" 
        description="Create and manage sales quotations"
        voiceIntroduction="Welcome to Quotation Management. Here you can create, track, and convert sales quotations to orders."
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="active">Active Quotations</TabsTrigger>
          <TabsTrigger value="all">All Quotations</TabsTrigger>
          <TabsTrigger value="closed">Closed</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active" className="space-y-6">
          <Card className="p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div className="flex items-center w-full max-w-md relative">
                <Search className="h-4 w-4 absolute left-3 text-gray-400" />
                <Input 
                  placeholder="Search quotations..." 
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button onClick={handleCreateQuotation}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Quotation
                </Button>
              </div>
            </div>

            {isLoading ? (
              <div className="h-64 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <DataTable 
                columns={quotationColumns}
                data={filteredQuotations}
                className="border rounded-md"
              />
            )}

            <div className="mt-4 text-sm text-gray-500">
              Showing {filteredQuotations.length} quotations
            </div>
          </Card>

          {selectedQuotation && (
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">Quotation Details: {selectedQuotation}</h3>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <Calendar className="h-4 w-4 mr-2" />
                    Extend Validity
                  </Button>
                  <Button>
                    <Copy className="h-4 w-4 mr-2" />
                    Convert to Order
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Customer</h4>
                  <p className="text-blue-600 underline cursor-pointer">Acme Corp</p>
                  <p className="text-sm">
                    123 Business Ave<br />
                    New York, NY 10001<br />
                    USA
                  </p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Quotation Information</h4>
                  <div className="flex justify-between text-sm">
                    <span>Created:</span>
                    <span>May 12, 2025</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Valid Until:</span>
                    <span>June 12, 2025</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Status:</span>
                    <Badge variant="outline">Open</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Probability:</span>
                    <Badge variant="outline">High</Badge>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Sales Information</h4>
                  <div className="flex justify-between text-sm">
                    <span>Sales Rep:</span>
                    <span>Anna Johnson</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Payment Terms:</span>
                    <span>Net 30</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Delivery Method:</span>
                    <span>Standard</span>
                  </div>
                </div>
              </div>
              
              <h4 className="font-medium mb-2">Quotation Items</h4>
              <DataTable 
                columns={itemColumns}
                data={quotationItems}
                className="border rounded-md mb-4"
              />
              
              <div className="flex justify-end">
                <div className="w-64 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal:</span>
                    <span>€29,982.50</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>VAT (20%):</span>
                    <span>€5,996.50</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span>Total:</span>
                    <span>€35,979.00</span>
                  </div>
                </div>
              </div>
            </Card>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Quotation Statistics</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Conversion Rate</span>
                    <span className="font-medium">48%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '48%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Avg. Response Time</span>
                    <span className="font-medium">3.2 days</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '70%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Avg. Quotation Value</span>
                    <span className="font-medium">€25,914</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Status Distribution</h3>
              <div className="space-y-3">
                {['Open', 'Sent', 'Accepted', 'Rejected', 'Converted', 'Expired'].map((status) => {
                  const count = quotationsData.filter(q => q.status === status).length;
                  return (
                    <div key={status} className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Badge variant={
                          status === 'Open' ? 'outline' : 
                          status === 'Sent' ? 'secondary' :
                          status === 'Accepted' || status === 'Converted' ? 'default' :
                          'destructive'
                        } className="mr-2">
                          {status}
                        </Badge>
                        <span>{status}</span>
                      </div>
                      <span className="font-medium">{count}</span>
                    </div>
                  );
                })}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start" onClick={handleCreateQuotation}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Quotation
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  Expiring Quotes (3)
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Quotation Templates
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Filter className="h-4 w-4 mr-2" />
                  Configure Settings
                </Button>
              </div>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="all">
          <Card className="p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div className="flex items-center w-full max-w-md relative">
                <Search className="h-4 w-4 absolute left-3 text-gray-400" />
                <Input 
                  placeholder="Search quotations..." 
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button onClick={handleCreateQuotation}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Quotation
                </Button>
              </div>
            </div>

            {isLoading ? (
              <div className="h-64 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <DataTable 
                columns={quotationColumns}
                data={filteredQuotations}
                className="border rounded-md"
              />
            )}

            <div className="mt-4 text-sm text-gray-500">
              Showing {filteredQuotations.length} quotations
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="closed">
          <Card className="p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div className="flex items-center w-full max-w-md relative">
                <Search className="h-4 w-4 absolute left-3 text-gray-400" />
                <Input 
                  placeholder="Search quotations..." 
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>

            {isLoading ? (
              <div className="h-64 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <DataTable 
                columns={quotationColumns}
                data={filteredQuotations}
                className="border rounded-md"
              />
            )}

            <div className="mt-4 text-sm text-gray-500">
              Showing {filteredQuotations.length} quotations
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default QuotationManagement;

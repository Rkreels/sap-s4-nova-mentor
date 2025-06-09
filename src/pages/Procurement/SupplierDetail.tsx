
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { ArrowLeft, Edit, FileText, Package, ShoppingCart, TrendingUp } from 'lucide-react';
import PageHeader from '../../components/page/PageHeader';
import { useVoiceAssistantContext } from '../../context/VoiceAssistantContext';
import { useVoiceAssistant } from '../../hooks/useVoiceAssistant';
import { useToast } from '../../hooks/use-toast';
import SupplierContactInfo from './components/SupplierContactInfo';
import SupplierBusinessInfo from './components/SupplierBusinessInfo';
import SupplierPerformanceMetrics from './components/SupplierPerformanceMetrics';
import SupplierMaterials from './components/SupplierMaterials';
import SupplierOrders from './components/SupplierOrders';
import SupplierContracts from './components/SupplierContracts';

const SupplierDetail: React.FC = () => {
  const navigate = useNavigate();
  const { supplierId } = useParams();
  const { isEnabled } = useVoiceAssistantContext();
  const { speak } = useVoiceAssistant();
  const [activeTab, setActiveTab] = useState('overview');
  const { toast } = useToast();

  // Mock supplier data
  const supplierData = {
    id: supplierId || 'sup-001',
    name: 'Dell Technologies Inc.',
    status: 'Active',
    category: 'IT Equipment',
    rating: 4.8,
    establishedDate: '1984-02-01',
    email: 'procurement@dell.com',
    phone: '+1-800-999-3355',
    website: 'www.dell.com',
    address: '1 Dell Way, Round Rock, TX 78682',
    country: 'United States',
    contactPerson: 'Michael Johnson',
    paymentTerms: 'Net 30',
    deliveryTerm: 'FOB Destination',
    currency: 'USD',
    totalSpend: '$1,250,000',
    lastOrder: '2025-01-25'
  };

  useEffect(() => {
    if (isEnabled) {
      speak(`Welcome to the supplier detail page for ${supplierData.name}. Here you can view comprehensive information about this supplier including contact details, performance metrics, materials, orders, and contracts.`);
    }
  }, [isEnabled, speak, supplierData.name]);

  const handleEdit = (section: string) => {
    toast({
      title: 'Edit Supplier',
      description: `Opening edit form for ${section}`,
    });
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex items-center mb-4">
        <Button 
          variant="outline" 
          size="sm" 
          className="mr-4"
          onClick={() => navigate('/procurement/supplier-management')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Suppliers
        </Button>
        <PageHeader
          title={supplierData.name}
          description="Comprehensive supplier information and performance metrics"
          voiceIntroduction={`Detailed view for supplier ${supplierData.name}`}
        />
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Badge className="bg-green-100 text-green-800">
            {supplierData.status}
          </Badge>
          <Badge variant="outline">
            {supplierData.category}
          </Badge>
          <div className="flex items-center space-x-1">
            <TrendingUp className="h-4 w-4 text-green-600" />
            <span className="font-medium">{supplierData.rating}/5.0</span>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => handleEdit('general')}>
            <Edit className="h-4 w-4 mr-2" />
            Edit Supplier
          </Button>
          <Button>
            <FileText className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="materials">Materials</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="contracts">Contracts</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SupplierContactInfo
              email={supplierData.email}
              phone={supplierData.phone}
              website={supplierData.website}
              address={supplierData.address}
              country={supplierData.country}
              onEdit={() => handleEdit('contact')}
            />
            <SupplierBusinessInfo
              contactPerson={supplierData.contactPerson}
              category={supplierData.category}
              paymentTerms={supplierData.paymentTerms}
              deliveryTerm={supplierData.deliveryTerm}
              currency={supplierData.currency}
              onEdit={() => handleEdit('business')}
            />
          </div>
          <SupplierPerformanceMetrics
            totalSpend={supplierData.totalSpend}
            lastOrder={supplierData.lastOrder}
          />
        </TabsContent>

        <TabsContent value="materials" className="space-y-4">
          <SupplierMaterials />
        </TabsContent>

        <TabsContent value="orders" className="space-y-4">
          <SupplierOrders />
        </TabsContent>

        <TabsContent value="contracts" className="space-y-4">
          <SupplierContracts />
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded">
                    <h4 className="font-semibold mb-2">Quarterly Performance</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Q1 2025 Rating:</span>
                        <span className="font-medium">4.9/5.0</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Q4 2024 Rating:</span>
                        <span className="font-medium">4.7/5.0</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Trend:</span>
                        <span className="font-medium text-green-600">↗ Improving</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Key Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Delivery Performance</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: '95%' }}></div>
                      </div>
                      <span className="text-sm font-medium">95%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Quality Score</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: '98%' }}></div>
                      </div>
                      <span className="text-sm font-medium">98%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Cost Competitiveness</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '88%' }}></div>
                      </div>
                      <span className="text-sm font-medium">88%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Supplier Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded">
                    <h4 className="font-semibold mb-2">Certifications</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>ISO 9001:2015</span>
                        <Badge className="bg-green-100 text-green-800">Valid</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>ISO 14001:2015</span>
                        <Badge className="bg-green-100 text-green-800">Valid</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>SOC 2 Type II</span>
                        <Badge className="bg-green-100 text-green-800">Valid</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border rounded">
                    <h4 className="font-semibold mb-2">Legal Documents</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Master Agreement</span>
                        <Badge variant="outline">Current</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Insurance Certificate</span>
                        <Badge className="bg-yellow-100 text-yellow-800">Expires Soon</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Tax Certificate</span>
                        <Badge variant="outline">Current</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SupplierDetail;

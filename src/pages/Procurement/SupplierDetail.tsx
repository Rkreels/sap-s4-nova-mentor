
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import PageHeader from '../../components/page/PageHeader';
import SupplierContactInfo from './components/SupplierContactInfo';
import SupplierBusinessInfo from './components/SupplierBusinessInfo';
import SupplierPerformanceMetrics from './components/SupplierPerformanceMetrics';
import SupplierMaterials from './components/SupplierMaterials';
import SupplierOrders from './components/SupplierOrders';
import SupplierContracts from './components/SupplierContracts';
import { ArrowLeft, Edit, Phone, Mail } from 'lucide-react';

const SupplierDetail: React.FC = () => {
  const { supplierId } = useParams();
  const navigate = useNavigate();
  const [supplier, setSupplier] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch supplier details
    setTimeout(() => {
      setSupplier({
        id: supplierId,
        name: 'Tech Components Inc.',
        status: 'Active',
        email: 'contact@techcomponents.com',
        phone: '+1 (555) 123-4567',
        website: 'www.techcomponents.com',
        address: '123 Tech Street, Silicon Valley, CA 94025',
        country: 'United States',
        contactPerson: 'John Smith',
        category: 'Electronics',
        paymentTerms: 'Net 30',
        deliveryTerm: 'FOB Destination',
        currency: 'USD',
        totalSpend: '$1,245,800.00',
        lastOrder: '2025-05-15'
      });
      setLoading(false);
    }, 1000);
  }, [supplierId]);

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="h-64 bg-gray-200 rounded"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!supplier) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Supplier Not Found</h1>
          <Button onClick={() => navigate('/procurement')}>
            Back to Procurement
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center mb-4">
        <Button 
          variant="outline" 
          size="sm" 
          className="mr-4"
          onClick={() => navigate('/procurement')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Procurement
        </Button>
        <PageHeader
          title={supplier.name}
          description={`Supplier ID: ${supplier.id} • Status: ${supplier.status}`}
        />
      </div>

      <div className="flex justify-between items-center">
        <div className="flex space-x-4">
          <Button variant="outline" size="sm">
            <Phone className="h-4 w-4 mr-2" />
            Call
          </Button>
          <Button variant="outline" size="sm">
            <Mail className="h-4 w-4 mr-2" />
            Email
          </Button>
        </div>
        <Button>
          <Edit className="h-4 w-4 mr-2" />
          Edit Supplier
        </Button>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="materials">Materials</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="contracts">Contracts</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <SupplierContactInfo
              email={supplier.email}
              phone={supplier.phone}
              website={supplier.website}
              address={supplier.address}
              country={supplier.country}
            />
            <SupplierBusinessInfo
              contactPerson={supplier.contactPerson}
              category={supplier.category}
              paymentTerms={supplier.paymentTerms}
              deliveryTerm={supplier.deliveryTerm}
              currency={supplier.currency}
            />
            <SupplierPerformanceMetrics
              totalSpend={supplier.totalSpend}
              lastOrder={supplier.lastOrder}
            />
          </div>
        </TabsContent>

        <TabsContent value="materials">
          <SupplierMaterials />
        </TabsContent>

        <TabsContent value="orders">
          <SupplierOrders />
        </TabsContent>

        <TabsContent value="contracts">
          <SupplierContracts />
        </TabsContent>

        <TabsContent value="performance">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Performance Analytics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-4 border rounded">
                <div className="text-2xl font-bold text-green-600">92%</div>
                <div className="text-sm text-gray-500">On-Time Delivery</div>
              </div>
              <div className="text-center p-4 border rounded">
                <div className="text-2xl font-bold text-blue-600">4.8</div>
                <div className="text-sm text-gray-500">Quality Rating</div>
              </div>
              <div className="text-center p-4 border rounded">
                <div className="text-2xl font-bold text-purple-600">98%</div>
                <div className="text-sm text-gray-500">Order Accuracy</div>
              </div>
              <div className="text-center p-4 border rounded">
                <div className="text-2xl font-bold text-orange-600">$1.2M</div>
                <div className="text-sm text-gray-500">YTD Spend</div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="documents">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Supplier Documents</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 border rounded">
                <div>
                  <div className="font-medium">Certificate of Insurance</div>
                  <div className="text-sm text-gray-500">Valid until: Dec 31, 2025</div>
                </div>
                <Button variant="outline" size="sm">Download</Button>
              </div>
              <div className="flex justify-between items-center p-4 border rounded">
                <div>
                  <div className="font-medium">Quality Certification</div>
                  <div className="text-sm text-gray-500">ISO 9001:2015</div>
                </div>
                <Button variant="outline" size="sm">Download</Button>
              </div>
              <div className="flex justify-between items-center p-4 border rounded">
                <div>
                  <div className="font-medium">Tax Registration</div>
                  <div className="text-sm text-gray-500">Updated: Jan 15, 2025</div>
                </div>
                <Button variant="outline" size="sm">Download</Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SupplierDetail;

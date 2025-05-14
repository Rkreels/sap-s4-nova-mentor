
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { useVoiceAssistantContext } from '../../context/VoiceAssistantContext';
import { useVoiceAssistant } from '../../hooks/useVoiceAssistant';
import PageHeader from '../../components/page/PageHeader';
import { ArrowLeft, BarChart2, FileText, Package, Search } from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';

const MaterialRequirements: React.FC = () => {
  const navigate = useNavigate();
  const { isEnabled } = useVoiceAssistantContext();
  const { speak } = useVoiceAssistant();

  React.useEffect(() => {
    if (isEnabled) {
      speak('You are now viewing Material Requirements Planning. This page helps you manage your material requirements for production.');
    }
  }, [isEnabled, speak]);

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex items-center mb-4">
        <Button 
          variant="outline" 
          size="sm" 
          className="mr-4"
          onClick={() => navigate('/manufacturing')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back
        </Button>
        <PageHeader
          title="Material Requirements Planning"
          description="Plan and manage material requirements for production"
          voiceIntroduction="Welcome to Material Requirements Planning. Here you can manage all material requirements for your production processes."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm text-gray-500 mb-2">Open Material Requests</h3>
          <div className="text-3xl font-semibold mb-2">243</div>
          <div className="flex items-center">
            <span className="text-red-500 text-sm font-medium">↑ 18</span>
            <span className="text-xs text-gray-500 ml-2">vs last week</span>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm text-gray-500 mb-2">Material Shortage Risk</h3>
          <div className="text-3xl font-semibold mb-2">Medium</div>
          <div className="flex items-center">
            <span className="text-yellow-500 text-sm font-medium">12 items</span>
            <span className="text-xs text-gray-500 ml-2">at risk</span>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm text-gray-500 mb-2">On-time Delivery</h3>
          <div className="text-3xl font-semibold mb-2">92.3%</div>
          <div className="flex items-center">
            <span className="text-green-500 text-sm font-medium">↑ 1.4%</span>
            <span className="text-xs text-gray-500 ml-2">vs last month</span>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm text-gray-500 mb-2">Next MRP Run</h3>
          <div className="text-3xl font-semibold mb-2">8h 42m</div>
          <div className="flex items-center">
            <span className="text-blue-500 text-sm font-medium">Scheduled</span>
            <span className="text-xs text-gray-500 ml-2">May 15, 2025</span>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Material Requirements</h2>
          <p className="text-sm text-gray-500">May 14, 2025</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="flex items-center">
            <Search className="h-4 w-4 mr-2" />
            Search Materials
          </Button>
          <Button variant="outline" size="sm" className="flex items-center">
            <FileText className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button className="flex items-center">
            <Package className="h-4 w-4 mr-2" />
            Create Purchase Request
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Materials</TabsTrigger>
          <TabsTrigger value="critical">Critical</TabsTrigger>
          <TabsTrigger value="shortages">Shortages</TabsTrigger>
          <TabsTrigger value="exceptions">Exceptions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <Card className="p-0 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border p-3 text-left">Material</th>
                    <th className="border p-3 text-left">Description</th>
                    <th className="border p-3 text-left">Available Stock</th>
                    <th className="border p-3 text-left">Required</th>
                    <th className="border p-3 text-left">Shortage</th>
                    <th className="border p-3 text-left">Expected Delivery</th>
                    <th className="border p-3 text-left">Status</th>
                    <th className="border p-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-gray-50">
                    <td className="border p-3">M-1001</td>
                    <td className="border p-3">Steel Sheet 2mm</td>
                    <td className="border p-3">520 kg</td>
                    <td className="border p-3">780 kg</td>
                    <td className="border p-3 text-red-600">260 kg</td>
                    <td className="border p-3">May 16, 2025</td>
                    <td className="border p-3">
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">On Order</span>
                    </td>
                    <td className="border p-3">
                      <Button variant="outline" size="sm">View</Button>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border p-3">M-1002</td>
                    <td className="border p-3">Circuit Board XJ-42</td>
                    <td className="border p-3">350 pcs</td>
                    <td className="border p-3">300 pcs</td>
                    <td className="border p-3 text-green-600">+50 pcs</td>
                    <td className="border p-3">-</td>
                    <td className="border p-3">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Available</span>
                    </td>
                    <td className="border p-3">
                      <Button variant="outline" size="sm">View</Button>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 bg-red-50">
                    <td className="border p-3">M-1003</td>
                    <td className="border p-3">Microchip XZ430</td>
                    <td className="border p-3">120 pcs</td>
                    <td className="border p-3">580 pcs</td>
                    <td className="border p-3 text-red-600">460 pcs</td>
                    <td className="border p-3">June 2, 2025</td>
                    <td className="border p-3">
                      <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">Critical</span>
                    </td>
                    <td className="border p-3">
                      <Button variant="outline" size="sm">Expedite</Button>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border p-3">M-1004</td>
                    <td className="border p-3">Connector Type B</td>
                    <td className="border p-3">1,200 pcs</td>
                    <td className="border p-3">1,000 pcs</td>
                    <td className="border p-3 text-green-600">+200 pcs</td>
                    <td className="border p-3">-</td>
                    <td className="border p-3">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Available</span>
                    </td>
                    <td className="border p-3">
                      <Button variant="outline" size="sm">View</Button>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border p-3">M-1005</td>
                    <td className="border p-3">Aluminum Casing</td>
                    <td className="border p-3">420 pcs</td>
                    <td className="border p-3">480 pcs</td>
                    <td className="border p-3 text-red-600">60 pcs</td>
                    <td className="border p-3">May 20, 2025</td>
                    <td className="border p-3">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">In Transit</span>
                    </td>
                    <td className="border p-3">
                      <Button variant="outline" size="sm">Track</Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="p-4 border-t bg-gray-50 flex justify-between items-center">
              <div className="text-sm text-gray-500">
                Showing 5 of 243 materials
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" disabled>Previous</Button>
                <Button variant="outline" size="sm">Next</Button>
              </div>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="critical">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Critical Materials</h2>
            <p className="text-gray-500 mb-6">Materials with critical shortages affecting production</p>
            <div className="text-center py-12 border-dashed border-2 border-gray-300 rounded-md">
              <BarChart2 className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-400">Critical materials list will be displayed here</p>
              <p className="text-sm text-gray-400 mt-2">3 critical materials found</p>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="shortages">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Material Shortages</h2>
            <p className="text-gray-500 mb-6">All materials with current or projected shortages</p>
            <div className="text-center py-12 border-dashed border-2 border-gray-300 rounded-md">
              <BarChart2 className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-400">Material shortages will be displayed here</p>
              <p className="text-sm text-gray-400 mt-2">12 materials with shortages found</p>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="exceptions">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">MRP Exceptions</h2>
            <p className="text-gray-500 mb-6">Material requirement planning exceptions that need attention</p>
            <div className="text-center py-12 border-dashed border-2 border-gray-300 rounded-md">
              <BarChart2 className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-400">MRP exceptions will be displayed here</p>
              <p className="text-sm text-gray-400 mt-2">5 exceptions found</p>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MaterialRequirements;


import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { useVoiceAssistantContext } from '../../context/VoiceAssistantContext';
import { useVoiceAssistant } from '../../hooks/useVoiceAssistant';
import PageHeader from '../../components/page/PageHeader';
import { ArrowLeft, BarChart2, ClipboardCheck, LineChart, Settings } from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';

const CapacityPlanning: React.FC = () => {
  const navigate = useNavigate();
  const { isEnabled } = useVoiceAssistantContext();
  const { speak } = useVoiceAssistant();

  React.useEffect(() => {
    if (isEnabled) {
      speak('You are now viewing Capacity Planning. This page allows you to manage production capacity and resource allocation.');
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
          title="Capacity Planning"
          description="Plan and manage production capacity and resource allocation"
          voiceIntroduction="Welcome to Capacity Planning. Here you can manage your production capacity and resources."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm text-gray-500 mb-2">Overall Capacity</h3>
          <div className="text-3xl font-semibold mb-2">87.3%</div>
          <div className="flex items-center">
            <span className="text-yellow-500 text-sm font-medium">↑ 3.2%</span>
            <span className="text-xs text-gray-500 ml-2">vs last month</span>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm text-gray-500 mb-2">Machine Utilization</h3>
          <div className="text-3xl font-semibold mb-2">92.1%</div>
          <div className="flex items-center">
            <span className="text-green-500 text-sm font-medium">↑ 1.8%</span>
            <span className="text-xs text-gray-500 ml-2">vs target</span>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm text-gray-500 mb-2">Labor Utilization</h3>
          <div className="text-3xl font-semibold mb-2">85.7%</div>
          <div className="flex items-center">
            <span className="text-red-500 text-sm font-medium">↓ 2.3%</span>
            <span className="text-xs text-gray-500 ml-2">vs target</span>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm text-gray-500 mb-2">Capacity Forecast</h3>
          <div className="text-3xl font-semibold mb-2">+4.2%</div>
          <div className="flex items-center">
            <span className="text-green-500 text-sm font-medium">Increasing</span>
            <span className="text-xs text-gray-500 ml-2">next 30 days</span>
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="machines">Machines</TabsTrigger>
          <TabsTrigger value="labor">Labor</TabsTrigger>
          <TabsTrigger value="planning">Planning Tools</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Capacity Overview</h2>
            <div className="h-64 bg-gray-100 rounded-md flex items-center justify-center">
              <div className="text-center">
                <LineChart className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Capacity utilization chart will be displayed here</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <h3 className="font-medium mb-4">Capacity Issues</h3>
                <div className="space-y-3">
                  <div className="border p-3 rounded-md bg-red-50 border-red-200">
                    <div className="flex justify-between">
                      <span className="font-medium">Assembly Line 2</span>
                      <span className="text-red-600">Over Capacity</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">Operating at 108% of designed capacity</p>
                  </div>
                  <div className="border p-3 rounded-md bg-yellow-50 border-yellow-200">
                    <div className="flex justify-between">
                      <span className="font-medium">Packaging Department</span>
                      <span className="text-yellow-600">Near Capacity</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">Operating at 94% of designed capacity</p>
                  </div>
                  <div className="border p-3 rounded-md bg-blue-50 border-blue-200">
                    <div className="flex justify-between">
                      <span className="font-medium">CNC Machine Pool</span>
                      <span className="text-blue-600">Maintenance Required</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">Scheduled maintenance will reduce capacity by 15%</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-4">Capacity Recommendations</h3>
                <div className="space-y-3">
                  <div className="border p-3 rounded-md hover:bg-gray-50">
                    <div className="flex justify-between">
                      <span className="font-medium">Shift Reallocation</span>
                      <Button variant="outline" size="sm">Apply</Button>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">Rebalance shifts to increase Assembly Line 2 capacity</p>
                  </div>
                  <div className="border p-3 rounded-md hover:bg-gray-50">
                    <div className="flex justify-between">
                      <span className="font-medium">Maintenance Rescheduling</span>
                      <Button variant="outline" size="sm">Review</Button>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">Optimize maintenance schedule to minimize impact</p>
                  </div>
                  <div className="border p-3 rounded-md hover:bg-gray-50">
                    <div className="flex justify-between">
                      <span className="font-medium">Order Prioritization</span>
                      <Button variant="outline" size="sm">Configure</Button>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">Adjust order priorities to optimize resource usage</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="machines">
          <Card className="p-6">
            <div className="flex justify-between mb-6">
              <h2 className="text-xl font-semibold">Machine Capacity</h2>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex items-center">
                  <Settings className="h-4 w-4 mr-2" />
                  Configure
                </Button>
                <Button variant="outline" size="sm" className="flex items-center">
                  <BarChart2 className="h-4 w-4 mr-2" />
                  Reports
                </Button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border p-2 text-left">Machine</th>
                    <th className="border p-2 text-left">Capacity %</th>
                    <th className="border p-2 text-left">Status</th>
                    <th className="border p-2 text-left">Next Maintenance</th>
                    <th className="border p-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">Assembly Line 1</td>
                    <td className="border p-2">
                      <div className="flex items-center">
                        <span className="mr-2">78%</span>
                        <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="bg-green-500 h-full" style={{ width: '78%' }}></div>
                        </div>
                      </div>
                    </td>
                    <td className="border p-2"><span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Operational</span></td>
                    <td className="border p-2">Jun 15, 2025</td>
                    <td className="border p-2">
                      <Button variant="outline" size="sm">Details</Button>
                    </td>
                  </tr>
                  <tr>
                    <td className="border p-2">Assembly Line 2</td>
                    <td className="border p-2">
                      <div className="flex items-center">
                        <span className="mr-2">108%</span>
                        <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="bg-red-500 h-full" style={{ width: '100%' }}></div>
                        </div>
                      </div>
                    </td>
                    <td className="border p-2"><span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">Over Capacity</span></td>
                    <td className="border p-2">May 30, 2025</td>
                    <td className="border p-2">
                      <Button variant="outline" size="sm">Details</Button>
                    </td>
                  </tr>
                  <tr>
                    <td className="border p-2">CNC Machine 1</td>
                    <td className="border p-2">
                      <div className="flex items-center">
                        <span className="mr-2">92%</span>
                        <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="bg-yellow-500 h-full" style={{ width: '92%' }}></div>
                        </div>
                      </div>
                    </td>
                    <td className="border p-2"><span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Near Capacity</span></td>
                    <td className="border p-2">Jun 3, 2025</td>
                    <td className="border p-2">
                      <Button variant="outline" size="sm">Details</Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="labor">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Labor Capacity</h2>
            <p className="text-gray-500 mb-6">Labor capacity planning and resource allocation</p>
            <div className="text-center py-12 border-dashed border-2 border-gray-300 rounded-md">
              <ClipboardCheck className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-400">Labor capacity management will be displayed here</p>
              <p className="text-sm text-gray-400 mt-2">Employee skills, availability, and assignments</p>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="planning">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Capacity Planning Tools</h2>
            <p className="text-gray-500 mb-6">Advanced planning tools and simulations for capacity optimization</p>
            <div className="text-center py-12 border-dashed border-2 border-gray-300 rounded-md">
              <Settings className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-400">Capacity planning tools and simulations will be displayed here</p>
              <p className="text-sm text-gray-400 mt-2">Run what-if scenarios and optimize resource allocation</p>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CapacityPlanning;

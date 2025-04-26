
import React, { useEffect } from 'react';
import { useVoiceAssistantContext } from '../../context/VoiceAssistantContext';
import { useVoiceAssistant } from '../../hooks/useVoiceAssistant';
import PageHeader from '../../components/page/PageHeader';
import SAPSection from '../../components/SAPSection';
import ProductionOverview from './components/ProductionOverview';
import ProductionMetrics from './components/ProductionMetrics';
import ProductionOrders from './components/ProductionOrders';
import InventoryManagement from './components/InventoryManagement';
import { BarChartIcon, Clock, Filter, Package, Settings, Layers, FileText, Users } from 'lucide-react';

const Manufacturing: React.FC = () => {
  const { isEnabled } = useVoiceAssistantContext();
  const { speak } = useVoiceAssistant();
  
  useEffect(() => {
    if (isEnabled) {
      speak(`Welcome to the Manufacturing and Supply Chain module. Here you can monitor production efficiency, 
      manage orders, and track inventory levels. For example, you can use the Production Overview section to see 
      real-time metrics like efficiency rates and quality scores. The Production Orders section allows you to 
      create and manage manufacturing orders, while Inventory Management helps you maintain optimal stock levels.`);
    }
  }, [isEnabled, speak]);

  return (
    <div className="container mx-auto">
      <PageHeader 
        title="Manufacturing and Supply Chain" 
        voiceIntroduction={`Welcome to the Manufacturing and Supply Chain module. Here you can monitor production efficiency, 
        manage orders, and track inventory levels.`}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded shadow-sm border border-gray-100">
          <div className="flex items-center mb-6">
            <div className="bg-orange-100 p-3 rounded-lg mr-4">
              <Package className="h-6 w-6 text-orange-600" />
            </div>
            <h2 className="text-xl font-semibold">Production</h2>
          </div>
          
          <div className="space-y-3">
            <button className="w-full text-left py-2 px-3 hover:bg-gray-50 rounded text-sm font-medium">
              Production Orders
            </button>
            <button className="w-full text-left py-2 px-3 hover:bg-gray-50 rounded text-sm font-medium">
              Production Planning
            </button>
            <button className="w-full text-left py-2 px-3 hover:bg-gray-50 rounded text-sm font-medium">
              Quality Management
            </button>
            <button className="w-full text-left py-2 px-3 hover:bg-gray-50 rounded text-sm font-medium">
              Production Reporting
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded shadow-sm border border-gray-100">
          <div className="flex items-center mb-6">
            <div className="bg-green-100 p-3 rounded-lg mr-4">
              <Layers className="h-6 w-6 text-green-600" />
            </div>
            <h2 className="text-xl font-semibold">Inventory</h2>
          </div>
          
          <div className="space-y-3">
            <button className="w-full text-left py-2 px-3 hover:bg-gray-50 rounded text-sm font-medium">
              Stock Overview
            </button>
            <button className="w-full text-left py-2 px-3 hover:bg-gray-50 rounded text-sm font-medium">
              Goods Movement
            </button>
            <button className="w-full text-left py-2 px-3 hover:bg-gray-50 rounded text-sm font-medium">
              Inventory Reports
            </button>
            <button className="w-full text-left py-2 px-3 hover:bg-gray-50 rounded text-sm font-medium">
              Material Master
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded shadow-sm border border-gray-100">
          <div className="flex items-center mb-6">
            <div className="bg-blue-100 p-3 rounded-lg mr-4">
              <Settings className="h-6 w-6 text-blue-600" />
            </div>
            <h2 className="text-xl font-semibold">Settings</h2>
          </div>
          
          <div className="space-y-3">
            <button className="w-full text-left py-2 px-3 hover:bg-gray-50 rounded text-sm font-medium">
              Manufacturing Parameters
            </button>
            <button className="w-full text-left py-2 px-3 hover:bg-gray-50 rounded text-sm font-medium">
              Production Scheduling
            </button>
            <button className="w-full text-left py-2 px-3 hover:bg-gray-50 rounded text-sm font-medium">
              Resource Configuration
            </button>
            <button className="w-full text-left py-2 px-3 hover:bg-gray-50 rounded text-sm font-medium">
              System Integration
            </button>
          </div>
        </div>
      </div>

      <SAPSection title="Production Overview" isVoiceAssistantEnabled={isEnabled}>
        <div className="col-span-full mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Production Performance</h3>
            <div className="flex space-x-4">
              <button className="flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-1" /> 
                <span>Last updated: Today 08:30</span>
              </button>
              <button className="flex items-center text-sm text-blue-500">
                <Filter className="h-4 w-4 mr-1" />
                <span>Filter</span>
              </button>
            </div>
          </div>
          
          <ProductionMetrics />
        </div>
        
        <div className="col-span-full">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Monthly Production Output</h3>
              <button className="flex items-center text-sm text-blue-500">
                <BarChartIcon className="h-4 w-4 mr-1" />
                <span>View Details</span>
              </button>
            </div>
            <div className="h-64">
              <ProductionOverview />
            </div>
          </div>
        </div>
      </SAPSection>

      <SAPSection title="Production Orders" isVoiceAssistantEnabled={isEnabled}>
        <div className="col-span-full">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Active Orders</h3>
              <div className="flex items-center space-x-2">
                <button className="px-3 py-1 text-sm border rounded">Export</button>
                <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded">Create Order</button>
              </div>
            </div>
            <ProductionOrders />
          </div>
        </div>
      </SAPSection>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="bg-purple-100 p-2 rounded-lg mr-4">
                <FileText className="h-5 w-5 text-purple-600" />
              </div>
              <h2 className="text-lg font-semibold">Documentation</h2>
            </div>
            <button className="text-sm text-blue-500">View All</button>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 border-b">
              <div>
                <p className="font-medium">Standard Operating Procedures</p>
                <p className="text-xs text-gray-500">Production line setup and operation</p>
              </div>
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">PDF</span>
            </div>
            <div className="flex justify-between items-center p-3 border-b">
              <div>
                <p className="font-medium">Quality Control Manual</p>
                <p className="text-xs text-gray-500">Testing protocols and standards</p>
              </div>
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">PDF</span>
            </div>
            <div className="flex justify-between items-center p-3">
              <div>
                <p className="font-medium">Equipment Maintenance Guide</p>
                <p className="text-xs text-gray-500">Preventative maintenance schedules</p>
              </div>
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">PDF</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="bg-teal-100 p-2 rounded-lg mr-4">
                <Users className="h-5 w-5 text-teal-600" />
              </div>
              <h2 className="text-lg font-semibold">Production Team</h2>
            </div>
            <button className="text-sm text-blue-500">Manage</button>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 border-b">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-200 rounded-full mr-3"></div>
                <div>
                  <p className="font-medium">Sarah Johnson</p>
                  <p className="text-xs text-gray-500">Production Manager</p>
                </div>
              </div>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Online</span>
            </div>
            <div className="flex justify-between items-center p-3 border-b">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-200 rounded-full mr-3"></div>
                <div>
                  <p className="font-medium">Michael Chen</p>
                  <p className="text-xs text-gray-500">Quality Control Supervisor</p>
                </div>
              </div>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Online</span>
            </div>
            <div className="flex justify-between items-center p-3">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-200 rounded-full mr-3"></div>
                <div>
                  <p className="font-medium">David Williams</p>
                  <p className="text-xs text-gray-500">Line Supervisor</p>
                </div>
              </div>
              <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Offline</span>
            </div>
          </div>
        </div>
      </div>

      <SAPSection title="Inventory Management" isVoiceAssistantEnabled={isEnabled}>
        <div className="col-span-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <InventoryManagement />
          </div>
        </div>
      </SAPSection>
    </div>
  );
};

export default Manufacturing;

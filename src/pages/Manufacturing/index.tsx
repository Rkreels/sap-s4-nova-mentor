
import React, { useEffect } from 'react';
import { useVoiceAssistantContext } from '../../context/VoiceAssistantContext';
import { useVoiceAssistant } from '../../hooks/useVoiceAssistant';
import PageHeader from '../../components/page/PageHeader';
import SAPSection from '../../components/SAPSection';
import ProductionOverview from './components/ProductionOverview';
import ProductionMetrics from './components/ProductionMetrics';
import ProductionChart from './components/ProductionChart';
import ProductionOrders from './components/ProductionOrders';
import InventoryManagement from './components/InventoryManagement';
import { BarChartIcon, Clock, Filter } from 'lucide-react';

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

      <SAPSection title="Production Overview">
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
            <ProductionChart />
          </div>
        </div>
      </SAPSection>

      <SAPSection title="Production Orders">
        <div className="col-span-full">
          <ProductionOrders />
        </div>
      </SAPSection>

      <SAPSection title="Inventory Management">
        <div className="col-span-full">
          <InventoryManagement />
        </div>
      </SAPSection>
    </div>
  );
};

export default Manufacturing;

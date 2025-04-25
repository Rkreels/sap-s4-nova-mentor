
import React from 'react';
import { useVoiceAssistantContext } from '../../context/VoiceAssistantContext';
import PageHeader from '../../components/page/PageHeader';
import SAPSection from '../../components/SAPSection';
import ProductionOverview from './components/ProductionOverview';
import ProductionOrders from './components/ProductionOrders';
import InventoryManagement from './components/InventoryManagement';

const Manufacturing: React.FC = () => {
  const { isEnabled } = useVoiceAssistantContext();
  
  return (
    <div>
      <PageHeader 
        title="Manufacturing and Supply Chain" 
        voiceIntroduction={`Welcome to the Manufacturing and Supply Chain module. Here you can monitor production efficiency, 
        manage orders, and track inventory levels. For example, you can use the Production Overview section to see 
        real-time metrics like efficiency rates and quality scores. The Production Orders section allows you to 
        create and manage manufacturing orders, while Inventory Management helps you maintain optimal stock levels.`}
      />

      <SAPSection 
        title="Production Overview" 
        isVoiceAssistantEnabled={isEnabled}
        description="Monitor your production performance and key metrics."
        examples="View production efficiency, active orders, and quality metrics at a glance. The production chart shows monthly output trends."
      >
        <ProductionOverview />
      </SAPSection>

      <SAPSection 
        title="Production Orders" 
        isVoiceAssistantEnabled={isEnabled}
        description="Manage and track production orders in real-time."
        examples="Create new production orders, monitor their progress, and view completion status."
      >
        <ProductionOrders />
      </SAPSection>

      <SAPSection 
        title="Inventory Management" 
        isVoiceAssistantEnabled={isEnabled}
        description="Monitor and manage your inventory levels."
        examples="Track current stock levels, process goods receipts and issues, and monitor inventory movements."
      >
        <InventoryManagement />
      </SAPSection>
    </div>
  );
};

export default Manufacturing;

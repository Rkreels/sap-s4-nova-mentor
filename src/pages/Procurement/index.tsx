
import React from 'react';
import { useVoiceAssistantContext } from '../../context/VoiceAssistantContext';
import PageHeader from '../../components/page/PageHeader';
import SAPSection from '../../components/SAPSection';
import PurchaseOrders from './components/PurchaseOrders';
import SupplierManagement from './components/SupplierManagement';
import ProcurementAnalytics from './components/ProcurementAnalytics';

const Procurement: React.FC = () => {
  const { isEnabled } = useVoiceAssistantContext();
  
  return (
    <div>
      <PageHeader 
        title="Procurement" 
        voiceIntroduction="Welcome to the Procurement module. Here you can manage purchasing, supplier relationships, and sourcing activities. This module streamlines your procurement process from requisition to payment."
      />

      <SAPSection 
        title="Purchase Orders" 
        isVoiceAssistantEnabled={isEnabled}
        description="Create and manage purchase orders."
        examples="Use this section to create new orders for goods or services, track order status, and manage the entire purchasing lifecycle."
      >
        <PurchaseOrders />
      </SAPSection>

      <SAPSection 
        title="Supplier Management" 
        isVoiceAssistantEnabled={isEnabled}
        description="Manage supplier relationships and contracts."
        examples="This section allows you to maintain your supplier database, evaluate supplier performance, and manage contracts and agreements."
      >
        <SupplierManagement />
      </SAPSection>

      <SAPSection 
        title="Procurement Analytics" 
        isVoiceAssistantEnabled={isEnabled}
        description="Analyze spending patterns and procurement metrics."
        examples="Use these analytics tools to track spending by category, identify savings opportunities, and optimize your procurement strategies."
      >
        <ProcurementAnalytics />
      </SAPSection>
    </div>
  );
};

export default Procurement;

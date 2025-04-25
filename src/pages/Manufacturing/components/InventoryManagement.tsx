
import React from 'react';
import SAPTile from '../../../components/SAPTile';
import { useVoiceAssistantContext } from '../../../context/VoiceAssistantContext';

const InventoryManagement: React.FC = () => {
  const { isEnabled } = useVoiceAssistantContext();
  
  return (
    <>
      <SAPTile 
        title="Stock Overview"
        isVoiceAssistantEnabled={isEnabled}
        description="View current stock levels and inventory status."
        icon={<span className="text-xl">📊</span>}
        examples="The Stock Overview provides a comprehensive view of your current inventory. You can see stock levels by location, check for low stock items, and view inventory valuations."
      />
      <SAPTile 
        title="Goods Movement"
        isVoiceAssistantEnabled={isEnabled}
        description="Process goods receipts and issues."
        icon={<span className="text-xl">🔄</span>}
        examples="Use the Goods Movement function to record inventory transactions like receipts from vendors, issues to production, or transfers between storage locations."
      />
      <SAPTile 
        title="Inventory Reports"
        isVoiceAssistantEnabled={isEnabled}
        description="Access detailed inventory reporting and analytics."
        icon={<span className="text-xl">📈</span>}
        examples="Generate reports to analyze inventory turnover, identify slow-moving items, and optimize stock levels based on historical consumption patterns."
      />
      <SAPTile 
        title="Material Master"
        isVoiceAssistantEnabled={isEnabled}
        description="Manage material master data and specifications."
        icon={<span className="text-xl">📋</span>}
        examples="The Material Master contains all key information about materials including specifications, units of measure, and purchasing data."
      />
    </>
  );
};

export default InventoryManagement;

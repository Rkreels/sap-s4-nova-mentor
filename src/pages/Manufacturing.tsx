
import React, { useState, useEffect } from 'react';
import SAPSection from '../components/SAPSection';
import SAPTile from '../components/SAPTile';
import { useVoiceAssistant } from '../hooks/useVoiceAssistant';

const Manufacturing: React.FC = () => {
  const [isVoiceAssistantEnabled, setIsVoiceAssistantEnabled] = useState(false);
  const { speak } = useVoiceAssistant();
  
  useEffect(() => {
    const checkVoiceAssistant = () => {
      const enabled = localStorage.getItem('voiceAssistantEnabled') === 'true';
      setIsVoiceAssistantEnabled(enabled);
      
      if (enabled) {
        speak("Welcome to the Manufacturing and Supply Chain module. Here you can manage production planning, inventory, and supply chain operations.");
      }
    };
    
    checkVoiceAssistant();
  }, [speak]);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Manufacturing and Supply Chain</h1>

      <SAPSection 
        title="Production Planning" 
        isVoiceAssistantEnabled={isVoiceAssistantEnabled}
        description="Manage your production orders and planning activities."
      >
        <SAPTile 
          title="Production Orders"
          isVoiceAssistantEnabled={isVoiceAssistantEnabled}
          description="Create and manage production orders for your manufacturing processes."
          icon={<span className="text-xl">🏭</span>}
        />
        <SAPTile 
          title="Material Requirements"
          isVoiceAssistantEnabled={isVoiceAssistantEnabled}
          description="View and manage material requirements for production."
          icon={<span className="text-xl">📦</span>}
        />
      </SAPSection>

      <SAPSection 
        title="Inventory Management" 
        isVoiceAssistantEnabled={isVoiceAssistantEnabled}
        description="Monitor and manage your inventory levels."
      >
        <SAPTile 
          title="Stock Overview"
          isVoiceAssistantEnabled={isVoiceAssistantEnabled}
          description="View current stock levels and inventory status."
          icon={<span className="text-xl">📊</span>}
        />
        <SAPTile 
          title="Goods Movement"
          isVoiceAssistantEnabled={isVoiceAssistantEnabled}
          description="Process goods receipts and issues."
          icon={<span className="text-xl">🔄</span>}
        />
      </SAPSection>
    </div>
  );
};

export default Manufacturing;

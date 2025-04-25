
import React, { useState, useEffect } from 'react';
import SAPSection from '../components/SAPSection';
import SAPTile from '../components/SAPTile';
import { useVoiceAssistant } from '../hooks/useVoiceAssistant';

const Procurement: React.FC = () => {
  const [isVoiceAssistantEnabled, setIsVoiceAssistantEnabled] = useState(false);
  const { speak } = useVoiceAssistant();
  
  useEffect(() => {
    const checkVoiceAssistant = () => {
      const enabled = localStorage.getItem('voiceAssistantEnabled') === 'true';
      setIsVoiceAssistantEnabled(enabled);
      
      if (enabled) {
        speak("Welcome to the Procurement module. Here you can manage purchasing, supplier relationships, and sourcing activities.");
      }
    };
    
    checkVoiceAssistant();
  }, [speak]);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Procurement</h1>

      <SAPSection 
        title="Purchase Orders" 
        isVoiceAssistantEnabled={isVoiceAssistantEnabled}
        description="Create and manage purchase orders."
      >
        <SAPTile 
          title="Create Purchase Order"
          isVoiceAssistantEnabled={isVoiceAssistantEnabled}
          description="Create new purchase orders for goods or services."
          icon={<span className="text-xl">📝</span>}
        />
        <SAPTile 
          title="Purchase Order Overview"
          isVoiceAssistantEnabled={isVoiceAssistantEnabled}
          description="View and manage existing purchase orders."
          icon={<span className="text-xl">📋</span>}
        />
      </SAPSection>

      <SAPSection 
        title="Supplier Management" 
        isVoiceAssistantEnabled={isVoiceAssistantEnabled}
        description="Manage supplier relationships and contracts."
      >
        <SAPTile 
          title="Supplier Directory"
          isVoiceAssistantEnabled={isVoiceAssistantEnabled}
          description="Access your supplier database and information."
          icon={<span className="text-xl">👥</span>}
        />
        <SAPTile 
          title="Contracts"
          isVoiceAssistantEnabled={isVoiceAssistantEnabled}
          description="Manage supplier contracts and agreements."
          icon={<span className="text-xl">📄</span>}
        />
      </SAPSection>
    </div>
  );
};

export default Procurement;

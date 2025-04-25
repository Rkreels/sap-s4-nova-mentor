
import React, { useState, useEffect } from 'react';
import SAPSection from '../components/SAPSection';
import SAPTile from '../components/SAPTile';
import { useVoiceAssistant } from '../hooks/useVoiceAssistant';

const Sales: React.FC = () => {
  const [isVoiceAssistantEnabled, setIsVoiceAssistantEnabled] = useState(false);
  const { speak } = useVoiceAssistant();
  
  useEffect(() => {
    const checkVoiceAssistant = () => {
      const enabled = localStorage.getItem('voiceAssistantEnabled') === 'true';
      setIsVoiceAssistantEnabled(enabled);
      
      if (enabled) {
        speak("Welcome to the Sales module. Here you can manage sales orders, customer relationships, and billing activities.");
      }
    };
    
    checkVoiceAssistant();
  }, [speak]);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Sales</h1>

      <SAPSection 
        title="Sales Orders" 
        isVoiceAssistantEnabled={isVoiceAssistantEnabled}
        description="Manage customer orders and sales transactions."
      >
        <SAPTile 
          title="Create Sales Order"
          isVoiceAssistantEnabled={isVoiceAssistantEnabled}
          description="Create new sales orders for customers."
          icon={<span className="text-xl">📝</span>}
        />
        <SAPTile 
          title="Order Overview"
          isVoiceAssistantEnabled={isVoiceAssistantEnabled}
          description="View and manage existing sales orders."
          icon={<span className="text-xl">📊</span>}
        />
      </SAPSection>

      <SAPSection 
        title="Customer Management" 
        isVoiceAssistantEnabled={isVoiceAssistantEnabled}
        description="Manage customer relationships and accounts."
      >
        <SAPTile 
          title="Customer Directory"
          isVoiceAssistantEnabled={isVoiceAssistantEnabled}
          description="Access your customer database."
          icon={<span className="text-xl">👥</span>}
        />
        <SAPTile 
          title="Customer Analytics"
          isVoiceAssistantEnabled={isVoiceAssistantEnabled}
          description="View customer-related analytics and reports."
          icon={<span className="text-xl">📈</span>}
        />
      </SAPSection>
    </div>
  );
};

export default Sales;

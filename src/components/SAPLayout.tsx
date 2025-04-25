
import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import SAPHeader from './SAPHeader';
import SAPNavigationBar from './SAPNavigationBar';
import VoiceAssistant from './VoiceAssistant';

const SAPLayout: React.FC = () => {
  const [isVoiceAssistantEnabled, setIsVoiceAssistantEnabled] = useState(false);
  
  // Store the voice assistant state in localStorage to ensure consistency
  useEffect(() => {
    localStorage.setItem('voiceAssistantEnabled', isVoiceAssistantEnabled.toString());
  }, [isVoiceAssistantEnabled]);
  
  const toggleVoiceAssistant = () => {
    setIsVoiceAssistantEnabled(!isVoiceAssistantEnabled);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <SAPHeader 
        toggleVoiceAssistant={toggleVoiceAssistant} 
        isVoiceAssistantEnabled={isVoiceAssistantEnabled} 
      />
      <SAPNavigationBar isVoiceAssistantEnabled={isVoiceAssistantEnabled} />
      
      <main className="flex-1 p-4">
        <Outlet />
      </main>
      
      <VoiceAssistant 
        isEnabled={isVoiceAssistantEnabled} 
        toggleEnabled={toggleVoiceAssistant} 
      />
    </div>
  );
};

export default SAPLayout;

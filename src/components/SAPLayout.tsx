
import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import SAPHeader from './SAPHeader';
import SAPNavigationBar from './SAPNavigationBar';
import VoiceAssistant from './VoiceAssistant';
import { VoiceAssistantProvider } from '../context/VoiceAssistantContext';

const SAPLayout: React.FC = () => {
  const [isVoiceAssistantEnabled, setIsVoiceAssistantEnabled] = useState(false);
  
  // Initialize the voice assistant state from localStorage on component mount
  useEffect(() => {
    const savedState = localStorage.getItem('voiceAssistantEnabled') === 'true';
    setIsVoiceAssistantEnabled(savedState);
  }, []);
  
  // Store the voice assistant state in localStorage to ensure consistency
  useEffect(() => {
    localStorage.setItem('voiceAssistantEnabled', isVoiceAssistantEnabled.toString());
  }, [isVoiceAssistantEnabled]);
  
  const toggleVoiceAssistant = () => {
    setIsVoiceAssistantEnabled(prevState => !prevState);
  };
  
  return (
    <VoiceAssistantProvider value={{ isEnabled: isVoiceAssistantEnabled, toggle: toggleVoiceAssistant }}>
      <div className="flex flex-col min-h-screen">
        <SAPHeader />
        <SAPNavigationBar />
        
        <main className="flex-1 p-4">
          <Outlet />
        </main>
        
        <VoiceAssistant />
      </div>
    </VoiceAssistantProvider>
  );
};

export default SAPLayout;

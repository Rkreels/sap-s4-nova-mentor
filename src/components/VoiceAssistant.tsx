
import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useVoiceAssistant } from '../hooks/useVoiceAssistant';

interface VoiceAssistantProps {
  isEnabled: boolean;
  toggleEnabled: () => void;
}

const VoiceAssistant: React.FC<VoiceAssistantProps> = ({ isEnabled, toggleEnabled }) => {
  const { speak, isSpeaking } = useVoiceAssistant();

  const handleToggle = () => {
    const newState = !isEnabled;
    toggleEnabled();
    
    if (newState) {
      speak("Voice assistant is now active. I'll guide you through the SAP S/4HANA interface. Hover over elements to learn about them.");
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={handleToggle}
        className={`flex items-center justify-center p-3 rounded-full shadow-lg transition-colors ${
          isEnabled ? 'bg-sap-blue text-white' : 'bg-white text-gray-500'
        } ${isSpeaking ? 'animate-pulse' : ''}`}
        title={isEnabled ? "Disable Voice Assistant" : "Enable Voice Assistant"}
      >
        {isEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
      </button>
      
      {isEnabled && (
        <div className="absolute bottom-16 right-0 bg-white p-3 rounded shadow-lg w-64 animate-fade-in">
          <p className="text-xs mb-2 font-medium">Voice Assistant Active</p>
          <p className="text-xs text-gray-500">
            Hover over elements to hear explanations about them. Click on elements to learn more.
          </p>
        </div>
      )}
    </div>
  );
};

export default VoiceAssistant;

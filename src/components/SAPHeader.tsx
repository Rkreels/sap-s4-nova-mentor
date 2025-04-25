
import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Bell, HelpCircle } from 'lucide-react';
import { useVoiceAssistant } from '../hooks/useVoiceAssistant';

interface SAPHeaderProps {
  toggleVoiceAssistant: () => void;
  isVoiceAssistantEnabled: boolean;
}

const SAPHeader: React.FC<SAPHeaderProps> = ({ toggleVoiceAssistant, isVoiceAssistantEnabled }) => {
  const { speak } = useVoiceAssistant();
  
  const handleLogoHover = () => {
    if (isVoiceAssistantEnabled) {
      speak("This is the SAP logo. Clicking it will take you to the home page.");
    }
  };

  const handleSearchHover = () => {
    if (isVoiceAssistantEnabled) {
      speak("This is the search function. You can search for applications, reports, and other items throughout the system.");
    }
  };

  const handleHelpHover = () => {
    if (isVoiceAssistantEnabled) {
      speak("This is the help button. Click it to access help resources and documentation.");
    }
  };

  const handleNotificationsHover = () => {
    if (isVoiceAssistantEnabled) {
      speak("This is the notifications center. Here you can view system alerts and messages.");
    }
  };

  const handleUserHover = () => {
    if (isVoiceAssistantEnabled) {
      speak("This is your user profile. Click it to access your account settings and preferences.");
    }
  };

  return (
    <header className="bg-white shadow-sm w-full">
      <div className="flex items-center justify-between px-4 h-16">
        <div className="flex items-center">
          <Link to="/" className="flex items-center" onMouseEnter={handleLogoHover}>
            <div className="h-8 w-14 bg-sap-blue flex items-center justify-center rounded text-white font-bold">
              SAP
            </div>
            <span className="ml-3 font-semibold text-sap-text">Home</span>
            <span className="ml-1">▼</span>
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          <button 
            className="p-2 rounded-full hover:bg-gray-100" 
            onMouseEnter={handleSearchHover}
            onClick={() => {
              if (isVoiceAssistantEnabled) {
                speak("The search function allows you to quickly find what you need across the entire SAP system. You can search for transactions, reports, or any other information.");
              }
            }}
          >
            <Search className="h-5 w-5 text-gray-600" />
          </button>
          
          <button 
            className="p-2 rounded-full hover:bg-gray-100"
            onMouseEnter={handleHelpHover}
            onClick={() => {
              if (isVoiceAssistantEnabled) {
                speak("The help center provides detailed information about how to use the SAP system, including tutorials, documentation, and troubleshooting guides.");
              }
            }}
          >
            <HelpCircle className="h-5 w-5 text-gray-600" />
          </button>
          
          <button 
            className="p-2 rounded-full hover:bg-gray-100"
            onMouseEnter={handleNotificationsHover}
            onClick={() => {
              if (isVoiceAssistantEnabled) {
                speak("The notification center shows you important alerts, messages, and updates that require your attention.");
              }
            }}
          >
            <Bell className="h-5 w-5 text-gray-600" />
          </button>
          
          <button 
            className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-medium"
            onMouseEnter={handleUserHover}
            onClick={() => {
              if (isVoiceAssistantEnabled) {
                speak("This user profile menu allows you to manage your account settings, preferences, and log out of the system.");
              }
            }}
          >
            UT
          </button>
        </div>
      </div>
    </header>
  );
};

export default SAPHeader;

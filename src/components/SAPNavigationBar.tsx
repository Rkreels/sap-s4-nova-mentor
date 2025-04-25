
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { useVoiceAssistant } from '../hooks/useVoiceAssistant';

interface SAPNavigationBarProps {
  isVoiceAssistantEnabled: boolean;
}

const SAPNavigationBar: React.FC<SAPNavigationBarProps> = ({ isVoiceAssistantEnabled }) => {
  const { speak } = useVoiceAssistant();
  const location = useLocation();
  
  const navItems = [
    { name: 'My Home', path: '/' },
    { name: 'Trial Center', path: '/trial-center' },
    { name: 'Finance', path: '/finance' },
    { name: 'Manufacturing and Supply Chain', path: '/manufacturing' },
    { name: 'Procurement', path: '/procurement' },
    { name: 'Project Management', path: '/project-management' },
    { name: 'Sales', path: '/sales' },
    { name: 'Other', path: '/other' },
  ];

  const handleNavItemHover = (item: string) => {
    if (isVoiceAssistantEnabled) {
      speak(`This is the ${item} navigation item. Click to access ${item} related features and functions.`);
    }
  };

  const handleNavItemClick = (item: string) => {
    if (isVoiceAssistantEnabled) {
      speak(`You are now navigating to the ${item} area. This module contains all functionality related to ${item}.`);
    }
  };

  const handleMenuButtonHover = () => {
    if (isVoiceAssistantEnabled) {
      speak("This is the menu button. Click it to expand or collapse the sidebar navigation.");
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 w-full">
      <div className="flex items-center h-12">
        <button 
          className="flex items-center justify-center h-12 w-12 hover:bg-gray-100" 
          onMouseEnter={handleMenuButtonHover}
          onClick={() => {
            if (isVoiceAssistantEnabled) {
              speak("This menu button toggles the sidebar navigation, which provides access to additional features and functions.");
            }
          }}
        >
          <Menu className="h-5 w-5 text-gray-600" />
        </button>
        
        <div className="flex overflow-x-auto hide-scrollbar">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-4 h-full flex items-center whitespace-nowrap ${
                location.pathname === item.path 
                  ? 'text-sap-blue border-b-2 border-sap-blue font-medium' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
              onMouseEnter={() => handleNavItemHover(item.name)}
              onClick={() => handleNavItemClick(item.name)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default SAPNavigationBar;

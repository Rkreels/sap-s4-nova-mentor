
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useVoiceAssistant } from '../hooks/useVoiceAssistant';
import { useVoiceAssistantContext } from '../context/VoiceAssistantContext';

const SAPNavigationBar: React.FC = () => {
  const { isEnabled } = useVoiceAssistantContext();
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
    if (isEnabled) {
      speak(`This is the ${item} navigation item. Click to access ${item} related features and functions.`);
    }
  };

  const handleNavItemClick = (item: string) => {
    if (isEnabled) {
      speak(`You are now navigating to the ${item} area. This module contains all functionality related to ${item}.`);
    }
  };

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') {
      return true;
    }
    return location.pathname.startsWith(path) && path !== '/';
  };

  return (
    <nav className="bg-white border-b border-gray-200 w-full overflow-hidden">
      <div className="flex items-center h-12 overflow-x-auto hide-scrollbar">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`px-4 h-full flex items-center whitespace-nowrap ${
              isActive(item.path) 
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
    </nav>
  );
};

export default SAPNavigationBar;

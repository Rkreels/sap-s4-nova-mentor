
import React, { useState } from 'react';
import SAPTile from '../../../components/SAPTile';
import { useVoiceAssistantContext } from '../../../context/VoiceAssistantContext';
import { Edit, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PageSectionProps {
  title: string;
  onManagePages?: () => void;
  onSettings?: () => void;
}

const PageSection: React.FC<PageSectionProps> = ({
  title,
  onManagePages,
  onSettings
}) => {
  const { isEnabled } = useVoiceAssistantContext();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4 relative">
        <h2 className="sap-section-title flex items-center">
          {title}
          <button 
            onClick={() => setShowDropdown(!showDropdown)}
            className="ml-2 text-blue-600"
          >
            <span className="text-xs">▼</span>
          </button>
        </h2>
        
        {showDropdown && (
          <div className="absolute top-full left-0 bg-white border shadow-sm rounded-md z-10">
            <div className="py-2">
              <button onClick={onManagePages} className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 w-full text-left">
                <Edit className="h-4 w-4 mr-2 text-gray-400" />
                <span>Manage Pages</span>
              </button>
              <button onClick={onSettings} className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 w-full text-left">
                <Settings className="h-4 w-4 mr-2 text-gray-400" />
                <span>My Home Settings</span>
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <SAPTile 
          title="Overview" 
          subtitle="Trial Center" 
          isVoiceAssistantEnabled={isEnabled}
          description="This tile gives you access to the overview dashboard of the Trial Center module."
          onClick={() => navigate('/trial-center')}
        >
          <div className="flex items-center justify-center h-16 w-full bg-blue-600 text-white rounded">
            <span className="text-2xl">📊</span>
          </div>
        </SAPTile>
        
        <SAPTile 
          title="Finance" 
          isVoiceAssistantEnabled={isEnabled}
          description="Access the Finance module for accounting, financial reporting, and treasury management."
          onClick={() => navigate('/finance')}
        >
          <div className="flex items-center justify-center h-16 w-full bg-pink-600 text-white rounded">
            <span className="text-2xl">📈</span>
          </div>
        </SAPTile>
        
        <SAPTile 
          title="Manufacturing and Supply Chain" 
          isVoiceAssistantEnabled={isEnabled}
          description="Access manufacturing operations, supply chain planning, and inventory management."
          onClick={() => navigate('/manufacturing')}
        >
          <div className="flex items-center justify-center h-16 w-full bg-orange-600 text-white rounded">
            <span className="text-2xl">🏭</span>
          </div>
        </SAPTile>
        
        <SAPTile 
          title="Procurement" 
          isVoiceAssistantEnabled={isEnabled}
          description="Access procurement functions like vendor management, purchase orders, and contract management."
          onClick={() => navigate('/procurement')}
        >
          <div className="flex items-center justify-center h-16 w-full bg-purple-600 text-white rounded">
            <span className="text-2xl">🛒</span>
          </div>
        </SAPTile>
        
        <SAPTile 
          title="Project Management" 
          isVoiceAssistantEnabled={isEnabled}
          description="Access project planning, execution, and monitoring tools."
          onClick={() => navigate('/project-management')}
        >
          <div className="flex items-center justify-center h-16 w-full bg-red-700 text-white rounded">
            <span className="text-2xl">📋</span>
          </div>
        </SAPTile>
        
        <SAPTile 
          title="Sales" 
          isVoiceAssistantEnabled={isEnabled}
          description="Access sales order management, billing, and customer relationship management functions."
          onClick={() => navigate('/sales')}
        >
          <div className="flex items-center justify-center h-16 w-full bg-teal-600 text-white rounded">
            <span className="text-2xl">💼</span>
          </div>
        </SAPTile>
        
        <SAPTile 
          title="Other" 
          isVoiceAssistantEnabled={isEnabled}
          description="Access additional modules and functions not categorized in the main sections."
          onClick={() => navigate('/other')}
        >
          <div className="flex items-center justify-center h-16 w-full bg-fuchsia-600 text-white rounded">
            <span className="text-2xl">📄</span>
          </div>
        </SAPTile>
      </div>
    </div>
  );
};

export default PageSection;

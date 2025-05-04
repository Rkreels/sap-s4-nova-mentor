
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { useVoiceAssistantContext } from '../../context/VoiceAssistantContext';
import { useVoiceAssistant } from '../../hooks/useVoiceAssistant';
import PageHeader from '../../components/page/PageHeader';
import { ArrowLeft, ClipboardCheck, FileText, Search, Users } from 'lucide-react';
import { Card } from '../../components/ui/card';
import SAPTile from '../../components/SAPTile';

const QualityPage: React.FC = () => {
  const navigate = useNavigate();
  const { isEnabled } = useVoiceAssistantContext();
  const { speak } = useVoiceAssistant();

  React.useEffect(() => {
    if (isEnabled) {
      speak('You are now in the Quality Management page. Here you can manage quality inspections, results, and quality-related processes.');
    }
  }, [isEnabled, speak]);

  const handleTileClick = (action: string) => {
    console.log(`Quality - ${action} clicked`);
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex items-center mb-4">
        <Button 
          variant="outline" 
          size="sm" 
          className="mr-4"
          onClick={() => navigate('/manufacturing')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back
        </Button>
        <PageHeader
          title="Quality Management"
          description="Manage quality inspections, results, and quality-related processes"
          voiceIntroduction="Welcome to Quality Management. Here you can manage all quality control activities."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm text-gray-500 mb-2">Quality Rating</h3>
          <div className="text-3xl font-semibold mb-2">96.3%</div>
          <div className="flex items-center">
            <span className="text-green-500 text-sm font-medium">↑ 0.8%</span>
            <span className="text-xs text-gray-500 ml-2">vs last week</span>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm text-gray-500 mb-2">Open Inspections</h3>
          <div className="text-3xl font-semibold mb-2">161</div>
          <div className="flex items-center">
            <span className="text-red-500 text-sm font-medium">↑ 23</span>
            <span className="text-xs text-gray-500 ml-2">vs yesterday</span>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm text-gray-500 mb-2">Defect Rate</h3>
          <div className="text-3xl font-semibold mb-2">3.7%</div>
          <div className="flex items-center">
            <span className="text-green-500 text-sm font-medium">↓ 0.5%</span>
            <span className="text-xs text-gray-500 ml-2">vs last month</span>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm text-gray-500 mb-2">Quality Incidents</h3>
          <div className="text-3xl font-semibold mb-2">12</div>
          <div className="flex items-center">
            <span className="text-green-500 text-sm font-medium">↓ 3</span>
            <span className="text-xs text-gray-500 ml-2">vs last month</span>
          </div>
        </div>
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-6">Quality Management Functions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <SAPTile 
            title="Quality Technician Overview"
            isVoiceAssistantEnabled={isEnabled}
            icon={<Users className="h-5 w-5 text-blue-600" />}
            description="View quality technicians workload and assignments"
            onClick={() => handleTileClick('Quality Technician Overview')}
          />
          
          <SAPTile 
            title="Manage Inspection Lots"
            isVoiceAssistantEnabled={isEnabled}
            icon={<FileText className="h-5 w-5 text-blue-600" />}
            description="Create and manage quality inspection lots"
            onClick={() => handleTileClick('Manage Inspection Lots')}
          />
          
          <SAPTile 
            title="Record Inspection Results"
            isVoiceAssistantEnabled={isEnabled}
            icon={<ClipboardCheck className="h-5 w-5 text-blue-600" />}
            value="161"
            description="Record and manage inspection results and findings"
            onClick={() => handleTileClick('Record Inspection Results')}
          />
          
          <SAPTile 
            title="Quality Notifications"
            isVoiceAssistantEnabled={isEnabled}
            icon={<Search className="h-5 w-5 text-blue-600" />}
            description="Create and manage quality notifications"
            onClick={() => handleTileClick('Quality Notifications')}
          />
        </div>
      </Card>
    </div>
  );
};

export default QualityPage;

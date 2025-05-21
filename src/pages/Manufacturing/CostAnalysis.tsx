
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { useVoiceAssistantContext } from '../../context/VoiceAssistantContext';
import { useVoiceAssistant } from '../../hooks/useVoiceAssistant';
import PageHeader from '../../components/page/PageHeader';
import { ArrowLeft } from 'lucide-react';
import { Card } from '../../components/ui/card';
import DataTable from '../../components/data/DataTable';

const CostAnalysis: React.FC = () => {
  const navigate = useNavigate();
  const { isEnabled } = useVoiceAssistantContext();
  const { speak } = useVoiceAssistant();

  React.useEffect(() => {
    if (isEnabled) {
      speak('You are now viewing Cost Analysis. This page provides detailed manufacturing cost analysis.');
    }
  }, [isEnabled, speak]);

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
          title="Cost Analysis"
          description="Analyze manufacturing costs and cost drivers"
          voiceIntroduction="Welcome to Cost Analysis. Here you can analyze manufacturing costs and cost drivers."
        />
      </div>
      
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Manufacturing Cost Analysis</h2>
        <p className="text-gray-500">Cost analysis functionality will be implemented here.</p>
      </Card>
    </div>
  );
};

export default CostAnalysis;

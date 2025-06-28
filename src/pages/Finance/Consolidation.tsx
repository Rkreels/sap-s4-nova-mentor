
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { ArrowLeft, Building2, Globe, Layers, TrendingUp } from 'lucide-react';
import PageHeader from '../../components/page/PageHeader';
import { useVoiceAssistantContext } from '../../context/VoiceAssistantContext';
import { useVoiceAssistant } from '../../hooks/useVoiceAssistant';
import VoiceTrainingComponent from '../../components/procurement/VoiceTrainingComponent';

const Consolidation: React.FC = () => {
  const navigate = useNavigate();
  const { isEnabled } = useVoiceAssistantContext();
  const { speak } = useVoiceAssistant();

  useEffect(() => {
    if (isEnabled) {
      speak('Welcome to Financial Consolidation. Consolidate financial data across entities and prepare group financial statements with currency translation.');
    }
  }, [isEnabled, speak]);

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex items-center mb-4">
        <Button 
          variant="outline" 
          size="sm" 
          className="mr-4"
          onClick={() => navigate('/finance')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back
        </Button>
        <PageHeader
          title="Financial Consolidation"
          description="Consolidate financial data across entities and prepare group statements"
          voiceIntroduction="Welcome to Financial Consolidation for group reporting."
        />
      </div>

      <VoiceTrainingComponent 
        module="finance"
        topic="Financial Consolidation Process"
        examples={[
          "Setting up consolidation units and group hierarchy with ownership percentages and equity methods",
          "Processing currency translation and elimination entries for intercompany transactions",
          "Creating consolidated financial statements with minority interests and goodwill calculations"
        ]}
        detailLevel="advanced"
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Building2 className="h-8 w-8 mx-auto mb-2 text-blue-600" />
            <div className="text-2xl font-bold">8</div>
            <div className="text-sm text-muted-foreground">Consolidation Units</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Globe className="h-8 w-8 mx-auto mb-2 text-green-600" />
            <div className="text-2xl font-bold">5</div>
            <div className="text-sm text-muted-foreground">Currencies</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Layers className="h-8 w-8 mx-auto mb-2 text-purple-600" />
            <div className="text-2xl font-bold">12</div>
            <div className="text-sm text-muted-foreground">Reporting Periods</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-8 w-8 mx-auto mb-2 text-orange-600" />
            <div className="text-2xl font-bold">95%</div>
            <div className="text-sm text-muted-foreground">Data Completeness</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Financial Consolidation Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Financial Consolidation provides comprehensive group reporting capabilities including entity consolidation, 
            currency translation, elimination processing, and consolidated financial statement preparation.
          </p>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Full functionality coming soon...</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Consolidation;


import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { ArrowLeft, Calculator, TrendingUp, Target, BarChart3 } from 'lucide-react';
import PageHeader from '../../components/page/PageHeader';
import { useVoiceAssistantContext } from '../../context/VoiceAssistantContext';
import { useVoiceAssistant } from '../../hooks/useVoiceAssistant';
import VoiceTrainingComponent from '../../components/procurement/VoiceTrainingComponent';

const BudgetPlanning: React.FC = () => {
  const navigate = useNavigate();
  const { isEnabled } = useVoiceAssistantContext();
  const { speak } = useVoiceAssistant();

  useEffect(() => {
    if (isEnabled) {
      speak('Welcome to Budget Planning. Create, manage, and monitor budgets with variance analysis and forecasting capabilities.');
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
          title="Budget Planning"
          description="Create, manage, and monitor budgets with variance analysis"
          voiceIntroduction="Welcome to Budget Planning for comprehensive budget management."
        />
      </div>

      <VoiceTrainingComponent 
        module="finance"
        topic="Budget Planning and Control"
        examples={[
          "Creating annual budgets with departmental allocations and quarterly reviews",
          "Monitoring budget vs actual performance with variance analysis and exception reporting",
          "Managing budget transfers, supplements, and return processes with proper approval workflows"
        ]}
        detailLevel="advanced"
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Calculator className="h-8 w-8 mx-auto mb-2 text-blue-600" />
            <div className="text-2xl font-bold">$15.2M</div>
            <div className="text-sm text-muted-foreground">Annual Budget</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-8 w-8 mx-auto mb-2 text-green-600" />
            <div className="text-2xl font-bold">$12.8M</div>
            <div className="text-sm text-muted-foreground">YTD Actual</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Target className="h-8 w-8 mx-auto mb-2 text-purple-600" />
            <div className="text-2xl font-bold">84%</div>
            <div className="text-sm text-muted-foreground">Budget Utilization</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <BarChart3 className="h-8 w-8 mx-auto mb-2 text-orange-600" />
            <div className="text-2xl font-bold">+5.2%</div>
            <div className="text-sm text-muted-foreground">Variance</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Budget Planning Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Budget Planning provides comprehensive budgeting capabilities including budget creation, monitoring, 
            variance analysis, and forecasting to support effective financial planning and control.
          </p>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Full functionality coming soon...</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BudgetPlanning;

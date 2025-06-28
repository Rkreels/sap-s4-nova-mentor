
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { ArrowLeft, Calculator, PieChart, TrendingUp, Target } from 'lucide-react';
import PageHeader from '../../components/page/PageHeader';
import { useVoiceAssistantContext } from '../../context/VoiceAssistantContext';
import { useVoiceAssistant } from '../../hooks/useVoiceAssistant';
import VoiceTrainingComponent from '../../components/procurement/VoiceTrainingComponent';

const CostAccounting: React.FC = () => {
  const navigate = useNavigate();
  const { isEnabled } = useVoiceAssistantContext();
  const { speak } = useVoiceAssistant();

  useEffect(() => {
    if (isEnabled) {
      speak('Welcome to Cost Accounting. Manage cost centers, profit centers, and internal orders for accurate cost allocation and management reporting.');
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
          title="Cost Accounting"
          description="Manage cost centers, profit centers, and internal cost allocation"
          voiceIntroduction="Welcome to Cost Accounting for comprehensive cost management."
        />
      </div>

      <VoiceTrainingComponent 
        module="finance"
        topic="Cost Accounting Management"
        examples={[
          "Managing cost centers for departmental cost tracking and budget control with automated allocations",
          "Setting up profit centers for segment reporting and profitability analysis by business units",
          "Creating internal orders for project-based cost collection and WBS elements for complex projects"
        ]}
        detailLevel="advanced"
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Calculator className="h-8 w-8 mx-auto mb-2 text-blue-600" />
            <div className="text-2xl font-bold">125</div>
            <div className="text-sm text-muted-foreground">Cost Centers</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <PieChart className="h-8 w-8 mx-auto mb-2 text-green-600" />
            <div className="text-2xl font-bold">45</div>
            <div className="text-sm text-muted-foreground">Profit Centers</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-8 w-8 mx-auto mb-2 text-purple-600" />
            <div className="text-2xl font-bold">89</div>
            <div className="text-sm text-muted-foreground">Internal Orders</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Target className="h-8 w-8 mx-auto mb-2 text-orange-600" />
            <div className="text-2xl font-bold">$2.4M</div>
            <div className="text-sm text-muted-foreground">Monthly Costs</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Cost Accounting Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Cost Accounting in SAP S/4HANA provides comprehensive cost management capabilities including cost center accounting, 
            profit center accounting, and internal orders for accurate cost allocation and management reporting.
          </p>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Full functionality coming soon...</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CostAccounting;


import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { ArrowLeft, BarChart3, FileText, TrendingUp, PieChart } from 'lucide-react';
import PageHeader from '../../components/page/PageHeader';
import { useVoiceAssistantContext } from '../../context/VoiceAssistantContext';
import { useVoiceAssistant } from '../../hooks/useVoiceAssistant';
import VoiceTrainingComponent from '../../components/procurement/VoiceTrainingComponent';

const FinancialReporting: React.FC = () => {
  const navigate = useNavigate();
  const { isEnabled } = useVoiceAssistantContext();
  const { speak } = useVoiceAssistant();

  useEffect(() => {
    if (isEnabled) {
      speak('Welcome to Financial Reporting. Generate comprehensive financial statements, management reports, and regulatory filings with real-time data.');
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
          title="Financial Reporting"
          description="Generate comprehensive financial statements and management reports"
          voiceIntroduction="Welcome to Financial Reporting for comprehensive financial analysis."
        />
      </div>

      <VoiceTrainingComponent 
        module="finance"
        topic="Financial Reporting and Analysis"
        examples={[
          "Creating financial statements including balance sheet, income statement, and cash flow statement",
          "Generating management reports with KPIs, variance analysis, and drill-down capabilities",
          "Producing regulatory reports for compliance with local and international accounting standards"
        ]}
        detailLevel="advanced"
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <BarChart3 className="h-8 w-8 mx-auto mb-2 text-blue-600" />
            <div className="text-2xl font-bold">25</div>
            <div className="text-sm text-muted-foreground">Standard Reports</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <FileText className="h-8 w-8 mx-auto mb-2 text-green-600" />
            <div className="text-2xl font-bold">12</div>
            <div className="text-sm text-muted-foreground">Custom Reports</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-8 w-8 mx-auto mb-2 text-purple-600" />
            <div className="text-2xl font-bold">8</div>
            <div className="text-sm text-muted-foreground">KPI Dashboards</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <PieChart className="h-8 w-8 mx-auto mb-2 text-orange-600" />
            <div className="text-2xl font-bold">Real-time</div>
            <div className="text-sm text-muted-foreground">Data Updates</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Financial Reporting Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Financial Reporting provides comprehensive reporting capabilities including standard financial statements, 
            management reports, and regulatory filings with real-time data and embedded analytics.
          </p>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Full functionality coming soon...</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancialReporting;


import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { ArrowLeft, Calculator, FileText, AlertCircle, CheckCircle } from 'lucide-react';
import PageHeader from '../../components/page/PageHeader';
import { useVoiceAssistantContext } from '../../context/VoiceAssistantContext';
import { useVoiceAssistant } from '../../hooks/useVoiceAssistant';
import VoiceTrainingComponent from '../../components/procurement/VoiceTrainingComponent';

const TaxManagement: React.FC = () => {
  const navigate = useNavigate();
  const { isEnabled } = useVoiceAssistantContext();
  const { speak } = useVoiceAssistant();

  useEffect(() => {
    if (isEnabled) {
      speak('Welcome to Tax Management. Handle tax calculations, reporting, and compliance with automated tax processes and regulatory requirements.');
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
          title="Tax Management"
          description="Handle tax calculations, reporting, and compliance requirements"
          voiceIntroduction="Welcome to Tax Management for comprehensive tax compliance."
        />
      </div>

      <VoiceTrainingComponent 
        module="finance"
        topic="Tax Calculation and Compliance"
        examples={[
          "Configuring tax determination with tax codes, jurisdictions, and calculation procedures",
          "Managing VAT/GST processing with input and output tax calculations and reporting",
          "Handling withholding tax calculations and reporting for vendor and customer transactions"
        ]}
        detailLevel="advanced"
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Calculator className="h-8 w-8 mx-auto mb-2 text-blue-600" />
            <div className="text-2xl font-bold">$125K</div>
            <div className="text-sm text-muted-foreground">Monthly Tax Liability</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <FileText className="h-8 w-8 mx-auto mb-2 text-green-600" />
            <div className="text-2xl font-bold">15</div>
            <div className="text-sm text-muted-foreground">Tax Jurisdictions</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <AlertCircle className="h-8 w-8 mx-auto mb-2 text-orange-600" />
            <div className="text-2xl font-bold">3</div>
            <div className="text-sm text-muted-foreground">Pending Returns</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <CheckCircle className="h-8 w-8 mx-auto mb-2 text-purple-600" />
            <div className="text-2xl font-bold">98%</div>
            <div className="text-sm text-muted-foreground">Compliance Rate</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tax Management Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Tax Management provides comprehensive tax processing capabilities including tax determination, 
            calculation, reporting, and compliance management for various tax types and jurisdictions.
          </p>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Full functionality coming soon...</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaxManagement;

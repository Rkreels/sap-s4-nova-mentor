
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { useVoiceAssistantContext } from '../../context/VoiceAssistantContext';
import { useVoiceAssistant } from '../../hooks/useVoiceAssistant';
import PageHeader from '../../components/page/PageHeader';
import { ArrowLeft } from 'lucide-react';
import AccountsReceivableManagement from './components/AccountsReceivableManagement';

const AccountsReceivable: React.FC = () => {
  const navigate = useNavigate();
  const { isEnabled } = useVoiceAssistantContext();
  const { speak } = useVoiceAssistant();

  React.useEffect(() => {
    if (isEnabled) {
      speak('You are now in Accounts Receivable. Here you can manage customer invoices, payment collections, and receivables aging in the order-to-cash cycle.');
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
          title="Accounts Receivable"
          description="Manage customer invoices, payments, and receivables aging"
          voiceIntroduction="Welcome to Accounts Receivable management."
        />
      </div>

      <AccountsReceivableManagement />
    </div>
  );
};

export default AccountsReceivable;

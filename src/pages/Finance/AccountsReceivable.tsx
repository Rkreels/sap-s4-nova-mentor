
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { ArrowLeft } from 'lucide-react';
import PageHeader from '../../components/page/PageHeader';
import { Card } from '../../components/ui/card';

const AccountsReceivable: React.FC = () => {
  const navigate = useNavigate();

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
          description="Manage customer invoices, payments, and related transactions"
          voiceIntroduction="Welcome to Accounts Receivable. Here you can manage customer invoices and payments."
        />
      </div>
      
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Accounts Receivable Dashboard</h2>
        <p className="text-gray-500">Accounts receivable functionality will be implemented here.</p>
      </Card>
    </div>
  );
};

export default AccountsReceivable;

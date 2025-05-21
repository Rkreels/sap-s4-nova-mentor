
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { ArrowLeft } from 'lucide-react';
import PageHeader from '../../components/page/PageHeader';
import { Card } from '../../components/ui/card';

const SupplierManagement: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex items-center mb-4">
        <Button 
          variant="outline" 
          size="sm" 
          className="mr-4"
          onClick={() => navigate('/supply-chain')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back
        </Button>
        <PageHeader
          title="Supplier Management"
          description="Manage supplier information, contracts, and performance"
          voiceIntroduction="Welcome to Supplier Management. Here you can manage supplier information and performance."
        />
      </div>
      
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Supplier Management Dashboard</h2>
        <p className="text-gray-500">Supplier management functionality will be implemented here.</p>
      </Card>
    </div>
  );
};

export default SupplierManagement;

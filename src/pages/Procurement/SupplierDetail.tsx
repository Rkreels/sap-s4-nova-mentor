
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useVoiceAssistantContext } from '../../context/VoiceAssistantContext';
import { useVoiceAssistant } from '../../hooks/useVoiceAssistant';
import SupplierDetails from './components/SupplierDetails';

// Sample supplier data
const supplierData = {
  id: 'SUP-10045',
  name: 'Tech Components Inc.',
  status: 'Active',
  rating: 4,
  contactPerson: 'James Wilson',
  email: 'jwilson@techcomp.example.com',
  phone: '+1 (555) 123-4567',
  website: 'www.techcomp.example.com',
  address: '123 Innovation Drive, San Francisco, CA 94103',
  country: 'United States',
  category: 'Electronics & Components',
  totalSpend: '$1,245,800.00',
  lastOrder: 'May 15, 2025',
  paymentTerms: 'Net 30',
  deliveryTerm: 'DAP',
  currency: 'USD',
};

const SupplierDetail: React.FC = () => {
  const navigate = useNavigate();
  const { supplierId } = useParams<{ supplierId: string }>();
  const { isEnabled } = useVoiceAssistantContext();
  const { speak } = useVoiceAssistant();
  
  useEffect(() => {
    if (isEnabled) {
      speak(`You are viewing supplier details for ${supplierData.name}. This is an ${supplierData.status.toLowerCase()} supplier with a rating of ${supplierData.rating} stars.`);
    }
  }, [isEnabled, speak]);

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => navigate('/procurement')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Suppliers
        </Button>
      </div>
      
      <SupplierDetails supplier={supplierData} />
    </div>
  );
};

export default SupplierDetail;

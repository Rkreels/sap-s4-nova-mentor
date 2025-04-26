
import React, { useEffect } from 'react';
import { useVoiceAssistantContext } from '../../context/VoiceAssistantContext';
import { useVoiceAssistant } from '../../hooks/useVoiceAssistant';
import PageHeader from '../../components/page/PageHeader';
import SAPSection from '../../components/SAPSection';
import PurchaseOrders from './components/PurchaseOrders';
import SupplierManagement from './components/SupplierManagement';
import ProcurementAnalytics from './components/ProcurementAnalytics';
import { FileText, Users, BarChart } from 'lucide-react';

const Procurement: React.FC = () => {
  const { isEnabled } = useVoiceAssistantContext();
  const { speak } = useVoiceAssistant();
  
  useEffect(() => {
    if (isEnabled) {
      speak("Welcome to the Procurement module. Here you can manage purchasing, supplier relationships, and sourcing activities. This module streamlines your procurement process from requisition to payment.");
    }
  }, [isEnabled, speak]);
  
  return (
    <div>
      <PageHeader 
        title="Procurement" 
        voiceIntroduction="Welcome to the Procurement module. Here you can manage purchasing, supplier relationships, and sourcing activities. This module streamlines your procurement process from requisition to payment."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded shadow-sm border border-gray-100">
          <div className="flex items-center mb-6">
            <div className="bg-purple-100 p-3 rounded-lg mr-4">
              <FileText className="h-6 w-6 text-purple-600" />
            </div>
            <h2 className="text-xl font-semibold">Purchase Orders</h2>
          </div>
          
          <div className="space-y-3">
            <button className="w-full text-left py-2 px-3 hover:bg-gray-50 rounded text-sm font-medium">
              Create Purchase Order
            </button>
            <button className="w-full text-left py-2 px-3 hover:bg-gray-50 rounded text-sm font-medium">
              Purchase Order Overview
            </button>
            <button className="w-full text-left py-2 px-3 hover:bg-gray-50 rounded text-sm font-medium">
              Purchase Requisitions
            </button>
            <button className="w-full text-left py-2 px-3 hover:bg-gray-50 rounded text-sm font-medium">
              Goods Receipt
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded shadow-sm border border-gray-100">
          <div className="flex items-center mb-6">
            <div className="bg-blue-100 p-3 rounded-lg mr-4">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <h2 className="text-xl font-semibold">Supplier Management</h2>
          </div>
          
          <div className="space-y-3">
            <button className="w-full text-left py-2 px-3 hover:bg-gray-50 rounded text-sm font-medium">
              Supplier Directory
            </button>
            <button className="w-full text-left py-2 px-3 hover:bg-gray-50 rounded text-sm font-medium">
              Contracts
            </button>
            <button className="w-full text-left py-2 px-3 hover:bg-gray-50 rounded text-sm font-medium">
              Supplier Evaluation
            </button>
            <button className="w-full text-left py-2 px-3 hover:bg-gray-50 rounded text-sm font-medium">
              Supplier Invoices
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded shadow-sm border border-gray-100">
          <div className="flex items-center mb-6">
            <div className="bg-green-100 p-3 rounded-lg mr-4">
              <BarChart className="h-6 w-6 text-green-600" />
            </div>
            <h2 className="text-xl font-semibold">Analytics</h2>
          </div>
          
          <div className="space-y-3">
            <button className="w-full text-left py-2 px-3 hover:bg-gray-50 rounded text-sm font-medium">
              Spend Analysis
            </button>
            <button className="w-full text-left py-2 px-3 hover:bg-gray-50 rounded text-sm font-medium">
              Supplier Performance
            </button>
            <button className="w-full text-left py-2 px-3 hover:bg-gray-50 rounded text-sm font-medium">
              Savings Tracking
            </button>
            <button className="w-full text-left py-2 px-3 hover:bg-gray-50 rounded text-sm font-medium">
              Executive Dashboard
            </button>
          </div>
        </div>
      </div>

      <SAPSection title="Recent Purchase Orders" isVoiceAssistantEnabled={isEnabled}>
        <div className="col-span-full">
          <PurchaseOrders />
        </div>
      </SAPSection>

      <SAPSection title="Top Suppliers" isVoiceAssistantEnabled={isEnabled}>
        <div className="col-span-full">
          <SupplierManagement />
        </div>
      </SAPSection>
    </div>
  );
};

export default Procurement;

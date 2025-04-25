
import React, { useState, useEffect } from 'react';
import SAPSection from '../components/SAPSection';
import SAPTile from '../components/SAPTile';
import { useVoiceAssistant } from '../hooks/useVoiceAssistant';

const Finance: React.FC = () => {
  const [isVoiceAssistantEnabled, setIsVoiceAssistantEnabled] = useState(false);
  const { speak } = useVoiceAssistant();
  
  useEffect(() => {
    const checkVoiceAssistant = () => {
      // This would normally check a global state or context
      // For now we'll simulate it
      const enabled = localStorage.getItem('voiceAssistantEnabled') === 'true';
      setIsVoiceAssistantEnabled(enabled);
      
      if (enabled) {
        speak("Welcome to the Finance module. This area provides access to all financial management functions, including general ledger, accounts payable, accounts receivable, and financial reporting.");
      }
    };
    
    checkVoiceAssistant();
  }, [speak]);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Finance</h1>

      <SAPSection 
        title="General Ledger" 
        isVoiceAssistantEnabled={isVoiceAssistantEnabled}
        description="The General Ledger section contains functions for managing your company's financial records."
      >
        <SAPTile 
          title="Balance Sheet/Income Statement" 
          isVoiceAssistantEnabled={isVoiceAssistantEnabled}
          description="This tile provides access to your company's balance sheet and income statement reports."
          icon={<span className="text-xl">📊</span>}
        />
        
        <SAPTile 
          title="Display Line Items in General Ledger" 
          isVoiceAssistantEnabled={isVoiceAssistantEnabled}
          description="This tile allows you to view detailed line items recorded in the general ledger."
          icon={<span className="text-xl">📝</span>}
        />
      </SAPSection>

      <SAPSection 
        title="Predictive Accounting" 
        isVoiceAssistantEnabled={isVoiceAssistantEnabled}
        description="Predictive Accounting uses artificial intelligence to forecast financial outcomes."
      >
        <SAPTile 
          title="Sales Accounting Overview" 
          isVoiceAssistantEnabled={isVoiceAssistantEnabled}
          description="This tile provides a comprehensive view of sales accounting data and trends."
          icon={<span className="text-xl">📈</span>}
        />
        
        <SAPTile 
          title="Incoming Sales Orders" 
          subtitle="Predictive Accounting" 
          isVoiceAssistantEnabled={isVoiceAssistantEnabled}
          description="This tile shows predictive data about incoming sales orders and their financial impact."
          icon={<span className="text-xl">📉</span>}
        />
        
        <SAPTile 
          title="Gross Margin" 
          subtitle="Presumed/Actual" 
          isVoiceAssistantEnabled={isVoiceAssistantEnabled}
          description="This tile compares presumed and actual gross margins to help with financial planning."
          icon={<span className="text-xl">📊</span>}
        />
      </SAPSection>

      <SAPSection 
        title="Accounts Payable" 
        isVoiceAssistantEnabled={isVoiceAssistantEnabled}
        description="The Accounts Payable section helps manage money owed to suppliers and vendors."
      >
        <SAPTile 
          title="Manage Supplier Line Items" 
          isVoiceAssistantEnabled={isVoiceAssistantEnabled}
          description="This tile allows you to manage individual line items for supplier accounts."
          icon={<span className="text-xl">📋</span>}
        />
        
        <SAPTile 
          title="Accounts Payable Overview" 
          isVoiceAssistantEnabled={isVoiceAssistantEnabled}
          description="This tile provides a comprehensive view of all accounts payable data."
          icon={<span className="text-xl">📊</span>}
        />
        
        <SAPTile 
          title="Overdue Payables" 
          subtitle="Today" 
          value="91.52M" 
          valueSuffix="EUR" 
          isVoiceAssistantEnabled={isVoiceAssistantEnabled}
          description="This tile shows the total value of overdue payments to suppliers."
        >
          <div>
            <div className="mb-4">
              <div className="text-xs mb-1 flex justify-between">
                <span>Critical Overdue</span>
                <span className="font-medium">91.52M EUR</span>
              </div>
              <div className="text-xs flex justify-between">
                <span>Uncritical Overdue</span>
                <span className="font-medium">75.20M EUR</span>
              </div>
            </div>
            <div className="text-xs text-blue-500 flex items-center">
              <span className="mr-1">⟳</span> 5m ago
            </div>
          </div>
        </SAPTile>
        
        <SAPTile 
          title="Cash Discount Utilization" 
          subtitle="Today" 
          value="47.6" 
          valueSuffix="%" 
          isVoiceAssistantEnabled={isVoiceAssistantEnabled}
          description="This tile shows the percentage of cash discounts that have been utilized."
        >
          <div>
            <div className="text-4xl font-semibold mb-4 text-red-500">47.6 <span className="text-sm">%</span></div>
            <div className="text-xs text-blue-500 flex items-center">
              <span className="mr-1">⟳</span> 5m ago
            </div>
          </div>
        </SAPTile>
        
        <SAPTile 
          title="Cash Discount Forecast" 
          subtitle="Available Amount" 
          value="432" 
          valueSuffix="k EUR" 
          isVoiceAssistantEnabled={isVoiceAssistantEnabled}
          description="This tile shows the forecasted cash discounts available to your company."
        >
          <div>
            <div className="text-4xl font-semibold mb-4">432 <span className="text-sm">k</span></div>
            <div className="text-xs text-blue-500 flex items-center">
              <span className="mr-1">⟳</span> 5m ago <span className="ml-2">EUR</span>
            </div>
          </div>
        </SAPTile>
        
        <SAPTile 
          title="Aging Analysis" 
          subtitle="Payable Amount" 
          value="410" 
          valueSuffix="M EUR" 
          isVoiceAssistantEnabled={isVoiceAssistantEnabled}
          description="This tile provides an age-based analysis of payable amounts."
        >
          <div>
            <div className="text-4xl font-semibold mb-4">410 <span className="text-sm">M</span></div>
            <div className="text-xs text-blue-500 flex items-center">
              <span className="mr-1">⟳</span> 5m ago <span className="ml-2">EUR</span>
            </div>
          </div>
        </SAPTile>
        
        <SAPTile 
          title="Manage Payment Blocks" 
          isVoiceAssistantEnabled={isVoiceAssistantEnabled}
          description="This tile allows you to manage payment blocks that prevent automated payments to specific vendors."
          icon={<span className="text-xl">💳</span>}
        />
      </SAPSection>

      <SAPSection 
        title="Accounts Receivable" 
        isVoiceAssistantEnabled={isVoiceAssistantEnabled}
        description="The Accounts Receivable section helps manage money owed to your company by customers."
      >
        <SAPTile 
          title="Manage Customer Line Items" 
          isVoiceAssistantEnabled={isVoiceAssistantEnabled}
          description="This tile allows you to manage individual line items for customer accounts."
          icon={<span className="text-xl">👥</span>}
        />
        
        <SAPTile 
          title="Process Receivables" 
          isVoiceAssistantEnabled={isVoiceAssistantEnabled}
          description="This tile provides tools for processing and managing customer receivables."
          icon={<span className="text-xl">📑</span>}
        />
        
        <SAPTile 
          title="Total Receivables" 
          subtitle="Today" 
          value="357" 
          valueSuffix="M USD" 
          isVoiceAssistantEnabled={isVoiceAssistantEnabled}
          description="This tile shows the total amount of money owed to your company by customers."
        >
          <div>
            <div className="text-4xl font-semibold mb-4">357 <span className="text-sm">M</span></div>
            <div className="text-xs text-blue-500 flex items-center">
              <span className="mr-1">⟳</span> 10m ago <span className="ml-2">USD</span>
            </div>
          </div>
        </SAPTile>
        
        <SAPTile 
          title="Overdue Receivables" 
          subtitle="Today" 
          value="81.3" 
          valueSuffix="%" 
          isVoiceAssistantEnabled={isVoiceAssistantEnabled}
          description="This tile shows the percentage of customer receivables that are overdue."
        >
          <div>
            <div className="text-4xl font-semibold mb-4">81.3 <span className="text-sm">%</span></div>
            <div className="text-xs text-blue-500 flex items-center">
              <span className="mr-1">⟳</span> 10m ago
            </div>
          </div>
        </SAPTile>
      </SAPSection>
    </div>
  );
};

export default Finance;


import React, { useState, useEffect } from 'react';
import SAPSection from '../components/SAPSection';
import SAPTile from '../components/SAPTile';
import { useVoiceAssistant } from '../hooks/useVoiceAssistant';
import ProductionMetrics from './Manufacturing/components/ProductionMetrics';
import ProductionChart from './Manufacturing/components/ProductionChart';
import DataTable from '../components/data/DataTable';
import FilterBar from '../components/filters/FilterBar';

const productionOrders = [
  { id: "PO-1234", product: "Widget A", quantity: 1000, status: "In Progress", startDate: "2025-04-22" },
  { id: "PO-1235", product: "Widget B", quantity: 500, status: "Planned", startDate: "2025-04-23" },
  { id: "PO-1236", product: "Widget C", quantity: 750, status: "Completed", startDate: "2025-04-21" },
  { id: "PO-1237", product: "Widget D", quantity: 1200, status: "In Progress", startDate: "2025-04-20" },
];

const Manufacturing: React.FC = () => {
  const [isVoiceAssistantEnabled, setIsVoiceAssistantEnabled] = useState(false);
  const [orderFilter, setOrderFilter] = useState('All');
  const { speak } = useVoiceAssistant();
  
  useEffect(() => {
    const checkVoiceAssistant = () => {
      const enabled = localStorage.getItem('voiceAssistantEnabled') === 'true';
      setIsVoiceAssistantEnabled(enabled);
      
      if (enabled) {
        speak(`Welcome to the Manufacturing and Supply Chain module. Here you can monitor production efficiency, 
        manage orders, and track inventory levels. For example, you can use the Production Overview section to see 
        real-time metrics like efficiency rates and quality scores. The Production Orders section allows you to 
        create and manage manufacturing orders, while Inventory Management helps you maintain optimal stock levels.`);
      }
    };
    
    checkVoiceAssistant();
  }, [speak]);

  const columns = [
    { key: 'id', header: 'Order ID' },
    { key: 'product', header: 'Product' },
    { key: 'quantity', header: 'Quantity' },
    { key: 'status', header: 'Status', render: (status: string) => (
      <span className={`px-2 py-1 rounded-full text-xs ${
        status === 'Completed' ? 'bg-green-100 text-green-800' :
        status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
        'bg-yellow-100 text-yellow-800'
      }`}>
        {status}
      </span>
    )},
    { key: 'startDate', header: 'Start Date' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Manufacturing and Supply Chain</h1>

      <SAPSection 
        title="Production Overview" 
        isVoiceAssistantEnabled={isVoiceAssistantEnabled}
        description="Monitor your production performance and key metrics."
        examples="View production efficiency, active orders, and quality metrics at a glance. The production chart shows monthly output trends."
      >
        <div className="col-span-full mb-6">
          <ProductionMetrics />
        </div>
        
        <div className="col-span-full">
          <ProductionChart />
        </div>
      </SAPSection>

      <SAPSection 
        title="Production Orders" 
        isVoiceAssistantEnabled={isVoiceAssistantEnabled}
        description="Manage and track production orders in real-time."
        examples="Create new production orders, monitor their progress, and view completion status."
      >
        <div className="col-span-full">
          <FilterBar
            filters={['All', 'In Progress', 'Planned', 'Completed']}
            activeFilter={orderFilter}
            onFilterChange={setOrderFilter}
          />
          <DataTable
            columns={columns}
            data={productionOrders.filter(order => 
              orderFilter === 'All' || order.status === orderFilter
            )}
          />
        </div>
      </SAPSection>

      <SAPSection 
        title="Inventory Management" 
        isVoiceAssistantEnabled={isVoiceAssistantEnabled}
        description="Monitor and manage your inventory levels."
      >
        <SAPTile 
          title="Stock Overview"
          isVoiceAssistantEnabled={isVoiceAssistantEnabled}
          description="View current stock levels and inventory status."
          icon={<span className="text-xl">📊</span>}
        />
        <SAPTile 
          title="Goods Movement"
          isVoiceAssistantEnabled={isVoiceAssistantEnabled}
          description="Process goods receipts and issues."
          icon={<span className="text-xl">🔄</span>}
        />
      </SAPSection>
    </div>
  );
};

export default Manufacturing;

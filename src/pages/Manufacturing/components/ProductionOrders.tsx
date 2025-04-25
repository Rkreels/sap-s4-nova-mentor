
import React, { useState } from 'react';
import FilterBar from '../../../components/filters/FilterBar';
import DataTable from '../../../components/data/DataTable';
import { useVoiceAssistantContext } from '../../../context/VoiceAssistantContext';
import { useVoiceAssistant } from '../../../hooks/useVoiceAssistant';

const productionOrders = [
  { id: "PO-1234", product: "Widget A", quantity: 1000, status: "In Progress", startDate: "2025-04-22" },
  { id: "PO-1235", product: "Widget B", quantity: 500, status: "Planned", startDate: "2025-04-23" },
  { id: "PO-1236", product: "Widget C", quantity: 750, status: "Completed", startDate: "2025-04-21" },
  { id: "PO-1237", product: "Widget D", quantity: 1200, status: "In Progress", startDate: "2025-04-20" },
  { id: "PO-1238", product: "Widget E", quantity: 300, status: "Planned", startDate: "2025-04-24" },
  { id: "PO-1239", product: "Widget F", quantity: 850, status: "Completed", startDate: "2025-04-19" },
];

const ProductionOrders: React.FC = () => {
  const [orderFilter, setOrderFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const { isEnabled } = useVoiceAssistantContext();
  const { speak } = useVoiceAssistant();

  const handleFilterChange = (filter: string) => {
    setOrderFilter(filter);
    
    if (isEnabled) {
      speak(`Filtered production orders to show ${filter} orders.`);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

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

  const filteredOrders = productionOrders.filter(order => {
    const matchesFilter = orderFilter === 'All' || order.status === orderFilter;
    const matchesSearch = searchTerm === '' || 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.product.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="col-span-full">
      <FilterBar
        filters={['All', 'In Progress', 'Planned', 'Completed']}
        activeFilter={orderFilter}
        onFilterChange={handleFilterChange}
        onSearch={handleSearch}
      />
      <DataTable
        columns={columns}
        data={filteredOrders}
      />
    </div>
  );
};

export default ProductionOrders;

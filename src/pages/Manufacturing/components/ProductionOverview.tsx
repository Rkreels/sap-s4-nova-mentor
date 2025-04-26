
import React from 'react';
import { useVoiceAssistantContext } from '../../../context/VoiceAssistantContext';
import ProductionMetrics from './ProductionMetrics';
import ProductionChart from './ProductionChart';
import SAPTile from '../../../components/SAPTile';

const ProductionOverview: React.FC = () => {
  const { isEnabled } = useVoiceAssistantContext();
  
  return (
    <>
      <div className="col-span-full mb-6">
        <ProductionMetrics />
      </div>
      
      <div className="col-span-full">
        <ProductionChart />
      </div>
      
      <SAPTile 
        title="Monitor Material Coverage"
        subtitle="Net / Individual Segments"
        isVoiceAssistantEnabled={isEnabled}
        description="View material coverage levels and identify potential shortages."
        icon={<span className="material-icon">📊</span>}
        examples="This tool helps you identify materials that may be running low and need replenishment to avoid production delays."
      />
      
      <SAPTile 
        title="Check Material Coverage"
        isVoiceAssistantEnabled={isEnabled}
        description="Analyze material availability against production requirements."
        icon={<span className="material-icon">📋</span>}
        examples="Use this feature to check if you have sufficient materials for upcoming production orders."
      />
      
      <SAPTile 
        title="Maintain MRPs"
        isVoiceAssistantEnabled={isEnabled}
        description="Configure and maintain material requirements planning settings."
        icon={<span className="material-icon">⚙️</span>}
        examples="This tool allows you to configure how the system calculates material needs for production."
      />
      
      <SAPTile 
        title="Schedule MRP Runs"
        isVoiceAssistantEnabled={isEnabled}
        description="Plan and execute material requirements planning calculations."
        icon={<span className="material-icon">📅</span>}
        examples="Schedule automatic MRP runs to keep your material requirements up-to-date."
      />
    </>
  );
};

export default ProductionOverview;

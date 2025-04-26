
import React, { useEffect } from 'react';
import { useVoiceAssistantContext } from '../../context/VoiceAssistantContext';
import { useVoiceAssistant } from '../../hooks/useVoiceAssistant';
import { Card, CardContent } from '../../components/ui/card';
import { Monitor, Package, FileText, Wrench, HardDrive, ClipboardCheck } from 'lucide-react';

interface ManagementCardProps {
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  value?: string | number;
  onClick?: () => void;
}

const ManagementCard: React.FC<ManagementCardProps> = ({ title, subtitle, icon, value, onClick }) => (
  <Card className="hover:bg-gray-50 cursor-pointer transition-colors" onClick={onClick}>
    <CardContent className="p-4">
      <div className="flex items-start space-x-4">
        <div className="p-2 rounded-lg bg-blue-50">
          {icon}
        </div>
        <div>
          <h3 className="font-medium text-sm">{title}</h3>
          {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
          {value && <p className="text-2xl font-semibold mt-2">{value}</p>}
        </div>
      </div>
    </CardContent>
  </Card>
);

const Manufacturing: React.FC = () => {
  const { isEnabled } = useVoiceAssistantContext();
  const { speak } = useVoiceAssistant();
  
  useEffect(() => {
    if (isEnabled) {
      speak('Welcome to Manufacturing and Supply Chain. Here you can manage production, warehouse, quality, and service operations.');
    }
  }, [isEnabled, speak]);

  return (
    <div className="container mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-semibold mb-6">Manufacturing and Supply Chain</h1>

      <section>
        <h2 className="text-lg font-medium mb-4">Production</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <ManagementCard
            title="Monitor Material Coverage"
            subtitle="Net / Individual Seg."
            icon={<Monitor className="h-5 w-5 text-blue-600" />}
          />
          <ManagementCard
            title="Check Material Coverage"
            icon={<Package className="h-5 w-5 text-blue-600" />}
          />
          <ManagementCard
            title="Maintain PIRs"
            icon={<FileText className="h-5 w-5 text-blue-600" />}
          />
          <ManagementCard
            title="Schedule MRP Runs"
            icon={<HardDrive className="h-5 w-5 text-blue-600" />}
          />
          <ManagementCard
            title="Manage Production Orders"
            subtitle="Orders"
            icon={<ClipboardCheck className="h-5 w-5 text-blue-600" />}
          />
          <ManagementCard
            title="Confirm Production Operation"
            icon={<Wrench className="h-5 w-5 text-blue-600" />}
          />
        </div>
      </section>

      <section>
        <h2 className="text-lg font-medium mb-4">Warehouse Management</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <ManagementCard
            title="Stock"
            subtitle="Single Material"
            icon={<HardDrive className="h-5 w-5 text-blue-600" />}
          />
          <ManagementCard
            title="Manage Stock"
            icon={<Package className="h-5 w-5 text-blue-600" />}
          />
          <ManagementCard
            title="Schedule Inbound Delivery Creation"
            icon={<FileText className="h-5 w-5 text-blue-600" />}
          />
          <ManagementCard
            title="Change Inbound Deliveries"
            subtitle="Deliveries"
            icon={<ClipboardCheck className="h-5 w-5 text-blue-600" />}
          />
        </div>
      </section>

      <section>
        <h2 className="text-lg font-medium mb-4">Quality Management</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <ManagementCard
            title="Quality Technician Overview"
            icon={<Monitor className="h-5 w-5 text-blue-600" />}
          />
          <ManagementCard
            title="Manage Inspection Lots"
            icon={<FileText className="h-5 w-5 text-blue-600" />}
          />
          <ManagementCard
            title="Record Inspection Results"
            icon={<ClipboardCheck className="h-5 w-5 text-blue-600" />}
            value="161"
          />
        </div>
      </section>

      <section>
        <h2 className="text-lg font-medium mb-4">Service and Asset Management</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <ManagementCard
            title="Create Maintenance Request"
            icon={<FileText className="h-5 w-5 text-blue-600" />}
          />
          <ManagementCard
            title="Screen Maintenance Requests"
            icon={<Monitor className="h-5 w-5 text-blue-600" />}
            value="73"
            subtitle="Open"
          />
          <ManagementCard
            title="Manage Maintenance Notifications and Orders"
            icon={<ClipboardCheck className="h-5 w-5 text-blue-600" />}
          />
          <ManagementCard
            title="Perform Maintenance Jobs"
            icon={<Wrench className="h-5 w-5 text-blue-600" />}
            value="0"
          />
          <ManagementCard
            title="Maintenance Order Costs"
            subtitle="Plan / Actual"
            icon={<HardDrive className="h-5 w-5 text-blue-600" />}
          />
        </div>
      </section>
    </div>
  );
};

export default Manufacturing;

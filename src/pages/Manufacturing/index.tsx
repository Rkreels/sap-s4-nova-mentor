
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVoiceAssistantContext } from '../../context/VoiceAssistantContext';
import { useVoiceAssistant } from '../../hooks/useVoiceAssistant';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { BarChart2, Box, Calendar, ChevronRight, Clipboard, ClipboardCheck, FileText, HardDrive, LayoutDashboard, Monitor, Package, Users, Wrench } from 'lucide-react';
import styles from './Manufacturing.module.css';
import { toast } from '../../components/ui/use-toast';
import PageHeader from '../../components/page/PageHeader';
import ProductionMetrics from './components/ProductionMetrics';

interface ManufacturingCardProps {
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  value?: string | number;
  onClick?: () => void;
}

const ManufacturingCard: React.FC<ManufacturingCardProps> = ({ title, subtitle, icon, value, onClick }) => (
  <div className={styles.card} onClick={onClick}>
    <div className="flex items-start space-x-4">
      <div className={styles.iconWrapper}>
        {icon}
      </div>
      <div>
        <h3 className="font-medium text-sm">{title}</h3>
        {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
        {value && <p className="text-2xl font-semibold mt-2">{value}</p>}
      </div>
    </div>
  </div>
);

const ManufacturingDashboard: React.FC = () => {
  const { isEnabled } = useVoiceAssistantContext();
  const { speak } = useVoiceAssistant();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (isEnabled) {
      speak('Welcome to Manufacturing and Supply Chain. Here you can manage production, warehouse, quality, and service operations.');
    }
  }, [isEnabled, speak]);

  const handleCardClick = (area: string, action: string, path: string) => {
    console.log(`${area} - ${action} clicked`);
    toast({
      title: `${action}`,
      description: `You selected ${action} in the ${area} area`,
    });
    navigate(`/manufacturing/${path}`);
  };

  const handleSectionNav = (path: string) => {
    navigate(`/manufacturing/${path}`);
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      <PageHeader 
        title="Manufacturing and Supply Chain"
        description="Manage your production, warehouse, quality, and service operations"
        voiceIntroduction="Welcome to Manufacturing and Supply Chain. Here you can manage production, warehouse, quality, and service operations."
      />

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Manufacturing and Supply Chain</h1>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="text-xs">
            Personalize Page
          </Button>
          <Button variant="outline" size="sm" className="text-xs">
            Share Page
          </Button>
        </div>
      </div>

      <ProductionMetrics />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="col-span-1 p-6">
          <div className="flex items-center mb-6">
            <div className="bg-blue-100 p-3 rounded-lg mr-4">
              <LayoutDashboard className="h-6 w-6 text-blue-600" />
            </div>
            <h2 className="text-xl font-semibold">Overview</h2>
          </div>
          
          <div className="space-y-3">
            <button className="w-full text-left py-2 px-3 hover:bg-gray-50 rounded text-sm font-medium flex items-center justify-between" 
                    onClick={() => handleCardClick('Overview', 'Production Dashboard', '')}>
              <span>Production Dashboard</span>
              <ChevronRight className="h-4 w-4" />
            </button>
            <button className="w-full text-left py-2 px-3 hover:bg-gray-50 rounded text-sm font-medium flex items-center justify-between"
                    onClick={() => handleCardClick('Overview', 'Supply Chain Insights', 'supply-chain-insights')}>
              <span>Supply Chain Insights</span>
              <ChevronRight className="h-4 w-4" />
            </button>
            <button className="w-full text-left py-2 px-3 hover:bg-gray-50 rounded text-sm font-medium flex items-center justify-between"
                    onClick={() => handleCardClick('Overview', 'Manufacturing KPIs', 'kpis')}>
              <span>Manufacturing KPIs</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </Card>

        <Card className="col-span-1 p-6">
          <div className="flex items-center mb-6">
            <div className="bg-green-100 p-3 rounded-lg mr-4">
              <Calendar className="h-6 w-6 text-green-600" />
            </div>
            <h2 className="text-xl font-semibold">Planning</h2>
          </div>
          
          <div className="space-y-3">
            <button className="w-full text-left py-2 px-3 hover:bg-gray-50 rounded text-sm font-medium flex items-center justify-between"
                    onClick={() => handleCardClick('Planning', 'Production Scheduling', 'production-scheduling')}>
              <span>Production Scheduling</span>
              <ChevronRight className="h-4 w-4" />
            </button>
            <button className="w-full text-left py-2 px-3 hover:bg-gray-50 rounded text-sm font-medium flex items-center justify-between"
                    onClick={() => handleCardClick('Planning', 'Capacity Planning', 'capacity-planning')}>
              <span>Capacity Planning</span>
              <ChevronRight className="h-4 w-4" />
            </button>
            <button className="w-full text-left py-2 px-3 hover:bg-gray-50 rounded text-sm font-medium flex items-center justify-between"
                    onClick={() => handleCardClick('Planning', 'Material Requirements', 'material-requirements')}>
              <span>Material Requirements</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </Card>

        <Card className="col-span-1 p-6">
          <div className="flex items-center mb-6">
            <div className="bg-purple-100 p-3 rounded-lg mr-4">
              <BarChart2 className="h-6 w-6 text-purple-600" />
            </div>
            <h2 className="text-xl font-semibold">Analytics</h2>
          </div>
          
          <div className="space-y-3">
            <button className="w-full text-left py-2 px-3 hover:bg-gray-50 rounded text-sm font-medium flex items-center justify-between"
                    onClick={() => handleCardClick('Analytics', 'Production Reports', 'production-reports')}>
              <span>Production Reports</span>
              <ChevronRight className="h-4 w-4" />
            </button>
            <button className="w-full text-left py-2 px-3 hover:bg-gray-50 rounded text-sm font-medium flex items-center justify-between"
                    onClick={() => handleCardClick('Analytics', 'Quality Analysis', 'quality-analysis')}>
              <span>Quality Analysis</span>
              <ChevronRight className="h-4 w-4" />
            </button>
            <button className="w-full text-left py-2 px-3 hover:bg-gray-50 rounded text-sm font-medium flex items-center justify-between"
                    onClick={() => handleCardClick('Analytics', 'Cost Analysis', 'cost-analysis')}>
              <span>Cost Analysis</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </Card>
      </div>

      <Tabs defaultValue="production" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="production" onClick={() => handleSectionNav('production')}>Production</TabsTrigger>
          <TabsTrigger value="warehouse" onClick={() => handleSectionNav('warehouse')}>Warehouse Management</TabsTrigger>
          <TabsTrigger value="quality" onClick={() => handleSectionNav('quality')}>Quality Management</TabsTrigger>
          <TabsTrigger value="service" onClick={() => handleSectionNav('service')}>Service & Asset Management</TabsTrigger>
        </TabsList>
        
        <TabsContent value="production">
          <section>
            <h2 className={styles.sectionTitle}>Production</h2>
            <div className={styles.cardGrid}>
              <ManufacturingCard
                title="Monitor Material Coverage"
                subtitle="Net / Individual Seg."
                icon={<Monitor className="h-5 w-5 text-blue-600" />}
                onClick={() => handleCardClick('Production', 'Monitor Material Coverage', 'production')}
              />
              <ManufacturingCard
                title="Check Material Coverage"
                icon={<Package className="h-5 w-5 text-blue-600" />}
                onClick={() => handleCardClick('Production', 'Check Material Coverage', 'production')}
              />
              <ManufacturingCard
                title="Maintain PIRs"
                icon={<FileText className="h-5 w-5 text-blue-600" />}
                onClick={() => handleCardClick('Production', 'Maintain PIRs', 'production')}
              />
              <ManufacturingCard
                title="Schedule MRP Runs"
                icon={<HardDrive className="h-5 w-5 text-blue-600" />}
                onClick={() => handleCardClick('Production', 'Schedule MRP Runs', 'production')}
              />
              <ManufacturingCard
                title="Manage Production Orders"
                subtitle="Orders"
                icon={<ClipboardCheck className="h-5 w-5 text-blue-600" />}
                onClick={() => handleCardClick('Production', 'Manage Production Orders', 'production')}
              />
              <ManufacturingCard
                title="Confirm Production Operation"
                icon={<Wrench className="h-5 w-5 text-blue-600" />}
                onClick={() => handleCardClick('Production', 'Confirm Production Operation', 'production')}
              />
            </div>
          </section>
        </TabsContent>

        <TabsContent value="warehouse">
          <section>
            <h2 className={styles.sectionTitle}>Warehouse Management</h2>
            <div className={styles.cardGrid}>
              <ManufacturingCard
                title="Stock"
                subtitle="Single Material"
                icon={<Box className="h-5 w-5 text-blue-600" />}
                onClick={() => handleCardClick('Warehouse', 'Stock', 'warehouse')}
              />
              <ManufacturingCard
                title="Manage Stock"
                icon={<Package className="h-5 w-5 text-blue-600" />}
                onClick={() => handleCardClick('Warehouse', 'Manage Stock', 'warehouse')}
              />
              <ManufacturingCard
                title="Schedule Inbound Delivery Creation"
                icon={<Calendar className="h-5 w-5 text-blue-600" />}
                onClick={() => handleCardClick('Warehouse', 'Schedule Inbound Delivery Creation', 'warehouse')}
              />
              <ManufacturingCard
                title="Change Inbound Deliveries"
                subtitle="Deliveries"
                icon={<Clipboard className="h-5 w-5 text-blue-600" />}
                onClick={() => handleCardClick('Warehouse', 'Change Inbound Deliveries', 'warehouse')}
              />
            </div>
          </section>
        </TabsContent>

        <TabsContent value="quality">
          <section>
            <h2 className={styles.sectionTitle}>Quality Management</h2>
            <div className={styles.cardGrid}>
              <ManufacturingCard
                title="Quality Technician Overview"
                icon={<Users className="h-5 w-5 text-blue-600" />}
                onClick={() => handleCardClick('Quality', 'Quality Technician Overview', 'quality')}
              />
              <ManufacturingCard
                title="Manage Inspection Lots"
                icon={<FileText className="h-5 w-5 text-blue-600" />}
                onClick={() => handleCardClick('Quality', 'Manage Inspection Lots', 'quality')}
              />
              <ManufacturingCard
                title="Record Inspection Results"
                icon={<ClipboardCheck className="h-5 w-5 text-blue-600" />}
                value="161"
                onClick={() => handleCardClick('Quality', 'Record Inspection Results', 'quality')}
              />
            </div>
          </section>
        </TabsContent>

        <TabsContent value="service">
          <section>
            <h2 className={styles.sectionTitle}>Service and Asset Management</h2>
            <div className={styles.cardGrid}>
              <ManufacturingCard
                title="Create Maintenance Request"
                icon={<FileText className="h-5 w-5 text-blue-600" />}
                onClick={() => handleCardClick('Service', 'Create Maintenance Request', 'service')}
              />
              <ManufacturingCard
                title="Screen Maintenance Requests"
                icon={<Monitor className="h-5 w-5 text-blue-600" />}
                value="73"
                subtitle="Open"
                onClick={() => handleCardClick('Service', 'Screen Maintenance Requests', 'service')}
              />
              <ManufacturingCard
                title="Manage Maintenance Notifications and Orders"
                icon={<ClipboardCheck className="h-5 w-5 text-blue-600" />}
                onClick={() => handleCardClick('Service', 'Manage Maintenance Notifications and Orders', 'service')}
              />
              <ManufacturingCard
                title="Perform Maintenance Jobs"
                icon={<Wrench className="h-5 w-5 text-blue-600" />}
                value="0"
                onClick={() => handleCardClick('Service', 'Perform Maintenance Jobs', 'service')}
              />
              <ManufacturingCard
                title="Maintenance Order Costs"
                subtitle="Plan / Actual"
                icon={<HardDrive className="h-5 w-5 text-blue-600" />}
                onClick={() => handleCardClick('Service', 'Maintenance Order Costs', 'service')}
              />
            </div>
          </section>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ManufacturingDashboard;

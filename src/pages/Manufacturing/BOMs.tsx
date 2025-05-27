
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { useVoiceAssistantContext } from '../../context/VoiceAssistantContext';
import { useVoiceAssistant } from '../../hooks/useVoiceAssistant';
import PageHeader from '../../components/page/PageHeader';
import DataTable from '../../components/data/DataTable';
import { ArrowLeft, Plus, Edit, Copy, FileText } from 'lucide-react';

const BOMs: React.FC = () => {
  const navigate = useNavigate();
  const { isEnabled } = useVoiceAssistantContext();
  const { speak } = useVoiceAssistant();
  const [boms, setBOMs] = useState([
    {
      bomId: 'BOM-001',
      material: 'Widget A',
      version: '1.2',
      status: 'Active',
      validFrom: '2025-01-01',
      validTo: '2025-12-31',
      plant: 'Plant 1000',
      baseQty: 1,
      components: 5
    },
    {
      bomId: 'BOM-002',
      material: 'Widget B',
      version: '2.0',
      status: 'Active',
      validFrom: '2025-03-01',
      validTo: '2025-12-31',
      plant: 'Plant 1000',
      baseQty: 1,
      components: 8
    },
    {
      bomId: 'BOM-003',
      material: 'Assembly C',
      version: '1.0',
      status: 'Draft',
      validFrom: '2025-06-01',
      validTo: '2025-12-31',
      plant: 'Plant 1000',
      baseQty: 1,
      components: 12
    }
  ]);

  React.useEffect(() => {
    if (isEnabled) {
      speak('You are now in Bill of Materials Management. Here you can manage BOMs, their components, and versions.');
    }
  }, [isEnabled, speak]);

  const columns = [
    { key: 'bomId', header: 'BOM ID' },
    { key: 'material', header: 'Material' },
    { key: 'version', header: 'Version' },
    { 
      key: 'status', 
      header: 'Status',
      render: (value: string) => {
        const colors = {
          'Active': 'bg-green-100 text-green-800',
          'Draft': 'bg-yellow-100 text-yellow-800',
          'Inactive': 'bg-red-100 text-red-800'
        };
        return (
          <span className={`px-2 py-1 rounded-full text-xs ${colors[value as keyof typeof colors]}`}>
            {value}
          </span>
        );
      }
    },
    { key: 'validFrom', header: 'Valid From' },
    { key: 'validTo', header: 'Valid To' },
    { key: 'plant', header: 'Plant' },
    { key: 'baseQty', header: 'Base Qty' },
    { key: 'components', header: 'Components' },
    { 
      key: 'actions', 
      header: 'Actions',
      render: (_, row: any) => (
        <div className="flex space-x-2">
          <Button variant="ghost" size="sm" title="Edit">
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" title="Copy">
            <Copy className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" title="View Details">
            <FileText className="h-4 w-4" />
          </Button>
        </div>
      )
    }
  ];

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex items-center mb-4">
        <Button 
          variant="outline" 
          size="sm" 
          className="mr-4"
          onClick={() => navigate('/manufacturing')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back
        </Button>
        <PageHeader
          title="Bill of Materials (BOMs)"
          description="Manage bill of materials, components, and material specifications"
          voiceIntroduction="Welcome to Bill of Materials Management."
        />
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Bill of Materials Management</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create BOM
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="text-sm text-gray-500">Total BOMs</div>
          <div className="text-2xl font-bold">156</div>
          <div className="text-sm text-blue-600">All versions</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-gray-500">Active BOMs</div>
          <div className="text-2xl font-bold">142</div>
          <div className="text-sm text-green-600">Currently used</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-gray-500">Draft BOMs</div>
          <div className="text-2xl font-bold">14</div>
          <div className="text-sm text-yellow-600">Pending approval</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-gray-500">Avg Components</div>
          <div className="text-2xl font-bold">8.5</div>
          <div className="text-sm text-purple-600">Per BOM</div>
        </Card>
      </div>

      <Card className="p-6">
        <DataTable columns={columns} data={boms} />
      </Card>
    </div>
  );
};

export default BOMs;

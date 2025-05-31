
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { ArrowLeft, Plus, Search, Filter, TrendingUp } from 'lucide-react';
import PageHeader from '../../components/page/PageHeader';
import { useVoiceAssistantContext } from '../../context/VoiceAssistantContext';
import { useVoiceAssistant } from '../../hooks/useVoiceAssistant';
import DataTable from '../../components/data/DataTable';

const SourceDetermination: React.FC = () => {
  const navigate = useNavigate();
  const { isEnabled } = useVoiceAssistantContext();
  const { speak } = useVoiceAssistant();

  useEffect(() => {
    if (isEnabled) {
      speak('Welcome to Source Determination. Find and evaluate the best suppliers for your procurement needs.');
    }
  }, [isEnabled, speak]);

  const sourceOptions = [
    {
      material: 'Electronic Components',
      description: 'Microprocessors and Circuit Boards',
      requirement: '1000 units',
      preferredSupplier: 'Tech Components Inc.',
      alternativeSuppliers: 3,
      leadTime: '14 days',
      priceRange: '$50-65',
      availability: 'In Stock'
    },
    {
      material: 'Office Furniture',
      description: 'Ergonomic Office Chairs',
      requirement: '50 units',
      preferredSupplier: 'Office Solutions Ltd.',
      alternativeSuppliers: 2,
      leadTime: '21 days',
      priceRange: '$200-280',
      availability: 'Made to Order'
    }
  ];

  const columns = [
    { key: 'material', header: 'Material' },
    { key: 'description', header: 'Description' },
    { key: 'requirement', header: 'Requirement' },
    { key: 'preferredSupplier', header: 'Preferred Supplier' },
    { key: 'alternativeSuppliers', header: 'Alternatives' },
    { key: 'leadTime', header: 'Lead Time' },
    { key: 'priceRange', header: 'Price Range' },
    { 
      key: 'availability', 
      header: 'Availability',
      render: (value: string) => {
        const colors = {
          'In Stock': 'bg-green-100 text-green-800',
          'Made to Order': 'bg-yellow-100 text-yellow-800',
          'Out of Stock': 'bg-red-100 text-red-800'
        };
        return (
          <Badge className={colors[value as keyof typeof colors]}>
            {value}
          </Badge>
        );
      }
    }
  ];

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex items-center mb-4">
        <Button 
          variant="outline" 
          size="sm" 
          className="mr-4"
          onClick={() => navigate('/procurement')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back
        </Button>
        <PageHeader
          title="Source Determination"
          description="Find and evaluate the best suppliers for your procurement needs"
          voiceIntroduction="Welcome to Source Determination."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="text-sm text-gray-500">Source Lists</div>
          <div className="text-2xl font-bold">45</div>
          <div className="text-sm text-blue-600">Active materials</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-gray-500">Qualified Suppliers</div>
          <div className="text-2xl font-bold">89</div>
          <div className="text-sm text-green-600">Available sources</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-gray-500">Avg Lead Time</div>
          <div className="text-2xl font-bold">18 days</div>
          <div className="text-sm text-purple-600">Performance</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-gray-500">Cost Savings</div>
          <div className="text-2xl font-bold">15%</div>
          <div className="text-sm text-orange-600">Through sourcing</div>
        </Card>
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Source Determination</h2>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Search className="h-4 w-4 mr-2" />
            Find Sources
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Source List
          </Button>
        </div>
      </div>

      <Card className="p-6">
        <DataTable columns={columns} data={sourceOptions} />
      </Card>
    </div>
  );
};

export default SourceDetermination;

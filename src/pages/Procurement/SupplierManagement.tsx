
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { ArrowLeft, Plus, Edit, Eye, Users, Star, Phone, Mail } from 'lucide-react';
import PageHeader from '../../components/page/PageHeader';
import { useVoiceAssistantContext } from '../../context/VoiceAssistantContext';
import { useVoiceAssistant } from '../../hooks/useVoiceAssistant';
import DataTable from '../../components/data/DataTable';

const SupplierManagement: React.FC = () => {
  const navigate = useNavigate();
  const { isEnabled } = useVoiceAssistantContext();
  const { speak } = useVoiceAssistant();

  useEffect(() => {
    if (isEnabled) {
      speak('Welcome to Supplier Management. Manage supplier relationships, contracts, and performance.');
    }
  }, [isEnabled, speak]);

  const suppliers = [
    {
      id: 'SUP-001',
      name: 'Tech Components Inc.',
      category: 'Electronics',
      country: 'United States',
      status: 'Active',
      rating: 4.8,
      totalSpend: 1245800,
      currency: 'USD',
      lastOrder: '2025-01-15',
      contactPerson: 'John Smith'
    },
    {
      id: 'SUP-002',
      name: 'Office Supplies Ltd.',
      category: 'Office Equipment',
      country: 'United Kingdom',
      status: 'Active',
      rating: 4.2,
      totalSpend: 426350,
      currency: 'USD',
      lastOrder: '2025-01-20',
      contactPerson: 'Sarah Johnson'
    },
    {
      id: 'SUP-003',
      name: 'Industrial Parts Co.',
      category: 'Manufacturing',
      country: 'Germany',
      status: 'On Hold',
      rating: 3.9,
      totalSpend: 875600,
      currency: 'USD',
      lastOrder: '2024-12-10',
      contactPerson: 'Klaus Mueller'
    }
  ];

  const columns = [
    { key: 'id', header: 'Supplier ID' },
    { 
      key: 'name', 
      header: 'Name',
      render: (value: string, row: any) => (
        <span 
          className="text-blue-600 underline cursor-pointer"
          onClick={() => navigate(`/procurement/suppliers/${row.id}`)}
        >
          {value}
        </span>
      )
    },
    { key: 'category', header: 'Category' },
    { key: 'country', header: 'Country' },
    { 
      key: 'status', 
      header: 'Status',
      render: (value: string) => {
        const colors = {
          'Active': 'bg-green-100 text-green-800',
          'On Hold': 'bg-yellow-100 text-yellow-800',
          'Inactive': 'bg-red-100 text-red-800'
        };
        return (
          <Badge className={colors[value as keyof typeof colors]}>
            {value}
          </Badge>
        );
      }
    },
    { 
      key: 'rating', 
      header: 'Rating',
      render: (value: number) => (
        <div className="flex items-center">
          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
          <span>{value.toFixed(1)}</span>
        </div>
      )
    },
    { 
      key: 'totalSpend', 
      header: 'Total Spend',
      render: (value: number, row: any) => `${value.toLocaleString()} ${row.currency}`
    },
    { 
      key: 'actions', 
      header: 'Actions',
      render: (_, row: any) => (
        <div className="flex space-x-2">
          <Button variant="ghost" size="sm" title="View">
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" title="Edit">
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" title="Contact">
            <Phone className="h-4 w-4" />
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
          onClick={() => navigate('/procurement')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back
        </Button>
        <PageHeader
          title="Supplier Management"
          description="Manage supplier relationships, contracts, and performance"
          voiceIntroduction="Welcome to Supplier Management."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="text-sm text-gray-500">Active Suppliers</div>
          <div className="text-2xl font-bold">128</div>
          <div className="text-sm text-green-600">Total registered</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-gray-500">Top Performers</div>
          <div className="text-2xl font-bold">24</div>
          <div className="text-sm text-blue-600">Rating > 4.5</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-gray-500">Total Spend</div>
          <div className="text-2xl font-bold">$5.2M</div>
          <div className="text-sm text-purple-600">Year to date</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-gray-500">Avg Rating</div>
          <div className="text-2xl font-bold">4.3</div>
          <div className="text-sm text-yellow-600">Overall performance</div>
        </Card>
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Supplier Directory</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Register Supplier
        </Button>
      </div>

      <Card className="p-6">
        <DataTable columns={columns} data={suppliers} />
      </Card>
    </div>
  );
};

export default SupplierManagement;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { ArrowLeft, Plus, Building, TrendingDown, Calculator } from 'lucide-react';
import PageHeader from '../../components/page/PageHeader';
import { useVoiceAssistantContext } from '../../context/VoiceAssistantContext';
import { useVoiceAssistant } from '../../hooks/useVoiceAssistant';
import EnhancedDataTable, { EnhancedColumn } from '../../components/data/EnhancedDataTable';
import { useToast } from '../../hooks/use-toast';
import VoiceTrainingComponent from '../../components/procurement/VoiceTrainingComponent';

interface Asset {
  id: string;
  assetNumber: string;
  description: string;
  assetClass: string;
  acquisitionDate: string;
  acquisitionValue: number;
  currentValue: number;
  accumulatedDepreciation: number;
  status: 'Active' | 'Retired' | 'Under Construction';
  location: string;
}

const FixedAssets: React.FC = () => {
  const navigate = useNavigate();
  const { isEnabled } = useVoiceAssistantContext();
  const { speak } = useVoiceAssistant();
  const [activeTab, setActiveTab] = useState('assets');
  const [assets, setAssets] = useState<Asset[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    if (isEnabled) {
      speak('Welcome to Fixed Assets Management. Track asset lifecycle, depreciation, and maintain comprehensive asset records for accurate financial reporting.');
    }
  }, [isEnabled, speak]);

  useEffect(() => {
    const sampleAssets: Asset[] = [
      {
        id: 'fa-001',
        assetNumber: 'FA-001-2024',
        description: 'Office Building - Main Campus',
        assetClass: 'Buildings',
        acquisitionDate: '2024-01-15',
        acquisitionValue: 2500000,
        currentValue: 2375000,
        accumulatedDepreciation: 125000,
        status: 'Active',
        location: 'New York'
      },
      {
        id: 'fa-002',
        assetNumber: 'FA-002-2024',
        description: 'Manufacturing Equipment - Line 1',
        assetClass: 'Machinery',
        acquisitionDate: '2024-03-20',
        acquisitionValue: 450000,
        currentValue: 405000,
        accumulatedDepreciation: 45000,
        status: 'Active',
        location: 'Factory Floor 1'
      }
    ];
    setAssets(sampleAssets);
  }, []);

  const getStatusColor = (status: string) => {
    const colors = {
      'Active': 'bg-green-100 text-green-800',
      'Retired': 'bg-gray-100 text-gray-800',
      'Under Construction': 'bg-blue-100 text-blue-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const columns: EnhancedColumn[] = [
    { key: 'assetNumber', header: 'Asset Number', sortable: true, searchable: true },
    { key: 'description', header: 'Description', searchable: true },
    { key: 'assetClass', header: 'Asset Class', filterable: true, filterOptions: [
      { label: 'Buildings', value: 'Buildings' },
      { label: 'Machinery', value: 'Machinery' },
      { label: 'Vehicles', value: 'Vehicles' },
      { label: 'IT Equipment', value: 'IT Equipment' }
    ]},
    { 
      key: 'acquisitionValue', 
      header: 'Acquisition Value',
      sortable: true,
      render: (value: number) => `$${value.toLocaleString()}`
    },
    { 
      key: 'currentValue', 
      header: 'Current Value',
      sortable: true,
      render: (value: number) => `$${value.toLocaleString()}`
    },
    { 
      key: 'status', 
      header: 'Status',
      filterable: true,
      filterOptions: [
        { label: 'Active', value: 'Active' },
        { label: 'Retired', value: 'Retired' },
        { label: 'Under Construction', value: 'Under Construction' }
      ],
      render: (value: string) => (
        <Badge className={getStatusColor(value)}>
          {value}
        </Badge>
      )
    },
    { key: 'location', header: 'Location', searchable: true }
  ];

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex items-center mb-4">
        <Button 
          variant="outline" 
          size="sm" 
          className="mr-4"
          onClick={() => navigate('/finance')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back
        </Button>
        <PageHeader
          title="Fixed Assets"
          description="Track asset lifecycle, depreciation, and maintain comprehensive asset records"
          voiceIntroduction="Welcome to Fixed Assets Management for comprehensive asset lifecycle tracking."
        />
      </div>

      <VoiceTrainingComponent 
        module="finance"
        topic="Fixed Assets Management"
        examples={[
          "Managing asset master data including acquisition details, depreciation methods, and useful life",
          "Processing asset acquisitions, transfers, and retirements with proper accounting treatments",
          "Calculating depreciation using various methods including straight-line, declining balance, and units of production"
        ]}
        detailLevel="advanced"
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{assets.length}</div>
            <div className="text-sm text-muted-foreground">Total Assets</div>
            <div className="text-sm text-blue-600">Active portfolio</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">
              ${assets.reduce((sum, asset) => sum + asset.acquisitionValue, 0).toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">Gross Value</div>
            <div className="text-sm text-green-600">Original cost</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">
              ${assets.reduce((sum, asset) => sum + asset.currentValue, 0).toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">Net Book Value</div>
            <div className="text-sm text-purple-600">Current worth</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">
              ${assets.reduce((sum, asset) => sum + asset.accumulatedDepreciation, 0).toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">Total Depreciation</div>
            <div className="text-sm text-orange-600">Accumulated</div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="assets">Asset Register</TabsTrigger>
          <TabsTrigger value="depreciation">Depreciation</TabsTrigger>
          <TabsTrigger value="transfers">Transfers</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="assets" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span className="flex items-center">
                  <Building className="h-5 w-5 mr-2" />
                  Asset Register
                </span>
                <Button onClick={() => toast({ title: 'Add Asset', description: 'Opening asset creation form' })}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Asset
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <EnhancedDataTable 
                columns={columns}
                data={assets}
                searchPlaceholder="Search assets..."
                exportable={true}
                refreshable={true}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="depreciation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingDown className="h-5 w-5 mr-2" />
                Depreciation Schedule
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {assets.map((asset) => (
                  <div key={asset.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold">{asset.description}</h4>
                      <Badge variant="outline">{asset.assetClass}</Badge>
                    </div>
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Original Cost:</span>
                        <div className="font-medium">${asset.acquisitionValue.toLocaleString()}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Accumulated Depreciation:</span>
                        <div className="font-medium">${asset.accumulatedDepreciation.toLocaleString()}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Net Book Value:</span>
                        <div className="font-medium">${asset.currentValue.toLocaleString()}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Annual Depreciation:</span>
                        <div className="font-medium">$125,000</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transfers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Asset Transfers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">No pending asset transfers</p>
                <Button onClick={() => toast({ title: 'Asset Transfer', description: 'Opening transfer form' })}>
                  <Plus className="h-4 w-4 mr-2" />
                  Initiate Transfer
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Asset Classes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['Buildings', 'Machinery', 'Vehicles', 'IT Equipment'].map((assetClass) => {
                    const classAssets = assets.filter(a => a.assetClass === assetClass);
                    const totalValue = classAssets.reduce((sum, a) => sum + a.currentValue, 0);
                    return (
                      <div key={assetClass} className="flex justify-between">
                        <span>{assetClass}</span>
                        <span className="font-medium">${totalValue.toLocaleString()}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Asset Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Active Assets</span>
                    <span className="font-medium">{assets.filter(a => a.status === 'Active').length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Under Construction</span>
                    <span className="font-medium">{assets.filter(a => a.status === 'Under Construction').length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Retired Assets</span>
                    <span className="font-medium">{assets.filter(a => a.status === 'Retired').length}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span>Depreciation Rate</span>
                    <span className="font-medium">5.8%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FixedAssets;

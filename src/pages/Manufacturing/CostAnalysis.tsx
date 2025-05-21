
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { useVoiceAssistantContext } from '../../context/VoiceAssistantContext';
import { useVoiceAssistant } from '../../hooks/useVoiceAssistant';
import PageHeader from '../../components/page/PageHeader';
import { ArrowLeft, Calendar, Filter, Download, BarChart2 } from 'lucide-react';
import { Card } from '../../components/ui/card';
import { DataTable } from '../../components/data/DataTable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';

const CostAnalysis: React.FC = () => {
  const navigate = useNavigate();
  const { isEnabled } = useVoiceAssistantContext();
  const { speak } = useVoiceAssistant();

  React.useEffect(() => {
    if (isEnabled) {
      speak('You are now viewing Cost Analysis. This page provides insights into production costs and cost variances.');
    }
  }, [isEnabled, speak]);

  // Sample data for product costs
  const productCosts = [
    { 
      product: 'Widget A', 
      planned: '12.45', 
      actual: '13.22', 
      variance: '0.77',
      variancePercent: '6.2%',
      material: '8.75',
      labor: '2.50',
      overhead: '1.97',
      status: 'Over Budget'
    },
    { 
      product: 'Widget B', 
      planned: '18.32', 
      actual: '17.89', 
      variance: '-0.43',
      variancePercent: '-2.3%',
      material: '12.30',
      labor: '3.25',
      overhead: '2.34',
      status: 'Under Budget'
    },
    { 
      product: 'Assembly C', 
      planned: '45.60', 
      actual: '48.75', 
      variance: '3.15',
      variancePercent: '6.9%',
      material: '32.50',
      labor: '10.75',
      overhead: '5.50',
      status: 'Over Budget'
    },
    { 
      product: 'Component D', 
      planned: '7.85', 
      actual: '7.92', 
      variance: '0.07',
      variancePercent: '0.9%',
      material: '5.45',
      labor: '1.25',
      overhead: '1.22',
      status: 'On Budget'
    }
  ];

  // Column definitions for the table
  const columns = [
    { key: 'product', header: 'Product' },
    { key: 'planned', header: 'Planned Cost ($)' },
    { key: 'actual', header: 'Actual Cost ($)' },
    { key: 'variance', header: 'Variance ($)' },
    { 
      key: 'variancePercent', 
      header: 'Variance %',
      render: (value: string) => {
        const isNegative = value.includes('-');
        const color = isNegative ? 'text-green-600' : value === '0.0%' ? 'text-gray-600' : 'text-red-600';
        return <span className={color}>{value}</span>;
      }
    },
    { key: 'material', header: 'Material ($)' },
    { key: 'labor', header: 'Labor ($)' },
    { key: 'overhead', header: 'Overhead ($)' },
    { 
      key: 'status', 
      header: 'Status',
      render: (value: string) => {
        let color = 'bg-gray-100 text-gray-800';
        if (value === 'Under Budget') color = 'bg-green-100 text-green-800';
        if (value === 'Over Budget') color = 'bg-red-100 text-red-800';
        if (value === 'On Budget') color = 'bg-blue-100 text-blue-800';
        
        return (
          <span className={`px-2 py-1 ${color} rounded-full text-xs`}>
            {value}
          </span>
        );
      }
    },
    { 
      key: 'actions', 
      header: 'Actions',
      render: (_, row: any) => (
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">Details</Button>
          <Button variant="outline" size="sm">Analyze</Button>
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
          title="Cost Analysis"
          description="Analyze production costs and identify cost-saving opportunities"
          voiceIntroduction="Welcome to Cost Analysis. Here you can analyze your production costs and identify opportunities for cost savings."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm text-gray-500 mb-2">Average Unit Cost</h3>
          <div className="text-3xl font-semibold mb-2">$21.95</div>
          <div className="flex items-center">
            <span className="text-red-500 text-sm font-medium">↑ $0.75</span>
            <span className="text-xs text-gray-500 ml-2">vs last month</span>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm text-gray-500 mb-2">Cost Variance</h3>
          <div className="text-3xl font-semibold mb-2">+3.7%</div>
          <div className="flex items-center">
            <span className="text-red-500 text-sm font-medium">↑ 0.5%</span>
            <span className="text-xs text-gray-500 ml-2">vs target</span>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm text-gray-500 mb-2">Material Cost Ratio</h3>
          <div className="text-3xl font-semibold mb-2">68.2%</div>
          <div className="flex items-center">
            <span className="text-green-500 text-sm font-medium">↓ 1.3%</span>
            <span className="text-xs text-gray-500 ml-2">vs last month</span>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm text-gray-500 mb-2">Cost Reduction</h3>
          <div className="text-3xl font-semibold mb-2">$42.5K</div>
          <div className="flex items-center">
            <span className="text-green-500 text-sm font-medium">↑ 15%</span>
            <span className="text-xs text-gray-500 ml-2">of target</span>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Cost Analysis</h2>
          <p className="text-sm text-gray-500">May 2025</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            Change Period
          </Button>
          <Button variant="outline" size="sm" className="flex items-center">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm" className="flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="product-costs" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="product-costs">Product Costs</TabsTrigger>
          <TabsTrigger value="work-center-costs">Work Center Costs</TabsTrigger>
          <TabsTrigger value="cost-drivers">Cost Drivers</TabsTrigger>
          <TabsTrigger value="trends">Cost Trends</TabsTrigger>
        </TabsList>
        
        <TabsContent value="product-costs">
          <Card className="p-6">
            <DataTable columns={columns} data={productCosts} className="w-full" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div>
                <h3 className="text-lg font-medium mb-4">Cost Structure</h3>
                <div className="h-64 bg-gray-100 rounded-md flex items-center justify-center">
                  <div className="text-center">
                    <BarChart2 className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Cost structure chart will be displayed here</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">Cost Variance Trend</h3>
                <div className="h-64 bg-gray-100 rounded-md flex items-center justify-center">
                  <div className="text-center">
                    <BarChart2 className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Cost variance trend chart will be displayed here</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="work-center-costs">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Work Center Costs</h2>
            <p className="text-gray-500 mb-6">Analysis of costs by work center</p>
            <div className="text-center py-12 border-dashed border-2 border-gray-300 rounded-md">
              <BarChart2 className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-400">Work center cost analysis will be displayed here</p>
              <p className="text-sm text-gray-400 mt-2">Showing cost performance by work center</p>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="cost-drivers">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Cost Drivers</h2>
            <p className="text-gray-500 mb-6">Analysis of primary cost drivers</p>
            <div className="text-center py-12 border-dashed border-2 border-gray-300 rounded-md">
              <BarChart2 className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-400">Cost driver analysis will be displayed here</p>
              <p className="text-sm text-gray-400 mt-2">Identifying key factors influencing production costs</p>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="trends">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Cost Trends</h2>
            <p className="text-gray-500 mb-6">Long-term cost performance trends</p>
            <div className="text-center py-12 border-dashed border-2 border-gray-300 rounded-md">
              <BarChart2 className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-400">Cost trend charts will be displayed here</p>
              <p className="text-sm text-gray-400 mt-2">Showing long-term cost performance and trends</p>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CostAnalysis;

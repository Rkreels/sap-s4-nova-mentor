
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { useVoiceAssistantContext } from '../../context/VoiceAssistantContext';
import { useVoiceAssistant } from '../../hooks/useVoiceAssistant';
import PageHeader from '../../components/page/PageHeader';
import { ArrowLeft, BarChart2, Calendar, ChevronRight, Download, FileText } from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';

const CostAnalysis: React.FC = () => {
  const navigate = useNavigate();
  const { isEnabled } = useVoiceAssistantContext();
  const { speak } = useVoiceAssistant();

  React.useEffect(() => {
    if (isEnabled) {
      speak('You are now viewing Cost Analysis. This page provides detailed analysis of production costs and variances.');
    }
  }, [isEnabled, speak]);

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
          description="Analyze production costs, variances, and identify cost-saving opportunities"
          voiceIntroduction="Welcome to Cost Analysis. Here you can analyze production costs and identify opportunities for cost reduction."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm text-gray-500 mb-2">Average Unit Cost</h3>
          <div className="text-3xl font-semibold mb-2">$4.32</div>
          <div className="flex items-center">
            <span className="text-green-500 text-sm font-medium">↓ $0.18</span>
            <span className="text-xs text-gray-500 ml-2">vs last month</span>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm text-gray-500 mb-2">Total Production Cost</h3>
          <div className="text-3xl font-semibold mb-2">$1.24M</div>
          <div className="flex items-center">
            <span className="text-red-500 text-sm font-medium">↑ 2.1%</span>
            <span className="text-xs text-gray-500 ml-2">vs budget</span>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm text-gray-500 mb-2">Material Cost Ratio</h3>
          <div className="text-3xl font-semibold mb-2">67.3%</div>
          <div className="flex items-center">
            <span className="text-red-500 text-sm font-medium">↑ 1.7%</span>
            <span className="text-xs text-gray-500 ml-2">vs target</span>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm text-gray-500 mb-2">Cost Saving Initiatives</h3>
          <div className="text-3xl font-semibold mb-2">$86.5K</div>
          <div className="flex items-center">
            <span className="text-green-500 text-sm font-medium">43.2% of target</span>
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
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm" className="flex items-center">
            <FileText className="h-4 w-4 mr-2" />
            Report
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="variance">Variance Analysis</TabsTrigger>
          <TabsTrigger value="breakdown">Cost Breakdown</TabsTrigger>
          <TabsTrigger value="trends">Cost Trends</TabsTrigger>
          <TabsTrigger value="savings">Cost Savings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <Card className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Cost Overview</h3>
                <div className="space-y-4">
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium">Direct Material Cost</span>
                    <span>$834,560</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium">Direct Labor Cost</span>
                    <span>$215,780</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium">Manufacturing Overhead</span>
                    <span>$189,420</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium">Total Manufacturing Cost</span>
                    <span className="font-semibold">$1,239,760</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Cost per Unit</span>
                    <span>$4.32</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">Cost Distribution</h3>
                <div className="h-64 bg-gray-100 rounded-md flex items-center justify-center">
                  <div className="text-center">
                    <BarChart2 className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Cost distribution chart will be displayed here</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className="text-lg font-medium mb-4">Cost by Product Line</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border p-3 text-left">Product Line</th>
                      <th className="border p-3 text-left">Total Cost</th>
                      <th className="border p-3 text-left">Units Produced</th>
                      <th className="border p-3 text-left">Cost per Unit</th>
                      <th className="border p-3 text-left">Variance vs Budget</th>
                      <th className="border p-3 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-gray-50">
                      <td className="border p-3">Product Line A</td>
                      <td className="border p-3">$458,320</td>
                      <td className="border p-3">96,500</td>
                      <td className="border p-3">$4.75</td>
                      <td className="border p-3 text-green-500">-2.3%</td>
                      <td className="border p-3">
                        <Button variant="outline" size="sm" className="flex items-center">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border p-3">Product Line B</td>
                      <td className="border p-3">$342,180</td>
                      <td className="border p-3">78,600</td>
                      <td className="border p-3">$4.35</td>
                      <td className="border p-3 text-red-500">+3.8%</td>
                      <td className="border p-3">
                        <Button variant="outline" size="sm" className="flex items-center">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border p-3">Product Line C</td>
                      <td className="border p-3">$284,760</td>
                      <td className="border p-3">72,400</td>
                      <td className="border p-3">$3.93</td>
                      <td className="border p-3 text-green-500">-1.7%</td>
                      <td className="border p-3">
                        <Button variant="outline" size="sm" className="flex items-center">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border p-3">Product Line D</td>
                      <td className="border p-3">$154,500</td>
                      <td className="border p-3">39,200</td>
                      <td className="border p-3">$3.94</td>
                      <td className="border p-3 text-green-500">-0.6%</td>
                      <td className="border p-3">
                        <Button variant="outline" size="sm" className="flex items-center">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr className="bg-gray-50">
                      <td className="border p-3 font-medium">Total</td>
                      <td className="border p-3 font-medium">$1,239,760</td>
                      <td className="border p-3 font-medium">286,700</td>
                      <td className="border p-3 font-medium">$4.32</td>
                      <td className="border p-3 font-medium text-red-500">+0.7%</td>
                      <td className="border p-3"></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="variance">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Variance Analysis</h2>
            <p className="text-gray-500 mb-6">Analysis of cost variances against plan and budget</p>
            <div className="text-center py-12 border-dashed border-2 border-gray-300 rounded-md">
              <BarChart2 className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-400">Variance analysis charts will be displayed here</p>
              <p className="text-sm text-gray-400 mt-2">Including price, volume, and efficiency variances</p>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="breakdown">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Cost Breakdown</h2>
            <p className="text-gray-500 mb-6">Detailed breakdown of production costs by category</p>
            <div className="text-center py-12 border-dashed border-2 border-gray-300 rounded-md">
              <BarChart2 className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-400">Cost breakdown charts will be displayed here</p>
              <p className="text-sm text-gray-400 mt-2">Including material, labor, overhead, and other cost categories</p>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="trends">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Cost Trends</h2>
            <p className="text-gray-500 mb-6">Historical cost trends and analysis</p>
            <div className="text-center py-12 border-dashed border-2 border-gray-300 rounded-md">
              <BarChart2 className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-400">Cost trend charts will be displayed here</p>
              <p className="text-sm text-gray-400 mt-2">Including historical cost data and trend analysis</p>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="savings">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Cost Savings Initiatives</h2>
            <p className="text-gray-500 mb-6">Track and manage cost saving initiatives and opportunities</p>
            <div className="text-center py-12 border-dashed border-2 border-gray-300 rounded-md">
              <BarChart2 className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-400">Cost savings tracking will be displayed here</p>
              <p className="text-sm text-gray-400 mt-2">Including active initiatives and potential opportunities</p>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CostAnalysis;

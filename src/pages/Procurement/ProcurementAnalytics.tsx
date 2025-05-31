
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { ArrowLeft, BarChart, TrendingUp, DollarSign, Users } from 'lucide-react';
import PageHeader from '../../components/page/PageHeader';
import { useVoiceAssistantContext } from '../../context/VoiceAssistantContext';
import { useVoiceAssistant } from '../../hooks/useVoiceAssistant';

const ProcurementAnalytics: React.FC = () => {
  const navigate = useNavigate();
  const { isEnabled } = useVoiceAssistantContext();
  const { speak } = useVoiceAssistant();

  useEffect(() => {
    if (isEnabled) {
      speak('Welcome to Procurement Analytics. Analyze procurement performance, spending patterns, and supplier metrics.');
    }
  }, [isEnabled, speak]);

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
          title="Procurement Analytics"
          description="Analyze procurement performance, spending patterns, and supplier metrics"
          voiceIntroduction="Welcome to Procurement Analytics."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center">
            <DollarSign className="h-8 w-8 text-green-600 mr-3" />
            <div>
              <h3 className="text-2xl font-bold">$12.5M</h3>
              <p className="text-sm text-gray-600">Total Spend (YTD)</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-blue-600 mr-3" />
            <div>
              <h3 className="text-2xl font-bold">15.2%</h3>
              <p className="text-sm text-gray-600">Cost Savings</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-purple-600 mr-3" />
            <div>
              <h3 className="text-2xl font-bold">128</h3>
              <p className="text-sm text-gray-600">Active Suppliers</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center">
            <BarChart className="h-8 w-8 text-orange-600 mr-3" />
            <div>
              <h3 className="text-2xl font-bold">87%</h3>
              <p className="text-sm text-gray-600">Contract Compliance</p>
            </div>
          </div>
        </Card>
      </div>

      <Tabs defaultValue="spending" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="spending">Spend Analysis</TabsTrigger>
          <TabsTrigger value="suppliers">Supplier Performance</TabsTrigger>
          <TabsTrigger value="savings">Cost Savings</TabsTrigger>
          <TabsTrigger value="kpis">KPIs</TabsTrigger>
        </TabsList>

        <TabsContent value="spending" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Spend by Category</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Electronics</span>
                  <span className="font-medium">$4.2M (34%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '34%' }}></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span>Office Supplies</span>
                  <span className="font-medium">$2.8M (22%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '22%' }}></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span>Services</span>
                  <span className="font-medium">$3.1M (25%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '25%' }}></div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Monthly Spend Trend</h3>
              <div className="h-64 flex items-end justify-between space-x-2">
                {[1.2, 1.8, 1.5, 2.1, 1.9, 2.3].map((value, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div 
                      className="bg-blue-500 w-8 rounded-t" 
                      style={{ height: `${value * 40}px` }}
                    ></div>
                    <span className="text-xs mt-2">M{index + 1}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="suppliers" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Top Supplier Performance</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 border rounded">
                <div>
                  <h4 className="font-medium">Tech Components Inc.</h4>
                  <p className="text-sm text-gray-600">On-time: 98% | Quality: 4.9/5</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">$1.2M</p>
                  <p className="text-sm text-gray-600">YTD Spend</p>
                </div>
              </div>
              
              <div className="flex justify-between items-center p-4 border rounded">
                <div>
                  <h4 className="font-medium">Office Solutions Ltd.</h4>
                  <p className="text-sm text-gray-600">On-time: 95% | Quality: 4.6/5</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">$850K</p>
                  <p className="text-sm text-gray-600">YTD Spend</p>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="savings" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Cost Savings Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 border rounded">
                <div className="text-2xl font-bold text-green-600">$1.9M</div>
                <div className="text-sm text-gray-500">Total Savings (YTD)</div>
              </div>
              <div className="text-center p-4 border rounded">
                <div className="text-2xl font-bold text-blue-600">15.2%</div>
                <div className="text-sm text-gray-500">Savings Rate</div>
              </div>
              <div className="text-center p-4 border rounded">
                <div className="text-2xl font-bold text-purple-600">$235K</div>
                <div className="text-sm text-gray-500">Avg Monthly Savings</div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="kpis" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Procurement KPIs</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span>PO Cycle Time</span>
                    <span>2.1 days</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Supplier On-time Delivery</span>
                    <span>92%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Compliance Metrics</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Contract Compliance</span>
                    <span>87%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: '87%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Budget Adherence</span>
                    <span>94%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-orange-500 h-2 rounded-full" style={{ width: '94%' }}></div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProcurementAnalytics;

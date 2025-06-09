
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { ArrowLeft, Plus, Search, Target, TrendingUp, Users } from 'lucide-react';
import PageHeader from '../../components/page/PageHeader';
import { useVoiceAssistantContext } from '../../context/VoiceAssistantContext';
import { useVoiceAssistant } from '../../hooks/useVoiceAssistant';
import { useToast } from '../../hooks/use-toast';

const SourceDetermination: React.FC = () => {
  const navigate = useNavigate();
  const { isEnabled } = useVoiceAssistantContext();
  const { speak } = useVoiceAssistant();
  const [activeTab, setActiveTab] = useState('overview');
  const { toast } = useToast();

  useEffect(() => {
    if (isEnabled) {
      speak('Welcome to Source Determination. Find and select the best suppliers for your procurement needs.');
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
          title="Source Determination"
          description="Find and select optimal suppliers for procurement requirements"
          voiceIntroduction="Welcome to Source Determination for strategic supplier selection."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">45</div>
            <div className="text-sm text-muted-foreground">Active Sources</div>
            <div className="text-sm text-green-600">Well diversified</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">12</div>
            <div className="text-sm text-muted-foreground">New Evaluations</div>
            <div className="text-sm text-blue-600">This month</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">94%</div>
            <div className="text-sm text-muted-foreground">Success Rate</div>
            <div className="text-sm text-green-600">Above target</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">8.5</div>
            <div className="text-sm text-muted-foreground">Avg. Days to Source</div>
            <div className="text-sm text-orange-600">Can improve</div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="search">Source Search</TabsTrigger>
          <TabsTrigger value="evaluation">Evaluation</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="h-5 w-5 mr-2" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => setActiveTab('search')}
                >
                  <Search className="h-4 w-4 mr-2" />
                  Find New Sources
                </Button>
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => toast({ title: 'RFQ', description: 'Opening RFQ creation form' })}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create RFQ
                </Button>
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => setActiveTab('evaluation')}
                >
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Evaluate Suppliers
                </Button>
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => navigate('/procurement/supplier-management')}
                >
                  <Users className="h-4 w-4 mr-2" />
                  Manage Suppliers
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border rounded">
                    <div className="font-medium">IT Equipment Sourcing</div>
                    <div className="text-sm text-muted-foreground">3 suppliers evaluated • 2 days ago</div>
                    <Badge variant="outline" className="mt-1">Completed</Badge>
                  </div>
                  <div className="p-3 border rounded">
                    <div className="font-medium">Office Supplies RFQ</div>
                    <div className="text-sm text-muted-foreground">5 responses received • 1 week ago</div>
                    <Badge variant="outline" className="mt-1">In Progress</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="search" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Source Search & Discovery</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded">
                    <h4 className="font-semibold mb-2">By Category</h4>
                    <div className="space-y-2">
                      {['Technology', 'Office Supplies', 'Manufacturing', 'Services'].map((category) => (
                        <Button key={category} variant="outline" size="sm" className="w-full">
                          {category}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div className="p-4 border rounded">
                    <h4 className="font-semibold mb-2">By Location</h4>
                    <div className="space-y-2">
                      {['Local', 'National', 'International', 'Preferred Regions'].map((location) => (
                        <Button key={location} variant="outline" size="sm" className="w-full">
                          {location}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div className="p-4 border rounded">
                    <h4 className="font-semibold mb-2">By Criteria</h4>
                    <div className="space-y-2">
                      {['Price Competitive', 'Quality Focus', 'Fast Delivery', 'Certified'].map((criteria) => (
                        <Button key={criteria} variant="outline" size="sm" className="w-full">
                          {criteria}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="evaluation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Supplier Evaluation Matrix</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded">
                    <h4 className="font-semibold mb-2">Evaluation Criteria</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Price Competitiveness</span>
                        <span className="font-medium">30%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Quality Standards</span>
                        <span className="font-medium">25%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Delivery Performance</span>
                        <span className="font-medium">20%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Financial Stability</span>
                        <span className="font-medium">15%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Innovation Capability</span>
                        <span className="font-medium">10%</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border rounded">
                    <h4 className="font-semibold mb-2">Evaluation Tools</h4>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm" className="w-full">
                        Supplier Scorecard
                      </Button>
                      <Button variant="outline" size="sm" className="w-full">
                        Risk Assessment
                      </Button>
                      <Button variant="outline" size="sm" className="w-full">
                        Financial Analysis
                      </Button>
                      <Button variant="outline" size="sm" className="w-full">
                        Reference Checks
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sourcing Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold">Tech Components Inc.</h4>
                    <Badge>Recommended</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    High performance in IT equipment supply with excellent delivery record.
                  </p>
                  <div className="flex space-x-2">
                    <Button size="sm">Select Supplier</Button>
                    <Button size="sm" variant="outline">View Details</Button>
                  </div>
                </div>
                <div className="p-4 border rounded">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold">Global Office Solutions</h4>
                    <Badge variant="outline">Consider</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Competitive pricing for office supplies but needs improvement in delivery times.
                  </p>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">Request Quote</Button>
                    <Button size="sm" variant="outline">View Details</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SourceDetermination;

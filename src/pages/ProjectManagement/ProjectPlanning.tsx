
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Progress } from '../../components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { ArrowLeft, Calendar, Users, Target, FileText, AlertTriangle, Clock } from 'lucide-react';
import PageHeader from '../../components/page/PageHeader';
import { useVoiceAssistantContext } from '../../context/VoiceAssistantContext';
import { useVoiceAssistant } from '../../hooks/useVoiceAssistant';
import DataTable from '../../components/data/DataTable';

const projectTemplates = [
  { id: 'TEMP-001', name: 'Software Development', type: 'IT', duration: '6 months', phases: 5 },
  { id: 'TEMP-002', name: 'Construction Project', type: 'Infrastructure', duration: '12 months', phases: 8 },
  { id: 'TEMP-003', name: 'Marketing Campaign', type: 'Marketing', duration: '3 months', phases: 4 },
  { id: 'TEMP-004', name: 'ERP Implementation', type: 'IT', duration: '9 months', phases: 6 },
];

const projectPlans = [
  { id: 'PLAN-001', name: 'Q2 Digital Transformation', status: 'Draft', progress: 25, estimatedCost: '€450,000' },
  { id: 'PLAN-002', name: 'Facility Upgrade Project', status: 'In Review', progress: 60, estimatedCost: '€280,000' },
  { id: 'PLAN-003', name: 'Product Launch Initiative', status: 'Approved', progress: 100, estimatedCost: '€320,000' },
];

const ProjectPlanning: React.FC = () => {
  const navigate = useNavigate();
  const { isEnabled } = useVoiceAssistantContext();
  const { speak } = useVoiceAssistant();
  const [activeTab, setActiveTab] = useState('planning');

  useEffect(() => {
    if (isEnabled) {
      speak('Welcome to Project Planning. Here you can create project plans, define objectives, allocate resources, and set timelines for successful project execution.');
    }
  }, [isEnabled, speak]);

  const templateColumns = [
    { key: 'name', header: 'Template Name' },
    { key: 'type', header: 'Type' },
    { key: 'duration', header: 'Duration' },
    { key: 'phases', header: 'Phases' },
    { 
      key: 'actions', 
      header: 'Actions',
      render: () => <Button variant="outline" size="sm">Use Template</Button>
    }
  ];

  const planColumns = [
    { key: 'name', header: 'Plan Name' },
    { 
      key: 'status', 
      header: 'Status',
      render: (value: string) => (
        <Badge variant={
          value === 'Approved' ? 'default' : 
          value === 'In Review' ? 'secondary' : 'outline'
        }>
          {value}
        </Badge>
      )
    },
    { 
      key: 'progress', 
      header: 'Progress',
      render: (value: number) => (
        <div className="w-full">
          <Progress value={value} className="h-2" />
          <div className="text-xs text-right mt-1">{value}%</div>
        </div>
      )
    },
    { key: 'estimatedCost', header: 'Estimated Cost' },
    { 
      key: 'actions', 
      header: 'Actions',
      render: () => <Button variant="outline" size="sm">Edit</Button>
    }
  ];

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex items-center mb-4">
        <Button 
          variant="outline" 
          size="sm" 
          className="mr-4"
          onClick={() => navigate('/project-management')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back
        </Button>
        <PageHeader
          title="Project Planning"
          description="Create and manage project plans, define objectives, and set timelines"
          voiceIntroduction="Welcome to Project Planning management."
        />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="planning">Planning</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="objectives">Objectives</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
        </TabsList>

        <TabsContent value="planning" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6">
              <div className="flex items-center mb-4">
                <Target className="h-8 w-8 text-blue-600 mr-3" />
                <h3 className="text-lg font-semibold">Project Plans</h3>
              </div>
              <p className="text-gray-600 mb-4">Create and manage comprehensive project plans</p>
              <Button className="w-full">Create New Plan</Button>
            </Card>

            <Card className="p-6">
              <div className="flex items-center mb-4">
                <Calendar className="h-8 w-8 text-green-600 mr-3" />
                <h3 className="text-lg font-semibold">Schedule Planning</h3>
              </div>
              <p className="text-gray-600 mb-4">Define project timelines and milestones</p>
              <Button variant="outline" className="w-full">Plan Schedule</Button>
            </Card>

            <Card className="p-6">
              <div className="flex items-center mb-4">
                <Users className="h-8 w-8 text-purple-600 mr-3" />
                <h3 className="text-lg font-semibold">Resource Planning</h3>
              </div>
              <p className="text-gray-600 mb-4">Allocate and plan project resources</p>
              <Button variant="outline" className="w-full">Plan Resources</Button>
            </Card>
          </div>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Current Project Plans</h3>
            <DataTable 
              columns={planColumns}
              data={projectPlans}
              className="border rounded-md"
            />
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Project Templates</h3>
              <Button>Create Template</Button>
            </div>
            <DataTable 
              columns={templateColumns}
              data={projectTemplates}
              className="border rounded-md"
            />
          </Card>
        </TabsContent>

        <TabsContent value="objectives" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Project Objectives & Goals</h3>
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2">Strategic Objectives</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Increase operational efficiency by 25%</li>
                  <li>• Reduce project delivery time by 30%</li>
                  <li>• Improve customer satisfaction scores</li>
                </ul>
              </div>
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2">Key Performance Indicators</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Budget adherence: 95%</li>
                  <li>• Timeline compliance: 90%</li>
                  <li>• Quality metrics: 98%</li>
                </ul>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Project Timeline Management</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <Clock className="h-5 w-5 text-blue-600 mr-2" />
                    <h4 className="font-medium">Phase 1: Planning</h4>
                  </div>
                  <Progress value={100} className="mb-2" />
                  <p className="text-sm text-gray-600">Jan 1 - Jan 31, 2025</p>
                </div>
                <div className="border rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <Clock className="h-5 w-5 text-orange-600 mr-2" />
                    <h4 className="font-medium">Phase 2: Execution</h4>
                  </div>
                  <Progress value={65} className="mb-2" />
                  <p className="text-sm text-gray-600">Feb 1 - May 31, 2025</p>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectPlanning;

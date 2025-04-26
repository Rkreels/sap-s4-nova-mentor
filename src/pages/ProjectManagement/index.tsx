
import React, { useEffect } from 'react';
import { useVoiceAssistantContext } from '../../context/VoiceAssistantContext';
import { useVoiceAssistant } from '../../hooks/useVoiceAssistant';
import PageHeader from '../../components/page/PageHeader';
import SAPSection from '../../components/SAPSection';
import ProjectOverview from './components/ProjectOverview';
import ProjectResources from './components/ProjectResources';
import ProjectAnalytics from './components/ProjectAnalytics';
import { Calendar, ClipboardList, Users, BarChart3 } from 'lucide-react';

const ProjectManagement: React.FC = () => {
  const { isEnabled } = useVoiceAssistantContext();
  const { speak, stop } = useVoiceAssistant();
  
  useEffect(() => {
    if (isEnabled) {
      // Make sure we stop any current speech before starting a new one
      stop();
      speak(`Welcome to the Project Management module. Here you can plan, execute, and monitor your projects effectively. 
      This module provides tools for resource planning, task management, and project tracking. You can see your active 
      projects, manage resources, and analyze project performance metrics all in one place.`);
    }
  }, [isEnabled, speak, stop]);
  
  return (
    <div>
      <PageHeader 
        title="Project Management" 
        voiceIntroduction="Welcome to the Project Management module. Here you can plan, execute, and monitor your projects effectively."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded shadow-sm border border-gray-100">
          <div className="flex items-center mb-6">
            <div className="bg-blue-100 p-3 rounded-lg mr-4">
              <ClipboardList className="h-6 w-6 text-blue-600" />
            </div>
            <h2 className="text-xl font-semibold">Project Overview</h2>
          </div>
          
          <div className="space-y-3">
            <button className="w-full text-left py-2 px-3 hover:bg-gray-50 rounded text-sm font-medium">
              Active Projects
            </button>
            <button className="w-full text-left py-2 px-3 hover:bg-gray-50 rounded text-sm font-medium">
              Create Project
            </button>
            <button className="w-full text-left py-2 px-3 hover:bg-gray-50 rounded text-sm font-medium">
              Project Templates
            </button>
            <button className="w-full text-left py-2 px-3 hover:bg-gray-50 rounded text-sm font-medium">
              Archive
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded shadow-sm border border-gray-100">
          <div className="flex items-center mb-6">
            <div className="bg-green-100 p-3 rounded-lg mr-4">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <h2 className="text-xl font-semibold">Resources</h2>
          </div>
          
          <div className="space-y-3">
            <button className="w-full text-left py-2 px-3 hover:bg-gray-50 rounded text-sm font-medium">
              Resource Planning
            </button>
            <button className="w-full text-left py-2 px-3 hover:bg-gray-50 rounded text-sm font-medium">
              Time Recording
            </button>
            <button className="w-full text-left py-2 px-3 hover:bg-gray-50 rounded text-sm font-medium">
              Resource Calendar
            </button>
            <button className="w-full text-left py-2 px-3 hover:bg-gray-50 rounded text-sm font-medium">
              Team Management
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded shadow-sm border border-gray-100">
          <div className="flex items-center mb-6">
            <div className="bg-purple-100 p-3 rounded-lg mr-4">
              <Calendar className="h-6 w-6 text-purple-600" />
            </div>
            <h2 className="text-xl font-semibold">Schedule</h2>
          </div>
          
          <div className="space-y-3">
            <button className="w-full text-left py-2 px-3 hover:bg-gray-50 rounded text-sm font-medium">
              Project Timeline
            </button>
            <button className="w-full text-left py-2 px-3 hover:bg-gray-50 rounded text-sm font-medium">
              Milestones
            </button>
            <button className="w-full text-left py-2 px-3 hover:bg-gray-50 rounded text-sm font-medium">
              Task Management
            </button>
            <button className="w-full text-left py-2 px-3 hover:bg-gray-50 rounded text-sm font-medium">
              Gantt Chart
            </button>
          </div>
        </div>
      </div>

      <SAPSection title="Latest Project Activities">
        <div className="col-span-full">
          <ProjectOverview />
        </div>
      </SAPSection>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="bg-orange-100 p-2 rounded-lg mr-4">
                <BarChart3 className="h-5 w-5 text-orange-600" />
              </div>
              <h2 className="text-lg font-semibold">Project Analytics</h2>
            </div>
            <button className="text-sm text-blue-500">View All</button>
          </div>
          
          <ProjectAnalytics />
        </div>

        <div className="bg-white p-6 rounded shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="bg-teal-100 p-2 rounded-lg mr-4">
                <Users className="h-5 w-5 text-teal-600" />
              </div>
              <h2 className="text-lg font-semibold">Resource Allocation</h2>
            </div>
            <button className="text-sm text-blue-500">Manage</button>
          </div>
          
          <ProjectResources />
        </div>
      </div>
    </div>
  );
};

export default ProjectManagement;

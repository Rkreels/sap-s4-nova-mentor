
import React, { useEffect } from 'react';
import { useVoiceAssistantContext } from '../../context/VoiceAssistantContext';
import { useVoiceAssistant } from '../../hooks/useVoiceAssistant';
import PageHeader from '../../components/page/PageHeader';
import SAPSection from '../../components/SAPSection';
import ProjectOverview from './components/ProjectOverview';
import ProjectResources from './components/ProjectResources';
import ProjectAnalytics from './components/ProjectAnalytics';
import SAPTile from '../../components/SAPTile';

const ProjectManagement: React.FC = () => {
  const { isEnabled } = useVoiceAssistantContext();
  const { speak } = useVoiceAssistant();
  
  useEffect(() => {
    if (isEnabled) {
      speak(`Welcome to the Project Management module. Here you can plan, execute, and monitor your projects effectively. 
      This module provides tools for resource planning, task management, and project tracking. You can see your active 
      projects, manage resources, and analyze project performance metrics all in one place. For example, you can use 
      the Project Overview section to monitor ongoing projects, their completion percentages, and upcoming deadlines.`);
    }
  }, [isEnabled, speak]);
  
  return (
    <div>
      <PageHeader 
        title="Project Management" 
        voiceIntroduction="Welcome to the Project Management module. Here you can plan, execute, and monitor your projects effectively. This module provides tools for resource planning, task management, and project tracking."
      />

      <SAPSection 
        title="Project Overview" 
        isVoiceAssistantEnabled={isEnabled}
        description="View and manage your active projects."
        examples="The Project Overview section provides visibility into all your ongoing projects, their status, timelines, and key metrics."
      >
        <SAPTile
          title="Plan Customer Projects"
          isVoiceAssistantEnabled={isEnabled}
          description="Create and plan new customer projects."
          icon={<span className="text-xl">0</span>}
          subtitle="My Projects"
          examples="Use this feature to create new customer projects, define project scope, timeline, and deliverables."
        />
        
        <SAPTile
          title="Event-Based Revenue Recognition"
          subtitle="Projects"
          isVoiceAssistantEnabled={isEnabled}
          description="Manage revenue recognition for project milestones."
          examples="This tool helps you recognize revenue based on project milestones and completion events."
        />
        
        <SAPTile
          title="Review Customer Projects"
          isVoiceAssistantEnabled={isEnabled}
          description="Review and approve customer project proposals."
          icon={<span className="text-xl">0</span>}
          subtitle="Pending Forecast"
          examples="Use this feature to review project proposals, check forecasts, and approve project plans."
        />
        
        <SAPTile
          title="Manage My Timesheet"
          isVoiceAssistantEnabled={isEnabled}
          description="Track and report time spent on project activities."
          icon={<span className="text-xl">0</span>}
          subtitle="Hours Missing"
          examples="Record the time you spend on different project tasks to ensure accurate tracking and billing."
        />
      </SAPSection>

      <SAPSection 
        title="Resources" 
        isVoiceAssistantEnabled={isEnabled}
        description="Manage project resources and assignments."
        examples="The Resources section helps you allocate team members to projects, track time spent on activities, and manage resource utilization."
      >
        <ProjectResources />
      </SAPSection>

      <SAPSection 
        title="Project Analytics" 
        isVoiceAssistantEnabled={isEnabled}
        description="Track project performance metrics and trends."
        examples="Use Project Analytics to monitor project health, budget utilization, timeline adherence, and resource efficiency."
      >
        <ProjectAnalytics />
      </SAPSection>
    </div>
  );
};

export default ProjectManagement;

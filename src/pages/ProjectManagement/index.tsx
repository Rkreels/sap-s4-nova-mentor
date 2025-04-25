
import React from 'react';
import { useVoiceAssistantContext } from '../../context/VoiceAssistantContext';
import PageHeader from '../../components/page/PageHeader';
import SAPSection from '../../components/SAPSection';
import ProjectOverview from './components/ProjectOverview';
import ProjectResources from './components/ProjectResources';
import ProjectAnalytics from './components/ProjectAnalytics';

const ProjectManagement: React.FC = () => {
  const { isEnabled } = useVoiceAssistantContext();
  
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
        <ProjectOverview />
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

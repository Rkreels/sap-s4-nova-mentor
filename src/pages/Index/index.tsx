
import React, { useEffect } from 'react';
import { useVoiceAssistant } from '../../hooks/useVoiceAssistant';
import { useVoiceAssistantContext } from '../../context/VoiceAssistantContext';
import NewsFeed from './components/NewsFeed';
import PageSection from './components/PageSection';
import AppsSection from './components/AppsSection';
import InsightSection from './components/InsightSection';
import TodoSection from './components/TodoSection';

const Index: React.FC = () => {
  const { isEnabled } = useVoiceAssistantContext();
  const { speak } = useVoiceAssistant();
  
  useEffect(() => {
    if (isEnabled) {
      speak(`Welcome to the SAP S/4HANA dashboard. This is your main workspace where you can access all modules and functions 
      of the system. The layout is organized into sections like News, Pages, Apps, Insights, and To-Dos. 
      For example, in the Pages section, you'll find quick access to modules like Finance, Manufacturing, 
      Procurement, and Sales. The Apps section shows recommended applications based on your usage patterns 
      and role. You can navigate through different modules using the tabs in the navigation bar above.`);
    }
  }, [isEnabled, speak]);

  const handleManageNews = () => {
    console.log('Manage news clicked');
  };

  const handleHomeSettings = () => {
    console.log('Home settings clicked');
  };

  const handleManagePages = () => {
    console.log('Manage pages clicked');
  };

  return (
    <div className="container mx-auto">
      <NewsFeed 
        title="News" 
        onManageNews={handleManageNews} 
        onSettings={handleHomeSettings} 
      />
      
      <PageSection 
        title="Pages" 
        onManagePages={handleManagePages} 
        onSettings={handleHomeSettings} 
      />
      
      <AppsSection title="Apps" />
      
      <InsightSection title="Insights" count={2} />
      
      <TodoSection title="To-Dos" count={0} />
    </div>
  );
};

export default Index;

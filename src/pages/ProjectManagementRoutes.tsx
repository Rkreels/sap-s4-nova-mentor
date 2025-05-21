
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProjectManagement from './ProjectManagement';
import ProjectDetail from './ProjectManagement/ProjectDetail';

const ProjectManagementRoutes: React.FC = () => {
  return (
    <Routes>
      <Route index element={<ProjectManagement />} />
      <Route path="project/:projectId" element={<ProjectDetail />} />
    </Routes>
  );
};

export default ProjectManagementRoutes;

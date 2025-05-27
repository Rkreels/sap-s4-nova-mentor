
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MasterData from './MasterData';

const MasterDataRoutes: React.FC = () => {
  return (
    <Routes>
      <Route index element={<MasterData />} />
    </Routes>
  );
};

export default MasterDataRoutes;

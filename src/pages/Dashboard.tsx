
import React from 'react';
import { Card } from '@/components/ui/card';

const Dashboard: React.FC = () => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <h2 className="text-lg font-medium">Finance</h2>
          <p className="text-sm text-muted-foreground mt-2">
            Manage financial operations, accounting, and reporting
          </p>
        </Card>
        
        <Card className="p-4">
          <h2 className="text-lg font-medium">Manufacturing</h2>
          <p className="text-sm text-muted-foreground mt-2">
            Oversee production, quality control, and manufacturing operations
          </p>
        </Card>
        
        <Card className="p-4">
          <h2 className="text-lg font-medium">Supply Chain</h2>
          <p className="text-sm text-muted-foreground mt-2">
            Handle procurement, inventory, and logistics
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;

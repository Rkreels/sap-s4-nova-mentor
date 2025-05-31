
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { ArrowLeft, Plus, Edit, Eye, User, Phone, Mail, MapPin } from 'lucide-react';
import PageHeader from '../../components/page/PageHeader';
import { useVoiceAssistantContext } from '../../context/VoiceAssistantContext';
import { useVoiceAssistant } from '../../hooks/useVoiceAssistant';
import DataTable from '../../components/data/DataTable';

const EmployeeCentral: React.FC = () => {
  const navigate = useNavigate();
  const { isEnabled } = useVoiceAssistantContext();
  const { speak } = useVoiceAssistant();

  useEffect(() => {
    if (isEnabled) {
      speak('Welcome to Employee Central. Manage employee master data, organizational assignments, and self-service functionality.');
    }
  }, [isEnabled, speak]);

  const employees = [
    {
      id: 'EMP-001',
      firstName: 'John',
      lastName: 'Smith',
      email: 'john.smith@company.com',
      position: 'Software Engineer',
      department: 'IT',
      manager: 'Jane Doe',
      startDate: '2023-01-15',
      status: 'Active',
      location: 'New York'
    },
    {
      id: 'EMP-002',
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah.johnson@company.com',
      position: 'HR Manager',
      department: 'Human Resources',
      manager: 'Mike Wilson',
      startDate: '2022-03-10',
      status: 'Active',
      location: 'Chicago'
    },
    {
      id: 'EMP-003',
      firstName: 'Michael',
      lastName: 'Brown',
      email: 'michael.brown@company.com',
      position: 'Sales Representative',
      department: 'Sales',
      manager: 'Lisa Davis',
      startDate: '2023-06-01',
      status: 'On Leave',
      location: 'Los Angeles'
    }
  ];

  const columns = [
    { key: 'id', header: 'Employee ID' },
    { 
      key: 'name', 
      header: 'Name',
      render: (_, row: any) => `${row.firstName} ${row.lastName}`
    },
    { key: 'email', header: 'Email' },
    { key: 'position', header: 'Position' },
    { key: 'department', header: 'Department' },
    { key: 'manager', header: 'Manager' },
    { key: 'startDate', header: 'Start Date' },
    { 
      key: 'status', 
      header: 'Status',
      render: (value: string) => {
        const colors = {
          'Active': 'bg-green-100 text-green-800',
          'On Leave': 'bg-yellow-100 text-yellow-800',
          'Inactive': 'bg-red-100 text-red-800'
        };
        return (
          <Badge className={colors[value as keyof typeof colors]}>
            {value}
          </Badge>
        );
      }
    },
    { 
      key: 'actions', 
      header: 'Actions',
      render: (_, row: any) => (
        <div className="flex space-x-2">
          <Button variant="ghost" size="sm" title="View">
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" title="Edit">
            <Edit className="h-4 w-4" />
          </Button>
        </div>
      )
    }
  ];

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex items-center mb-4">
        <Button 
          variant="outline" 
          size="sm" 
          className="mr-4"
          onClick={() => navigate('/human-resources')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back
        </Button>
        <PageHeader
          title="Employee Central"
          description="Central hub for employee information and self-service"
          voiceIntroduction="Welcome to Employee Central."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="text-sm text-gray-500">Total Employees</div>
          <div className="text-2xl font-bold">1,247</div>
          <div className="text-sm text-blue-600">Active workforce</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-gray-500">New Hires</div>
          <div className="text-2xl font-bold">23</div>
          <div className="text-sm text-green-600">This month</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-gray-500">On Leave</div>
          <div className="text-2xl font-bold">45</div>
          <div className="text-sm text-yellow-600">Currently away</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-gray-500">Departments</div>
          <div className="text-2xl font-bold">12</div>
          <div className="text-sm text-purple-600">Active units</div>
        </Card>
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Employee Directory</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Employee
        </Button>
      </div>

      <Card className="p-6">
        <DataTable columns={columns} data={employees} />
      </Card>
    </div>
  );
};

export default EmployeeCentral;

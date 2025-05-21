
import React from 'react';
import { Card, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/table';

// Sample data for supplier contracts
const contracts = [
  { id: "CNT-2025-042", description: "Annual Supply Agreement", start: "01/01/2025", end: "12/31/2025", value: "1,250,000.00 USD", status: "Active" },
  { id: "CNT-2024-185", description: "Service Level Agreement", start: "07/01/2024", end: "06/30/2025", value: "350,000.00 USD", status: "Active" },
  { id: "CNT-2023-098", description: "Special Pricing Agreement", start: "01/01/2023", end: "12/31/2024", value: "800,000.00 USD", status: "Expired" }
];

const SupplierContracts: React.FC = () => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Active Contracts</h2>
          <Button variant="outline" size="sm">Manage Contracts</Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Contract ID</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contracts.filter(c => c.status === 'Active').map((contract) => (
              <TableRow key={contract.id}>
                <TableCell className="font-medium">{contract.id}</TableCell>
                <TableCell>{contract.description}</TableCell>
                <TableCell>{contract.start}</TableCell>
                <TableCell>{contract.end}</TableCell>
                <TableCell>{contract.value}</TableCell>
                <TableCell>
                  <Badge>
                    {contract.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default SupplierContracts;

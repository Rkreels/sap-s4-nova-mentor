
import React from 'react';
import { Card, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/table';

// Sample data for supplier materials
const materials = [
  { id: "MAT-10045", name: "High-capacity Server Memory", category: "Electronics", price: "854.00 USD", leadTime: "21 days" },
  { id: "MAT-10032", name: "Data Center Cooling Unit", category: "Equipment", price: "4,250.00 USD", leadTime: "40 days" },
  { id: "MAT-10028", name: "Fiber Optic Cable (per m)", category: "Networking", price: "12.50 USD", leadTime: "14 days" },
  { id: "MAT-10021", name: "Enterprise SSD Storage", category: "Storage", price: "745.00 USD", leadTime: "7 days" }
];

const SupplierMaterials: React.FC = () => {
  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Supplied Materials</h2>
          <Button variant="outline" size="sm">View All</Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Material</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Lead Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {materials.slice(0, 3).map((material) => (
              <TableRow key={material.id}>
                <TableCell className="font-medium">{material.name}</TableCell>
                <TableCell>{material.category}</TableCell>
                <TableCell>{material.price}</TableCell>
                <TableCell>{material.leadTime}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default SupplierMaterials;

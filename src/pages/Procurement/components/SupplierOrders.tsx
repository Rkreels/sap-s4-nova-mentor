
import React from 'react';
import { Card, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/table';

// Sample data for supplier orders
const recentOrders = [
  { id: "4500012765", date: "05/15/2025", delivery: "06/01/2025", value: "125,000.00 USD", status: "Open", items: 12 },
  { id: "4500012681", date: "04/22/2025", delivery: "05/05/2025", value: "78,350.00 USD", status: "Delivered", items: 8 },
  { id: "4500012597", date: "03/18/2025", delivery: "04/01/2025", value: "54,800.00 USD", status: "Delivered", items: 15 },
  { id: "4500012492", date: "02/25/2025", delivery: "03/10/2025", value: "92,600.00 USD", status: "Delivered", items: 10 },
  { id: "4500012388", date: "01/12/2025", delivery: "01/28/2025", value: "67,450.00 USD", status: "Delivered", items: 7 }
];

const SupplierOrders: React.FC = () => {
  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Recent Purchase Orders</h2>
          <Button variant="outline" size="sm">View All</Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>PO Number</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentOrders.slice(0, 3).map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>{order.value}</TableCell>
                <TableCell>
                  <Badge variant={order.status === 'Open' ? 'outline' : 'default'}>
                    {order.status}
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

export default SupplierOrders;

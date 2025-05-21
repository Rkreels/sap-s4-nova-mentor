
import React from 'react';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { MapPin, Phone, Mail, Globe, FileText, Star, TrendingUp, BarChart } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/table';

interface Supplier {
  id: string;
  name: string;
  status: string;
  rating: number;
  contactPerson: string;
  email: string;
  phone: string;
  website: string;
  address: string;
  country: string;
  category: string;
  totalSpend: string;
  lastOrder: string;
  paymentTerms: string;
  deliveryTerm: string;
  currency: string;
}

interface SupplierDetailsProps {
  supplier: Supplier;
}

const SupplierDetails: React.FC<SupplierDetailsProps> = ({ supplier }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold">{supplier.name}</h1>
          <div className="flex items-center gap-3 mt-2">
            <Badge variant={supplier.status === 'Active' ? 'default' : 'outline'}>
              {supplier.status}
            </Badge>
            <div className="flex items-center">
              {Array(5).fill(0).map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-4 w-4 ${i < supplier.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                />
              ))}
            </div>
            <span className="text-sm text-gray-500">Supplier ID: {supplier.id}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Documents
          </Button>
          <Button variant="default" size="sm">
            Edit Supplier
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
          <ul className="space-y-3">
            <li className="flex">
              <Mail className="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <div className="text-sm text-gray-500">Email</div>
                <div className="font-medium">{supplier.email}</div>
              </div>
            </li>
            <li className="flex">
              <Phone className="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <div className="text-sm text-gray-500">Phone</div>
                <div className="font-medium">{supplier.phone}</div>
              </div>
            </li>
            <li className="flex">
              <Globe className="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <div className="text-sm text-gray-500">Website</div>
                <div className="font-medium">{supplier.website}</div>
              </div>
            </li>
            <li className="flex">
              <MapPin className="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <div className="text-sm text-gray-500">Address</div>
                <div className="font-medium">{supplier.address}</div>
                <div className="text-sm">{supplier.country}</div>
              </div>
            </li>
          </ul>
        </Card>
        
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Business Information</h2>
          <ul className="space-y-3">
            <li className="flex justify-between">
              <span className="text-gray-500">Contact Person</span>
              <span className="font-medium">{supplier.contactPerson}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-500">Category</span>
              <span className="font-medium">{supplier.category}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-500">Payment Terms</span>
              <span className="font-medium">{supplier.paymentTerms}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-500">Delivery Terms</span>
              <span className="font-medium">{supplier.deliveryTerm}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-500">Currency</span>
              <span className="font-medium">{supplier.currency}</span>
            </li>
          </ul>
        </Card>
        
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Performance Metrics</h2>
          <ul className="space-y-3">
            <li className="flex items-center">
              <TrendingUp className="h-5 w-5 text-blue-500 mr-3" />
              <div>
                <div className="text-sm text-gray-500">Total Spend</div>
                <div className="font-medium">{supplier.totalSpend}</div>
              </div>
            </li>
            <li className="flex items-center">
              <BarChart className="h-5 w-5 text-green-500 mr-3" />
              <div>
                <div className="text-sm text-gray-500">On-Time Delivery</div>
                <div className="font-medium">92%</div>
              </div>
            </li>
            <li className="flex items-center">
              <BarChart className="h-5 w-5 text-purple-500 mr-3" />
              <div>
                <div className="text-sm text-gray-500">Quality Rating</div>
                <div className="font-medium">4.8/5.0</div>
              </div>
            </li>
            <li className="flex items-center">
              <FileText className="h-5 w-5 text-orange-500 mr-3" />
              <div>
                <div className="text-sm text-gray-500">Last Order</div>
                <div className="font-medium">{supplier.lastOrder}</div>
              </div>
            </li>
          </ul>
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>PO Number</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Delivery Date</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Items</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>4500012765</TableCell>
              <TableCell>05/15/2025</TableCell>
              <TableCell>06/01/2025</TableCell>
              <TableCell>125,000.00 USD</TableCell>
              <TableCell>
                <Badge variant="outline">
                  Open
                </Badge>
              </TableCell>
              <TableCell>12</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>4500012681</TableCell>
              <TableCell>04/22/2025</TableCell>
              <TableCell>05/05/2025</TableCell>
              <TableCell>78,350.00 USD</TableCell>
              <TableCell>
                <Badge>
                  Delivered
                </Badge>
              </TableCell>
              <TableCell>8</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>4500012597</TableCell>
              <TableCell>03/18/2025</TableCell>
              <TableCell>04/01/2025</TableCell>
              <TableCell>54,800.00 USD</TableCell>
              <TableCell>
                <Badge>
                  Delivered
                </Badge>
              </TableCell>
              <TableCell>15</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Contracts</h2>
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
            <TableRow>
              <TableCell>CNT-2025-042</TableCell>
              <TableCell>Annual Supply Agreement</TableCell>
              <TableCell>01/01/2025</TableCell>
              <TableCell>12/31/2025</TableCell>
              <TableCell>1,250,000.00 USD</TableCell>
              <TableCell>
                <Badge>
                  Active
                </Badge>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>CNT-2024-185</TableCell>
              <TableCell>Service Level Agreement</TableCell>
              <TableCell>07/01/2024</TableCell>
              <TableCell>06/30/2025</TableCell>
              <TableCell>350,000.00 USD</TableCell>
              <TableCell>
                <Badge>
                  Active
                </Badge>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default SupplierDetails;

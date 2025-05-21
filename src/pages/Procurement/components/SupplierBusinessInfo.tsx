
import React from 'react';
import { Card, CardContent } from '../../../components/ui/card';

interface SupplierBusinessInfoProps {
  contactPerson: string;
  category: string;
  paymentTerms: string;
  deliveryTerm: string;
  currency: string;
}

const SupplierBusinessInfo: React.FC<SupplierBusinessInfoProps> = ({
  contactPerson, category, paymentTerms, deliveryTerm, currency
}) => {
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-lg font-semibold mb-4">Business Information</h2>
        <ul className="space-y-3">
          <li className="flex justify-between">
            <span className="text-gray-500">Contact Person</span>
            <span className="font-medium">{contactPerson}</span>
          </li>
          <li className="flex justify-between">
            <span className="text-gray-500">Category</span>
            <span className="font-medium">{category}</span>
          </li>
          <li className="flex justify-between">
            <span className="text-gray-500">Payment Terms</span>
            <span className="font-medium">{paymentTerms}</span>
          </li>
          <li className="flex justify-between">
            <span className="text-gray-500">Delivery Terms</span>
            <span className="font-medium">{deliveryTerm}</span>
          </li>
          <li className="flex justify-between">
            <span className="text-gray-500">Currency</span>
            <span className="font-medium">{currency}</span>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default SupplierBusinessInfo;

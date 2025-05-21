
import React from 'react';
import { Card, CardContent } from '../../../components/ui/card';
import { Mail, Phone, Globe, MapPin } from 'lucide-react';

interface SupplierContactInfoProps {
  email: string;
  phone: string;
  website: string;
  address: string;
  country: string;
}

const SupplierContactInfo: React.FC<SupplierContactInfoProps> = ({ 
  email, phone, website, address, country 
}) => {
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
        <ul className="space-y-3">
          <li className="flex">
            <Mail className="h-5 w-5 text-gray-400 mr-3" />
            <div>
              <div className="text-sm text-gray-500">Email</div>
              <div className="font-medium">{email}</div>
            </div>
          </li>
          <li className="flex">
            <Phone className="h-5 w-5 text-gray-400 mr-3" />
            <div>
              <div className="text-sm text-gray-500">Phone</div>
              <div className="font-medium">{phone}</div>
            </div>
          </li>
          <li className="flex">
            <Globe className="h-5 w-5 text-gray-400 mr-3" />
            <div>
              <div className="text-sm text-gray-500">Website</div>
              <div className="font-medium">{website}</div>
            </div>
          </li>
          <li className="flex">
            <MapPin className="h-5 w-5 text-gray-400 mr-3" />
            <div>
              <div className="text-sm text-gray-500">Address</div>
              <div className="font-medium">{address}</div>
              <div className="text-sm">{country}</div>
            </div>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default SupplierContactInfo;

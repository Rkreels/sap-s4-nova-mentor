
import React from 'react';
import { Card, CardContent } from '../../../components/ui/card';
import { TrendingUp, BarChart, FileText } from 'lucide-react';

interface SupplierPerformanceMetricsProps {
  totalSpend: string;
  lastOrder: string;
}

const SupplierPerformanceMetrics: React.FC<SupplierPerformanceMetricsProps> = ({
  totalSpend, lastOrder
}) => {
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-lg font-semibold mb-4">Performance Metrics</h2>
        <ul className="space-y-3">
          <li className="flex items-center">
            <TrendingUp className="h-5 w-5 text-blue-500 mr-3" />
            <div>
              <div className="text-sm text-gray-500">Total Spend</div>
              <div className="font-medium">{totalSpend}</div>
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
              <div className="font-medium">{lastOrder}</div>
            </div>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default SupplierPerformanceMetrics;

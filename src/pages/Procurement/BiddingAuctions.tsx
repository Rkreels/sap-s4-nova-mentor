
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { ArrowLeft, Plus, Gavel, TrendingDown, Clock } from 'lucide-react';
import PageHeader from '../../components/page/PageHeader';
import { useVoiceAssistantContext } from '../../context/VoiceAssistantContext';
import { useVoiceAssistant } from '../../hooks/useVoiceAssistant';
import DataTable from '../../components/data/DataTable';

const BiddingAuctions: React.FC = () => {
  const navigate = useNavigate();
  const { isEnabled } = useVoiceAssistantContext();
  const { speak } = useVoiceAssistant();

  useEffect(() => {
    if (isEnabled) {
      speak('Welcome to Bidding and Auctions. Manage competitive bidding processes and reverse auctions.');
    }
  }, [isEnabled, speak]);

  const auctions = [
    {
      auctionId: 'AUC-2025-001',
      title: 'Office Equipment Procurement',
      category: 'Office Supplies',
      startDate: '2025-01-25',
      endDate: '2025-02-05',
      participants: 8,
      currentBest: 145000,
      currency: 'USD',
      status: 'Active',
      timeRemaining: '3 days'
    },
    {
      auctionId: 'AUC-2025-002',
      title: 'IT Services Contract',
      category: 'Services',
      startDate: '2025-01-20',
      endDate: '2025-01-30',
      participants: 12,
      currentBest: 89500,
      currency: 'USD',
      status: 'Completed',
      timeRemaining: 'Ended'
    }
  ];

  const columns = [
    { key: 'auctionId', header: 'Auction ID' },
    { key: 'title', header: 'Title' },
    { key: 'category', header: 'Category' },
    { key: 'startDate', header: 'Start Date' },
    { key: 'endDate', header: 'End Date' },
    { key: 'participants', header: 'Participants' },
    { 
      key: 'currentBest', 
      header: 'Current Best',
      render: (value: number, row: any) => `${value.toLocaleString()} ${row.currency}`
    },
    { 
      key: 'status', 
      header: 'Status',
      render: (value: string) => {
        const colors = {
          'Active': 'bg-green-100 text-green-800',
          'Draft': 'bg-gray-100 text-gray-800',
          'Completed': 'bg-blue-100 text-blue-800',
          'Cancelled': 'bg-red-100 text-red-800'
        };
        return (
          <Badge className={colors[value as keyof typeof colors]}>
            {value}
          </Badge>
        );
      }
    },
    { key: 'timeRemaining', header: 'Time Remaining' }
  ];

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex items-center mb-4">
        <Button 
          variant="outline" 
          size="sm" 
          className="mr-4"
          onClick={() => navigate('/procurement')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back
        </Button>
        <PageHeader
          title="Bidding & Auctions"
          description="Manage competitive bidding processes and reverse auctions"
          voiceIntroduction="Welcome to Bidding and Auctions."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="text-sm text-gray-500">Active Auctions</div>
          <div className="text-2xl font-bold">5</div>
          <div className="text-sm text-green-600">Currently running</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-gray-500">Total Participants</div>
          <div className="text-2xl font-bold">67</div>
          <div className="text-sm text-blue-600">Across all auctions</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-gray-500">Avg Savings</div>
          <div className="text-2xl font-bold">18%</div>
          <div className="text-sm text-purple-600">Through auctions</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-gray-500">Completion Rate</div>
          <div className="text-2xl font-bold">95%</div>
          <div className="text-sm text-orange-600">Success rate</div>
        </Card>
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Auctions & Bidding</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Auction
        </Button>
      </div>

      <Card className="p-6">
        <DataTable columns={columns} data={auctions} />
      </Card>
    </div>
  );
};

export default BiddingAuctions;

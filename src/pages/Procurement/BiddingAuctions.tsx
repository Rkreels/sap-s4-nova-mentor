
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { ArrowLeft, Plus, Gavel, Clock, TrendingDown, Users } from 'lucide-react';
import PageHeader from '../../components/page/PageHeader';
import { useVoiceAssistantContext } from '../../context/VoiceAssistantContext';
import { useVoiceAssistant } from '../../hooks/useVoiceAssistant';
import EnhancedDataTable, { EnhancedColumn, TableAction } from '../../components/data/EnhancedDataTable';
import { useToast } from '../../hooks/use-toast';

interface Auction {
  id: string;
  auctionNumber: string;
  title: string;
  category: string;
  type: 'Forward' | 'Reverse' | 'Dutch' | 'Sealed Bid';
  status: 'Draft' | 'Published' | 'Active' | 'Completed' | 'Cancelled';
  startDate: string;
  endDate: string;
  participants: number;
  highestBid?: number;
  lowestBid?: number;
  currency: string;
  auctioneer: string;
}

const BiddingAuctions: React.FC = () => {
  const navigate = useNavigate();
  const { isEnabled } = useVoiceAssistantContext();
  const { speak } = useVoiceAssistant();
  const [activeTab, setActiveTab] = useState('auctions');
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    if (isEnabled) {
      speak('Welcome to Bidding and Auctions. Manage competitive bidding processes and supplier auctions.');
    }
  }, [isEnabled, speak]);

  useEffect(() => {
    const sampleAuctions: Auction[] = [
      {
        id: 'au-001',
        auctionNumber: 'AUC-2025-001',
        title: 'IT Equipment Supply Contract',
        category: 'Technology',
        type: 'Reverse',
        status: 'Active',
        startDate: '2025-01-25',
        endDate: '2025-02-05',
        participants: 5,
        lowestBid: 245000,
        currency: 'USD',
        auctioneer: 'John Smith'
      },
      {
        id: 'au-002',
        auctionNumber: 'AUC-2025-002',
        title: 'Office Furniture Framework',
        category: 'Furniture',
        type: 'Sealed Bid',
        status: 'Published',
        startDate: '2025-02-01',
        endDate: '2025-02-15',
        participants: 8,
        currency: 'USD',
        auctioneer: 'Sarah Wilson'
      }
    ];
    setAuctions(sampleAuctions);
  }, []);

  const getStatusColor = (status: string) => {
    const colors = {
      'Draft': 'bg-gray-100 text-gray-800',
      'Published': 'bg-blue-100 text-blue-800',
      'Active': 'bg-green-100 text-green-800',
      'Completed': 'bg-purple-100 text-purple-800',
      'Cancelled': 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const columns: EnhancedColumn[] = [
    { key: 'auctionNumber', header: 'Auction #', sortable: true, searchable: true },
    { key: 'title', header: 'Title', searchable: true },
    { key: 'category', header: 'Category', filterable: true, filterOptions: [
      { label: 'Technology', value: 'Technology' },
      { label: 'Furniture', value: 'Furniture' },
      { label: 'Services', value: 'Services' },
      { label: 'Manufacturing', value: 'Manufacturing' }
    ]},
    { key: 'type', header: 'Type', filterable: true, filterOptions: [
      { label: 'Forward', value: 'Forward' },
      { label: 'Reverse', value: 'Reverse' },
      { label: 'Dutch', value: 'Dutch' },
      { label: 'Sealed Bid', value: 'Sealed Bid' }
    ]},
    { 
      key: 'status', 
      header: 'Status',
      filterable: true,
      filterOptions: [
        { label: 'Draft', value: 'Draft' },
        { label: 'Published', value: 'Published' },
        { label: 'Active', value: 'Active' },
        { label: 'Completed', value: 'Completed' },
        { label: 'Cancelled', value: 'Cancelled' }
      ],
      render: (value: string) => (
        <Badge className={getStatusColor(value)}>
          {value}
        </Badge>
      )
    },
    { key: 'endDate', header: 'End Date', sortable: true },
    { 
      key: 'participants', 
      header: 'Participants',
      sortable: true,
      render: (value: number) => (
        <div className="flex items-center">
          <Users className="h-4 w-4 mr-1" />
          {value}
        </div>
      )
    },
    { 
      key: 'lowestBid', 
      header: 'Current Best',
      sortable: true,
      render: (value: number | undefined, row: Auction) => 
        value ? `${row.currency} ${value.toLocaleString()}` : '-'
    }
  ];

  const actions: TableAction[] = [
    {
      label: 'Manage',
      icon: <Gavel className="h-4 w-4" />,
      onClick: (row: Auction) => {
        toast({
          title: 'Manage Auction',
          description: `Opening auction management for ${row.auctionNumber}`,
        });
      },
      variant: 'default'
    },
    {
      label: 'Publish',
      icon: <Clock className="h-4 w-4" />,
      onClick: (row: Auction) => {
        toast({
          title: 'Publish Auction',
          description: `Publishing auction ${row.auctionNumber}`,
        });
      },
      variant: 'default',
      condition: (row: Auction) => row.status === 'Draft'
    }
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
          description="Manage competitive bidding processes and supplier auctions"
          voiceIntroduction="Welcome to Bidding and Auctions for competitive procurement processes."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{auctions.length}</div>
            <div className="text-sm text-muted-foreground">Total Auctions</div>
            <div className="text-sm text-blue-600">This month</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">
              {auctions.filter(a => a.status === 'Active').length}
            </div>
            <div className="text-sm text-muted-foreground">Active Auctions</div>
            <div className="text-sm text-green-600">Currently running</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">
              {auctions.reduce((sum, a) => sum + a.participants, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Total Participants</div>
            <div className="text-sm text-purple-600">Across all auctions</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">15%</div>
            <div className="text-sm text-muted-foreground">Avg. Savings</div>
            <div className="text-sm text-green-600">From competitive bidding</div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="auctions">Auctions</TabsTrigger>
          <TabsTrigger value="active">Active Bidding</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="auctions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                Auction Portfolio
                <Button onClick={() => toast({ title: 'Create Auction', description: 'Opening auction creation form' })}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Auction
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <EnhancedDataTable 
                columns={columns}
                data={auctions}
                actions={actions}
                searchPlaceholder="Search auctions by number, title, or category..."
                exportable={true}
                refreshable={true}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {auctions.filter(a => a.status === 'Active').map((auction) => (
              <Card key={auction.id}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center justify-between">
                    {auction.title}
                    <Badge className={getStatusColor(auction.status)}>
                      {auction.status}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Auction #:</span>
                      <span className="font-medium">{auction.auctionNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Type:</span>
                      <span className="font-medium">{auction.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Participants:</span>
                      <span className="font-medium">{auction.participants}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Ends:</span>
                      <span className="font-medium">{auction.endDate}</span>
                    </div>
                    {auction.lowestBid && (
                      <div className="flex justify-between">
                        <span>Current Best:</span>
                        <span className="font-medium text-green-600">
                          {auction.currency} {auction.lowestBid.toLocaleString()}
                        </span>
                      </div>
                    )}
                    <div className="flex space-x-2 mt-4">
                      <Button size="sm">
                        <Gavel className="h-4 w-4 mr-2" />
                        Monitor Bids
                      </Button>
                      <Button size="sm" variant="outline">
                        <TrendingDown className="h-4 w-4 mr-2" />
                        View Analytics
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="results" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Completed Auctions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {auctions.filter(a => a.status === 'Completed').map((auction) => (
                  <div key={auction.id} className="p-4 border rounded">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold">{auction.title}</h4>
                        <p className="text-sm text-muted-foreground">{auction.auctionNumber}</p>
                      </div>
                      <Badge className={getStatusColor(auction.status)}>
                        {auction.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Participants:</span>
                        <div className="font-medium">{auction.participants}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Winning Bid:</span>
                        <div className="font-medium">
                          {auction.lowestBid ? `${auction.currency} ${auction.lowestBid.toLocaleString()}` : 'N/A'}
                        </div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Savings:</span>
                        <div className="font-medium text-green-600">15%</div>
                      </div>
                    </div>
                  </div>
                ))}
                {auctions.filter(a => a.status === 'Completed').length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No completed auctions yet.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Auction Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded">
                    <h4 className="font-semibold mb-2">Success Metrics</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Average Savings:</span>
                        <span className="font-medium text-green-600">15%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Completion Rate:</span>
                        <span className="font-medium">95%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Avg. Participants:</span>
                        <span className="font-medium">6.5</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Auction Types</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['Reverse', 'Sealed Bid', 'Forward', 'Dutch'].map((type) => {
                    const count = auctions.filter(a => a.type === type).length;
                    const percentage = auctions.length > 0 ? Math.round((count / auctions.length) * 100) : 0;
                    return (
                      <div key={type} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>{type}</span>
                          <span>{count} ({percentage}%)</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BiddingAuctions;

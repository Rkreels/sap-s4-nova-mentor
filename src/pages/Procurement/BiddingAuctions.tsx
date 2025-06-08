
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { ArrowLeft, Plus, Gavel, TrendingDown, Clock, Search, Filter, Edit, Trash2, Eye, Download, Upload, Users, Target, Award } from 'lucide-react';
import PageHeader from '../../components/page/PageHeader';
import { useVoiceAssistantContext } from '../../context/VoiceAssistantContext';
import { useVoiceAssistant } from '../../hooks/useVoiceAssistant';
import DataTable from '../../components/data/DataTable';
import { Input } from '../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { useToast } from '../../hooks/use-toast';
import { LineChart, Line, BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts';

interface Auction {
  id: string;
  auctionId: string;
  title: string;
  description: string;
  category: string;
  type: 'Reverse Auction' | 'Forward Auction' | 'Sealed Bid' | 'Dutch Auction';
  startDate: string;
  endDate: string;
  participants: number;
  currentBest: number;
  startingPrice: number;
  currency: string;
  status: 'Active' | 'Draft' | 'Completed' | 'Cancelled' | 'Scheduled';
  timeRemaining: string;
  winner: string;
  createdBy: string;
  minBidIncrement: number;
  maxParticipants: number;
  reservePrice: number;
  notes: string;
  created: string;
}

interface Bid {
  id: string;
  auctionId: string;
  bidder: string;
  amount: number;
  timestamp: string;
  status: 'Active' | 'Withdrawn' | 'Accepted' | 'Rejected';
}

const BiddingAuctions: React.FC = () => {
  const navigate = useNavigate();
  const { isEnabled } = useVoiceAssistantContext();
  const { speak } = useVoiceAssistant();
  const [activeTab, setActiveTab] = useState('auctions');
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAuction, setSelectedAuction] = useState<Auction | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isEnabled) {
      speak('Welcome to Bidding and Auctions. Manage competitive bidding processes and reverse auctions.');
    }
  }, [isEnabled, speak]);

  // Sample data
  useEffect(() => {
    const sampleAuctions: Auction[] = [
      {
        id: 'AUC-001',
        auctionId: 'AUC-2025-001',
        title: 'Office Equipment Procurement',
        description: 'Comprehensive office equipment package including desks, chairs, and storage',
        category: 'Office Supplies',
        type: 'Reverse Auction',
        startDate: '2025-01-25',
        endDate: '2025-02-05',
        participants: 8,
        currentBest: 145000,
        startingPrice: 180000,
        currency: 'USD',
        status: 'Active',
        timeRemaining: '3 days',
        winner: '',
        createdBy: 'John Smith',
        minBidIncrement: 1000,
        maxParticipants: 15,
        reservePrice: 140000,
        notes: 'Quality specifications must be met',
        created: '2025-01-20'
      },
      {
        id: 'AUC-002',
        auctionId: 'AUC-2025-002',
        title: 'IT Services Contract',
        description: 'Annual IT support and maintenance services',
        category: 'Services',
        type: 'Sealed Bid',
        startDate: '2025-01-20',
        endDate: '2025-01-30',
        participants: 12,
        currentBest: 89500,
        startingPrice: 120000,
        currency: 'USD',
        status: 'Completed',
        timeRemaining: 'Ended',
        winner: 'TechServ Solutions',
        createdBy: 'Sarah Johnson',
        minBidIncrement: 500,
        maxParticipants: 20,
        reservePrice: 85000,
        notes: 'SLA requirements strictly enforced',
        created: '2025-01-15'
      },
      {
        id: 'AUC-003',
        auctionId: 'AUC-2025-003',
        title: 'Manufacturing Equipment',
        description: 'Heavy machinery for production line expansion',
        category: 'Manufacturing',
        type: 'Forward Auction',
        startDate: '2025-02-01',
        endDate: '2025-02-15',
        participants: 0,
        currentBest: 0,
        startingPrice: 500000,
        currency: 'USD',
        status: 'Scheduled',
        timeRemaining: '7 days to start',
        winner: '',
        createdBy: 'Mike Wilson',
        minBidIncrement: 5000,
        maxParticipants: 10,
        reservePrice: 450000,
        notes: 'Installation and training included',
        created: '2025-01-25'
      },
      {
        id: 'AUC-004',
        auctionId: 'AUC-2025-004',
        title: 'Transportation Services',
        description: 'Logistics and delivery services contract',
        category: 'Logistics',
        type: 'Dutch Auction',
        startDate: '2025-01-28',
        endDate: '2025-02-10',
        participants: 6,
        currentBest: 75000,
        startingPrice: 95000,
        currency: 'USD',
        status: 'Active',
        timeRemaining: '5 days',
        winner: '',
        createdBy: 'Lisa Chen',
        minBidIncrement: 2000,
        maxParticipants: 12,
        reservePrice: 70000,
        notes: 'Regional coverage required',
        created: '2025-01-23'
      }
    ];

    setTimeout(() => {
      setAuctions(sampleAuctions);
      setIsLoading(false);
    }, 1000);
  }, []);

  const filteredAuctions = auctions.filter(auction => {
    const matchesSearch = auction.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         auction.auctionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         auction.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || auction.status.toLowerCase() === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleCreateAuction = () => {
    setSelectedAuction(null);
    setIsEditing(false);
    setIsDialogOpen(true);
  };

  const handleEditAuction = (auction: Auction) => {
    setSelectedAuction(auction);
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const handleDeleteAuction = (auctionId: string) => {
    setAuctions(prev => prev.filter(a => a.id !== auctionId));
    toast({
      title: 'Auction Deleted',
      description: 'Auction has been successfully removed.',
    });
  };

  const handleCompleteAuction = (auctionId: string) => {
    setAuctions(prev => prev.map(a => 
      a.id === auctionId ? { 
        ...a, 
        status: 'Completed' as const,
        timeRemaining: 'Ended'
      } : a
    ));
    toast({
      title: 'Auction Completed',
      description: 'Auction has been successfully completed.',
    });
  };

  const handleSaveAuction = (auctionData: Partial<Auction>) => {
    if (isEditing && selectedAuction) {
      setAuctions(prev => prev.map(a => 
        a.id === selectedAuction.id ? { ...a, ...auctionData } : a
      ));
      toast({
        title: 'Auction Updated',
        description: 'Auction has been successfully updated.',
      });
    } else {
      const newAuction: Auction = {
        id: `AUC-${String(auctions.length + 1).padStart(3, '0')}`,
        auctionId: `AUC-2025-${String(auctions.length + 1).padStart(3, '0')}`,
        created: new Date().toISOString().split('T')[0],
        createdBy: 'Current User',
        participants: 0,
        currentBest: 0,
        winner: '',
        timeRemaining: 'Calculating...',
        ...auctionData as Auction
      };
      setAuctions(prev => [...prev, newAuction]);
      toast({
        title: 'Auction Created',
        description: 'New auction has been successfully created.',
      });
    }
    setIsDialogOpen(false);
  };

  const auctionColumns = [
    { key: 'auctionId', header: 'Auction ID' },
    { key: 'title', header: 'Title' },
    { key: 'category', header: 'Category' },
    { key: 'type', header: 'Type' },
    { key: 'startDate', header: 'Start Date' },
    { key: 'endDate', header: 'End Date' },
    { key: 'participants', header: 'Participants' },
    { 
      key: 'currentBest', 
      header: 'Current Best',
      render: (value: number, row: Auction) => value > 0 ? `$${value.toLocaleString()}` : 'No bids'
    },
    { 
      key: 'status', 
      header: 'Status',
      render: (value: string) => {
        const colors = {
          'Active': 'bg-green-100 text-green-800',
          'Draft': 'bg-gray-100 text-gray-800',
          'Completed': 'bg-blue-100 text-blue-800',
          'Cancelled': 'bg-red-100 text-red-800',
          'Scheduled': 'bg-yellow-100 text-yellow-800'
        };
        return (
          <Badge className={colors[value as keyof typeof colors]}>
            {value}
          </Badge>
        );
      }
    },
    { key: 'timeRemaining', header: 'Time Remaining' },
    { 
      key: 'actions', 
      header: 'Actions',
      render: (_, row: Auction) => (
        <div className="flex space-x-2">
          {row.status === 'Active' && (
            <Button variant="ghost" size="sm" onClick={() => handleCompleteAuction(row.id)}>
              <Award className="h-4 w-4 text-blue-600" />
            </Button>
          )}
          <Button variant="ghost" size="sm" onClick={() => handleEditAuction(row)}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => handleDeleteAuction(row.id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      )
    }
  ];

  const auctionMetrics = [
    { name: 'Active Auctions', value: auctions.filter(a => a.status === 'Active').length, change: '+12%' },
    { name: 'Total Participants', value: auctions.reduce((sum, a) => sum + a.participants, 0), change: '+25%' },
    { name: 'Average Savings', value: '18%', change: '+3%' },
    { name: 'Completion Rate', value: '95%', change: '+2%' }
  ];

  const performanceData = auctions.filter(a => a.status === 'Completed').map(auction => {
    const savings = ((auction.startingPrice - auction.currentBest) / auction.startingPrice) * 100;
    return {
      title: auction.title,
      savings: savings,
      participants: auction.participants,
      value: auction.currentBest
    };
  });

  const typeData = auctions.reduce((acc, auction) => {
    acc[auction.type] = (acc[auction.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(typeData).map(([type, count]) => ({
    type,
    count,
    totalValue: auctions.filter(a => a.type === type).reduce((sum, a) => sum + a.currentBest, 0)
  }));

  const sampleBids: Bid[] = [
    {
      id: 'BID-001',
      auctionId: 'AUC-2025-001',
      bidder: 'Office Furniture Co.',
      amount: 145000,
      timestamp: '2025-01-22 14:30:00',
      status: 'Active'
    },
    {
      id: 'BID-002',
      auctionId: 'AUC-2025-001',
      bidder: 'Workspace Solutions',
      amount: 148000,
      timestamp: '2025-01-22 13:15:00',
      status: 'Active'
    },
    {
      id: 'BID-003',
      auctionId: 'AUC-2025-001',
      bidder: 'Premium Office Ltd.',
      amount: 152000,
      timestamp: '2025-01-22 12:00:00',
      status: 'Active'
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
          description="Manage competitive bidding processes and reverse auctions"
          voiceIntroduction="Welcome to Bidding and Auctions."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {auctionMetrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className="text-sm text-muted-foreground">{metric.name}</div>
              <div className="text-sm text-green-600">{metric.change}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Auctions & Bidding</h2>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button onClick={handleCreateAuction}>
            <Plus className="h-4 w-4 mr-2" />
            Create Auction
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="auctions">Auctions</TabsTrigger>
          <TabsTrigger value="bidding">Live Bidding</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="auctions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Auction Directory</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between mb-4">
                <div className="flex space-x-2">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search auctions..." 
                      className="pl-8 w-80"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {isLoading ? (
                <div className="h-64 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              ) : (
                <DataTable columns={auctionColumns} data={filteredAuctions} />
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bidding" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Live Bidding Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {auctions.filter(a => a.status === 'Active').map((auction) => (
                  <div key={auction.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h3 className="font-semibold">{auction.title}</h3>
                        <p className="text-sm text-muted-foreground">{auction.auctionId} • {auction.type}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-green-600">${auction.currentBest.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">Current best bid</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-medium">Recent Bids</h4>
                      {sampleBids.filter(b => b.auctionId === auction.auctionId).map((bid) => (
                        <div key={bid.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <span className="text-sm">{bid.bidder}</span>
                          <span className="font-medium">${bid.amount.toLocaleString()}</span>
                          <span className="text-xs text-muted-foreground">{bid.timestamp}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Auction Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {auctions.filter(a => a.status === 'Completed').map((auction) => (
                  <div key={auction.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="font-medium">{auction.title}</div>
                      <div className="text-sm text-muted-foreground">{auction.auctionId}</div>
                      <div className="text-sm text-muted-foreground">Winner: {auction.winner}</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold">${auction.currentBest.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">Final bid</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-green-600">
                        {((auction.startingPrice - auction.currentBest) / auction.startingPrice * 100).toFixed(1)}%
                      </div>
                      <div className="text-sm text-muted-foreground">Savings</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold">{auction.participants}</div>
                      <div className="text-sm text-muted-foreground">Participants</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Auction Types Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <XAxis dataKey="type" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#8884d8" name="Count" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Savings Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {performanceData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{item.title}</div>
                        <div className="text-sm text-muted-foreground">{item.participants} participants</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-green-600">{item.savings.toFixed(1)}%</div>
                        <div className="text-sm text-muted-foreground">Savings achieved</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Auction Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="h-20 flex flex-col">
                  <span>Auction Summary</span>
                  <span className="text-xs text-muted-foreground">Complete auction overview</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col">
                  <span>Savings Analysis</span>
                  <span className="text-xs text-muted-foreground">Cost reduction achieved</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col">
                  <span>Participation Report</span>
                  <span className="text-xs text-muted-foreground">Bidder engagement metrics</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col">
                  <span>Performance Trends</span>
                  <span className="text-xs text-muted-foreground">Historical analysis</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Edit Auction' : 'Create New Auction'}</DialogTitle>
          </DialogHeader>
          <AuctionForm 
            auction={selectedAuction}
            onSave={handleSaveAuction}
            onCancel={() => setIsDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

const AuctionForm: React.FC<{
  auction: Auction | null;
  onSave: (data: Partial<Auction>) => void;
  onCancel: () => void;
}> = ({ auction, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: auction?.title || '',
    description: auction?.description || '',
    category: auction?.category || '',
    type: auction?.type || 'Reverse Auction',
    startDate: auction?.startDate || '',
    endDate: auction?.endDate || '',
    startingPrice: auction?.startingPrice || 0,
    reservePrice: auction?.reservePrice || 0,
    minBidIncrement: auction?.minBidIncrement || 100,
    maxParticipants: auction?.maxParticipants || 10,
    currency: auction?.currency || 'USD',
    status: auction?.status || 'Draft',
    notes: auction?.notes || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title">Auction Title</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            required
          />
        </div>
        <div>
          <Label htmlFor="category">Category</Label>
          <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Office Supplies">Office Supplies</SelectItem>
              <SelectItem value="Services">Services</SelectItem>
              <SelectItem value="Manufacturing">Manufacturing</SelectItem>
              <SelectItem value="Logistics">Logistics</SelectItem>
              <SelectItem value="IT Equipment">IT Equipment</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="type">Auction Type</Label>
          <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value as any }))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Reverse Auction">Reverse Auction</SelectItem>
              <SelectItem value="Forward Auction">Forward Auction</SelectItem>
              <SelectItem value="Sealed Bid">Sealed Bid</SelectItem>
              <SelectItem value="Dutch Auction">Dutch Auction</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="status">Status</Label>
          <Select value={formData.status} onValueChange={(value) => setFormData(prev => ({ ...prev, status: value as any }))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Draft">Draft</SelectItem>
              <SelectItem value="Scheduled">Scheduled</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="startDate">Start Date</Label>
          <Input
            id="startDate"
            type="date"
            value={formData.startDate}
            onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
            required
          />
        </div>
        <div>
          <Label htmlFor="endDate">End Date</Label>
          <Input
            id="endDate"
            type="date"
            value={formData.endDate}
            onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
            required
          />
        </div>
        <div>
          <Label htmlFor="startingPrice">Starting Price</Label>
          <Input
            id="startingPrice"
            type="number"
            value={formData.startingPrice}
            onChange={(e) => setFormData(prev => ({ ...prev, startingPrice: Number(e.target.value) }))}
            required
          />
        </div>
        <div>
          <Label htmlFor="reservePrice">Reserve Price</Label>
          <Input
            id="reservePrice"
            type="number"
            value={formData.reservePrice}
            onChange={(e) => setFormData(prev => ({ ...prev, reservePrice: Number(e.target.value) }))}
          />
        </div>
        <div>
          <Label htmlFor="minBidIncrement">Min Bid Increment</Label>
          <Input
            id="minBidIncrement"
            type="number"
            value={formData.minBidIncrement}
            onChange={(e) => setFormData(prev => ({ ...prev, minBidIncrement: Number(e.target.value) }))}
          />
        </div>
        <div>
          <Label htmlFor="maxParticipants">Max Participants</Label>
          <Input
            id="maxParticipants"
            type="number"
            value={formData.maxParticipants}
            onChange={(e) => setFormData(prev => ({ ...prev, maxParticipants: Number(e.target.value) }))}
          />
        </div>
        <div>
          <Label htmlFor="currency">Currency</Label>
          <Select value={formData.currency} onValueChange={(value) => setFormData(prev => ({ ...prev, currency: value }))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="USD">USD</SelectItem>
              <SelectItem value="EUR">EUR</SelectItem>
              <SelectItem value="GBP">GBP</SelectItem>
              <SelectItem value="JPY">JPY</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          rows={3}
        />
      </div>
      
      <div>
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          value={formData.notes}
          onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
          rows={2}
        />
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          Save Auction
        </Button>
      </div>
    </form>
  );
};

export default BiddingAuctions;

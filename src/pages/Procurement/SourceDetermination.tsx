
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { ArrowLeft, Plus, Search, Filter, TrendingUp, Edit, Trash2, Eye, Download, Upload, Target, Users, Clock } from 'lucide-react';
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

interface SourceList {
  id: string;
  material: string;
  materialCode: string;
  description: string;
  category: string;
  requirement: string;
  preferredSupplier: string;
  alternativeSuppliers: number;
  leadTime: string;
  priceRange: string;
  availability: 'In Stock' | 'Made to Order' | 'Out of Stock' | 'Discontinued';
  lastUpdated: string;
  createdBy: string;
  notes: string;
  qualityRating: number;
  costRating: number;
  deliveryRating: number;
}

interface SupplierOption {
  id: string;
  supplier: string;
  price: number;
  leadTime: string;
  minOrderQty: number;
  rating: number;
  certified: boolean;
  location: string;
}

const SourceDetermination: React.FC = () => {
  const navigate = useNavigate();
  const { isEnabled } = useVoiceAssistantContext();
  const { speak } = useVoiceAssistant();
  const [activeTab, setActiveTab] = useState('sources');
  const [sourceLists, setSourceLists] = useState<SourceList[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAvailability, setFilterAvailability] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSource, setSelectedSource] = useState<SourceList | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isEnabled) {
      speak('Welcome to Source Determination. Find and evaluate the best suppliers for your procurement needs.');
    }
  }, [isEnabled, speak]);

  // Sample data
  useEffect(() => {
    const sampleSources: SourceList[] = [
      {
        id: 'SRC-001',
        material: 'Electronic Components',
        materialCode: 'EC-001',
        description: 'Microprocessors and Circuit Boards',
        category: 'Electronics',
        requirement: '1000 units',
        preferredSupplier: 'Tech Components Inc.',
        alternativeSuppliers: 3,
        leadTime: '14 days',
        priceRange: '$50-65',
        availability: 'In Stock',
        lastUpdated: '2025-01-20',
        createdBy: 'John Smith',
        notes: 'High-quality components for manufacturing',
        qualityRating: 9.2,
        costRating: 8.5,
        deliveryRating: 9.0
      },
      {
        id: 'SRC-002',
        material: 'Office Furniture',
        materialCode: 'OF-002',
        description: 'Ergonomic Office Chairs',
        category: 'Office Supplies',
        requirement: '50 units',
        preferredSupplier: 'Office Solutions Ltd.',
        alternativeSuppliers: 2,
        leadTime: '21 days',
        priceRange: '$200-280',
        availability: 'Made to Order',
        lastUpdated: '2025-01-18',
        createdBy: 'Sarah Johnson',
        notes: 'Customizable ergonomic office chairs',
        qualityRating: 8.8,
        costRating: 7.2,
        deliveryRating: 8.0
      },
      {
        id: 'SRC-003',
        material: 'Industrial Equipment',
        materialCode: 'IE-003',
        description: 'Heavy Duty Motors',
        category: 'Manufacturing',
        requirement: '25 units',
        preferredSupplier: 'Industrial Parts Co.',
        alternativeSuppliers: 4,
        leadTime: '35 days',
        priceRange: '$1500-2200',
        availability: 'In Stock',
        lastUpdated: '2025-01-15',
        createdBy: 'Mike Wilson',
        notes: 'Industrial grade motors for production line',
        qualityRating: 9.5,
        costRating: 7.8,
        deliveryRating: 8.5
      },
      {
        id: 'SRC-004',
        material: 'Raw Materials',
        materialCode: 'RM-004',
        description: 'Steel Sheets',
        category: 'Raw Materials',
        requirement: '5000 kg',
        preferredSupplier: 'Steel Works Ltd.',
        alternativeSuppliers: 5,
        leadTime: '10 days',
        priceRange: '$2.50-3.20/kg',
        availability: 'Out of Stock',
        lastUpdated: '2025-01-22',
        createdBy: 'Lisa Chen',
        notes: 'High-grade steel for construction',
        qualityRating: 9.0,
        costRating: 8.8,
        deliveryRating: 7.5
      }
    ];

    setTimeout(() => {
      setSourceLists(sampleSources);
      setIsLoading(false);
    }, 1000);
  }, []);

  const filteredSources = sourceLists.filter(source => {
    const matchesSearch = source.material.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         source.materialCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         source.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         source.preferredSupplier.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterAvailability === 'all' || source.availability.toLowerCase().includes(filterAvailability);
    return matchesSearch && matchesFilter;
  });

  const handleCreateSource = () => {
    setSelectedSource(null);
    setIsEditing(false);
    setIsDialogOpen(true);
  };

  const handleEditSource = (source: SourceList) => {
    setSelectedSource(source);
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const handleDeleteSource = (sourceId: string) => {
    setSourceLists(prev => prev.filter(s => s.id !== sourceId));
    toast({
      title: 'Source List Deleted',
      description: 'Source list has been successfully removed.',
    });
  };

  const handleSaveSource = (sourceData: Partial<SourceList>) => {
    if (isEditing && selectedSource) {
      setSourceLists(prev => prev.map(s => 
        s.id === selectedSource.id ? { 
          ...s, 
          ...sourceData,
          lastUpdated: new Date().toISOString().split('T')[0]
        } : s
      ));
      toast({
        title: 'Source List Updated',
        description: 'Source list has been successfully updated.',
      });
    } else {
      const newSource: SourceList = {
        id: `SRC-${String(sourceLists.length + 1).padStart(3, '0')}`,
        materialCode: `MC-${String(sourceLists.length + 1).padStart(3, '0')}`,
        lastUpdated: new Date().toISOString().split('T')[0],
        createdBy: 'Current User',
        alternativeSuppliers: 0,
        qualityRating: 0,
        costRating: 0,
        deliveryRating: 0,
        ...sourceData as SourceList
      };
      setSourceLists(prev => [...prev, newSource]);
      toast({
        title: 'Source List Created',
        description: 'New source list has been successfully created.',
      });
    }
    setIsDialogOpen(false);
  };

  const sourceColumns = [
    { key: 'materialCode', header: 'Material Code' },
    { key: 'material', header: 'Material' },
    { key: 'description', header: 'Description' },
    { key: 'category', header: 'Category' },
    { key: 'preferredSupplier', header: 'Preferred Supplier' },
    { key: 'alternativeSuppliers', header: 'Alternatives' },
    { key: 'leadTime', header: 'Lead Time' },
    { key: 'priceRange', header: 'Price Range' },
    { 
      key: 'availability', 
      header: 'Availability',
      render: (value: string) => {
        const colors = {
          'In Stock': 'bg-green-100 text-green-800',
          'Made to Order': 'bg-yellow-100 text-yellow-800',
          'Out of Stock': 'bg-red-100 text-red-800',
          'Discontinued': 'bg-gray-100 text-gray-800'
        };
        return (
          <Badge className={colors[value as keyof typeof colors]}>
            {value}
          </Badge>
        );
      }
    },
    { 
      key: 'actions', 
      header: 'Actions',
      render: (_, row: SourceList) => (
        <div className="flex space-x-2">
          <Button variant="ghost" size="sm" onClick={() => handleEditSource(row)}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => handleDeleteSource(row.id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      )
    }
  ];

  const sourceMetrics = [
    { name: 'Source Lists', value: sourceLists.length, change: '+15%' },
    { name: 'Qualified Suppliers', value: sourceLists.reduce((sum, s) => sum + s.alternativeSuppliers + 1, 0), change: '+8%' },
    { name: 'Average Lead Time', value: '18 days', change: '-5%' },
    { name: 'Cost Savings', value: '15%', change: '+3%' }
  ];

  const categoryData = sourceLists.reduce((acc, source) => {
    acc[source.category] = (acc[source.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(categoryData).map(([category, count]) => ({
    category,
    count,
    avgQuality: sourceLists.filter(s => s.category === category).reduce((sum, s) => sum + s.qualityRating, 0) / sourceLists.filter(s => s.category === category).length
  }));

  const supplierOptions: SupplierOption[] = [
    {
      id: 'SUP-001',
      supplier: 'Tech Components Inc.',
      price: 55,
      leadTime: '14 days',
      minOrderQty: 100,
      rating: 9.2,
      certified: true,
      location: 'Silicon Valley, CA'
    },
    {
      id: 'SUP-002',
      supplier: 'Global Electronics',
      price: 52,
      leadTime: '18 days',
      minOrderQty: 200,
      rating: 8.8,
      certified: true,
      location: 'Austin, TX'
    },
    {
      id: 'SUP-003',
      supplier: 'Circuit Solutions',
      price: 58,
      leadTime: '12 days',
      minOrderQty: 50,
      rating: 8.5,
      certified: false,
      location: 'Boston, MA'
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
          title="Source Determination"
          description="Find and evaluate the best suppliers for your procurement needs"
          voiceIntroduction="Welcome to Source Determination."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {sourceMetrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className="text-sm text-muted-foreground">{metric.name}</div>
              <div className={`text-sm ${metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                {metric.change}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Source Determination</h2>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Search className="h-4 w-4 mr-2" />
            Find Sources
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button onClick={handleCreateSource}>
            <Plus className="h-4 w-4 mr-2" />
            Create Source List
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="sources">Source Lists</TabsTrigger>
          <TabsTrigger value="suppliers">Supplier Options</TabsTrigger>
          <TabsTrigger value="comparison">Comparison</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="sources" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Source List Directory</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between mb-4">
                <div className="flex space-x-2">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search source lists..." 
                      className="pl-8 w-80"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Select value={filterAvailability} onValueChange={setFilterAvailability}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Filter by availability" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Availability</SelectItem>
                      <SelectItem value="in stock">In Stock</SelectItem>
                      <SelectItem value="made to order">Made to Order</SelectItem>
                      <SelectItem value="out of stock">Out of Stock</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {isLoading ? (
                <div className="h-64 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              ) : (
                <DataTable columns={sourceColumns} data={filteredSources} />
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="suppliers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Supplier Options</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {supplierOptions.map((supplier) => (
                  <div key={supplier.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <div className="font-medium">{supplier.supplier}</div>
                        {supplier.certified && (
                          <Badge className="bg-blue-100 text-blue-800">Certified</Badge>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">{supplier.location}</div>
                      <div className="text-sm text-muted-foreground">Min Order: {supplier.minOrderQty} units</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold">${supplier.price}</div>
                      <div className="text-sm text-muted-foreground">per unit</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold">{supplier.leadTime}</div>
                      <div className="text-sm text-muted-foreground">lead time</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold">{supplier.rating}/10</div>
                      <div className="text-sm text-muted-foreground">rating</div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm">Select</Button>
                      <Button variant="outline" size="sm">Compare</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comparison" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Supplier Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4">Criteria</th>
                      {supplierOptions.map(supplier => (
                        <th key={supplier.id} className="text-center p-4">{supplier.supplier}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-4 font-medium">Price per Unit</td>
                      {supplierOptions.map(supplier => (
                        <td key={supplier.id} className="text-center p-4">${supplier.price}</td>
                      ))}
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 font-medium">Lead Time</td>
                      {supplierOptions.map(supplier => (
                        <td key={supplier.id} className="text-center p-4">{supplier.leadTime}</td>
                      ))}
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 font-medium">Min Order Qty</td>
                      {supplierOptions.map(supplier => (
                        <td key={supplier.id} className="text-center p-4">{supplier.minOrderQty}</td>
                      ))}
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 font-medium">Rating</td>
                      {supplierOptions.map(supplier => (
                        <td key={supplier.id} className="text-center p-4">{supplier.rating}/10</td>
                      ))}
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 font-medium">Certification</td>
                      {supplierOptions.map(supplier => (
                        <td key={supplier.id} className="text-center p-4">
                          {supplier.certified ? '✓' : '✗'}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Source Lists by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#8884d8" name="Count" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quality Ratings by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {chartData.map((item, index) => (
                    <div key={item.category} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{item.category}</div>
                        <div className="text-sm text-muted-foreground">{item.count} source lists</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{item.avgQuality.toFixed(1)}/10</div>
                        <div className="text-sm text-muted-foreground">Avg quality</div>
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
              <CardTitle>Source Determination Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="h-20 flex flex-col">
                  <span>Source List Summary</span>
                  <span className="text-xs text-muted-foreground">Complete source list overview</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col">
                  <span>Supplier Comparison</span>
                  <span className="text-xs text-muted-foreground">Side-by-side analysis</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col">
                  <span>Cost Analysis</span>
                  <span className="text-xs text-muted-foreground">Price trends & savings</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col">
                  <span>Availability Report</span>
                  <span className="text-xs text-muted-foreground">Stock status summary</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Edit Source List' : 'Create New Source List'}</DialogTitle>
          </DialogHeader>
          <SourceForm 
            source={selectedSource}
            onSave={handleSaveSource}
            onCancel={() => setIsDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

const SourceForm: React.FC<{
  source: SourceList | null;
  onSave: (data: Partial<SourceList>) => void;
  onCancel: () => void;
}> = ({ source, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    material: source?.material || '',
    description: source?.description || '',
    category: source?.category || '',
    requirement: source?.requirement || '',
    preferredSupplier: source?.preferredSupplier || '',
    leadTime: source?.leadTime || '',
    priceRange: source?.priceRange || '',
    availability: source?.availability || 'In Stock',
    notes: source?.notes || '',
    qualityRating: source?.qualityRating || 0,
    costRating: source?.costRating || 0,
    deliveryRating: source?.deliveryRating || 0
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="material">Material Name</Label>
          <Input
            id="material"
            value={formData.material}
            onChange={(e) => setFormData(prev => ({ ...prev, material: e.target.value }))}
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
              <SelectItem value="Electronics">Electronics</SelectItem>
              <SelectItem value="Office Supplies">Office Supplies</SelectItem>
              <SelectItem value="Manufacturing">Manufacturing</SelectItem>
              <SelectItem value="Raw Materials">Raw Materials</SelectItem>
              <SelectItem value="Services">Services</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="requirement">Requirement</Label>
          <Input
            id="requirement"
            value={formData.requirement}
            onChange={(e) => setFormData(prev => ({ ...prev, requirement: e.target.value }))}
            required
          />
        </div>
        <div>
          <Label htmlFor="preferredSupplier">Preferred Supplier</Label>
          <Input
            id="preferredSupplier"
            value={formData.preferredSupplier}
            onChange={(e) => setFormData(prev => ({ ...prev, preferredSupplier: e.target.value }))}
            required
          />
        </div>
        <div>
          <Label htmlFor="leadTime">Lead Time</Label>
          <Input
            id="leadTime"
            value={formData.leadTime}
            onChange={(e) => setFormData(prev => ({ ...prev, leadTime: e.target.value }))}
            required
          />
        </div>
        <div>
          <Label htmlFor="priceRange">Price Range</Label>
          <Input
            id="priceRange"
            value={formData.priceRange}
            onChange={(e) => setFormData(prev => ({ ...prev, priceRange: e.target.value }))}
            required
          />
        </div>
        <div>
          <Label htmlFor="availability">Availability</Label>
          <Select value={formData.availability} onValueChange={(value) => setFormData(prev => ({ ...prev, availability: value as any }))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="In Stock">In Stock</SelectItem>
              <SelectItem value="Made to Order">Made to Order</SelectItem>
              <SelectItem value="Out of Stock">Out of Stock</SelectItem>
              <SelectItem value="Discontinued">Discontinued</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="qualityRating">Quality Rating (0-10)</Label>
          <Input
            id="qualityRating"
            type="number"
            min="0"
            max="10"
            step="0.1"
            value={formData.qualityRating}
            onChange={(e) => setFormData(prev => ({ ...prev, qualityRating: Number(e.target.value) }))}
          />
        </div>
        <div>
          <Label htmlFor="costRating">Cost Rating (0-10)</Label>
          <Input
            id="costRating"
            type="number"
            min="0"
            max="10"
            step="0.1"
            value={formData.costRating}
            onChange={(e) => setFormData(prev => ({ ...prev, costRating: Number(e.target.value) }))}
          />
        </div>
        <div>
          <Label htmlFor="deliveryRating">Delivery Rating (0-10)</Label>
          <Input
            id="deliveryRating"
            type="number"
            min="0"
            max="10"
            step="0.1"
            value={formData.deliveryRating}
            onChange={(e) => setFormData(prev => ({ ...prev, deliveryRating: Number(e.target.value) }))}
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          rows={2}
        />
      </div>
      
      <div>
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          value={formData.notes}
          onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
          rows={3}
        />
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          Save Source List
        </Button>
      </div>
    </form>
  );
};

export default SourceDetermination;

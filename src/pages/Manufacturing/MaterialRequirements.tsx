
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../../components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { ArrowLeft, Calendar, Filter, Download, Play, RefreshCw, Plus, ShoppingCart, AlertTriangle, CheckCircle } from 'lucide-react';
import PageHeader from '../../components/page/PageHeader';
import { useVoiceAssistantContext } from '../../context/VoiceAssistantContext';
import { useVoiceAssistant } from '../../hooks/useVoiceAssistant';
import { useToast } from '../../hooks/use-toast';
import EnhancedDataTable, { EnhancedColumn, TableAction } from '../../components/data/EnhancedDataTable';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface MaterialRequirement {
  id: string;
  material: string;
  description: string;
  required: number;
  unit: string;
  available: number;
  onOrder: number;
  shortage: number;
  orderDate: string;
  status: 'Sufficient' | 'Shortage' | 'On Order' | 'Critical';
  category: string;
  supplier: string;
  leadTime: number;
}

const MaterialRequirements: React.FC = () => {
  const navigate = useNavigate();
  const { isEnabled } = useVoiceAssistantContext();
  const { speak } = useVoiceAssistant();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('list');
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialRequirement | null>(null);
  const [orderQty, setOrderQty] = useState(0);
  const [lastMrpRun, setLastMrpRun] = useState('8h ago');

  const [materials, setMaterials] = useState<MaterialRequirement[]>([
    { id: '1', material: '1000234', description: 'Widget A - Aluminum Body', required: 2500, unit: 'EA', available: 1800, onOrder: 500, shortage: 200, orderDate: '2025-05-25', status: 'Shortage', category: 'Finished Goods', supplier: 'Tech Components Inc.', leadTime: 7 },
    { id: '2', material: '1000235', description: 'Widget B - Steel Frame', required: 1200, unit: 'EA', available: 180, onOrder: 0, shortage: 1020, orderDate: '2025-05-22', status: 'Critical', category: 'Components', supplier: 'Steel Works Ltd.', leadTime: 14 },
    { id: '3', material: '1000236', description: 'Component C - PCB Board', required: 4800, unit: 'EA', available: 5200, onOrder: 0, shortage: 0, orderDate: '-', status: 'Sufficient', category: 'Electronics', supplier: 'Global Electronics', leadTime: 10 },
    { id: '4', material: '1000237', description: 'Raw Material D - Steel Rod', required: 1200, unit: 'KG', available: 850, onOrder: 200, shortage: 150, orderDate: '2025-05-24', status: 'On Order', category: 'Raw Materials', supplier: 'Industrial Metals', leadTime: 5 },
    { id: '5', material: '1000238', description: 'Packaging Box - Large', required: 3000, unit: 'PC', available: 4500, onOrder: 0, shortage: 0, orderDate: '-', status: 'Sufficient', category: 'Packaging', supplier: 'Box & Pack Co.', leadTime: 3 },
    { id: '6', material: '1000239', description: 'Fastener Kit M8', required: 8000, unit: 'SET', available: 2100, onOrder: 3000, shortage: 2900, orderDate: '2025-05-23', status: 'Shortage', category: 'Hardware', supplier: 'Fastener World', leadTime: 4 },
  ]);

  React.useEffect(() => {
    if (isEnabled) speak('Welcome to Material Requirements Planning. Plan and manage materials needed for production.');
  }, [isEnabled, speak]);

  const runMRP = () => {
    // Recalculate requirements
    const updated = materials.map(m => {
      const net = m.required - m.available - m.onOrder;
      const shortage = Math.max(0, net);
      let status: MaterialRequirement['status'] = 'Sufficient';
      if (shortage > 0 && shortage > m.required * 0.5) status = 'Critical';
      else if (shortage > 0) status = 'Shortage';
      else if (m.onOrder > 0) status = 'On Order';
      return { ...m, shortage, status };
    });
    setMaterials(updated);
    setLastMrpRun('Just now');
    toast({ title: 'MRP Run Complete', description: `Material requirements recalculated. ${updated.filter(m => m.status !== 'Sufficient').length} items need attention.` });
  };

  const openOrder = (material: MaterialRequirement) => {
    setSelectedMaterial(material);
    setOrderQty(material.shortage > 0 ? material.shortage + 100 : 500);
    setIsOrderDialogOpen(true);
  };

  const handlePlaceOrder = () => {
    if (!selectedMaterial) return;
    setMaterials(prev => prev.map(m => m.id === selectedMaterial.id
      ? { ...m, onOrder: m.onOrder + orderQty, status: 'On Order' as const }
      : m
    ));
    toast({ title: 'Purchase Order Created', description: `Order for ${orderQty} ${selectedMaterial.unit} of ${selectedMaterial.description} placed with ${selectedMaterial.supplier}.` });
    setIsOrderDialogOpen(false);
  };

  const getStatusColor = (s: string) => {
    const c = { 'Sufficient': 'bg-green-100 text-green-800', 'Shortage': 'bg-orange-100 text-orange-800', 'On Order': 'bg-blue-100 text-blue-800', 'Critical': 'bg-red-100 text-red-800' };
    return c[s as keyof typeof c] || 'bg-gray-100 text-gray-800';
  };

  const columns: EnhancedColumn[] = [
    { key: 'material', header: 'Material #', sortable: true, searchable: true },
    { key: 'description', header: 'Description', searchable: true },
    { key: 'category', header: 'Category', filterable: true, filterOptions: ['Finished Goods','Components','Electronics','Raw Materials','Packaging','Hardware'].map(v => ({ label: v, value: v })) },
    { key: 'required', header: 'Required', sortable: true, render: (v: number, row: MaterialRequirement) => `${v.toLocaleString()} ${row.unit}` },
    { key: 'available', header: 'Available', sortable: true, render: (v: number, row: MaterialRequirement) => `${v.toLocaleString()} ${row.unit}` },
    { key: 'onOrder', header: 'On Order', render: (v: number, row: MaterialRequirement) => v > 0 ? <span className="text-blue-600">{v.toLocaleString()} {row.unit}</span> : '-' },
    { key: 'shortage', header: 'Shortage', sortable: true, render: (v: number, row: MaterialRequirement) => v > 0 ? <span className="font-semibold text-red-600">{v.toLocaleString()} {row.unit}</span> : <span className="text-green-600">None</span> },
    { key: 'status', header: 'Status', filterable: true, filterOptions: ['Sufficient','Shortage','On Order','Critical'].map(v => ({ label: v, value: v })), render: (v: string) => <Badge className={getStatusColor(v)}>{v}</Badge> },
    { key: 'supplier', header: 'Supplier', searchable: true },
    { key: 'leadTime', header: 'Lead Time', render: (v: number) => `${v} days` },
  ];

  const actions: TableAction[] = [
    { label: 'Place Order', icon: <ShoppingCart className="h-4 w-4" />, onClick: openOrder, variant: 'ghost', condition: (row: MaterialRequirement) => row.shortage > 0 || row.status === 'Shortage' || row.status === 'Critical' },
    { label: 'View Details', icon: <CheckCircle className="h-4 w-4" />, onClick: (row: MaterialRequirement) => toast({ title: row.description, description: `Available: ${row.available} | Required: ${row.required} | Lead Time: ${row.leadTime} days` }), variant: 'ghost' },
  ];

  const chartData = materials.map(m => ({ name: m.material, Required: m.required, Available: m.available, OnOrder: m.onOrder }));

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center mb-4">
        <Button variant="outline" size="sm" className="mr-4" onClick={() => navigate('/manufacturing')}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Back
        </Button>
        <PageHeader title="Material Requirements Planning" description="Plan and manage materials needed for production" voiceIntroduction="Welcome to Material Requirements Planning." />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4"><div className="text-sm text-muted-foreground">Critical Shortages</div><div className="text-2xl font-bold text-red-600">{materials.filter(m => m.status === 'Critical').length}</div><div className="text-sm text-red-500">Immediate action needed</div></Card>
        <Card className="p-4"><div className="text-sm text-muted-foreground">Materials Short</div><div className="text-2xl font-bold text-orange-600">{materials.filter(m => m.status === 'Shortage').length}</div><div className="text-sm text-orange-500">Order required</div></Card>
        <Card className="p-4"><div className="text-sm text-muted-foreground">On Order</div><div className="text-2xl font-bold text-blue-600">{materials.filter(m => m.status === 'On Order').length}</div><div className="text-sm text-blue-500">In transit</div></Card>
        <Card className="p-4"><div className="text-sm text-muted-foreground">Last MRP Run</div><div className="text-xl font-bold">{lastMrpRun}</div><div className="text-sm text-muted-foreground">Click Run MRP to refresh</div></Card>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <RefreshCw className="h-4 w-4" />Last updated: {lastMrpRun}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => toast({ description: 'Filter applied' })}><Filter className="h-4 w-4 mr-2" />Filter</Button>
          <Button variant="outline" size="sm" onClick={() => toast({ description: 'Exporting MRP data...' })}><Download className="h-4 w-4 mr-2" />Export</Button>
          <Button size="sm" onClick={runMRP}><Play className="h-4 w-4 mr-2" />Run MRP</Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="list">Requirements List</TabsTrigger>
          <TabsTrigger value="chart">Availability Chart</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="list">
          <Card>
            <CardContent className="pt-4">
              <EnhancedDataTable columns={columns} data={materials} actions={actions} searchPlaceholder="Search materials..." exportable refreshable onRefresh={runMRP} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="chart">
          <Card>
            <CardHeader><CardTitle>Material Availability vs Requirements</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Required" fill="#ef4444" name="Required" />
                  <Bar dataKey="Available" fill="#22c55e" name="Available" />
                  <Bar dataKey="OnOrder" fill="#3b82f6" name="On Order" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts">
          <div className="space-y-4">
            {materials.filter(m => m.status !== 'Sufficient').map(m => (
              <Card key={m.id} className={`border-l-4 ${m.status === 'Critical' ? 'border-l-red-500' : m.status === 'Shortage' ? 'border-l-orange-500' : 'border-l-blue-500'}`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <AlertTriangle className={`h-4 w-4 ${m.status === 'Critical' ? 'text-red-500' : 'text-orange-500'}`} />
                        <span className="font-medium">{m.description}</span>
                        <Badge className={getStatusColor(m.status)}>{m.status}</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        Shortage: {m.shortage.toLocaleString()} {m.unit} | Supplier: {m.supplier} | Lead Time: {m.leadTime} days
                      </div>
                    </div>
                    <Button size="sm" onClick={() => openOrder(m)}><ShoppingCart className="h-4 w-4 mr-2" />Order Now</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            {materials.filter(m => m.status !== 'Sufficient').length === 0 && (
              <Card><CardContent className="p-8 text-center text-muted-foreground">All materials have sufficient coverage.</CardContent></Card>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Order Dialog */}
      <Dialog open={isOrderDialogOpen} onOpenChange={setIsOrderDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Place Purchase Order</DialogTitle></DialogHeader>
          {selectedMaterial && (
            <div className="space-y-4 py-4">
              <div className="bg-muted p-3 rounded text-sm space-y-1">
                <div><strong>Material:</strong> {selectedMaterial.description}</div>
                <div><strong>Supplier:</strong> {selectedMaterial.supplier}</div>
                <div><strong>Lead Time:</strong> {selectedMaterial.leadTime} days</div>
                <div><strong>Current Shortage:</strong> <span className="text-red-600">{selectedMaterial.shortage.toLocaleString()} {selectedMaterial.unit}</span></div>
              </div>
              <div className="space-y-2">
                <Label>Order Quantity ({selectedMaterial.unit})</Label>
                <Input type="number" value={orderQty} onChange={e => setOrderQty(Number(e.target.value))} min={1} />
              </div>
              <div className="text-sm text-muted-foreground">Expected delivery by: {new Date(Date.now() + selectedMaterial.leadTime * 86400000).toLocaleDateString()}</div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOrderDialogOpen(false)}>Cancel</Button>
            <Button onClick={handlePlaceOrder}><ShoppingCart className="h-4 w-4 mr-2" />Place Order</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MaterialRequirements;

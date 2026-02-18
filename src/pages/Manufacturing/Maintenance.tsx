
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Textarea } from '../../components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../../components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { useVoiceAssistantContext } from '../../context/VoiceAssistantContext';
import { useVoiceAssistant } from '../../hooks/useVoiceAssistant';
import PageHeader from '../../components/page/PageHeader';
import EnhancedDataTable, { EnhancedColumn, TableAction } from '../../components/data/EnhancedDataTable';
import { useToast } from '../../hooks/use-toast';
import { ArrowLeft, Plus, Edit, Eye, Wrench, Calendar, AlertTriangle, CheckCircle, Trash2, Clock, Play } from 'lucide-react';

interface MaintenanceOrder {
  id: string;
  orderNumber: string;
  equipment: string;
  equipmentId: string;
  type: 'Preventive' | 'Corrective' | 'Predictive' | 'Emergency';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Open' | 'In Progress' | 'Completed' | 'On Hold' | 'Cancelled';
  scheduledDate: string;
  completedDate?: string;
  estimatedDuration: string;
  technician: string;
  description: string;
  resolution?: string;
  costActual?: number;
  costEstimated: number;
}

const defaultForm: Omit<MaintenanceOrder, 'id' | 'orderNumber'> = {
  equipment: '',
  equipmentId: '',
  type: 'Preventive',
  priority: 'Medium',
  status: 'Open',
  scheduledDate: new Date().toISOString().split('T')[0],
  estimatedDuration: '2 hours',
  technician: '',
  description: '',
  costEstimated: 500,
};

const Maintenance: React.FC = () => {
  const navigate = useNavigate();
  const { isEnabled } = useVoiceAssistantContext();
  const { speak } = useVoiceAssistant();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState<MaintenanceOrder[]>([
    { id: '1', orderNumber: 'MO-001', equipment: 'Production Line A1', equipmentId: 'EQ-001', type: 'Preventive', priority: 'High', status: 'In Progress', scheduledDate: '2025-01-28', estimatedDuration: '4 hours', technician: 'Mike Johnson', description: 'Monthly lubrication and inspection', costEstimated: 800, costActual: 750 },
    { id: '2', orderNumber: 'MO-002', equipment: 'Packaging Machine B2', equipmentId: 'EQ-002', type: 'Corrective', priority: 'Critical', status: 'Open', scheduledDate: '2025-01-27', estimatedDuration: '8 hours', technician: 'Sarah Davis', description: 'Replace faulty conveyor belt', costEstimated: 2500 },
    { id: '3', orderNumber: 'MO-003', equipment: 'Quality Control Station', equipmentId: 'EQ-003', type: 'Predictive', priority: 'Medium', status: 'Completed', scheduledDate: '2025-01-25', completedDate: '2025-01-25', estimatedDuration: '2 hours', technician: 'Robert Brown', description: 'Calibration of measuring instruments', resolution: 'Calibrated all instruments. All within spec.', costEstimated: 400, costActual: 380 },
    { id: '4', orderNumber: 'MO-004', equipment: 'CNC Machining Center', equipmentId: 'EQ-004', type: 'Emergency', priority: 'Critical', status: 'Open', scheduledDate: '2025-01-29', estimatedDuration: '6 hours', technician: 'Tom Carter', description: 'Spindle failure - immediate repair required', costEstimated: 5000 },
  ]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState<MaintenanceOrder | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<MaintenanceOrder | null>(null);
  const [form, setForm] = useState<Omit<MaintenanceOrder, 'id' | 'orderNumber'>>(defaultForm);

  React.useEffect(() => {
    if (isEnabled) speak('Welcome to Maintenance Management. Manage equipment maintenance, schedules, and service records.');
  }, [isEnabled, speak]);

  const openCreate = () => {
    setEditingOrder(null);
    setForm(defaultForm);
    setIsDialogOpen(true);
  };

  const openEdit = (order: MaintenanceOrder) => {
    setEditingOrder(order);
    setForm({ equipment: order.equipment, equipmentId: order.equipmentId, type: order.type, priority: order.priority, status: order.status, scheduledDate: order.scheduledDate, completedDate: order.completedDate, estimatedDuration: order.estimatedDuration, technician: order.technician, description: order.description, resolution: order.resolution, costActual: order.costActual, costEstimated: order.costEstimated });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!form.equipment.trim() || !form.technician.trim()) {
      toast({ title: 'Validation Error', description: 'Equipment and Technician are required.', variant: 'destructive' });
      return;
    }
    if (editingOrder) {
      setOrders(prev => prev.map(o => o.id === editingOrder.id ? { ...editingOrder, ...form } : o));
      toast({ title: 'Order Updated', description: `${editingOrder.orderNumber} has been updated.` });
    } else {
      const newOrder: MaintenanceOrder = {
        id: String(Date.now()),
        orderNumber: `MO-${String(orders.length + 1).padStart(3, '0')}`,
        ...form,
      };
      setOrders(prev => [...prev, newOrder]);
      toast({ title: 'Order Created', description: `${newOrder.orderNumber} has been created.` });
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (order: MaintenanceOrder) => {
    setOrders(prev => prev.filter(o => o.id !== order.id));
    toast({ title: 'Order Deleted', description: `${order.orderNumber} has been removed.` });
  };

  const handleStatusChange = (order: MaintenanceOrder, status: MaintenanceOrder['status']) => {
    const updates: Partial<MaintenanceOrder> = { status };
    if (status === 'Completed') updates.completedDate = new Date().toISOString().split('T')[0];
    setOrders(prev => prev.map(o => o.id === order.id ? { ...o, ...updates } : o));
    toast({ title: 'Status Updated', description: `${order.orderNumber} status changed to ${status}.` });
  };

  const getTypeColor = (type: string) => {
    const c = { 'Preventive': 'bg-blue-100 text-blue-800', 'Corrective': 'bg-orange-100 text-orange-800', 'Predictive': 'bg-purple-100 text-purple-800', 'Emergency': 'bg-red-100 text-red-800' };
    return c[type as keyof typeof c] || 'bg-gray-100 text-gray-800';
  };
  const getPriorityColor = (p: string) => {
    const c = { 'Low': 'bg-gray-100 text-gray-800', 'Medium': 'bg-yellow-100 text-yellow-800', 'High': 'bg-orange-100 text-orange-800', 'Critical': 'bg-red-100 text-red-800' };
    return c[p as keyof typeof c] || 'bg-gray-100 text-gray-800';
  };
  const getStatusColor = (s: string) => {
    const c = { 'Open': 'bg-blue-100 text-blue-800', 'In Progress': 'bg-yellow-100 text-yellow-800', 'Completed': 'bg-green-100 text-green-800', 'On Hold': 'bg-gray-100 text-gray-800', 'Cancelled': 'bg-red-100 text-red-800' };
    return c[s as keyof typeof c] || 'bg-gray-100 text-gray-800';
  };

  const columns: EnhancedColumn[] = [
    { key: 'orderNumber', header: 'Order #', sortable: true, searchable: true },
    { key: 'equipment', header: 'Equipment', searchable: true },
    { key: 'type', header: 'Type', filterable: true, filterOptions: ['Preventive','Corrective','Predictive','Emergency'].map(v => ({ label: v, value: v })), render: (v: string) => <Badge className={getTypeColor(v)}>{v}</Badge> },
    { key: 'priority', header: 'Priority', filterable: true, filterOptions: ['Low','Medium','High','Critical'].map(v => ({ label: v, value: v })), render: (v: string) => <Badge className={getPriorityColor(v)}>{v}</Badge> },
    { key: 'status', header: 'Status', filterable: true, filterOptions: ['Open','In Progress','Completed','On Hold','Cancelled'].map(v => ({ label: v, value: v })), render: (v: string) => <Badge className={getStatusColor(v)}>{v}</Badge> },
    { key: 'scheduledDate', header: 'Scheduled', sortable: true },
    { key: 'technician', header: 'Technician', searchable: true },
    { key: 'estimatedDuration', header: 'Duration' },
    { key: 'costEstimated', header: 'Est. Cost', render: (v: number) => `$${v.toLocaleString()}` },
  ];

  const actions: TableAction[] = [
    { label: 'View', icon: <Eye className="h-4 w-4" />, onClick: (row: MaintenanceOrder) => { setSelectedOrder(row); setIsViewDialogOpen(true); }, variant: 'ghost' },
    { label: 'Edit', icon: <Edit className="h-4 w-4" />, onClick: openEdit, variant: 'ghost' },
    { label: 'Start Work', icon: <Play className="h-4 w-4" />, onClick: (row: MaintenanceOrder) => handleStatusChange(row, 'In Progress'), variant: 'ghost', condition: (row: MaintenanceOrder) => row.status === 'Open' },
    { label: 'Complete', icon: <CheckCircle className="h-4 w-4" />, onClick: (row: MaintenanceOrder) => handleStatusChange(row, 'Completed'), variant: 'ghost', condition: (row: MaintenanceOrder) => row.status === 'In Progress' },
    { label: 'Put On Hold', icon: <Clock className="h-4 w-4" />, onClick: (row: MaintenanceOrder) => handleStatusChange(row, 'On Hold'), variant: 'ghost', condition: (row: MaintenanceOrder) => ['Open','In Progress'].includes(row.status) },
    { label: 'Delete', icon: <Trash2 className="h-4 w-4" />, onClick: handleDelete, variant: 'ghost' },
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center mb-4">
        <Button variant="outline" size="sm" className="mr-4" onClick={() => navigate('/manufacturing')}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Back
        </Button>
        <PageHeader title="Maintenance Management" description="Manage equipment maintenance, schedules, and service records" voiceIntroduction="Welcome to Maintenance Management." />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4"><div className="text-sm text-muted-foreground">Open Orders</div><div className="text-2xl font-bold">{orders.filter(o => o.status === 'Open').length}</div><div className="text-sm text-blue-600">{orders.filter(o => o.priority === 'Critical').length} critical</div></Card>
        <Card className="p-4"><div className="text-sm text-muted-foreground">In Progress</div><div className="text-2xl font-bold">{orders.filter(o => o.status === 'In Progress').length}</div><div className="text-sm text-yellow-600">Active work orders</div></Card>
        <Card className="p-4"><div className="text-sm text-muted-foreground">Completed</div><div className="text-2xl font-bold">{orders.filter(o => o.status === 'Completed').length}</div><div className="text-sm text-green-600">This period</div></Card>
        <Card className="p-4"><div className="text-sm text-muted-foreground">Est. Total Cost</div><div className="text-2xl font-bold">${orders.reduce((s, o) => s + (o.costActual || o.costEstimated), 0).toLocaleString()}</div><div className="text-sm text-orange-600">All orders</div></Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            Maintenance Orders
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => { setForm(f => ({ ...f, type: 'Preventive' })); openCreate(); }}>
                <Calendar className="h-4 w-4 mr-2" />Schedule Maintenance
              </Button>
              <Button onClick={openCreate}><Plus className="h-4 w-4 mr-2" />Create Order</Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <EnhancedDataTable columns={columns} data={orders} actions={actions} searchPlaceholder="Search orders..." exportable refreshable onRefresh={() => {}} />
        </CardContent>
      </Card>

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingOrder ? `Edit ${editingOrder.orderNumber}` : 'Create Maintenance Order'}</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label>Equipment Name *</Label>
              <Input value={form.equipment} onChange={e => setForm(f => ({ ...f, equipment: e.target.value }))} placeholder="Equipment name" />
            </div>
            <div className="space-y-2">
              <Label>Equipment ID</Label>
              <Input value={form.equipmentId} onChange={e => setForm(f => ({ ...f, equipmentId: e.target.value }))} placeholder="e.g. EQ-001" />
            </div>
            <div className="space-y-2">
              <Label>Type</Label>
              <Select value={form.type} onValueChange={v => setForm(f => ({ ...f, type: v as MaintenanceOrder['type'] }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{['Preventive','Corrective','Predictive','Emergency'].map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Priority</Label>
              <Select value={form.priority} onValueChange={v => setForm(f => ({ ...f, priority: v as MaintenanceOrder['priority'] }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{['Low','Medium','High','Critical'].map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={form.status} onValueChange={v => setForm(f => ({ ...f, status: v as MaintenanceOrder['status'] }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{['Open','In Progress','Completed','On Hold','Cancelled'].map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Scheduled Date</Label>
              <Input type="date" value={form.scheduledDate} onChange={e => setForm(f => ({ ...f, scheduledDate: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label>Technician *</Label>
              <Input value={form.technician} onChange={e => setForm(f => ({ ...f, technician: e.target.value }))} placeholder="Technician name" />
            </div>
            <div className="space-y-2">
              <Label>Estimated Duration</Label>
              <Input value={form.estimatedDuration} onChange={e => setForm(f => ({ ...f, estimatedDuration: e.target.value }))} placeholder="e.g. 4 hours" />
            </div>
            <div className="space-y-2">
              <Label>Estimated Cost ($)</Label>
              <Input type="number" value={form.costEstimated} onChange={e => setForm(f => ({ ...f, costEstimated: Number(e.target.value) }))} />
            </div>
            <div className="space-y-2">
              <Label>Actual Cost ($)</Label>
              <Input type="number" value={form.costActual || ''} onChange={e => setForm(f => ({ ...f, costActual: e.target.value ? Number(e.target.value) : undefined }))} placeholder="After completion" />
            </div>
            <div className="col-span-2 space-y-2">
              <Label>Description</Label>
              <Textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={3} placeholder="Describe the maintenance work required" />
            </div>
            {(form.status === 'Completed') && (
              <div className="col-span-2 space-y-2">
                <Label>Resolution / Work Done</Label>
                <Textarea value={form.resolution || ''} onChange={e => setForm(f => ({ ...f, resolution: e.target.value }))} rows={3} placeholder="Describe what was done to resolve the issue" />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>{editingOrder ? 'Update' : 'Create'} Order</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Maintenance Order: {selectedOrder?.orderNumber}</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-3">
                <div><Label>Equipment</Label><div className="font-medium">{selectedOrder.equipment}</div></div>
                <div><Label>Equipment ID</Label><div>{selectedOrder.equipmentId}</div></div>
                <div><Label>Type</Label><Badge className={getTypeColor(selectedOrder.type)}>{selectedOrder.type}</Badge></div>
                <div><Label>Priority</Label><Badge className={getPriorityColor(selectedOrder.priority)}>{selectedOrder.priority}</Badge></div>
                <div><Label>Status</Label><Badge className={getStatusColor(selectedOrder.status)}>{selectedOrder.status}</Badge></div>
                <div><Label>Technician</Label><div>{selectedOrder.technician}</div></div>
                <div><Label>Scheduled Date</Label><div>{selectedOrder.scheduledDate}</div></div>
                <div><Label>Duration</Label><div>{selectedOrder.estimatedDuration}</div></div>
                <div><Label>Est. Cost</Label><div>${selectedOrder.costEstimated.toLocaleString()}</div></div>
                {selectedOrder.costActual && <div><Label>Actual Cost</Label><div className="font-semibold">${selectedOrder.costActual.toLocaleString()}</div></div>}
              </div>
              <div><Label>Description</Label><div className="mt-1 text-sm bg-muted p-3 rounded">{selectedOrder.description}</div></div>
              {selectedOrder.resolution && <div><Label>Resolution</Label><div className="mt-1 text-sm bg-green-50 p-3 rounded">{selectedOrder.resolution}</div></div>}
              <div className="flex gap-2 pt-2">
                <Button onClick={() => { setIsViewDialogOpen(false); openEdit(selectedOrder); }}><Edit className="h-4 w-4 mr-2" />Edit</Button>
                {selectedOrder.status === 'Open' && <Button variant="outline" onClick={() => { handleStatusChange(selectedOrder, 'In Progress'); setIsViewDialogOpen(false); }}><Play className="h-4 w-4 mr-2" />Start Work</Button>}
                {selectedOrder.status === 'In Progress' && <Button variant="outline" onClick={() => { handleStatusChange(selectedOrder, 'Completed'); setIsViewDialogOpen(false); }}><CheckCircle className="h-4 w-4 mr-2" />Complete</Button>}
                <Button variant="ghost" onClick={() => setIsViewDialogOpen(false)}>Close</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Maintenance;

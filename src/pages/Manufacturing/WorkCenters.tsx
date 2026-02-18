
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
import { useVoiceAssistantContext } from '../../context/VoiceAssistantContext';
import { useVoiceAssistant } from '../../hooks/useVoiceAssistant';
import PageHeader from '../../components/page/PageHeader';
import EnhancedDataTable, { EnhancedColumn, TableAction } from '../../components/data/EnhancedDataTable';
import { useToast } from '../../hooks/use-toast';
import { ArrowLeft, Plus, Edit, Eye, Trash2, Settings, Activity, Wrench, CheckCircle } from 'lucide-react';

interface WorkCenter {
  id: string;
  name: string;
  type: string;
  capacity: number;
  efficiency: number;
  status: 'Active' | 'Maintenance' | 'Inactive';
  costCenter: string;
  responsiblePerson: string;
  plant: string;
  location: string;
  shift: string;
  setupTime: number;
  teardownTime: number;
  hourlyRate: number;
}

const defaultForm: Omit<WorkCenter, 'id'> = {
  name: '',
  type: 'Production',
  capacity: 160,
  efficiency: 90,
  status: 'Active',
  costCenter: '',
  responsiblePerson: '',
  plant: 'Plant 1000',
  location: '',
  shift: 'Day Shift',
  setupTime: 30,
  teardownTime: 20,
  hourlyRate: 85,
};

const WorkCenters: React.FC = () => {
  const navigate = useNavigate();
  const { isEnabled } = useVoiceAssistantContext();
  const { speak } = useVoiceAssistant();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('list');
  const [workCenters, setWorkCenters] = useState<WorkCenter[]>([
    { id: 'WC-001', name: 'Assembly Line 1', type: 'Production', capacity: 160, efficiency: 92, status: 'Active', costCenter: 'CC-1001', responsiblePerson: 'John Smith', plant: 'Plant 1000', location: 'Building A, Floor 1', shift: 'Day Shift', setupTime: 45, teardownTime: 30, hourlyRate: 95 },
    { id: 'WC-002', name: 'Quality Control Station', type: 'Quality', capacity: 80, efficiency: 95, status: 'Active', costCenter: 'CC-1002', responsiblePerson: 'Jane Doe', plant: 'Plant 1000', location: 'Building A, Floor 2', shift: 'Day Shift', setupTime: 20, teardownTime: 15, hourlyRate: 75 },
    { id: 'WC-003', name: 'Packaging Line', type: 'Packaging', capacity: 120, efficiency: 88, status: 'Maintenance', costCenter: 'CC-1003', responsiblePerson: 'Mike Wilson', plant: 'Plant 1000', location: 'Building B, Floor 1', shift: 'Night Shift', setupTime: 30, teardownTime: 25, hourlyRate: 80 },
    { id: 'WC-004', name: 'Welding Station', type: 'Fabrication', capacity: 140, efficiency: 85, status: 'Active', costCenter: 'CC-1004', responsiblePerson: 'Robert Lee', plant: 'Plant 2000', location: 'Building C, Floor 1', shift: 'Day Shift', setupTime: 60, teardownTime: 45, hourlyRate: 110 },
  ]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [editingWC, setEditingWC] = useState<WorkCenter | null>(null);
  const [selectedWC, setSelectedWC] = useState<WorkCenter | null>(null);
  const [form, setForm] = useState<Omit<WorkCenter, 'id'>>(defaultForm);

  React.useEffect(() => {
    if (isEnabled) speak('Welcome to Work Centers Management. Manage work centers, capacity, and configuration.');
  }, [isEnabled, speak]);

  const openCreate = () => {
    setEditingWC(null);
    setForm(defaultForm);
    setIsDialogOpen(true);
  };

  const openEdit = (wc: WorkCenter) => {
    setEditingWC(wc);
    setForm({ name: wc.name, type: wc.type, capacity: wc.capacity, efficiency: wc.efficiency, status: wc.status, costCenter: wc.costCenter, responsiblePerson: wc.responsiblePerson, plant: wc.plant, location: wc.location, shift: wc.shift, setupTime: wc.setupTime, teardownTime: wc.teardownTime, hourlyRate: wc.hourlyRate });
    setIsDialogOpen(true);
  };

  const openView = (wc: WorkCenter) => {
    setSelectedWC(wc);
    setIsViewDialogOpen(true);
  };

  const handleSave = () => {
    if (!form.name.trim()) {
      toast({ title: 'Validation Error', description: 'Work Center name is required.', variant: 'destructive' });
      return;
    }
    if (editingWC) {
      setWorkCenters(prev => prev.map(w => w.id === editingWC.id ? { ...editingWC, ...form } : w));
      toast({ title: 'Work Center Updated', description: `${form.name} has been updated successfully.` });
    } else {
      const newWC: WorkCenter = { id: `WC-${String(workCenters.length + 1).padStart(3, '0')}`, ...form };
      setWorkCenters(prev => [...prev, newWC]);
      toast({ title: 'Work Center Created', description: `${form.name} has been created successfully.` });
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (wc: WorkCenter) => {
    setWorkCenters(prev => prev.filter(w => w.id !== wc.id));
    toast({ title: 'Work Center Deleted', description: `${wc.name} has been removed.` });
  };

  const handleStatusChange = (wc: WorkCenter, status: WorkCenter['status']) => {
    setWorkCenters(prev => prev.map(w => w.id === wc.id ? { ...w, status } : w));
    toast({ title: 'Status Updated', description: `${wc.name} status changed to ${status}.` });
  };

  const getStatusColor = (status: string) => {
    const colors = { 'Active': 'bg-green-100 text-green-800', 'Maintenance': 'bg-yellow-100 text-yellow-800', 'Inactive': 'bg-red-100 text-red-800' };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const columns: EnhancedColumn[] = [
    { key: 'id', header: 'Work Center ID', sortable: true, searchable: true },
    { key: 'name', header: 'Name', searchable: true },
    { key: 'type', header: 'Type', filterable: true, filterOptions: ['Production','Quality','Packaging','Fabrication','Testing'].map(v => ({ label: v, value: v })) },
    { key: 'plant', header: 'Plant', searchable: true },
    { key: 'capacity', header: 'Capacity (hrs)', sortable: true, render: (v: number) => `${v} hrs` },
    { key: 'efficiency', header: 'Efficiency', sortable: true, render: (v: number) => (
      <div className="flex items-center gap-2">
        <div className="w-16 bg-gray-200 rounded-full h-2">
          <div className={`h-2 rounded-full ${v >= 90 ? 'bg-green-500' : v >= 80 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: `${v}%` }} />
        </div>
        <span className={v >= 90 ? 'text-green-600' : v >= 80 ? 'text-yellow-600' : 'text-red-600'}>{v}%</span>
      </div>
    )},
    { key: 'responsiblePerson', header: 'Responsible', searchable: true },
    { key: 'status', header: 'Status', filterable: true, filterOptions: ['Active','Maintenance','Inactive'].map(v => ({ label: v, value: v })),
      render: (v: string) => <Badge className={getStatusColor(v)}>{v}</Badge> },
    { key: 'hourlyRate', header: 'Rate/hr', sortable: true, render: (v: number) => `$${v}` },
  ];

  const actions: TableAction[] = [
    { label: 'View', icon: <Eye className="h-4 w-4" />, onClick: openView, variant: 'ghost' },
    { label: 'Edit', icon: <Edit className="h-4 w-4" />, onClick: openEdit, variant: 'ghost' },
    { label: 'Set Active', icon: <CheckCircle className="h-4 w-4" />, onClick: (row: WorkCenter) => handleStatusChange(row, 'Active'), variant: 'ghost', condition: (row: WorkCenter) => row.status !== 'Active' },
    { label: 'Set Maintenance', icon: <Wrench className="h-4 w-4" />, onClick: (row: WorkCenter) => handleStatusChange(row, 'Maintenance'), variant: 'ghost', condition: (row: WorkCenter) => row.status === 'Active' },
    { label: 'Delete', icon: <Trash2 className="h-4 w-4" />, onClick: handleDelete, variant: 'ghost' },
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center mb-4">
        <Button variant="outline" size="sm" className="mr-4" onClick={() => navigate('/manufacturing')}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Back
        </Button>
        <PageHeader title="Work Centers" description="Manage work centers, capacity, and configuration" voiceIntroduction="Welcome to Work Centers Management." />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="text-sm text-muted-foreground">Total Work Centers</div>
          <div className="text-2xl font-bold">{workCenters.length}</div>
          <div className="text-sm text-blue-600">All centers</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-muted-foreground">Active Centers</div>
          <div className="text-2xl font-bold">{workCenters.filter(w => w.status === 'Active').length}</div>
          <div className="text-sm text-green-600">Operational</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-muted-foreground">Avg Efficiency</div>
          <div className="text-2xl font-bold">{workCenters.length ? (workCenters.reduce((s, w) => s + w.efficiency, 0) / workCenters.length).toFixed(1) : 0}%</div>
          <div className="text-sm text-purple-600">Across all centers</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-muted-foreground">Under Maintenance</div>
          <div className="text-2xl font-bold">{workCenters.filter(w => w.status === 'Maintenance').length}</div>
          <div className="text-sm text-yellow-600">Scheduled</div>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            Work Centers
            <Button onClick={openCreate}><Plus className="h-4 w-4 mr-2" />Create Work Center</Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <EnhancedDataTable columns={columns} data={workCenters} actions={actions} searchPlaceholder="Search work centers..." exportable refreshable onRefresh={() => {}} />
        </CardContent>
      </Card>

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingWC ? 'Edit Work Center' : 'Create Work Center'}</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label>Work Center Name *</Label>
              <Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. Assembly Line 1" />
            </div>
            <div className="space-y-2">
              <Label>Type</Label>
              <Select value={form.type} onValueChange={v => setForm(f => ({ ...f, type: v }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {['Production','Quality','Packaging','Fabrication','Testing','Welding','Machining'].map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Plant</Label>
              <Select value={form.plant} onValueChange={v => setForm(f => ({ ...f, plant: v }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {['Plant 1000','Plant 2000','Plant 3000'].map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={form.status} onValueChange={v => setForm(f => ({ ...f, status: v as WorkCenter['status'] }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {['Active','Maintenance','Inactive'].map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Capacity (hrs/month)</Label>
              <Input type="number" value={form.capacity} onChange={e => setForm(f => ({ ...f, capacity: Number(e.target.value) }))} />
            </div>
            <div className="space-y-2">
              <Label>Efficiency (%)</Label>
              <Input type="number" min="0" max="100" value={form.efficiency} onChange={e => setForm(f => ({ ...f, efficiency: Number(e.target.value) }))} />
            </div>
            <div className="space-y-2">
              <Label>Cost Center</Label>
              <Input value={form.costCenter} onChange={e => setForm(f => ({ ...f, costCenter: e.target.value }))} placeholder="e.g. CC-1001" />
            </div>
            <div className="space-y-2">
              <Label>Responsible Person</Label>
              <Input value={form.responsiblePerson} onChange={e => setForm(f => ({ ...f, responsiblePerson: e.target.value }))} placeholder="Full name" />
            </div>
            <div className="space-y-2">
              <Label>Location</Label>
              <Input value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} placeholder="Building & floor" />
            </div>
            <div className="space-y-2">
              <Label>Shift</Label>
              <Select value={form.shift} onValueChange={v => setForm(f => ({ ...f, shift: v }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {['Day Shift','Night Shift','24 Hours','3-Shift'].map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Setup Time (min)</Label>
              <Input type="number" value={form.setupTime} onChange={e => setForm(f => ({ ...f, setupTime: Number(e.target.value) }))} />
            </div>
            <div className="space-y-2">
              <Label>Teardown Time (min)</Label>
              <Input type="number" value={form.teardownTime} onChange={e => setForm(f => ({ ...f, teardownTime: Number(e.target.value) }))} />
            </div>
            <div className="space-y-2 col-span-2">
              <Label>Hourly Rate ($)</Label>
              <Input type="number" value={form.hourlyRate} onChange={e => setForm(f => ({ ...f, hourlyRate: Number(e.target.value) }))} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>{editingWC ? 'Update' : 'Create'} Work Center</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Work Center Details: {selectedWC?.id}</DialogTitle>
          </DialogHeader>
          {selectedWC && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Name</Label><div className="font-medium">{selectedWC.name}</div></div>
                <div><Label>Type</Label><div>{selectedWC.type}</div></div>
                <div><Label>Plant</Label><div>{selectedWC.plant}</div></div>
                <div><Label>Status</Label><Badge className={getStatusColor(selectedWC.status)}>{selectedWC.status}</Badge></div>
                <div><Label>Capacity</Label><div>{selectedWC.capacity} hrs/month</div></div>
                <div><Label>Efficiency</Label><div className={selectedWC.efficiency >= 90 ? 'text-green-600' : 'text-yellow-600'}>{selectedWC.efficiency}%</div></div>
                <div><Label>Cost Center</Label><div>{selectedWC.costCenter}</div></div>
                <div><Label>Responsible Person</Label><div>{selectedWC.responsiblePerson}</div></div>
                <div><Label>Location</Label><div>{selectedWC.location}</div></div>
                <div><Label>Shift</Label><div>{selectedWC.shift}</div></div>
                <div><Label>Setup Time</Label><div>{selectedWC.setupTime} min</div></div>
                <div><Label>Teardown Time</Label><div>{selectedWC.teardownTime} min</div></div>
                <div><Label>Hourly Rate</Label><div className="font-semibold">${selectedWC.hourlyRate}/hr</div></div>
              </div>
              <div className="flex gap-2 pt-2">
                <Button onClick={() => { setIsViewDialogOpen(false); openEdit(selectedWC); }}><Edit className="h-4 w-4 mr-2" />Edit</Button>
                <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>Close</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WorkCenters;


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
import { ArrowLeft, Calendar, Filter, Download, Clock, Plus, Edit, Eye, AlertTriangle, TrendingUp } from 'lucide-react';
import PageHeader from '../../components/page/PageHeader';
import { useVoiceAssistantContext } from '../../context/VoiceAssistantContext';
import { useVoiceAssistant } from '../../hooks/useVoiceAssistant';
import { useToast } from '../../hooks/use-toast';
import EnhancedDataTable, { EnhancedColumn, TableAction } from '../../components/data/EnhancedDataTable';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, LineChart, Line } from 'recharts';

interface WorkCenterCapacity {
  id: string;
  workCenter: string;
  name: string;
  plant: string;
  availableHours: number;
  plannedHours: number;
  utilization: number;
  overload: boolean;
}

const CapacityPlanning: React.FC = () => {
  const navigate = useNavigate();
  const { isEnabled } = useVoiceAssistantContext();
  const { speak } = useVoiceAssistant();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [period, setPeriod] = useState('current-week');
  const [isLevelingDialogOpen, setIsLevelingDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedWC, setSelectedWC] = useState<WorkCenterCapacity | null>(null);

  const [workCenters, setWorkCenters] = useState<WorkCenterCapacity[]>([
    { id: 'WC-001', workCenter: 'WC-001', name: 'Assembly Line 1', plant: 'Plant 1000', availableHours: 160, plannedHours: 142, utilization: 89, overload: false },
    { id: 'WC-002', workCenter: 'WC-002', name: 'Assembly Line 2', plant: 'Plant 1000', availableHours: 160, plannedHours: 126, utilization: 79, overload: false },
    { id: 'WC-003', workCenter: 'WC-003', name: 'Machining Center', plant: 'Plant 1000', availableHours: 160, plannedHours: 168, utilization: 105, overload: true },
    { id: 'WC-004', workCenter: 'WC-004', name: 'Testing Station', plant: 'Plant 1000', availableHours: 160, plannedHours: 85, utilization: 53, overload: false },
    { id: 'WC-005', workCenter: 'WC-005', name: 'Welding Station', plant: 'Plant 2000', availableHours: 140, plannedHours: 130, utilization: 93, overload: false },
    { id: 'WC-006', workCenter: 'WC-006', name: 'Painting Booth', plant: 'Plant 2000', availableHours: 120, plannedHours: 60, utilization: 50, overload: false },
  ]);

  const trendData = [
    { week: 'Week 18', WC001: 72, WC002: 65, WC003: 88, WC004: 45 },
    { week: 'Week 19', WC001: 78, WC002: 70, WC003: 95, WC004: 50 },
    { week: 'Week 20', WC001: 82, WC002: 74, WC003: 100, WC004: 48 },
    { week: 'Week 21', WC001: 89, WC002: 79, WC003: 105, WC004: 53 },
  ];

  React.useEffect(() => {
    if (isEnabled) speak('Welcome to Capacity Planning. Plan and manage production capacity efficiently.');
  }, [isEnabled, speak]);

  const runCapacityLeveling = () => {
    // Redistribute load from overloaded to underloaded centers
    const updated = workCenters.map(wc => {
      if (wc.overload) {
        const newPlanned = wc.availableHours * 0.90;
        return { ...wc, plannedHours: newPlanned, utilization: Math.round(newPlanned / wc.availableHours * 100), overload: false };
      }
      return wc;
    });
    setWorkCenters(updated);
    setIsLevelingDialogOpen(false);
    toast({ title: 'Capacity Leveling Applied', description: 'Workload has been redistributed across work centers.' });
  };

  const handleAdjust = (wc: WorkCenterCapacity) => {
    setSelectedWC(wc);
    setIsEditDialogOpen(true);
  };

  const handleSaveAdjust = () => {
    if (!selectedWC) return;
    const utilization = Math.round(selectedWC.plannedHours / selectedWC.availableHours * 100);
    const updated = { ...selectedWC, utilization, overload: utilization > 100 };
    setWorkCenters(prev => prev.map(wc => wc.id === updated.id ? updated : wc));
    toast({ title: 'Capacity Updated', description: `${updated.name} capacity has been adjusted.` });
    setIsEditDialogOpen(false);
  };

  const exportPlan = () => {
    toast({ title: 'Export Started', description: 'Capacity plan exported to Excel successfully.' });
  };

  const columns: EnhancedColumn[] = [
    { key: 'workCenter', header: 'Work Center', sortable: true },
    { key: 'name', header: 'Name', searchable: true },
    { key: 'plant', header: 'Plant', filterable: true, filterOptions: ['Plant 1000','Plant 2000'].map(v => ({ label: v, value: v })) },
    { key: 'availableHours', header: 'Available (hrs)', sortable: true, render: (v: number) => `${v} h` },
    { key: 'plannedHours', header: 'Planned (hrs)', sortable: true, render: (v: number) => `${v} h` },
    { key: 'utilization', header: 'Utilization', sortable: true, render: (v: number, row: WorkCenterCapacity) => (
      <div className="flex items-center gap-2">
        <div className="w-24 bg-gray-200 rounded-full h-2">
          <div className={`h-2 rounded-full ${v > 100 ? 'bg-red-500' : v > 85 ? 'bg-yellow-500' : 'bg-green-500'}`} style={{ width: `${Math.min(v, 100)}%` }} />
        </div>
        <span className={v > 100 ? 'text-red-600 font-semibold' : v > 85 ? 'text-yellow-600' : 'text-green-600'}>{v}%</span>
        {row.overload && <AlertTriangle className="h-4 w-4 text-red-500" />}
      </div>
    )},
    { key: 'overload', header: 'Status', render: (v: boolean) => v ? <Badge className="bg-red-100 text-red-800">Overloaded</Badge> : <Badge className="bg-green-100 text-green-800">Normal</Badge> },
  ];

  const actions: TableAction[] = [
    { label: 'View Details', icon: <Eye className="h-4 w-4" />, onClick: (row: WorkCenterCapacity) => { toast({ title: row.name, description: `${row.plannedHours}/${row.availableHours} hrs planned (${row.utilization}%)` }); }, variant: 'ghost' },
    { label: 'Adjust Capacity', icon: <Edit className="h-4 w-4" />, onClick: handleAdjust, variant: 'ghost' },
  ];

  const avgUtil = workCenters.reduce((s, wc) => s + wc.utilization, 0) / workCenters.length;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center mb-4">
        <Button variant="outline" size="sm" className="mr-4" onClick={() => navigate('/manufacturing')}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Back
        </Button>
        <PageHeader title="Capacity Planning" description="Plan and manage production capacity efficiently" voiceIntroduction="Welcome to Capacity Planning." />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4"><div className="text-sm text-muted-foreground">Avg Utilization</div><div className="text-2xl font-bold">{avgUtil.toFixed(1)}%</div><div className="text-sm text-blue-600">Across all centers</div></Card>
        <Card className="p-4"><div className="text-sm text-muted-foreground">Total Available</div><div className="text-2xl font-bold">{workCenters.reduce((s,w) => s+w.availableHours,0)} h</div><div className="text-sm text-green-600">This period</div></Card>
        <Card className="p-4"><div className="text-sm text-muted-foreground">Bottlenecks</div><div className="text-2xl font-bold text-red-600">{workCenters.filter(w => w.overload).length}</div><div className="text-sm text-red-600">Overloaded centers</div></Card>
        <Card className="p-4"><div className="text-sm text-muted-foreground">Underutilized</div><div className="text-2xl font-bold text-yellow-600">{workCenters.filter(w => w.utilization < 60).length}</div><div className="text-sm text-yellow-600">Below 60% capacity</div></Card>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold">Capacity Analysis</h2>
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
            <SelectContent>
              {['current-week','next-week','current-month','next-month'].map(p => <SelectItem key={p} value={p}>{p.replace('-',' ').replace(/\b\w/g,c=>c.toUpperCase())}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={exportPlan}><Download className="h-4 w-4 mr-2" />Export</Button>
          <Button size="sm" onClick={() => setIsLevelingDialogOpen(true)}><Clock className="h-4 w-4 mr-2" />Capacity Leveling</Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="table">Work Centers</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader><CardTitle>Capacity Utilization by Work Center</CardTitle></CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={workCenters.map(wc => ({ name: wc.workCenter, Available: wc.availableHours, Planned: wc.plannedHours }))}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Available" fill="#93c5fd" />
                    <Bar dataKey="Planned" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Utilization Rate (%)</CardTitle></CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={workCenters.map(wc => ({ name: wc.workCenter, Utilization: wc.utilization }))}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 120]} />
                    <Tooltip formatter={(v) => `${v}%`} />
                    <Bar dataKey="Utilization" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="table">
          <Card>
            <CardHeader><CardTitle>Work Center Capacity Details</CardTitle></CardHeader>
            <CardContent>
              <EnhancedDataTable columns={columns} data={workCenters} actions={actions} searchPlaceholder="Search work centers..." exportable refreshable onRefresh={() => {}} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends">
          <Card>
            <CardHeader><CardTitle>Utilization Trend (4 Weeks)</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={320}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis domain={[0, 120]} />
                  <Tooltip formatter={(v) => `${v}%`} />
                  <Legend />
                  <Line type="monotone" dataKey="WC001" stroke="#3b82f6" name="Assembly Line 1" />
                  <Line type="monotone" dataKey="WC002" stroke="#22c55e" name="Assembly Line 2" />
                  <Line type="monotone" dataKey="WC003" stroke="#ef4444" name="Machining Center" />
                  <Line type="monotone" dataKey="WC004" stroke="#f59e0b" name="Testing Station" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Capacity Leveling Dialog */}
      <Dialog open={isLevelingDialogOpen} onOpenChange={setIsLevelingDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Capacity Leveling</DialogTitle></DialogHeader>
          <div className="space-y-4 py-4">
            <p className="text-sm text-muted-foreground">The following work centers are overloaded and will have their load redistributed:</p>
            {workCenters.filter(wc => wc.overload).map(wc => (
              <div key={wc.id} className="flex items-center justify-between border rounded p-3">
                <div>
                  <div className="font-medium">{wc.name}</div>
                  <div className="text-sm text-muted-foreground">{wc.plannedHours}/{wc.availableHours} hrs ({wc.utilization}%)</div>
                </div>
                <AlertTriangle className="h-5 w-5 text-red-500" />
              </div>
            ))}
            {workCenters.filter(wc => wc.overload).length === 0 && (
              <p className="text-green-600 text-sm">No overloaded work centers found. All capacities are within limits.</p>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsLevelingDialogOpen(false)}>Cancel</Button>
            <Button onClick={runCapacityLeveling}>Apply Leveling</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Adjust Capacity Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Adjust Capacity: {selectedWC?.name}</DialogTitle></DialogHeader>
          {selectedWC && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Available Hours</Label>
                <Input type="number" value={selectedWC.availableHours} onChange={e => setSelectedWC(wc => wc ? { ...wc, availableHours: Number(e.target.value) } : wc)} />
              </div>
              <div className="space-y-2">
                <Label>Planned Hours</Label>
                <Input type="number" value={selectedWC.plannedHours} onChange={e => setSelectedWC(wc => wc ? { ...wc, plannedHours: Number(e.target.value) } : wc)} />
              </div>
              <div className="bg-muted p-3 rounded text-sm">
                <strong>Calculated Utilization:</strong> {Math.round(selectedWC.plannedHours / selectedWC.availableHours * 100)}%
                {selectedWC.plannedHours > selectedWC.availableHours && <span className="text-red-500 ml-2">⚠ Overloaded</span>}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveAdjust}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CapacityPlanning;

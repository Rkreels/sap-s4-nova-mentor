
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
import { ArrowLeft, Plus, Eye, Edit, Trash2, DollarSign, Calculator, FileText, CheckCircle, Download } from 'lucide-react';
import PageHeader from '../../components/page/PageHeader';
import { useVoiceAssistantContext } from '../../context/VoiceAssistantContext';
import { useVoiceAssistant } from '../../hooks/useVoiceAssistant';
import EnhancedDataTable, { EnhancedColumn, TableAction } from '../../components/data/EnhancedDataTable';
import { useToast } from '../../hooks/use-toast';

interface PayrollRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  period: string;
  baseSalary: number;
  overtime: number;
  bonus: number;
  grossSalary: number;
  federalTax: number;
  stateTax: number;
  socialSecurity: number;
  healthInsurance: number;
  retirement: number;
  otherDeductions: number;
  totalDeductions: number;
  netSalary: number;
  status: 'Draft' | 'Pending' | 'Approved' | 'Processed' | 'Failed';
  payDate: string;
  bankAccount: string;
}

const calcRecord = (base: number, overtime: number, bonus: number): Partial<PayrollRecord> => {
  const gross = base + overtime + bonus;
  const federalTax = gross * 0.12;
  const stateTax = gross * 0.04;
  const ss = gross * 0.062;
  const health = 250;
  const retirement = gross * 0.05;
  const otherDed = 0;
  const totalDed = federalTax + stateTax + ss + health + retirement + otherDed;
  return { grossSalary: gross, federalTax, stateTax, socialSecurity: ss, healthInsurance: health, retirement, otherDeductions: otherDed, totalDeductions: totalDed, netSalary: gross - totalDed };
};

type PayrollStatus = 'Draft' | 'Pending' | 'Approved' | 'Processed' | 'Failed';

const defaultForm: { employeeId: string; employeeName: string; department: string; period: string; baseSalary: number; overtime: number; bonus: number; status: PayrollStatus; payDate: string; bankAccount: string } = {
  employeeId: '', employeeName: '', department: 'Engineering', period: '2025-01',
  baseSalary: 5000, overtime: 0, bonus: 0, status: 'Draft',
  payDate: '2025-01-31', bankAccount: '',
};

const Payroll: React.FC = () => {
  const navigate = useNavigate();
  const { isEnabled } = useVoiceAssistantContext();
  const { speak } = useVoiceAssistant();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('records');
  const [records, setRecords] = useState<PayrollRecord[]>([
    { id: '1', employeeId: 'EMP-001', employeeName: 'John Smith', department: 'Engineering', period: '2025-01', baseSalary: 7916, overtime: 0, bonus: 500, grossSalary: 8416, federalTax: 1009.92, stateTax: 336.64, socialSecurity: 521.79, healthInsurance: 250, retirement: 420.8, otherDeductions: 0, totalDeductions: 2539.15, netSalary: 5876.85, status: 'Processed', payDate: '2025-01-31', bankAccount: '****4521' },
    { id: '2', employeeId: 'EMP-002', employeeName: 'Sarah Johnson', department: 'Sales', period: '2025-01', baseSalary: 6250, overtime: 750, bonus: 1200, grossSalary: 8200, federalTax: 984, stateTax: 328, socialSecurity: 508.4, healthInsurance: 250, retirement: 410, otherDeductions: 0, totalDeductions: 2480.4, netSalary: 5719.6, status: 'Processed', payDate: '2025-01-31', bankAccount: '****7832' },
    { id: '3', employeeId: 'EMP-003', employeeName: 'Michael Brown', department: 'Finance', period: '2025-01', baseSalary: 5833, overtime: 0, bonus: 0, grossSalary: 5833, federalTax: 699.96, stateTax: 233.32, socialSecurity: 361.65, healthInsurance: 250, retirement: 291.65, otherDeductions: 0, totalDeductions: 1836.58, netSalary: 3996.42, status: 'Pending', payDate: '2025-01-31', bankAccount: '****2134' },
    { id: '4', employeeId: 'EMP-004', employeeName: 'Emily Davis', department: 'HR', period: '2025-01', baseSalary: 4583, overtime: 200, bonus: 0, grossSalary: 4783, federalTax: 573.96, stateTax: 191.32, socialSecurity: 296.55, healthInsurance: 250, retirement: 239.15, otherDeductions: 0, totalDeductions: 1550.98, netSalary: 3232.02, status: 'Draft', payDate: '2025-01-31', bankAccount: '****9876' },
  ]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<PayrollRecord | null>(null);
  const [selectedRecord, setSelectedRecord] = useState<PayrollRecord | null>(null);
  const [form, setForm] = useState(defaultForm);

  React.useEffect(() => {
    if (isEnabled) speak('Welcome to Payroll Management. Process employee salaries, taxes, and benefits calculations.');
  }, [isEnabled, speak]);

  const openCreate = () => {
    setEditingRecord(null);
    setForm(defaultForm);
    setIsDialogOpen(true);
  };

  const openEdit = (r: PayrollRecord) => {
    setEditingRecord(r);
    setForm({ employeeId: r.employeeId, employeeName: r.employeeName, department: r.department, period: r.period, baseSalary: r.baseSalary, overtime: r.overtime, bonus: r.bonus, status: r.status, payDate: r.payDate, bankAccount: r.bankAccount });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!form.employeeName.trim() || !form.employeeId.trim()) {
      toast({ title: 'Validation Error', description: 'Employee ID and Name are required.', variant: 'destructive' });
      return;
    }
    const calcs = calcRecord(form.baseSalary, form.overtime, form.bonus);
    if (editingRecord) {
      const updated = { ...editingRecord, ...form, ...calcs };
      setRecords(prev => prev.map(r => r.id === editingRecord.id ? updated : r));
      toast({ title: 'Record Updated', description: `Payroll for ${form.employeeName} updated.` });
    } else {
      const newRecord: PayrollRecord = { id: String(Date.now()), ...form, ...calcs } as PayrollRecord;
      setRecords(prev => [...prev, newRecord]);
      toast({ title: 'Record Created', description: `Payroll for ${form.employeeName} created.` });
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (r: PayrollRecord) => {
    if (r.status === 'Processed') {
      toast({ title: 'Cannot Delete', description: 'Processed records cannot be deleted.', variant: 'destructive' });
      return;
    }
    setRecords(prev => prev.filter(rec => rec.id !== r.id));
    toast({ title: 'Record Deleted', description: `Payroll for ${r.employeeName} removed.` });
  };

  const handleApprove = (r: PayrollRecord) => {
    setRecords(prev => prev.map(rec => rec.id === r.id ? { ...rec, status: 'Approved' } : rec));
    toast({ title: 'Approved', description: `Payroll for ${r.employeeName} approved.` });
  };

  const handleProcess = (r: PayrollRecord) => {
    setRecords(prev => prev.map(rec => rec.id === r.id ? { ...rec, status: 'Processed' } : rec));
    toast({ title: 'Payroll Processed', description: `Payment of $${r.netSalary.toFixed(2)} processed for ${r.employeeName}.` });
  };

  const processAll = () => {
    const pending = records.filter(r => r.status === 'Approved');
    if (pending.length === 0) {
      toast({ title: 'No Records', description: 'No approved records to process.', variant: 'destructive' });
      return;
    }
    setRecords(prev => prev.map(r => r.status === 'Approved' ? { ...r, status: 'Processed' } : r));
    toast({ title: 'Batch Processed', description: `${pending.length} payroll records processed.` });
  };

  const getStatusColor = (s: string) => {
    const c = { 'Draft': 'bg-gray-100 text-gray-800', 'Pending': 'bg-yellow-100 text-yellow-800', 'Approved': 'bg-blue-100 text-blue-800', 'Processed': 'bg-green-100 text-green-800', 'Failed': 'bg-red-100 text-red-800' };
    return c[s as keyof typeof c] || 'bg-gray-100 text-gray-800';
  };

  const columns: EnhancedColumn[] = [
    { key: 'employeeId', header: 'Emp ID', sortable: true, searchable: true },
    { key: 'employeeName', header: 'Employee', searchable: true },
    { key: 'department', header: 'Department', filterable: true, filterOptions: ['Engineering','Sales','Finance','HR','IT','Operations'].map(v => ({ label: v, value: v })) },
    { key: 'period', header: 'Period', sortable: true },
    { key: 'baseSalary', header: 'Base Salary', sortable: true, render: (v: number) => `$${v.toLocaleString('en-US', { minimumFractionDigits: 2 })}` },
    { key: 'grossSalary', header: 'Gross', sortable: true, render: (v: number) => `$${v.toLocaleString('en-US', { minimumFractionDigits: 2 })}` },
    { key: 'totalDeductions', header: 'Deductions', render: (v: number) => `$${v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` },
    { key: 'netSalary', header: 'Net Pay', sortable: true, render: (v: number) => <span className="font-semibold text-green-700">${v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span> },
    { key: 'status', header: 'Status', filterable: true, filterOptions: ['Draft','Pending','Approved','Processed','Failed'].map(v => ({ label: v, value: v })), render: (v: string) => <Badge className={getStatusColor(v)}>{v}</Badge> },
    { key: 'payDate', header: 'Pay Date', sortable: true },
  ];

  const actions: TableAction[] = [
    { label: 'View', icon: <Eye className="h-4 w-4" />, onClick: (row: PayrollRecord) => { setSelectedRecord(row); setIsViewDialogOpen(true); }, variant: 'ghost' },
    { label: 'Edit', icon: <Edit className="h-4 w-4" />, onClick: openEdit, variant: 'ghost', condition: (row: PayrollRecord) => row.status !== 'Processed' },
    { label: 'Approve', icon: <CheckCircle className="h-4 w-4" />, onClick: handleApprove, variant: 'ghost', condition: (row: PayrollRecord) => ['Draft','Pending'].includes(row.status) },
    { label: 'Process', icon: <DollarSign className="h-4 w-4" />, onClick: handleProcess, variant: 'ghost', condition: (row: PayrollRecord) => row.status === 'Approved' },
    { label: 'Delete', icon: <Trash2 className="h-4 w-4" />, onClick: handleDelete, variant: 'ghost', condition: (row: PayrollRecord) => row.status !== 'Processed' },
  ];

  const totalGross = records.reduce((s, r) => s + r.grossSalary, 0);
  const totalNet = records.reduce((s, r) => s + r.netSalary, 0);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center mb-4">
        <Button variant="outline" size="sm" className="mr-4" onClick={() => navigate('/human-resources')}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Back
        </Button>
        <PageHeader title="Payroll Management" description="Process employee salaries, taxes, and benefits calculations" voiceIntroduction="Welcome to Payroll Management." />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4"><div className="text-sm text-muted-foreground">Total Payroll</div><div className="text-2xl font-bold">${totalGross.toLocaleString()}</div><div className="text-sm text-blue-600">Gross this period</div></Card>
        <Card className="p-4"><div className="text-sm text-muted-foreground">Net Disbursement</div><div className="text-2xl font-bold">${totalNet.toLocaleString('en-US', { maximumFractionDigits: 0 })}</div><div className="text-sm text-green-600">Employee take-home</div></Card>
        <Card className="p-4"><div className="text-sm text-muted-foreground">Processed</div><div className="text-2xl font-bold">{records.filter(r => r.status === 'Processed').length}</div><div className="text-sm text-green-600">This period</div></Card>
        <Card className="p-4"><div className="text-sm text-muted-foreground">Pending</div><div className="text-2xl font-bold">{records.filter(r => ['Draft','Pending'].includes(r.status)).length}</div><div className="text-sm text-yellow-600">Awaiting approval</div></Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="records">Payroll Records</TabsTrigger>
          <TabsTrigger value="summary">Pay Summary</TabsTrigger>
        </TabsList>

        <TabsContent value="records">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                Payroll Records
                <div className="flex gap-2">
                  <Button variant="outline" onClick={processAll}><Calculator className="h-4 w-4 mr-2" />Process All Approved</Button>
                  <Button onClick={openCreate}><Plus className="h-4 w-4 mr-2" />Add Record</Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <EnhancedDataTable columns={columns} data={records} actions={actions} searchPlaceholder="Search payroll records..." exportable refreshable onRefresh={() => {}} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="summary">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader><CardTitle>Deduction Breakdown</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { label: 'Federal Tax', value: records.reduce((s,r) => s+r.federalTax,0) },
                    { label: 'State Tax', value: records.reduce((s,r) => s+r.stateTax,0) },
                    { label: 'Social Security', value: records.reduce((s,r) => s+r.socialSecurity,0) },
                    { label: 'Health Insurance', value: records.reduce((s,r) => s+r.healthInsurance,0) },
                    { label: 'Retirement (401k)', value: records.reduce((s,r) => s+r.retirement,0) },
                  ].map(item => (
                    <div key={item.label} className="flex justify-between">
                      <span className="text-muted-foreground">{item.label}</span>
                      <span className="font-medium">${item.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                  ))}
                  <div className="border-t pt-2 flex justify-between font-semibold">
                    <span>Total Deductions</span>
                    <span>${records.reduce((s,r) => s+r.totalDeductions,0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>By Department</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Array.from(new Set(records.map(r => r.department))).map(dept => {
                    const deptRecords = records.filter(r => r.department === dept);
                    const total = deptRecords.reduce((s, r) => s + r.grossSalary, 0);
                    return (
                      <div key={dept} className="flex justify-between items-center">
                        <div><div className="font-medium">{dept}</div><div className="text-sm text-muted-foreground">{deptRecords.length} employees</div></div>
                        <div className="text-right"><div className="font-semibold">${total.toLocaleString()}</div><div className="text-xs text-muted-foreground">gross</div></div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingRecord ? 'Edit Payroll Record' : 'Add Payroll Record'}</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label>Employee ID *</Label>
              <Input value={form.employeeId} onChange={e => setForm(f => ({ ...f, employeeId: e.target.value }))} placeholder="EMP-001" />
            </div>
            <div className="space-y-2">
              <Label>Employee Name *</Label>
              <Input value={form.employeeName} onChange={e => setForm(f => ({ ...f, employeeName: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label>Department</Label>
              <Select value={form.department} onValueChange={v => setForm(f => ({ ...f, department: v }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{['Engineering','Sales','Finance','HR','IT','Operations','Marketing'].map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Pay Period</Label>
              <Input value={form.period} onChange={e => setForm(f => ({ ...f, period: e.target.value }))} placeholder="2025-01" />
            </div>
            <div className="space-y-2">
              <Label>Base Salary ($)</Label>
              <Input type="number" value={form.baseSalary} onChange={e => setForm(f => ({ ...f, baseSalary: Number(e.target.value) }))} />
            </div>
            <div className="space-y-2">
              <Label>Overtime ($)</Label>
              <Input type="number" value={form.overtime} onChange={e => setForm(f => ({ ...f, overtime: Number(e.target.value) }))} />
            </div>
            <div className="space-y-2">
              <Label>Bonus ($)</Label>
              <Input type="number" value={form.bonus} onChange={e => setForm(f => ({ ...f, bonus: Number(e.target.value) }))} />
            </div>
            <div className="space-y-2">
              <Label>Pay Date</Label>
              <Input type="date" value={form.payDate} onChange={e => setForm(f => ({ ...f, payDate: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label>Bank Account</Label>
              <Input value={form.bankAccount} onChange={e => setForm(f => ({ ...f, bankAccount: e.target.value }))} placeholder="****1234" />
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={form.status} onValueChange={v => setForm(f => ({ ...f, status: v as any }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{['Draft','Pending','Approved'].map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="col-span-2 bg-muted p-3 rounded text-sm">
              <strong>Calculated:</strong> Gross: ${(form.baseSalary + form.overtime + form.bonus).toLocaleString()} | Net: ${((form.baseSalary + form.overtime + form.bonus) * 0.778 - 250).toLocaleString('en-US', { maximumFractionDigits: 0 })} (est.)
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>{editingRecord ? 'Update' : 'Create'} Record</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>Pay Slip: {selectedRecord?.employeeName}</DialogTitle></DialogHeader>
          {selectedRecord && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div><Label>Employee ID</Label><div>{selectedRecord.employeeId}</div></div>
                <div><Label>Department</Label><div>{selectedRecord.department}</div></div>
                <div><Label>Period</Label><div>{selectedRecord.period}</div></div>
                <div><Label>Pay Date</Label><div>{selectedRecord.payDate}</div></div>
              </div>
              <div className="border rounded p-3 space-y-2 text-sm">
                <div className="font-semibold text-muted-foreground mb-1">EARNINGS</div>
                <div className="flex justify-between"><span>Base Salary</span><span>${selectedRecord.baseSalary.toLocaleString()}</span></div>
                <div className="flex justify-between"><span>Overtime</span><span>${selectedRecord.overtime.toLocaleString()}</span></div>
                <div className="flex justify-between"><span>Bonus</span><span>${selectedRecord.bonus.toLocaleString()}</span></div>
                <div className="flex justify-between font-semibold border-t pt-1"><span>Gross Pay</span><span>${selectedRecord.grossSalary.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></div>
              </div>
              <div className="border rounded p-3 space-y-2 text-sm">
                <div className="font-semibold text-muted-foreground mb-1">DEDUCTIONS</div>
                <div className="flex justify-between"><span>Federal Tax</span><span>-${selectedRecord.federalTax.toFixed(2)}</span></div>
                <div className="flex justify-between"><span>State Tax</span><span>-${selectedRecord.stateTax.toFixed(2)}</span></div>
                <div className="flex justify-between"><span>Social Security</span><span>-${selectedRecord.socialSecurity.toFixed(2)}</span></div>
                <div className="flex justify-between"><span>Health Insurance</span><span>-${selectedRecord.healthInsurance.toFixed(2)}</span></div>
                <div className="flex justify-between"><span>Retirement</span><span>-${selectedRecord.retirement.toFixed(2)}</span></div>
                <div className="flex justify-between font-semibold border-t pt-1"><span>Total Deductions</span><span>-${selectedRecord.totalDeductions.toFixed(2)}</span></div>
              </div>
              <div className="bg-green-50 border border-green-200 rounded p-3 flex justify-between items-center">
                <span className="font-bold text-lg">Net Pay</span>
                <span className="font-bold text-xl text-green-700">${selectedRecord.netSalary.toFixed(2)}</span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>Close</Button>
                {selectedRecord.status !== 'Processed' && <Button onClick={() => { openEdit(selectedRecord); setIsViewDialogOpen(false); }}><Edit className="h-4 w-4 mr-2" />Edit</Button>}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Payroll;

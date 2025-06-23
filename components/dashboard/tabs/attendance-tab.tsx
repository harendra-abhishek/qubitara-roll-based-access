"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Clock, CheckCircle, XCircle, AlertCircle, Calendar as CalendarIcon } from 'lucide-react';
import { AttendanceRecord } from '@/types';

const attendanceData: AttendanceRecord[] = [
  {
    id: '1',
    employeeId: '1',
    date: '2024-01-15',
    timeIn: '09:00',
    timeOut: '17:30',
    status: 'present',
    notes: 'On time',
  },
  {
    id: '2',
    employeeId: '2',
    date: '2024-01-15',
    timeIn: '09:15',
    timeOut: '17:45',
    status: 'late',
    notes: 'Traffic delay',
  },
  {
    id: '3',
    employeeId: '3',
    date: '2024-01-15',
    timeIn: '09:00',
    timeOut: '13:00',
    status: 'half-day',
    notes: 'Medical appointment',
  },
  {
    id: '4',
    employeeId: '4',
    date: '2024-01-15',
    timeIn: '',
    timeOut: '',
    status: 'absent',
    notes: 'Sick leave',
  },
  {
    id: '5',
    employeeId: '5',
    date: '2024-01-15',
    timeIn: '08:45',
    timeOut: '17:15',
    status: 'present',
    notes: 'Early arrival',
  },
];

const employees = [
  { id: '1', name: 'John Doe' },
  { id: '2', name: 'Sarah Johnson' },
  { id: '3', name: 'Mike Chen' },
  { id: '4', name: 'Emily Rodriguez' },
  { id: '5', name: 'David Wilson' },
];

const stats = [
  {
    title: 'Present Today',
    value: '1,156',
    percentage: '93.7%',
    icon: CheckCircle,
    color: 'text-green-600',
  },
  {
    title: 'Late Arrivals',
    value: '45',
    percentage: '3.6%',
    icon: AlertCircle,
    color: 'text-yellow-600',
  },
  {
    title: 'Absent',
    value: '33',
    percentage: '2.7%',
    icon: XCircle,
    color: 'text-red-600',
  },
  {
    title: 'Avg Hours',
    value: '8.2',
    percentage: '+0.3',
    icon: Clock,
    color: 'text-blue-600',
  },
];

export function AttendanceTab() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedEmployee, setSelectedEmployee] = useState<string>('all');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'late':
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      case 'absent':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'half-day':
        return <Clock className="h-4 w-4 text-blue-600" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      present: 'default',
      late: 'secondary',
      absent: 'destructive',
      'half-day': 'outline',
    };
    return variants[status as keyof typeof variants] || 'default';
  };

  const getEmployeeName = (employeeId: string) => {
    const employee = employees.find(emp => emp.id === employeeId);
    return employee ? employee.name : 'Unknown';
  };

  const filteredAttendance = attendanceData.filter(record => {
    if (selectedEmployee === 'all') return true;
    return record.employeeId === selectedEmployee;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Attendance Tracking</h2>
          <p className="text-muted-foreground">
            Monitor employee attendance and working hours
          </p>
        </div>
        <Button>
          <CalendarIcon className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className={stat.color}>
                  {stat.percentage}
                </span>
                {' '}of total employees
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid gap-6 md:grid-cols-4">
        {/* Calendar */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
            <CardDescription>
              Select a date to view attendance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        {/* Attendance Records */}
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Daily Attendance</CardTitle>
            <CardDescription>
              Attendance records for {selectedDate?.toDateString() || 'selected date'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Filters */}
              <div className="flex items-center space-x-2">
                <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="All Employees" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Employees</SelectItem>
                    {employees.map((employee) => (
                      <SelectItem key={employee.id} value={employee.id}>
                        {employee.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Attendance Table */}
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Time In</TableHead>
                    <TableHead>Time Out</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAttendance.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(record.status)}
                          <span>{getEmployeeName(record.employeeId)}</span>
                        </div>
                      </TableCell>
                      <TableCell>{record.timeIn || '-'}</TableCell>
                      <TableCell>{record.timeOut || '-'}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadge(record.status)}>
                          {record.status.replace('-', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {record.notes || '-'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
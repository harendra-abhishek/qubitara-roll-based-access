"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
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
import { Search, Download, Filter, AlertTriangle, Info, CheckCircle, XCircle } from 'lucide-react';

const systemLogs = [
  {
    id: '1',
    timestamp: '2024-01-15 10:30:25',
    level: 'info',
    category: 'authentication',
    user: 'sunil@gmail.com',
    action: 'User login successful',
    ipAddress: '192.168.1.100',
    userAgent: 'Chrome 120.0.0.0',
    details: 'Admin user logged in successfully',
  },
  {
    id: '2',
    timestamp: '2024-01-15 10:25:15',
    level: 'warning',
    category: 'security',
    user: 'unknown@example.com',
    action: 'Failed login attempt',
    ipAddress: '203.0.113.45',
    userAgent: 'Chrome 119.0.0.0',
    details: 'Invalid credentials provided',
  },
  {
    id: '3',
    timestamp: '2024-01-15 10:20:10',
    level: 'info',
    category: 'employee',
    user: 'harendra@gmail.com',
    action: 'Employee record updated',
    ipAddress: '192.168.1.101',
    userAgent: 'Firefox 121.0.0.0',
    details: 'Updated employee ID: EMP001 salary information',
  },
  {
    id: '4',
    timestamp: '2024-01-15 10:15:05',
    level: 'error',
    category: 'system',
    user: 'system',
    action: 'Database connection failed',
    ipAddress: 'localhost',
    userAgent: 'System Process',
    details: 'Connection timeout to backup database server',
  },
  {
    id: '5',
    timestamp: '2024-01-15 10:10:00',
    level: 'info',
    category: 'leave',
    user: 'sahil@gmail.com',
    action: 'Leave request submitted',
    ipAddress: '192.168.1.102',
    userAgent: 'Safari 17.0.0.0',
    details: 'Annual leave request for 5 days submitted',
  },
];

const logStats = [
  { level: 'Info', count: 1245, color: 'bg-blue-100 text-blue-800', icon: Info },
  { level: 'Warning', count: 89, color: 'bg-yellow-100 text-yellow-800', icon: AlertTriangle },
  { level: 'Error', count: 23, color: 'bg-red-100 text-red-800', icon: XCircle },
  { level: 'Success', count: 567, color: 'bg-green-100 text-green-800', icon: CheckCircle },
];

export function SystemLogsTab() {
  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const filteredLogs = systemLogs.filter(log => {
    const matchesSearch = log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.details.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = levelFilter === 'all' || log.level === levelFilter;
    const matchesCategory = categoryFilter === 'all' || log.category === categoryFilter;
    
    return matchesSearch && matchesLevel && matchesCategory;
  });

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'info':
        return <Info className="h-4 w-4 text-blue-600" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      default:
        return <Info className="h-4 w-4 text-gray-600" />;
    }
  };

  const getLevelBadge = (level: string) => {
    const variants = {
      info: 'default',
      warning: 'secondary',
      error: 'destructive',
      success: 'default',
    };
    return variants[level as keyof typeof variants] || 'default';
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      authentication: 'bg-purple-100 text-purple-800',
      security: 'bg-red-100 text-red-800',
      employee: 'bg-blue-100 text-blue-800',
      system: 'bg-gray-100 text-gray-800',
      leave: 'bg-green-100 text-green-800',
      payroll: 'bg-yellow-100 text-yellow-800',
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">System Logs</h2>
          <p className="text-muted-foreground">
            Monitor system activities and security events
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Advanced Filters
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export Logs
          </Button>
        </div>
      </div>

      {/* Log Statistics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {logStats.map((stat) => (
          <Card key={stat.level}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.level} Logs</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.count}</div>
              <Badge className={stat.color}>
                Last 24h
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search logs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <Select value={levelFilter} onValueChange={setLevelFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Levels" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="info">Info</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="error">Error</SelectItem>
                <SelectItem value="success">Success</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="authentication">Authentication</SelectItem>
                <SelectItem value="security">Security</SelectItem>
                <SelectItem value="employee">Employee</SelectItem>
                <SelectItem value="system">System</SelectItem>
                <SelectItem value="leave">Leave</SelectItem>
                <SelectItem value="payroll">Payroll</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Logs Table */}
      <Card>
        <CardHeader>
          <CardTitle>System Activity Logs ({filteredLogs.length})</CardTitle>
          <CardDescription>
            Real-time system events and user activities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>Level</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-mono text-sm">
                    {log.timestamp}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getLevelIcon(log.level)}
                      <Badge variant={getLevelBadge(log.level)}>
                        {log.level}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getCategoryColor(log.category)}>
                      {log.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">
                    {log.user}
                  </TableCell>
                  <TableCell>{log.action}</TableCell>
                  <TableCell className="font-mono text-sm">
                    {log.ipAddress}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground max-w-xs truncate">
                    {log.details}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Plus, Building, Users, TrendingUp, Edit, Trash2, Eye } from 'lucide-react';

const departments = [
  {
    id: '1',
    name: 'Engineering',
    description: 'Software development and technical operations',
    manager: 'John Smith',
    managerEmail: 'john.smith@company.com',
    employeeCount: 45,
    budget: 2500000,
    performance: 4.5,
    status: 'active',
    location: 'Building A, Floor 3',
    createdDate: '2023-01-15',
  },
  {
    id: '2',
    name: 'Human Resources',
    description: 'Employee relations and organizational development',
    manager: 'Harendra Singh',
    managerEmail: 'harendra@gmail.com',
    employeeCount: 8,
    budget: 800000,
    performance: 4.6,
    status: 'active',
    location: 'Building B, Floor 1',
    createdDate: '2023-01-15',
  },
  {
    id: '3',
    name: 'Sales',
    description: 'Revenue generation and client relationships',
    manager: 'Sarah Johnson',
    managerEmail: 'sarah.johnson@company.com',
    employeeCount: 28,
    budget: 1800000,
    performance: 4.2,
    status: 'active',
    location: 'Building A, Floor 2',
    createdDate: '2023-02-01',
  },
  {
    id: '4',
    name: 'Marketing',
    description: 'Brand promotion and market research',
    manager: 'Mike Chen',
    managerEmail: 'mike.chen@company.com',
    employeeCount: 18,
    budget: 1200000,
    performance: 4.3,
    status: 'active',
    location: 'Building B, Floor 2',
    createdDate: '2023-02-15',
  },
  {
    id: '5',
    name: 'Finance',
    description: 'Financial planning and accounting operations',
    manager: 'Emily Rodriguez',
    managerEmail: 'emily.rodriguez@company.com',
    employeeCount: 12,
    budget: 900000,
    performance: 4.4,
    status: 'active',
    location: 'Building A, Floor 1',
    createdDate: '2023-03-01',
  },
];

const departmentStats = [
  {
    title: 'Total Departments',
    value: '5',
    change: '+1',
    changeType: 'positive' as const,
    icon: Building,
  },
  {
    title: 'Total Employees',
    value: '111',
    change: '+8',
    changeType: 'positive' as const,
    icon: Users,
  },
  {
    title: 'Avg Performance',
    value: '4.4',
    change: '+0.2',
    changeType: 'positive' as const,
    icon: TrendingUp,
  },
  {
    title: 'Total Budget',
    value: '$7.2M',
    change: '+12%',
    changeType: 'positive' as const,
    icon: Building,
  },
];

export function DepartmentsTab() {
  const [showCreateDepartment, setShowCreateDepartment] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Department Management</h2>
          <p className="text-muted-foreground">
            Manage organizational departments and their structure
          </p>
        </div>
        <Dialog open={showCreateDepartment} onOpenChange={setShowCreateDepartment}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Department
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Create New Department</DialogTitle>
              <DialogDescription>
                Add a new department to your organization
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="dept-name">Department Name</Label>
                <Input id="dept-name" placeholder="Enter department name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dept-description">Description</Label>
                <Textarea id="dept-description" placeholder="Enter department description" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dept-manager">Department Manager</Label>
                  <Input id="dept-manager" placeholder="Manager name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dept-budget">Annual Budget</Label>
                  <Input id="dept-budget" type="number" placeholder="Budget amount" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dept-location">Location</Label>
                <Input id="dept-location" placeholder="Department location" />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowCreateDepartment(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setShowCreateDepartment(false)}>
                  Create Department
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Department Statistics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {departmentStats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className={stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}>
                  {stat.change}
                </span>
                {' '}from last quarter
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Departments Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {departments.map((department) => (
          <Card key={department.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                    <Building className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{department.name}</CardTitle>
                    <Badge variant="default">Active</Badge>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                {department.description}
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="/api/placeholder/24/24" />
                    <AvatarFallback className="text-xs">
                      {department.manager.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{department.manager}</p>
                    <p className="text-xs text-muted-foreground">Department Manager</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Employees</p>
                    <p className="font-medium">{department.employeeCount}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Performance</p>
                    <p className="font-medium">{department.performance}/5.0</p>
                  </div>
                </div>
                
                <div className="text-sm">
                  <p className="text-muted-foreground">Annual Budget</p>
                  <p className="font-medium">{formatCurrency(department.budget)}</p>
                </div>
                
                <div className="text-sm">
                  <p className="text-muted-foreground">Location</p>
                  <p className="font-medium">{department.location}</p>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex-1">
                  View Details
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Manage Team
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
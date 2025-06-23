"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Download, TrendingUp, Users, Clock, DollarSign, Calendar, FileText, BarChart3 } from 'lucide-react';

const reportStats = [
  {
    title: 'Total Reports',
    value: '156',
    change: '+12%',
    changeType: 'positive' as const,
    icon: FileText,
  },
  {
    title: 'Automated Reports',
    value: '89',
    change: '+8%',
    changeType: 'positive' as const,
    icon: BarChart3,
  },
  {
    title: 'Custom Reports',
    value: '67',
    change: '+15%',
    changeType: 'positive' as const,
    icon: TrendingUp,
  },
  {
    title: 'Scheduled Reports',
    value: '23',
    change: '+5%',
    changeType: 'positive' as const,
    icon: Calendar,
  },
];

const monthlyData = [
  { month: 'Jan', employees: 1180, attendance: 95, performance: 4.2 },
  { month: 'Feb', employees: 1200, attendance: 94, performance: 4.3 },
  { month: 'Mar', employees: 1220, attendance: 96, performance: 4.1 },
  { month: 'Apr', employees: 1240, attendance: 93, performance: 4.4 },
  { month: 'May', employees: 1260, attendance: 95, performance: 4.2 },
  { month: 'Jun', employees: 1280, attendance: 97, performance: 4.5 },
];

const departmentPerformance = [
  { department: 'Engineering', performance: 4.5, employees: 45 },
  { department: 'Sales', performance: 4.2, employees: 28 },
  { department: 'Marketing', performance: 4.3, employees: 18 },
  { department: 'HR', performance: 4.6, employees: 8 },
  { department: 'Finance', performance: 4.4, employees: 12 },
];

const leaveDistribution = [
  { type: 'Annual', value: 45, color: '#8884d8' },
  { type: 'Sick', value: 25, color: '#82ca9d' },
  { type: 'Personal', value: 15, color: '#ffc658' },
  { type: 'Maternity', value: 10, color: '#ff7300' },
  { type: 'Emergency', value: 5, color: '#00ff00' },
];

const quickReports = [
  {
    title: 'Employee Attendance Report',
    description: 'Monthly attendance summary with trends',
    lastGenerated: '2024-01-15',
    format: 'PDF',
    status: 'ready',
  },
  {
    title: 'Payroll Summary Report',
    description: 'Detailed payroll breakdown by department',
    lastGenerated: '2024-01-14',
    format: 'Excel',
    status: 'ready',
  },
  {
    title: 'Performance Analytics',
    description: 'Employee performance metrics and insights',
    lastGenerated: '2024-01-13',
    format: 'PDF',
    status: 'generating',
  },
  {
    title: 'Leave Management Report',
    description: 'Leave requests and approval statistics',
    lastGenerated: '2024-01-12',
    format: 'Excel',
    status: 'ready',
  },
];

export function ReportsTab() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Reports & Analytics</h2>
          <p className="text-muted-foreground">
            Comprehensive reporting and data analytics dashboard
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Schedule Report
          </Button>
          <Button>
            <FileText className="mr-2 h-4 w-4" />
            Create Custom Report
          </Button>
        </div>
      </div>

      {/* Report Statistics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {reportStats.map((stat) => (
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
                {' '}from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Monthly Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Trends</CardTitle>
            <CardDescription>
              Employee count and attendance trends over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="employees" stroke="#8884d8" name="Employees" />
                <Line type="monotone" dataKey="attendance" stroke="#82ca9d" name="Attendance %" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Department Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Department Performance</CardTitle>
            <CardDescription>
              Performance ratings by department
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={departmentPerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="department" />
                <YAxis domain={[0, 5]} />
                <Tooltip />
                <Bar dataKey="performance" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Quick Reports */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Quick Reports</CardTitle>
            <CardDescription>
              Pre-configured reports ready for download
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {quickReports.map((report, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium">{report.title}</h4>
                    <p className="text-sm text-muted-foreground">{report.description}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className="text-xs text-muted-foreground">
                        Last generated: {new Date(report.lastGenerated).toLocaleDateString()}
                      </span>
                      <Badge variant="outline">{report.format}</Badge>
                    </div>
                  </div>
                  <div className="ml-4 flex items-center space-x-2">
                    <Badge variant={report.status === 'ready' ? 'default' : 'secondary'}>
                      {report.status}
                    </Badge>
                    {report.status === 'ready' && (
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    )}
                    {report.status === 'generating' && (
                      <div className="flex items-center space-x-2">
                        <Progress value={65} className="w-16" />
                        <span className="text-xs text-muted-foreground">65%</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Leave Distribution */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Leave Distribution</CardTitle>
            <CardDescription>
              Types of leave requests this quarter
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={leaveDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {leaveDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap gap-2 mt-4">
              {leaveDistribution.map((leave) => (
                <div key={leave.type} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: leave.color }}
                  />
                  <span className="text-sm">{leave.type}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
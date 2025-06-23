"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Clock, Calendar, TrendingUp, DollarSign, UserCheck, AlertCircle, Award } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const stats = [
  {
    title: 'Total Employees',
    value: '1,234',
    change: '+12%',
    changeType: 'positive' as const,
    icon: Users,
  },
  {
    title: 'Present Today',
    value: '1,156',
    change: '93.7%',
    changeType: 'positive' as const,
    icon: UserCheck,
  },
  {
    title: 'Pending Leaves',
    value: '28',
    change: '-5%',
    changeType: 'negative' as const,
    icon: Calendar,
  },
  {
    title: 'Avg Performance',
    value: '4.2/5',
    change: '+0.3',
    changeType: 'positive' as const,
    icon: Award,
  },
];

const departmentData = [
  { name: 'Engineering', value: 45, color: '#8884d8' },
  { name: 'Sales', value: 25, color: '#82ca9d' },
  { name: 'Marketing', value: 15, color: '#ffc658' },
  { name: 'HR', value: 8, color: '#ff7300' },
  { name: 'Finance', value: 7, color: '#00ff00' },
];

const attendanceData = [
  { day: 'Mon', present: 1180, absent: 54 },
  { day: 'Tue', present: 1156, absent: 78 },
  { day: 'Wed', present: 1201, absent: 33 },
  { day: 'Thu', present: 1167, absent: 67 },
  { day: 'Fri', present: 1145, absent: 89 },
];

const recentActivities = [
  { type: 'leave', message: 'John Doe applied for annual leave', time: '2 minutes ago' },
  { type: 'employee', message: 'New employee Sarah Johnson joined Engineering', time: '1 hour ago' },
  { type: 'performance', message: 'Q4 performance reviews completed', time: '3 hours ago' },
  { type: 'payroll', message: 'December payroll processed successfully', time: '1 day ago' },
  { type: 'announcement', message: 'Holiday schedule announced for 2024', time: '2 days ago' },
];

const announcements = [
  {
    title: 'Year-End Performance Reviews',
    content: 'All performance reviews must be completed by December 31st.',
    priority: 'high' as const,
    date: '2 days ago',
  },
  {
    title: 'New Health Insurance Policy',
    content: 'Updated health insurance benefits are now available.',
    priority: 'medium' as const,
    date: '1 week ago',
  },
  {
    title: 'Team Building Event',
    content: 'Annual team building event scheduled for January 15th.',
    priority: 'low' as const,
    date: '2 weeks ago',
  },
];

export function OverviewTab() {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
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
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Attendance Chart */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Weekly Attendance</CardTitle>
            <CardDescription>
              Daily attendance overview for the current week
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="present" fill="#8884d8" name="Present" />
                <Bar dataKey="absent" fill="#82ca9d" name="Absent" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Department Distribution */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Department Distribution</CardTitle>
            <CardDescription>
              Employee distribution by department
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {departmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap gap-2 mt-4">
              {departmentData.map((dept) => (
                <div key={dept.name} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: dept.color }}
                  />
                  <span className="text-sm">{dept.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Recent Activities */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>
              Latest activities and updates in the system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    {activity.type === 'leave' && <Calendar className="h-4 w-4 text-blue-500" />}
                    {activity.type === 'employee' && <Users className="h-4 w-4 text-green-500" />}
                    {activity.type === 'performance' && <TrendingUp className="h-4 w-4 text-purple-500" />}
                    {activity.type === 'payroll' && <DollarSign className="h-4 w-4 text-yellow-500" />}
                    {activity.type === 'announcement' && <AlertCircle className="h-4 w-4 text-red-500" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {activity.message}
                    </p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Important Announcements */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Important Announcements</CardTitle>
            <CardDescription>
              Latest company announcements and updates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {announcements.map((announcement, index) => (
                <div key={index} className="border-l-2 border-primary pl-4">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-medium">{announcement.title}</h4>
                    <Badge 
                      variant={announcement.priority === 'high' ? 'destructive' : 
                              announcement.priority === 'medium' ? 'default' : 'secondary'}
                    >
                      {announcement.priority}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    {announcement.content}
                  </p>
                  <p className="text-xs text-muted-foreground">{announcement.date}</p>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Announcements
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
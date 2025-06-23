"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { TrendingUp, Star, Target, Award, Users } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const performanceData = [
  { department: 'Engineering', avgRating: 4.5, employees: 45 },
  { department: 'Sales', avgRating: 4.2, employees: 28 },
  { department: 'Marketing', avgRating: 4.3, employees: 18 },
  { department: 'HR', avgRating: 4.6, employees: 8 },
  { department: 'Finance', avgRating: 4.4, employees: 12 },
];

const topPerformers = [
  { name: 'Sarah Johnson', department: 'Marketing', rating: 4.9, goals: 8, completed: 7 },
  { name: 'Mike Chen', department: 'Engineering', rating: 4.8, goals: 10, completed: 9 },
  { name: 'Emily Rodriguez', department: 'Sales', rating: 4.7, goals: 6, completed: 6 },
  { name: 'David Wilson', department: 'HR', rating: 4.6, goals: 5, completed: 4 },
];

const skillsData = [
  { skill: 'Technical Skills', value: 85 },
  { skill: 'Communication', value: 78 },
  { skill: 'Leadership', value: 72 },
  { skill: 'Problem Solving', value: 88 },
  { skill: 'Teamwork', value: 92 },
  { skill: 'Innovation', value: 68 },
];

const reviewCycles = [
  { id: '1', name: 'Q4 2024 Reviews', status: 'in-progress', completed: 75, total: 100, dueDate: '2024-01-31' },
  { id: '2', name: 'Q3 2024 Reviews', status: 'completed', completed: 98, total: 98, dueDate: '2023-10-31' },
  { id: '3', name: 'Q2 2024 Reviews', status: 'completed', completed: 95, total: 95, dueDate: '2023-07-31' },
];

export function PerformanceTab() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Performance Reviews</h2>
          <p className="text-muted-foreground">
            Track employee performance and manage review cycles
          </p>
        </div>
        <Button>
          <TrendingUp className="mr-2 h-4 w-4" />
          Create Review Cycle
        </Button>
      </div>

      {/* Performance Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Performance</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.4/5</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+0.2</span> from last quarter
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Goals Completed</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+5%</span> from last quarter
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Performers</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              Rating 4.5+ this quarter
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reviews Due</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">25</div>
            <p className="text-xs text-muted-foreground">
              Due within 2 weeks
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Department Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Department Performance</CardTitle>
            <CardDescription>
              Average performance ratings by department
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="department" />
                <YAxis domain={[0, 5]} />
                <Tooltip />
                <Bar dataKey="avgRating" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Skills Assessment */}
        <Card>
          <CardHeader>
            <CardTitle>Team Skills Assessment</CardTitle>
            <CardDescription>
              Average skill ratings across the organization
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={skillsData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="skill" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} />
                <Radar 
                  name="Skills" 
                  dataKey="value" 
                  stroke="#8884d8" 
                  fill="#8884d8" 
                  fillOpacity={0.6} 
                />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Review Cycles */}
      <Card>
        <CardHeader>
          <CardTitle>Review Cycles</CardTitle>
          <CardDescription>
            Manage performance review cycles and track progress
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reviewCycles.map((cycle) => (
              <div key={cycle.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium">{cycle.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    Due: {new Date(cycle.dueDate).toLocaleDateString()}
                  </p>
                  <div className="mt-2 flex items-center space-x-2">
                    <Progress value={(cycle.completed / cycle.total) * 100} className="flex-1" />
                    <span className="text-sm text-muted-foreground">
                      {cycle.completed}/{cycle.total}
                    </span>
                  </div>
                </div>
                <div className="ml-4 flex items-center space-x-2">
                  <Badge variant={cycle.status === 'completed' ? 'default' : 'secondary'}>
                    {cycle.status}
                  </Badge>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Performers */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performers</CardTitle>
          <CardDescription>
            Employees with outstanding performance this quarter
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Goals Progress</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topPerformers.map((performer, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{performer.name}</TableCell>
                  <TableCell>{performer.department}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{performer.rating}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Progress value={(performer.completed / performer.goals) * 100} className="w-16" />
                      <span className="text-sm text-muted-foreground">
                        {performer.completed}/{performer.goals}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">
                      View Review
                    </Button>
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
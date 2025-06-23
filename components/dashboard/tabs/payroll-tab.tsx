"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { DollarSign, TrendingUp, Users, Calculator, Download } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const payrollStats = [
  {
    title: 'Monthly Payroll',
    value: '$1,234,567',
    change: '+3.2%',
    changeType: 'positive' as const,
    icon: DollarSign,
  },
  {
    title: 'Total Employees',
    value: '1,234',
    change: '+12',
    changeType: 'positive' as const,
    icon: Users,
  },
  {
    title: 'Avg Salary',
    value: '$75,450',
    change: '+2.1%',
    changeType: 'positive' as const,
    icon: TrendingUp,
  },
  {
    title: 'Tax Deductions',
    value: '$234,567',
    change: '+1.8%',
    changeType: 'positive' as const,
    icon: Calculator,
  },
];

const salaryDistribution = [
  { range: '$40K-$60K', count: 45, color: '#8884d8' },
  { range: '$60K-$80K', count: 38, color: '#82ca9d' },
  { range: '$80K-$100K', count: 28, color: '#ffc658' },
  { range: '$100K-$120K', count: 15, color: '#ff7300' },
  { range: '$120K+', count: 8, color: '#00ff00' },
];

const monthlyPayroll = [
  { month: 'Jan', amount: 1180000, deductions: 245000 },
  { month: 'Feb', amount: 1156000, deductions: 238000 },
  { month: 'Mar', amount: 1201000, deductions: 252000 },
  { month: 'Apr', amount: 1167000, deductions: 247000 },
  { month: 'May', amount: 1234000, deductions: 260000 },
  { month: 'Jun', amount: 1198000, deductions: 255000 },
];

const recentPayrolls = [
  { id: '1', month: 'December 2024', employees: 1234, grossAmount: 1234567, netAmount: 974567, status: 'paid', date: '2024-01-01' },
  { id: '2', month: 'November 2024', employees: 1220, grossAmount: 1198000, netAmount: 948000, status: 'paid', date: '2023-12-01' },
  { id: '3', month: 'October 2024', employees: 1215, grossAmount: 1156000, netAmount: 920000, status: 'paid', date: '2023-11-01' },
  { id: '4', month: 'September 2024', employees: 1200, grossAmount: 1134000, netAmount: 900000, status: 'paid', date: '2023-10-01' },
];

const deductionBreakdown = [
  { name: 'Federal Tax', value: 35, color: '#8884d8' },
  { name: 'State Tax', value: 15, color: '#82ca9d' },
  { name: 'Social Security', value: 20, color: '#ffc658' },
  { name: 'Health Insurance', value: 18, color: '#ff7300' },
  { name: 'Retirement', value: 12, color: '#00ff00' },
];

export function PayrollTab() {
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
          <h2 className="text-2xl font-bold tracking-tight">Payroll Summary</h2>
          <p className="text-muted-foreground">
            Overview of payroll expenses and employee compensation
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Button>
            <Calculator className="mr-2 h-4 w-4" />
            Process Payroll
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {payrollStats.map((stat) => (
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
        {/* Monthly Payroll Trend */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Monthly Payroll Trend</CardTitle>
            <CardDescription>
              Payroll amounts and deductions over the past 6 months
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyPayroll}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => formatCurrency(value as number)} />
                <Bar dataKey="amount" fill="#8884d8" name="Gross Amount" />
                <Bar dataKey="deductions" fill="#82ca9d" name="Deductions" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Salary Distribution */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Salary Distribution</CardTitle>
            <CardDescription>
              Employee count by salary range
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={salaryDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="count"
                >
                  {salaryDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap gap-2 mt-4">
              {salaryDistribution.map((range) => (
                <div key={range.range} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: range.color }}
                  />
                  <span className="text-sm">{range.range}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Recent Payrolls */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Payrolls</CardTitle>
            <CardDescription>
              Historical payroll records and processing status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Period</TableHead>
                  <TableHead>Employees</TableHead>
                  <TableHead>Gross Amount</TableHead>
                  <TableHead>Net Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentPayrolls.map((payroll) => (
                  <TableRow key={payroll.id}>
                    <TableCell className="font-medium">{payroll.month}</TableCell>
                    <TableCell>{payroll.employees}</TableCell>
                    <TableCell>{formatCurrency(payroll.grossAmount)}</TableCell>
                    <TableCell>{formatCurrency(payroll.netAmount)}</TableCell>
                    <TableCell>
                      <Badge variant="default">
                        {payroll.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(payroll.date).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Deduction Breakdown */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Deduction Breakdown</CardTitle>
            <CardDescription>
              Percentage breakdown of payroll deductions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {deductionBreakdown.map((deduction) => (
                <div key={deduction.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: deduction.color }}
                    />
                    <span className="text-sm font-medium">{deduction.name}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {deduction.value}%
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-muted rounded-lg">
              <div className="text-sm font-medium mb-2">Total Deductions</div>
              <div className="text-2xl font-bold">{formatCurrency(260000)}</div>
              <div className="text-sm text-muted-foreground">21% of gross payroll</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
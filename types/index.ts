export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  position: string;
  status: 'active' | 'inactive';
  joinDate: string;
  avatar?: string;
  salary?: number;
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  date: string;
  timeIn: string;
  timeOut?: string;
  status: 'present' | 'absent' | 'late' | 'half-day';
  notes?: string;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  type: 'annual' | 'sick' | 'personal' | 'maternity' | 'paternity';
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedDate: string;
  approvedBy?: string;
}

export interface PerformanceReview {
  id: string;
  employeeId: string;
  reviewPeriod: string;
  overallRating: number;
  goals: Goal[];
  feedback: string;
  reviewDate: string;
  reviewerId: string;
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  status: 'not-started' | 'in-progress' | 'completed';
  dueDate: string;
  progress: number;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  priority: 'low' | 'medium' | 'high';
  department?: string;
  createdBy: string;
  createdDate: string;
  readBy: string[];
}

export interface PayrollSummary {
  id: string;
  employeeId: string;
  month: string;
  year: number;
  basicSalary: number;
  allowances: number;
  deductions: number;
  netSalary: number;
  paymentDate: string;
  status: 'paid' | 'pending' | 'processing';
}
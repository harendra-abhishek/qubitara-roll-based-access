"use client";

import { useEffect, useState } from 'react';
import { OverviewTab } from './tabs/overview-tab';
import { EmployeesTab } from './tabs/employees-tab';
import { AttendanceTab } from './tabs/attendance-tab';
import { LeaveTab } from './tabs/leave-tab';
import { PerformanceTab } from './tabs/performance-tab';
import { PayrollTab } from './tabs/payroll-tab';
import { AnnouncementsTab } from './tabs/announcements-tab';
import { SettingsTab } from './tabs/settings-tab';
import { UserManagementTab } from './tabs/user-management-tab';
import { SystemLogsTab } from './tabs/system-logs-tab';
import { ReportsTab } from './tabs/reports-tab';
import { DepartmentsTab } from './tabs/departments-tab';

export function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const handleTabChange = (event: any) => {
      setActiveTab(event.detail);
    };

    window.addEventListener('tabChange', handleTabChange);
    return () => window.removeEventListener('tabChange', handleTabChange);
  }, []);

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab />;
      case 'employees':
        return <EmployeesTab />;
      case 'attendance':
        return <AttendanceTab />;
      case 'leave':
        return <LeaveTab />;
      case 'performance':
        return <PerformanceTab />;
      case 'payroll':
        return <PayrollTab />;
      case 'announcements':
        return <AnnouncementsTab />;
      case 'settings':
        return <SettingsTab />;
      // Admin-only tabs
      case 'user-management':
        return <UserManagementTab />;
      case 'system-logs':
        return <SystemLogsTab />;
      case 'reports':
        return <ReportsTab />;
      case 'departments':
        return <DepartmentsTab />;
      case 'policies':
        return <div className="p-8 text-center text-muted-foreground">Policies module coming soon...</div>;
      case 'backup':
        return <div className="p-8 text-center text-muted-foreground">Backup & Restore module coming soon...</div>;
      default:
        return <OverviewTab />;
    }
  };

  return (
    <div className="space-y-6">
      {renderActiveTab()}
    </div>
  );
}
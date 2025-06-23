"use client";

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useSidebar } from '@/contexts/sidebar-context';
import { useAuth } from '@/contexts/auth-context';
import { useTheme } from 'next-themes';
import { canAccessModule } from '@/lib/permissions';
import {
  LayoutDashboard,
  Users,
  Clock,
  Calendar,
  TrendingUp,
  DollarSign,
  Megaphone,
  Settings,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
  Building2,
  UserCog,
  FileText,
  BarChart3,
  Building,
  Shield,
  Database,
} from 'lucide-react';

const navigation = [
  { name: 'Overview', id: 'overview', icon: LayoutDashboard },
  { name: 'Employees', id: 'employees', icon: Users },
  { name: 'Attendance', id: 'attendance', icon: Clock },
  { name: 'Leave Management', id: 'leave', icon: Calendar },
  { name: 'Performance', id: 'performance', icon: TrendingUp },
  { name: 'Payroll', id: 'payroll', icon: DollarSign },
  { name: 'Announcements', id: 'announcements', icon: Megaphone },
  { name: 'Settings', id: 'settings', icon: Settings },
  // Admin-only navigation items
  { name: 'User Management', id: 'user-management', icon: UserCog },
  { name: 'System Logs', id: 'system-logs', icon: FileText },
  { name: 'Reports & Analytics', id: 'reports', icon: BarChart3 },
  { name: 'Departments', id: 'departments', icon: Building },
  { name: 'Policies', id: 'policies', icon: Shield },
  { name: 'Backup & Restore', id: 'backup', icon: Database },
];

export function RoleBasedSidebar() {
  const { isCollapsed, toggleSidebar, isMobile } = useSidebar();
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('overview');

  const handleNavClick = (id: string) => {
    if (!canAccessModule(user, id)) return;
    
    setActiveTab(id);
    window.dispatchEvent(new CustomEvent('tabChange', { detail: id }));
  };

  // Filter navigation based on user permissions
  const filteredNavigation = navigation.filter(item => canAccessModule(user, item.id));

  // Don't render sidebar on mobile - use a different approach
  if (isMobile) {
    return null;
  }

  return (
    <div
      className={cn(
        "fixed left-0 top-0 z-30 h-full bg-card border-r border-border transition-all duration-300 ease-in-out",
        isCollapsed ? "w-16" : "w-72"
      )}
    >
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className={cn(
          "flex h-16 items-center border-b border-border transition-all duration-300",
          isCollapsed ? "justify-center px-2" : "justify-between px-4"
        )}>
          <div className="flex items-center space-x-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Building2 className="h-5 w-5 text-primary-foreground" />
            </div>
            {!isCollapsed && (
              <div className="flex flex-col">
                <span className="text-sm font-semibold">HR Dashboard</span>
                <span className="text-xs text-muted-foreground capitalize">
                  {user?.role} Portal
                </span>
              </div>
            )}
          </div>
          
          {!isCollapsed && (
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleSidebar}
              className="h-8 w-8 p-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Expand Button for Collapsed State */}
        {isCollapsed && (
          <div className="px-2 py-2 border-b border-border">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleSidebar}
              className="h-8 w-8 p-0 mx-auto"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Navigation */}
        <ScrollArea className="flex-1 px-3 py-4">
          <nav className="space-y-2">
            {filteredNavigation.map((item) => {
              const isActive = activeTab === item.id;
              const isAdminOnly = ['user-management', 'system-logs', 'reports', 'departments', 'policies', 'backup'].includes(item.id);
              
              return (
                <Button
                  key={item.name}
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full transition-colors relative group",
                    isCollapsed ? "justify-center px-2 h-10" : "justify-start px-3",
                    isActive && "bg-secondary text-secondary-foreground shadow-sm",
                    isAdminOnly && "border-l-2 border-l-red-500"
                  )}
                  onClick={() => handleNavClick(item.id)}
                >
                  <item.icon className={cn("h-4 w-4", !isCollapsed && "mr-3")} />
                  {!isCollapsed && <span className="truncate">{item.name}</span>}
                  {!isCollapsed && isAdminOnly && (
                    <span className="ml-auto text-xs text-red-500 font-medium">ADMIN</span>
                  )}
                  
                  {/* Tooltip for collapsed state */}
                  {isCollapsed && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-sm rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                      {item.name}
                      {isAdminOnly && <span className="text-red-500 ml-1">(Admin)</span>}
                    </div>
                  )}
                </Button>
              );
            })}
          </nav>
        </ScrollArea>

        {/* Footer */}
        <div className="border-t border-border p-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className={cn(
              "w-full transition-colors relative group",
              isCollapsed ? "justify-center px-2" : "justify-start px-3"
            )}
          >
            {theme === 'dark' ? (
              <Sun className={cn("h-4 w-4", !isCollapsed && "mr-3")} />
            ) : (
              <Moon className={cn("h-4 w-4", !isCollapsed && "mr-3")} />
            )}
            {!isCollapsed && <span>Toggle Theme</span>}
            
            {/* Tooltip for collapsed state */}
            {isCollapsed && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-sm rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                Toggle Theme
              </div>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
"use client";

import { useState, useEffect } from 'react';
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
  X,
  Sun,
  Moon,
  Building2,
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
];

export function MobileNav() {
  const { isCollapsed, toggleSidebar, isMobile } = useSidebar();
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const handleTabChange = (event: any) => {
      setActiveTab(event.detail);
    };

    window.addEventListener('tabChange', handleTabChange);
    return () => window.removeEventListener('tabChange', handleTabChange);
  }, []);

  const handleNavClick = (id: string) => {
    if (!canAccessModule(user, id)) return;
    
    setActiveTab(id);
    toggleSidebar(); // Close mobile nav after selection
    
    // Dispatch custom event to notify dashboard
    window.dispatchEvent(new CustomEvent('tabChange', { detail: id }));
  };

  // Filter navigation based on user permissions
  const filteredNavigation = navigation.filter(item => canAccessModule(user, item.id));

  // Only render on mobile
  if (!isMobile) {
    return null;
  }

  return (
    <>
      {/* Mobile Overlay */}
      {!isCollapsed && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
      
      {/* Mobile Sidebar */}
      <div
        className={cn(
          "fixed left-0 top-0 z-50 h-full w-72 bg-card border-r border-border transition-transform duration-300 ease-in-out lg:hidden",
          isCollapsed ? "-translate-x-full" : "translate-x-0"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex h-16 items-center justify-between px-4 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Building2 className="h-5 w-5 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold">HR Dashboard</span>
                <span className="text-xs text-muted-foreground capitalize">
                  {user?.role} Portal
                </span>
              </div>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleSidebar}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Navigation */}
          <ScrollArea className="flex-1 px-3 py-4">
            <nav className="space-y-2">
              {filteredNavigation.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <Button
                    key={item.name}
                    variant={isActive ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start transition-colors px-3",
                      isActive && "bg-secondary text-secondary-foreground shadow-sm"
                    )}
                    onClick={() => handleNavClick(item.id)}
                  >
                    <item.icon className="h-4 w-4 mr-3" />
                    <span className="truncate">{item.name}</span>
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
              className="w-full justify-start px-3"
            >
              {theme === 'dark' ? (
                <Sun className="h-4 w-4 mr-3" />
              ) : (
                <Moon className="h-4 w-4 mr-3" />
              )}
              <span>Toggle Theme</span>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
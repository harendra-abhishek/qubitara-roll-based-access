"use client";

import { ProtectedRoute } from '@/components/auth/protected-route';
import { RoleBasedSidebar } from '@/components/layout/role-based-sidebar';
import { RoleBasedHeader } from '@/components/layout/role-based-header';
import { Dashboard } from '@/components/dashboard/dashboard';
import { MobileNav } from '@/components/layout/mobile-nav';
import { useSidebar } from '@/contexts/sidebar-context';

function EmployeeLayout() {
  const { isCollapsed, isMobile } = useSidebar();

  return (
    <ProtectedRoute allowedRoles={['employee']}>
      <div className="flex h-screen bg-background">
        <RoleBasedSidebar />
        <MobileNav />
        <div 
          className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ease-in-out ${
            isMobile 
              ? 'lg:ml-0' 
              : isCollapsed 
                ? 'lg:ml-16' 
                : 'lg:ml-72'
          }`}
        >
          <RoleBasedHeader />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background">
            <div className="container mx-auto px-6 py-8 max-w-7xl">
              <Dashboard />
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}

export default EmployeeLayout;
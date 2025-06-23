import { User } from '@/types/auth';

export interface Permission {
  module: string;
  actions: string[];
}

export const ROLE_PERMISSIONS: Record<string, Permission[]> = {
  admin: [
    { module: 'overview', actions: ['read'] },
    { module: 'employees', actions: ['read', 'create', 'update', 'delete'] },
    { module: 'attendance', actions: ['read', 'create', 'update', 'delete'] },
    { module: 'leave', actions: ['read', 'create', 'update', 'delete', 'approve', 'reject'] },
    { module: 'performance', actions: ['read', 'create', 'update', 'delete'] },
    { module: 'payroll', actions: ['read', 'create', 'update', 'delete'] },
    { module: 'announcements', actions: ['read', 'create', 'update', 'delete'] },
    { module: 'settings', actions: ['read', 'update'] },
    // Admin-only modules
    { module: 'user-management', actions: ['read', 'create', 'update', 'delete'] },
    { module: 'system-logs', actions: ['read', 'export'] },
    { module: 'reports', actions: ['read', 'create', 'export'] },
    { module: 'departments', actions: ['read', 'create', 'update', 'delete'] },
    { module: 'policies', actions: ['read', 'create', 'update', 'delete'] },
    { module: 'backup', actions: ['read', 'create', 'restore'] },
  ],
  hr: [
    { module: 'overview', actions: ['read'] },
    { module: 'employees', actions: ['read', 'create', 'update'] },
    { module: 'attendance', actions: ['read', 'update'] },
    { module: 'leave', actions: ['read', 'create', 'update', 'approve', 'reject'] },
    { module: 'performance', actions: ['read', 'create', 'update'] },
    { module: 'payroll', actions: ['read'] },
    { module: 'announcements', actions: ['read', 'create', 'update'] },
    { module: 'settings', actions: ['read'] },
    { module: 'reports', actions: ['read'] },
  ],
  employee: [
    { module: 'overview', actions: ['read'] },
    { module: 'employees', actions: ['read'] },
    { module: 'attendance', actions: ['read'] },
    { module: 'leave', actions: ['read', 'create'] },
    { module: 'performance', actions: ['read'] },
    { module: 'announcements', actions: ['read'] },
  ],
};

export const hasPermission = (user: User | null, module: string, action: string): boolean => {
  if (!user) return false;
  
  const rolePermissions = ROLE_PERMISSIONS[user.role] || [];
  const modulePermission = rolePermissions.find(p => p.module === module);
  
  return modulePermission ? modulePermission.actions.includes(action) : false;
};

export const getAvailableModules = (user: User | null): string[] => {
  if (!user) return [];
  
  const rolePermissions = ROLE_PERMISSIONS[user.role] || [];
  return rolePermissions.map(p => p.module);
};

export const canAccessModule = (user: User | null, module: string): boolean => {
  return hasPermission(user, module, 'read');
};
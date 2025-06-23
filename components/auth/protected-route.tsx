"use client";

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { isAuthenticated, getUserFromCookie } from '@/lib/auth';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      if (isLoading) return;

      // If not authenticated, redirect to login
      if (!isAuthenticated()) {
        router.push('/login');
        return;
      }

      const currentUser = user || getUserFromCookie();
      
      if (!currentUser) {
        router.push('/login');
        return;
      }

      // Check role-based access
      if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
        // Redirect to appropriate dashboard based on user role
        const correctPath = `/${currentUser.role}`;
        if (pathname !== correctPath) {
          router.push(correctPath);
          return;
        }
      }

      setIsChecking(false);
    };

    checkAuth();
  }, [user, isLoading, router, pathname, allowedRoles]);

  if (isLoading || isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
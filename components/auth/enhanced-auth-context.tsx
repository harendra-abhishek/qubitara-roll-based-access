"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { User, AuthContextType } from '@/types/auth';
import { 
  authenticateUser, 
  setAuthCookies, 
  clearAuthCookies, 
  getUserFromCookie, 
  isAuthenticated,
  getRoleBasedRedirectPath 
} from '@/lib/enhanced-auth';
import { toast } from 'sonner';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function EnhancedAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if user is already authenticated on mount
    if (isAuthenticated()) {
      const userData = getUserFromCookie();
      if (userData) {
        setUser(userData);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      const authenticatedUser = await authenticateUser(email, password);
      
      if (authenticatedUser) {
        setUser(authenticatedUser);
        setAuthCookies(authenticatedUser);
        
        toast.success(`Welcome back, ${authenticatedUser.name}!`, {
          description: `Logged in as ${authenticatedUser.role}`,
          duration: 3000,
        });
        
        // Redirect based on role with animation delay
        setTimeout(() => {
          const redirectPath = getRoleBasedRedirectPath(authenticatedUser.role);
          router.push(redirectPath);
        }, 500);
        
        return true;
      } else {
        toast.error('Invalid credentials', {
          description: 'Please check your email and password',
        });
        return false;
      }
    } catch (error) {
      toast.error('Login failed', {
        description: 'Please try again later',
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsSigningOut(true);
    
    // Add delay for smooth animation
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setUser(null);
    clearAuthCookies();
    
    // Clear all local storage
    localStorage.clear();
    sessionStorage.clear();
    
    toast.success('Signed out successfully', {
      description: 'You have been securely logged out',
    });
    
    // Prevent back button access
    window.history.replaceState(null, '', '/login');
    
    router.push('/login');
    setIsSigningOut(false);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isLoading,
      isSigningOut 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an EnhancedAuthProvider');
  }
  return context;
};
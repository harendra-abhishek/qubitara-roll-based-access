import Cookies from 'js-cookie';
import { User } from '@/types/auth';

// Mock user database
const USERS: Record<string, User> = {
  'sunil@gmail.com': {
    id: '1',
    email: 'sunil@gmail.com',
    name: 'Sunil Kumar',
    role: 'admin',
    department: 'Administration',
    position: 'System Administrator',
    avatar: '/api/placeholder/40/40'
  },
  'harendra@gmail.com': {
    id: '2',
    email: 'harendra@gmail.com',
    name: 'Harendra Singh',
    role: 'hr',
    department: 'Human Resources',
    position: 'HR Manager',
    avatar: '/api/placeholder/40/40'
  },
  'sahil@gmail.com': {
    id: '3',
    email: 'sahil@gmail.com',
    name: 'Sahil Sharma',
    role: 'employee',
    department: 'Engineering',
    position: 'Software Developer',
    avatar: '/api/placeholder/40/40'
  }
};

const VALID_PASSWORD = '12345';
const AUTH_COOKIE_NAME = 'hr_auth_token';
const USER_COOKIE_NAME = 'hr_user_data';

export const authenticateUser = async (email: string, password: string): Promise<User | null> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const user = USERS[email];
  if (user && password === VALID_PASSWORD) {
    return user;
  }
  
  return null;
};

export const setAuthCookies = (user: User) => {
  const token = btoa(JSON.stringify({ userId: user.id, timestamp: Date.now() }));
  
  Cookies.set(AUTH_COOKIE_NAME, token, { 
    expires: 7, // 7 days
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  });
  
  Cookies.set(USER_COOKIE_NAME, JSON.stringify(user), { 
    expires: 7,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  });
};

export const getAuthToken = (): string | null => {
  return Cookies.get(AUTH_COOKIE_NAME) || null;
};

export const getUserFromCookie = (): User | null => {
  try {
    const userData = Cookies.get(USER_COOKIE_NAME);
    return userData ? JSON.parse(userData) : null;
  } catch {
    return null;
  }
};

export const clearAuthCookies = () => {
  Cookies.remove(AUTH_COOKIE_NAME);
  Cookies.remove(USER_COOKIE_NAME);
};

export const isAuthenticated = (): boolean => {
  const token = getAuthToken();
  const user = getUserFromCookie();
  
  if (!token || !user) return false;
  
  try {
    const tokenData = JSON.parse(atob(token));
    const isExpired = Date.now() - tokenData.timestamp > 7 * 24 * 60 * 60 * 1000; // 7 days
    return !isExpired;
  } catch {
    return false;
  }
};

export const getRoleBasedRedirectPath = (role: string): string => {
  switch (role) {
    case 'admin':
      return '/admin';
    case 'hr':
      return '/hr';
    case 'employee':
      return '/employee';
    default:
      return '/login';
  }
};
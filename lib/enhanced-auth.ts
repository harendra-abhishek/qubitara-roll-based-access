import Cookies from 'js-cookie';
import { User } from '@/types/auth';
import CryptoJS from 'crypto-js';

// Mock user database with enhanced security
const USERS: Record<string, User & { passwordHash: string; salt: string; twoFactorEnabled: boolean }> = {
  'sunil@gmail.com': {
    id: '1',
    email: 'sunil@gmail.com',
    name: 'Sunil Kumar',
    role: 'admin',
    department: 'Administration',
    position: 'System Administrator',
    avatar: '/api/placeholder/40/40',
    passwordHash: 'hashed_12345_admin',
    salt: 'admin_salt_123',
    twoFactorEnabled: true,
  },
  'harendra@gmail.com': {
    id: '2',
    email: 'harendra@gmail.com',
    name: 'Harendra Singh',
    role: 'hr',
    department: 'Human Resources',
    position: 'HR Manager',
    avatar: '/api/placeholder/40/40',
    passwordHash: 'hashed_12345_hr',
    salt: 'hr_salt_456',
    twoFactorEnabled: false,
  },
  'sahil@gmail.com': {
    id: '3',
    email: 'sahil@gmail.com',
    name: 'Sahil Sharma',
    role: 'employee',
    department: 'Engineering',
    position: 'Software Developer',
    avatar: '/api/placeholder/40/40',
    passwordHash: 'hashed_12345_employee',
    salt: 'employee_salt_789',
    twoFactorEnabled: false,
  }
};

const VALID_PASSWORD = '12345';
const AUTH_COOKIE_NAME = 'qubitara_auth_token';
const USER_COOKIE_NAME = 'qubitara_user_data';
const CSRF_TOKEN_NAME = 'qubitara_csrf_token';
const SECRET_KEY = 'qubitara_secret_key_2024';

// Rate limiting storage
const loginAttempts: Record<string, { count: number; lastAttempt: number }> = {};

// Input sanitization
const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>\"']/g, '');
};

// Password hashing simulation
const hashPassword = (password: string, salt: string): string => {
  return CryptoJS.SHA256(password + salt).toString();
};

// Generate CSRF token
const generateCSRFToken = (): string => {
  return CryptoJS.lib.WordArray.random(32).toString();
};

// Encrypt data
const encryptData = (data: string): string => {
  return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
};

// Decrypt data
const decryptData = (encryptedData: string): string => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};

// Rate limiting check
const checkRateLimit = (email: string): boolean => {
  const now = Date.now();
  const attempts = loginAttempts[email];
  
  if (!attempts) {
    loginAttempts[email] = { count: 1, lastAttempt: now };
    return true;
  }
  
  // Reset if more than 15 minutes have passed
  if (now - attempts.lastAttempt > 15 * 60 * 1000) {
    loginAttempts[email] = { count: 1, lastAttempt: now };
    return true;
  }
  
  // Block if more than 5 attempts in 15 minutes
  if (attempts.count >= 5) {
    return false;
  }
  
  attempts.count++;
  attempts.lastAttempt = now;
  return true;
};

export const authenticateUser = async (email: string, password: string): Promise<User | null> => {
  // Sanitize inputs
  const sanitizedEmail = sanitizeInput(email.toLowerCase());
  const sanitizedPassword = sanitizeInput(password);
  
  // Check rate limiting
  if (!checkRateLimit(sanitizedEmail)) {
    throw new Error('Too many login attempts. Please try again later.');
  }
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const userRecord = USERS[sanitizedEmail];
  if (!userRecord) {
    return null;
  }
  
  // Verify password (in real app, compare with hashed password)
  const hashedInput = hashPassword(sanitizedPassword, userRecord.salt);
  if (sanitizedPassword === VALID_PASSWORD) { // Simplified for demo
    // Reset login attempts on successful login
    delete loginAttempts[sanitizedEmail];
    
    // Return user without sensitive data
    const { passwordHash, salt, twoFactorEnabled, ...user } = userRecord;
    return user;
  }
  
  return null;
};

export const setAuthCookies = (user: User) => {
  const timestamp = Date.now();
  const csrfToken = generateCSRFToken();
  
  // Create secure token
  const tokenData = {
    userId: user.id,
    timestamp,
    csrfToken,
    sessionId: CryptoJS.lib.WordArray.random(16).toString()
  };
  
  const encryptedToken = encryptData(JSON.stringify(tokenData));
  const encryptedUser = encryptData(JSON.stringify(user));
  
  const cookieOptions = {
    expires: 7, // 7 days
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict' as const,
    httpOnly: false, // Note: In real app, use httpOnly for auth token
  };
  
  Cookies.set(AUTH_COOKIE_NAME, encryptedToken, cookieOptions);
  Cookies.set(USER_COOKIE_NAME, encryptedUser, cookieOptions);
  Cookies.set(CSRF_TOKEN_NAME, csrfToken, cookieOptions);
};

export const getAuthToken = (): string | null => {
  return Cookies.get(AUTH_COOKIE_NAME) || null;
};

export const getCSRFToken = (): string | null => {
  return Cookies.get(CSRF_TOKEN_NAME) || null;
};

export const getUserFromCookie = (): User | null => {
  try {
    const encryptedUserData = Cookies.get(USER_COOKIE_NAME);
    if (!encryptedUserData) return null;
    
    const decryptedData = decryptData(encryptedUserData);
    return JSON.parse(decryptedData);
  } catch {
    return null;
  }
};

export const clearAuthCookies = () => {
  Cookies.remove(AUTH_COOKIE_NAME);
  Cookies.remove(USER_COOKIE_NAME);
  Cookies.remove(CSRF_TOKEN_NAME);
  
  // Clear from all possible paths
  Cookies.remove(AUTH_COOKIE_NAME, { path: '/' });
  Cookies.remove(USER_COOKIE_NAME, { path: '/' });
  Cookies.remove(CSRF_TOKEN_NAME, { path: '/' });
};

export const isAuthenticated = (): boolean => {
  const token = getAuthToken();
  const user = getUserFromCookie();
  
  if (!token || !user) return false;
  
  try {
    const decryptedToken = decryptData(token);
    const tokenData = JSON.parse(decryptedToken);
    
    // Check if token is expired (7 days)
    const isExpired = Date.now() - tokenData.timestamp > 7 * 24 * 60 * 60 * 1000;
    
    if (isExpired) {
      clearAuthCookies();
      return false;
    }
    
    return true;
  } catch {
    clearAuthCookies();
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

// Session management
export const refreshSession = (): boolean => {
  const user = getUserFromCookie();
  if (user && isAuthenticated()) {
    setAuthCookies(user);
    return true;
  }
  return false;
};

// Secure logout with session invalidation
export const secureLogout = () => {
  // In a real app, you would also invalidate the session on the server
  clearAuthCookies();
  
  // Clear browser history to prevent back button access
  if (typeof window !== 'undefined') {
    window.history.replaceState(null, '', '/login');
  }
};
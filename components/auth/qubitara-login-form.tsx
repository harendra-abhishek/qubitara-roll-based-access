"use client";

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Shield, 
  AlertCircle, 
  CheckCircle,
  Loader2,
  Wifi,
  WifiOff
} from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { motion, AnimatePresence } from 'framer-motion';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface PasswordStrength {
  score: number;
  label: string;
  color: string;
}

const getPasswordStrength = (password: string): PasswordStrength => {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  const strengthMap = {
    0: { label: 'Very Weak', color: 'bg-red-500' },
    1: { label: 'Weak', color: 'bg-red-400' },
    2: { label: 'Fair', color: 'bg-yellow-500' },
    3: { label: 'Good', color: 'bg-blue-500' },
    4: { label: 'Strong', color: 'bg-green-500' },
    5: { label: 'Very Strong', color: 'bg-green-600' },
  };

  return { score, ...strengthMap[score as keyof typeof strengthMap] };
};

export function QubitaraLoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>({ score: 0, label: '', color: '' });
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const { login, isLoading } = useAuth();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const watchedPassword = watch('password', '');

  useEffect(() => {
    setIsPageLoaded(true);
    
    // Monitor online status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    if (watchedPassword) {
      setPasswordStrength(getPasswordStrength(watchedPassword));
    } else {
      setPasswordStrength({ score: 0, label: '', color: '' });
    }
  }, [watchedPassword]);

  useEffect(() => {
    if (failedAttempts >= 3) {
      setIsRateLimited(true);
      const timer = setTimeout(() => {
        setIsRateLimited(false);
        setFailedAttempts(0);
      }, 300000); // 5 minutes lockout
      
      return () => clearTimeout(timer);
    }
  }, [failedAttempts]);

  const onSubmit = async (data: LoginFormData) => {
    if (isRateLimited) return;
    
    try {
      const success = await login(data.email, data.password);
      
      if (success) {
        // Simulate 2FA requirement for demo
        if (data.email === 'sunil@gmail.com') {
          setShowTwoFactor(true);
          return;
        }
        setFailedAttempts(0);
      } else {
        setFailedAttempts(prev => prev + 1);
      }
    } catch (error) {
      setFailedAttempts(prev => prev + 1);
    }
  };

  const handleTwoFactorSubmit = () => {
    if (twoFactorCode === '123456') {
      setShowTwoFactor(false);
      // Complete login process
    } else {
      // Handle invalid 2FA code
    }
  };

  const fillDemoCredentials = (email: string, password: string) => {
    setValue('email', email);
    setValue('password', password);
  };

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  const cardVariants = {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    hover: { scale: 1.02 }
  };

  return (
    <motion.div 
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-4"
      initial="initial"
      animate={isPageLoaded ? "animate" : "initial"}
      variants={pageVariants}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="w-full max-w-md space-y-6">
        {/* Logo and Header */}
        <motion.div 
          className="text-center space-y-4"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="flex justify-center">
            <motion.img
              src="https://qubitara.com/assets/logo/qubit_2.png"
              alt="Qubitara Logo"
              className="h-16 w-auto"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Welcome to Qubitara
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              Sign in to access your HR portal
            </p>
          </div>
        </motion.div>

        {/* Connection Status */}
        <AnimatePresence>
          {!isOnline && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <Alert className="border-red-200 bg-red-50 dark:bg-red-900/20">
                <WifiOff className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800 dark:text-red-200">
                  No internet connection. Please check your network.
                </AlertDescription>
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Rate Limiting Alert */}
        <AnimatePresence>
          {isRateLimited && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <Alert className="border-red-200 bg-red-50 dark:bg-red-900/20">
                <Shield className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800 dark:text-red-200">
                  Too many failed attempts. Please wait 5 minutes before trying again.
                </AlertDescription>
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Login Form */}
        <motion.div
          variants={cardVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Card className="shadow-2xl border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-2xl font-semibold text-center">Sign In</CardTitle>
              <CardDescription className="text-center">
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <AnimatePresence mode="wait">
                {!showTwoFactor ? (
                  <motion.form 
                    onSubmit={handleSubmit(onSubmit)} 
                    className="space-y-6"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    {/* Email Field */}
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                      <div className="relative group">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          className="pl-10 h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
                          {...register('email')}
                        />
                      </div>
                      {errors.email && (
                        <motion.p 
                          className="text-sm text-red-600 flex items-center gap-1"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          <AlertCircle className="h-3 w-3" />
                          {errors.email.message}
                        </motion.p>
                      )}
                    </div>

                    {/* Password Field */}
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                      <div className="relative group">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                        <Input
                          id="password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Enter your password"
                          className="pl-10 pr-12 h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
                          {...register('password')}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-slate-400" />
                          ) : (
                            <Eye className="h-4 w-4 text-slate-400" />
                          )}
                        </Button>
                      </div>
                      
                      {/* Password Strength Indicator */}
                      {watchedPassword && (
                        <motion.div 
                          className="space-y-2"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                        >
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-slate-600">Password Strength</span>
                            <span className={`font-medium ${
                              passwordStrength.score >= 3 ? 'text-green-600' : 
                              passwordStrength.score >= 2 ? 'text-yellow-600' : 'text-red-600'
                            }`}>
                              {passwordStrength.label}
                            </span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-2">
                            <motion.div
                              className={`h-2 rounded-full ${passwordStrength.color}`}
                              initial={{ width: 0 }}
                              animate={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                              transition={{ duration: 0.3 }}
                            />
                          </div>
                        </motion.div>
                      )}
                      
                      {errors.password && (
                        <motion.p 
                          className="text-sm text-red-600 flex items-center gap-1"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          <AlertCircle className="h-3 w-3" />
                          {errors.password.message}
                        </motion.p>
                      )}
                    </div>

                    {/* Remember Me & Forgot Password */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="rememberMe" {...register('rememberMe')} />
                        <Label htmlFor="rememberMe" className="text-sm text-slate-600 cursor-pointer">
                          Remember me
                        </Label>
                      </div>
                      <Button variant="link" className="text-sm text-blue-600 hover:text-blue-800 p-0">
                        Forgot password?
                      </Button>
                    </div>

                    {/* Sign In Button */}
                    <Button 
                      type="submit" 
                      className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium transition-all duration-200 transform hover:scale-[1.02]" 
                      disabled={isLoading || isRateLimited || !isOnline}
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Signing in...
                        </div>
                      ) : (
                        'Sign In'
                      )}
                    </Button>
                  </motion.form>
                ) : (
                  <motion.div 
                    className="space-y-6"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <div className="text-center space-y-2">
                      <Shield className="h-12 w-12 text-blue-600 mx-auto" />
                      <h3 className="text-lg font-semibold">Two-Factor Authentication</h3>
                      <p className="text-sm text-slate-600">
                        Enter the 6-digit code from your authenticator app
                      </p>
                    </div>
                    
                    <div className="space-y-4">
                      <Input
                        type="text"
                        placeholder="000000"
                        value={twoFactorCode}
                        onChange={(e) => setTwoFactorCode(e.target.value)}
                        className="text-center text-2xl tracking-widest h-12"
                        maxLength={6}
                      />
                      
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          className="flex-1"
                          onClick={() => setShowTwoFactor(false)}
                        >
                          Back
                        </Button>
                        <Button 
                          className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600"
                          onClick={handleTwoFactorSubmit}
                          disabled={twoFactorCode.length !== 6}
                        >
                          Verify
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Demo Credentials */}
              {!showTwoFactor && (
                <motion.div 
                  className="space-y-4 pt-4 border-t border-slate-200"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <p className="text-sm text-slate-600 text-center font-medium">
                    Demo Credentials
                  </p>
                  <div className="grid gap-2">
                    {[
                      { role: 'Administrator', email: 'sunil@gmail.com', color: 'from-red-500 to-red-600' },
                      { role: 'HR Manager', email: 'harendra@gmail.com', color: 'from-blue-500 to-blue-600' },
                      { role: 'Employee', email: 'sahil@gmail.com', color: 'from-green-500 to-green-600' },
                    ].map((cred, index) => (
                      <motion.div
                        key={cred.email}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 + index * 0.1 }}
                      >
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left h-auto p-4 hover:bg-slate-50 transition-all duration-200 group"
                          onClick={() => fillDemoCredentials(cred.email, '12345')}
                          type="button"
                        >
                          <div className="flex items-center gap-3 w-full">
                            <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${cred.color}`} />
                            <div className="flex-1">
                              <div className="font-medium text-slate-900 group-hover:text-blue-600 transition-colors">
                                {cred.role}
                              </div>
                              <div className="text-xs text-slate-500">{cred.email}</div>
                            </div>
                            <CheckCircle className="h-4 w-4 text-slate-400 group-hover:text-green-500 transition-colors" />
                          </div>
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Connection Status Indicator */}
        <motion.div 
          className="flex items-center justify-center gap-2 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {isOnline ? (
            <>
              <Wifi className="h-4 w-4 text-green-500" />
              <span className="text-slate-600">Connected</span>
            </>
          ) : (
            <>
              <WifiOff className="h-4 w-4 text-red-500" />
              <span className="text-slate-600">Offline</span>
            </>
          )}
        </motion.div>

        {/* Footer */}
        <motion.p 
          className="text-center text-sm text-slate-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          © 2024 Qubitara. All rights reserved.
        </motion.p>
      </div>
    </motion.div>
  );
}
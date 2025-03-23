"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';

export const SignInForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, error, clearError } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    clearError();

    try {
      await login(email, password);
      router.push('/');
    } catch (err) {
      console.error('Login failed:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 shadow-md rounded-lg p-6 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white text-center mb-6">
        Log in to your account
      </h2>

      {error && (
        <div className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 p-3 rounded-md mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className='space-y-2'>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
          />
        </div>

        <div className='space-y-2'>
          <div className="flex justify-between mb-1">
            <Label htmlFor="password">Password</Label>
            <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400">
              Forgot password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="inline-block h-4 w-4 mr-2 animate-spin rounded-full border-2 border-solid border-current border-r-transparent"></span>
              Logging in...
            </>
          ) : (
            'Log in'
          )}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-slate-600 dark:text-slate-400">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="text-blue-600 hover:text-blue-500 dark:text-blue-400">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}; 
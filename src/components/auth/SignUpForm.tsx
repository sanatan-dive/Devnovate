"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';

export const SignUpForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, error, clearError } = useAuth();
  const router = useRouter();

  const validatePassword = () => {
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return false;
    }
    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePassword()) return;
    
    setIsSubmitting(true);
    clearError();

    try {
      await register(name, email, password);
      router.push('/');
    } catch (err) {
      console.error('Registration failed:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 shadow-md rounded-lg p-6 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white text-center mb-6">
        Create an account
      </h2>

      {error && (
        <div className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 p-3 rounded-md mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className='space-y-2'>
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Enter your full name"
          />
        </div>

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
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Create a password (min. 8 characters)"
          />
        </div>

        <div className='space-y-2'>
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder="Confirm your password"
          />
          {passwordError && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{passwordError}</p>
          )}
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
              Creating account...
            </>
          ) : (
            'Sign up'
          )}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-slate-600 dark:text-slate-400">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-600 hover:text-blue-500 dark:text-blue-400">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}; 
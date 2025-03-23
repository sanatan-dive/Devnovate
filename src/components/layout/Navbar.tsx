"use client";
import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="border-b border-slate-200 bg-white dark:bg-slate-950 dark:border-slate-800">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/" className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Devnovate
          </Link>
          <div className="hidden md:flex space-x-4">
            <Link href="/hackathons" className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">
              Hackathons
            </Link>
            {user && (
              <>
                <Link href="/teams" className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">
                  Teams
                </Link>
                {user.role === 'ADMIN' && (
                  <Link href="/admin" className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">
                    Admin
                  </Link>
                )}
              </>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-3">
          {user ? (
            <>
              <Link href={`/user/${user.id}`} className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">
                {user.name}
              </Link>
              <Button variant="ghost" onClick={() => logout()}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/signin">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link href="/signup">
                <Button variant="primary">Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}; 
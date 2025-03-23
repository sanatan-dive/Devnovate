'use client';

import React from 'react';
import { SignInForm } from '@/components/auth/SignInForm';

export default function SignIn() {
  return (
    <div className="max-w-screen-xl mx-auto py-8 px-4 md:py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Welcome back to Devnovate
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-lg mb-6">
            Log in to your account to join hackathons, form teams, and showcase your projects.
          </p>
          <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
            <h3 className="text-blue-800 dark:text-blue-300 font-medium mb-2">Upcoming Hackathons</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Several exciting hackathons are coming soon. Log in to view details and register!
            </p>
          </div>
        </div>
        <div>
          <SignInForm />
        </div>
      </div>
    </div>
  );
} 
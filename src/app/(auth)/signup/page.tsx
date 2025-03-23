'use client';

import React from 'react';
import { SignUpForm } from '@/components/auth/SignUpForm';

export default function SignUp() {
  return (
    <div className="max-w-screen-xl mx-auto py-8 px-4 md:py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Join the Devnovate Community
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-lg mb-6">
            Create an account to participate in hackathons, collaborate with developers, and showcase your skills.
          </p>
          <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg border border-green-100 dark:border-green-800">
            <h3 className="text-green-800 dark:text-green-300 font-medium mb-2">Why Join Devnovate?</h3>
            <ul className="list-disc pl-5 text-slate-600 dark:text-slate-400 space-y-1">
              <li>Participate in exciting hackathons with global reach</li>
              <li>Connect with talented developers and form teams</li>
              <li>Showcase your projects to the developer community</li>
              <li>Win prizes and get recognized for your innovation</li>
            </ul>
          </div>
        </div>
        <div>
          <SignUpForm />
        </div>
      </div>
    </div>
  );
} 
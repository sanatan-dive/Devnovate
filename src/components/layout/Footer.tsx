import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 py-6">
      <div className="container mx-auto px-4 text-center text-slate-600 dark:text-slate-400">
        <p>© {new Date().getFullYear()} Devnovate. All rights reserved.</p>
      </div>
    </footer>
  );
}; 
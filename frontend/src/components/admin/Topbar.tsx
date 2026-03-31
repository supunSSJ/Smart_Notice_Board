import { Bell, User } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface TopbarProps {
  title?: string;
  breadcrumbs?: { label: string; href?: string }[];
  children?: React.ReactNode;
}

export default function Topbar({ title, breadcrumbs, children }: TopbarProps) {
  return (
    <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200/60 pt-2">
      <div className="flex items-center">
        {title && <h2 className="text-2xl font-extrabold text-blue-900 tracking-tight">{title}</h2>}
        
        {breadcrumbs && (
          <nav className="flex items-center text-sm font-semibold text-slate-500">
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={index}>
                {index > 0 && <span className="mx-3 text-slate-300 font-normal">/</span>}
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-blue-600 hover:underline transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className={index === breadcrumbs.length - 1 ? 'text-blue-700 font-bold' : ''}>
                    {crumb.label}
                  </span>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}
      </div>

      <div className="flex items-center gap-6">
        {children}
        
        <div className="flex items-center gap-5 border-l border-slate-200 pl-6 ml-2">
          <button className="text-slate-400 hover:text-slate-600 relative transition-colors focus:outline-none">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
          </button>
          <button className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 overflow-hidden ring-2 ring-white shadow-sm hover:bg-blue-200 transition-colors focus:outline-none">
             <User className="w-4 h-4 text-blue-600" />
          </button>
        </div>
      </div>
    </div>
  );
}

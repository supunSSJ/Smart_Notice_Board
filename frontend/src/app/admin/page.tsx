'use client';

import Topbar from '@/components/admin/Topbar';
import { Plus, Megaphone, Pin, FileText, AlertTriangle, MoreVertical, QrCode } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div className="p-8 pb-12">
      <Topbar title="Dashboard Overview">
        {/* Quick links hidden per actual design, relies on sidebar */}
      </Topbar>

      {/* Welcome & Global Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h3 className="text-xl font-extrabold text-blue-900 tracking-tight mb-1">Welcome back, Alex</h3>
          <p className="text-sm text-slate-500 font-medium">Manage your digital notice boards and advertisements here.</p>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/admin/advertisements/create" className="px-5 py-2.5 bg-white border border-slate-200 text-blue-700 text-sm font-bold tracking-wide rounded-full shadow-sm hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center gap-2">
            <Plus className="w-4 h-4" />
            ADD AD
          </Link>
          <Link href="/admin/notices/create" className="px-5 py-2.5 bg-[#0047FF] text-white text-sm font-bold tracking-wide rounded-full shadow-md shadow-blue-500/20 hover:bg-blue-700 transition-all flex items-center gap-2">
            <FileText className="w-4 h-4" />
            ADD NOTICE
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        
        {/* Total Notices */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden flex flex-col justify-between">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600"></div>
          <div className="flex justify-between items-start mb-6">
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <span className="bg-emerald-50 text-emerald-600 text-[10px] font-bold px-2.5 py-1 rounded-full">+12%</span>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 mb-1 tracking-wide">Total Notices</p>
            <h4 className="text-3xl font-extrabold text-slate-800 tracking-tight">1,284</h4>
          </div>
        </div>

        {/* Pinned Items */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden flex flex-col justify-between">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-600"></div>
          <div className="flex justify-between items-start mb-6">
            <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
              <Pin className="w-5 h-5" />
            </div>
            <span className="bg-slate-100 text-slate-500 text-[10px] font-bold px-2.5 py-1 rounded-full">Static</span>
          </div>
          <div>
             <p className="text-xs font-bold text-slate-400 mb-1 tracking-wide">Pinned Items</p>
             <h4 className="text-3xl font-extrabold text-slate-800 tracking-tight">42</h4>
          </div>
        </div>

        {/* Active Ads */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden flex flex-col justify-between">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-slate-800"></div>
          <div className="flex justify-between items-start mb-6">
            <div className="w-10 h-10 bg-slate-100 text-slate-600 rounded-xl flex items-center justify-center">
              <Megaphone className="w-5 h-5" />
            </div>
            <span className="bg-red-50 text-red-600 text-[10px] font-bold px-2.5 py-1 rounded-full">Live Now</span>
          </div>
          <div>
             <p className="text-xs font-bold text-slate-400 mb-1 tracking-wide">Active Ads</p>
             <h4 className="text-3xl font-extrabold text-slate-800 tracking-tight">156</h4>
          </div>
        </div>

        {/* Scan Activity */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden flex flex-col justify-between">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-slate-200"></div>
          <div className="flex justify-between items-start mb-6">
            <div className="w-10 h-10 bg-slate-100 text-slate-600 rounded-xl flex items-center justify-center">
              <QrCode className="w-5 h-5" />
            </div>
            <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-2.5 py-1 rounded-full">New</span>
          </div>
          <div>
             <p className="text-xs font-bold text-slate-400 mb-1 tracking-wide">Scan Activity</p>
             <h4 className="text-3xl font-extrabold text-slate-800 tracking-tight">8.4k</h4>
          </div>
        </div>

      </div>

      {/* Recent Notices Table */}
      <div className="bg-white border border-slate-100 shadow-sm rounded-3xl overflow-hidden mb-8">
        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-lg font-extrabold text-blue-900 tracking-tight">Recent Notices</h3>
          <div className="relative w-64">
            <input 
              type="text" 
              placeholder="Search notices..." 
              className="w-full bg-slate-50/50 border border-slate-100 rounded-full py-2.5 pl-4 pr-10 text-sm font-medium focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder-slate-400"
            />
            <svg className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white border-b border-slate-50">
                <th className="px-8 py-5 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Notice Title</th>
                <th className="px-8 py-5 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-5 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Posted Date</th>
                <th className="px-8 py-5 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              
              <tr className="bg-white hover:bg-slate-50/50 transition-colors group">
                <td className="px-8 py-4">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      <Megaphone className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-slate-800 text-sm">Main Entrance Maintenance - Oct 15</span>
                  </div>
                </td>
                <td className="px-8 py-4">
                  <span className="inline-flex bg-emerald-50 text-emerald-600 border border-emerald-100 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">Active</span>
                </td>
                <td className="px-8 py-4 text-sm font-semibold text-slate-500">Oct 12, 2024</td>
                <td className="px-8 py-4 text-right">
                  <button className="text-slate-300 hover:text-slate-600 transition-colors p-2">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </td>
              </tr>

              <tr className="bg-white hover:bg-slate-50/50 transition-colors group">
                <td className="px-8 py-4">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                      <Pin className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-slate-800 text-sm">Holiday Schedule: Community Center</span>
                  </div>
                </td>
                <td className="px-8 py-4">
                  <span className="inline-flex bg-blue-50 text-blue-600 border border-blue-100 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">Pinned</span>
                </td>
                <td className="px-8 py-4 text-sm font-semibold text-slate-500">Oct 10, 2024</td>
                <td className="px-8 py-4 text-right">
                  <button className="text-slate-300 hover:text-slate-600 transition-colors p-2">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </td>
              </tr>

              <tr className="bg-white hover:bg-slate-50/50 transition-colors group">
                <td className="px-8 py-4">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-500 flex items-center justify-center shrink-0">
                      <FileText className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-slate-800 text-sm">Annual Board Meeting Minutes</span>
                  </div>
                </td>
                <td className="px-8 py-4">
                  <span className="inline-flex bg-slate-100 text-slate-500 border border-slate-200 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">Draft</span>
                </td>
                <td className="px-8 py-4 text-sm font-semibold text-slate-500">Oct 08, 2024</td>
                <td className="px-8 py-4 text-right">
                  <button className="text-slate-300 hover:text-slate-600 transition-colors p-2">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </td>
              </tr>

              <tr className="bg-white hover:bg-slate-50/50 transition-colors group">
                <td className="px-8 py-4">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-lg bg-red-50 text-red-500 flex items-center justify-center shrink-0">
                      <AlertTriangle className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-slate-800 text-sm">Emergency: Water Main Repair</span>
                  </div>
                </td>
                <td className="px-8 py-4">
                  <span className="inline-flex bg-red-50 text-red-600 border border-red-100 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">Expired</span>
                </td>
                <td className="px-8 py-4 text-sm font-semibold text-slate-500">Oct 05, 2024</td>
                <td className="px-8 py-4 text-right">
                  <button className="text-slate-300 hover:text-slate-600 transition-colors p-2">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </td>
              </tr>

            </tbody>
          </table>
        </div>
        
        <div className="px-8 py-4 border-t border-slate-100 flex items-center justify-between text-sm">
          <span className="text-slate-400 font-medium">Showing 4 of 1,284 notices</span>
          <div className="flex gap-1">
            <button className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-800 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
            </button>
            <button className="w-8 h-8 rounded-full bg-blue-700 text-white font-bold text-xs flex items-center justify-center">1</button>
            <button className="w-8 h-8 rounded-full hover:bg-slate-100 text-slate-600 font-bold text-xs flex items-center justify-center transition-colors">2</button>
            <button className="w-8 h-8 rounded-full hover:bg-slate-100 text-slate-600 font-bold text-xs flex items-center justify-center transition-colors">3</button>
            <button className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-800 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Insights row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="lg:col-span-2 bg-[#0047FF] rounded-3xl p-8 text-white relative overflow-hidden shadow-lg shadow-blue-500/20">
          <div className="absolute top-0 right-0 bottom-0 w-1/2 opacity-20 pointer-events-none">
            {/* Minimalist QR backdrop decoration */}
            <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full scale-150 origin-bottom-right">
              <path d="M10 10h30v30h-30z m10 10v10h10v-10zM60 10h30v30h-30z m10 10v10h10v-10zM10 60h30v30h-30z m10 10v10h10v-10z" />
              <path d="M60 60h10v10h-10z" />
              <path d="M80 60h10v10h-10z" />
              <path d="M60 80h10v10h-10z" />
            </svg>
          </div>
          <div className="relative z-10 max-w-md">
            <h3 className="text-2xl font-extrabold mb-3 tracking-tight">QR Scan Insights</h3>
            <p className="text-blue-100 text-sm leading-relaxed mb-6 font-medium">
              Your digital notices have received over 8,400 scans this month. Engagement is up 14% compared to September.
            </p>
            <button className="px-5 py-2.5 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/20 text-white text-sm font-bold tracking-wide rounded-full transition-all flex items-center gap-2">
              View Full Report
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </button>
          </div>
        </div>

        <div className="bg-slate-200/50 rounded-3xl p-8 border border-slate-200 flex flex-col justify-center">
          <h3 className="text-xs font-extrabold text-slate-500 uppercase tracking-widest mb-6 border-b border-slate-200/60 pb-4">AD PERFORMANCE</h3>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-end mb-2">
                <span className="text-sm font-bold text-slate-600">Click-through Rate</span>
                <span className="text-lg font-extrabold text-blue-700">3.2%</span>
              </div>
              <div className="w-full h-2 bg-slate-300 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 w-[32%] rounded-full"></div>
              </div>
            </div>
            
            <div className="pt-2">
              <div className="flex justify-between items-end mb-2">
                <span className="text-sm font-bold text-slate-600">Total Impressions</span>
                <span className="text-lg font-extrabold text-slate-800">45.8k</span>
              </div>
              <div className="w-full h-2 bg-slate-300 rounded-full overflow-hidden">
                <div className="h-full bg-amber-700 w-[70%] rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <footer className="w-full py-8 mt-12 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500 font-semibold">
        <div className="font-extrabold text-slate-800 tracking-tight">
           Smart QR Notice Board
        </div>
        <div>
          © 2024 Smart QR Notice Board. All rights reserved.
        </div>
        <div className="flex gap-4">
          <a href="#" className="hover:text-slate-800 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-slate-800 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-slate-800 transition-colors">Contact Support</a>
        </div>
      </footer>
    </div>
  );
}

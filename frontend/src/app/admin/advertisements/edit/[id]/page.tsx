'use client';

import Topbar from '@/components/admin/Topbar';
import { Save, Link as LinkIcon, Calendar, Info, Upload } from 'lucide-react';
import React from 'react';

export default function EditAdvertisement() {
  const breadcrumbs = [
    { label: 'Ads', href: '/admin/advertisements' },
    { label: 'Edit Advertisement' }
  ];

  return (
    <div className="p-8 pb-12 w-full max-w-6xl mx-auto">
      <Topbar breadcrumbs={breadcrumbs} />

      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">Edit Advertisement</h2>
        <p className="text-slate-500 text-sm font-medium">
          Refine your advertising campaign parameters and creative assets.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Form */}
        <div className="lg:col-span-2">
          <form className="space-y-8 bg-white rounded-[2rem] shadow-sm border border-slate-100 p-8 md:p-10">
            
            {/* Ad Title */}
            <div>
              <label className="block text-xs font-extrabold text-slate-800 mb-2">Ad Title</label>
              <input 
                type="text" 
                defaultValue="Summer Mega Sale 2024"
                className="w-full bg-slate-100/70 border-transparent rounded-xl py-3.5 px-5 text-sm font-semibold focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-slate-800"
              />
            </div>

            {/* Target URL */}
            <div>
              <label className="block text-xs font-extrabold text-slate-800 mb-2">Target URL</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <LinkIcon className="w-4 h-4" />
                </div>
                <input 
                  type="url" 
                  defaultValue="https://smartqr.io/deals/summer-sale"
                  className="w-full bg-slate-100/70 border-transparent rounded-xl py-3.5 pl-12 pr-5 text-sm font-semibold focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-slate-800"
                />
              </div>
            </div>

            {/* Position & Status Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-extrabold text-slate-800 mb-2">Ad Position</label>
                <div className="relative">
                  <select className="w-full bg-slate-100/70 border-transparent rounded-xl py-3.5 pl-5 pr-10 text-sm font-semibold focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-slate-800 appearance-none cursor-pointer">
                    <option>Middle Content Feed</option>
                    <option>Top Banner</option>
                    <option>Bottom Floating</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-800 mb-2 invisible">Status</label>
                <div className="flex items-center justify-between py-3.5 px-5 rounded-xl bg-slate-100/70">
                  <span className="text-sm font-semibold text-slate-700">Active Campaign</span>
                  <div className="relative inline-block w-12 h-6 cursor-pointer">
                    <input type="checkbox" className="peer sr-only" id="campaignStatus" defaultChecked />
                    <div className="w-12 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 peer-checked:bg-[#0047FF] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all shadow-sm"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Dates Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-extrabold text-slate-800 mb-2">Start Date</label>
                <div className="relative">
                  <input 
                    type="date" 
                    defaultValue="2024-06-01"
                    className="w-full bg-slate-100/70 border-transparent rounded-xl py-3.5 px-5 pr-10 text-sm font-semibold focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-slate-800 appearance-none [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                  />
                  <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-800 mb-2">End Date</label>
                <div className="relative">
                  <input 
                    type="date" 
                    defaultValue="2024-08-31"
                    className="w-full bg-slate-100/70 border-transparent rounded-xl py-3.5 px-5 pr-10 text-sm font-semibold focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-slate-800 appearance-none [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                  />
                  <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6">
               <button type="button" className="px-6 py-3.5 bg-[#0047FF] text-white text-sm font-bold tracking-wide rounded-full shadow-md shadow-blue-500/20 hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
                  <Save className="w-4 h-4" />
                  SAVE CHANGES
               </button>
               <button type="button" className="px-8 py-3.5 bg-white border border-slate-200 text-slate-600 text-sm font-bold tracking-wide rounded-full shadow-sm hover:bg-slate-50 transition-all">
                  CANCEL
               </button>
            </div>
          </form>
        </div>

        {/* Right Column: Assets & Analytics */}
        <div className="space-y-6">
          
          {/* Ad Creative Card */}
          <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 p-8">
            <h3 className="text-lg font-extrabold text-slate-900 mb-6">Ad Creative</h3>
            
            <div className="relative w-full aspect-[1.9] bg-slate-100 rounded-xl overflow-hidden mb-6 group cursor-pointer border border-slate-200">
              <img src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=1200" alt="Ad Preview" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center">
                 <div className="w-10 h-10 bg-[#0047FF] text-white rounded-lg flex items-center justify-center shadow-lg mb-3">
                   <Upload className="w-5 h-5" />
                 </div>
                 <span className="font-extrabold text-slate-900 text-sm">Change Creative</span>
                 <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-1">Recommended 1200×630px</span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-amber-50/80 border-l-4 border-amber-500 rounded-r-xl">
              <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-extrabold text-amber-900 mb-1">Performance Note</h4>
                <p className="text-[11px] font-medium text-amber-800 leading-relaxed">
                  Images with high contrast and minimal text perform 40% better on QR-scanned mobile views.
                </p>
              </div>
            </div>
          </div>

          {/* Campaign Analytics Card */}
          <div className="bg-slate-50/50 rounded-[2rem] shadow-sm border border-slate-100 p-8">
            <h3 className="text-sm font-extrabold text-slate-700 tracking-tight mb-6">Campaign Analytics</h3>
            
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-slate-600">Total Impressions</span>
                <span className="text-lg font-extrabold text-slate-900">12,402</span>
              </div>
              
              <div className="pt-4 border-t border-slate-200/60">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-semibold text-slate-600">Click-through Rate</span>
                  <span className="text-lg font-extrabold text-[#0047FF]">3.2%</span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-[#0047FF] w-[32%] rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

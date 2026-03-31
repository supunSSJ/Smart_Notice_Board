'use client';

import Topbar from '@/components/admin/Topbar';
import { Pencil, Lock, Sliders, Moon, Mail, Archive, AlertTriangle, ShieldAlert } from 'lucide-react';
import React from 'react';

export default function AccountSettings() {
  return (
    <div className="p-8 pb-12 w-full max-w-7xl mx-auto">
      <Topbar title="Account Settings" />

      <div className="mb-8">
        <p className="text-slate-500 text-sm font-medium">
          Manage your administrative profile and security preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Profile & Stats */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* User Profile Card */}
          <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 p-8 flex flex-col items-center pt-10 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-[100px] -z-10"></div>
            
            <div className="relative mb-6">
              <div className="w-24 h-24 rounded-full bg-orange-100 border-4 border-white shadow-md overflow-hidden flex items-center justify-center">
                 <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=John&backgroundColor=ffdfbf" alt="Avatar" className="w-full h-full object-cover" />
              </div>
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-[#0047FF] hover:bg-blue-700 text-white rounded-full flex items-center justify-center shadow-md shadow-blue-500/30 transition-colors border-2 border-white">
                <Pencil className="w-3.5 h-3.5" />
              </button>
            </div>

            <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">John Doe</h3>
            <p className="text-sm text-slate-500 font-medium mb-8">john.doe@smartqr.io</p>

            <div className="w-full space-y-4 pt-6 border-t border-slate-100 text-sm">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-slate-400">Role</span>
                <span className="font-extrabold text-blue-700 tracking-wide">Super Admin</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-slate-400">Last Login</span>
                <span className="font-bold text-slate-800">2 hours ago</span>
              </div>
            </div>
          </div>

          {/* Board Statistics Card */}
          <div className="bg-slate-50/50 rounded-[2rem] shadow-sm border border-slate-100 p-8">
            <div className="flex items-center gap-3 mb-6">
               <div className="w-6 h-6 rounded-full bg-blue-700 text-white flex items-center justify-center">
                 <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
               </div>
               <h4 className="text-sm font-extrabold text-slate-800">Board Statistics</h4>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">TOTAL NOTICES</span>
                <span className="text-3xl font-extrabold text-slate-900 tracking-tight">128</span>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">ACTIVE ADS</span>
                <span className="text-3xl font-extrabold text-slate-900 tracking-tight">12</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Settings */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Security & Password Card */}
          <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 p-8 md:p-10">
            <div className="flex items-center gap-4 mb-8">
               <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-sm">
                 <Lock className="w-5 h-5" />
               </div>
               <div>
                 <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">Security & Password</h3>
                 <p className="text-xs font-semibold text-slate-500">Update your login credentials</p>
               </div>
            </div>

            <form className="space-y-6">
              <div>
                <label className="block text-xs font-extrabold text-slate-800 mb-2">Current Password</label>
                <input 
                  type="password" 
                  defaultValue="•••••••••••"
                  className="w-full bg-slate-100/70 border-transparent rounded-xl py-3.5 px-5 text-sm font-extrabold tracking-widest text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder-slate-400"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-extrabold text-slate-800 mb-2">New Password</label>
                  <input 
                    type="password" 
                    placeholder="Minimum 8 characters"
                    className="w-full bg-slate-100/70 border-transparent rounded-xl py-3.5 px-5 text-sm font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder-slate-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-extrabold text-slate-800 mb-2">Confirm New Password</label>
                  <input 
                    type="password" 
                    placeholder="Confirm your password"
                    className="w-full bg-slate-100/70 border-transparent rounded-xl py-3.5 px-5 text-sm font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder-slate-400"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4">
                 <button type="button" className="px-8 py-3.5 bg-[#0047FF] text-white text-sm font-bold tracking-wide rounded-full shadow-md shadow-blue-500/20 hover:bg-blue-700 transition-all">
                    UPDATE PASSWORD
                 </button>
              </div>
            </form>
          </div>

          {/* Board Preferences Card */}
          <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 p-8 md:p-10">
            <div className="flex items-center gap-4 mb-8">
               <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shadow-sm">
                 <Sliders className="w-5 h-5" />
               </div>
               <div>
                 <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">Board Preferences</h3>
                 <p className="text-xs font-semibold text-slate-500">Configure global system behavior</p>
               </div>
            </div>

            <div className="space-y-4">
              {/* Dark Mode */}
              <div className="flex items-center justify-between p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-600 border border-slate-100">
                    <Moon className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-sm font-extrabold text-slate-800">Dark Mode Interface</h5>
                    <p className="text-[10px] font-semibold text-slate-400 mt-0.5">Adjust the dashboard appearance</p>
                  </div>
                </div>
                <div className="relative inline-block w-12 h-6 cursor-pointer">
                  <input type="checkbox" className="peer sr-only" id="darkModeToggle" />
                  <div className="w-12 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 peer-checked:bg-[#0047FF] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all shadow-sm"></div>
                </div>
              </div>

              {/* Email Notifications */}
              <div className="flex items-center justify-between p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-600 border border-slate-100">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-sm font-extrabold text-slate-800">Email Notifications</h5>
                    <p className="text-[10px] font-semibold text-slate-400 mt-0.5">Receive alerts for new notice submissions</p>
                  </div>
                </div>
                <div className="relative inline-block w-12 h-6 cursor-pointer">
                  <input type="checkbox" className="peer sr-only" id="emailNotificationsToggle" defaultChecked />
                  <div className="w-12 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 peer-checked:bg-[#0047FF] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all shadow-sm"></div>
                </div>
              </div>

              {/* Auto-Archive */}
              <div className="flex items-center justify-between p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-600 border border-slate-100">
                    <Archive className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-sm font-extrabold text-slate-800">Auto-Archive Notices</h5>
                    <p className="text-[10px] font-semibold text-slate-400 mt-0.5">Automatically hide notices after 30 days</p>
                  </div>
                </div>
                <div className="relative inline-block w-12 h-6 cursor-pointer">
                  <input type="checkbox" className="peer sr-only" id="autoArchiveToggle" defaultChecked />
                  <div className="w-12 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 peer-checked:bg-[#0047FF] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all shadow-sm"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-red-50/30 rounded-[2rem] border-2 border-red-100 p-8 md:p-10 relative overflow-hidden">
            <h3 className="text-lg font-extrabold text-red-700 tracking-tight mb-3">Danger Zone</h3>
            <p className="text-sm font-medium text-slate-600 mb-8 max-w-xl">
              Once you delete an account or reset the board, there is no going back. Please be certain.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
               <button type="button" className="px-6 py-3 bg-white border border-red-200 text-red-600 text-sm font-bold tracking-wide rounded-full hover:bg-red-50 hover:border-red-300 transition-all text-center">
                  Purge All Notices
               </button>
               <button type="button" className="px-6 py-3 bg-red-700 text-white text-sm font-bold tracking-wide rounded-full shadow-md shadow-red-700/20 hover:bg-red-800 transition-all text-center">
                  Deactivate Account
               </button>
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
        </div>
      </footer>
    </div>
  );
}

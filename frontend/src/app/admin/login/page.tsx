'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import api from '@/lib/api';
import { QrCode, Mail, Eye, EyeOff, ArrowRight, ShieldCheck } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data } = await api.post('/auth/login', { email, password });
      if (data.success) {
        login(data.data.token, data.data);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'A network error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800 font-sans relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-indigo-50 rounded-full blur-3xl opacity-50"></div>
      </div>

      <div className="flex-1 flex items-center justify-center p-4 z-10">
        <div className="w-full max-w-[420px] bg-white rounded-3xl shadow-xl border border-slate-100 p-10">
          
          <div className="flex flex-col items-center mb-10">
            <QrCode className="w-10 h-10 text-blue-700 mb-4" />
            <h2 className="text-2xl font-extrabold text-blue-800 tracking-tight mb-2">Smart QR Notice Board</h2>
            <p className="text-slate-500 font-medium">Admin Authentication</p>
          </div>
          
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm font-medium border border-red-100 flex items-center gap-2">
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path></svg>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full py-3 pl-4 pr-12 bg-slate-100 border-transparent rounded-xl focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all font-medium text-slate-800 placeholder-slate-400"
                  placeholder="admin@noticeboard.com"
                />
                <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Password</label>
                <a href="#" className="text-xs font-bold text-blue-700 hover:text-blue-800 hover:underline">FORGOT?</a>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full py-3 pl-4 pr-12 bg-slate-100 border-transparent rounded-xl focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all font-bold text-slate-800 tracking-wider placeholder-slate-400 placeholder:font-medium placeholder:tracking-normal"
                  placeholder="••••••••"
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 px-4 mt-2 rounded-2xl text-white font-bold tracking-wide transition-all duration-300 flex items-center justify-center gap-2 ${
                loading 
                  ? 'bg-blue-400 cursor-not-allowed' 
                  : 'bg-[#0047FF] hover:bg-blue-700 shadow-lg shadow-blue-600/30'
              }`}
            >
              {loading ? 'AUTHENTICATING...' : 'LOGIN TO DASHBOARD'}
              {!loading && <ArrowRight className="w-5 h-5" />}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            End-To-End Encrypted Session
          </div>
        </div>
      </div>

      <div className="text-center pb-8 z-10 flex gap-6 justify-center">
        <a href="#" className="text-xs font-bold text-slate-500 hover:text-slate-800">Support</a>
        <a href="#" className="text-xs font-bold text-slate-500 hover:text-slate-800">Privacy</a>
        <a href="#" className="text-xs font-bold text-slate-500 hover:text-slate-800">Terms</a>
      </div>

      {/* Very bottom footer for wide screens */}
      <footer className="w-full py-6 px-10 bg-slate-100/50 border-t border-slate-200 mt-auto hidden md:flex justify-between items-center z-10 text-xs text-slate-500 font-medium">
        <div className="font-bold text-slate-800">
          <span className="text-blue-700">Smart QR</span> Notice Board
        </div>
        <div>
          © 2024 Smart QR Notice Board. All rights reserved.
        </div>
        <div className="flex gap-4">
          <a href="#" className="hover:text-slate-800">Privacy Policy</a>
          <a href="#" className="hover:text-slate-800">Terms of Service</a>
          <a href="#" className="hover:text-slate-800">Contact Support</a>
        </div>
      </footer>
    </div>
  );
}

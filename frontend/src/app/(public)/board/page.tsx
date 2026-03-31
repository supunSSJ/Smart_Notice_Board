'use client';

import { useEffect, useState } from 'react';
import NoticeCard from '@/components/public/NoticeCard';
import AdvertisementBanner from '@/components/public/AdvertisementBanner';
import api from '@/lib/api';

export default function PublicBoard() {
  const [notices, setNotices] = useState<any[]>([]);
  const [ads, setAds] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [noticesRes, adsRes] = await Promise.all([
          api.get('/notices/public'),
          api.get('/public/advertisements')
        ]);
        setNotices(noticesRes.data.data);
        setAds(adsRes.data.data);
      } catch (error) {
        console.error('Failed to securely fetch public board data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-slate-50">
        <div className="flex space-x-2">
           <div className="w-4 h-4 rounded-full bg-blue-600 animate-bounce delay-75"></div>
           <div className="w-4 h-4 rounded-full bg-blue-600 animate-bounce delay-150"></div>
           <div className="w-4 h-4 rounded-full bg-blue-600 animate-bounce delay-300"></div>
        </div>
      </div>
    );
  }

  const pinnedNotices = notices.filter(n => n.pinned);
  const regularNotices = notices.filter(n => !n.pinned);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-16">
      
      {/* Mobile-first Header */}
      <header className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white p-5 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.5)] sticky top-0 z-50">
        <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
          <div className="flex flex-col items-center md:items-start">
             <h1 className="text-2xl font-black tracking-tight drop-shadow-sm">Digital Notice Board</h1>
             <p className="text-xs font-semibold text-blue-200 tracking-wider uppercase">Official Live Updates</p>
          </div>
          <div className="bg-white/10 px-4 py-1.5 rounded-full backdrop-blur-sm text-sm font-medium shrink-0 border border-white/10">
            {new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 mt-8">
        
        {/* Ranked Ad Space 1 */}
        {ads.length > 0 && <AdvertisementBanner ad={ads[0]} />}

        {/* Pinned Section */}
        {pinnedNotices.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center tracking-tight">
               <span className="bg-yellow-100 text-yellow-800 p-1.5 rounded-lg mr-2 shadow-sm">📌</span> Pinned Highlights
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pinnedNotices.map(notice => <NoticeCard key={notice._id} notice={notice} />)}
            </div>
          </section>
        )}

        {/* Ranked Ad Space 2 */}
        {ads.length > 1 && <AdvertisementBanner ad={ads[1]} />}

        {/* Regular Notices Stream */}
        <section>
          <div className="flex items-center justify-between mb-6">
             <h2 className="text-xl font-black text-slate-900 tracking-tight">Latest Announcements</h2>
             <span className="text-xs font-bold bg-slate-200 text-slate-600 px-3 py-1 rounded-full">{regularNotices.length} Live</span>
          </div>
          
          {regularNotices.length === 0 && pinnedNotices.length === 0 ? (
            <div className="text-center bg-white p-16 rounded-2xl text-slate-500 border border-dashed border-slate-300 shadow-sm">
              <div className="text-4xl mb-3">📭</div>
              <p className="font-bold text-lg text-slate-700">No active updates to display</p>
              <p className="text-sm mt-1">Please check back later.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {regularNotices.map(notice => <NoticeCard key={notice._id} notice={notice} />)}
            </div>
          )}
        </section>

      </main>
    </div>
  );
}

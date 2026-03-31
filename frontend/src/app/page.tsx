'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Bell, AlertCircle, Info, Star, Calendar } from 'lucide-react';

interface Notice {
  _id: string;
  title: string;
  description: string;
  image?: string;
  category: string;
  priority: number;
  pinned: boolean;
  createdAt: string;
}

interface Advertisement {
  _id: string;
  title: string;
  image: string;
  targetUrl?: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function PublicNoticeBoard() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [ads, setAds] = useState<Advertisement[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentAdIndex, setCurrentAdIndex] = useState(0);

  // Fetch data periodically simulating a live Smart Board
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [noticesRes, adsRes] = await Promise.all([
          axios.get(`${API_URL}/notices/public`),
          axios.get(`${API_URL}/public/advertisements`),
        ]);

        if (noticesRes.data.success) {
          setNotices(noticesRes.data.data);
        }
        if (adsRes.data.success) {
          setAds(adsRes.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch smart board data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // Refresh the board automatically every 60 seconds
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  // Ad Carousel Logic
  useEffect(() => {
    if (ads.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentAdIndex((prev) => (prev + 1) % ads.length);
    }, 10000); // cycle ads every 10 seconds
    return () => clearInterval(timer);
  }, [ads.length]);

  const getNoticeIcon = (priority: number, pinned: boolean) => {
    if (pinned) return <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />;
    if (priority > 0) return <AlertCircle className="w-6 h-6 text-red-500" />;
    return <Bell className="w-6 h-6 text-blue-500" />;
  };

  const currentAd = ads[currentAdIndex];

  return (
    <div className="flex flex-col min-h-screen bg-slate-900 text-slate-100 font-sans overflow-hidden">
      {/* Header */}
      <header className="px-10 py-6 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800 flex justify-between items-center z-20 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-600/20">
            <Info className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Smart Notice Board</h1>
            <p className="text-blue-400 font-medium tracking-wide uppercase text-sm mt-1">Live Announcements</p>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-slate-800/80 px-6 py-3 rounded-full border border-slate-700">
          <Calendar className="w-5 h-5 text-slate-400" />
          <span className="text-lg font-bold text-slate-200 tracking-wider">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
          </span>
        </div>
      </header>

      {/* Main Board Area */}
      <main className="flex-1 flex flex-col lg:flex-row p-6 gap-6 overflow-hidden">

        {/* Left Column - Notices Feed */}
        <section className="flex-[3] flex flex-col bg-slate-800/40 border border-slate-700/50 rounded-3xl backdrop-blur-sm overflow-hidden shadow-2xl relative">
          <div className="px-8 py-5 border-b border-slate-700/50 bg-slate-800/80 flex items-center justify-between sticky top-0 z-10">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <span className="w-2 h-8 bg-blue-500 rounded-full"></span>
              Recent Notices
            </h2>
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-xs font-bold text-green-400 uppercase tracking-widest">Live Connect</span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4 rounded-b-3xl absolute inset-x-0 bottom-0 top-[85px] custom-scrollbar">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : notices.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-slate-500">
                <Bell className="w-16 h-16 mb-4 opacity-20" />
                <p className="text-xl font-medium">No active notices to display.</p>
              </div>
            ) : (
              notices.map((notice) => (
                <div
                  key={notice._id}
                  className={`p-6 rounded-2xl border transition-all duration-500 relative overflow-hidden group hover:shadow-lg ${notice.pinned
                      ? 'bg-gradient-to-r from-blue-900/40 to-indigo-900/40 border-blue-500/30'
                      : notice.priority > 0
                        ? 'bg-red-950/20 border-red-500/20'
                        : 'bg-slate-800/60 border-slate-700/50'
                    }`}
                >
                  {/* Decorative glow */}
                  {notice.pinned && <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl group-hover:bg-blue-500/30 transition-all"></div>}

                  <div className="flex gap-5 relative z-10 w-full">
                    <div className="mt-1 flex-shrink-0">
                      <div className={`p-3 rounded-2xl shadow-inner ${notice.pinned ? 'bg-blue-500/20' : notice.priority > 0 ? 'bg-red-500/20' : 'bg-slate-700/50'
                        }`}>
                        {getNoticeIcon(notice.priority, notice.pinned)}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h3 className="text-xl font-bold text-white tracking-tight leading-snug">{notice.title}</h3>
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap bg-slate-900/50 px-3 py-1 rounded-full border border-slate-700">
                          {new Date(notice.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      {notice.image && (
                        <div className="mb-4 mt-2 rounded-xl overflow-hidden border border-slate-700/50 w-full max-h-48 group-hover:border-slate-500/50 transition-colors">
                          <img src={notice.image} alt={notice.title} className="w-full h-full object-cover" />
                        </div>
                      )}

                      <div className="text-slate-300 font-medium text-base leading-relaxed line-clamp-3" dangerouslySetInnerHTML={{ __html: notice.description }} />

                      <div className="mt-4 flex items-center gap-3">
                        <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${notice.category === 'Academic' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' :
                            notice.category === 'Event' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                              'bg-slate-700/50 text-slate-300 border border-slate-600'
                          }`}>
                          {notice.category || 'General'}
                        </span>
                        {notice.pinned && <span className="text-xs font-bold uppercase tracking-wider text-yellow-500 bg-yellow-500/10 px-3 py-1 rounded-full border border-yellow-500/20">Pinned</span>}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Right Column - Advertisements / Priority Visuals */}
        <section className="flex-[2] flex flex-col gap-6">
          <div className="flex-1 bg-slate-800/40 border border-slate-700/50 rounded-3xl backdrop-blur-sm overflow-hidden shadow-2xl relative flex flex-col">
            <div className="px-6 py-4 border-b border-slate-700/50 bg-slate-800/80 z-10">
              <h2 className="text-lg font-bold text-white flex items-center gap-3">
                <span className="w-2 h-6 bg-purple-500 rounded-full"></span>
                Featured Spotlights
              </h2>
            </div>

            <div className="flex-1 relative bg-black/20 flex items-center justify-center p-6">
              {loading ? (
                <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
              ) : ads.length === 0 ? (
                <div className="text-slate-500 flex flex-col items-center">
                  <Star className="w-12 h-12 mb-3 opacity-20" />
                  <p className="font-medium text-sm text-center px-8">Spotlight space available. Contact admin to feature your event.</p>
                </div>
              ) : (
                <div className="absolute inset-0 w-full h-full transition-opacity duration-1000 p-6 flex flex-col items-center justify-center">
                  {currentAd?.image && (
                    <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-slate-700 bg-black">
                      <img
                        src={currentAd.image}
                        alt={currentAd.title || 'Advertisement'}
                        className="w-full h-full object-contain object-center scale-105"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-8 pt-20">
                        <h3 className="text-2xl font-bold text-white tracking-tight">{currentAd.title}</h3>
                        {currentAd.targetUrl && <p className="text-blue-400 mt-2 font-medium break-all">{currentAd.targetUrl}</p>}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Ad Indicators */}
            {ads.length > 1 && (
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
                {ads.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1.5 rounded-full transition-all duration-500 ${idx === currentAdIndex ? 'w-8 bg-purple-500' : 'w-2 bg-slate-600'}`}
                  ></div>
                ))}
              </div>
            )}
          </div>

          {/* Clock Widget */}
          <div className="h-20 bg-gradient-to-br from-indigo-900/50 to-blue-900/50 border border-indigo-500/30 rounded-3xl backdrop-blur-sm flex items-center justify-center shadow-xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl"></div>

            <ClockWidget />
          </div>
        </section>
      </main>

      <style dangerouslySetInnerHTML={{
        __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(30, 41, 59, 0.5);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(71, 85, 105, 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(99, 102, 241, 0.8);
        }
      `}} />
    </div>
  );
}

// Simple internal clock widget for the board
function ClockWidget() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-center relative z-10 flex items-center justify-center gap-4">
      <div className="text-4xl font-extrabold text-white tracking-tighter drop-shadow-lg tabular-nums">
        {time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}
      </div>
      <div className="flex flex-col text-left">
        <span className="text-sm font-bold text-indigo-300 uppercase tracking-widest leading-none mb-1">Local</span>
        <span className="text-xs font-semibold text-slate-400 leading-none tabular-nums">{time.getSeconds().toString().padStart(2, '0')} sec</span>
      </div>
    </div>
  );
}

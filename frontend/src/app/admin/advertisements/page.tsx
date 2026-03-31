'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import AdvertisementForm from '@/components/admin/AdvertisementForm';

export default function AdvertisementsPage() {
  const [ads, setAds] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState<any>(null);

  const fetchAds = async () => {
    try {
      const { data } = await api.get('/admin/advertisements');
      setAds(data.data);
    } catch (error) {
      console.error('Failed to uniquely load advertisements', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('Permanently delete this advertisement rendering? This action cannot be reversed.')) {
      try {
        await api.delete(`/admin/advertisements/${id}`);
        fetchAds();
      } catch (error) {
        alert('Action Server Failed');
      }
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Promotional Banners</h1>
          <p className="text-sm text-gray-500 font-medium mt-1">Manage promotional images actively stacked natively alongside notices.</p>
        </div>
        {!showForm && (
          <button onClick={() => { setEditData(null); setShowForm(true); }} className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 hover:shadow-lg transition-all tracking-wide active:scale-[0.98]">
            + Upload Banner
          </button>
        )}
      </div>

      {showForm ? (
        <div className="max-w-4xl">
          <AdvertisementForm initialData={editData} onSuccess={() => { setShowForm(false); fetchAds(); }} onCancel={() => setShowForm(false)} />
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden min-h-[400px]">
          {loading ? (
            <div className="flex items-center justify-center p-24 text-gray-400 font-medium animate-pulse space-x-3">
               <div className="w-5 h-5 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div>
               <span>Syncing Assets...</span>
            </div>
          ) : ads.length === 0 ? (
            <div className="p-24 text-center text-gray-500">
              <p className="text-xl font-bold text-gray-800 mb-2">No active ad campaigns</p>
              <p className="text-sm">Click "+ Upload Banner" securely inject an image into the public stack.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left whitespace-nowrap">
                <thead className="bg-slate-50 border-b border-gray-200 text-sm font-semibold text-slate-600 uppercase tracking-wider">
                  <tr>
                    <th className="p-5">Creative Preview</th>
                    <th className="p-5">Target Hyperlink</th>
                    <th className="p-5">Public Status</th>
                    <th className="p-5">Stack Rank</th>
                    <th className="p-5 text-right pr-8">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {ads.map((ad) => (
                    <tr key={ad._id} className="hover:bg-blue-50/50 transition-colors group">
                      <td className="p-5">
                        <div className="flex items-center space-x-4">
                          <img src={ad.image || 'https://via.placeholder.com/50'} alt="Ad" className="w-20 h-12 object-cover rounded shadow-sm border border-gray-200" />
                          <span className="font-bold text-slate-900">{ad.title}</span>
                        </div>
                      </td>
                      <td className="p-5">
                        <a href={ad.targetUrl} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline text-sm font-medium">
                          {ad.targetUrl?.substring(0, 30)}{ad.targetUrl?.length > 30 ? '...' : ''} || 'No Outbound Link'
                        </a>
                      </td>
                      <td className="p-5">
                        <span className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wide border ${ad.active ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-50 text-gray-600 border-gray-200'}`}>
                          {ad.active ? 'Live' : 'Hidden'}
                        </span>
                      </td>
                      <td className="p-5 font-bold text-slate-800">
                         Rank {ad.position}
                      </td>
                      <td className="p-5 text-right pr-8 space-x-4">
                        <button onClick={() => { setEditData(ad); setShowForm(true); }} className="text-blue-600 font-bold hover:text-blue-800 transition">Edit</button>
                        <button onClick={() => handleDelete(ad._id)} className="text-red-500 font-bold hover:text-red-700 transition">Remove</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import NoticeForm from '@/components/admin/NoticeForm';

export default function NoticesPage() {
  const [notices, setNotices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState<any>(null);

  const fetchNotices = async () => {
    try {
      const { data } = await api.get('/notices');
      setNotices(data.data);
    } catch (error) {
      console.error('Failed to uniquely load notices', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('Permanently delete this notice?')) {
      try {
        await api.delete(`/notices/${id}`);
        fetchNotices(); // refresh list natively
      } catch (error) {
        alert('Action Failed');
      }
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Notice Management</h1>
          <p className="text-sm text-gray-500 font-medium mt-1">Create and manage content displayed on the public QR Board.</p>
        </div>
        {!showForm && (
          <button 
            onClick={() => { setEditData(null); setShowForm(true); }}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold tracking-wide hover:bg-blue-700 hover:shadow-lg transition-all active:scale-[0.98]"
          >
            + New Notice
          </button>
        )}
      </div>

      {showForm ? (
        <div className="max-w-4xl">
          <NoticeForm 
            initialData={editData} 
            onSuccess={() => { setShowForm(false); fetchNotices(); }} 
            onCancel={() => setShowForm(false)} 
          />
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-gray-500 font-medium animate-pulse">Synchronizing notices...</div>
          ) : notices.length === 0 ? (
            <div className="p-16 text-center text-gray-500">
              <p className="text-lg font-bold text-gray-700 mb-2">No active notices found</p>
              <p className="text-sm">Click "+ New Notice" to broadcast your first message to the board!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse whitespace-nowrap">
                <thead>
                  <tr className="bg-slate-50 border-b border-gray-200 text-sm font-semibold text-slate-600 uppercase tracking-wider">
                    <th className="p-5">Headline</th>
                    <th className="p-5">Category</th>
                    <th className="p-5">Public Status</th>
                    <th className="p-5">Pinned</th>
                    <th className="p-5 text-right relative pr-8">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {notices.map((notice) => (
                    <tr key={notice._id} className="hover:bg-blue-50/50 transition-colors group">
                      <td className="p-5 font-bold text-slate-900">{notice.title}</td>
                      <td className="p-5">
                        <span className="bg-slate-100 border border-slate-200 text-slate-700 px-3 py-1 rounded-full text-xs font-bold">
                          {notice.category}
                        </span>
                      </td>
                      <td className="p-5">
                        <span className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wide border ${
                          notice.status === 'published' ? 'bg-green-50 text-green-700 border-green-200' : 
                          notice.status === 'draft' ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-gray-50 text-gray-600 border-gray-200'
                        }`}>
                          {notice.status}
                        </span>
                      </td>
                      <td className="p-5">{notice.pinned ? '📌 Active' : <span className="text-gray-400">Standard</span>}</td>
                      <td className="p-5 text-right pr-8 space-x-4">
                        <button onClick={() => { setEditData(notice); setShowForm(true); }} className="text-blue-600 font-bold hover:text-blue-800 transition">Edit</button>
                        <button onClick={() => handleDelete(notice._id)} className="text-red-500 font-bold hover:text-red-700 transition">Arch/Delete</button>
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

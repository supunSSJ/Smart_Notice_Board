'use client';

import { useState } from 'react';
import api from '@/lib/api';

export default function AdvertisementForm({ initialData, onSuccess, onCancel }: any) {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    image: initialData?.image || '', // Placeholder for native Cloudinary Upload Widget component later
    targetUrl: initialData?.targetUrl || '',
    position: initialData?.position || 0,
    active: initialData?.active ?? true,
    startDate: initialData?.startDate ? new Date(initialData.startDate).toISOString().slice(0, 16) : '',
    endDate: initialData?.endDate ? new Date(initialData.endDate).toISOString().slice(0, 16) : '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: any) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const payload = {
      ...formData,
      startDate: formData.startDate ? new Date(formData.startDate).toISOString() : undefined,
      endDate: formData.endDate ? new Date(formData.endDate).toISOString() : undefined,
    };

    try {
      if (initialData?._id) {
        await api.put(`/admin/advertisements/${initialData._id}`, payload);
      } else {
        await api.post('/admin/advertisements', payload);
      }
      onSuccess();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to securely save advertisement');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 ring-1 ring-gray-900/5">
      <h3 className="text-2xl font-extrabold text-gray-900 mb-6">{initialData ? 'Edit Banner Settings' : 'Upload New Ad Banner'}</h3>
      {error && <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 font-medium border border-red-200">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Banner Title</label>
          <input required name="title" value={formData.title} onChange={handleChange} className="w-full p-3 border border-gray-200 bg-gray-50 rounded-lg outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all" placeholder="E.g. Summer Festival Campaign" />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Image URL string (Cloudinary integration pending for Phase 4)</label>
          <input required name="image" value={formData.image} onChange={handleChange} className="w-full p-3 border border-gray-200 bg-gray-50 rounded-lg outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 text-blue-600 transition-all" placeholder="https://res.cloudinary.com/..." />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Target Click URL</label>
          <input type="url" name="targetUrl" value={formData.targetUrl} onChange={handleChange} className="w-full p-3 border border-gray-200 bg-gray-50 rounded-lg outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-blue-600" placeholder="https://example.com/tickets" />
        </div>

        <div className="flex items-center space-x-8 bg-slate-50 p-4 rounded-lg border border-slate-100">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input type="checkbox" name="active" checked={formData.active} onChange={handleChange} className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500" />
            <span className="text-sm font-semibold text-gray-800">Publicly Active Toggle</span>
          </label>
          <div className="flex items-center">
            <label className="text-sm font-semibold text-gray-800 mr-3">Manual Stack Position:</label>
            <input type="number" name="position" value={formData.position} onChange={handleChange} className="w-24 p-2 border border-gray-200 rounded-lg outline-none focus:border-blue-500" min="0" />
          </div>
        </div>

        <div className="flex space-x-4 pt-6 border-t border-gray-100 mt-2">
          <button type="button" onClick={onCancel} className="flex-1 bg-white border border-gray-300 py-3 rounded-xl hover:bg-gray-50 font-bold transition-colors">Cancel Selection</button>
          <button type="submit" disabled={loading} className="flex-1 bg-blue-600 text-white py-3 rounded-xl shadow-md hover:bg-blue-700 font-bold transition-all shadow-blue-500/20 disabled:bg-blue-300 disabled:cursor-wait">
            {loading ? 'Committing...' : 'Deploy Ad Banner'}
          </button>
        </div>
      </form>
    </div>
  );
}

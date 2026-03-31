'use client';

import { useState } from 'react';
import api from '@/lib/api';

interface NoticeFormProps {
  initialData?: any;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function NoticeForm({ initialData, onSuccess, onCancel }: NoticeFormProps) {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    category: initialData?.category || 'General',
    status: initialData?.status || 'draft',
    pinned: initialData?.pinned || false,
    priority: initialData?.priority || 0,
    startDate: initialData?.startDate ? new Date(initialData.startDate).toISOString().slice(0, 16) : '',
    endDate: initialData?.endDate ? new Date(initialData.endDate).toISOString().slice(0, 16) : '',
    image: initialData?.image || '', // Cloudinary upload logic integrated iteratively later
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Safely format dates to complete ISO string or cleanly bypass
    const payload = {
      ...formData,
      startDate: formData.startDate ? new Date(formData.startDate).toISOString() : undefined,
      endDate: formData.endDate ? new Date(formData.endDate).toISOString() : undefined,
    };

    try {
      if (initialData?._id) {
        await api.put(`/notices/${initialData._id}`, payload);
      } else {
        await api.post('/notices', payload);
      }
      onSuccess();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to securely save notice');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 ring-1 ring-gray-900/5">
      <h3 className="text-2xl font-extrabold tracking-tight text-gray-900 mb-6">
        {initialData ? 'Edit Notice' : 'Draft New Notice'}
      </h3>
      
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 text-sm font-medium border border-red-200">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Notice Title</label>
          <input required name="title" value={formData.title} onChange={handleChange} className="w-full p-3 border border-gray-200 bg-gray-50 rounded-lg focus:bg-white focus:ring-4 focus:ring-blue-500/20 outline-none transition-all" placeholder="Enter headline..." />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Content Description</label>
          <textarea required name="description" value={formData.description} onChange={handleChange} rows={5} className="w-full p-3 border border-gray-200 bg-gray-50 rounded-lg focus:bg-white focus:ring-4 focus:ring-blue-500/20 outline-none transition-all" placeholder="Enter notice details..."></textarea>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
            <select name="category" value={formData.category} onChange={handleChange} className="w-full p-3 border border-gray-200 bg-gray-50 rounded-lg outline-none">
              <option value="General">General</option>
              <option value="Event">Event</option>
              <option value="Urgent">Urgent</option>
              <option value="Information">Information</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Visibility Status</label>
            <select name="status" value={formData.status} onChange={handleChange} className="w-full p-3 border border-gray-200 bg-gray-50 rounded-lg outline-none">
              <option value="draft">Draft (Hidden)</option>
              <option value="published">Published (Live)</option>
              <option value="archived">Archived (Ended)</option>
            </select>
          </div>
        </div>

        <div className="flex items-center space-x-8 bg-slate-50 p-4 rounded-lg border border-slate-100">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input type="checkbox" name="pinned" checked={formData.pinned} onChange={handleChange} className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500" />
            <span className="text-sm font-semibold text-gray-800">Pin strictly to Top</span>
          </label>
          <div className="flex items-center space-x-3">
            <label className="text-sm font-semibold text-gray-800">Priority Level:</label>
            <input type="number" name="priority" value={formData.priority} onChange={handleChange} className="w-20 p-2 border border-gray-200 rounded-lg outline-none" min="0" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Auto-Start Date/Time</label>
            <input type="datetime-local" name="startDate" value={formData.startDate} onChange={handleChange} className="w-full p-3 border border-gray-200 bg-gray-50 rounded-lg outline-none" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Auto-End Date/Time</label>
            <input type="datetime-local" name="endDate" value={formData.endDate} onChange={handleChange} className="w-full p-3 border border-gray-200 bg-gray-50 rounded-lg outline-none" />
          </div>
        </div>

        <div className="flex space-x-4 pt-6 border-t border-gray-100">
          <button type="button" onClick={onCancel} className="flex-1 bg-white border border-gray-300 text-gray-700 py-3 rounded-xl hover:bg-gray-50 transition-colors font-bold shadow-sm">
            Cancel
          </button>
          <button type="submit" disabled={loading} className="flex-1 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-colors font-bold shadow-md shadow-blue-500/20">
            {loading ? 'Saving securely...' : 'Save & Deploy'}
          </button>
        </div>
      </form>
    </div>
  );
}

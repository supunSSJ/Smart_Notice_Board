'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Topbar from '@/components/admin/Topbar';
import { Upload, Calendar, Pin, Eye, Image as ImageIcon } from 'lucide-react';
import api from '@/lib/api';

export default function CreateNotice() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'General',
    priority: 0,
    pinned: false,
    status: 'published',
    startDate: '',
    endDate: ''
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let imageUrl = '';

      if (imageFile) {
        const uploadData = new FormData();
        uploadData.append('image', imageFile);

        const uploadRes = await api.post('/upload', uploadData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        
        if (uploadRes.data.success) {
          imageUrl = uploadRes.data.data.url;
        }
      }

      const payload = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        priority: formData.priority,
        pinned: formData.pinned,
        status: formData.status,
        image: imageUrl || '',
        startDate: formData.startDate || undefined,
        endDate: formData.endDate || undefined
      };

      const res = await api.post('/notices', payload);
      
      if (res.data.success) {
        router.push('/admin/notices');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create notice');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 pb-12 w-full max-w-5xl mx-auto">
      <Topbar title="Create New Notice">
        <button 
          onClick={handleSubmit} 
          disabled={loading || !formData.title || !formData.description}
          className="px-5 py-2.5 bg-[#0047FF] disabled:bg-slate-300 text-white text-sm font-bold tracking-wide rounded-full shadow-md shadow-blue-500/20 hover:bg-blue-700 transition-all flex items-center gap-2"
        >
           {loading ? 'SAVING...' : 'SAVE NOTICE'}
        </button>
      </Topbar>

      <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 p-8 md:p-12">
        <div className="mb-10">
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-2">Notice Details</h2>
          <p className="text-slate-500 text-sm font-medium">
            Enter the information for the digital display. Pinned notices will remain at the top of the gallery.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 font-medium text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block text-xs font-extrabold text-slate-800 mb-2">Notice Title</label>
            <input 
              type="text" 
              required
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              placeholder="e.g. Annual Maintenance Schedule" 
              className="w-full bg-slate-100/70 border-transparent rounded-xl py-3.5 px-5 text-sm font-semibold focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder-slate-400 text-slate-800"
            />
          </div>

          <div>
            <label className="block text-xs font-extrabold text-slate-800 mb-2">Category</label>
            <div className="relative">
              <select 
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full bg-slate-100/70 border-transparent rounded-xl py-3.5 pl-5 pr-10 text-sm font-semibold focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-slate-800 appearance-none cursor-pointer"
              >
                <option value="General">General</option>
                <option value="Event">Event</option>
                <option value="Urgent">Urgent</option>
                <option value="Information">Information</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-extrabold text-slate-800 mb-2">Full Description</label>
            <textarea 
              required
              rows={5}
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Provide all the details for the notice expansion (HTML works)..." 
              className="w-full bg-slate-100/70 border-transparent rounded-xl py-4 px-5 text-sm font-semibold focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder-slate-400 text-slate-800 resize-none"
            ></textarea>
          </div>

          {/* Cover Image Upload */}
          <div>
            <label className="block text-xs font-extrabold text-slate-800 mb-2">Cover Image (Optional)</label>
            <label className="w-full border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50 hover:bg-slate-100/50 hover:border-blue-300 transition-colors cursor-pointer group flex flex-col items-center justify-center p-8 overflow-hidden relative min-h-[200px]">
               <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
               {imagePreview ? (
                 <img src={imagePreview} className="absolute inset-0 w-full h-full object-contain" />
               ) : (
                 <>
                   <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center mb-4 text-blue-600 group-hover:scale-110 group-hover:bg-blue-50 transition-all">
                     <Upload className="w-5 h-5" />
                   </div>
                   <h4 className="text-sm font-extrabold text-slate-800 mb-1">Click to upload or drag and drop</h4>
                   <p className="text-xs font-medium text-slate-400">PNG, JPG or WEBP up to 5MB</p>
                 </>
               )}
            </label>
            {imagePreview && (
              <button type="button" onClick={() => { setImagePreview(null); setImageFile(null); }} className="text-xs text-red-500 font-bold mt-2">Remove Image</button>
            )}
          </div>

          {/* Settings / Dates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-slate-100">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-5 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center">
                    <Pin className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-sm font-extrabold text-slate-800">Pinned Notice</h5>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">PRIORITIZE ON BOARD</p>
                  </div>
                </div>
                <div className="relative inline-block w-12 h-6 cursor-pointer">
                  <input type="checkbox" checked={formData.pinned} onChange={(e) => setFormData({...formData, pinned: e.target.checked})} className="peer sr-only" id="pinnedToggle" />
                  <div className="w-12 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </div>
              </div>

              <div className="flex items-center justify-between p-5 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-red-50 text-red-600 flex items-center justify-center">
                    <Pin className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-sm font-extrabold text-slate-800">High Priority</h5>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">RED HIGHLIGHT</p>
                  </div>
                </div>
                <div className="relative inline-block w-12 h-6 cursor-pointer">
                  <input type="checkbox" checked={formData.priority > 0} onChange={(e) => setFormData({...formData, priority: e.target.checked ? 1 : 0})} className="peer sr-only" id="priorityToggle" />
                  <div className="w-12 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-2">DISPLAY START DATE</label>
                <div className="relative">
                  <input 
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                    className="w-full bg-slate-100/70 border-transparent rounded-xl py-3.5 px-5 pr-10 text-sm font-semibold focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-2">DISPLAY END DATE</label>
                <div className="relative">
                  <input 
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                    className="w-full bg-slate-100/70 border-transparent rounded-xl py-3.5 px-5 pr-10 text-sm font-semibold focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-slate-800"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-8">
             <button type="button" onClick={() => router.push('/admin/notices')} className="px-6 py-3.5 bg-white border border-slate-200 text-slate-600 text-sm font-bold tracking-wide rounded-full shadow-sm hover:bg-slate-50 transition-all">
                CANCEL
             </button>
             <button type="submit" disabled={loading} className="px-8 py-3.5 bg-[#0047FF] text-white text-sm font-bold tracking-wide rounded-full shadow-md shadow-blue-500/20 hover:bg-blue-700 transition-all">
                {loading ? 'SAVING...' : 'SAVE NOTICE'}
             </button>
          </div>
        </form>
      </div>
    </div>
  );
}

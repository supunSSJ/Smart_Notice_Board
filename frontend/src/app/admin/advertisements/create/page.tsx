'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Topbar from '@/components/admin/Topbar';
import { Upload, Calendar, Eye, Image as ImageIcon } from 'lucide-react';
import api from '@/lib/api';

export default function CreateAdvertisement() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    targetUrl: '',
    position: 0,
    active: true,
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

    if (!imageFile) {
      setError('An advertisement image is strictly required.');
      setLoading(false);
      return;
    }

    try {
      // 1. Upload image to Cloudinary
      const uploadData = new FormData();
      uploadData.append('image', imageFile);

      const uploadRes = await api.post('/upload', uploadData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      if (!uploadRes.data.success) {
        throw new Error('Image upload failed');
      }

      // 2. Submit AD to database
      const payload = {
        title: formData.title,
        targetUrl: formData.targetUrl || undefined,
        position: formData.position,
        active: formData.active,
        image: uploadRes.data.data.url,
        startDate: formData.startDate || undefined,
        endDate: formData.endDate || undefined
      };

      const res = await api.post('/admin/advertisements', payload);
      
      if (res.data.success) {
        router.push('/admin/advertisements');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Failed to create advertisement');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 pb-12 w-full max-w-5xl mx-auto">
      <Topbar title="Create New Advertisement">
        <button 
          onClick={handleSubmit} 
          disabled={loading || !formData.title || !imageFile}
          className="px-5 py-2.5 bg-[#0047FF] disabled:bg-slate-300 text-white text-sm font-bold tracking-wide rounded-full shadow-md shadow-blue-500/20 hover:bg-blue-700 transition-all flex items-center gap-2"
        >
           {loading ? 'SAVING...' : 'SAVE ADVERTISEMENT'}
        </button>
      </Topbar>

      <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 p-8 md:p-12">
        <div className="mb-10">
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-2">Advertisement Details</h2>
          <p className="text-slate-500 text-sm font-medium">
            Upload full-screen flyers or banners to display to the public. Image is required.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 font-medium text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-8">
              <div>
                <label className="block text-xs font-extrabold text-slate-800 mb-2">Advertisement Title</label>
                <input 
                  type="text" 
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="e.g. Winter Semester Enrolment" 
                  className="w-full bg-slate-100/70 border-transparent rounded-xl py-3.5 px-5 text-sm font-semibold focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder-slate-400 text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-800 mb-2">Target URL (Optional)</label>
                <input 
                  type="url" 
                  value={formData.targetUrl}
                  onChange={(e) => setFormData({...formData, targetUrl: e.target.value})}
                  placeholder="https://example.com" 
                  className="w-full bg-slate-100/70 border-transparent rounded-xl py-3.5 px-5 text-sm font-semibold focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder-slate-400 text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-800 mb-2">Queue Position</label>
                <input 
                  type="number"
                  min="0"
                  value={formData.position}
                  onChange={(e) => setFormData({...formData, position: parseInt(e.target.value) || 0})}
                  placeholder="0" 
                  className="w-full bg-slate-100/70 border-transparent rounded-xl py-3.5 px-5 text-sm font-semibold focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-slate-800"
                />
              </div>
            </div>

            {/* Flyer Image Upload Required */}
            <div>
              <label className="block text-xs font-extrabold text-slate-800 mb-2">Flyer Image (Required)</label>
              <label className="w-full h-full min-h-[250px] border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50 hover:bg-slate-100/50 hover:border-blue-300 transition-colors cursor-pointer group flex flex-col items-center justify-center p-8 overflow-hidden relative">
                 <input type="file" required accept="image/*" className="hidden" onChange={handleImageChange} />
                 {imagePreview ? (
                   <img src={imagePreview} className="absolute inset-0 w-full h-full object-contain bg-black" />
                 ) : (
                   <>
                     <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center mb-4 text-blue-600 group-hover:scale-110 group-hover:bg-blue-50 transition-all">
                       <Upload className="w-5 h-5" />
                     </div>
                     <h4 className="text-sm font-extrabold text-slate-800 mb-1">Click to upload flyer</h4>
                     <p className="text-xs font-medium text-slate-400">High Resolution PNG or WebP</p>
                   </>
                 )}
              </label>
              {imagePreview && (
                <div className="flex justify-end mt-2">
                   <button type="button" onClick={() => { setImagePreview(null); setImageFile(null); }} className="text-xs text-red-500 font-bold">Remove Image</button>
                </div>
              )}
            </div>
          </div>

          {/* Settings / Dates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-slate-100">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-5 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Eye className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-sm font-extrabold text-slate-800">Active Status</h5>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">VISIBLE IN ROTATION</p>
                  </div>
                </div>
                <div className="relative inline-block w-12 h-6 cursor-pointer">
                  <input type="checkbox" checked={formData.active} onChange={(e) => setFormData({...formData, active: e.target.checked})} className="peer sr-only" id="activeToggle" />
                  <div className="w-12 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all shadow-sm"></div>
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
             <button type="button" onClick={() => router.push('/admin/advertisements')} className="px-6 py-3.5 bg-white border border-slate-200 text-slate-600 text-sm font-bold tracking-wide rounded-full shadow-sm hover:bg-slate-50 transition-all">
                CANCEL
             </button>
             <button type="submit" disabled={loading} className="px-8 py-3.5 bg-[#0047FF] text-white text-sm font-bold tracking-wide rounded-full shadow-md shadow-blue-500/20 hover:bg-blue-700 transition-all">
                {loading ? 'SAVING...' : 'SAVE ADVERTISEMENT'}
             </button>
          </div>
        </form>
      </div>
    </div>
  );
}

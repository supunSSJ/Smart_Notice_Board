'use client';

import Topbar from '@/components/admin/Topbar';
import QRCode from 'react-qr-code';
import { Download, MonitorSmartphone, Share2 } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

export default function ShareBoardPage() {
  const [boardUrl, setBoardUrl] = useState('');
  const qrRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Generate the URL dynamically based on the current domain
    if (typeof window !== 'undefined') {
      setBoardUrl(`${window.location.origin}/`);
    }
  }, []);

  const handleDownload = () => {
    if (!qrRef.current) return;
    
    // Find the svg element inside our ref
    const svg = qrRef.current.querySelector('svg');
    if (!svg) return;

    // Serialize SVG to XML string
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('newest');
    const img = new Image();
    
    // Create blob from SVG XML
    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const DOMURL = window.URL || window.webkitURL || window;
    const url = DOMURL.createObjectURL(blob);
    
    img.onload = () => {
      // Set canvas dimensions with a safe margin for high-res output
      canvas.width = img.width + 40;
      canvas.height = img.height + 40;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Draw white background
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        // Draw the image centered
        ctx.drawImage(img, 20, 20);
        
        // Convert to PNG data URL
        const pngFile = canvas.toDataURL('image/png');
        
        // Trigger download
        const downloadLink = document.createElement('a');
        downloadLink.download = 'notice-board-qr.png';
        downloadLink.href = pngFile;
        downloadLink.click();
      }
      DOMURL.revokeObjectURL(url);
    };
    img.src = url;
  };

  return (
    <div className="p-8 pb-12 min-h-full">
      <Topbar title="Share Notice Board" />

      <div className="max-w-4xl mx-auto mt-8">
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col md:flex-row">
          
          {/* Left Side - Info */}
          <div className="p-10 md:w-1/2 flex flex-col justify-center border-b md:border-b-0 md:border-r border-slate-100 bg-slate-50/50">
            <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
              <Share2 className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight mb-4">
              Connect Your Audience
            </h2>
            <p className="text-slate-500 font-medium leading-relaxed mb-8">
              Share your digital notice board with users by having them scan this QR code. It provides instant access to all live notices and advertisements directly on their mobile devices.
            </p>
            
            <div className="mb-8">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Notice Board URL</h3>
              <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-4 py-3 shadow-sm">
                <MonitorSmartphone className="w-5 h-5 text-slate-400" />
                <span className="text-sm font-semibold text-slate-700 truncate">{boardUrl || 'Loading URL...'}</span>
              </div>
            </div>

            <button 
              onClick={handleDownload}
              className="mt-auto px-6 py-3.5 bg-[#0047FF] text-white text-sm font-bold tracking-wide rounded-xl shadow-md shadow-blue-500/20 hover:bg-blue-700 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3"
            >
              <Download className="w-5 h-5" />
              Download QR Code
            </button>
          </div>

          {/* Right Side - QR Code */}
          <div className="p-12 md:w-1/2 flex flex-col items-center justify-center bg-white relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full opacity-60 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-amber-50 rounded-tr-full opacity-60 pointer-events-none"></div>
            
            <div className="relative z-10 p-8 bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 group">
              <div className="absolute inset-0 bg-blue-600/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
              {boardUrl ? (
                <div ref={qrRef} className="bg-white p-2 rounded-xl">
                  <QRCode
                    value={boardUrl}
                    size={240}
                    level="H"
                    className="w-full h-full text-blue-900"
                  />
                </div>
              ) : (
                <div className="w-[240px] h-[240px] flex items-center justify-center bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl">
                  <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </div>
            
            <p className="mt-8 text-sm font-semibold text-slate-500 text-center max-w-[240px]">
              Scan with any smartphone camera to view the live dashboard.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

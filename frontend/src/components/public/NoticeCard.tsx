import Image from 'next/image';

export default function NoticeCard({ notice }: { notice: any }) {
  // Use Next.js optimized Image tag for perfectly responsive formats
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 mb-6 overflow-hidden flex flex-col group">
      {notice.image && (
        <div className="relative w-full h-56 overflow-hidden">
           <Image 
             src={notice.image} 
             alt={notice.title} 
             fill 
             className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out" 
             sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
             priority={notice.pinned} 
           />
        </div>
      )}
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs font-extrabold text-blue-700 uppercase tracking-widest bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100 shadow-sm">
            {notice.category}
          </span>
          <span className="text-xs font-semibold text-gray-400">
            {new Date(notice.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
          </span>
        </div>
        <h3 className="text-2xl font-extrabold text-gray-900 mb-3 tracking-tight group-hover:text-blue-600 transition-colors">
          {notice.title}
        </h3>
        <p className="text-gray-600 text-sm whitespace-pre-wrap leading-relaxed flex-1">
          {notice.description}
        </p>
      </div>
    </div>
  );
}
